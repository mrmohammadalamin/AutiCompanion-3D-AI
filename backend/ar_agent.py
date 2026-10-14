from __future__ import annotations
import os
import json
from typing import Optional
import httpx
from ar_schemas import (
    LiveCameraVoiceFrameInput,
    InferredChildDemand,
    ARActivityMode,
)

# Child-language / vocalization / babble semantic dictionary
CHILD_LANGUAGE_DICTIONARY = {
    "baba": ("I want the Cartoon Bubble & Ball Fun Game!", "ar_interactive_fun_bubbles", "star_3d", "cyan"),
    "dada": ("Draw with the 3D Dinosaur Model!", "ar_3d_2d_art_studio", "dino_3d", "blue"),
    "roar": ("Make the 3D T-Rex Dinosaur roar and spin!", "ar_3d_2d_art_studio", "dino_3d", "emerald"),
    "choo": ("Let's play Cartoon Train Math Matching!", "ar_cartoon_math_match", "train_3d", "amber"),
    "wee": ("Spin the 3D Space Rocket fast!", "ar_3d_2d_art_studio", "rocket_3d", "purple"),
    "num num": ("Play Cartoon Fruit & Number Matching!", "ar_cartoon_math_match", "cat_3d", "coral"),
    "no no": ("Change activity — show comforting Cartoon Buddy!", "ar_comfort_soothing_buddy", "cat_3d", "teal"),
    "mama": ("Comfort me with gentle stars and Cartoon Buddy", "ar_comfort_soothing_buddy", "cat_3d", "pink"),
}


class AutonomousCameraVoiceAgent:
    """
    Autonomous Multimodal Agent that continuously interprets:
    1. Child's Facial Expression (Smiling, Crying, Surprised/Curious, Frowning/Frustrated, Playful)
    2. Child's Voice, Crying, Laughing & Own Language / Babble
    3. Touch interactions on the Full-Screen Camera View
    And automatically switches/adapts the Full-Screen Camera AR Overlay:
    - 2D & 3D Artistic Model & Drawing Studio (ar_3d_2d_art_studio)
    - Cartoon Math & Matching Game (ar_cartoon_math_match)
    - Interactive Cartoon Fun & Bubble Pop (ar_interactive_fun_bubbles)
    - Soothing Comfort Cartoon Buddy when Crying/Distressed (ar_comfort_soothing_buddy)
    """

    async def analyze_live_stream(self, frame: LiveCameraVoiceFrameInput) -> InferredChildDemand:
        raw_speech = (frame.speech_or_child_language or "").strip().lower()
        target_mode: ARActivityMode = frame.current_ar_mode
        target_model = frame.current_3d_model or "dino_3d"
        target_color = "cyan"

        # Extract requested 3D model or color from voice/child language if present
        if any(w in raw_speech for w in ("dino", "rex", "roar", "monster", "dada")):
            target_model = "dino_3d"
        elif any(w in raw_speech for w in ("rocket", "space", "star", "moon", "wee", "fly")):
            target_model = "rocket_3d"
        elif any(w in raw_speech for w in ("cat", "kitty", "meow", "dog", "animal", "pet")):
            target_model = "cat_3d"
        elif any(w in raw_speech for w in ("robot", "bot", "car", "train", "choo")):
            target_model = "robot_3d"
        elif any(w in raw_speech for w in ("cube", "crystal", "diamond", "shape", "3d")):
            target_model = "crystal_3d"

        for col_name, col_hex in [
            ("blue", "#38bdf8"),
            ("green", "#10b981"),
            ("red", "#f43f5e"),
            ("pink", "#ec4899"),
            ("yellow", "#facc15"),
            ("purple", "#a855f7"),
            ("orange", "#fb923c"),
        ]:
            if col_name in raw_speech:
                target_color = col_hex
                break

        # 1. PRIORITY 1: CRYING OR DISTRESSED FACIAL EXPRESSION / VOCALIZATION
        if (
            frame.facial_expression == "crying_distressed"
            or frame.audio_vocal_type == "crying_vocal"
            or any(w in raw_speech for w in ("cry", "sad", "hurt", "scared", "wah"))
        ):
            return InferredChildDemand(
                demand_summary="Child is crying/distressed — Wants immediate comfort, soothing cartoon buddy & gentle floating bubbles",
                detected_emotion_state="Crying / Distressed (Detected via Face + Audio Pitch Contour)",
                child_language_translation="\"I feel upset — please comfort me and change this activity\"",
                target_ar_mode="ar_comfort_soothing_buddy",
                target_3d_model="cat_3d",
                target_color="#2dd4bf",
                cartoon_buddy_action="hugs_and_singing_lullaby_bubbles",
                companion_voice_response=f"I'm right here with you, {frame.child_name}. Look at the gentle glowing bubbles and friendly kitty!",
                autonomous_switch_triggered=True,
                confidence=0.96,
                agent_reasoning=(
                    "Detected crying facial expression / high-pitch distress vocalization. "
                    "Autonomously switched full-screen camera overlay to Soothing Comfort Buddy & Calm Bubbles."
                ),
            )

        # 2. PRIORITY 2: FROWNING / FRUSTRATED -> SWITCH TO FUN INTERACTIVE CARTOON GAME OR 3D ART
        if frame.facial_expression == "frowning_frustrated":
            next_mode: ARActivityMode = (
                "ar_interactive_fun_bubbles"
                if frame.current_ar_mode == "ar_cartoon_math_match"
                else "ar_3d_2d_art_studio"
            )
            return InferredChildDemand(
                demand_summary="Child looks frustrated with current task — Automatically switching to fun 3D Art & Cartoon Play!",
                detected_emotion_state="Frowning / Frustrated (Detected via Brow & Mouth Geometry)",
                child_language_translation="\"This feels hard or boring — show me something fun!\"",
                target_ar_mode=next_mode,
                target_3d_model=target_model,
                target_color="#f59e0b",
                cartoon_buddy_action="cheering_and_spinning_3d_model",
                companion_voice_response=f"Let's switch to something super fun, {frame.child_name}! Look at the 3D magic model on your camera!",
                autonomous_switch_triggered=True,
                confidence=0.91,
                agent_reasoning=(
                    f"Detected frowning/frustration during {frame.current_ar_mode}. "
                    f"Autonomously switched camera overlay to {next_mode} to keep the child happy and engaged."
                ),
            )

        # 3. PRIORITY 3: CHILD'S OWN LANGUAGE / BABBLE / VOCALIZATION TRANSLATION
        for cue, (meaning, mode, model, col) in CHILD_LANGUAGE_DICTIONARY.items():
            if cue in raw_speech:
                return InferredChildDemand(
                    demand_summary=meaning,
                    detected_emotion_state=f"Expressive Vocalization + {frame.facial_expression.replace('_', ' ').title()}",
                    child_language_translation=f"Child sound \"{raw_speech}\" translated as: \"{meaning}\"",
                    target_ar_mode=mode,  # type: ignore
                    target_3d_model=model,
                    target_color=col,
                    cartoon_buddy_action="dancing_celebration",
                    companion_voice_response=f"I understood you! {meaning}",
                    autonomous_switch_triggered=(mode != frame.current_ar_mode),
                    confidence=0.93,
                    agent_reasoning=f"Translated child vocalization '{raw_speech}' via Child Language Acoustic Mapper.",
                )

        # 4. PRIORITY 4: SPOKEN VOICE COMMANDS ("math", "match", "draw", "3d", "game", "bubble", "fun")
        if raw_speech:
            if any(w in raw_speech for w in ("math", "count", "number", "match", "puzzle", "plus")):
                target_mode = "ar_cartoon_math_match"
                summary = "Wants to play Cartoon Math & Matching on the Camera View"
                reply = f"Let's play Cartoon Math Matching right on your camera, {frame.child_name}!"
            elif any(w in raw_speech for w in ("draw", "paint", "3d", "2d", "model", "art", "sculpt", "color", "colour")):
                target_mode = "ar_3d_2d_art_studio"
                summary = f"Wants 2D & 3D Artistic Model ({target_model}) and Drawing on Camera"
                reply = f"Here is your 3D model and air-drawing brush on the camera! Smile or touch to paint and spin it!"
            elif any(w in raw_speech for w in ("game", "fun", "bubble", "pop", "play", "cartoon", "dance")):
                target_mode = "ar_interactive_fun_bubbles"
                summary = "Wants Interactive Cartoon Fun & Bubble Pop Game on Camera"
                reply = f"Bubble Pop Cartoon Party on your camera! Smile or tap to pop the glowing cartoon bubbles!"
            else:
                # Optional Gemini API translation for novel child speech
                gemini_res = await self._try_gemini_translation(frame, raw_speech)
                if gemini_res:
                    return gemini_res
                summary = f"Expressed '{raw_speech}' — Adapting 3D/2D Camera Activity"
                reply = f"Awesome! Let's bring '{raw_speech}' to life on your camera screen!"

            return InferredChildDemand(
                demand_summary=summary,
                detected_emotion_state=frame.facial_expression.replace("_", " ").title(),
                child_language_translation=f"\"{raw_speech}\" -> {summary}",
                target_ar_mode=target_mode,
                target_3d_model=target_model,
                target_color=target_color,
                cartoon_buddy_action="jumping_with_sparkles",
                companion_voice_response=reply,
                autonomous_switch_triggered=(target_mode != frame.current_ar_mode),
                confidence=0.94,
                agent_reasoning=f"Fused voice command '{raw_speech}' with facial state '{frame.facial_expression}'.",
            )

        # 5. PRIORITY 5: SMILING / LAUGHING / SURPRISED FACIAL EXPRESSION DRIVES THE EXPERIENCE
        if frame.facial_expression == "smiling_happy" or frame.audio_vocal_type == "laughing_giggle":
            return InferredChildDemand(
                demand_summary="Child is smiling & happy! Amplifying 3D/2D interactive effects & rewarding with cartoon sparkles!",
                detected_emotion_state="Smiling / Happy & Laughing (High Positive Engagement)",
                child_language_translation="Smile & laughter -> \"I love this activity! Give me more magic effects!\"",
                target_ar_mode=frame.current_ar_mode,
                target_3d_model=target_model,
                target_color="#10b981",
                cartoon_buddy_action="happy_spin_and_confetti_burst",
                companion_voice_response=f"I love your big smile, {frame.child_name}! Look how your smile makes the 3D model glow and dance!",
                autonomous_switch_triggered=False,
                confidence=0.95,
                agent_reasoning="Detected big smile/laughter on live camera -> Triggered smile-powered 3D animation boost.",
            )

        if frame.facial_expression == "surprised_curious":
            # Curious/Surprised -> Cycle to a cool new 3D model or math challenge!
            next_models = ["dino_3d", "rocket_3d", "robot_3d", "cat_3d", "crystal_3d"]
            idx = (next_models.index(target_model) + 1) % len(next_models) if target_model in next_models else 0
            new_model = next_models[idx]
            return InferredChildDemand(
                demand_summary="Child looks curious & amazed ('Wow!' expression) — Revealing a new 3D Artistic Model!",
                detected_emotion_state="Surprised / Curious (Wide Eyes & Open Mouth)",
                child_language_translation="Curious expression -> \"Show me a new surprise 3D model!\"",
                target_ar_mode="ar_3d_2d_art_studio",
                target_3d_model=new_model,
                target_color="#a855f7",
                cartoon_buddy_action="magic_wand_reveal",
                companion_voice_response=f"Wow! Your curious face unlocked a brand new 3D model on your camera!",
                autonomous_switch_triggered=True,
                confidence=0.90,
                agent_reasoning="Detected surprised/curious facial expression -> Unlocked next 3D model in AR studio.",
            )

        return InferredChildDemand(
            demand_summary="Child is calmly watching the live camera — Keeping interactive AR objects ready",
            detected_emotion_state="Calm & Attentive",
            child_language_translation="Observing camera mirror & cartoon companion",
            target_ar_mode=frame.current_ar_mode,
            target_3d_model=target_model,
            target_color="#38bdf8",
            cartoon_buddy_action="friendly_wave",
            companion_voice_response=f"Smile, make a sound, or touch the screen to play on your camera, {frame.child_name}!",
            autonomous_switch_triggered=False,
            confidence=0.85,
            agent_reasoning="Continuous camera & microphone perception active.",
        )

    async def _try_gemini_translation(
        self, frame: LiveCameraVoiceFrameInput, raw_speech: str
    ) -> Optional[InferredChildDemand]:
        api_key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
        if not api_key:
            return None
        prompt = (
            "You are an AI camera & voice companion for an autistic child.\n"
            f"Facial expression: {frame.facial_expression}, Vocalization/Speech: '{raw_speech}'.\n"
            "Infer what the child wants and pick one target_ar_mode from: "
            "ar_3d_2d_art_studio, ar_cartoon_math_match, ar_interactive_fun_bubbles, ar_comfort_soothing_buddy.\n"
            "And one target_3d_model from: dino_3d, rocket_3d, robot_3d, cat_3d, crystal_3d.\n"
            "Return JSON with keys: demand_summary, child_language_translation, target_ar_mode, target_3d_model, companion_voice_response."
        )
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={api_key}"
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                resp = await client.post(
                    url,
                    json={
                        "contents": [{"parts": [{"text": prompt}]}],
                        "generationConfig": {"responseMimeType": "application/json", "temperature": 0.2},
                    },
                )
                if resp.status_code == 200:
                    data = json.loads(resp.json()["candidates"][0]["content"]["parts"][0]["text"])
                    return InferredChildDemand(
                        demand_summary=data.get("demand_summary", "Gemini Inferred Child Demand"),
                        detected_emotion_state=frame.facial_expression,
                        child_language_translation=data.get("child_language_translation", raw_speech),
                        target_ar_mode=data.get("target_ar_mode", "ar_3d_2d_art_studio"),
                        target_3d_model=data.get("target_3d_model", "dino_3d"),
                        target_color="#38bdf8",
                        cartoon_buddy_action="magic_sparkle",
                        companion_voice_response=data.get("companion_voice_response", "Let's play!"),
                        autonomous_switch_triggered=True,
                        confidence=0.92,
                        agent_reasoning="Resolved by Gemini Live Multimodal Agent.",
                    )
        except Exception:
            return None
        return None


    async def generate_toy_reaction(
        self, req_data: "CustomToyConversationInput"
    ) -> "CustomToyConversationResponse":
        import re
        from ar_schemas import CustomToyConversationResponse

        utterance = (req_data.child_utterance or "").strip().lower()
        toy = req_data.toy_name or "Barnaby"
        name = req_data.child_name or "Mia"

        def has_word(pattern: str) -> bool:
            return bool(re.search(pattern, utterance))

        # 1. Crying / Distressed or sad feelings -> Toy comforts child with a warm hug or belly breathing
        if (
            req_data.facial_expression == "crying_distressed"
            or req_data.audio_vocal_type == "crying_vocal"
            or has_word(r"\b(sad|cry|crying|upset|hurt|scared|afraid|help me|hug|cuddle)\b")
        ):
            return CustomToyConversationResponse(
                toy_speech=f"Aww {name}, I'm right here with you! Big warm cuddle hug from {toy}—want to do a slow belly breath or pop calm bubbles together?",
                toy_animation_state="comfort_hug_glow",
                suggested_canvas_activity="ar_comfort_soothing_buddy",
                inferred_child_mode=f"Cuddle & Co-Regulation With {name}",
                suggested_3d_action="hug",
            )

        # 2. Greetings ("hello", "hi", "hey", "good morning", "good afternoon")
        if has_word(r"\b(hello|hi|hey|howdy|good morning|good afternoon|good evening|yo)\b"):
            return CustomToyConversationResponse(
                toy_speech=f"Hello {name}! I'm waving my hand at you! It makes me so happy to hear your voice—what should we play together?",
                toy_animation_state="curious_tilt_wave",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Two-Way Greeting With {name}",
                suggested_3d_action="wave",
            )

        # 3. Conversational Check-Ins ("how are you", "how do you feel", "are you okay")
        if has_word(r"(how are you|how do you feel|are you okay|how's it going|what's up)"):
            return CustomToyConversationResponse(
                toy_speech=f"I'm feeling super happy because I get to play with you, {name}! How are you feeling today?",
                toy_animation_state="happy_jump_dance",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Two-Way Check-In With {name}",
                suggested_3d_action="cheer_hurrah",
            )

        # 4. Identity & Capabilities ("what is your name", "who are you", "what can you do", "can you hear me")
        if has_word(r"(your name|who are you|what are you)"):
            return CustomToyConversationResponse(
                toy_speech=f"Hehe, my name is {toy}, and I'm your 3D best friend, {name}! Ask me to jump, kick the football, dance, or play a game with you!",
                toy_animation_state="curious_tilt_wave",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Introducing {toy} to {name}",
                suggested_3d_action="bow_ta_da",
            )

        if has_word(r"(can you hear|are you listening|listen to me|what can you do)"):
            return CustomToyConversationResponse(
                toy_speech=f"Yes {name}, I'm listening to every word you say and watching you on the camera! Tell me what action we should do together!",
                toy_animation_state="curious_tilt_wave",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Listening Attentively to {name}",
                suggested_3d_action="talk_gesture",
            )

        # 5. Child shares positive feelings or affection ("i am happy", "i love you", "thank you", "good job")
        if has_word(r"(i love you|love you|best friend|you are cute|thank you|thanks|good job)"):
            return CustomToyConversationResponse(
                toy_speech=f"Aww, thank you {name}! I love being your playmate too! Here is a sweet flying kiss and a big high-five for you!",
                toy_animation_state="happy_jump_dance",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Sharing Affection With {name}",
                suggested_3d_action="blow_kiss",
            )

        if has_word(r"\b(happy|excited|great|good|awesome|fun)\b"):
            return CustomToyConversationResponse(
                toy_speech=f"Yay {name}, I'm so glad you feel happy! Let's clap our hands and celebrate together!",
                toy_animation_state="happy_jump_dance",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Celebrating With {name}",
                suggested_3d_action="clap_hands",
            )

        # 6. Frustrated / Tired / Switch request
        if req_data.facial_expression == "frowning_frustrated" or has_word(
            r"\b(change|different|switch|hard|bored|tired|sleepy)\b"
        ):
            if has_word(r"\b(tired|sleepy|nap|rest)\b"):
                return CustomToyConversationResponse(
                    toy_speech=f"Let's take a cozy rest together, {name}. I'm sitting down on the soft grass with you—no rush at all!",
                    toy_animation_state="comfort_hug_glow",
                    suggested_canvas_activity=req_data.active_canvas_mode,
                    inferred_child_mode=f"Cozy Rest With {name}",
                    suggested_3d_action="sit_relax",
                )
            return CustomToyConversationResponse(
                toy_speech=f"That's totally okay {name}! What would you like to do instead—kick the 3D football, pop bubbles, or draw together?",
                toy_animation_state="curious_tilt_wave",
                suggested_canvas_activity="ar_interactive_fun_bubbles",
                inferred_child_mode=f"Sweet Peer Switch for {name}",
                suggested_3d_action="talk_gesture",
            )

        # 7. Child asks the toy to draw something for them
        if has_word(r"\b(draw|paint|sketch|picture|art)\b"):
            return CustomToyConversationResponse(
                toy_speech=f"Yay {name}, watch me draw this for you—what colour or animal do you want to add next?",
                toy_animation_state="curious_tilt_wave",
                suggested_canvas_activity="ar_3d_2d_art_studio",
                inferred_child_mode=f"Drawing Together With {name}",
                suggested_3d_action="wave",
            )

        # 8. Child asks or agrees to sing a favourite song or dance together
        if has_word(r"\b(sing|song|music|twinkle|melody|lullaby)\b"):
            return CustomToyConversationResponse(
                toy_speech=f"Hehe, let's sing and dance together {name}! Ready to sing with me?",
                toy_animation_state="happy_jump_dance",
                suggested_canvas_activity="ar_video_3d_animation",
                inferred_child_mode=f"Singing Together With {name}",
                suggested_3d_action="dance",
            )

        # 9. Child asks to play football / soccer / ball
        if has_word(r"\b(football|soccer|kick|goal|ball|pass)\b"):
            return CustomToyConversationResponse(
                toy_speech=f"Goal time, {name}! Watch me dribble and kick the 3D football right into the net for you—ready to kick the next one?",
                toy_animation_state="happy_jump_dance",
                suggested_canvas_activity="ar_physical_and_math_game",
                inferred_child_mode=f"3D Football Co-Play With {name}",
                suggested_3d_action="kick_football",
            )

        # 10. Child asks or agrees to play a game / math / bubbles together
        if has_word(r"\b(math|count|number|match|game|yes|yeah|okay|sure|play)\b"):
            return CustomToyConversationResponse(
                toy_speech=f"Yippee {name}! Let's play together! I'll jump to help you catch the 3D bubbles—which one do you want to pop first?",
                toy_animation_state="happy_jump_dance",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Co-Play Game With {name}",
                suggested_3d_action="jump_catch",
            )

        # 11. Conversational response acknowledging the child's exact words!
        if utterance:
            clean_echo = (req_data.child_utterance or "").strip()
            return CustomToyConversationResponse(
                toy_speech=f"I heard you say \"{clean_echo}\", {name}! I'm right here with you—want me to jump, dance, kick the 3D football, or play a game together?",
                toy_animation_state="curious_tilt_wave",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Conversing With {name}",
                suggested_3d_action="talk_gesture",
            )

        # 12. Smiling / Happy default response -> Short, natural turn-taking question
        if req_data.facial_expression == "smiling_happy":
            return CustomToyConversationResponse(
                toy_speech=f"Hehe, I love your sweet smile, {name}! What should we do together next?",
                toy_animation_state="happy_jump_dance",
                suggested_canvas_activity=req_data.active_canvas_mode,
                inferred_child_mode=f"Natural Turn-Taking With {name}",
                suggested_3d_action="wave",
            )

        return CustomToyConversationResponse(
            toy_speech=f"Hi {name}! I'm listening and watching—tell me what game or action you want us to do together!",
            toy_animation_state="curious_tilt_wave",
            suggested_canvas_activity=req_data.active_canvas_mode,
            inferred_child_mode=f"Waiting for {name}'s Turn",
            suggested_3d_action="wave",
        )




