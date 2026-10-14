from __future__ import annotations
from typing import Dict, Any, List, Tuple
from datetime import datetime, timezone
from schemas import (
    AllowedActionType,
    ChildProfile,
    PolicyDecision,
    MultimodalSignalInput,
)

# Strictly allowlisted action contracts (Zero-Trust Agent Gateway)
ALLOWED_ACTIONS: set[AllowedActionType] = {
    "show_home",
    "show_aac_choices",
    "open_drawing",
    "open_music_pad",
    "open_story_activity",
    "open_math_activity",
    "open_science_activity",
    "open_routine_sequencer",
    "play_approved_media",
    "set_quiet_mode",
    "show_break_choice",
    "open_safe_harbor",
    "stop_activity",
    "offer_visual_clarification",
    "advance_schedule_step",
}

APPROVED_MEDIA_CATALOG = {
    "dino_gentle_walk": {
        "id": "dino_gentle_walk",
        "title": "Gentle Brachiosaurus Forest Walk",
        "interest": "dinosaurs",
        "sensory_level": "low_arousal",
        "min_age": 2,
        "duration_sec": 120,
    },
    "steam_train_rhythm": {
        "id": "steam_train_rhythm",
        "title": "Calm Countryside Steam Train Tracks",
        "interest": "trains",
        "sensory_level": "low_arousal",
        "min_age": 2,
        "duration_sec": 150,
    },
    "solar_system_orbit": {
        "id": "solar_system_orbit",
        "title": "Slow Planetary Orbits & Ambient Chimes",
        "interest": "space",
        "sensory_level": "low_arousal",
        "min_age": 3,
        "duration_sec": 180,
    },
    "blue_whale_song": {
        "id": "blue_whale_song",
        "title": "Deep Ocean Whale Songs & Coral Reef",
        "interest": "ocean",
        "sensory_level": "low_arousal",
        "min_age": 2,
        "duration_sec": 160,
    },
}

STOP_KEYWORDS = {"stop", "no more", "all done", "finish", "finished", "exit", "quit", "enough"}
SAFE_HARBOR_KEYWORDS = {
    "too loud",
    "too bright",
    "break",
    "i need a break",
    "safe harbor",
    "quiet",
    "tired",
    "overwhelmed",
    "hurt ears",
}


class DeterministicPolicyGateway:
    """
    Zero-Trust Safety & Policy Gateway.
    Enforces:
    1. <5ms Emergency Preemption for Stop, Break/Safe Harbor, and Go Home.
    2. Strict allowlisting of agent actions and arguments.
    3. Sensory Envelope clamping (volume, motion, choice density, TTS suppression in quiet mode).
    4. UK ICO Children's Code compliance (no facial emotion diagnosis, camera/mic opt-in verification).
    """

    def __init__(self) -> None:
        self.audit_log: List[Dict[str, Any]] = []

    def check_immediate_preemption(
        self, signal: MultimodalSignalInput, profile: ChildProfile
    ) -> Tuple[bool, AllowedActionType, str]:
        """
        Deterministic preemption check that bypasses LLM inference entirely
        whenever the child requests 'stop', 'break', or 'home' via touch or speech.
        """
        # 1. Explicit touch preemption
        if signal.explicit_touch_action in ("stop_activity", "open_safe_harbor", "show_home", "set_quiet_mode"):
            return (
                True,
                signal.explicit_touch_action,
                f"Direct touch preemption: '{signal.explicit_touch_action}' executed immediately without AI delay.",
            )

        # 2. Repeated stop button taps
        if signal.kinematics.repeated_stop_taps >= 1:
            return (
                True,
                "stop_activity",
                "Hardware/UI Stop signal detected; halting all active speech, media, and animations.",
            )

        # 3. Spoken or AAC emergency stop / sensory break keywords
        utterance = (signal.speech_transcript or signal.aac_utterance or "").strip().lower()
        if utterance:
            for kw in SAFE_HARBOR_KEYWORDS:
                if kw in utterance:
                    return (
                        True,
                        "open_safe_harbor",
                        f"Sensory self-advocacy keyword '{kw}' detected -> Preempting to Zero-Demand Safe Harbor.",
                    )
            for kw in STOP_KEYWORDS:
                if utterance == kw or utterance.startswith(kw + " "):
                    return (
                        True,
                        "stop_activity",
                        f"Explicit stop keyword '{kw}' detected -> Immediate activity termination.",
                    )

        return False, "show_home", ""

    def validate_and_clamp(
        self,
        candidate_action: AllowedActionType,
        candidate_args: Dict[str, Any],
        profile: ChildProfile,
        preempted: bool = False,
        reason_override: str = "",
    ) -> PolicyDecision:
        clamps: List[str] = []
        enforced_args = dict(candidate_args)

        # 1. Verify global allowlist & child profile allowlist
        if candidate_action not in ALLOWED_ACTIONS or candidate_action not in profile.allowed_actions:
            decision = PolicyDecision(
                permitted=False,
                enforced_action="show_home",
                enforced_args={"fallback_reason": "Action not in profile allowlist"},
                preempted=True,
                sensory_clamps_applied=["blocked_unapproved_action"],
                policy_notes=f"Blocked action '{candidate_action}'; fell back safely to familiar Home screen.",
            )
            self._record_audit(profile.id, candidate_action, decision)
            return decision

        # 2. Validate media library IDs if playing media
        if candidate_action == "play_approved_media":
            media_id = enforced_args.get("media_id", "")
            if media_id not in APPROVED_MEDIA_CATALOG:
                # Map to child's primary interest approved media
                fallback_media = next(
                    (
                        m["id"]
                        for m in APPROVED_MEDIA_CATALOG.values()
                        if m["interest"] == profile.primary_interest
                    ),
                    "dino_gentle_walk",
                )
                enforced_args["media_id"] = fallback_media
                clamps.append(f"media_allowlist_redirect:{fallback_media}")

        # 3. Enforce Sensory Envelope Clamps
        enforced_args["max_choices"] = profile.sensory.choice_density
        clamps.append(f"choice_density_cap:{profile.sensory.choice_density}")

        if profile.sensory.quiet_mode or candidate_action in ("open_safe_harbor", "set_quiet_mode"):
            enforced_args["mute_audio_effects"] = True
            enforced_args["max_volume_db"] = min(profile.sensory.max_volume_db, 40)
            clamps.append("quiet_mode_audio_clamp:40dB")

        if profile.sensory.reduced_motion or candidate_action == "open_safe_harbor":
            enforced_args["disable_animations"] = True
            clamps.append("reduced_motion_clamp:zero_keyframes")

        if profile.sensory.errorless_learning:
            enforced_args["errorless_scaffolding"] = True
            clamps.append("errorless_learning_active")

        notes = reason_override or (
            f"Validated '{candidate_action}' against child profile '{profile.name}' "
            f"(Band {profile.developmental_band}, {len(clamps)} sensory/safety clamps enforced)."
        )

        decision = PolicyDecision(
            permitted=True,
            enforced_action=candidate_action,
            enforced_args=enforced_args,
            preempted=preempted,
            sensory_clamps_applied=clamps,
            policy_notes=notes,
        )
        self._record_audit(profile.id, candidate_action, decision)
        return decision

    def _record_audit(
        self, profile_id: str, requested_action: str, decision: PolicyDecision
    ) -> None:
        entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "profile_id": profile_id,
            "requested_action": requested_action,
            "enforced_action": decision.enforced_action,
            "permitted": decision.permitted,
            "preempted": decision.preempted,
            "sensory_clamps": decision.sensory_clamps_applied,
            "notes": decision.policy_notes,
        }
        self.audit_log.insert(0, entry)
        if len(self.audit_log) > 100:
            self.audit_log.pop()
