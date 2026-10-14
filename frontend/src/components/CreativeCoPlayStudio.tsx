import React, { useEffect, useRef, useState } from 'react';
import { ChildProfile, SPECIAL_INTERESTS, SpecialInterestId } from '../types';
import {
  playGentleSuccessChime,
  playPentatonicNote,
  speakCompanionText,
} from '../services/soundAndSpeech';

interface CreativeCoPlayStudioProps {
  profile: ChildProfile;
  initialTab?: 'drawing' | 'music' | 'story';
  requestedColor?: string;
}

const COLOR_SWATCHES = [
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Emerald', hex: '#10B981' },
  { name: 'Amber', hex: '#F59E0B' },
  { name: 'Purple', hex: '#8B5CF6' },
  { name: 'Teal', hex: '#14B8A6' },
  { name: 'Coral', hex: '#F43F5E' },
];

const PENTATONIC_PADS = [
  { note: 'C4', label: 'Do (Warm C)', freq: 261.63, color: '#3B82F6', emoji: '🌊' },
  { note: 'D4', label: 'Re (Gentle D)', freq: 293.66, color: '#10B981', emoji: '🌿' },
  { note: 'E4', label: 'Mi (Sunny E)', freq: 329.63, color: '#F59E0B', emoji: '☀️' },
  { note: 'G4', label: 'Sol (Sky G)', freq: 392.0, color: '#14B8A6', emoji: '☁️' },
  { note: 'A4', label: 'La (Starlight A)', freq: 440.0, color: '#8B5CF6', emoji: '✨' },
  { note: 'C5', label: 'High Do (C5)', freq: 523.25, color: '#6366F1', emoji: '🪐' },
  { note: 'D5', label: 'High Re (D5)', freq: 587.33, color: '#EC4899', emoji: '🌸' },
  { note: 'E5', label: 'High Mi (E5)', freq: 659.25, color: '#06B6D4', emoji: '🦋' },
];

export const CreativeCoPlayStudio: React.FC<CreativeCoPlayStudioProps> = ({
  profile,
  initialTab = 'drawing',
  requestedColor,
}) => {
  const [activeTab, setActiveTab] = useState<'drawing' | 'music' | 'story'>(initialTab);
  const spin = SPECIAL_INTERESTS[profile.primary_interest];

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // --- DRAWING CANVAS STATE ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [brushColor, setBrushColor] = useState<string>(
    COLOR_SWATCHES.find((c) => c.name.toLowerCase() === (requestedColor || '').toLowerCase())?.hex ||
      spin.accentHex
  );
  const [brushSize, setBrushSize] = useState<number>(12);
  const [symmetryMode, setSymmetryMode] = useState<boolean>(false);
  const [gentleBounce, setGentleBounce] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // --- PENTATONIC MUSIC STATE ---
  const [timbre, setTimbre] = useState<'kalimba' | 'marimba' | 'synth'>('kalimba');
  const [activePadNote, setActivePadNote] = useState<string | null>(null);
  const [recordedNotes, setRecordedNotes] = useState<number[]>([261.63, 329.63, 392.0, 523.25]);

  // --- VISUAL STORY STATE ---
  const [storyPage, setStoryPage] = useState<number>(0);
  const [storyModifier, setStoryModifier] = useState<string>('sparkling');

  // Render the guided Special Interest template onto the HTML5 Canvas
  const drawGuidedTemplate = (colorHex: string, interest: SpecialInterestId) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle starry/grid background
    ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
    for (let x = 40; x < canvas.width; x += 60) {
      for (let y = 40; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.save();
    ctx.strokeStyle = colorHex;
    ctx.fillStyle = `${colorHex}44`;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const cx = canvas.width / 2;
    const cy = canvas.height / 2 + 15;

    if (interest === 'dinosaurs') {
      // Friendly Brachiosaurus Outline
      ctx.beginPath();
      // Body
      ctx.ellipse(cx, cy + 25, 85, 52, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Long neck & head
      ctx.beginPath();
      ctx.moveTo(cx + 50, cy - 5);
      ctx.quadraticCurveTo(cx + 85, cy - 95, cx + 105, cy - 105);
      ctx.arc(cx + 120, cy - 100, 24, Math.PI, Math.PI * 2.8);
      ctx.lineTo(cx + 75, cy + 10);
      ctx.fill();
      ctx.stroke();
      // Tail
      ctx.beginPath();
      ctx.moveTo(cx - 80, cy + 15);
      ctx.quadraticCurveTo(cx - 155, cy - 20, cx - 175, cy - 45);
      ctx.quadraticCurveTo(cx - 140, cy + 35, cx - 75, cy + 45);
      ctx.fill();
      ctx.stroke();
      // Legs
      [-55, -20, 25, 55].forEach((offset) => {
        ctx.beginPath();
        ctx.roundRect(cx + offset - 12, cy + 65, 22, 48, 8);
        ctx.fill();
        ctx.stroke();
      });
      // Friendly Eye
      ctx.fillStyle = '#F8FAFC';
      ctx.beginPath();
      ctx.arc(cx + 124, cy - 105, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (interest === 'trains') {
      // Steam Engine Outline
      ctx.beginPath();
      ctx.roundRect(cx - 110, cy - 35, 150, 75, 14);
      ctx.fill();
      ctx.stroke();
      // Cab
      ctx.beginPath();
      ctx.roundRect(cx - 130, cy - 85, 70, 125, 10);
      ctx.fill();
      ctx.stroke();
      // Funnel
      ctx.beginPath();
      ctx.roundRect(cx + 5, cy - 75, 26, 40, 6);
      ctx.fill();
      ctx.stroke();
      // Wheels
      [-95, -40, 15].forEach((wx) => {
        ctx.beginPath();
        ctx.arc(cx + wx, cy + 52, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    } else if (interest === 'space') {
      // Explorer Rocket Outline
      ctx.beginPath();
      ctx.ellipse(cx, cy - 10, 48, 105, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Window
      ctx.beginPath();
      ctx.arc(cx, cy - 35, 24, 0, Math.PI * 2);
      ctx.stroke();
      // Fins
      ctx.beginPath();
      ctx.moveTo(cx - 45, cy + 40);
      ctx.lineTo(cx - 90, cy + 95);
      ctx.lineTo(cx - 30, cy + 80);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 45, cy + 40);
      ctx.lineTo(cx + 90, cy + 95);
      ctx.lineTo(cx + 30, cy + 80);
      ctx.stroke();
    } else {
      // Singing Whale / Ocean / Art Star
      ctx.beginPath();
      ctx.ellipse(cx - 15, cy, 105, 55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + 85, cy);
      ctx.lineTo(cx + 145, cy - 40);
      ctx.lineTo(cx + 135, cy + 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  };

  useEffect(() => {
    if (activeTab === 'drawing') {
      drawGuidedTemplate(brushColor, profile.primary_interest);
    }
  }, [activeTab, profile.primary_interest]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = brushColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();

    if (symmetryMode) {
      ctx.beginPath();
      ctx.arc(canvas.width - x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = brushColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();

    if (symmetryMode) {
      ctx.beginPath();
      ctx.arc(canvas.width - x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleStampStars = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.font = '28px sans-serif';
    for (let i = 0; i < 6; i++) {
      const rx = 60 + Math.random() * (canvas.width - 120);
      const ry = 50 + Math.random() * (canvas.height - 100);
      ctx.fillText(spin.emoji, rx, ry);
    }
    playGentleSuccessChime(profile.sensory);
  };

  const handlePlayLoop = () => {
    recordedNotes.forEach((freq, idx) => {
      setTimeout(() => {
        playPentatonicNote(freq, profile.sensory, timbre, 0.65);
      }, idx * 360);
    });
  };

  const storyPages = [
    {
      title: `Page 1: The ${storyModifier} ${spin.heroNoun}`,
      illustration: spin.emoji,
      text: `Once upon a calm morning, the ${storyModifier} ${spin.heroNoun} woke up ready to explore.`,
      choices: [
        { label: 'Make it Blue & Sparkly', mod: 'blue sparkling' },
        { label: 'Make it Gentle & Green', mod: 'gentle emerald' },
      ],
    },
    {
      title: `Page 2: A Friendly Discovery`,
      illustration: '🌟',
      text: `Along the quiet path, the ${storyModifier} ${spin.heroNoun} found three glowing musical chimes!`,
      choices: [
        { label: 'Play a Soft Song', mod: 'musical' },
        { label: 'Count the Chimes Together', mod: 'clever counting' },
      ],
    },
    {
      title: `Page 3: Cozy Safe Harbor Rest`,
      illustration: '🌿',
      text: `After a wonderful adventure, the ${storyModifier} ${spin.heroNoun} took a cozy deep breath under the stars.`,
      choices: [
        { label: 'Read Story Again', mod: 'happy' },
        { label: 'Draw Our Story Hero', mod: 'artistic' },
      ],
    },
  ];

  return (
    <div className="studio-container">
      {/* Mode Switcher Tabs */}
      <div className="studio-tabs-row" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'drawing'}
          onClick={() => setActiveTab('drawing')}
          className={`studio-tab-btn ${activeTab === 'drawing' ? 'active' : ''}`}
        >
          🎨 Guided Co-Drawing ({spin.label})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'music'}
          onClick={() => setActiveTab('music')}
          className={`studio-tab-btn ${activeTab === 'music' ? 'active' : ''}`}
        >
          🎵 Harmonic Pentatonic Music Pad
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'story'}
          onClick={() => setActiveTab('story')}
          className={`studio-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
        >
          📖 Interactive {spin.label} Story
        </button>
      </div>

      {/* TAB 1: GUIDED CO-DRAWING CANVAS */}
      {activeTab === 'drawing' && (
        <div className="drawing-workspace">
          <div className="drawing-toolbar">
            <div className="swatch-group">
              <span className="toolbar-label">Colours:</span>
              {COLOR_SWATCHES.map((sw) => (
                <button
                  key={sw.name}
                  type="button"
                  onClick={() => {
                    setBrushColor(sw.hex);
                    drawGuidedTemplate(sw.hex, profile.primary_interest);
                    speakCompanionText(`Made it ${sw.name}!`, profile.sensory);
                  }}
                  className={`color-swatch-btn ${brushColor === sw.hex ? 'selected' : ''}`}
                  style={{ backgroundColor: sw.hex }}
                  title={`Make it ${sw.name}`}
                >
                  {sw.name}
                </button>
              ))}
            </div>

            <div className="coplay-action-group">
              <button
                type="button"
                onClick={handleStampStars}
                className="coplay-tool-btn"
              >
                {spin.emoji} Stamp {spin.label}
              </button>
              <button
                type="button"
                onClick={() => setSymmetryMode((s) => !s)}
                className={`coplay-tool-btn ${symmetryMode ? 'active' : ''}`}
              >
                🦋 Mirror Symmetry: {symmetryMode ? 'ON' : 'OFF'}
              </button>
              {!profile.sensory.reduced_motion && (
                <button
                  type="button"
                  onClick={() => setGentleBounce((b) => !b)}
                  className={`coplay-tool-btn ${gentleBounce ? 'active' : ''}`}
                >
                  🌊 Gentle Float: {gentleBounce ? 'ON' : 'OFF'}
                </button>
              )}
              <button
                type="button"
                onClick={() => drawGuidedTemplate(brushColor, profile.primary_interest)}
                className="coplay-tool-btn"
              >
                🔄 Fresh Outline
              </button>
            </div>
          </div>

          <div className={`canvas-frame ${gentleBounce && !profile.sensory.reduced_motion ? 'gentle-float-anim' : ''}`}>
            <canvas
              ref={canvasRef}
              width={760}
              height={370}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="coplay-canvas"
            />
          </div>

          <div className="canvas-footer-controls">
            <label className="brush-slider-label">
              Brush Size ({brushSize}px):
              <input
                type="range"
                min={6}
                max={34}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
              />
            </label>
            <span className="canvas-tip">
              💡 Voice/Touch Command Ready: Try saying &ldquo;Make it blue&rdquo; or tap any colour swatch to re-skin the {spin.heroNoun}!
            </span>
          </div>
        </div>
      )}

      {/* TAB 2: HARMONIC PENTATONIC MUSIC PAD */}
      {activeTab === 'music' && (
        <div className="music-workspace">
          <div className="music-header-bar">
            <div>
              <h3 className="music-title">
                🎶 Sensory-Safe C Major Pentatonic Sound Pad
              </h3>
              <p className="music-desc">
                Tuned to a pure 5-tone harmonic scale (C-D-E-G-A) so every note combination sounds warm and soothing—never harsh or dissonant.
              </p>
            </div>
            <div className="timbre-selector">
              {(['kalimba', 'marimba', 'synth'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimbre(t)}
                  className={`timbre-btn ${timbre === t ? 'active' : ''}`}
                >
                  {t === 'kalimba' ? '🪘 Soft Kalimba' : t === 'marimba' ? '🪵 Warm Marimba' : '🪐 Space Pad'}
                </button>
              ))}
              <button
                type="button"
                onClick={handlePlayLoop}
                className="timbre-btn play-loop-btn"
              >
                ▶️ Play 4-Note Melody
              </button>
            </div>
          </div>

          <div className="pentatonic-grid">
            {PENTATONIC_PADS.map((pad) => {
              const isPressed = activePadNote === pad.note;
              return (
                <button
                  key={pad.note}
                  type="button"
                  onClick={() => {
                    setActivePadNote(pad.note);
                    playPentatonicNote(pad.freq, profile.sensory, timbre, 0.9);
                    setRecordedNotes((prev) => [...prev.slice(-3), pad.freq]);
                    setTimeout(() => setActivePadNote(null), 350);
                  }}
                  className={`pentatonic-pad-card ${isPressed ? 'pad-pressed' : ''}`}
                  style={{
                    borderColor: pad.color,
                    boxShadow: isPressed ? `0 0 28px ${pad.color}88` : undefined,
                  }}
                >
                  <span className="pad-emoji">{pad.emoji}</span>
                  <span className="pad-note-name">{pad.note}</span>
                  <span className="pad-note-label">{pad.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE VISUAL STORYTELLER */}
      {activeTab === 'story' && (
        <div className="story-workspace">
          <div className="story-book-card">
            <div className="story-page-badge">
              Page {storyPage + 1} of {storyPages.length} · {spin.label} Edition
            </div>
            <div className="story-hero-illustration">
              {storyPages[storyPage].illustration}
            </div>
            <h3 className="story-page-title">{storyPages[storyPage].title}</h3>
            <p className="story-page-text">{storyPages[storyPage].text}</p>

            <div className="story-choices-row">
              {storyPages[storyPage].choices.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setStoryModifier(c.mod);
                    playGentleSuccessChime(profile.sensory);
                    if (storyPage < storyPages.length - 1) {
                      const nextP = storyPage + 1;
                      setStoryPage(nextP);
                      speakCompanionText(storyPages[nextP].text, profile.sensory);
                    } else {
                      setStoryPage(0);
                      speakCompanionText(storyPages[0].text, profile.sensory);
                    }
                  }}
                  className="story-choice-btn"
                >
                  ✨ {c.label}
                </button>
              ))}
            </div>

            <div className="story-nav-footer">
              <button
                type="button"
                onClick={() => speakCompanionText(storyPages[storyPage].text, profile.sensory, true)}
                className="coplay-tool-btn"
              >
                🔊 Read Page Aloud
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
