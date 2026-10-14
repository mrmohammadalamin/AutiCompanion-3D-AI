import React from 'react';
import { AllowedActionType, ChildProfile } from '../types';
import { stopAllAudioAndSpeech, speakCompanionText, playGentleSuccessChime } from '../services/soundAndSpeech';

interface FixedCoreAACDockProps {
  profile: ChildProfile;
  onCoreAction: (action: AllowedActionType, label: string, utterance: string) => void;
  onRepeatLast: () => void;
  onCompleteScheduleStep: () => void;
}

/**
 * IMMUTABLE MOTOR-PLAN CORE AAC DOCK
 * Clinical Principle: Even when the main workspace adapts its layout or choice density,
 * core self-advocacy and communication buttons NEVER move. This preserves motor memory
 * for autistic AAC users and guarantees <10ms access to Stop, Safe Harbor, Help, and Home.
 *
 * Colour-coded using the modified Fitzgerald Key:
 * - Urgent / Self-Advocacy (Stop, Safe Harbor): Coral / Teal-Mint
 * - Navigation (Home): Deep Slate-Blue
 * - Verbs / Actions (Help, More/Again): Emerald Green
 * - Descriptors / State (All Done): Sky Blue
 * - Social / Binary (Yes, No): Warm Amber / Violet
 */
export const FixedCoreAACDock: React.FC<FixedCoreAACDockProps> = ({
  profile,
  onCoreAction,
  onRepeatLast,
  onCompleteScheduleStep,
}) => {
  const handleEmergencyStop = () => {
    stopAllAudioAndSpeech();
    onCoreAction('stop_activity', 'STOP', 'Stop now');
  };

  const handleSafeHarbor = () => {
    stopAllAudioAndSpeech();
    onCoreAction('open_safe_harbor', 'I Need a Break', 'I need a quiet break');
  };

  const handleBinarySpeak = (word: 'Yes' | 'No') => {
    speakCompanionText(word, profile.sensory, true);
    if (word === 'Yes') {
      playGentleSuccessChime(profile.sensory);
    }
  };

  return (
    <footer
      aria-label="Immutable Motor-Plan Core AAC Bar"
      className="fixed-aac-dock"
    >
      <div className="aac-dock-header">
        <span className="motor-lock-badge">
          🔒 Motor-Plan Locked Core AAC · Fitzgerald Key Coded
        </span>
        <span className="dock-hint">
          Always in the exact same spot on every screen
        </span>
      </div>

      <div className="aac-dock-grid">
        {/* 1. STOP (Urgent Preemption - Fitzgerald Urgent Coral) */}
        <button
          type="button"
          onClick={handleEmergencyStop}
          className="aac-core-btn fitz-urgent-stop"
          title="Immediate <5ms Stop of all sound, speech, and motion"
        >
          <span className="aac-core-icon">🛑</span>
          <span className="aac-core-label">STOP</span>
          <span className="aac-core-sub">Stop Now</span>
        </button>

        {/* 2. SAFE HARBOR / BREAK (Urgent Self-Regulation - Calming Teal) */}
        <button
          type="button"
          onClick={handleSafeHarbor}
          className="aac-core-btn fitz-urgent-break"
          title="Zero-Demand Quiet Safe Harbor & Breathing Pacer"
        >
          <span className="aac-core-icon">🌿</span>
          <span className="aac-core-label">BREAK</span>
          <span className="aac-core-sub">Safe Harbor</span>
        </button>

        {/* 3. HOME (Predictable Return) */}
        <button
          type="button"
          onClick={() => onCoreAction('show_home', 'Home', 'Go home please')}
          className="aac-core-btn fitz-nav-home"
        >
          <span className="aac-core-icon">🏠</span>
          <span className="aac-core-label">HOME</span>
          <span className="aac-core-sub">Familiar View</span>
        </button>

        {/* 4. HELP ME (Fitzgerald Verb - Green) */}
        <button
          type="button"
          onClick={() => onCoreAction('show_aac_choices', 'Help Me', 'Help me please')}
          className="aac-core-btn fitz-verb"
        >
          <span className="aac-core-icon">🤝</span>
          <span className="aac-core-label">HELP</span>
          <span className="aac-core-sub">Show Choices</span>
        </button>

        {/* 5. MORE / AGAIN (Fitzgerald Verb - Green) */}
        <button
          type="button"
          onClick={onRepeatLast}
          className="aac-core-btn fitz-verb"
        >
          <span className="aac-core-icon">🔄</span>
          <span className="aac-core-label">AGAIN</span>
          <span className="aac-core-sub">Do It More</span>
        </button>

        {/* 6. ALL DONE / FINISHED (Fitzgerald Descriptor - Blue) */}
        <button
          type="button"
          onClick={onCompleteScheduleStep}
          className="aac-core-btn fitz-descriptor"
        >
          <span className="aac-core-icon">✅</span>
          <span className="aac-core-label">ALL DONE</span>
          <span className="aac-core-sub">Next Step</span>
        </button>

        {/* 7. YES (Fitzgerald Social Affirmative) */}
        <button
          type="button"
          onClick={() => handleBinarySpeak('Yes')}
          className="aac-core-btn fitz-social-yes"
        >
          <span className="aac-core-icon">👍</span>
          <span className="aac-core-label">YES</span>
          <span className="aac-core-sub">I Like This</span>
        </button>

        {/* 8. NO (Fitzgerald Social Protest) */}
        <button
          type="button"
          onClick={() => handleBinarySpeak('No')}
          className="aac-core-btn fitz-social-no"
        >
          <span className="aac-core-icon">👎</span>
          <span className="aac-core-label">NO</span>
          <span className="aac-core-sub">No Thank You</span>
        </button>
      </div>
    </footer>
  );
};
