import React, { useState } from 'react';
import { ChildProfile, SPECIAL_INTERESTS, SpecialInterestId } from '../types';
import { playGentleSuccessChime, speakCompanionText, stopAllAudioAndSpeech } from '../services/soundAndSpeech';

interface ApprovedMediaLibraryProps {
  profile: ChildProfile;
  onStopMedia: () => void;
}

interface ApprovedMediaItem {
  id: string;
  title: string;
  interest: SpecialInterestId;
  emoji: string;
  durationLabel: string;
  sensoryTag: string;
  sceneFrames: string[];
  narration: string;
}

const MEDIA_ITEMS: ApprovedMediaItem[] = [
  {
    id: 'dino_gentle_walk',
    title: 'Gentle Brachiosaurus Forest Walk',
    interest: 'dinosaurs',
    emoji: '🦕',
    durationLabel: '2:00 · Low Arousal',
    sensoryTag: 'Slow Motion · Soft Forest Sounds',
    sceneFrames: ['🌲 🦕 🌿', '🌿 🦕 🍃 ☀️', '🦕 💧 🌺 🌲'],
    narration: 'The friendly blue brachiosaurus walks slowly through the quiet green ferns.',
  },
  {
    id: 'steam_train_rhythm',
    title: 'Countryside Steam Train Tracks',
    interest: 'trains',
    emoji: '🚂',
    durationLabel: '2:30 · Predictable Rhythm',
    sensoryTag: 'Steady Rhythm · No Loud Whistles',
    sceneFrames: ['⛰️ 🚂🚃🚃 🌲', '🌉 🚂🚃🚃 ☁️', '🚉 🚂🚃🚃 🌟'],
    narration: 'The emerald steam engine glides smoothly along the peaceful countryside tracks.',
  },
  {
    id: 'solar_system_orbit',
    title: 'Slow Planetary Orbits & Starlight',
    interest: 'space',
    emoji: '🪐',
    durationLabel: '3:00 · Deep Dusk Visuals',
    sensoryTag: 'Low Brightness · Ambient Chimes',
    sceneFrames: ['☀️ 🌍 🌙 ✨', '🪐 ⭐ 🚀 🌌', '🌌 🪐 🌙 ✨'],
    narration: 'Planets and moons float gently in quiet circles around the warm glowing star.',
  },
  {
    id: 'blue_whale_song',
    title: 'Deep Ocean Whale & Coral Reef',
    interest: 'ocean',
    emoji: '🐋',
    durationLabel: '2:40 · Calming Blue',
    sensoryTag: 'Gentle Waves · Zero Flash',
    sceneFrames: ['🌊 🐋 🐠 🪸', '🪸 🐢 🐋 🫧', '🌊 🐋 🌟 🪸'],
    narration: 'The gentle whale swims slowly through the warm blue water.',
  },
];

export const ApprovedMediaLibrary: React.FC<ApprovedMediaLibraryProps> = ({
  profile,
  onStopMedia,
}) => {
  const [selectedMedia, setSelectedMedia] = useState<ApprovedMediaItem>(
    MEDIA_ITEMS.find((m) => m.interest === profile.primary_interest) || MEDIA_ITEMS[0]
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [frameIdx, setFrameIdx] = useState<number>(0);
  const [slowPace, setSlowPace] = useState<boolean>(false);

  return (
    <div className="studio-container">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">
            📺 Safe Media & Activity Discovery Library (Allowlisted & Ad-Free)
          </h2>
          <p className="section-subtitle">
            Filtered by sensory comfort & special interest · No external links, no advertisements, no unpredictable autoplay
          </p>
        </div>
        <span className="clinical-tag">Zero Autoplay Trap</span>
      </div>

      {/* Large Predictable Media Player */}
      <div className="safe-media-player-card">
        <div className="media-screen-stage">
          <div className="media-sensory-pill">{selectedMedia.sensoryTag}</div>
          <div className={`media-visual-scene ${isPlaying && !profile.sensory.reduced_motion ? 'gentle-float-anim' : ''}`}>
            {selectedMedia.sceneFrames[frameIdx]}
          </div>
          <h3 className="media-stage-title">{selectedMedia.title}</h3>
          <p className="media-stage-caption">{selectedMedia.narration}</p>
        </div>

        {/* Oversized Accessible Transport Controls */}
        <div className="media-huge-controls">
          <button
            type="button"
            onClick={() => {
              setIsPlaying(true);
              speakCompanionText(selectedMedia.narration, profile.sensory);
            }}
            className={`media-ctrl-btn play ${isPlaying ? 'active' : ''}`}
          >
            ▶️ PLAY
          </button>

          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              stopAllAudioAndSpeech();
            }}
            className={`media-ctrl-btn pause ${!isPlaying ? 'active' : ''}`}
          >
            ⏸️ PAUSE
          </button>

          <button
            type="button"
            onClick={() => {
              setFrameIdx((i) => (i + 1) % selectedMedia.sceneFrames.length);
              playGentleSuccessChime(profile.sensory);
              speakCompanionText(selectedMedia.narration, profile.sensory);
            }}
            className="media-ctrl-btn replay"
          >
            🔄 REPLAY / NEXT SCENE
          </button>

          <button
            type="button"
            onClick={() => setSlowPace((s) => !s)}
            className={`media-ctrl-btn slow ${slowPace ? 'active' : ''}`}
          >
            🐢 {slowPace ? 'HALF SPEED: ON' : 'SLOW PACE'}
          </button>

          <button
            type="button"
            onClick={() => {
              stopAllAudioAndSpeech();
              onStopMedia();
            }}
            className="media-ctrl-btn stop"
          >
            🛑 STOP VIDEO
          </button>
        </div>
      </div>

      {/* Approved Catalogue Grid */}
      <div className="media-catalog-grid">
        {MEDIA_ITEMS.map((item) => {
          const active = item.id === selectedMedia.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedMedia(item);
                setFrameIdx(0);
                setIsPlaying(true);
                speakCompanionText(item.title, profile.sensory);
              }}
              className={`media-catalog-item ${active ? 'selected' : ''}`}
            >
              <span className="media-item-emoji">{item.emoji}</span>
              <div className="media-item-info">
                <div className="media-item-title">{item.title}</div>
                <div className="media-item-meta">
                  {SPECIAL_INTERESTS[item.interest].label} · {item.durationLabel}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
