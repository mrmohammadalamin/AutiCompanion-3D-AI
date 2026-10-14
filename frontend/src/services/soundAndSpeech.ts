import { SensoryProfile } from '../types';

let audioCtx: AudioContext | null = null;
let activeOscillators: OscillatorNode[] = [];
let activeNeuralAudio: HTMLAudioElement | null = null;
let currentSpeechRequestId = 0;
const neuralAudioBlobCache = new Map<string, string>();

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Preload browser voices as early as possible so getVoices() is populated.
 */
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

/**
 * Selects a natural Female / Girl voice from the browser's SpeechSynthesis voices,
 * strictly excluding male voices (e.g., Microsoft David, Mark, George, James)
 * so the 3D toy NEVER sounds like an adult male giving instructions.
 */
export function selectBrowserVoiceByPersona(
  persona: 'toy_child_girl' | 'adult_guide'
): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const maleNamePatterns =
    /\b(david|mark|george|james|richard|daniel|guy|christopher|eric|roger|steffan|ryan|male|man)\b/i;

  const nonMaleEnglishVoices = voices.filter(
    (v) => v.lang.toLowerCase().startsWith('en') && !maleNamePatterns.test(v.name)
  );

  if (persona === 'toy_child_girl') {
    // Priority 1: Child/Girl neural voices (Ana, Maisie, Libby)
    const childVoice = nonMaleEnglishVoices.find((v) =>
      /\b(ana|maisie|libby|girl|child|kid)\b/i.test(v.name)
    );
    if (childVoice) return childVoice;

    // Priority 2: High-naturalness young-sounding female voices (Aria, Jenny, Sonia, Google Female, Zira, Samantha)
    const sweetFemaleVoice = nonMaleEnglishVoices.find((v) =>
      /\b(aria|jenny|sonia|natasha|clara|zira|samantha|victoria|karen|hazel|susan|female)\b/i.test(
        v.name
      )
    );
    if (sweetFemaleVoice) return sweetFemaleVoice;
  } else {
    // Adult Guide: Warm, clear adult voice (Aria, Jenny, Sonia, Zira, Google Female, Samantha)
    const adultVoice = nonMaleEnglishVoices.find((v) =>
      /\b(aria|jenny|sonia|samantha|zira|hazel|susan|female)\b/i.test(v.name)
    );
    if (adultVoice) return adultVoice;
  }

  if (nonMaleEnglishVoices.length > 0) {
    return nonMaleEnglishVoices[0];
  }

  // Fallback to any non-male voice across locales
  const anyNonMale = voices.find((v) => !maleNamePatterns.test(v.name));
  return anyNonMale || voices[0];
}

/**
 * Immediate (<5ms) deterministic preemption of all generated speech, neural audio, and Web Audio tones.
 */
export function stopAllAudioAndSpeech(): void {
  currentSpeechRequestId++;
  if (activeNeuralAudio) {
    try {
      activeNeuralAudio.pause();
      activeNeuralAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeNeuralAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  for (const osc of activeOscillators) {
    try {
      osc.stop();
      osc.disconnect();
    } catch {
      // already stopped
    }
  }
  activeOscillators = [];
}

/**
 * Plays a cute, gentle cartoon sparkle-giggle chime right before the 3D toy speaks,
 * giving the 3D character a sweet, animated cartoon-movie personality.
 */
export function playCuteChildGiggleChime(sensory: SensoryProfile): void {
  if (sensory.quiet_mode) return;
  // High, sweet music-box notes: G5 (783.99 Hz) -> A5 (880 Hz) -> C6 (1046.5 Hz)
  playPentatonicNote(783.99, sensory, 'kalimba', 0.16);
  setTimeout(() => {
    playPentatonicNote(880.0, sensory, 'kalimba', 0.16);
  }, 75);
  setTimeout(() => {
    playPentatonicNote(1046.5, sensory, 'kalimba', 0.24);
  }, 150);
}

/**
 * Speaks as the 3D Toy Character using a Natural Sweet Child-Girl Cartoon Voice!
 * Primary: Streams Microsoft 'en-US-AnaNeural' (sweet young child girl voice) from FastAPI `/api/tts/speak`.
 * Fallback: Uses a female/girl browser voice (never male David/Mark) at sweet child pitch (1.44).
 */
export async function speakAsSweetChildGirlToy(
  text: string,
  sensory: SensoryProfile,
  options?: {
    pitchBoost?: number;
    onStart?: () => void;
    onEnd?: () => void;
  }
): Promise<void> {
  if (typeof window === 'undefined') return;
  if (sensory.quiet_mode || !sensory.tts_enabled) {
    options?.onEnd?.();
    return;
  }

  stopAllAudioAndSpeech();
  const reqId = currentSpeechRequestId;

  playCuteChildGiggleChime(sensory);
  options?.onStart?.();

  const cacheKey = `toy_child_girl::${text.trim()}`;
  try {
    let blobUrl = neuralAudioBlobCache.get(cacheKey);
    if (!blobUrl) {
      const res = await fetch('http://localhost:8085/api/tts/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          persona: 'toy_child_girl',
        }),
      });
      if (res.ok) {
        const blob = await res.blob();
        blobUrl = URL.createObjectURL(blob);
        neuralAudioBlobCache.set(cacheKey, blobUrl);
      }
    }

    if (reqId !== currentSpeechRequestId) return;

    if (blobUrl) {
      const audio = new Audio(blobUrl) as HTMLAudioElement & {
        preservesPitch?: boolean;
        webkitPreservesPitch?: boolean;
        mozPreservesPitch?: boolean;
      };
      // Shift both fundamental pitch (F0) and vocal-tract formants (F1/F2/F3) up by +24%
      // so the neural female voice becomes a natural, sweet 6-year-old cartoon little girl voice!
      audio.preservesPitch = false;
      audio.webkitPreservesPitch = false;
      audio.mozPreservesPitch = false;
      audio.playbackRate = 1.24;

      const normalizedVol = Math.min(1.0, Math.max(0.2, (sensory.max_volume_db || 72) / 85));
      audio.volume = sensory.quiet_mode ? 0.25 : normalizedVol;
      activeNeuralAudio = audio;
      audio.onended = () => {
        if (activeNeuralAudio === audio) activeNeuralAudio = null;
        options?.onEnd?.();
      };
      audio.onerror = () => {
        if (activeNeuralAudio === audio) activeNeuralAudio = null;
        speakBrowserFallback(text, 'toy_child_girl', sensory, options);
      };
      await audio.play();
      return;
    }
  } catch {
    // Fallback to browser female/child-girl voice if offline or autoplay blocked
  }

  if (reqId !== currentSpeechRequestId) return;
  speakBrowserFallback(text, 'toy_child_girl', sensory, options);
}

/**
 * Speaks App Settings, Camera Controls, and Activity Directions using a Calm, Warm Adult Voice!
 * Primary: Streams natural adult neural audio (en-GB) from FastAPI `/api/tts/speak` at calm adult pitch (1.0x).
 * Fallback: Uses a natural adult voice (`pitch = 1.0`, `rate = 0.95`) in the browser.
 */
export async function speakAsAdultAppGuide(
  text: string,
  sensory: SensoryProfile,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
  }
): Promise<void> {
  if (typeof window === 'undefined') return;
  if (sensory.quiet_mode || !sensory.tts_enabled) {
    options?.onEnd?.();
    return;
  }

  stopAllAudioAndSpeech();
  const reqId = currentSpeechRequestId;
  options?.onStart?.();

  const cacheKey = `adult_guide::${text.trim()}`;
  try {
    let blobUrl = neuralAudioBlobCache.get(cacheKey);
    if (!blobUrl) {
      const res = await fetch('http://localhost:8085/api/tts/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          persona: 'adult_guide',
        }),
      });
      if (res.ok) {
        const blob = await res.blob();
        blobUrl = URL.createObjectURL(blob);
        neuralAudioBlobCache.set(cacheKey, blobUrl);
      }
    }

    if (reqId !== currentSpeechRequestId) return;

    if (blobUrl) {
      const audio = new Audio(blobUrl) as HTMLAudioElement & {
        preservesPitch?: boolean;
        webkitPreservesPitch?: boolean;
        mozPreservesPitch?: boolean;
      };
      // Preserve natural adult vocal-tract formants & calm cadence for App Settings & Directions
      audio.preservesPitch = true;
      audio.webkitPreservesPitch = true;
      audio.mozPreservesPitch = true;
      audio.playbackRate = 0.98;

      const normalizedVol = Math.min(1.0, Math.max(0.2, (sensory.max_volume_db || 72) / 85));
      audio.volume = sensory.quiet_mode ? 0.25 : normalizedVol;
      activeNeuralAudio = audio;
      audio.onended = () => {
        if (activeNeuralAudio === audio) activeNeuralAudio = null;
        options?.onEnd?.();
      };
      audio.onerror = () => {
        if (activeNeuralAudio === audio) activeNeuralAudio = null;
        speakBrowserFallback(text, 'adult_guide', sensory, options);
      };
      await audio.play();
      return;
    }
  } catch {
    // Fallback to browser adult voice
  }

  if (reqId !== currentSpeechRequestId) return;
  speakBrowserFallback(text, 'adult_guide', sensory, options);
}

function speakBrowserFallback(
  text: string,
  persona: 'toy_child_girl' | 'adult_guide',
  sensory: SensoryProfile,
  options?: {
    pitchBoost?: number;
    onStart?: () => void;
    onEnd?: () => void;
  }
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    options?.onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const chosenVoice = selectBrowserVoiceByPersona(persona);
  if (chosenVoice) {
    u.voice = chosenVoice;
  }

  if (persona === 'toy_child_girl') {
    // Sweet, high-pitched little girl cartoon voice
    u.pitch = Math.min(1.65, Math.max(1.36, options?.pitchBoost || 1.45));
    u.rate = 1.02;
  } else {
    // Calm, warm adult voice for App Settings & Directions
    u.pitch = 1.0;
    u.rate = 0.95;
  }

  const normalizedVol = Math.min(1.0, Math.max(0.2, (sensory.max_volume_db || 72) / 85));
  u.volume = sensory.quiet_mode ? 0.25 : normalizedVol;
  u.onend = () => options?.onEnd?.();
  u.onerror = () => options?.onEnd?.();
  window.speechSynthesis.speak(u);
  setTimeout(() => options?.onEnd?.(), Math.min(7500, text.length * 80));
}

/**
 * Legacy helper kept for compatibility across workspace modules;
 * uses the sweet child-girl voice for companion dialogue.
 */
export function speakCompanionText(
  text: string,
  sensory: SensoryProfile,
  forceSpeak = false
): void {
  if ((sensory.quiet_mode || !sensory.tts_enabled) && !forceSpeak) return;
  void speakAsSweetChildGirlToy(text, { ...sensory, quiet_mode: false, tts_enabled: true });
}

/**
 * Plays a sensory-safe note from the C Major Pentatonic Scale (C4, D4, E4, G4, A4, C5, D5, E5).
 */
export function playPentatonicNote(
  frequency: number,
  sensory: SensoryProfile,
  timbre: 'marimba' | 'kalimba' | 'synth' = 'kalimba',
  durationSec = 0.85
): void {
  if (sensory.quiet_mode) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = timbre === 'synth' ? 'triangle' : 'sine';
  osc.frequency.setValueAtTime(frequency, now);

  const maxGain = Math.min(0.28, ((sensory.max_volume_db || 65) / 100) * 0.32);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(maxGain, now + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0008, now + durationSec);

  osc.connect(gain);
  gain.connect(ctx.destination);

  activeOscillators.push(osc);
  osc.onended = () => {
    activeOscillators = activeOscillators.filter((o) => o !== osc);
  };

  osc.start(now);
  osc.stop(now + durationSec);
}

export function playGentleSuccessChime(sensory: SensoryProfile): void {
  if (sensory.quiet_mode) return;
  playPentatonicNote(523.25, sensory, 'kalimba', 0.45);
  setTimeout(() => {
    playPentatonicNote(659.25, sensory, 'kalimba', 0.65);
  }, 140);
}
