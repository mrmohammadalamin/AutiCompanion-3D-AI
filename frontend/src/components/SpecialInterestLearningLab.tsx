import React, { useEffect, useState } from 'react';
import { ChildProfile, SPECIAL_INTERESTS } from '../types';
import { playGentleSuccessChime, speakCompanionText } from '../services/soundAndSpeech';

interface SpecialInterestLearningLabProps {
  profile: ChildProfile;
  initialMode?: 'math' | 'science' | 'routine';
  onRecordProgress: (summary: string) => void;
}

export const SpecialInterestLearningLab: React.FC<SpecialInterestLearningLabProps> = ({
  profile,
  initialMode = 'math',
  onRecordProgress,
}) => {
  const [mode, setMode] = useState<'math' | 'science' | 'routine'>(initialMode);
  const spin = SPECIAL_INTERESTS[profile.primary_interest];

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // --- MATH STATE (Errorless Learning + Spin Infused) ---
  const [groupA, setGroupA] = useState<number>(profile.developmental_band === '2-4' ? 2 : 3);
  const [groupB, setGroupB] = useState<number>(profile.developmental_band === '2-4' ? 1 : 2);
  const [dimmedChoices, setDimmedChoices] = useState<number[]>([]);
  const [solved, setSolved] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);

  const targetSum = groupA + groupB;
  const candidateAnswers = Array.from(new Set([targetSum, targetSum + 1, Math.max(1, targetSum - 1), targetSum + 2]))
    .slice(0, profile.sensory.choice_density)
    .sort((a, b) => a - b);

  const generateNextMathPuzzle = () => {
    const maxVal = profile.developmental_band === '2-4' ? 3 : profile.developmental_band === '5-7' ? 5 : 8;
    const nextA = 1 + Math.floor(Math.random() * maxVal);
    const nextB = 1 + Math.floor(Math.random() * maxVal);
    setGroupA(nextA);
    setGroupB(nextB);
    setDimmedChoices([]);
    setSolved(false);
  };

  const handleMathChoice = (val: number) => {
    if (val === targetSum) {
      setSolved(true);
      setStreak((s) => s + 1);
      playGentleSuccessChime(profile.sensory);
      speakCompanionText(
        `Yes! ${groupA} plus ${groupB} makes ${targetSum} ${spin.mathItem}!`,
        profile.sensory
      );
      onRecordProgress(`Solved Spin-Infused Math (${groupA} + ${groupB} = ${targetSum} ${spin.label})`);
    } else {
      // Errorless Learning: NEVER play a harsh buzzer! Gently fade the distractor card so the correct answer stands out.
      setDimmedChoices((prev) => [...prev, val]);
      if (profile.sensory.errorless_learning) {
        speakCompanionText(
          `Let's look closely at the glowing card—count the ${spin.mathItem} together!`,
          profile.sensory
        );
      }
    }
  };

  // --- SCIENCE CAUSE & EFFECT STATE ---
  const [magnetLeftPole, setMagnetLeftPole] = useState<'N' | 'S'>('N');
  const [magnetRightPole, setMagnetRightPole] = useState<'N' | 'S'>('S');
  const [plantWaterLevel, setPlantWaterLevel] = useState<number>(2);
  const [plantSunLevel, setPlantSunLevel] = useState<number>(2);
  const [orbitSpeed, setOrbitSpeed] = useState<number>(2);

  const magnetsAttract = magnetLeftPole !== magnetRightPole;
  const plantStage =
    plantWaterLevel + plantSunLevel >= 6
      ? '🌳 Giant Blooming Prehistoric Fern!'
      : plantWaterLevel + plantSunLevel >= 4
      ? '🌿 Growing Green Sprout'
      : '🌱 Little Seed in Soil';

  // --- ROUTINE SEQUENCER STATE ---
  const routineSteps = [
    { order: 1, label: 'First: Put toothpaste on brush', icon: '🪥' },
    { order: 2, label: 'Then: Brush teeth gently in circles', icon: '🫧' },
    { order: 3, label: 'Last: Rinse mouth & smile!', icon: '😁' },
  ];
  const [completedRoutineOrders, setCompletedRoutineOrders] = useState<number[]>([1]);

  return (
    <div className="studio-container">
      {/* Mode Switcher */}
      <div className="studio-tabs-row" role="tablist">
        <button
          type="button"
          onClick={() => setMode('math')}
          className={`studio-tab-btn ${mode === 'math' ? 'active' : ''}`}
        >
          🔢 {spin.label} Math & Counting
        </button>
        <button
          type="button"
          onClick={() => setMode('science')}
          className={`studio-tab-btn ${mode === 'science' ? 'active' : ''}`}
        >
          🔬 Cause & Effect Science Lab
        </button>
        <button
          type="button"
          onClick={() => setMode('routine')}
          className={`studio-tab-btn ${mode === 'routine' ? 'active' : ''}`}
        >
          🧩 Daily Routine Sequencer
        </button>
      </div>

      {/* 1. SPIN-INFUSED ERRORLESS MATH */}
      {mode === 'math' && (
        <div className="learning-card">
          <div className="learning-header-row">
            <div>
              <span className="clinical-tag">
                {profile.sensory.errorless_learning
                  ? '🛡️ Errorless Learning Active (No Buzzers / Gentle Fade)'
                  : 'Standard Practice Mode'}
              </span>
              <h3 className="learning-title">
                How many {spin.mathItem} altogether?
              </h3>
            </div>
            <div className="streak-pill">
              ⭐ Explorations: {streak}
            </div>
          </div>

          {/* Visual Manipulatives */}
          <div className="math-visual-stage">
            <div className="math-group-box">
              <div className="math-emojis-row">
                {Array.from({ length: groupA }).map((_, i) => (
                  <span key={`a-${i}`} className="math-item-emoji">
                    {spin.emoji}
                  </span>
                ))}
              </div>
              <div className="math-group-number">{groupA}</div>
            </div>

            <div className="math-operator-symbol">+</div>

            <div className="math-group-box">
              <div className="math-emojis-row">
                {Array.from({ length: groupB }).map((_, i) => (
                  <span key={`b-${i}`} className="math-item-emoji">
                    {spin.emoji}
                  </span>
                ))}
              </div>
              <div className="math-group-number">{groupB}</div>
            </div>

            <div className="math-operator-symbol">=</div>

            <div className={`math-group-box result-box ${solved ? 'solved-glow' : ''}`}>
              <div className="math-group-number">
                {solved ? `${targetSum} ${spin.emoji}` : '?'}
              </div>
            </div>
          </div>

          {/* Choice Cards bounded by profile.sensory.choice_density */}
          <div
            className="math-choices-grid"
            style={{
              gridTemplateColumns: `repeat(${candidateAnswers.length}, minmax(120px, 1fr))`,
            }}
          >
            {candidateAnswers.map((ans) => {
              const isDimmed = dimmedChoices.includes(ans) && profile.sensory.errorless_learning;
              const isTargetGlow =
                (dimmedChoices.length > 0 && ans === targetSum && profile.sensory.errorless_learning) ||
                (solved && ans === targetSum);
              return (
                <button
                  key={ans}
                  type="button"
                  disabled={isDimmed}
                  onClick={() => handleMathChoice(ans)}
                  className={`math-choice-card ${isDimmed ? 'errorless-dimmed' : ''} ${
                    isTargetGlow ? 'errorless-target-glow' : ''
                  }`}
                >
                  <span className="math-choice-num">{ans}</span>
                  <span className="math-choice-emojis">
                    {Array.from({ length: Math.min(ans, 6) })
                      .map(() => spin.emoji)
                      .join('')}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="learning-footer-row">
            <button
              type="button"
              onClick={generateNextMathPuzzle}
              className="strip-speak-btn"
            >
              🔄 Next {spin.label} Puzzle
            </button>
            <button
              type="button"
              onClick={() => {
                // Errorless hint: dim all non-target choices
                setDimmedChoices(candidateAnswers.filter((n) => n !== targetSum));
                speakCompanionText(`Look for number ${targetSum}!`, profile.sensory);
              }}
              className="coplay-tool-btn"
            >
              💡 Show Gentle Hint
            </button>
          </div>
        </div>
      )}

      {/* 2. CAUSE-AND-EFFECT SCIENCE LAB */}
      {mode === 'science' && (
        <div className="science-grid">
          {/* Experiment A: Magnetic Train / Dino Couplers (Push & Pull) */}
          <div className="science-card">
            <span className="clinical-tag">Physics · Cause & Effect</span>
            <h3 className="science-card-title">
              🧲 Magnetic Couplers: Push (Repel) or Pull (Attract)
            </h3>
            <p className="science-card-desc">
              Tap the magnet poles to flip North (N) and South (S) and see how the {spin.label} carriages move!
            </p>

            <div className={`magnet-stage ${magnetsAttract ? 'attract-mode' : 'repel-mode'}`}>
              <div className="magnet-carriage left-car">
                <span className="car-emoji">{spin.emoji}</span>
                <button
                  type="button"
                  onClick={() => {
                    const next = magnetLeftPole === 'N' ? 'S' : 'N';
                    setMagnetLeftPole(next);
                    playGentleSuccessChime(profile.sensory);
                  }}
                  className={`pole-badge pole-${magnetLeftPole}`}
                >
                  Pole: {magnetLeftPole} (Tap to Flip)
                </button>
              </div>

              <div className="magnet-force-indicator">
                {magnetsAttract ? '🤝 SNAP TOGETHER! (Attract)' : '↔️ PUSH APART! (Repel)'}
              </div>

              <div className="magnet-carriage right-car">
                <button
                  type="button"
                  onClick={() => {
                    const next = magnetRightPole === 'N' ? 'S' : 'N';
                    setMagnetRightPole(next);
                    playGentleSuccessChime(profile.sensory);
                  }}
                  className={`pole-badge pole-${magnetRightPole}`}
                >
                  Pole: {magnetRightPole} (Tap to Flip)
                </button>
                <span className="car-emoji">{spin.emoji}</span>
              </div>
            </div>
          </div>

          {/* Experiment B: Plant Growth & Orbit Cause-Effect */}
          <div className="science-card">
            <span className="clinical-tag">Nature & Space · Interactive Controls</span>
            <h3 className="science-card-title">
              🌱 Sunlight, Water & Planetary Motion
            </h3>
            <div className="plant-stage-display">
              <div className="plant-stage-hero">{plantStage}</div>
              <div className="plant-bars">
                <span>💧 Water: {plantWaterLevel}/4</span>
                <span>☀️ Sunlight: {plantSunLevel}/4</span>
                <span>🪐 Orbit Speed: {orbitSpeed}x</span>
              </div>
            </div>
            <div className="science-controls-row">
              <button
                type="button"
                onClick={() => {
                  setPlantWaterLevel((w) => (w >= 4 ? 1 : w + 1));
                  playGentleSuccessChime(profile.sensory);
                }}
                className="coplay-tool-btn"
              >
                💧 Add Water
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlantSunLevel((s) => (s >= 4 ? 1 : s + 1));
                  playGentleSuccessChime(profile.sensory);
                }}
                className="coplay-tool-btn"
              >
                ☀️ Add Sunlight
              </button>
              <button
                type="button"
                onClick={() => setOrbitSpeed((o) => (o >= 3 ? 1 : o + 1))}
                className="coplay-tool-btn"
              >
                🪐 Change Gravity ({orbitSpeed}x)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. PRACTICAL DAILY ROUTINE SEQUENCER */}
      {mode === 'routine' && (
        <div className="learning-card">
          <h3 className="learning-title">
            🧩 Step-by-Step Routine Sequencer (Tap each step in order!)
          </h3>
          <p className="section-subtitle">
            Predictable micro-steps help make daily transitions calm and familiar.
          </p>

          <div className="routine-steps-vertical">
            {routineSteps.map((st) => {
              const isDone = completedRoutineOrders.includes(st.order);
              return (
                <button
                  key={st.order}
                  type="button"
                  onClick={() => {
                    if (!isDone) {
                      setCompletedRoutineOrders((prev) => [...prev, st.order]);
                      playGentleSuccessChime(profile.sensory);
                      speakCompanionText(st.label, profile.sensory);
                      onRecordProgress(`Completed routine step: ${st.label}`);
                    }
                  }}
                  className={`routine-step-row ${isDone ? 'routine-done' : ''}`}
                >
                  <span className="routine-step-num">Step {st.order}</span>
                  <span className="routine-step-emoji">{st.icon}</span>
                  <span className="routine-step-label">{st.label}</span>
                  <span className="routine-step-status">
                    {isDone ? '✅ Completed!' : '👆 Tap to Complete'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="learning-footer-row">
            <button
              type="button"
              onClick={() => setCompletedRoutineOrders([])}
              className="coplay-tool-btn"
            >
              🔄 Practice Routine Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
