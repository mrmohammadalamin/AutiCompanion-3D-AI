import React, { useEffect, useState } from 'react';
import { AllowedActionType, ChildProfile } from '../types';
import { playPentatonicNote, speakCompanionText } from '../services/soundAndSpeech';

interface SafeHarborViewProps {
  profile: ChildProfile;
  onReturnHome: () => void;
  onLogInteroceptionSignal: (signalLabel: string) => void;
  onExecuteAction?: (action: AllowedActionType) => void;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const INTEROCEPTION_CARDS = [
  { id: 'ic-loud', icon: '🙉', label: 'Too Loud', sub: 'Keep audio muted' },
  { id: 'ic-bright', icon: '🕶️', label: 'Too Bright', sub: 'Keep dim screen' },
  { id: 'ic-squeeze', icon: '🤗', label: 'Need Deep Pressure', sub: 'Big squeeze or weighted blanket' },
  { id: 'ic-water', icon: '💧', label: 'Thirsty', sub: 'I would like water' },
  { id: 'ic-tired', icon: '😴', label: 'My Body Is Tired', sub: 'Rest quietly' },
];

/**
 * ZERO-DEMAND SAFE HARBOR & CO-REGULATION SCREEN
 * Clinical Rationale:
 * When an autistic child is overwhelmed, asking open-ended questions or showing busy animations
 * increases cognitive load. Safe Harbor drops contrast, mutes speech/effects by default,
 * offers a silent rhythmic breathing lotus pacer, gentle touch water ripples, and optional
 * one-tap Interoception (internal body state) cards.
 */
export const SafeHarborView: React.FC<SafeHarborViewProps> = ({
  profile,
  onReturnHome,
  onLogInteroceptionSignal,
}) => {
  const [breathPhase, setBreathPhase] = useState<'Breathe In...' | 'Hold Gently...' | 'Breathe Out...'>('Breathe In...');
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [selectedBodyCard, setSelectedBodyCard] = useState<string | null>(null);
  const [softChimeOnTouch, setSoftChimeOnTouch] = useState<boolean>(false);

  useEffect(() => {
    const phases: Array<'Breathe In...' | 'Hold Gently...' | 'Breathe Out...'> = [
      'Breathe In...',
      'Hold Gently...',
      'Breathe Out...',
    ];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % phases.length;
      setBreathPhase(phases[i]);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const handlePondClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev.slice(-6), { id, x, y }]);
    if (softChimeOnTouch) {
      playPentatonicNote(329.63, { ...profile.sensory, quiet_mode: false, max_volume_db: 38 }, 'kalimba', 1.2);
    }
  };

  return (
    <div className="safe-harbor-sanctuary">
      <div className="safe-harbor-header">
        <div>
          <span className="safe-harbor-badge">🌿 Zero-Demand Safe Harbor · Low-Arousal Mode</span>
          <h2 className="safe-harbor-title">
            Quiet Space for {profile.name} — No Questions, Take Your Time
          </h2>
        </div>
        <div className="safe-harbor-top-actions">
          <button
            type="button"
            onClick={() => setSoftChimeOnTouch((s) => !s)}
            className="harbor-opt-btn"
          >
            {softChimeOnTouch ? '🔔 Soft Ripple Chime: ON' : '🔇 Total Silence: ON'}
          </button>
          <button
            type="button"
            onClick={onReturnHome}
            className="harbor-home-btn"
          >
            🏠 Ready for Home
          </button>
        </div>
      </div>

      <div className="safe-harbor-main-grid">
        {/* Left: Co-Regulation Breathing Lotus & Touch Ripple Pond */}
        <div
          className="ripple-pond-area"
          onClick={handlePondClick}
          role="region"
          aria-label="Calming Breathing Lotus and Water Ripple Pond"
        >
          <div
            className={`breathing-lotus-orb ${
              profile.sensory.reduced_motion
                ? ''
                : breathPhase === 'Breathe In...'
                ? 'expand'
                : breathPhase === 'Breathe Out...'
                ? 'contract'
                : 'hold'
            }`}
          >
            <span className="lotus-icon">🪷</span>
            <span className="lotus-phase-text">{breathPhase}</span>
          </div>

          {ripples.map((r) => (
            <span
              key={r.id}
              className="water-ripple-ring"
              style={{ left: r.x, top: r.y }}
            />
          ))}

          <p className="pond-instruction">
            Tap anywhere on the calm water to make gentle ripples
          </p>
        </div>

        {/* Right: Optional Interoception & Body-Check Self-Advocacy Cards */}
        <div className="interoception-panel">
          <h3 className="interoception-title">
            🫶 Optional Body & Sensory Check (Tap only if you want to tell someone)
          </h3>
          <div className="interoception-cards-list">
            {INTEROCEPTION_CARDS.map((card) => {
              const isSelected = selectedBodyCard === card.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => {
                    setSelectedBodyCard(card.id);
                    onLogInteroceptionSignal(card.label);
                    if (softChimeOnTouch) {
                      speakCompanionText(card.label, profile.sensory, true);
                    }
                  }}
                  className={`interoception-card ${isSelected ? 'selected' : ''}`}
                >
                  <span className="interoception-icon">{card.icon}</span>
                  <div className="interoception-text">
                    <div className="interoception-label">{card.label}</div>
                    <div className="interoception-sub">{card.sub}</div>
                  </div>
                  {isSelected && <span className="interoception-check">✓ Shared</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
