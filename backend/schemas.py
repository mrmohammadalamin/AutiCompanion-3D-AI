from __future__ import annotations
from typing import Dict, List, Optional, Literal, Any
from pydantic import BaseModel, Field


DevelopmentalBand = Literal["2-4", "5-7", "8-11"]
SpecialInterestId = Literal["dinosaurs", "trains", "space", "ocean", "music_art"]
SensoryTheme = Literal["calm_sage", "warm_sand", "deep_dusk", "high_contrast"]
AllowedActionType = Literal[
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
]


class GestaltMapping(BaseModel):
    id: str
    phrase: str = Field(..., description="Spoken script, echolalia phrase, or vocalization cue")
    meaning: str = Field(..., description="Functional communicative intent translated with caregiver/SLP")
    target_action: AllowedActionType
    target_args: Dict[str, Any] = Field(default_factory=dict)
    stage: Literal["Stage 1 (Whole Gestalt)", "Stage 2 (Mitigated)", "Stage 3 (Isolated Words)"] = "Stage 1 (Whole Gestalt)"
    mitigations: List[str] = Field(default_factory=list, description="Mitigated phrase extensions for NLA scaffolding")


class ScheduleStep(BaseModel):
    id: str
    slot: Literal["First", "Then", "Next"]
    title: str
    icon: str
    action: AllowedActionType
    action_args: Dict[str, Any] = Field(default_factory=dict)
    completed: bool = False


class SensoryProfile(BaseModel):
    quiet_mode: bool = False
    reduced_motion: bool = False
    sensory_theme: SensoryTheme = "calm_sage"
    choice_density: Literal[2, 4, 6] = 4
    speech_rate: float = 0.92
    tts_enabled: bool = True
    errorless_learning: bool = True
    transition_warning_seconds: int = 30
    max_volume_db: int = 65
    camera_opt_in: bool = False
    mic_opt_in: bool = True


class ChildProfile(BaseModel):
    id: str
    name: str
    age: int
    developmental_band: DevelopmentalBand
    primary_interest: SpecialInterestId
    secondary_interest: SpecialInterestId = "trains"
    languages: List[str] = Field(default_factory=lambda: ["en-GB"])
    sensory: SensoryProfile = Field(default_factory=SensoryProfile)
    gestalt_dictionary: List[GestaltMapping] = Field(default_factory=list)
    schedule: List[ScheduleStep] = Field(default_factory=list)
    allowed_actions: List[AllowedActionType] = Field(
        default_factory=lambda: [
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
        ]
    )


class TouchKinematicsSignal(BaseModel):
    taps_per_second: float = 0.5
    rapid_exit_count_30s: int = 0
    repeated_stop_taps: int = 0
    edge_tremor_detected: bool = False


class MultimodalSignalInput(BaseModel):
    profile_id: str = "leo-5"
    explicit_touch_action: Optional[AllowedActionType] = None
    explicit_touch_args: Dict[str, Any] = Field(default_factory=dict)
    aac_card_id: Optional[str] = None
    aac_utterance: Optional[str] = None
    speech_transcript: Optional[str] = None
    vocalization_cue: Optional[str] = None
    kinematics: TouchKinematicsSignal = Field(default_factory=TouchKinematicsSignal)
    ambient_noise_db: float = 42.0
    camera_object_label: Optional[str] = None
    current_activity: str = "home"


class VisualChoiceCard(BaseModel):
    id: str
    label: str
    sublabel: Optional[str] = None
    icon: str
    fitzgerald_category: Literal["verb", "noun", "descriptor", "urgent", "social"]
    action: AllowedActionType
    action_args: Dict[str, Any] = Field(default_factory=dict)


class IntentHypothesis(BaseModel):
    intent_name: str
    action: AllowedActionType
    confidence: float
    source_modality: str
    reasoning: str


class PolicyDecision(BaseModel):
    permitted: bool
    enforced_action: AllowedActionType
    enforced_args: Dict[str, Any]
    preempted: bool = False
    sensory_clamps_applied: List[str] = Field(default_factory=list)
    policy_notes: str


class AgentOrchestrationResponse(BaseModel):
    trace_id: str
    timestamp: str
    active_specialist_agent: str
    engine_mode: Literal["deterministic_preempt", "hybrid_local_adk", "gemini_live_adk"]
    latency_ms: float
    top_hypothesis: IntentHypothesis
    all_hypotheses: List[IntentHypothesis]
    uncertainty_state: Literal["confident_execute", "gentle_visual_clarification", "sensory_overload_support", "emergency_preempt"]
    policy_decision: PolicyDecision
    companion_speech: str
    companion_subtitle: str
    mitigated_gestalt_suggestions: List[str] = Field(default_factory=list)
    clarification_choices: List[VisualChoiceCard] = Field(default_factory=list)
    ui_adaptation_directives: Dict[str, Any] = Field(default_factory=dict)


class ShowAndTellRequest(BaseModel):
    profile_id: str = "leo-5"
    object_name: str
    object_color: str = "blue"
    object_details: Optional[str] = None
    image_base64: Optional[str] = None


class ShowAndTellResponse(BaseModel):
    detected_object: str
    celebration_speech: str
    privacy_assurance: str
    suggested_choices: List[VisualChoiceCard]
    matched_interest: SpecialInterestId


class TelemetryEventInput(BaseModel):
    profile_id: str = "leo-5"
    event_type: Literal[
        "self_advocacy_win",
        "aac_communication",
        "gestalt_mitigation",
        "activity_completed",
        "sensory_break_taken",
        "clarification_resolved",
        "transition_success",
    ]
    communicative_function: Literal[
        "requesting",
        "protesting_or_stopping",
        "asking_for_help",
        "commenting_or_sharing",
        "self_regulating",
        "learning_exploration",
    ]
    details: str
    modality: str = "touch_aac"
