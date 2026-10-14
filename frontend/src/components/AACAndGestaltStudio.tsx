import React, { useState } from 'react';
import {
  AllowedActionType,
  ChildProfile,
  FitzgeraldCategory,
  GestaltMapping,
  SPECIAL_INTERESTS,
} from '../types';
import { playGentleSuccessChime, speakCompanionText } from '../services/soundAndSpeech';

interface AACAndGestaltStudioProps {
  profile: ChildProfile;
  mitigatedSuggestions: string[];
  onExecuteAction: (action: AllowedActionType, utterance: string, args?: Record<string, any>) => void;
  onTriggerGestalt: (gestalt: GestaltMapping) => void;
}

interface AACSymbolToken {
  id: string;
  word: string;
  icon: string;
  category: FitzgeraldCategory;
  linkedAction?: AllowedActionType;
}

export const AACAndGestaltStudio: React.FC<AACAndGestaltStudioProps> = ({
  profile,
  mitigatedSuggestions,
  onExecuteAction,
  onTriggerGestalt,
}) => {
  const spin = SPECIAL_INTERESTS[profile.primary_interest];
  const [sentenceStrip, setSentenceStrip] = useState<AACSymbolToken[]>([
    { id: 'tok-init-1', word: 'I want', icon: '👉', category: 'social' },
    { id: 'tok-init-2', word: spin.heroNoun, icon: spin.emoji, category: 'noun', linkedAction: 'open_drawing' },
  ]);

  const allTokens: AACSymbolToken[] = [
    // Social / Starters
    { id: 't-want', word: 'I want', icon: '👉', category: 'social' },
    { id: 't-lets', word: "Let's go", icon: '🚀', category: 'social' },
    // Verbs (Green)
    { id: 't-draw', word: 'to draw', icon: '🎨', category: 'verb', linkedAction: 'open_drawing' },
    { id: 't-count', word: 'to count', icon: '🔢', category: 'verb', linkedAction: 'open_math_activity' },
    { id: 't-music', word: 'play music', icon: '🎵', category: 'verb', linkedAction: 'open_music_pad' },
    { id: 't-science', word: 'explore science', icon: '🔬', category: 'verb', linkedAction: 'open_science_activity' },
    { id: 't-story', word: 'read story', icon: '📖', category: 'verb', linkedAction: 'open_story_activity' },
    { id: 't-watch', word: 'watch calm video', icon: '📺', category: 'verb', linkedAction: 'play_approved_media' },
    // Nouns / Special Interest (Amber/Yellow)
    { id: 't-spin', word: spin.heroNoun, icon: spin.emoji, category: 'noun', linkedAction: 'open_drawing' },
    { id: 't-dino', word: 'Blue Dinosaur', icon: '🦕', category: 'noun', linkedAction: 'open_drawing' },
    { id: 't-train', word: 'Steam Train', icon: '🚂', category: 'noun', linkedAction: 'open_math_activity' },
    { id: 't-rocket', word: 'Space Rocket', icon: '🛸', category: 'noun', linkedAction: 'open_science_activity' },
    // Descriptors / Sensory (Blue)
    { id: 't-quiet', word: 'quiet sound', icon: '🔉', category: 'descriptor', linkedAction: 'set_quiet_mode' },
    { id: 't-again', word: 'one more time', icon: '🔄', category: 'descriptor' },
    { id: 't-slow', word: 'slow and gentle', icon: '🐢', category: 'descriptor' },
    // Urgent / Self-Advocacy (Coral)
    { id: 't-break', word: 'a quiet break', icon: '🌿', category: 'urgent', linkedAction: 'open_safe_harbor' },
    { id: 't-loud', word: 'too loud!', icon: '🙉', category: 'urgent', linkedAction: 'open_safe_harbor' },
  ];

  const handleAddToken = (tok: AACSymbolToken) => {
    setSentenceStrip((prev) => [...prev.slice(-4), tok]);
    speakCompanionText(tok.word, profile.sensory, true);
  };

  const handleSpeakFullStrip = () => {
    const fullText = sentenceStrip.map((t) => t.word).join(' ');
    if (!fullText) return;
    speakCompanionText(fullText, profile.sensory, true);
    playGentleSuccessChime(profile.sensory);

    // Find the most specific action in the strip and trigger it via the orchestrator
    const actionable = [...sentenceStrip].reverse().find((t) => t.linkedAction);
    if (actionable && actionable.linkedAction) {
      onExecuteAction(actionable.linkedAction, fullText, { interest: profile.primary_interest });
    }
  };

  return (
    <div className="studio-container">
      {/* 1. Interactive AAC Sentence Strip Builder */}
      <section className="aac-sentence-strip-bar" aria-label="AAC Sentence Strip">
        <div className="sentence-tokens-area">
          {sentenceStrip.length === 0 ? (
            <span className="sentence-placeholder">
              Tap picture cards below to build a phrase or speak right away...
            </span>
          ) : (
            sentenceStrip.map((tok, i) => (
              <div
                key={`${tok.id}-${i}`}
                className={`sentence-token-chip fitz-border-${tok.category}`}
              >
                <span className="token-chip-icon">{tok.icon}</span>
                <span className="token-chip-word">{tok.word}</span>
              </div>
            ))
          )}
        </div>
        <div className="sentence-strip-actions">
          <button
            type="button"
            onClick={handleSpeakFullStrip}
            className="strip-speak-btn"
          >
            🔊 Speak & Go
          </button>
          <button
            type="button"
            onClick={() => setSentenceStrip([])}
            className="strip-clear-btn"
          >
            🧹 Clear
          </button>
        </div>
      </section>

      {/* 2. Gestalt Language Processing (GLP) & Echolalia Dictionary Bridge */}
      <section className="gestalt-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              🗣️ Personal Gestalt & Echolalia Bridge ({profile.name}&apos;s Scripts)
            </h2>
            <p className="section-subtitle">
              Treats whole-phrase scripts and vocalizations as meaningful communication (Natural Language Acquisition Stage 1 ➔ Stage 3)
            </p>
          </div>
          <span className="clinical-tag">SLP Calibrated</span>
        </div>

        <div className="gestalt-cards-grid">
          {profile.gestalt_dictionary.map((g) => (
            <div key={g.id} className="gestalt-card">
              <div className="gestalt-card-top">
                <span className="gestalt-stage-badge">{g.stage}</span>
                <button
                  type="button"
                  onClick={() => onTriggerGestalt(g)}
                  className="gestalt-play-btn"
                >
                  ▶️ Say Script & Open
                </button>
              </div>
              <div className="gestalt-phrase">&ldquo;{g.phrase}&rdquo;</div>
              <div className="gestalt-meaning">
                <strong>Functional Meaning:</strong> {g.meaning}
              </div>
              <div className="gestalt-mitigations-row">
                <span className="mitigation-label">Mitigated Stage 2/3 Scaffolds:</span>
                <div className="mitigation-chips">
                  {g.mitigations.map((m, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        speakCompanionText(m, profile.sensory, true);
                        onExecuteAction(g.target_action, m, g.target_args);
                      }}
                      className="mitigation-chip"
                    >
                      💬 {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {mitigatedSuggestions.length > 0 && (
          <div className="live-mitigation-banner">
            <span className="live-mitigation-title">✨ Suggested Mitigated Phrases Now:</span>
            {mitigatedSuggestions.map((phrase, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => speakCompanionText(phrase, profile.sensory, true)}
                className="mitigation-chip active-highlight"
              >
                🔊 &ldquo;{phrase}&rdquo;
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 3. Fitzgerald Key Color-Coded Core + Fringe Vocabulary Board */}
      <section className="aac-board-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">
              🃏 Fitzgerald-Coded AAC Picture Board (Density: {profile.sensory.choice_density} per row)
            </h2>
            <p className="section-subtitle">
              Green = Verbs/Actions · Amber = Nouns/Interests · Blue = Descriptors · Coral = Sensory/Urgent
            </p>
          </div>
        </div>

        <div
          className="aac-symbol-grid"
          style={{
            gridTemplateColumns: `repeat(${profile.sensory.choice_density}, minmax(140px, 1fr))`,
          }}
        >
          {allTokens.map((tok) => (
            <button
              key={tok.id}
              type="button"
              onClick={() => handleAddToken(tok)}
              className={`aac-symbol-card fitz-card-${tok.category}`}
            >
              <span className="aac-symbol-emoji">{tok.icon}</span>
              <span className="aac-symbol-word">{tok.word}</span>
              <span className="aac-symbol-cat">{tok.category.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
