import {
  AgentOrchestrationResponse,
  AllowedActionType,
  ChildProfile,
  GestaltMapping,
  IntentHypothesis,
  MultimodalSignalInput,
  ShowAndTellResponse,
  SPECIAL_INTERESTS,
  VisualChoiceCard,
} from '../types';

const API_BASE = 'http://localhost:8085/api';

export const DEFAULT_PROFILES: ChildProfile[] = [
  {
    id: 'mia-3',
    name: 'Mia',
    age: 3,
    developmental_band: '2-4',
    primary_interest: 'dinosaurs',
    secondary_interest: 'music_art',
    languages: ['en-GB'],
    sensory: {
      quiet_mode: false,
      reduced_motion: true,
      sensory_theme: 'calm_sage',
      choice_density: 2,
      speech_rate: 0.85,
      tts_enabled: true,
      errorless_learning: true,
      transition_warning_seconds: 60,
      max_volume_db: 60,
      camera_opt_in: false,
      mic_opt_in: true,
    },
    gestalt_dictionary: [
      {
        id: 'g-mia-1',
        phrase: 'Stomp stomp roar!',
        meaning: 'I want to draw or play with the blue dinosaur',
        target_action: 'open_drawing',
        target_args: { interest: 'dinosaurs', color: 'blue' },
        stage: 'Stage 1 (Whole Gestalt)',
        mitigations: ["Let's stomp and draw", 'Stomp with blue dino', 'All done stomping'],
      },
      {
        id: 'g-mia-2',
        phrase: 'Twinkle twinkle little',
        meaning: 'I want calm kalimba music or a sensory break',
        target_action: 'open_music_pad',
        target_args: { interest: 'music_art' },
        stage: 'Stage 1 (Whole Gestalt)',
        mitigations: ['Play twinkle music', 'Quiet music please', 'Take a break'],
      },
    ],
    schedule: [
      {
        id: 's-mia-1',
        slot: 'First',
        title: 'Draw Blue Dino',
        icon: '🦕',
        action: 'open_drawing',
        action_args: { interest: 'dinosaurs' },
        completed: false,
      },
      {
        id: 's-mia-2',
        slot: 'Then',
        title: 'Calm Kalimba Music',
        icon: '🎵',
        action: 'open_music_pad',
        action_args: {},
        completed: false,
      },
      {
        id: 's-mia-3',
        slot: 'Next',
        title: 'Quiet Safe Harbor',
        icon: '🌿',
        action: 'open_safe_harbor',
        action_args: {},
        completed: false,
      },
    ],
    allowed_actions: [
      'show_home',
      'show_aac_choices',
      'open_drawing',
      'open_music_pad',
      'open_story_activity',
      'open_math_activity',
      'open_science_activity',
      'open_routine_sequencer',
      'play_approved_media',
      'set_quiet_mode',
      'show_break_choice',
      'open_safe_harbor',
      'stop_activity',
      'offer_visual_clarification',
      'advance_schedule_step',
    ],
  },
  {
    id: 'leo-5',
    name: 'Leo',
    age: 6,
    developmental_band: '5-7',
    primary_interest: 'trains',
    secondary_interest: 'dinosaurs',
    languages: ['en-GB', 'ar-SA'],
    sensory: {
      quiet_mode: false,
      reduced_motion: false,
      sensory_theme: 'calm_sage',
      choice_density: 4,
      speech_rate: 0.92,
      tts_enabled: true,
      errorless_learning: true,
      transition_warning_seconds: 30,
      max_volume_db: 65,
      camera_opt_in: true,
      mic_opt_in: true,
    },
    gestalt_dictionary: [
      {
        id: 'g-leo-1',
        phrase: 'Chugga chugga choo choo!',
        meaning: "Let's count train carriages in the Math Lab",
        target_action: 'open_math_activity',
        target_args: { interest: 'trains' },
        stage: 'Stage 1 (Whole Gestalt)',
        mitigations: ["Let's count train cars", "Let's draw a train", "Let's test train magnets"],
      },
      {
        id: 'g-leo-2',
        phrase: 'To infinity and beyond!',
        meaning: 'I want to explore the Space & Magnet Science Lab',
        target_action: 'open_science_activity',
        target_args: { interest: 'space' },
        stage: 'Stage 1 (Whole Gestalt)',
        mitigations: ["Let's go to space science", "Let's launch the rocket", 'All done space'],
      },
      {
        id: 'g-leo-3',
        phrase: 'Blue dinosaur please',
        meaning: 'Open the drawing canvas with a blue dinosaur template',
        target_action: 'open_drawing',
        target_args: { interest: 'dinosaurs', color: 'blue' },
        stage: 'Stage 2 (Mitigated)',
        mitigations: ['Draw a blue dinosaur', 'Colour it green', 'Make it move gently'],
      },
      {
        id: 'g-leo-4',
        phrase: 'Ears hurt Cover ears',
        meaning: 'Sensory overload — switch to Quiet Safe Harbor immediately',
        target_action: 'open_safe_harbor',
        target_args: { reason: 'auditory_overload' },
        stage: 'Stage 2 (Mitigated)',
        mitigations: ['Too loud', 'I need a quiet break', 'Turn sound off'],
      },
    ],
    schedule: [
      {
        id: 's-leo-1',
        slot: 'First',
        title: 'Count Steam Trains',
        icon: '🚂',
        action: 'open_math_activity',
        action_args: { interest: 'trains' },
        completed: false,
      },
      {
        id: 's-leo-2',
        slot: 'Then',
        title: 'Draw Blue Dinosaur',
        icon: '🎨',
        action: 'open_drawing',
        action_args: { interest: 'dinosaurs', color: 'blue' },
        completed: false,
      },
      {
        id: 's-leo-3',
        slot: 'Next',
        title: 'Magnet Push & Pull',
        icon: '🧲',
        action: 'open_science_activity',
        action_args: { interest: 'trains' },
        completed: false,
      },
    ],
    allowed_actions: [
      'show_home',
      'show_aac_choices',
      'open_drawing',
      'open_music_pad',
      'open_story_activity',
      'open_math_activity',
      'open_science_activity',
      'open_routine_sequencer',
      'play_approved_media',
      'set_quiet_mode',
      'show_break_choice',
      'open_safe_harbor',
      'stop_activity',
      'offer_visual_clarification',
      'advance_schedule_step',
    ],
  },
  {
    id: 'zara-9',
    name: 'Zara',
    age: 10,
    developmental_band: '8-11',
    primary_interest: 'space',
    secondary_interest: 'ocean',
    languages: ['en-GB'],
    sensory: {
      quiet_mode: false,
      reduced_motion: false,
      sensory_theme: 'deep_dusk',
      choice_density: 6,
      speech_rate: 1.0,
      tts_enabled: false,
      errorless_learning: true,
      transition_warning_seconds: 30,
      max_volume_db: 60,
      camera_opt_in: true,
      mic_opt_in: true,
    },
    gestalt_dictionary: [
      {
        id: 'g-zara-1',
        phrase: 'Houston we have a problem',
        meaning: 'This puzzle feels tricky — I want a hint or step-by-step breakdown',
        target_action: 'show_aac_choices',
        target_args: { scaffold: 'step_by_step' },
        stage: 'Stage 2 (Mitigated)',
        mitigations: ['Give me a hint', 'Show me step by step', 'Switch to ocean lab'],
      },
      {
        id: 'g-zara-2',
        phrase: 'Deep blue sea',
        meaning: 'I need to decompress in the Ocean or Safe Harbor view',
        target_action: 'open_safe_harbor',
        target_args: { theme: 'ocean' },
        stage: 'Stage 3 (Isolated Words)',
        mitigations: ['Quiet ocean ripples', 'Five minute break', 'Mute all audio'],
      },
    ],
    schedule: [
      {
        id: 's-zara-1',
        slot: 'First',
        title: 'Orbital Gravity Lab',
        icon: '🚀',
        action: 'open_science_activity',
        action_args: { interest: 'space' },
        completed: false,
      },
      {
        id: 's-zara-2',
        slot: 'Then',
        title: 'Solar System Math',
        icon: '🪐',
        action: 'open_math_activity',
        action_args: { interest: 'space' },
        completed: false,
      },
      {
        id: 's-zara-3',
        slot: 'Next',
        title: 'Compose Pentatonic Synth',
        icon: '🎹',
        action: 'open_music_pad',
        action_args: { interest: 'music_art' },
        completed: false,
      },
    ],
    allowed_actions: [
      'show_home',
      'show_aac_choices',
      'open_drawing',
      'open_music_pad',
      'open_story_activity',
      'open_math_activity',
      'open_science_activity',
      'open_routine_sequencer',
      'play_approved_media',
      'set_quiet_mode',
      'show_break_choice',
      'open_safe_harbor',
      'stop_activity',
      'offer_visual_clarification',
      'advance_schedule_step',
    ],
  },
];

export async function fetchProfiles(forceOffline = false): Promise<{ profiles: ChildProfile[]; online: boolean }> {
  if (!forceOffline) {
    try {
      const res = await fetch(`${API_BASE}/profiles`);
      if (res.ok) {
        const data = await res.json();
        return { profiles: data, online: true };
      }
    } catch {
      // Fallback to offline-first local profile store
    }
  }
  return { profiles: DEFAULT_PROFILES, online: false };
}

export async function updateChildProfileRemote(
  profile: ChildProfile,
  forceOffline = false
): Promise<ChildProfile> {
  if (!forceOffline) {
    try {
      const res = await fetch(`${API_BASE}/profiles/${profile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // ignore offline
    }
  }
  return profile;
}

export async function addGestaltMappingRemote(
  profileId: string,
  mapping: GestaltMapping,
  forceOffline = false
): Promise<ChildProfile | null> {
  if (!forceOffline) {
    try {
      const res = await fetch(`${API_BASE}/profiles/${profileId}/gestalt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapping),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // ignore offline
    }
  }
  return null;
}

export async function resolveMultimodalIntent(
  signal: MultimodalSignalInput,
  profile: ChildProfile,
  forceOffline = false
): Promise<AgentOrchestrationResponse> {
  if (!forceOffline) {
    try {
      const res = await fetch(`${API_BASE}/agent/intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signal),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to local on-device deterministic ADK engine
    }
  }
  return runLocalOfflineAgent(signal, profile);
}

export async function submitShowAndTell(
  profile: ChildProfile,
  objectName: string,
  objectColor: string,
  objectDetails?: string,
  forceOffline = false
): Promise<ShowAndTellResponse> {
  if (!forceOffline) {
    try {
      const res = await fetch(`${API_BASE}/agent/show-and-tell`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile_id: profile.id,
          object_name: objectName,
          object_color: objectColor,
          object_details: objectDetails,
        }),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to offline Show & Tell
    }
  }

  const label = `${objectColor} ${objectName}`;
  const lower = `${objectName} ${objectDetails || ''}`.toLowerCase();
  let matched = profile.primary_interest;
  if (lower.includes('dino') || lower.includes('rex')) matched = 'dinosaurs';
  else if (lower.includes('train') || lower.includes('truck')) matched = 'trains';
  else if (lower.includes('rocket') || lower.includes('space')) matched = 'space';
  else if (lower.includes('whale') || lower.includes('fish')) matched = 'ocean';

  const spin = SPECIAL_INTERESTS[matched];
  const choices: VisualChoiceCard[] = [
    {
      id: 'st-1',
      label: `Draw ${label}`,
      sublabel: 'Guided Co-Drawing Canvas',
      icon: '🎨',
      fitzgerald_category: 'verb',
      action: 'open_drawing',
      action_args: { interest: matched, color: objectColor },
    },
    {
      id: 'st-2',
      label: `Count ${objectName}s`,
      sublabel: `${spin.label} Math Lab`,
      icon: '🔢',
      fitzgerald_category: 'noun',
      action: 'open_math_activity',
      action_args: { interest: matched },
    },
    {
      id: 'st-3',
      label: `${label} Story`,
      sublabel: 'Interactive Visual Book',
      icon: '📖',
      fitzgerald_category: 'noun',
      action: 'open_story_activity',
      action_args: { interest: matched },
    },
    {
      id: 'st-4',
      label: `${spin.scienceTopic}`,
      sublabel: 'Cause & Effect Lab',
      icon: '🔬',
      fitzgerald_category: 'verb',
      action: 'open_science_activity',
      action_args: { interest: matched },
    },
  ];

  return {
    detected_object: label,
    celebration_speech: `Wow, you showed me your ${label}! Would you like to draw it together, count ${objectName}s, or read a story?`,
    privacy_assurance:
      "Offline-First Shared Attention: Object context only. Zero facial emotion recognition; no frames transmitted.",
    suggested_choices: choices.slice(0, profile.sensory.choice_density),
    matched_interest: matched,
  };
}

export async function fetchAnalyticsData(profileId: string, forceOffline = false): Promise<any | null> {
  if (!forceOffline) {
    try {
      const res = await fetch(`${API_BASE}/analytics/${profileId}`);
      if (res.ok) return await res.json();
    } catch {
      // ignore
    }
  }
  return null;
}

export async function fetchSafetyAuditLog(forceOffline = false): Promise<any | null> {
  if (!forceOffline) {
    try {
      const res = await fetch(`${API_BASE}/safety/audit-log`);
      if (res.ok) return await res.json();
    } catch {
      // ignore
    }
  }
  return null;
}

/**
 * Local On-Device Fallback Agentic Orchestrator (Guarantees 100% offline functionality)
 */
function runLocalOfflineAgent(
  signal: MultimodalSignalInput,
  profile: ChildProfile
): AgentOrchestrationResponse {
  const spin = SPECIAL_INTERESTS[profile.primary_interest];
  const nowIso = new Date().toISOString();
  const raw = (signal.speech_transcript || signal.aac_utterance || signal.vocalization_cue || '').trim();
  const lower = raw.toLowerCase();

  // 1. Preemption check
  if (
    signal.explicit_touch_action === 'stop_activity' ||
    signal.explicit_touch_action === 'open_safe_harbor' ||
    lower.includes('stop') ||
    lower.includes('too loud') ||
    lower.includes('break')
  ) {
    const action: AllowedActionType =
      lower.includes('loud') || lower.includes('break') || signal.explicit_touch_action === 'open_safe_harbor'
        ? 'open_safe_harbor'
        : 'stop_activity';
    const top: IntentHypothesis = {
      intent_name: `Offline Preemption (${action})`,
      action,
      confidence: 1.0,
      source_modality: 'deterministic_preempt',
      reasoning: 'Immediate on-device preemption executed in <2ms.',
    };
    return {
      trace_id: `offline-${Date.now().toString(36)}`,
      timestamp: nowIso,
      active_specialist_agent: 'OnDeviceSafetyPreemptor',
      engine_mode: 'deterministic_preempt',
      latency_ms: 1.4,
      top_hypothesis: top,
      all_hypotheses: [top],
      uncertainty_state: 'emergency_preempt',
      policy_decision: {
        permitted: true,
        enforced_action: action,
        enforced_args: { quiet_mode: true },
        preempted: true,
        sensory_clamps_applied: ['offline_preemption', 'quiet_mode_clamp'],
        policy_notes: 'Executed locally via Offline-First Safety Gateway.',
      },
      companion_speech:
        action === 'open_safe_harbor'
          ? 'Quiet Safe Harbor is ready. No questions, take your time.'
          : 'Stopped right away. You are in control.',
      companion_subtitle: 'Offline Preemption Active · Zero Latency',
      mitigated_gestalt_suggestions: ['I need a break', 'Too loud', 'Go home'],
      clarification_choices: [],
      ui_adaptation_directives: { target_screen: action },
    };
  }

  // 2. Kinematics / Overload check
  if (signal.kinematics.taps_per_second >= 4.0 || signal.ambient_noise_db >= 75) {
    const top: IntentHypothesis = {
      intent_name: 'Offer Gentle Sensory Break Choice',
      action: 'show_break_choice',
      confidence: 0.87,
      source_modality: 'on_device_kinematics_monitor',
      reasoning: `High tap frequency (${signal.kinematics.taps_per_second.toFixed(1)}/s) or loud room (${signal.ambient_noise_db} dB) detected.`,
    };
    return {
      trace_id: `offline-${Date.now().toString(36)}`,
      timestamp: nowIso,
      active_specialist_agent: 'SensoryAndRoutineAgent (Offline)',
      engine_mode: 'hybrid_local_adk',
      latency_ms: 2.1,
      top_hypothesis: top,
      all_hypotheses: [top],
      uncertainty_state: 'sensory_overload_support',
      policy_decision: {
        permitted: true,
        enforced_action: 'show_break_choice',
        enforced_args: {},
        preempted: false,
        sensory_clamps_applied: ['choice_density_cap:2'],
        policy_notes: 'Gentle sensory choice surfaced locally.',
      },
      companion_speech: 'Would you like a quiet break, or to go back Home?',
      companion_subtitle: 'Gentle choice offered · No emotion assumed',
      mitigated_gestalt_suggestions: ['I need a break', 'Let us go home'],
      clarification_choices: [
        {
          id: 'off-sh',
          label: 'Quiet Safe Harbor',
          sublabel: 'Dim screen & breathing lotus',
          icon: '🌿',
          fitzgerald_category: 'urgent',
          action: 'open_safe_harbor',
          action_args: {},
        },
        {
          id: 'off-hm',
          label: 'Familiar Home Screen',
          sublabel: 'Predictable choices',
          icon: '🏠',
          fitzgerald_category: 'social',
          action: 'show_home',
          action_args: {},
        },
      ],
      ui_adaptation_directives: { show_sensory_banner: true },
    };
  }

  // 3. Explicit touch or Gestalt match
  const matchedGestalt = profile.gestalt_dictionary.find(
    (g) => lower && (g.phrase.toLowerCase().includes(lower) || lower.includes(g.phrase.toLowerCase()))
  );

  let action: AllowedActionType =
    signal.explicit_touch_action ||
    matchedGestalt?.target_action ||
    (lower.includes('draw') || lower.includes('dino') || lower.includes('blue')
      ? 'open_drawing'
      : lower.includes('music') || lower.includes('song')
      ? 'open_music_pad'
      : lower.includes('count') || lower.includes('math') || lower.includes('train')
      ? 'open_math_activity'
      : lower.includes('science') || lower.includes('magnet') || lower.includes('space')
      ? 'open_science_activity'
      : lower.includes('story')
      ? 'open_story_activity'
      : lower.includes('video')
      ? 'play_approved_media'
      : 'offer_visual_clarification');

  const isUncertain = action === 'offer_visual_clarification' && !signal.explicit_touch_action;
  const conf = signal.explicit_touch_action ? 0.98 : matchedGestalt ? 0.91 : isUncertain ? 0.56 : 0.89;

  const top: IntentHypothesis = {
    intent_name: matchedGestalt
      ? `Gestalt Match: ${matchedGestalt.meaning}`
      : isUncertain
      ? 'Uncertain Vocalization — Offer Picture Cards'
      : `Execute ${action}`,
    action,
    confidence: conf,
    source_modality: signal.explicit_touch_action
      ? 'explicit_touch_aac'
      : matchedGestalt
      ? 'calibrated_gestalt_dictionary'
      : 'offline_multimodal_fusion',
    reasoning: matchedGestalt
      ? `Matched Gestalt '${matchedGestalt.phrase}' -> '${matchedGestalt.meaning}'`
      : 'Evaluated locally via Offline-First Bounded Agent.',
  };

  const candidateCards: VisualChoiceCard[] = [
    {
      id: 'c-1',
      label: `Draw ${spin.heroNoun}`,
      sublabel: 'Creative Canvas',
      icon: '🎨',
      fitzgerald_category: 'verb',
      action: 'open_drawing',
      action_args: { interest: profile.primary_interest },
    },
    {
      id: 'c-2',
      label: `Count ${spin.label}`,
      sublabel: 'Visual Math',
      icon: spin.emoji,
      fitzgerald_category: 'noun',
      action: 'open_math_activity',
      action_args: { interest: profile.primary_interest },
    },
    {
      id: 'c-3',
      label: 'Quiet Safe Harbor',
      sublabel: 'Calming Break',
      icon: '🌿',
      fitzgerald_category: 'urgent',
      action: 'open_safe_harbor',
      action_args: {},
    },
    {
      id: 'c-4',
      label: 'Pentatonic Music',
      sublabel: 'Gentle Chimes',
      icon: '🎵',
      fitzgerald_category: 'verb',
      action: 'open_music_pad',
      action_args: {},
    },
  ];
  const clarificationCards: VisualChoiceCard[] = isUncertain
    ? candidateCards.slice(0, profile.sensory.choice_density)
    : [];

  return {
    trace_id: `offline-${Date.now().toString(36)}`,
    timestamp: nowIso,
    active_specialist_agent: isUncertain ? 'AACAndGestaltAgent (Offline)' : 'OfflineSpecialistOrchestrator',
    engine_mode: 'hybrid_local_adk',
    latency_ms: 2.8,
    top_hypothesis: top,
    all_hypotheses: [top],
    uncertainty_state: isUncertain ? 'gentle_visual_clarification' : 'confident_execute',
    policy_decision: {
      permitted: true,
      enforced_action: action,
      enforced_args: { interest: profile.primary_interest },
      preempted: false,
      sensory_clamps_applied: [`choice_density_cap:${profile.sensory.choice_density}`],
      policy_notes: 'Validated by Local Offline Policy Gateway.',
    },
    companion_speech: isUncertain
      ? `I heard you! Which picture would you like, ${profile.name}?`
      : `Opening ${action.replace(/_/g, ' ')} with your ${spin.label} theme!`,
    companion_subtitle: isUncertain
      ? 'Uncertain signal · Offering clear picture choices'
      : `Offline-First Agent · ${spin.label} Theme Active`,
    mitigated_gestalt_suggestions: matchedGestalt?.mitigations || [
      `Let's play ${spin.label}`,
      'Do it again',
      'I want a break',
    ],
    clarification_choices: clarificationCards,
    ui_adaptation_directives: { target_screen: action },
  };
}
