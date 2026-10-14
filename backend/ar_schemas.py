from __future__ import annotations
from typing import Dict, List, Optional, Literal, Any
from pydantic import BaseModel, Field

FacialExpressionType = Literal[
    "smiling_happy",
    "crying_distressed",
    "surprised_curious",
    "frowning_frustrated",
    "neutral_attentive",
    "playful_silly",
]

AudioVocalType = Literal[
    "crying_vocal",
    "laughing_giggle",
    "child_own_language_babble",
    "clear_speech",
    "ambient_quiet",
]

ARActivityMode = Literal[
    "ar_3d_2d_art_studio",
    "ar_cartoon_math_match",
    "ar_interactive_fun_bubbles",
    "ar_comfort_soothing_buddy",
]


class LiveCameraVoiceFrameInput(BaseModel):
    child_name: str = "Leo"
    age: int = 5
    facial_expression: FacialExpressionType = "smiling_happy"
    expression_confidence: float = 0.92
    audio_vocal_type: AudioVocalType = "ambient_quiet"
    audio_pitch_hz: float = 240.0
    audio_energy_db: float = 55.0
    speech_or_child_language: Optional[str] = None
    touch_gesture: Optional[str] = None
    current_ar_mode: ARActivityMode = "ar_3d_2d_art_studio"
    current_3d_model: str = "dino_3d"
    frame_base64: Optional[str] = None


class InferredChildDemand(BaseModel):
    demand_summary: str = Field(..., description="What the child wants or needs right now based on face, voice/crying, and child language")
    detected_emotion_state: str
    child_language_translation: str
    target_ar_mode: ARActivityMode
    target_3d_model: str
    target_color: str
    cartoon_buddy_action: str
    companion_voice_response: str
    autonomous_switch_triggered: bool
    confidence: float
    agent_reasoning: str


class CustomToyConversationInput(BaseModel):
    child_name: str = "Leo"
    toy_name: str = "Teddy"
    toy_category: str = "Custom Uploaded Toy"
    facial_expression: FacialExpressionType = "smiling_happy"
    audio_vocal_type: AudioVocalType = "clear_speech"
    child_utterance: str = ""
    active_canvas_mode: str = "toy_3d_coplay"


class CustomToyConversationResponse(BaseModel):
    toy_speech: str
    toy_animation_state: Literal["idle_breathe", "happy_jump_dance", "comfort_hug_glow", "curious_tilt_wave", "playful_spin"]
    suggested_canvas_activity: str
    inferred_child_mode: str
    suggested_3d_action: Optional[str] = None

