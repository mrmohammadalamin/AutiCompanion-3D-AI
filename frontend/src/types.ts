export type DevelopmentalBand = '2-4' | '5-7' | '8-11';
export type SpecialInterestId = 'dinosaurs' | 'trains' | 'space' | 'ocean' | 'music_art';
export type SensoryTheme = 'calm_sage' | 'warm_sand' | 'deep_dusk' | 'high_contrast';

export type AllowedActionType =
  | 'show_home'
  | 'show_aac_choices'
  | 'open_drawing'
  | 'open_music_pad'
  | 'open_story_activity'
  | 'open_math_activity'
  | 'open_science_activity'
  | 'open_routine_sequencer'
  | 'play_approved_media'
  | 'set_quiet_mode'
  | 'show_break_choice'
  | 'open_safe_harbor'
  | 'stop_activity'
  | 'offer_visual_clarification'
  | 'advance_schedule_step';

export type FitzgeraldCategory = 'verb' | 'noun' | 'descriptor' | 'urgent' | 'social';

export interface GestaltMapping {
  id: string;
  phrase: string;
  meaning: string;
  target_action: AllowedActionType;
  target_args: Record<string, any>;
  stage: 'Stage 1 (Whole Gestalt)' | 'Stage 2 (Mitigated)' | 'Stage 3 (Isolated Words)';
  mitigations: string[];
}

export interface ScheduleStep {
  id: string;
  slot: 'First' | 'Then' | 'Next';
  title: string;
  icon: string;
  action: AllowedActionType;
  action_args: Record<string, any>;
  completed: boolean;
}

export interface SensoryProfile {
  quiet_mode: boolean;
  reduced_motion: boolean;
  sensory_theme: SensoryTheme;
  choice_density: 2 | 4 | 6;
  speech_rate: number;
  tts_enabled: boolean;
  errorless_learning: boolean;
  transition_warning_seconds: number;
  max_volume_db: number;
  camera_opt_in: boolean;
  mic_opt_in: boolean;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  developmental_band: DevelopmentalBand;
  primary_interest: SpecialInterestId;
  secondary_interest: SpecialInterestId;
  languages: string[];
  sensory: SensoryProfile;
  gestalt_dictionary: GestaltMapping[];
  schedule: ScheduleStep[];
  allowed_actions: AllowedActionType[];
}

export interface TouchKinematicsSignal {
  taps_per_second: number;
  rapid_exit_count_30s: number;
  repeated_stop_taps: number;
  edge_tremor_detected: boolean;
}

export interface MultimodalSignalInput {
  profile_id: string;
  explicit_touch_action?: AllowedActionType;
  explicit_touch_args?: Record<string, any>;
  aac_card_id?: string;
  aac_utterance?: string;
  speech_transcript?: string;
  vocalization_cue?: string;
  kinematics: TouchKinematicsSignal;
  ambient_noise_db: number;
  camera_object_label?: string;
  current_activity: string;
}

export interface VisualChoiceCard {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  fitzgerald_category: FitzgeraldCategory;
  action: AllowedActionType;
  action_args: Record<string, any>;
}

export interface IntentHypothesis {
  intent_name: string;
  action: AllowedActionType;
  confidence: number;
  source_modality: string;
  reasoning: string;
}

export interface PolicyDecision {
  permitted: boolean;
  enforced_action: AllowedActionType;
  enforced_args: Record<string, any>;
  preempted: boolean;
  sensory_clamps_applied: string[];
  policy_notes: string;
}

export interface AgentOrchestrationResponse {
  trace_id: string;
  timestamp: string;
  active_specialist_agent: string;
  engine_mode: 'deterministic_preempt' | 'hybrid_local_adk' | 'gemini_live_adk';
  latency_ms: number;
  top_hypothesis: IntentHypothesis;
  all_hypotheses: IntentHypothesis[];
  uncertainty_state:
    | 'confident_execute'
    | 'gentle_visual_clarification'
    | 'sensory_overload_support'
    | 'emergency_preempt';
  policy_decision: PolicyDecision;
  companion_speech: string;
  companion_subtitle: string;
  mitigated_gestalt_suggestions: string[];
  clarification_choices: VisualChoiceCard[];
  ui_adaptation_directives: Record<string, any>;
}

export interface ShowAndTellResponse {
  detected_object: string;
  celebration_speech: string;
  privacy_assurance: string;
  suggested_choices: VisualChoiceCard[];
  matched_interest: SpecialInterestId;
}

export interface SpecialInterestMetadata {
  id: SpecialInterestId;
  label: string;
  emoji: string;
  color: string;
  accentHex: string;
  heroNoun: string;
  mathItem: string;
  scienceTopic: string;
}

export const SPECIAL_INTERESTS: Record<SpecialInterestId, SpecialInterestMetadata> = {
  dinosaurs: {
    id: 'dinosaurs',
    label: 'Dinosaurs',
    emoji: '🦕',
    color: 'blue',
    accentHex: '#3B82F6',
    heroNoun: 'Blue Brachiosaurus',
    mathItem: 'Friendly Dinosaurs',
    scienceTopic: 'Prehistoric Plants & Volcanoes',
  },
  trains: {
    id: 'trains',
    label: 'Trains & Tracks',
    emoji: '🚂',
    color: 'emerald',
    accentHex: '#10B981',
    heroNoun: 'Emerald Steam Engine',
    mathItem: 'Numbered Train Carriages',
    scienceTopic: 'Magnetic Train Couplers (Push & Pull)',
  },
  space: {
    id: 'space',
    label: 'Space & Rockets',
    emoji: '🚀',
    color: 'indigo',
    accentHex: '#6366F1',
    heroNoun: 'Starlight Explorer Rocket',
    mathItem: 'Glowing Moons & Stars',
    scienceTopic: 'Planetary Gravity & Orbits',
  },
  ocean: {
    id: 'ocean',
    label: 'Ocean & Whales',
    emoji: '🐋',
    color: 'teal',
    accentHex: '#14B8A6',
    heroNoun: 'Singing Humpback Whale',
    mathItem: 'Sea Turtles & Shells',
    scienceTopic: 'Floating, Sinking & Coral Reefs',
  },
  music_art: {
    id: 'music_art',
    label: 'Colours & Melodies',
    emoji: '🎨',
    color: 'amber',
    accentHex: '#F59E0B',
    heroNoun: 'Rainbow Kalimba Brush',
    mathItem: 'Colourful Paint Drops',
    scienceTopic: 'Mixing Colours & Sound Waves',
  },
};
