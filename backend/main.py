from __future__ import annotations
import os
from datetime import datetime, timezone
from typing import Dict, List, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from schemas import (
    ChildProfile,
    SensoryProfile,
    GestaltMapping,
    ScheduleStep,
    MultimodalSignalInput,
    AgentOrchestrationResponse,
    ShowAndTellRequest,
    ShowAndTellResponse,
    TelemetryEventInput,
)
from policy_gateway import DeterministicPolicyGateway, APPROVED_MEDIA_CATALOG
from agents import BoundedMultiAgentOrchestrator, SPECIAL_INTEREST_META
from ar_schemas import (
    LiveCameraVoiceFrameInput,
    InferredChildDemand,
    CustomToyConversationInput,
    CustomToyConversationResponse,
)
from ar_agent import AutonomousCameraVoiceAgent

load_dotenv()

app = FastAPI(
    title="AutiCompanion AI — Bounded Multi-Agent Backend",
    description=(
        "Neurodiversity-affirming, multimodal agentic companion API for autistic children (ages 2–11). "
        "Implements Google ADK-style specialist agents, Gestalt Language Processing (GLP), "
        "Special-Interest ('Spin') Infusion, and a Zero-Trust Deterministic Policy Gateway."
    ),
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.responses import Response
from pydantic import BaseModel

policy_gateway = DeterministicPolicyGateway()
orchestrator = BoundedMultiAgentOrchestrator(policy_gateway)
ar_camera_agent = AutonomousCameraVoiceAgent()

# In-memory cache for fast neural TTS playback
TTS_AUDIO_CACHE: Dict[str, bytes] = {}


class NeuralTTSRequest(BaseModel):
    text: str
    persona: str = "toy_child_girl"  # "toy_child_girl" or "adult_guide"
    voice_preset: str = "sweet_small_girl_5y"  # "sweet_small_girl_5y" | "cute_little_girl_4y" | "cartoon_girl_6y" | "gentle_sister_8y"
    pitch_hz: int = 10
    rate_pct: int = -2


import re
import httpx
import edge_tts


def _split_tts_chunks(text: str, max_len: int = 175) -> List[str]:
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    chunks: List[str] = []
    current = ""
    for sent in sentences:
        if not sent:
            continue
        if len(current) + len(sent) + 1 <= max_len:
            current = f"{current} {sent}".strip()
        else:
            if current:
                chunks.append(current)
            if len(sent) <= max_len:
                current = sent
            else:
                words = sent.split(" ")
                temp = ""
                for w in words:
                    if len(temp) + len(w) + 1 <= max_len:
                        temp = f"{temp} {w}".strip()
                    else:
                        if temp:
                            chunks.append(temp)
                        temp = w
                current = temp
    if current:
        chunks.append(current)
    return chunks or [text[:max_len]]


@app.post("/api/tts/speak")
async def synthesize_neural_voice(req: NeuralTTSRequest) -> Response:
    """
    Dual-Persona Neural TTS Engine powered by Microsoft Edge Neural Voices (edge_tts):
    - 'toy_child_girl': Uses genuine child-girl neural voices ('en-US-AnaNeural' / 'en-GB-MaisieNeural')
      with sweet child pitch/rate shaping so the 3D toy sounds like a sweet small girl peer.
    - 'adult_guide': Uses warm adult neural voice ('en-GB-SoniaNeural') for App Settings & Directions.
    """
    clean_text = (req.text or "").strip()
    if not clean_text:
        raise HTTPException(status_code=400, detail="Empty text")

    cache_key = f"{req.persona}::{req.voice_preset}::{req.pitch_hz}::{req.rate_pct}::{clean_text}"
    if cache_key in TTS_AUDIO_CACHE:
        return Response(content=TTS_AUDIO_CACHE[cache_key], media_type="audio/mpeg")

    # 1. Primary: Genuine Microsoft Neural Child Girl Voice via edge_tts
    try:
        if req.persona == "adult_guide":
            voice_name = "en-GB-SoniaNeural"
            pitch_str = "+0Hz"
            rate_str = "-4%"
        else:
            preset_map = {
                "sweet_small_girl_5y": ("en-US-AnaNeural", max(0, req.pitch_hz or 10), req.rate_pct if req.rate_pct is not None else -2),
                "cute_little_girl_4y": ("en-GB-MaisieNeural", max(6, req.pitch_hz or 15), req.rate_pct if req.rate_pct is not None else -4),
                "cartoon_girl_6y": ("en-US-AnaNeural", max(10, req.pitch_hz or 18), req.rate_pct if req.rate_pct is not None else 2),
                "gentle_sister_8y": ("en-US-AnaNeural", max(0, req.pitch_hz or 4), req.rate_pct if req.rate_pct is not None else -8),
            }
            voice_name, p_hz, r_pct = preset_map.get(
                req.voice_preset, ("en-US-AnaNeural", max(0, req.pitch_hz or 10), -2)
            )
            pitch_str = f"+{p_hz}Hz" if p_hz >= 0 else f"{p_hz}Hz"
            rate_str = f"+{r_pct}%" if r_pct >= 0 else f"{r_pct}%"

        communicate = edge_tts.Communicate(
            clean_text,
            voice_name,
            pitch=pitch_str,
            rate=rate_str,
        )
        audio_chunks: List[bytes] = []
        async for chunk in communicate.stream():
            if chunk["type"] == "audio" and chunk.get("data"):
                audio_chunks.append(chunk["data"])

        mp3_bytes = b"".join(audio_chunks)
        if mp3_bytes:
            if len(TTS_AUDIO_CACHE) > 250:
                TTS_AUDIO_CACHE.clear()
            TTS_AUDIO_CACHE[cache_key] = mp3_bytes
            return Response(
                content=mp3_bytes,
                media_type="audio/mpeg",
                headers={"X-Voice-Engine": f"edge-tts:{voice_name}"},
            )
    except Exception:
        pass

    # 2. Fallback: Google Translate TTS stream
    tl_lang = "en-gb" if req.persona == "adult_guide" else "en"
    chunks = _split_tts_chunks(clean_text)

    try:
        audio_parts: List[bytes] = []
        async with httpx.AsyncClient(timeout=4.0) as client:
            for chunk_str in chunks:
                resp = await client.get(
                    "https://translate.google.com/translate_tts",
                    params={
                        "ie": "UTF-8",
                        "client": "tw-ob",
                        "tl": tl_lang,
                        "q": chunk_str,
                    },
                    headers={"User-Agent": "Mozilla/5.0"},
                )
                if resp.status_code == 200 and resp.content:
                    audio_parts.append(resp.content)

        mp3_bytes = b"".join(audio_parts)
        if mp3_bytes:
            if len(TTS_AUDIO_CACHE) > 250:
                TTS_AUDIO_CACHE.clear()
            TTS_AUDIO_CACHE[cache_key] = mp3_bytes
            return Response(
                content=mp3_bytes,
                media_type="audio/mpeg",
                headers={"X-Voice-Engine": "fallback-translate-tts"},
            )
    except Exception as exc:
        raise HTTPException(status_code=503, detail=f"Neural TTS unavailable: {exc}")

    raise HTTPException(status_code=503, detail="No audio generated")



@app.post("/api/ar/analyze-stream", response_model=InferredChildDemand)
async def analyze_live_camera_and_voice_stream(
    frame: LiveCameraVoiceFrameInput,
) -> InferredChildDemand:
    return await ar_camera_agent.analyze_live_stream(frame)


@app.post("/api/ar/toy-conversation", response_model=CustomToyConversationResponse)
async def handle_custom_toy_conversation(
    req: CustomToyConversationInput,
) -> CustomToyConversationResponse:
    return await ar_camera_agent.generate_toy_reaction(req)




# Pre-seeded neuro-diverse child profiles across developmental bands 2–4, 5–7, and 8–11
PROFILES_DB: Dict[str, ChildProfile] = {
    "mia-3": ChildProfile(
        id="mia-3",
        name="Mia",
        age=3,
        developmental_band="2-4",
        primary_interest="dinosaurs",
        secondary_interest="music_art",
        languages=["en-GB"],
        sensory=SensoryProfile(
            quiet_mode=False,
            reduced_motion=True,
            sensory_theme="calm_sage",
            choice_density=2,
            speech_rate=0.85,
            tts_enabled=True,
            errorless_learning=True,
            transition_warning_seconds=60,
            max_volume_db=60,
            camera_opt_in=False,
            mic_opt_in=True,
        ),
        gestalt_dictionary=[
            GestaltMapping(
                id="g-mia-1",
                phrase="Stomp stomp roar!",
                meaning="I want to draw or play with the blue dinosaur",
                target_action="open_drawing",
                target_args={"interest": "dinosaurs", "color": "blue"},
                stage="Stage 1 (Whole Gestalt)",
                mitigations=["Let's stomp and draw", "Stomp with blue dino", "All done stomping"],
            ),
            GestaltMapping(
                id="g-mia-2",
                phrase="Twinkle twinkle little",
                meaning="I want calm kalimba music or a sensory break",
                target_action="open_music_pad",
                target_args={"interest": "music_art"},
                stage="Stage 1 (Whole Gestalt)",
                mitigations=["Play twinkle music", "Quiet music please", "Take a break"],
            ),
            GestaltMapping(
                id="g-mia-3",
                phrase="Bye bye now",
                meaning="I am all done with this activity",
                target_action="show_home",
                target_args={},
                stage="Stage 2 (Mitigated)",
                mitigations=["All done now", "Back to home", "Let's try something else"],
            ),
        ],
        schedule=[
            ScheduleStep(
                id="s-mia-1",
                slot="First",
                title="Draw Blue Dino",
                icon="🦕",
                action="open_drawing",
                action_args={"interest": "dinosaurs"},
                completed=False,
            ),
            ScheduleStep(
                id="s-mia-2",
                slot="Then",
                title="Calm Kalimba Music",
                icon="🎵",
                action="open_music_pad",
                action_args={},
                completed=False,
            ),
            ScheduleStep(
                id="s-mia-3",
                slot="Next",
                title="Quiet Safe Harbor",
                icon="🌿",
                action="open_safe_harbor",
                action_args={},
                completed=False,
            ),
        ],
    ),
    "leo-5": ChildProfile(
        id="leo-5",
        name="Leo",
        age=6,
        developmental_band="5-7",
        primary_interest="trains",
        secondary_interest="dinosaurs",
        languages=["en-GB", "ar-SA"],
        sensory=SensoryProfile(
            quiet_mode=False,
            reduced_motion=False,
            sensory_theme="calm_sage",
            choice_density=4,
            speech_rate=0.92,
            tts_enabled=True,
            errorless_learning=True,
            transition_warning_seconds=30,
            max_volume_db=65,
            camera_opt_in=True,
            mic_opt_in=True,
        ),
        gestalt_dictionary=[
            GestaltMapping(
                id="g-leo-1",
                phrase="Chugga chugga choo choo!",
                meaning="Let's count train carriages in the Math Lab",
                target_action="open_math_activity",
                target_args={"interest": "trains"},
                stage="Stage 1 (Whole Gestalt)",
                mitigations=[
                    "Let's count train cars",
                    " Let's draw a train",
                    "Let's test train magnets",
                ],
            ),
            GestaltMapping(
                id="g-leo-2",
                phrase="To infinity and beyond!",
                meaning="I want to explore the Space & Magnet Science Lab",
                target_action="open_science_activity",
                target_args={"interest": "space"},
                stage="Stage 1 (Whole Gestalt)",
                mitigations=["Let's go to space science", "Let's launch the rocket", "All done space"],
            ),
            GestaltMapping(
                id="g-leo-3",
                phrase="Blue dinosaur please",
                meaning="Open the drawing canvas with a blue dinosaur template",
                target_action="open_drawing",
                target_args={"interest": "dinosaurs", "color": "blue"},
                stage="Stage 2 (Mitigated)",
                mitigations=["Draw a blue dinosaur", "Colour it green", "Make it move gently"],
            ),
            GestaltMapping(
                id="g-leo-4",
                phrase="Ears hurt Cover ears",
                meaning="Sensory overload — switch to Quiet Safe Harbor immediately",
                target_action="open_safe_harbor",
                target_args={"reason": "auditory_overload"},
                stage="Stage 2 (Mitigated)",
                mitigations=["Too loud", "I need a quiet break", "Turn sound off"],
            ),
        ],
        schedule=[
            ScheduleStep(
                id="s-leo-1",
                slot="First",
                title="Count Steam Trains",
                icon="🚂",
                action="open_math_activity",
                action_args={"interest": "trains"},
                completed=False,
            ),
            ScheduleStep(
                id="s-leo-2",
                slot="Then",
                title="Draw Blue Dinosaur",
                icon="🎨",
                action="open_drawing",
                action_args={"interest": "dinosaurs", "color": "blue"},
                completed=False,
            ),
            ScheduleStep(
                id="s-leo-3",
                slot="Next",
                title="Magnet Push & Pull Science",
                icon="🧲",
                action="open_science_activity",
                action_args={"interest": "trains"},
                completed=False,
            ),
        ],
    ),
    "zara-9": ChildProfile(
        id="zara-9",
        name="Zara",
        age=10,
        developmental_band="8-11",
        primary_interest="space",
        secondary_interest="ocean",
        languages=["en-GB"],
        sensory=SensoryProfile(
            quiet_mode=False,
            reduced_motion=False,
            sensory_theme="deep_dusk",
            choice_density=6,
            speech_rate=1.0,
            tts_enabled=False,
            errorless_learning=True,
            transition_warning_seconds=30,
            max_volume_db=60,
            camera_opt_in=True,
            mic_opt_in=True,
        ),
        gestalt_dictionary=[
            GestaltMapping(
                id="g-zara-1",
                phrase="Houston we have a problem",
                meaning="This puzzle feels tricky — I want a hint or step-by-step breakdown",
                target_action="show_aac_choices",
                target_args={"scaffold": "step_by_step"},
                stage="Stage 2 (Mitigated)",
                mitigations=["Give me a hint", "Show me step by step", "Switch to ocean lab"],
            ),
            GestaltMapping(
                id="g-zara-2",
                phrase="Deep blue sea",
                meaning="I need to decompress in the Ocean or Safe Harbor view",
                target_action="open_safe_harbor",
                target_args={"theme": "ocean"},
                stage="Stage 3 (Isolated Words)",
                mitigations=["Quiet ocean ripples", "Five minute break", "Mute all audio"],
            ),
        ],
        schedule=[
            ScheduleStep(
                id="s-zara-1",
                slot="First",
                title="Orbital Gravity Lab",
                icon="🚀",
                action="open_science_activity",
                action_args={"interest": "space"},
                completed=False,
            ),
            ScheduleStep(
                id="s-zara-2",
                slot="Then",
                title="Solar System Math Patterns",
                icon="🪐",
                action="open_math_activity",
                action_args={"interest": "space"},
                completed=False,
            ),
            ScheduleStep(
                id="s-zara-3",
                slot="Next",
                title="Compose Pentatonic Synth",
                icon="🎹",
                action="open_music_pad",
                action_args={"interest": "music_art"},
                completed=False,
            ),
        ],
    ),
}

# Neuro-Affirming Caregiver / SLP / OT Telemetry Store (Zero compliance scoring!)
TELEMETRY_DB: Dict[str, List[Dict[str, Any]]] = {
    "mia-3": [
        {
            "id": "ev-101",
            "timestamp": "2026-10-13T01:20:00Z",
            "event_type": "gestalt_mitigation",
            "communicative_function": "requesting",
            "details": "Used Gestalt 'Stomp stomp roar!' -> Chose mitigated card 'Let's stomp and draw'",
            "modality": "speech_and_aac",
        },
        {
            "id": "ev-102",
            "timestamp": "2026-10-13T01:28:00Z",
            "event_type": "self_advocacy_win",
            "communicative_function": "protesting_or_stopping",
            "details": "Tapped fixed STOP button to end animation instead of exiting the app",
            "modality": "touch_aac",
        },
    ],
    "leo-5": [
        {
            "id": "ev-201",
            "timestamp": "2026-10-13T01:15:00Z",
            "event_type": "gestalt_mitigation",
            "communicative_function": "requesting",
            "details": "Matched Gestalt 'Chugga chugga choo choo!' -> Completed 3 Errorless Train Addition puzzles",
            "modality": "gestalt_speech",
        },
        {
            "id": "ev-202",
            "timestamp": "2026-10-13T01:32:00Z",
            "event_type": "self_advocacy_win",
            "communicative_function": "self_regulating",
            "details": "Used 'Safe Harbor / Break' card when ambient noise rose; returned after 90s of breathing ripples",
            "modality": "touch_aac",
        },
        {
            "id": "ev-203",
            "timestamp": "2026-10-13T01:44:00Z",
            "event_type": "clarification_resolved",
            "communicative_function": "commenting_or_sharing",
            "details": "Shared toy dinosaur via Opt-in Show & Tell -> Selected 'Draw Blue Dinosaur' from 4 visual cards",
            "modality": "show_and_tell_plus_touch",
        },
        {
            "id": "ev-204",
            "timestamp": "2026-10-13T01:55:00Z",
            "event_type": "transition_success",
            "communicative_function": "learning_exploration",
            "details": "Transitioned smoothly from 'First: Count Steam Trains' to 'Then: Draw Blue Dinosaur' with 30s visual disk warning",
            "modality": "visual_schedule",
        },
    ],
    "zara-9": [
        {
            "id": "ev-301",
            "timestamp": "2026-10-13T01:10:00Z",
            "event_type": "activity_completed",
            "communicative_function": "learning_exploration",
            "details": "Explored Orbital Gravity & Magnet Polarity simulations in Deep Dusk sensory theme",
            "modality": "interactive_lab",
        },
    ],
}


@app.get("/api/health")
async def health_check() -> Dict[str, Any]:
    has_gemini_key = bool(os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY"))
    return {
        "status": "healthy",
        "service": "AutiCompanion AI Bounded Multi-Agent Engine",
        "engine_mode": "gemini_live_adk" if has_gemini_key else "hybrid_local_adk",
        "gemini_api_configured": has_gemini_key,
        "specialist_agents": [
            "IntentAndOrchestrationAgent",
            "AACAndGestaltAgent",
            "SpecialInterestLearningAgent",
            "CreativeCoPlayAgent",
            "SensoryAndRoutineAgent",
            "CaregiverInsightsAgent",
            "SafetyAndPolicyPreemptor",
        ],
        "special_interests": SPECIAL_INTEREST_META,
        "approved_media_catalog": list(APPROVED_MEDIA_CATALOG.values()),
    }


@app.get("/api/profiles", response_model=List[ChildProfile])
async def list_profiles() -> List[ChildProfile]:
    return list(PROFILES_DB.values())


@app.get("/api/profiles/{profile_id}", response_model=ChildProfile)
async def get_profile(profile_id: str) -> ChildProfile:
    if profile_id not in PROFILES_DB:
        raise HTTPException(status_code=404, detail=f"Profile '{profile_id}' not found")
    return PROFILES_DB[profile_id]


@app.put("/api/profiles/{profile_id}", response_model=ChildProfile)
async def update_profile(profile_id: str, updated: ChildProfile) -> ChildProfile:
    PROFILES_DB[profile_id] = updated
    return updated


@app.post("/api/profiles/{profile_id}/gestalt", response_model=ChildProfile)
async def add_gestalt_mapping(profile_id: str, mapping: GestaltMapping) -> ChildProfile:
    if profile_id not in PROFILES_DB:
        raise HTTPException(status_code=404, detail=f"Profile '{profile_id}' not found")
    profile = PROFILES_DB[profile_id]
    profile.gestalt_dictionary.insert(0, mapping)
    return profile


@app.post("/api/agent/intent", response_model=AgentOrchestrationResponse)
async def resolve_multimodal_intent(signal: MultimodalSignalInput) -> AgentOrchestrationResponse:
    profile = PROFILES_DB.get(signal.profile_id, PROFILES_DB["leo-5"])
    response = await orchestrator.process_multimodal_turn(signal, profile)

    # Automatically log Self-Advocacy wins when the child uses Stop or Safe Harbor
    if response.policy_decision.enforced_action in ("stop_activity", "open_safe_harbor", "set_quiet_mode"):
        TELEMETRY_DB.setdefault(profile.id, []).insert(
            0,
            {
                "id": f"ev-{len(TELEMETRY_DB.get(profile.id, [])) + 500}",
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "event_type": "self_advocacy_win",
                "communicative_function": "self_regulating"
                if response.policy_decision.enforced_action != "stop_activity"
                else "protesting_or_stopping",
                "details": f"Child initiated '{response.policy_decision.enforced_action}' ({response.top_hypothesis.source_modality}) — respected in {response.latency_ms}ms",
                "modality": response.top_hypothesis.source_modality,
            },
        )
    return response


@app.post("/api/agent/show-and-tell", response_model=ShowAndTellResponse)
async def process_show_and_tell_snapshot(req: ShowAndTellRequest) -> ShowAndTellResponse:
    profile = PROFILES_DB.get(req.profile_id, PROFILES_DB["leo-5"])
    res = await orchestrator.process_show_and_tell(req, profile)
    TELEMETRY_DB.setdefault(profile.id, []).insert(
        0,
        {
            "id": f"ev-{len(TELEMETRY_DB.get(profile.id, [])) + 600}",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "event_type": "aac_communication",
            "communicative_function": "commenting_or_sharing",
            "details": f"Opt-in Show & Tell shared object: '{res.detected_object}' -> Bridged to {res.matched_interest} choices",
            "modality": "show_and_tell_camera",
        },
    )
    return res


@app.get("/api/analytics/{profile_id}")
async def get_caregiver_analytics(profile_id: str) -> Dict[str, Any]:
    profile = PROFILES_DB.get(profile_id, PROFILES_DB["leo-5"])
    events = TELEMETRY_DB.get(profile.id, [])

    func_counts: Dict[str, int] = {
        "requesting": 0,
        "protesting_or_stopping": 0,
        "asking_for_help": 0,
        "commenting_or_sharing": 0,
        "self_regulating": 0,
        "learning_exploration": 0,
    }
    for e in events:
        fn = e.get("communicative_function", "requesting")
        func_counts[fn] = func_counts.get(fn, 0) + 1

    self_advocacy_count = sum(1 for e in events if e.get("event_type") == "self_advocacy_win")
    gestalt_count = sum(1 for e in events if e.get("event_type") == "gestalt_mitigation")

    return {
        "profile_id": profile.id,
        "child_name": profile.name,
        "developmental_band": profile.developmental_band,
        "ethical_framing": (
            "Neurodiversity-Affirming Telemetry: Measures communicative agency, self-advocacy wins, "
            "and sensory comfort. Never computes behavioural compliance scores or emotion diagnoses."
        ),
        "summary_metrics": {
            "total_meaningful_interactions": len(events),
            "self_advocacy_wins": self_advocacy_count,
            "gestalt_mitigations_explored": gestalt_count,
            "configured_gestalt_scripts": len(profile.gestalt_dictionary),
            "preferred_choice_density": profile.sensory.choice_density,
        },
        "communicative_functions": func_counts,
        "slp_ot_clinical_notes": [
            f"{profile.name} thrives when learning tasks are anchored in '{SPECIAL_INTEREST_META[profile.primary_interest]['label']}'.",
            f"Fixed Motor-Plan AAC bar allows {profile.name} to reliably locate 'Stop' and 'Safe Harbor' without visual scanning fatigue.",
            f"Choice density of {profile.sensory.choice_density} cards prevents decision paralysis during uncertain-intent clarification.",
        ],
        "recent_events": events[:25],
    }


@app.post("/api/analytics/event")
async def record_telemetry_event(ev: TelemetryEventInput) -> Dict[str, Any]:
    entry = {
        "id": f"ev-{len(TELEMETRY_DB.get(ev.profile_id, [])) + 700}",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "event_type": ev.event_type,
        "communicative_function": ev.communicative_function,
        "details": ev.details,
        "modality": ev.modality,
    }
    TELEMETRY_DB.setdefault(ev.profile_id, []).insert(0, entry)
    return {"status": "recorded", "event": entry}


@app.get("/api/safety/audit-log")
async def get_safety_audit_log() -> Dict[str, Any]:
    return {
        "dpia_compliance_framework": "UK ICO Age Appropriate Design Code (Children's Code) & UK GDPR",
        "guardrail_controls": [
            {
                "risk": "Unreliable Facial Emotion Inference",
                "control": "ENFORCED: Zero facial emotion classification. Camera is strictly opt-in for object 'Show & Tell' only.",
                "status": "ACTIVE",
            },
            {
                "risk": "Unbounded LLM Execution",
                "control": "ENFORCED: All specialist agent outputs must match strict ALLOWED_ACTIONS schema & sensory clamps.",
                "status": "ACTIVE",
            },
            {
                "risk": "Delayed Stop / Overwhelmed Child",
                "control": "ENFORCED: Deterministic Preemption bypasses AI inference in <5ms for Stop, Safe Harbor, and Quiet Mode.",
                "status": "ACTIVE",
            },
            {
                "risk": "Motor-Plan Disruption from Adaptive UI",
                "control": "ENFORCED: Immutable Core AAC Anchor Dock keeps Stop, Break, Help, More, All Done, and Home in fixed coordinates.",
                "status": "ACTIVE",
            },
        ],
        "recent_policy_decisions": policy_gateway.audit_log[:30],
    }
