import { SensoryProfile } from '../types';

let audioCtx: AudioContext | null = null;
let activeOscillators: OscillatorNode[] = [];
let activeNeuralAudio: HTMLAudioElement | null = null;
let activeBrowserUtterance: SpeechSynthesisUtterance | null = null;
let currentSpeechRequestId = 0;
const neuralAudioBlobCache = new Map<string, string>();

const BACKEND_TTS_URLS = [
  'http://127.0.0.1:8085/api/tts/speak',
  'http://127.0.0.1:8000/api/tts/speak',
];

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
 * Automatically unlock Web Audio API and SpeechSynthesis on any user click, touch, or key press
 * so sound and voice are never blocked by browser autoplay restrictions.
 */
if (typeof window !== 'undefined') {
  const unlockAudioOnGesture = () => {
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }
  };
  window.addEventListener('pointerdown', unlockAudioOnGesture, { passive: true });
  window.addEventListener('click', unlockAudioOnGesture, { passive: true });
  window.addEventListener('keydown', unlockAudioOnGesture, { passive: true });

  if ('speechSynthesis' in window) {
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}

async function fetchBackendTTS(payload: Record<string, unknown>): Promise<Response | null> {
  for (const url of BACKEND_TTS_URLS) {
    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 2200);
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      window.clearTimeout(timeoutId);
      if (res.ok) return res;
    } catch {
      // Try next port
    }
  }
  return null;
}

/**
 * Selects a natural Female / Girl voice from the browser's SpeechSynthesis voices,
 * strictly excluding male voices (e.g., Microsoft David, Mark, George, James)
 * and preferring reliable local voices so speech never stalls.
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

  // Prefer localService voices first so Chrome online TTS never hangs silently
  const localNonMale = nonMaleEnglishVoices.filter((v) => v.localService);
  const pool = localNonMale.length > 0 ? localNonMale : nonMaleEnglishVoices;

  if (persona === 'toy_child_girl') {
    const childVoice = pool.find((v) =>
      /\b(ana|maisie|libby|girl|child|kid)\b/i.test(v.name)
    );
    if (childVoice) return childVoice;

    const sweetFemaleVoice = pool.find((v) =>
      /\b(aria|jenny|sonia|natasha|clara|zira|samantha|victoria|karen|hazel|susan|female)\b/i.test(
        v.name
      )
    );
    if (sweetFemaleVoice) return sweetFemaleVoice;
  } else {
    const adultVoice = pool.find((v) =>
      /\b(aria|jenny|sonia|samantha|zira|hazel|susan|female)\b/i.test(v.name)
    );
    if (adultVoice) return adultVoice;
  }

  if (pool.length > 0) {
    return pool[0];
  }
  if (nonMaleEnglishVoices.length > 0) {
    return nonMaleEnglishVoices[0];
  }

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
  if (activeBrowserUtterance) {
    activeBrowserUtterance.onend = null;
    activeBrowserUtterance.onerror = null;
    activeBrowserUtterance = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
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
  playPentatonicNote(783.99, sensory, 'kalimba', 0.22);
  setTimeout(() => {
    playPentatonicNote(880.0, sensory, 'kalimba', 0.22);
  }, 75);
  setTimeout(() => {
    playPentatonicNote(1046.5, sensory, 'kalimba', 0.3);
  }, 150);
}

/**
 * Speaks as the 3D Toy Character using a Natural Sweet Small Girl Cartoon Voice!
 * Primary: Streams Microsoft 'en-US-AnaNeural' or 'en-GB-MaisieNeural' (genuine young child girl voices)
 * from FastAPI `/api/tts/speak` (ports 8085 or 8000) with customizable sweetness pitch & speed.
 * Fallback: Uses a local female/girl browser voice with V8 GC protection so it never fails silently.
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
  const pitchHz = Math.round((vs.sweetnessPitch - 1.15) * 36) + 2;
  const ratePct = Math.round((vs.speechSpeed - 1.0) * 100);

  const cacheKey = `toy_child_girl::${vs.preset}::${pitchHz}::${ratePct}::${text.trim()}`;
  try {
    let cachedEntry = neuralAudioBlobCache.get(cacheKey);
    let isEdgeNeural = true;
    if (!cachedEntry) {
      const res = await fetchBackendTTS({
        text: text.trim(),
        persona: 'toy_child_girl',
        voice_preset: vs.preset,
        pitch_hz: pitchHz,
        rate_pct: ratePct,
      });
      if (res) {
        const engineHeader = res.headers.get('X-Voice-Engine') || '';
        isEdgeNeural = engineHeader.startsWith('edge-tts');
        const blob = await res.blob();
        if (blob.size > 100) {
          const blobUrl = URL.createObjectURL(blob);
          cachedEntry = `${isEdgeNeural ? 'edge' : 'fallback'}|${blobUrl}`;
          neuralAudioBlobCache.set(cacheKey, cachedEntry);
        }
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
        const gentleShift = 1.0 + Math.max(-0.06, Math.min(0.14, (vs.sweetnessPitch - 1.45) * 0.25));
        audio.preservesPitch = false;
        audio.webkitPreservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.playbackRate = Number((gentleShift * vs.speechSpeed).toFixed(2));
      } else {
        audio.preservesPitch = false;
        audio.webkitPreservesPitch = false;
        audio.mozPreservesPitch = false;
        audio.playbackRate = Math.min(1.38, Math.max(1.18, vs.sweetnessPitch * 0.85));
      }

      const normalizedVol = Math.min(1.0, Math.max(0.45, (sensory.max_volume_db || 78) / 85));
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
  playPentatonicNote(523.25, sensory, 'kalimba', 0.22);
  options?.onStart?.();

  const cacheKey = `adult_guide::${text.trim()}`;
  try {
    let blobUrl = neuralAudioBlobCache.get(cacheKey);
    if (!blobUrl) {
      const res = await fetchBackendTTS({
        text: text.trim(),
        persona: 'adult_guide',
      });
      if (res) {
        const blob = await res.blob();
        if (blob.size > 100) {
          blobUrl = URL.createObjectURL(blob);
          neuralAudioBlobCache.set(cacheKey, blobUrl);
        }
      }
    }

    if (reqId !== currentSpeechRequestId) return;

    if (blobUrl) {
      const audio = new Audio(blobUrl) as HTMLAudioElement & {
        preservesPitch?: boolean;
        webkitPreservesPitch?: boolean;
        mozPreservesPitch?: boolean;
      };
      audio.preservesPitch = true;
      audio.webkitPreservesPitch = true;
      audio.mozPreservesPitch = true;
      audio.playbackRate = 0.98;

      const normalizedVol = Math.min(1.0, Math.max(0.45, (sensory.max_volume_db || 78) / 85));
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

  let finished = false;
  const finishOnce = () => {
    if (finished) return;
    finished = true;
    activeBrowserUtterance = null;
    options?.onEnd?.();
  };

  try {
    window.speechSynthesis.cancel();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    const u = new SpeechSynthesisUtterance(text);
    activeBrowserUtterance = u; // Prevent Chrome V8 garbage collection of active utterance
    const chosenVoice = selectBrowserVoiceByPersona(persona);
    if (chosenVoice) {
      u.voice = chosenVoice;
    }

    if (persona === 'toy_child_girl') {
      const vs = currentVoiceSettings;
      // Clamp to 1.15..1.45 for Windows SAPI / Chrome local voice stability
      u.pitch = Math.min(1.45, Math.max(1.15, vs.sweetnessPitch || options?.pitchBoost || 1.38));
      u.rate = Math.min(1.12, Math.max(0.88, vs.speechSpeed || 0.98));
    } else {
      u.pitch = 1.0;
      u.rate = 0.96;
    }

    const normalizedVol = Math.min(1.0, Math.max(0.5, (sensory.max_volume_db || 80) / 85));
    u.volume = sensory.quiet_mode ? 0.25 : normalizedVol;
    u.onend = () => finishOnce();
    u.onerror = () => finishOnce();
    window.speechSynthesis.speak(u);
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  } catch {
    finishOnce();
  }
  setTimeout(() => finishOnce(), Math.min(6500, Math.max(1800, text.length * 75)));
}

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

  const maxGain = Math.min(0.38, ((sensory.max_volume_db || 78) / 100) * 0.44);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(maxGain, now + 0.02);
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

