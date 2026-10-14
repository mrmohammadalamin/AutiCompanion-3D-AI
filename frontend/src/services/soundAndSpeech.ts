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

export type SmallGirlVoicePreset =
  | 'sweet_small_girl_5y'
  | 'cute_little_girl_4y'
  | 'cartoon_girl_6y'
  | 'gentle_sister_8y';

export interface ToyVoiceSettings {
  preset: SmallGirlVoicePreset;
  /** 1.15 (gentle sister) to 1.75 (tiny fairy girl). Default: 1.48 */
  sweetnessPitch: number;
  /** 0.80 (slow & calm) to 1.15 (upbeat). Default: 0.98 */
  speechSpeed: number;
  /** Play cute sparkle music-box chime before toy speaks */
  giggleChimeEnabled: boolean;
}

const currentVoiceSettings: ToyVoiceSettings = {
  preset: 'sweet_small_girl_5y',
  sweetnessPitch: 1.48,
  speechSpeed: 0.98,
  giggleChimeEnabled: true,
};

export function getToyVoiceSettings(): ToyVoiceSettings {
  return { ...currentVoiceSettings };
}

export function updateToyVoiceSettings(partial: Partial<ToyVoiceSettings>): ToyVoiceSettings {
  Object.assign(currentVoiceSettings, partial);
  return { ...currentVoiceSettings };
}

export const SMALL_GIRL_VOICE_PRESETS: Array<{
  id: SmallGirlVoicePreset;
  label: string;
  sub: string;
  emoji: string;
  defaultPitch: number;
  defaultSpeed: number;
}> = [
  {
    id: 'sweet_small_girl_5y',
    label: 'Sweet 5y Small Girl',
    sub: 'Ana Neural · Warm & Cute Peer',
    emoji: '👧',
    defaultPitch: 1.48,
    defaultSpeed: 0.98,
  },
  {
    id: 'cute_little_girl_4y',
    label: 'Tiny 4y Little Girl',
    sub: 'Maisie Neural · Ultra-Sweet',
    emoji: '🧚‍♀️',
    defaultPitch: 1.58,
    defaultSpeed: 0.96,
  },
  {
    id: 'cartoon_girl_6y',
    label: 'Playful 6y Cartoon Girl',
    sub: 'Animated Movie Child Voice',
    emoji: '🎀',
    defaultPitch: 1.64,
    defaultSpeed: 1.02,
  },
  {
    id: 'gentle_sister_8y',
    label: 'Gentle 8y Sister Voice',
    sub: 'Softer & Slower Child Friend',
    emoji: '🌸',
    defaultPitch: 1.34,
    defaultSpeed: 0.92,
  },
];

/**
 * Plays a cute, gentle cartoon sparkle-giggle chime right before the 3D toy speaks,
 * giving the 3D character a sweet, animated cartoon-movie personality.
 */
export function playCuteChildGiggleChime(sensory: SensoryProfile): void {
  if (sensory.quiet_mode || !currentVoiceSettings.giggleChimeEnabled) return;
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
 * Speaks as the 3D Toy Character using a Natural Sweet Small Girl Cartoon Voice!
 * Primary: Streams Microsoft 'en-US-AnaNeural' or 'en-GB-MaisieNeural' (genuine young child girl voices)
 * from FastAPI `/api/tts/speak` with customizable sweetness pitch & speed.
 * Fallback: Uses a female/girl browser voice (never male David/Mark) at sweet small girl pitch.
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

  const vs = currentVoiceSettings;
  // Map sweetnessPitch (1.15..1.75) to neural pitch_hz (+2Hz..+24Hz)
  const pitchHz = Math.round((vs.sweetnessPitch - 1.15) * 36) + 2;
  const ratePct = Math.round((vs.speechSpeed - 1.0) * 100);

  const cacheKey = `toy_child_girl::${vs.preset}::${pitchHz}::${ratePct}::${text.trim()}`;
  try {
    let cachedEntry = neuralAudioBlobCache.get(cacheKey);
    let isEdgeNeural = true;
    if (!cachedEntry) {
      const res = await fetch('http://localhost:8085/api/tts/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          persona: 'toy_child_girl',
          voice_preset: vs.preset,
          pitch_hz: pitchHz,
          rate_pct: ratePct,
        }),
      });
      if (res.ok) {
        const engineHeader = res.headers.get('X-Voice-Engine') || '';
        isEdgeNeural = engineHeader.startsWith('edge-tts');
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        cachedEntry = `${isEdgeNeural ? 'edge' : 'fallback'}|${blobUrl}`;
        neuralAudioBlobCache.set(cacheKey, cachedEntry);
      }
    }

    if (reqId !== currentSpeechRequestId) return;

    if (cachedEntry) {
      const [engineType, blobUrl] = cachedEntry.includes('|')
        ? cachedEntry.split('|', 2)
        : ['edge', cachedEntry];
      const audio = new Audio(blobUrl) as HTMLAudioElement & {
        preservesPitch?: boolean;
        webkitPreservesPitch?: boolean;
        mozPreservesPitch?: boolean;
      };

      if (engineType === 'edge') {
        // Genuine Microsoft AnaNeural / MaisieNeural small girl voice already has child vocal tract & pitch!
        // Apply gentle fine-tuned playback rate while keeping natural child cadence.
        const gentleShift = 1.0 + Math.max(-0.06, Math.min(0.14, (vs.sweetnessPitch - 1.45) * 0.25));
        audio.preservesPitch = false;
        audio.webkitPreservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.playbackRate = Number((gentleShift * vs.speechSpeed).toFixed(2));
      } else {
        // Fallback adult stream -> shift formants & pitch up into a sweet small girl voice
        audio.preservesPitch = false;
        audio.webkitPreservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.playbackRate = Math.min(1.38, Math.max(1.18, vs.sweetnessPitch * 0.85));
      }

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
 * Primary: Streams natural adult neural audio (en-GB-SoniaNeural) from FastAPI `/api/tts/speak`.
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
    const vs = currentVoiceSettings;
    // Sweet, high-pitched small girl cartoon voice
    u.pitch = Math.min(1.8, Math.max(1.25, vs.sweetnessPitch || options?.pitchBoost || 1.48));
    u.rate = Math.min(1.18, Math.max(0.82, vs.speechSpeed || 0.98));
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
