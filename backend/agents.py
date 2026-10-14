from __future__ import annotations
import os
import time
import uuid
import json
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional, Tuple
import httpx

from schemas import (
    AllowedActionType,
    ChildProfile,
    MultimodalSignalInput,
    IntentHypothesis,
    VisualChoiceCard,
    AgentOrchestrationResponse,
    ShowAndTellRequest,
    ShowAndTellResponse,
)
from policy_gateway import DeterministicPolicyGateway


SPECIAL_INTEREST_META: Dict[str, Dict[str, Any]] = {
    "dinosaurs": {
        "label": "Dinosaurs",
        "emoji": "🦕",
        "color": "blue",
        "hero_noun": "Blue Brachiosaurus",
        "sound_desc": "gentle dino stomp",
        "math_item": "friendly dinosaurs",
        "science_topic": "Prehistoric Plants & Volcanoes",
    },
    "trains": {
        "label": "Trains & Tracks",
        "emoji": "🚂",
        "color": "emerald",
        "hero_noun": "Emerald Steam Engine",
        "sound_desc": "soft chugga-choo chime",
        "math_item": "numbered train carriages",
        "science_topic": "Magnetic Train Couplers (Push & Pull)",
    },
    "space": {
        "label": "Solar System & Rockets",
        "emoji": "🚀",
        "color": "indigo",
        "hero_noun": "Starlight Explorer Rocket",
        "sound_desc": "planetary ambient hum",
        "math_item": "glowing moons and stars",
        "science_topic": "Gravity & Orbiting Planets",
    },
    "ocean": {
        "label": "Ocean & Whales",
        "emoji": "🐋",
        "color": "teal",
        "hero_noun": "Gentle Singing Humpback Whale",
        "sound_desc": "calm ocean wave",
        "math_item": "sea turtles and shells",
        "science_topic": "Floating, Sinking & Coral Reefs",
    },
    "music_art": {
        "label": "Colours & Melodies",
        "emoji": "🎨",
        "color": "amber",
        "hero_noun": "Rainbow Kalimba Brush",
        "sound_desc": "pentatonic marimba chord",
        "math_item": "colourful paint drops",
        "science_topic": "Mixing Primary Colours & Sound Waves",
    },
}


class BoundedMultiAgentOrchestrator:
    """
    Bounded Multi-Agent System modelled after the Google ADK architecture:
    1. IntentAndOrchestrationAgent (Bayesian Multimodal Fusion + Uncertainty Gate)
    2. AACAndGestaltAgent (Fitzgerald Key Choice Builder + NLA Gestalt Mitigation)
    3. SpecialInterestLearningAgent (Spin-Infused Math, Science & Routines)
    4. CreativeCoPlayAgent (Guided Co-Drawing, Harmonic Pentatonic Pad, Visual Stories)
    5. SensoryAndRoutineAgent (Touch Kinematics Overload Detection, Ambient dB, Safe Harbor)
    6.DeterministicPolicyGateway (Zero-Trust Preemption & Sensory Clamping)
    """

    def __init__(self, policy_gateway: DeterministicPolicyGateway) -> None:
        self.policy = policy_gateway

    async def process_multimodal_turn(
        self, signal: MultimodalSignalInput, profile: ChildProfile
    ) -> AgentOrchestrationResponse:
        start_t = time.perf_counter()
        trace_id = f"trace-{uuid.uuid4().hex[:8]}"
        now_iso = datetime.now(timezone.utc).isoformat()
        spin = SPECIAL_INTEREST_META.get(profile.primary_interest, SPECIAL_INTEREST_META["dinosaurs"])

        # STEP 1: Hard Real-Time Preemption Check (<5ms deterministic path)
        preempted, preempt_action, preempt_reason = self.policy.check_immediate_preemption(signal, profile)
        if preempted:
            decision = self.policy.validate_and_clamp(
                preempt_action,
                signal.explicit_touch_args or {"interest": profile.primary_interest},
                profile,
                preempted=True,
                reason_override=preempt_reason,
            )
            speech, subtitle = self._build_preempt_speech(preempt_action, profile)
            elapsed_ms = round((time.perf_counter() - start_t) * 1000, 2)
            top_hyp = IntentHypothesis(
                intent_name=f"Immediate Self-Advocacy ({preempt_action})",
                action=preempt_action,
                confidence=1.0,
                source_modality="deterministic_preempt",
                reasoning=preempt_reason,
            )
            return AgentOrchestrationResponse(
                trace_id=trace_id,
                timestamp=now_iso,
                active_specialist_agent="SafetyAndPolicyPreemptor + SensorySupportAgent",
                engine_mode="deterministic_preempt",
                latency_ms=elapsed_ms,
                top_hypothesis=top_hyp,
                all_hypotheses=[top_hyp],
                uncertainty_state="emergency_preempt",
                policy_decision=decision,
                companion_speech=speech,
                companion_subtitle=subtitle,
                mitigated_gestalt_suggestions=["Stop now", "I want a break", "Go home"],
                clarification_choices=[],
                ui_adaptation_directives={
                    "target_screen": preempt_action,
                    "quiet_mode": preempt_action in ("open_safe_harbor", "set_quiet_mode") or profile.sensory.quiet_mode,
                    "choice_density": profile.sensory.choice_density,
                },
            )

        # STEP 2: Sensory Overload / Interaction Friction Check (Kinematics & Ambient dB)
        if (
            signal.kinematics.taps_per_second >= 4.0
            or signal.kinematics.rapid_exit_count_30s >= 3
            or signal.ambient_noise_db >= 75.0
        ):
            friction_reason = (
                f"Observed high interaction friction (Tap cadence: {signal.kinematics.taps_per_second:.1f}/s, "
                f"Rapid exits: {signal.kinematics.rapid_exit_count_30s}, Ambient noise: {signal.ambient_noise_db:.0f} dB). "
                "Offering non-diagnostic gentle sensory choice without assuming emotional state."
            )
            hypotheses = [
                IntentHypothesis(
                    intent_name="Sensory Break or Familiar Home Choice",
                    action="show_break_choice",
                    confidence=0.86,
                    source_modality="on_device_kinematics_and_acoustic_monitor",
                    reasoning=friction_reason,
                ),
                IntentHypothesis(
                    intent_name="Quiet Safe Harbor",
                    action="open_safe_harbor",
                    confidence=0.78,
                    source_modality="on_device_kinematics_and_acoustic_monitor",
                    reasoning="High tap frequency or loud room may benefit from zero-demand Safe Harbor.",
                ),
            ]
            decision = self.policy.validate_and_clamp(
                "show_break_choice",
                {"trigger": "kinematics_or_ambient", "interest": profile.primary_interest},
                profile,
            )
            choices = self._build_sensory_support_choices(profile)
            elapsed_ms = round((time.perf_counter() - start_t) * 1000, 2)
            return AgentOrchestrationResponse(
                trace_id=trace_id,
                timestamp=now_iso,
                active_specialist_agent="SensoryAndRoutineAgent",
                engine_mode="hybrid_local_adk",
                latency_ms=elapsed_ms,
                top_hypothesis=hypotheses[0],
                all_hypotheses=hypotheses,
                uncertainty_state="sensory_overload_support",
                policy_decision=decision,
                companion_speech="Would you like a quiet break, or something different?",
                companion_subtitle="Gentle choice offered · No emotion assumed",
                mitigated_gestalt_suggestions=["I need a break", "Too loud", "Let's go home"],
                clarification_choices=choices[: profile.sensory.choice_density],
                ui_adaptation_directives={
                    "show_sensory_banner": True,
                    "reduce_visual_clutter": True,
                    "choice_density": min(profile.sensory.choice_density, 2),
                },
            )

        # STEP 3: Explicit Touch Action (Confidence 0.98)
        if signal.explicit_touch_action:
            action = signal.explicit_touch_action
            args = dict(signal.explicit_touch_args or {"interest": profile.primary_interest})
            if "interest" not in args:
                args["interest"] = profile.primary_interest
            specialist = self._specialist_for_action(action)
            top_hyp = IntentHypothesis(
                intent_name=f"Explicit Selection: {action}",
                action=action,
                confidence=0.98,
                source_modality="explicit_touch_aac",
                reasoning="Direct intentional touch selection takes highest priority over any inferred signal.",
            )
            decision = self.policy.validate_and_clamp(action, args, profile)
            speech, subtitle, mitigations = self._generate_specialist_response(action, args, profile)
            elapsed_ms = round((time.perf_counter() - start_t) * 1000, 2)
            return AgentOrchestrationResponse(
                trace_id=trace_id,
                timestamp=now_iso,
                active_specialist_agent=specialist,
                engine_mode="hybrid_local_adk",
                latency_ms=elapsed_ms,
                top_hypothesis=top_hyp,
                all_hypotheses=[top_hyp],
                uncertainty_state="confident_execute",
                policy_decision=decision,
                companion_speech=speech,
                companion_subtitle=subtitle,
                mitigated_gestalt_suggestions=mitigations,
                clarification_choices=[],
                ui_adaptation_directives={
                    "target_screen": decision.enforced_action,
                    "interest_theme": args.get("interest", profile.primary_interest),
                },
            )

        # STEP 4: Personal Gestalt Dictionary & Calibrated Vocalization Matcher (Weight 0.88)
        raw_text = (signal.speech_transcript or signal.aac_utterance or signal.vocalization_cue or "").strip()
        lower_text = raw_text.lower()

        for gestalt in profile.gestalt_dictionary:
            if gestalt.phrase.lower() in lower_text or lower_text in gestalt.phrase.lower():
                if len(lower_text) >= 3:
                    action = gestalt.target_action
                    args = dict(gestalt.target_args)
                    args.setdefault("interest", profile.primary_interest)
                    args["gestalt_matched"] = gestalt.phrase
                    top_hyp = IntentHypothesis(
                        intent_name=f"Gestalt Script Match: '{gestalt.meaning}'",
                        action=action,
                        confidence=0.91,
                        source_modality="calibrated_gestalt_dictionary",
                        reasoning=(
                            f"Matched personal Gestalt script '{gestalt.phrase}' ({gestalt.stage}) "
                            f"to functional meaning: '{gestalt.meaning}'."
                        ),
                    )
                    decision = self.policy.validate_and_clamp(action, args, profile)
                    speech, subtitle, _ = self._generate_specialist_response(action, args, profile)
                    elapsed_ms = round((time.perf_counter() - start_t) * 1000, 2)
                    return AgentOrchestrationResponse(
                        trace_id=trace_id,
                        timestamp=now_iso,
                        active_specialist_agent=f"AACAndGestaltAgent -> {self._specialist_for_action(action)}",
                        engine_mode="hybrid_local_adk",
                        latency_ms=elapsed_ms,
                        top_hypothesis=top_hyp,
                        all_hypotheses=[top_hyp],
                        uncertainty_state="confident_execute",
                        policy_decision=decision,
                        companion_speech=speech,
                        companion_subtitle=f"Gestalt understood: \"{gestalt.meaning}\" · {subtitle}",
                        mitigated_gestalt_suggestions=gestalt.mitigations
                        or [f"Let's play {spin['label']}", "Do it again", "All done"],
                        clarification_choices=[],
                        ui_adaptation_directives={
                            "target_screen": decision.enforced_action,
                            "gestalt_celebration": gestalt.phrase,
                        },
                    )

        # STEP 5: Multimodal Speech / Natural Language + Optional Gemini Live API Enhancement
        hypotheses, engine_mode = await self._infer_from_natural_language(lower_text, signal, profile)
        top_hyp = hypotheses[0]

        # Uncertainty Gate:
        # Confidence >= 0.80 -> Confident Execute
        # Confidence < 0.80 -> Offer N visual choices (bounded by profile.sensory.choice_density)
        if top_hyp.confidence >= 0.80:
            inferred_interest = self._extract_interest_override(lower_text, profile.primary_interest)
            inferred_color = self._extract_color_override(lower_text, spin["color"])
            args = {
                "interest": inferred_interest,
                "color": inferred_color,
                "utterance": raw_text,
            }
            decision = self.policy.validate_and_clamp(top_hyp.action, args, profile)
            speech, subtitle, mitigations = self._generate_specialist_response(
                decision.enforced_action, decision.enforced_args, profile
            )
            elapsed_ms = round((time.perf_counter() - start_t) * 1000, 2)
            return AgentOrchestrationResponse(
                trace_id=trace_id,
                timestamp=now_iso,
                active_specialist_agent=self._specialist_for_action(decision.enforced_action),
                engine_mode=engine_mode,
                latency_ms=elapsed_ms,
                top_hypothesis=top_hyp,
                all_hypotheses=hypotheses,
                uncertainty_state="confident_execute",
                policy_decision=decision,
                companion_speech=speech,
                companion_subtitle=subtitle,
                mitigated_gestalt_suggestions=mitigations,
                clarification_choices=[],
                ui_adaptation_directives={
                    "target_screen": decision.enforced_action,
                    "interest_theme": inferred_interest,
                    "requested_color": inferred_color,
                },
            )
        else:
            # Ambiguous signal or non-word vocalization -> Offer gentle visual choices!
            decision = self.policy.validate_and_clamp(
                "offer_visual_clarification",
                {"candidate_actions": [h.action for h in hypotheses[:3]]},
                profile,
            )
            clarification_cards = self._build_clarification_cards(hypotheses, profile)
            elapsed_ms = round((time.perf_counter() - start_t) * 1000, 2)
            return AgentOrchestrationResponse(
                trace_id=trace_id,
                timestamp=now_iso,
                active_specialist_agent="IntentAndOrchestrationAgent + AACAndGestaltAgent",
                engine_mode=engine_mode,
                latency_ms=elapsed_ms,
                top_hypothesis=top_hyp,
                all_hypotheses=hypotheses,
                uncertainty_state="gentle_visual_clarification",
                policy_decision=decision,
                companion_speech=f"I heard you! Which one would you like, {profile.name}?",
                companion_subtitle="Uncertain intent · Offering predictable picture choices instead of guessing",
                mitigated_gestalt_suggestions=[
                    f"I want {clarification_cards[0].label.lower()}",
                    f"I want {clarification_cards[1].label.lower() if len(clarification_cards) > 1 else 'a break'}",
                    "Help me choose",
                ],
                clarification_choices=clarification_cards[: profile.sensory.choice_density],
                ui_adaptation_directives={
                    "target_screen": "offer_visual_clarification",
                    "choice_density": profile.sensory.choice_density,
                },
            )

    async def process_show_and_tell(
        self, req: ShowAndTellRequest, profile: ChildProfile
    ) -> ShowAndTellResponse:
        """
        Reframed Camera Experience: 'Show & Tell' Shared Attention.
        Identifies the child's physical toy or drawing (never diagnosing facial expressions!)
        and bridges it into 3 tailored Special-Interest activities.
        """
        obj_lower = f"{req.object_name} {req.object_details or ''}".lower()
        matched_interest = profile.primary_interest
        if any(w in obj_lower for w in ("dino", "rex", "triceratops", "brachio")):
            matched_interest = "dinosaurs"
        elif any(w in obj_lower for w in ("train", "track", "engine", "locomotive", "car", "truck")):
            matched_interest = "trains"
        elif any(w in obj_lower for w in ("rocket", "star", "planet", "moon", "astronaut", "space")):
            matched_interest = "space"
        elif any(w in obj_lower for w in ("whale", "fish", "shark", "turtle", "ocean", "dolphin")):
            matched_interest = "ocean"
        elif any(w in obj_lower for w in ("crayon", "paint", "music", "drum", "drawing")):
            matched_interest = "music_art"

        spin = SPECIAL_INTEREST_META[matched_interest]
        detected_label = f"{req.object_color.capitalize()} {req.object_name}"

        choices: List[VisualChoiceCard] = [
            VisualChoiceCard(
                id="show_tell_draw",
                label=f"Draw {detected_label}",
                sublabel="Creative Co-Drawing Canvas",
                icon="🎨",
                fitzgerald_category="verb",
                action="open_drawing",
                action_args={"interest": matched_interest, "color": req.object_color, "subject": req.object_name},
            ),
            VisualChoiceCard(
                id="show_tell_math",
                label=f"Count {req.object_name}s",
                sublabel=f"{spin['label']} Math Puzzle",
                icon="🔢",
                fitzgerald_category="noun",
                action="open_math_activity",
                action_args={"interest": matched_interest, "subject": req.object_name},
            ),
            VisualChoiceCard(
                id="show_tell_story",
                label=f"{detected_label} Story",
                sublabel="Interactive Visual Story",
                icon="📖",
                fitzgerald_category="noun",
                action="open_story_activity",
                action_args={"interest": matched_interest, "subject": req.object_name},
            ),
            VisualChoiceCard(
                id="show_tell_science",
                label=f"Explore {spin['science_topic']}",
                sublabel="Cause & Effect Science Lab",
                icon="🔬",
                fitzgerald_category="verb",
                action="open_science_activity",
                action_args={"interest": matched_interest},
            ),
        ]

        return ShowAndTellResponse(
            detected_object=detected_label,
            celebration_speech=(
                f"Wow, you showed me your {detected_label}! "
                f"Would you like to draw it together, count {req.object_name}s, or hear a story?"
            ),
            privacy_assurance=(
                "Object-only Shared Attention snapshot processed. "
                "Zero facial emotion analysis performed; frame discarded immediately per ICO Children's Code."
            ),
            suggested_choices=choices[: profile.sensory.choice_density],
            matched_interest=matched_interest,
        )

    async def _infer_from_natural_language(
        self, lower_text: str, signal: MultimodalSignalInput, profile: ChildProfile
    ) -> Tuple[List[IntentHypothesis], str]:
        """
        Combines deterministic keyword/semantic rules with optional Gemini API calls
        when GEMINI_API_KEY or GOOGLE_API_KEY is present in the environment.
        """
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

        # Fast deterministic multi-hypothesis scoring first
        scored: List[IntentHypothesis] = []

        if any(w in lower_text for w in ("draw", "colour", "color", "paint", "picture", "dinosaur", "blue dino")):
            conf = 0.92 if any(w in lower_text for w in ("draw", "colour", "color", "paint")) else 0.72
            scored.append(
                IntentHypothesis(
                    intent_name="Open Guided Co-Drawing Studio",
                    action="open_drawing",
                    confidence=conf,
                    source_modality="speech_and_context_fusion",
                    reasoning=f"Detected creative/drawing or character cue in '{lower_text}'.",
                )
            )

        if any(w in lower_text for w in ("music", "song", "sing", "sound", "piano", "drum", "melody", "hum")):
            scored.append(
                IntentHypothesis(
                    intent_name="Open Harmonic Pentatonic Music Pad",
                    action="open_music_pad",
                    confidence=0.90,
                    source_modality="speech_and_context_fusion",
                    reasoning="Matched musical/rhythm request to sensory-safe Pentatonic Studio.",
                )
            )

        if any(w in lower_text for w in ("count", "math", "number", "add", "plus", "puzzle", "how many")):
            scored.append(
                IntentHypothesis(
                    intent_name=f"Open {SPECIAL_INTEREST_META[profile.primary_interest]['label']} Math Activity",
                    action="open_math_activity",
                    confidence=0.91,
                    source_modality="speech_and_context_fusion",
                    reasoning="Matched numeracy/counting request to Special-Interest Math Lab.",
                )
            )

        if any(w in lower_text for w in ("science", "magnet", "plant", "volcano", "planet", "space", "experiment", "float")):
            scored.append(
                IntentHypothesis(
                    intent_name="Open Cause-and-Effect Science Lab",
                    action="open_science_activity",
                    confidence=0.89,
                    source_modality="speech_and_context_fusion",
                    reasoning="Matched science/experiment cue to interactive Cause-and-Effect Lab.",
                )
            )

        if any(w in lower_text for w in ("story", "book", "read", "adventure", "tale")):
            scored.append(
                IntentHypothesis(
                    intent_name="Open Interactive Visual Story",
                    action="open_story_activity",
                    confidence=0.88,
                    source_modality="speech_and_context_fusion",
                    reasoning="Matched narrative/story cue to personalized visual story builder.",
                )
            )

        if any(w in lower_text for w in ("video", "watch", "movie", "clip")):
            scored.append(
                IntentHypothesis(
                    intent_name="Open Approved Safe Media Library",
                    action="play_approved_media",
                    confidence=0.87,
                    source_modality="speech_and_context_fusion",
                    reasoning="Matched video request to allowlisted, ad-free sensory media catalog.",
                )
            )

        if any(w in lower_text for w in ("schedule", "routine", "first", "then", "next", "teeth", "morning")):
            scored.append(
                IntentHypothesis(
                    intent_name="Open First-Then Routine Sequencer",
                    action="open_routine_sequencer",
                    confidence=0.88,
                    source_modality="speech_and_context_fusion",
                    reasoning="Matched daily routine or schedule cue.",
                )
            )

        if any(w in lower_text for w in ("help", "don't know", "stuck", "hard")):
            scored.append(
                IntentHypothesis(
                    intent_name="Offer Simple AAC Choice Board",
                    action="show_aac_choices",
                    confidence=0.93,
                    source_modality="speech_and_context_fusion",
                    reasoning="Child asked for help; routing to high-clarity AAC picture cards.",
                )
            )

        # If an API key is configured and no high-confidence deterministic match was found, query Gemini
        if api_key and (not scored or scored[0].confidence < 0.80) and lower_text:
            gemini_hyp = await self._call_gemini_intent_classifier(lower_text, profile, api_key)
            if gemini_hyp:
                scored.insert(0, gemini_hyp)
                return scored, "gemini_live_adk"

        if not scored:
            # Ambiguous vocalization or unrecognized phrase -> return low-confidence candidates so Uncertainty Gate triggers visual choices
            spin_label = SPECIAL_INTEREST_META[profile.primary_interest]["label"]
            scored = [
                IntentHypothesis(
                    intent_name=f"Draw {spin_label}",
                    action="open_drawing",
                    confidence=0.58,
                    source_modality="uncertainty_prior_from_special_interest",
                    reasoning=f"Unclear vocalization/utterance '{lower_text or 'sound cue'}'; proposing {spin_label} drawing as Choice 1.",
                ),
                IntentHypothesis(
                    intent_name=f"Play {spin_label} Math & Counting",
                    action="open_math_activity",
                    confidence=0.52,
                    source_modality="uncertainty_prior_from_special_interest",
                    reasoning=f"Proposing {spin_label} counting activity as Choice 2.",
                ),
                IntentHypothesis(
                    intent_name="Take a Quiet Sensory Break",
                    action="open_safe_harbor",
                    confidence=0.48,
                    source_modality="sensory_safety_fallback",
                    reasoning="Always include a calming break option when intent is uncertain.",
                ),
                IntentHypothesis(
                    intent_name="Play Pentatonic Music Pad",
                    action="open_music_pad",
                    confidence=0.44,
                    source_modality="uncertainty_prior",
                    reasoning="Sensory music pad option.",
                ),
            ]

        scored.sort(key=lambda h: h.confidence, reverse=True)
        return scored, "hybrid_local_adk"

    async def _call_gemini_intent_classifier(
        self, utterance: str, profile: ChildProfile, api_key: str
    ) -> Optional[IntentHypothesis]:
        prompt = (
            "You are the IntentAndOrchestrationAgent for AutiCompanion AI, a neurodiversity-affirming "
            "companion for an autistic child.\n"
            f"Child Name: {profile.name}, Age: {profile.age}, Primary Special Interest: {profile.primary_interest}.\n"
            f"Child utterance/sound: \"{utterance}\"\n"
            "Map this to ONE of these exact allowed actions: "
            "show_home, show_aac_choices, open_drawing, open_music_pad, open_story_activity, "
            "open_math_activity, open_science_activity, open_routine_sequencer, play_approved_media, "
            "set_quiet_mode, show_break_choice, open_safe_harbor, stop_activity.\n"
            "Return strict JSON: {\"intent_name\": \"...\", \"action\": \"...\", \"confidence\": 0.0-1.0, \"reasoning\": \"...\"}"
        )
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        try:
            async with httpx.AsyncClient(timeout=3.5) as client:
                resp = await client.post(
                    url,
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {"responseMimeType": "application/json", "temperature": 0.1},
                    },
                )
                if resp.status_code == 200:
                    data = resp.json()
                    text = data["candidates"][0]["content"]["parts"][0]["text"]
                    parsed = json.loads(text)
                    return IntentHypothesis(
                        intent_name=parsed.get("intent_name", "Gemini Inferred Intent"),
                        action=parsed.get("action", "offer_visual_clarification"),
                        confidence=float(parsed.get("confidence", 0.75)),
                        source_modality="gemini_live_api",
                        reasoning=parsed.get("reasoning", "Resolved by Gemini ADK Orchestrator"),
                    )
        except Exception:
            return None
        return None

    def _specialist_for_action(self, action: AllowedActionType) -> str:
        mapping: Dict[AllowedActionType, str] = {
            "show_home": "IntentAndOrchestrationAgent",
            "show_aac_choices": "AACAndGestaltAgent",
            "open_drawing": "CreativeCoPlayAgent",
            "open_music_pad": "CreativeCoPlayAgent",
            "open_story_activity": "CreativeCoPlayAgent",
            "open_math_activity": "SpecialInterestLearningAgent",
            "open_science_activity": "SpecialInterestLearningAgent",
            "open_routine_sequencer": "SensoryAndRoutineAgent",
            "play_approved_media": "SafeMediaDiscoveryAgent",
            "set_quiet_mode": "SensoryAndRoutineAgent",
            "show_break_choice": "SensoryAndRoutineAgent",
            "open_safe_harbor": "SensoryAndRoutineAgent",
            "stop_activity": "SafetyAndPolicyPreemptor",
            "offer_visual_clarification": "AACAndGestaltAgent",
            "advance_schedule_step": "SensoryAndRoutineAgent",
        }
        return mapping.get(action, "IntentAndOrchestrationAgent")

    def _build_preempt_speech(self, action: AllowedActionType, profile: ChildProfile) -> Tuple[str, str]:
        if action == "open_safe_harbor":
            return (
                "Quiet Safe Harbor is ready. No questions, take your time.",
                "Safe Harbor Active · Audio muted & motion paused",
            )
        if action == "stop_activity":
            return (
                "Stopped right away. You are in control.",
                "Activity stopped immediately (<10ms preemption)",
            )
        if action == "set_quiet_mode":
            return (
                "Quiet mode is on. Everything is softer now.",
                "Quiet Mode enabled · Volume & motion reduced",
            )
        return (
            f"Back to your familiar Home screen, {profile.name}.",
            "Returned to predictable Home view",
        )

    def _generate_specialist_response(
        self, action: AllowedActionType, args: Dict[str, Any], profile: ChildProfile
    ) -> Tuple[str, str, List[str]]:
        interest_key = args.get("interest", profile.primary_interest)
        spin = SPECIAL_INTEREST_META.get(interest_key, SPECIAL_INTEREST_META[profile.primary_interest])
        color = args.get("color", spin["color"])

        if action == "open_drawing":
            return (
                f"Let's draw a {color} {spin['hero_noun']} together! You can colour it, add stamps, or change at any time.",
                f"CreativeCoPlayAgent · {spin['label']} Canvas Ready",
                [f"Make it {color}", "Draw together", "Do it again", "All done drawing"],
            )
        if action == "open_music_pad":
            return (
                "Here is your calm pentatonic music pad. Every note sounds gentle and harmonious.",
                "CreativeCoPlayAgent · Harmonic Pentatonic Synthesizer",
                ["Play a gentle song", "Softer sound", "More music", "Stop music"],
            )
        if action == "open_math_activity":
            return (
                f"Let's count {spin['math_item']}! Remember, there are no buzzer sounds—take your time.",
                f"SpecialInterestLearningAgent · Errorless {spin['label']} Math",
                [f"Count more {spin['label'].lower()}", "Help me count", "Too hard", "All done"],
            )
        if action == "open_science_activity":
            return (
                f"Welcome to the {spin['science_topic']} lab! Tap to see what happens next.",
                f"SpecialInterestLearningAgent · Cause & Effect Science",
                ["Do the experiment again", "What happens next?", "Show me another one"],
            )
        if action == "open_story_activity":
            return (
                f"Let's read the story of the {spin['hero_noun']}. You choose what happens on each page!",
                f"CreativeCoPlayAgent · Interactive {spin['label']} Story",
                ["Turn the page", "Read it again", "Change the story"],
            )
        if action == "open_routine_sequencer":
            return (
                "Let's look at our First-Then-Next steps together.",
                "SensoryAndRoutineAgent · Predictable Visual Schedule",
                ["First we do this", "Finished step!", "What is next?"],
            )
        if action == "play_approved_media":
            return (
                f"Opening your calm {spin['label']} video with big Play, Pause, and Stop buttons.",
                "SafeMediaDiscoveryAgent · Allowlisted Ad-Free Library",
                ["Play video", "Pause please", "Watch again", "Stop video"],
            )
        if action == "show_aac_choices":
            return (
                "Here are your picture cards. Tap any card to tell me what you want.",
                "AACAndGestaltAgent · Fitzgerald Key Picture Board",
                ["I want...", "Help me please", "I need a break"],
            )
        return (
            f"Ready whenever you are, {profile.name}!",
            "Predictable Companion Ready",
            ["Let's play", "I want a break", "Show picture cards"],
        )

    def _build_sensory_support_choices(self, profile: ChildProfile) -> List[VisualChoiceCard]:
        return [
            VisualChoiceCard(
                id="sensory_safe_harbor",
                label="Quiet Safe Harbor",
                sublabel="Dim screen, breathing lotus & ripples",
                icon="🌿",
                fitzgerald_category="urgent",
                action="open_safe_harbor",
                action_args={"reason": "sensory_choice"},
            ),
            VisualChoiceCard(
                id="sensory_go_home",
                label="Familiar Home Screen",
                sublabel="Return to predictable choices",
                icon="🏠",
                fitzgerald_category="social",
                action="show_home",
                action_args={},
            ),
            VisualChoiceCard(
                id="sensory_quiet_mode",
                label="Too Loud (Quiet Mode)",
                sublabel="Keep playing with soft sound",
                icon="🔉",
                fitzgerald_category="descriptor",
                action="set_quiet_mode",
                action_args={"quiet_mode": True},
            ),
            VisualChoiceCard(
                id="sensory_music",
                label="Calm Kalimba Chimes",
                sublabel="Gentle pentatonic notes",
                icon="🎵",
                fitzgerald_category="noun",
                action="open_music_pad",
                action_args={"gentle": True},
            ),
        ]

    def _build_clarification_cards(
        self, hypotheses: List[IntentHypothesis], profile: ChildProfile
    ) -> List[VisualChoiceCard]:
        spin = SPECIAL_INTEREST_META[profile.primary_interest]
        catalog: Dict[AllowedActionType, VisualChoiceCard] = {
            "open_drawing": VisualChoiceCard(
                id="clarify_draw",
                label=f"Draw {spin['hero_noun']}",
                sublabel="Colours & Stamps",
                icon="🎨",
                fitzgerald_category="verb",
                action="open_drawing",
                action_args={"interest": profile.primary_interest},
            ),
            "open_math_activity": VisualChoiceCard(
                id="clarify_math",
                label=f"Count {spin['label']}",
                sublabel="Visual Puzzle",
                icon=spin["emoji"],
                fitzgerald_category="noun",
                action="open_math_activity",
                action_args={"interest": profile.primary_interest},
            ),
            "open_safe_harbor": VisualChoiceCard(
                id="clarify_break",
                label="Quiet Break",
                sublabel="Safe Harbor",
                icon="🌿",
                fitzgerald_category="urgent",
                action="open_safe_harbor",
                action_args={},
            ),
            "open_music_pad": VisualChoiceCard(
                id="clarify_music",
                label="Play Calm Music",
                sublabel="Pentatonic Chimes",
                icon="🎵",
                fitzgerald_category="verb",
                action="open_music_pad",
                action_args={},
            ),
            "open_science_activity": VisualChoiceCard(
                id="clarify_science",
                label=f"{spin['label']} Science",
                sublabel="Cause & Effect",
                icon="🔬",
                fitzgerald_category="noun",
                action="open_science_activity",
                action_args={"interest": profile.primary_interest},
            ),
            "open_story_activity": VisualChoiceCard(
                id="clarify_story",
                label=f"{spin['label']} Story",
                sublabel="Visual Book",
                icon="📖",
                fitzgerald_category="noun",
                action="open_story_activity",
                action_args={"interest": profile.primary_interest},
            ),
        }
        cards: List[VisualChoiceCard] = []
        for h in hypotheses:
            if h.action in catalog and catalog[h.action] not in cards:
                cards.append(catalog[h.action])
        for fallback_card in catalog.values():
            if len(cards) >= 6:
                break
            if fallback_card not in cards:
                cards.append(fallback_card)
        return cards

    def _extract_interest_override(self, text: str, default_interest: str) -> str:
        if any(w in text for w in ("dino", "rex", "brachio", "fossil")):
            return "dinosaurs"
        if any(w in text for w in ("train", "choo", "track", "locomotive")):
            return "trains"
        if any(w in text for w in ("space", "rocket", "planet", "moon", "star")):
            return "space"
        if any(w in text for w in ("whale", "ocean", "fish", "sea", "turtle")):
            return "ocean"
        return default_interest

    def _extract_color_override(self, text: str, default_color: str) -> str:
        for c in ("blue", "green", "yellow", "purple", "orange", "red", "teal", "pink"):
            if c in text:
                return c
        return default_color
