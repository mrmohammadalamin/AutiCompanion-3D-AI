import React, { useState } from 'react';
import {
  AgentOrchestrationResponse,
  ChildProfile,
  MultimodalSignalInput,
} from '../types';

interface AgentTraceInspectorProps {
  profile: ChildProfile;
  lastResponse: AgentOrchestrationResponse | null;
  liveTapHz: number;
  ambientDb: number;
  onSimulateSignal: (signal: Partial<MultimodalSignalInput>, description: string) => void;
  onClose: () => void;
}

/**
 * LIVE GOOGLE ADK MULTI-AGENT & MULTIMODAL FUSION INSPECTOR
 * Shows real-time observability into:
 * - On-Device Edge Perception (Touch Kinematics Hz, Ambient dB, Speech/Gestalt)
 * - Bayesian Uncertainty-Aware Intent Hypotheses P(I_k | S, C)
 * - Active Specialist Agent Routing
 * - Zero-Trust Policy Gateway Clamps
 */
export const AgentTraceInspector: React.FC<AgentTraceInspectorProps> = ({
  profile,
  lastResponse,
  liveTapHz,
  ambientDb,
  onSimulateSignal,
  onClose,
}) => {
  const [customSpeech, setCustomSpeech] = useState<string>('');

  return (
    <aside className="agent-inspector-drawer" aria-label="Live Multi-Agent Orchestrator Inspector">
      <div className="inspector-header">
        <div>
          <span className="clinical-tag">🧠 Google ADK Multi-Agent Trace</span>
          <h2 className="inspector-title">Multimodal Intent & Safety Gateway</h2>
        </div>
        <button type="button" onClick={onClose} className="modal-close-btn">
          ✖
        </button>
      </div>

      {/* 1. One-Click Multimodal Scenario Simulator */}
      <div className="inspector-section">
        <h3 className="inspector-sec-title">⚡ Test Multimodal & Edge Signals</h3>
        <div className="sim-buttons-grid">
          <button
            type="button"
            onClick={() =>
              onSimulateSignal(
                { speech_transcript: 'Blue dinosaur please' },
                'Spoken request: "Blue dinosaur please"'
              )
            }
            className="sim-btn"
          >
            🗣️ Speak: &ldquo;Blue dinosaur please&rdquo;
          </button>

          <button
            type="button"
            onClick={() =>
              onSimulateSignal(
                { speech_transcript: 'Chugga chugga choo choo!' },
                'Gestalt Script: "Chugga chugga choo choo!"'
              )
            }
            className="sim-btn"
          >
            🚂 Gestalt: &ldquo;Chugga chugga choo choo!&rdquo;
          </button>

          <button
            type="button"
            onClick={() =>
              onSimulateSignal(
                { speech_transcript: 'To infinity and beyond!' },
                'Gestalt Script: "To infinity and beyond!"'
              )
            }
            className="sim-btn"
          >
            🚀 Gestalt: &ldquo;To infinity and beyond!&rdquo;
          </button>

          <button
            type="button"
            onClick={() =>
              onSimulateSignal(
                { vocalization_cue: 'Mmm-baba-ooo' },
                'Uncertain Vocalization -> Uncertainty Gate'
              )
            }
            className="sim-btn warn"
          >
            ❓ Unclear Vocalization (Triggers {profile.sensory.choice_density}-Card Clarification)
          </button>

          <button
            type="button"
            onClick={() =>
              onSimulateSignal(
                {
                  kinematics: {
                    taps_per_second: 5.2,
                    rapid_exit_count_30s: 3,
                    repeated_stop_taps: 0,
                    edge_tremor_detected: false,
                  },
                },
                'On-Device Kinematics: Rapid Frustration Tapping (5.2 Hz)'
              )
            }
            className="sim-btn overload"
          >
            ⚡ Simulate Rapid Rage-Tapping (5.2 Hz)
          </button>

          <button
            type="button"
            onClick={() =>
              onSimulateSignal(
                { ambient_noise_db: 82.0 },
                'Ambient Acoustic Spike (82 dB Loud Room)'
              )
            }
            className="sim-btn overload"
          >
            📢 Simulate Loud Room Spike (82 dB)
          </button>

          <button
            type="button"
            onClick={() =>
              onSimulateSignal(
                { speech_transcript: 'Too loud I need a break' },
                'Preempt Keyword: "Too loud I need a break"'
              )
            }
            className="sim-btn preempt"
          >
            🛑 Preempt: &ldquo;Too loud / I need a break&rdquo;
          </button>
        </div>

        {/* Custom Speech/Gestalt Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!customSpeech.trim()) return;
            onSimulateSignal({ speech_transcript: customSpeech.trim() }, `Custom Speech: "${customSpeech}"`);
            setCustomSpeech('');
          }}
          className="inspector-custom-form"
        >
          <input
            type="text"
            placeholder="Type any spoken phrase or vocalization..."
            value={customSpeech}
            onChange={(e) => setCustomSpeech(e.target.value)}
            className="portal-input"
          />
          <button type="submit" className="strip-speak-btn">
            Send
          </button>
        </form>
      </div>

      {/* 2. On-Device Edge Telemetry */}
      <div className="inspector-section">
        <h3 className="inspector-sec-title">📡 On-Device Local Perception</h3>
        <div className="edge-telemetry-row">
          <div className="telemetry-chip">
            <span>Touch Cadence:</span>
            <strong>{liveTapHz.toFixed(1)} taps/s</strong>
          </div>
          <div className="telemetry-chip">
            <span>Ambient Room:</span>
            <strong>{ambientDb.toFixed(0)} dB</strong>
          </div>
          <div className="telemetry-chip">
            <span>Choice Density:</span>
            <strong>{profile.sensory.choice_density} cards</strong>
          </div>
        </div>
      </div>

      {/* 3. Latest Agent Orchestration Trace */}
      {lastResponse ? (
        <div className="inspector-section trace-details">
          <div className="trace-meta-row">
            <span className="trace-badge">{lastResponse.engine_mode}</span>
            <span className="trace-latency">{lastResponse.latency_ms} ms</span>
          </div>

          <div className="trace-kv">
            <span>Active Specialist Agent:</span>
            <strong>{lastResponse.active_specialist_agent}</strong>
          </div>

          <div className="trace-kv">
            <span>Uncertainty State:</span>
            <strong className={`state-tag ${lastResponse.uncertainty_state}`}>
              {lastResponse.uncertainty_state}
            </strong>
          </div>

          <h4 className="inspector-subhead">Bayesian Intent Hypotheses P(I | S, C):</h4>
          <div className="hypotheses-list">
            {lastResponse.all_hypotheses.map((h, i) => (
              <div key={i} className="hypothesis-item">
                <div className="hyp-top">
                  <strong>{h.intent_name}</strong>
                  <span className="hyp-conf">{(h.confidence * 100).toFixed(0)}%</span>
                </div>
                <div className="hyp-bar-bg">
                  <div
                    className="hyp-bar-fill"
                    style={{ width: `${Math.min(100, h.confidence * 100)}%` }}
                  />
                </div>
                <div className="hyp-reason">
                  <code>{h.source_modality}</code> · {h.reasoning}
                </div>
              </div>
            ))}
          </div>

          <h4 className="inspector-subhead">Zero-Trust Policy Gateway Decision:</h4>
          <div className="policy-box">
            <div>
              <strong>Enforced Action:</strong> <code>{lastResponse.policy_decision.enforced_action}</code>
            </div>
            <div>
              <strong>Clamps Applied:</strong>{' '}
              {lastResponse.policy_decision.sensory_clamps_applied.join(', ')}
            </div>
            <div className="policy-notes">{lastResponse.policy_decision.policy_notes}</div>
          </div>
        </div>
      ) : (
        <div className="inspector-empty">
          Tap any activity, AAC card, or test scenario above to inspect the live multi-agent trace.
        </div>
      )}
    </aside>
  );
};
