import React, { useEffect, useState } from 'react';
import {
  ChildProfile,
  ScheduleStep,
  SPECIAL_INTERESTS,
  SpecialInterestId,
} from '../types';
import { playGentleSuccessChime, speakCompanionText } from '../services/soundAndSpeech';

interface TopExecutiveScheduleBarProps {
  profiles: ChildProfile[];
  activeProfile: ChildProfile;
  onSelectProfile: (profileId: string) => void;
  onChangeInterest: (interest: SpecialInterestId) => void;
  onTriggerScheduleStep: (step: ScheduleStep) => void;
  onToggleStepComplete: (stepId: string) => void;
  onOpenShowAndTell: () => void;
  onOpenCaregiverPortal: () => void;
  onToggleAgentInspector: () => void;
  inspectorOpen: boolean;
  backendOnline: boolean;
  forceOffline: boolean;
  onToggleForceOffline: () => void;
  onToggleQuietMode: () => void;
}

/**
 * Top Executive Function & Predictable Transition Bar:
 * 1. First -> Then -> Next concrete visual schedule.
 * 2. Disappearing-Disk Visual Timer (Time Timer style shrinking wedge) so time is visual, not abstract digits.
 * 3. Developmental profile selector (Ages 2-4, 5-7, 8-11) & Special Interest ("Spin") switcher.
 */
export const TopExecutiveScheduleBar: React.FC<TopExecutiveScheduleBarProps> = ({
  profiles,
  activeProfile,
  onSelectProfile,
  onChangeInterest,
  onTriggerScheduleStep,
  onToggleStepComplete,
  onOpenShowAndTell,
  onOpenCaregiverPortal,
  onToggleAgentInspector,
  inspectorOpen,
  backendOnline,
  forceOffline,
  onToggleForceOffline,
  onToggleQuietMode,
}) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(180);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(180);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          playGentleSuccessChime(activeProfile.sensory);
          speakCompanionText(
            'Timer is all done! When you are ready, we can check our next step.',
            activeProfile.sensory
          );
          return 0;
        }
        if (prev === activeProfile.sensory.transition_warning_seconds + 1) {
          speakCompanionText(
            `${activeProfile.sensory.transition_warning_seconds} seconds left. You can tap More Time if you need it.`,
            activeProfile.sensory
          );
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, activeProfile.sensory]);

  const addOneMinute = () => {
    setTotalSeconds((t) => Math.max(t, remainingSeconds + 60));
    setRemainingSeconds((r) => r + 60);
    speakCompanionText('Added one more minute.', activeProfile.sensory);
  };

  // Calculate SVG disappearing wedge path for concrete visual timer
  const fraction = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - fraction);
  const isWarning =
    remainingSeconds > 0 && remainingSeconds <= activeProfile.sensory.transition_warning_seconds;

  return (
    <header className="top-executive-bar">
      {/* Row 1: Brand, Child Developmental Profile, Special Interest ("Spin") & System Controls */}
      <div className="top-bar-row-main">
        <div className="brand-cluster">
          <div className="brand-logo-orb" aria-hidden="true">
            ✨
          </div>
          <div>
            <div className="brand-title-row">
              <h1 className="brand-title">AutiCompanion AI</h1>
              <span
                className={`connectivity-pill ${
                  backendOnline && !forceOffline ? 'online' : 'offline'
                }`}
                onClick={onToggleForceOffline}
                title="Click to toggle Offline-First Resilience Mode"
              >
                {backendOnline && !forceOffline
                  ? '🟢 FastAPI + ADK Live'
                  : '🛡️ Offline-First Mode'}
              </span>
            </div>
            <p className="brand-subtitle">
              Neuro-Affirming Multimodal Companion · Ages 2–11
            </p>
          </div>
        </div>

        {/* Developmental Profile Switcher */}
        <div className="profile-switcher" role="group" aria-label="Child Profile & Age Tier">
          {profiles.map((p) => {
            const active = p.id === activeProfile.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProfile(p.id)}
                className={`profile-pill ${active ? 'active' : ''}`}
              >
                <span className="profile-name">
                  {p.name} ({p.age}y)
                </span>
                <span className="profile-band">Band {p.developmental_band}</span>
              </button>
            );
          })}
        </div>

        {/* Special Interest ("Spin") Quick Selector */}
        <div className="spin-selector" role="group" aria-label="Special Interest Theme">
          <span className="spin-label">Special Interest:</span>
          {(Object.keys(SPECIAL_INTERESTS) as SpecialInterestId[]).map((id) => {
            const item = SPECIAL_INTERESTS[id];
            const selected = activeProfile.primary_interest === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChangeInterest(id)}
                className={`spin-chip ${selected ? 'selected' : ''}`}
                title={`Infuse activities with ${item.label}`}
              >
                <span>{item.emoji}</span>
                <span className="spin-chip-text">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Utility & Clinical Actions */}
        <div className="top-utility-actions">
          <button
            type="button"
            onClick={onToggleQuietMode}
            className={`util-btn ${activeProfile.sensory.quiet_mode ? 'active-quiet' : ''}`}
            title="Toggle Sensory Quiet Mode"
          >
            {activeProfile.sensory.quiet_mode ? '🔇 Quiet ON' : '🔉 Sound OK'}
          </button>

          <button
            type="button"
            onClick={onOpenShowAndTell}
            className="util-btn show-tell-btn"
            title="Opt-In Camera 'Show & Tell' Shared Attention (Object-Only, Never Emotion Guessing)"
          >
            📸 Show My Toy
          </button>

          <button
            type="button"
            onClick={onOpenCaregiverPortal}
            className="util-btn caregiver-btn"
          >
            👩‍⚕️ Caregiver / SLP
          </button>

          <button
            type="button"
            onClick={onToggleAgentInspector}
            className={`util-btn inspector-btn ${inspectorOpen ? 'active' : ''}`}
          >
            🧠 ADK Agent Trace
          </button>
        </div>
      </div>

      {/* Row 2: Concrete First -> Then -> Next Schedule + Disappearing-Disk Visual Timer */}
      <div className="top-bar-row-schedule">
        <div className="schedule-strip" aria-label="First Then Next Visual Schedule">
          <span className="schedule-strip-heading">📅 Routine:</span>
          {activeProfile.schedule.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div
                className={`schedule-card ${step.completed ? 'completed' : ''}`}
              >
                <button
                  type="button"
                  className="schedule-card-main"
                  onClick={() => onTriggerScheduleStep(step)}
                >
                  <span className="schedule-slot-tag">{step.slot}</span>
                  <span className="schedule-step-icon">{step.icon}</span>
                  <span className="schedule-step-title">{step.title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleStepComplete(step.id)}
                  className="schedule-check-btn"
                  title={step.completed ? 'Mark uncompleted' : 'Mark step all done!'}
                >
                  {step.completed ? '✅' : '⬜'}
                </button>
              </div>
              {idx < activeProfile.schedule.length - 1 && (
                <span className="schedule-arrow" aria-hidden="true">
                  ➔
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Concrete Visual Disappearing-Disk Timer */}
        <div className={`visual-timer-widget ${isWarning ? 'warning-pulse' : ''}`}>
          <svg width="48" height="48" viewBox="0 0 48 48" className="timer-svg">
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="rgba(148, 163, 184, 0.25)"
              strokeWidth="7"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke={isWarning ? '#F59E0B' : '#10B981'}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
            />
          </svg>
          <div className="timer-info">
            <div className="timer-label">
              {isWarning
                ? '⏳ Almost Transition Time'
                : timerRunning
                ? '🟢 Activity Time'
                : '⏸️ Visual Timer'}
            </div>
            <div className="timer-controls">
              <button
                type="button"
                onClick={() => setTimerRunning((r) => !r)}
                className="timer-mini-btn"
              >
                {timerRunning ? 'Pause' : 'Start'}
              </button>
              <button
                type="button"
                onClick={addOneMinute}
                className="timer-mini-btn more-time"
                title="Child agency: ask for 1 more minute before transition"
              >
                +1 Min
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimerRunning(false);
                  setTotalSeconds(180);
                  setRemainingSeconds(180);
                }}
                className="timer-mini-btn"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
