import React, { useState } from 'react';
import {
  AllowedActionType,
  ChildProfile,
  ShowAndTellResponse,
  VisualChoiceCard,
} from '../types';
import { submitShowAndTell } from '../services/agentClient';
import { playGentleSuccessChime, speakCompanionText } from '../services/soundAndSpeech';

interface ShowAndTellModalProps {
  profile: ChildProfile;
  forceOffline: boolean;
  onClose: () => void;
  onSelectChoice: (action: AllowedActionType, label: string, args: Record<string, any>) => void;
}

const PRESET_TOYS = [
  {
    name: 'Brachiosaurus Toy',
    color: 'Blue',
    emoji: '🦕',
    details: 'Plush blue dinosaur held up to camera',
  },
  {
    name: 'Wooden Steam Train',
    color: 'Emerald',
    emoji: '🚂',
    details: 'Green magnetic wooden train engine',
  },
  {
    name: 'Space Rocket Drawing',
    color: 'Indigo',
    emoji: '🚀',
    details: 'Crayon drawing of a rocket and Saturn',
  },
  {
    name: 'Humpback Whale Toy',
    color: 'Teal',
    emoji: '🐋',
    details: 'Ocean whale figure',
  },
];

/**
 * OPT-IN 'SHOW & TELL' SHARED ATTENTION MODAL
 * Reframing Camera Vision:
 * Instead of using the camera to guess emotions from an autistic child's facial expression,
 * Show & Tell lets the child hold up a favourite physical toy or drawing to bring their
 * real-world special interest directly into the app's activities.
 */
export const ShowAndTellModal: React.FC<ShowAndTellModalProps> = ({
  profile,
  forceOffline,
  onClose,
  onSelectChoice,
}) => {
  const [customObject, setCustomObject] = useState<string>('');
  const [customColor, setCustomColor] = useState<string>('Blue');
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ShowAndTellResponse | null>(null);

  const handleAnalyzeObject = async (name: string, color: string, details?: string) => {
    setLoading(true);
    const res = await submitShowAndTell(profile, name, color, details, forceOffline);
    setResult(res);
    setLoading(false);
    playGentleSuccessChime(profile.sensory);
    speakCompanionText(res.celebration_speech, profile.sensory);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Show and Tell Shared Attention">
      <div className="modal-panel">
        <div className="modal-header">
          <div>
            <span className="clinical-tag">📸 Opt-In Object Shared Attention · Zero Face Profiling</span>
            <h2 className="modal-title">
              Show My Toy or Drawing ({profile.name}&apos;s Show & Tell)
            </h2>
            <p className="modal-subtitle">
              Hold up a favourite physical toy or tap one below so AutiCompanion can build activities around it!
            </p>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn">
            ✖ Close
          </button>
        </div>

        <div className="privacy-banner-box">
          🛡️ <strong>UK ICO Children&apos;s Code Guarantee:</strong> The camera is strictly for{' '}
          <em>object joint attention</em> (recognizing a toy, book, or drawing). It{' '}
          <strong>never</strong> classifies facial expressions or diagnoses emotions.
        </div>

        {/* Quick Preset Physical Toys */}
        <div className="preset-toys-grid">
          {PRESET_TOYS.map((toy) => (
            <button
              key={toy.name}
              type="button"
              onClick={() => handleAnalyzeObject(toy.name, toy.color, toy.details)}
              className="preset-toy-card"
            >
              <span className="preset-toy-emoji">{toy.emoji}</span>
              <span className="preset-toy-title">
                {toy.color} {toy.name}
              </span>
              <span className="preset-toy-sub">Tap to Show Companion</span>
            </button>
          ))}
        </div>

        {/* Custom Toy / Drawing Input */}
        <div className="custom-show-tell-row">
          <input
            type="text"
            placeholder="Or type any object/toy the child holds up (e.g., Red Fire Engine, Yellow Cat)..."
            value={customObject}
            onChange={(e) => setCustomObject(e.target.value)}
            className="portal-input"
          />
          <select
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="portal-select"
          >
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
            <option value="Red">Red</option>
            <option value="Purple">Purple</option>
          </select>
          <button
            type="button"
            disabled={!customObject.trim() || loading}
            onClick={() => handleAnalyzeObject(customObject.trim(), customColor)}
            className="strip-speak-btn"
          >
            📸 Share Object
          </button>
        </div>

        {/* Agent Response & Tailored Activity Choices */}
        {result && (
          <div className="show-tell-result-box">
            <div className="show-tell-celebration">
              🎉 <strong>Companion:</strong> &ldquo;{result.celebration_speech}&rdquo;
            </div>
            <div className="show-tell-privacy-note">🔒 {result.privacy_assurance}</div>

            <div className="show-tell-choices-grid">
              {result.suggested_choices.map((card: VisualChoiceCard) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    onSelectChoice(card.action, card.label, card.action_args);
                    onClose();
                  }}
                  className={`aac-symbol-card fitz-card-${card.fitzgerald_category}`}
                >
                  <span className="aac-symbol-emoji">{card.icon}</span>
                  <span className="aac-symbol-word">{card.label}</span>
                  <span className="aac-symbol-cat">{card.sublabel}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
