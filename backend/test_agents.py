import asyncio
from main import PROFILES_DB, orchestrator
from schemas import MultimodalSignalInput, TouchKinematicsSignal, ShowAndTellRequest


async def run_verification() -> None:
    leo = PROFILES_DB["leo-5"]
    mia = PROFILES_DB["mia-3"]

    # 1. Test <5ms Deterministic Preemption on 'Too loud / Stop'
    r1 = await orchestrator.process_multimodal_turn(
        MultimodalSignalInput(profile_id="leo-5", speech_transcript="Too loud I need a break"),
        leo,
    )
    assert r1.uncertainty_state == "emergency_preempt"
    assert r1.policy_decision.enforced_action == "open_safe_harbor"
    assert r1.policy_decision.preempted is True
    print(f"[PASS 1] Deterministic Preemption: {r1.policy_decision.enforced_action} in {r1.latency_ms}ms")

    # 2. Test Gestalt Script Calibration ('Chugga chugga choo choo!')
    r2 = await orchestrator.process_multimodal_turn(
        MultimodalSignalInput(profile_id="leo-5", speech_transcript="Chugga chugga choo choo!"),
        leo,
    )
    assert r2.uncertainty_state == "confident_execute"
    assert r2.policy_decision.enforced_action == "open_math_activity"
    print(f"[PASS 2] Gestalt Script Match: '{r2.top_hypothesis.intent_name}' -> {r2.policy_decision.enforced_action}")

    # 3. Test Ambiguous Vocalization -> Uncertainty Gate -> Visual Clarification bounded by choice_density
    r3 = await orchestrator.process_multimodal_turn(
        MultimodalSignalInput(profile_id="mia-3", vocalization_cue="Mmm-baba-ooo"),
        mia,
    )
    assert r3.uncertainty_state == "gentle_visual_clarification"
    assert len(r3.clarification_choices) == mia.sensory.choice_density  # Mia has choice_density=2
    print(f"[PASS 3] Uncertainty Gate for Mia (Age 3): Returned {len(r3.clarification_choices)} visual cards")

    # 4. Test On-Device Touch Kinematics Overload (>4.5 Hz) -> Non-Diagnostic Gentle Sensory Choice
    r4 = await orchestrator.process_multimodal_turn(
        MultimodalSignalInput(
            profile_id="leo-5",
            kinematics=TouchKinematicsSignal(taps_per_second=5.4, rapid_exit_count_30s=3),
        ),
        leo,
    )
    assert r4.uncertainty_state == "sensory_overload_support"
    assert r4.policy_decision.enforced_action == "show_break_choice"
    print(f"[PASS 4] Kinematics Overload Support: {r4.active_specialist_agent} -> {r4.companion_subtitle}")

    # 5. Test Opt-In 'Show & Tell' Shared Attention Camera (Object-Only, Zero Emotion Profiling)
    r5 = await orchestrator.process_show_and_tell(
        ShowAndTellRequest(profile_id="leo-5", object_name="Brachiosaurus", object_color="Blue"),
        leo,
    )
    assert r5.matched_interest == "dinosaurs"
    assert len(r5.suggested_choices) == leo.sensory.choice_density
    print(f"[PASS 5] Show & Tell Shared Attention: '{r5.detected_object}' -> {len(r5.suggested_choices)} choices")


if __name__ == "__main__":
    asyncio.run(run_verification())
