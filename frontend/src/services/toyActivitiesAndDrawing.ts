import { playPentatonicNote } from './soundAndSpeech';
import { SensoryProfile } from '../types';

export interface AutoDrawStrokePoint {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
  is3D: boolean;
}

export interface ToyDrawingSubject {
  id: string;
  title: string;
  emoji: string;
  spokenIntro: string;
  spokenComplete: string;
  strokes: AutoDrawStrokePoint[][];
}

export interface ToySongItem {
  id: string;
  title: string;
  emoji: string;
  lines: string[];
  notesHz: number[];
}

export const FAVOURITE_TOY_SONGS: ToySongItem[] = [
  {
    id: 'twinkle_star',
    title: 'Twinkle Twinkle Little Star',
    emoji: '🌟',
    lines: [
      'Twinkle, twinkle, little star, 🌟',
      'How I wonder what you are! ✨',
      'Up above the world so high, 🌙',
      'Like a diamond in the sky! 💎',
    ],
    // C C G G A A G | F F E E D D C
    notesHz: [
      261.63, 261.63, 392.0, 392.0, 440.0, 440.0, 392.0, 349.23, 349.23, 329.63, 329.63, 293.66,
      293.66, 261.63,
    ],
  },
  {
    id: 'happy_know_it',
    title: "If You're Happy and You Know It",
    emoji: '👏',
    lines: [
      "If you're happy and you know it, wave your hands! 👋",
      "If you're happy and you know it, nod your head! 😊",
      "If you're happy and you know it, then your smile will surely show it! ✨",
      "If you're happy and you know it, dance with me! 💃",
    ],
    notesHz: [
      261.63, 329.63, 392.0, 392.0, 392.0, 440.0, 392.0, 349.23, 329.63, 293.66, 349.23, 440.0,
      392.0, 523.25,
    ],
  },
  {
    id: 'row_boat',
    title: 'Row, Row, Row Your Boat',
    emoji: '⛵',
    lines: [
      'Row, row, row your boat, ⛵',
      'Gently down the stream, 🌊',
      'Merrily, merrily, merrily, merrily, 🎶',
      'Life is but a dream! 🌈',
    ],
    notesHz: [
      261.63, 261.63, 261.63, 293.66, 329.63, 329.63, 293.66, 329.63, 349.23, 392.0, 523.25,
      392.0, 329.63, 261.63,
    ],
  },
];

export function playMelodySequence(
  notesHz: number[],
  sensory: SensoryProfile,
  onFinished?: () => void
): () => void {
  let idx = 0;
  const timer = window.setInterval(() => {
    if (idx >= notesHz.length) {
      window.clearInterval(timer);
      if (onFinished) onFinished();
      return;
    }
    playPentatonicNote(notesHz[idx], sensory, 'kalimba', 0.45);
    idx++;
  }, 380);

  return () => window.clearInterval(timer);
}

/**
 * Generates smooth parametric strokes for a requested drawing subject
 * so the 3D toy can draw it stroke-by-stroke on the central canvas for the child!
 */
export function buildToyAutoDrawing(
  utteranceOrTopic: string,
  canvasWidth: number,
  canvasHeight: number
): ToyDrawingSubject {
  const lower = utteranceOrTopic.toLowerCase();
  const cx = canvasWidth * 0.26; // Draw on the left-center side of the canvas beside the 3D toy!
  const cy = canvasHeight * 0.54;
  const scale = Math.min(canvasWidth, canvasHeight) * 0.22;

  const makeCircle = (
    ox: number,
    oy: number,
    rx: number,
    ry: number,
    color: string,
    size = 10,
    steps = 32,
    startAngle = 0,
    endAngle = Math.PI * 2
  ): AutoDrawStrokePoint[] => {
    const pts: AutoDrawStrokePoint[] = [];
    for (let i = 0; i <= steps; i++) {
      const a = startAngle + ((endAngle - startAngle) * i) / steps;
      pts.push({
        x: ox + Math.cos(a) * rx,
        y: oy + Math.sin(a) * ry,
        z: 0,
        color,
        size,
        is3D: true,
      });
    }
    return pts;
  };

  const makeLine = (
    ptsRaw: [number, number][],
    color: string,
    size = 10,
    subdiv = 10
  ): AutoDrawStrokePoint[] => {
    const pts: AutoDrawStrokePoint[] = [];
    for (let i = 0; i < ptsRaw.length - 1; i++) {
      const [x0, y0] = ptsRaw[i];
      const [x1, y1] = ptsRaw[i + 1];
      for (let s = 0; s <= subdiv; s++) {
        const t = s / subdiv;
        pts.push({
          x: x0 + (x1 - x0) * t,
          y: y0 + (y1 - y0) * t,
          z: 0,
          color,
          size,
          is3D: true,
        });
      }
    }
    return pts;
  };

  // 1. CAT / KITTY
  if (lower.includes('cat') || lower.includes('kitty') || lower.includes('kitten')) {
    const r = scale * 0.65;
    const strokes: AutoDrawStrokePoint[][] = [
      // Head circle
      makeCircle(cx, cy, r, r * 0.9, '#fb7185', 11),
      // Left ear
      makeLine(
        [
          [cx - r * 0.75, cy - r * 0.45],
          [cx - r * 0.92, cy - r * 1.35],
          [cx - r * 0.2, cy - r * 0.82],
        ],
        '#fb7185',
        11
      ),
      // Right ear
      makeLine(
        [
          [cx + r * 0.2, cy - r * 0.82],
          [cx + r * 0.92, cy - r * 1.35],
          [cx + r * 0.75, cy - r * 0.45],
        ],
        '#fb7185',
        11
      ),
      // Eyes
      makeCircle(cx - r * 0.35, cy - r * 0.15, r * 0.12, r * 0.15, '#38bdf8', 9, 16),
      makeCircle(cx + r * 0.35, cy - r * 0.15, r * 0.12, r * 0.15, '#38bdf8', 9, 16),
      // Pink nose & smile
      makeCircle(cx, cy + r * 0.1, r * 0.1, r * 0.08, '#f43f5e', 9, 14),
      makeCircle(cx - r * 0.14, cy + r * 0.2, r * 0.14, r * 0.14, '#fef08a', 8, 16, 0, Math.PI),
      makeCircle(cx + r * 0.14, cy + r * 0.2, r * 0.14, r * 0.14, '#fef08a', 8, 16, 0, Math.PI),
      // Whiskers
      makeLine(
        [
          [cx - r * 0.5, cy + r * 0.08],
          [cx - r * 1.15, cy - r * 0.05],
        ],
        '#fde047',
        7
      ),
      makeLine(
        [
          [cx - r * 0.5, cy + r * 0.22],
          [cx - r * 1.15, cy + r * 0.28],
        ],
        '#fde047',
        7
      ),
      makeLine(
        [
          [cx + r * 0.5, cy + r * 0.08],
          [cx + r * 1.15, cy - r * 0.05],
        ],
        '#fde047',
        7
      ),
      makeLine(
        [
          [cx + r * 0.5, cy + r * 0.22],
          [cx + r * 1.15, cy + r * 0.28],
        ],
        '#fde047',
        7
      ),
    ];
    return {
      id: 'cat',
      title: 'Cute Kitty Cat',
      emoji: '🐱',
      spokenIntro:
        'Ooh yay, I love kitties! Watch me draw a super cute pink Kitty Cat with little whiskers just for you, bestie! Meow, hehe!',
      spokenComplete:
        'Ta-da! Hehe, look at our cute little Kitty Cat! She is smiling right at you! Wanna colour together?',
      strokes,
    };
  }

  // 2. CAR / TRUCK / VEHICLE
  if (lower.includes('car') || lower.includes('truck') || lower.includes('bus')) {
    const r = scale * 0.85;
    const strokes: AutoDrawStrokePoint[][] = [
      // Car body
      makeLine(
        [
          [cx - r, cy + r * 0.25],
          [cx - r, cy - r * 0.15],
          [cx - r * 0.55, cy - r * 0.2],
          [cx - r * 0.3, cy - r * 0.65],
          [cx + r * 0.35, cy - r * 0.65],
          [cx + r * 0.65, cy - r * 0.2],
          [cx + r, cy - r * 0.12],
          [cx + r, cy + r * 0.25],
          [cx - r, cy + r * 0.25],
        ],
        '#ef4444',
        12
      ),
      // Window
      makeLine(
        [
          [cx - r * 0.42, cy - r * 0.2],
          [cx - r * 0.22, cy - r * 0.52],
          [cx + r * 0.28, cy - r * 0.52],
          [cx + r * 0.48, cy - r * 0.2],
          [cx - r * 0.42, cy - r * 0.2],
        ],
        '#38bdf8',
        9
      ),
      // Left & Right Wheels
      makeCircle(cx - r * 0.55, cy + r * 0.3, r * 0.26, r * 0.26, '#facc15', 11, 24),
      makeCircle(cx + r * 0.55, cy + r * 0.3, r * 0.26, r * 0.26, '#facc15', 11, 24),
    ];
    return {
      id: 'car',
      title: 'Speedy Toy Car',
      emoji: '🏎️',
      spokenIntro:
        'Zoom-zoom, teehee! Watch me draw a super speedy red Toy Car with yellow wheels for you, bestie!',
      spokenComplete:
        'Beep-beep, yay! Our cute little Toy Car is ready to zoom around!',
      strokes,
    };
  }

  // 3. HOUSE / HOME
  if (lower.includes('house') || lower.includes('home') || lower.includes('castle')) {
    const r = scale * 0.75;
    const strokes: AutoDrawStrokePoint[][] = [
      // Walls
      makeLine(
        [
          [cx - r * 0.7, cy - r * 0.1],
          [cx - r * 0.7, cy + r * 0.85],
          [cx + r * 0.7, cy + r * 0.85],
          [cx + r * 0.7, cy - r * 0.1],
        ],
        '#38bdf8',
        11
      ),
      // Roof
      makeLine(
        [
          [cx - r * 0.9, cy - r * 0.1],
          [cx, cy - r * 0.95],
          [cx + r * 0.9, cy - r * 0.1],
          [cx - r * 0.9, cy - r * 0.1],
        ],
        '#f43f5e',
        12
      ),
      // Door
      makeLine(
        [
          [cx - r * 0.18, cy + r * 0.85],
          [cx - r * 0.18, cy + r * 0.25],
          [cx + r * 0.18, cy + r * 0.25],
          [cx + r * 0.18, cy + r * 0.85],
        ],
        '#facc15',
        10
      ),
      // Window
      makeCircle(cx, cy - r * 0.42, r * 0.18, r * 0.18, '#fde047', 9, 20),
    ];
    return {
      id: 'house',
      title: 'Cozy Play House',
      emoji: '🏠',
      spokenIntro:
        'Ooh, let me draw a super cozy little Play House for you and me, bestie! Hehe!',
      spokenComplete:
        'Ta-da! Look at our cute little House! We can play inside together!',
      strokes,
    };
  }

  // 4. FLOWER
  if (lower.includes('flower') || lower.includes('rose') || lower.includes('tree')) {
    const r = scale * 0.65;
    const strokes: AutoDrawStrokePoint[][] = [
      // Green stem & leaf
      makeLine(
        [
          [cx, cy + r * 0.2],
          [cx, cy + r * 1.35],
        ],
        '#10b981',
        12
      ),
      makeLine(
        [
          [cx, cy + r * 0.85],
          [cx + r * 0.45, cy + r * 0.6],
          [cx, cy + r * 0.95],
        ],
        '#10b981',
        10
      ),
    ];
    // 6 Petals around center
    const petalColors = ['#ec4899', '#f43f5e', '#a855f7', '#fb7185', '#e879f9', '#f472b6'];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI * 2 * i) / 6;
      strokes.push(
        makeCircle(
          cx + Math.cos(a) * r * 0.46,
          cy - r * 0.1 + Math.sin(a) * r * 0.46,
          r * 0.28,
          r * 0.28,
          petalColors[i],
          10,
          20
        )
      );
    }
    // Golden center
    strokes.push(makeCircle(cx, cy - r * 0.1, r * 0.25, r * 0.25, '#facc15', 12, 20));

    return {
      id: 'flower',
      title: 'Magic Blooming Flower',
      emoji: '🌸',
      spokenIntro:
        'Ooh, I love pretty flowers! Watch me paint a pink magic Flower just for you, bestie!',
      spokenComplete:
        'Hehe, sniff-sniff! Our pretty Flower smells so sweet! Do you like it?',
      strokes,
    };
  }

  // 5. HEART
  if (lower.includes('heart') || lower.includes('love')) {
    const r = scale * 0.72;
    const heartPts: AutoDrawStrokePoint[] = [];
    for (let i = 0; i <= 48; i++) {
      const t = (Math.PI * 2 * i) / 48;
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      heartPts.push({
        x: cx + (hx / 16) * r,
        y: cy + (hy / 16) * r,
        z: 0,
        color: '#f43f5e',
        size: 13,
        is3D: true,
      });
    }
    const innerHeartPts = heartPts.map((p) => ({
      ...p,
      x: cx + (p.x - cx) * 0.65,
      y: cy + (p.y - cy) * 0.65,
      color: '#fb7185',
      size: 10,
    }));
    return {
      id: 'heart',
      title: 'Bestie Friendship Heart',
      emoji: '💖',
      spokenIntro:
        'Aww, you are my bestest friend ever! Watch me draw a giant pink Heart for you, teehee!',
      spokenComplete:
        'Mwah! Sending you a million squishy hugs inside our pink Heart!',
      strokes: [heartPts, innerHeartPts],
    };
  }

  // 6. RAINBOW
  if (lower.includes('rainbow') || lower.includes('sky') || lower.includes('cloud')) {
    const r = scale * 0.95;
    const rainbowCols = ['#ef4444', '#f97316', '#facc15', '#10b981', '#38bdf8', '#a855f7'];
    const strokes = rainbowCols.map((col, idx) =>
      makeCircle(
        cx,
        cy + r * 0.35,
        r * (1 - idx * 0.11),
        r * (1 - idx * 0.11),
        col,
        11,
        32,
        Math.PI,
        Math.PI * 2
      )
    );
    return {
      id: 'rainbow',
      title: 'Six-Colour Magic Rainbow',
      emoji: '🌈',
      spokenIntro:
        'Ooh, rainbows are so magical! Watch me paint a shiny Rainbow for us, bestie!',
      spokenComplete:
        'Yippee! Look at all the pretty colours in our Rainbow! So shiny!',
      strokes,
    };
  }

  // 7. DEFAULT: SHINING SMILING STAR & SUN
  const r = scale * 0.78;
  const starPts: [number, number][] = [];
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI / 2 + (Math.PI * i) / 5;
    const rad = i % 2 === 0 ? r : r * 0.44;
    starPts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]);
  }
  const strokes: AutoDrawStrokePoint[][] = [
    makeLine(starPts, '#facc15', 13, 8),
    makeCircle(cx - r * 0.18, cy - r * 0.08, r * 0.07, r * 0.07, '#38bdf8', 9, 12),
    makeCircle(cx + r * 0.18, cy - r * 0.08, r * 0.07, r * 0.07, '#38bdf8', 9, 12),
    makeCircle(cx, cy + r * 0.06, r * 0.18, r * 0.14, '#f43f5e', 9, 18, 0.15, Math.PI - 0.15),
  ];

  return {
    id: 'star',
    title: 'Happy Smiling Star',
    emoji: '⭐',
    spokenIntro:
      'Twinkle, twinkle, hehe! Watch me draw a cute golden Smiling Star for you, bestie!',
    spokenComplete:
      'Yay! Look how happy our little Star is! Tell me what else you wanna draw together!',
    strokes,
  };
}
