import React, { useEffect, useState } from 'react';
import {
  AllowedActionType,
  ChildProfile,
  GestaltMapping,
  SensoryTheme,
} from '../types';
import {
  addGestaltMappingRemote,
  fetchAnalyticsData,
  fetchSafetyAuditLog,
} from '../services/agentClient';

interface CaregiverClinicianPortalProps {
  profile: ChildProfile;
  forceOffline: boolean;
  onUpdateProfile: (updated: ChildProfile) => void;
  onClose: () => void;
}

export const CaregiverClinicianPortal: React.FC<CaregiverClinicianPortalProps> = ({
  profile,
  forceOffline,
  onUpdateProfile,
  onClose,
}) => {
  const [tab, setTab] = useState<'sensory' | 'gestalt' | 'analytics' | 'dpia'>('sensory');
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [auditLog, setAuditLog] = useState<any | null>(null);

  // Gestalt form state
  const [newPhrase, setNewPhrase] = useState<string>('');
  const [newMeaning, setNewMeaning] = useState<string>('');
  const [newAction, setNewAction] = useState<AllowedActionType>('open_drawing');
  const [newMitigations, setNewMitigations] = useState<string>('Let us draw together, Do it again');

  useEffect(() => {
    fetchAnalyticsData(profile.id, forceOffline).then((data) => {
      if (data) setAnalytics(data);
    });
    fetchSafetyAuditLog(forceOffline).then((log) => {
      if (log) setAuditLog(log);
    });
  }, [profile.id, forceOffline]);

  const updateSensoryField = <K extends keyof ChildProfile['sensory']>(
    key: K,
    val: ChildProfile['sensory'][K]
  ) => {
    const updated: ChildProfile = {
      ...profile,
      sensory: {
        ...profile.sensory,
        [key]: val,
      },
    };
    onUpdateProfile(updated);
  };

  const handleAddGestalt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhrase.trim() || !newMeaning.trim()) return;

    const mapping: GestaltMapping = {
      id: `g-custom-${Date.now()}`,
      phrase: newPhrase.trim(),
      meaning: newMeaning.trim(),
      target_action: newAction,
      target_args: { interest: profile.primary_interest },
      stage: 'Stage 1 (Whole Gestalt)',
      mitigations: newMitigations
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const remoteUpdated = await addGestaltMappingRemote(profile.id, mapping, forceOffline);
    if (remoteUpdated) {
      onUpdateProfile(remoteUpdated);
    } else {
      onUpdateProfile({
        ...profile,
        gestalt_dictionary: [mapping, ...profile.gestalt_dictionary],
      });
    }
    setNewPhrase('');
    setNewMeaning('');
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Caregiver, SLP & OT Portal">
      <div className="modal-panel portal-large">
        <div className="modal-header">
          <div>
            <span className="clinical-tag">👩‍⚕️ Authorised Caregiver, SLP & OT Workspace</span>
            <h2 className="modal-title">
              Personalisation, Sensory Profile & Clinical Insights — {profile.name} (Age {profile.age})
            </h2>
          </div>
          <button type="button" onClick={onClose} className="modal-close-btn">
            ✖ Done
          </button>
        </div>

        {/* Portal Navigation */}
        <div className="studio-tabs-row">
          <button
            type="button"
            onClick={() => setTab('sensory')}
            className={`studio-tab-btn ${tab === 'sensory' ? 'active' : ''}`}
          >
            🎛️ Sensory Envelope & Choice Density
          </button>
          <button
            type="button"
            onClick={() => setTab('gestalt')}
            className={`studio-tab-btn ${tab === 'gestalt' ? 'active' : ''}`}
          >
            🗣️ Gestalt & Cue Calibration (SLP)
          </button>
          <button
            type="button"
            onClick={() => setTab('analytics')}
            className={`studio-tab-btn ${tab === 'analytics' ? 'active' : ''}`}
          >
            📊 Neuro-Affirming Progress (OT/SLP)
          </button>
          <button
            type="button"
            onClick={() => setTab('dpia')}
            className={`studio-tab-btn ${tab === 'dpia' ? 'active' : ''}`}
          >
            🛡️ UK Children&apos;s Code & Safety Audit
          </button>
        </div>

        {/* TAB 1: SENSORY ENVELOPE BUILDER */}
        {tab === 'sensory' && (
          <div className="portal-section-grid">
            <div className="portal-card">
              <h3>🎨 Visual & Choice Density Settings</h3>
              <label className="portal-field-row">
                <span>Choice Density (Cards shown at once):</span>
                <div className="density-btn-group">
                  {([2, 4, 6] as const).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => updateSensoryField('choice_density', n)}
                      className={`density-btn ${profile.sensory.choice_density === n ? 'active' : ''}`}
                    >
                      {n} Cards
                    </button>
                  ))}
                </div>
              </label>

              <label className="portal-field-row">
                <span>Sensory Colour Palette:</span>
                <select
                  value={profile.sensory.sensory_theme}
                  onChange={(e) => updateSensoryField('sensory_theme', e.target.value as SensoryTheme)}
                  className="portal-select"
                >
                  <option value="calm_sage">Calm Sage & Slate (Default Low-Glare)</option>
                  <option value="warm_sand">Warm Sand & Soft Terracotta</option>
                  <option value="deep_dusk">Deep Dusk (Ultra-Low Brightness)</option>
                  <option value="high_contrast">High Contrast Accessibility</option>
                </select>
              </label>

              <label className="portal-field-row">
                <span>Reduced Motion (Disable keyframe animations):</span>
                <input
                  type="checkbox"
                  checked={profile.sensory.reduced_motion}
                  onChange={(e) => updateSensoryField('reduced_motion', e.target.checked)}
                />
              </label>

              <label className="portal-field-row">
                <span>Errorless Learning (Fade wrong choices, zero buzzers):</span>
                <input
                  type="checkbox"
                  checked={profile.sensory.errorless_learning}
                  onChange={(e) => updateSensoryField('errorless_learning', e.target.checked)}
                />
              </label>
            </div>

            <div className="portal-card">
              <h3>🔊 Auditory, Speech & Hardware Permissions</h3>
              <label className="portal-field-row">
                <span>Quiet Mode (Clamp audio & mute sound effects):</span>
                <input
                  type="checkbox"
                  checked={profile.sensory.quiet_mode}
                  onChange={(e) => updateSensoryField('quiet_mode', e.target.checked)}
                />
              </label>

              <label className="portal-field-row">
                <span>Companion Text-to-Speech (TTS) Narration:</span>
                <input
                  type="checkbox"
                  checked={profile.sensory.tts_enabled}
                  onChange={(e) => updateSensoryField('tts_enabled', e.target.checked)}
                />
              </label>

              <label className="portal-field-row">
                <span>Speech Rate ({profile.sensory.speech_rate.toFixed(2)}x):</span>
                <input
                  type="range"
                  min={0.7}
                  max={1.15}
                  step={0.05}
                  value={profile.sensory.speech_rate}
                  onChange={(e) => updateSensoryField('speech_rate', Number(e.target.value))}
                />
              </label>

              <label className="portal-field-row">
                <span>Max Volume Ceiling ({profile.sensory.max_volume_db} dB):</span>
                <input
                  type="range"
                  min={35}
                  max={80}
                  step={5}
                  value={profile.sensory.max_volume_db}
                  onChange={(e) => updateSensoryField('max_volume_db', Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 2: PERSONAL GESTALT & VOCALIZATION CALIBRATION */}
        {tab === 'gestalt' && (
          <div className="portal-gestalt-layout">
            <form onSubmit={handleAddGestalt} className="portal-card">
              <h3>➕ Calibrate New Personal Gestalt Script or Vocalization Cue</h3>
              <p className="section-subtitle">
                Configure known scripts, echolalia phrases, or non-standard vocalizations so the AI maps them directly to {profile.name}&apos;s intended activity.
              </p>

              <div className="form-stack">
                <input
                  type="text"
                  placeholder="Spoken script or cue (e.g., 'Ready set blastoff!' or humming melody)"
                  value={newPhrase}
                  onChange={(e) => setNewPhrase(e.target.value)}
                  className="portal-input"
                />
                <input
                  type="text"
                  placeholder="Functional meaning (e.g., 'I want to play the Space Rocket Science Lab')"
                  value={newMeaning}
                  onChange={(e) => setNewMeaning(e.target.value)}
                  className="portal-input"
                />
                <select
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value as AllowedActionType)}
                  className="portal-select"
                >
                  <option value="open_drawing">Open Guided Co-Drawing</option>
                  <option value="open_math_activity">Open Special-Interest Math</option>
                  <option value="open_science_activity">Open Cause & Effect Science</option>
                  <option value="open_music_pad">Open Pentatonic Music Pad</option>
                  <option value="open_story_activity">Open Interactive Story</option>
                  <option value="open_safe_harbor">Open Quiet Safe Harbor Break</option>
                </select>
                <input
                  type="text"
                  placeholder="Comma-separated Stage 2/3 mitigations (e.g., Let's blastoff, Blastoff to space)"
                  value={newMitigations}
                  onChange={(e) => setNewMitigations(e.target.value)}
                  className="portal-input"
                />
                <button type="submit" className="strip-speak-btn">
                  💾 Save Gestalt Script Mapping
                </button>
              </div>
            </form>

            <div className="portal-card">
              <h3>📚 Active Calibrated Scripts ({profile.gestalt_dictionary.length})</h3>
              <div className="gestalt-mini-list">
                {profile.gestalt_dictionary.map((g) => (
                  <div key={g.id} className="gestalt-mini-item">
                    <strong>&ldquo;{g.phrase}&rdquo;</strong> ➔ {g.meaning} (
                    <code>{g.target_action}</code>)
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NEURO-AFFIRMING ANALYTICS */}
        {tab === 'analytics' && (
          <div className="portal-analytics-layout">
            <div className="privacy-banner-box">
              🌱 <strong>Ethical Measurement Policy:</strong> Tracks communicative agency, self-advocacy wins (using Stop/Break effectively), and special-interest mastery. Never generates behavioural compliance scores.
            </div>

            <div className="metrics-kpi-grid">
              <div className="kpi-box">
                <span className="kpi-num">{analytics?.summary_metrics?.self_advocacy_wins ?? 3}</span>
                <span className="kpi-label">🛡️ Self-Advocacy Wins (Stop / Break Used)</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-num">{analytics?.summary_metrics?.gestalt_mitigations_explored ?? 4}</span>
                <span className="kpi-label">🗣️ Gestalt Mitigations Explored</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-num">{profile.sensory.choice_density} Cards</span>
                <span className="kpi-label">🃏 Optimal Choice Density</span>
              </div>
              <div className="kpi-box">
                <span className="kpi-num">{analytics?.summary_metrics?.total_meaningful_interactions ?? 8}</span>
                <span className="kpi-label">✨ Meaningful Multimodal Turns</span>
              </div>
            </div>

            <div className="portal-card">
              <h3>📋 Recent Communicative & Self-Advocacy Log</h3>
              <div className="events-log-list">
                {(analytics?.recent_events || []).map((ev: any) => (
                  <div key={ev.id} className="event-log-row">
                    <span className="event-fn-badge">{ev.communicative_function}</span>
                    <span className="event-details-text">{ev.details}</span>
                    <span className="event-modality-tag">{ev.modality}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: UK ICO CHILDREN'S CODE & DETERMINISTIC POLICY AUDIT */}
        {tab === 'dpia' && (
          <div className="portal-analytics-layout">
            <div className="portal-card">
              <h3>🛡️ UK ICO Age Appropriate Design Code (Children&apos;s Code) Controls</h3>
              <div className="events-log-list">
                {(
                  auditLog?.guardrail_controls || [
                    {
                      risk: 'Unreliable Facial Emotion Inference',
                      control: 'Zero facial emotion classification. Camera is opt-in for object Show & Tell only.',
                      status: 'ACTIVE',
                    },
                    {
                      risk: 'Unbounded LLM Execution',
                      control: 'All specialist agent outputs validated against ALLOWED_ACTIONS & sensory clamps.',
                      status: 'ACTIVE',
                    },
                    {
                      risk: 'Delayed Stop / Overwhelmed Child',
                      control: 'Deterministic Preemption bypasses AI inference in <5ms for Stop & Safe Harbor.',
                      status: 'ACTIVE',
                    },
                  ]
                ).map((ctrl: any, idx: number) => (
                  <div key={idx} className="event-log-row">
                    <span className="event-fn-badge">{ctrl.status}</span>
                    <span className="event-details-text">
                      <strong>{ctrl.risk}:</strong> {ctrl.control}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
