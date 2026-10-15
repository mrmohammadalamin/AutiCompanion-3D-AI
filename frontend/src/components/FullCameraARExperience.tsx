import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  getToyVoiceSettings,
  playGentleSuccessChime,
  playPentatonicNote,
  SMALL_GIRL_VOICE_PRESETS,
  SmallGirlVoicePreset,
  speakAsAdultAppGuide,
  speakAsSweetChildGirlToy,
  ToyVoiceSettings,
  updateToyVoiceSettings,
} from '../services/soundAndSpeech';
import {
  AnimatedToyRig,
  build3DCartoonStageWorld,
  build3DInteractiveBubbleOrb,
  build3DSoccerBallAndGoal,
  build3DThoughtCloudSprite,
  buildSmooth3DToyRig,
  CARTOON_STAGE_ENVIRONMENTS,
  CartoonEnvironmentCategory,
  CartoonEnvironmentId,
  extractDominantColorsFromImage,
  playToyMotionClip,
  PREBUILT_3D_TOY_CATALOG,
  ToyArchetypeId,
  ToyCatalogItem,
  ToyMotionClipType,
  update3DThoughtCloudSprite,
} from '../services/threeToyBuilder';
import {
  AutoDrawStrokePoint,
  buildToyAutoDrawing,
  FAVOURITE_TOY_SONGS,
  playMelodySequence,
  ToySongItem,
} from '../services/toyActivitiesAndDrawing';
import {
  DEVELOPMENTAL_DOMAINS,
  DevelopmentalDomainId,
  INTELLIGENT_20_GAMES_CATALOG,
  IntelligentEducationalGame,
} from '../services/intelligentGamesCatalog';
import { SensoryProfile } from '../types';

export type FacialExpressionType =
  | 'smiling_happy'
  | 'crying_distressed'
  | 'surprised_curious'
  | 'frowning_frustrated'
  | 'neutral_attentive';

export type CanvasActivityMode =
  | 'ar_intelligent_20_games'
  | 'ar_cartoon_math_match'
  | 'ar_physical_and_math_game'
  | 'ar_3d_2d_art_studio'
  | 'ar_video_3d_animation'
  | 'ar_interactive_fun_bubbles'
  | 'ar_comfort_soothing_buddy';

export type InteractionPreferenceMode =
  | 'hands_free_camera_voice'
  | 'touch_and_voice_coplay'
  | 'calm_quiet_sensory';

export type MathOperationType = '+' | '-' | '×' | '÷' | 'count';
export type MathRangeType = '1-5' | '1-10' | '1-20' | '1-100';

export type ToyProposalType =
  | 'offer_skill_game'
  | 'offer_football_game'
  | 'offer_singing'
  | 'offer_math_game'
  | 'offer_physical_game'
  | 'offer_dance_together'
  | 'offer_draw_for_child'
  | 'offer_change_preference';

interface ToyProposalOffer {
  type: ToyProposalType;
  title: string;
  emoji: string;
  questionText: string;
  drawSubject?: string;
}

interface CustomUploaded3DToy {
  id: string;
  name: string;
  archetype: ToyArchetypeId;
  primaryColor: string;
  secondaryColor: string;
  texture: THREE.Texture | null;
  voicePitch: number;
  greeting: string;
}

interface FloatingBubble {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  wx: number;
  wy: number;
  wz: number;
  wvx: number;
  wvy: number;
  radius: number;
  emoji: string;
  label: string;
  color: string;
  value?: number;
  isCorrectSkillChoice?: boolean;
  mesh3D?: THREE.Group;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

const DEFAULT_SENSORY: SensoryProfile = {
  quiet_mode: false,
  reduced_motion: false,
  sensory_theme: 'calm_sage',
  choice_density: 4,
  speech_rate: 0.96,
  tts_enabled: true,
  errorless_learning: true,
  transition_warning_seconds: 30,
  max_volume_db: 72,
  camera_opt_in: true,
  mic_opt_in: true,
};

const PROACTIVE_TOY_PROPOSALS: ToyProposalOffer[] = [
  {
    type: 'offer_skill_game',
    title: 'Play 20 Social, Emotion & Life-Skill 3D Games',
    emoji: '🎓💖',
    questionText:
      'Wanna play our 20 Social, Feeling, and Life-Skill 3D games together? I will run and jump to catch the 3D bubbles with you!',
  },
  {
    type: 'offer_football_game',
    title: 'Play 3D Football & Kick Into the Goal',
    emoji: '⚽🥅',
    questionText:
      'Wanna play 3D Football together? Watch me run across the field and kick the soccer ball into the goal!',
  },
  {
    type: 'offer_math_game',
    title: 'Jump & Catch 3D Number Bubbles Together',
    emoji: '🫧🐾',
    questionText:
      'Wanna jump and catch the 3D number bubbles together? I will run and leap up to pop them with you!',
  },
  {
    type: 'offer_physical_game',
    title: 'Run, Jump & Kick 3D Sports Game',
    emoji: '🏃‍♂️⚽',
    questionText:
      'Wanna play our 3D Run, Jump, and Football counting game together on the camera?',
  },
  {
    type: 'offer_draw_for_child',
    title: 'Draw a Cute Kitty or Rainbow Together',
    emoji: '🎨🐱',
    questionText:
      'Wanna watch me draw a cute pink Kitty Cat or a shiny Rainbow for you?',
    drawSubject: 'cat',
  },
  {
    type: 'offer_singing',
    title: 'Sing Twinkle Star Together',
    emoji: '🎵🌟',
    questionText:
      "Wanna sing 'Twinkle Twinkle Little Star' together with me?",
  },
  {
    type: 'offer_dance_together',
    title: 'Wiggle & Dance Together',
    emoji: '💃✨',
    questionText:
      'Wanna do a happy 3D movie dance with me right now?',
  },
];

export const FullCameraARExperience: React.FC = () => {
  // DOM Refs
  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const webglMountRef = useRef<HTMLDivElement | null>(null);
  const overlay2DCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const trackingOverlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const motionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const toyFileInputRef = useRef<HTMLInputElement | null>(null);
  const videoFileInputRef = useRef<HTMLInputElement | null>(null);
  const prevFrameDataRef = useRef<Uint8ClampedArray | null>(null);

  // Three.js Scene, Camera, 3D Cartoon Stage World, 3D Bubbles, 3D Football & Active 3D Toy Rig Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const stageWorldRef = useRef<THREE.Group | null>(null);
  const toyRigRef = useRef<AnimatedToyRig | null>(null);
  const paint3DGroupRef = useRef<THREE.Group | null>(null);
  const bubbles3DGroupRef = useRef<THREE.Group | null>(null);
  const soccerBall3DRef = useRef<THREE.Group | null>(null);
  const soccerGoal3DRef = useRef<THREE.Group | null>(null);
  const thoughtCloud3DRef = useRef<THREE.Sprite | null>(null);

  // Real-World 3D Character Locomotion, Jump-Catch, Football & Human-Child Activity State Machine
  const toyLocomotionRef = useRef<{
    state:
      | 'idle'
      | 'run_to_catch_bubble'
      | 'jump_catching_bubble'
      | 'run_to_kick_football'
      | 'dribble_to_kick_football'
      | 'kicking_football'
      | 'strolling'
      | 'skip_hopping'
      | 'tiptoe_sneaking'
      | 'airplane_zooming'
      | 'marching_parade'
      | 'cartwheeling';
    posX: number;
    posY: number;
    posZ: number;
    headingYaw: number;
    targetX: number;
    targetY: number;
    targetZ: number;
    targetBubbleId: number | null;
    actionStartMs: number;
    stridePhase: number;
    hasTriggeredImpact: boolean;
  }>({
    state: 'idle',
    posX: 0,
    posY: 0,
    posZ: 0,
    headingYaw: 0,
    targetX: 0,
    targetY: 0,
    targetZ: 0,
    targetBubbleId: null,
    actionStartMs: 0,
    stridePhase: 0,
    hasTriggeredImpact: false,
  });

  // Real-World 3D Soccer / Football Projectile, Gravity, Bounce & Goal Physics
  const soccerPhysicsRef = useRef<{
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    inFlight: boolean;
    scoredAtMs: number;
  }>({
    x: 0.72,
    y: -0.68,
    z: 0.36,
    vx: 0,
    vy: 0,
    vz: 0,
    inFlight: false,
    scoredAtMs: 0,
  });

  // Natural Cartoon Physics & Two-Sided 3D Co-Play Timing Refs
  const toyJumpRef = useRef<{ active: boolean; startMs: number; durationMs: number }>({
    active: false,
    startMs: 0,
    durationMs: 950,
  });
  const toySpinRef = useRef<{ active: boolean; startMs: number; durationMs: number }>({
    active: false,
    startMs: 0,
    durationMs: 1100,
  });
  const toyHandPlayRef = useRef<{
    active: boolean;
    handX: number;
    handY: number;
    targetX: number;
    targetY: number;
    targetBubbleId: number | null;
    lastPopMs: number;
  }>({
    active: false,
    handX: 400,
    handY: 320,
    targetX: 400,
    targetY: 320,
    targetBubbleId: null,
    lastPopMs: 0,
  });
  const lastSpeechEndTimeRef = useRef<number>(0);
  const speechRecRef = useRef<any>(null);
  const interimSpeechTimerRef = useRef<number | null>(null);

  // Real-Time Webcam Child Movement & Expression Tracking Refs (Normalized -1..+1)
  const childTrackRef = useRef<{
    x: number;
    y: number;
    smoothX: number;
    smoothY: number;
    motionLevel: number;
    gestureLabel: string;
    waveAccumulator: number;
    nodJumpAccumulator: number;
    lastGestureTime: number;
    lastRepTime: number;
  }>({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    motionLevel: 0,
    gestureLabel: '👀 Toy Tracking Your Face & Movement',
    waveAccumulator: 0,
    nodJumpAccumulator: 0,
    lastGestureTime: 0,
    lastRepTime: 0,
  });


  // Child Profile Configuration State (So Toy Addresses Child by Name & Matches Their Level!)
  const [childName, setChildName] = useState<string>('Mia');
  const [childAge, setChildAge] = useState<number>(5);
  const [childInterest, setChildInterest] = useState<string>('🐱 Cute Animals');

  // Changeable Cartoon Artwork Stage Environment State (30 Total 3D Worlds across 4 Categories)
  const [stageEnv, setStageEnv] = useState<CartoonEnvironmentId>('rainbow_meadow');
  const [stageCategoryFilter, setStageCategoryFilter] = useState<'all' | CartoonEnvironmentCategory>('all');

  // Hideable / Expandable Top Bar, Left Sidebar & Right Sidebar State (For Full-View Central 3D Canvas!)
  const [topBarExpanded, setTopBarExpanded] = useState<boolean>(true);
  const [leftSidebarExpanded, setLeftSidebarExpanded] = useState<boolean>(true);
  const [rightSidebarExpanded, setRightSidebarExpanded] = useState<boolean>(true);
  const [actionCategoryTab, setActionCategoryTab] = useState<
    'all' | 'sports_move' | 'play_fun' | 'emotion_calm'
  >('all');

  // Sweet Small Girl Voice Settings State (Ana Neural / Maisie Neural + Sweetness Pitch & Speed)
  const [voiceSettings, setVoiceSettings] = useState<ToyVoiceSettings>(() =>
    getToyVoiceSettings()
  );
  const handleUpdateVoiceSettings = (partial: Partial<ToyVoiceSettings>) => {
    const updated = updateToyVoiceSettings(partial);
    setVoiceSettings(updated);
    return updated;
  };

  // Right-Sidebar Webcam Visibility, Drag-Move & Drag-Resize State (Simple & Uncluttered)
  const [webcamVisible, setWebcamVisible] = useState<boolean>(true);
  const [webcamHeightPx, setWebcamHeightPx] = useState<number>(170);
  const [webcamDragOffset, setWebcamDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const isResizingWebcamRef = useRef<boolean>(false);
  const isDraggingWebcamRef = useRef<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [micListening, setMicListening] = useState<boolean>(false);
  const [alwaysListenEnabled, setAlwaysListenEnabled] = useState<boolean>(true);

  // Natural Turn-Taking State (Toy Speaks Short Turn, Then Waits for Child's Response!)
  const [waitingForChildReply, setWaitingForChildReply] = useState<boolean>(true);

  // Child Expression, Interaction Preference & Live Correspondence State
  const [facialExpression, setFacialExpression] = useState<FacialExpressionType>('smiling_happy');
  const [interactionPref, setInteractionPref] = useState<InteractionPreferenceMode>(
    'hands_free_camera_voice'
  );
  const [_inferredChildMode, setInferredChildMode] = useState<string>(
    'Natural Turn-Taking & Co-Play'
  );
  const [childSpeechInput, setChildSpeechInput] = useState<string>('');
  const [lastHeardText, setLastHeardText] = useState<string>('Waiting for your voice or wave...');
  const [_trackingStatusText, setTrackingStatusText] = useState<string>(
    '👀 Toy looking at you & ready to play'
  );

  // Proactive Toy Proposal & Singing / Auto-Drawing State
  const [proposalIndex, setProposalIndex] = useState<number>(0);
  const [activeProposal, setActiveProposal] = useState<ToyProposalOffer>(
    PROACTIVE_TOY_PROPOSALS[0]
  );
  const [activeSong, setActiveSong] = useState<ToySongItem | null>(null);
  const [activeSongLineIdx, setActiveSongLineIdx] = useState<number>(0);
  const stopSongMelodyRef = useRef<(() => void) | null>(null);
  const [toyDrawingTitle, setToyDrawingTitle] = useState<string | null>(null);
  const autoDrawTimerRef = useRef<number | null>(null);

  // Active Toy Category Filter & Selected Pre-Built or Uploaded 3D Toy
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'soft_toy' | 'bird_toy' | 'car_vehicle' | 'robot_toy'
  >('all');
  const [activeToyItem, setActiveToyItem] = useState<ToyCatalogItem>(PREBUILT_3D_TOY_CATALOG[0]);
  const [customUploadedToys, setCustomUploadedToys] = useState<CustomUploaded3DToy[]>([]);
  const [activeCustomToy, setActiveCustomToy] = useState<CustomUploaded3DToy | null>(null);

  // Upload Toy Form State
  const [newToyNameInput, setNewToyNameInput] = useState<string>('My Favourite Toy');
  const [uploadArchetype, setUploadArchetype] = useState<ToyArchetypeId>('teddy_plush');

  // 3D Skeletal Motion Clip, Autonomous Child Brain & Activity State
  const [canvasMode, setCanvasMode] = useState<CanvasActivityMode>('ar_intelligent_20_games');
  const [activeMotionClip, setActiveMotionClip] = useState<ToyMotionClipType>('idle');
  const [activeClipLabel, setActiveClipLabel] = useState<string>('Natural Cartoon Idle & Gaze');
  const [autonomousBrainEnabled, setAutonomousBrainEnabled] = useState<boolean>(true);
  const [toyThoughtDecision, setToyThoughtDecision] = useState<{
    emoji: string;
    thought: string;
    decisionLabel: string;
  }>({
    emoji: '💭',
    thought: 'Watching Mia with a friendly smile...',
    decisionLabel: 'Natural Gaze & Ready to Play',
  });
  const autonomousDecisionIdxRef = useRef<number>(0);
  const lastAutonomousActionTimeRef = useRef<number>(0);
  const [toyIsTalking, setToyIsTalking] = useState<boolean>(false);
  const [_adultGuideStatus, setAdultGuideStatus] = useState<string>(
    '👧 Toy: Sweet Girl Voice (Turn-Taking) · 👩‍🏫 Settings: Adult Voice'
  );
  const [toySpeechBubble, setToySpeechBubble] = useState<string>(
    'Hi Mia! Which bubble shows a happy smiling face? Let’s pop it together with our hands!'
  );
  const [primaryColor, setPrimaryColor] = useState<string>('#d97706');
  const [brushSize] = useState<number>(12);
  const [modelScale] = useState<number>(1.08);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  // 20 Intelligent Personal, Social & Developmental Games State
  const [skillDomainFilter, setSkillDomainFilter] = useState<'all' | DevelopmentalDomainId>('all');
  const [activeEduGame, setActiveEduGame] = useState<IntelligentEducationalGame>(
    INTELLIGENT_20_GAMES_CATALOG[0]
  );
  const [activeEduRoundIdx, setActiveEduRoundIdx] = useState<number>(0);

  // Any-Kind-of-Number Math & Physical Co-Play Game State
  const [mathOp, setMathOp] = useState<MathOperationType>('+');
  const [mathRange, setMathRange] = useState<MathRangeType>('1-10');
  const [mathNumA, setMathNumA] = useState<number>(3);
  const [mathNumB, setMathNumB] = useState<number>(2);
  const [customMathInput, setCustomMathInput] = useState<string>('');
  const [mathScore, setMathScore] = useState<number>(0);
  const [childPopCount, setChildPopCount] = useState<number>(0);
  const [toyPopCount, setToyPopCount] = useState<number>(0);

  // Physical Movement & Counting Game State
  const [physicalActionType, setPhysicalActionType] = useState<'jump' | 'wave' | 'dance'>('jump');
  const [physicalRepTarget, _setPhysicalRepTarget] = useState<number>(5);
  const [physicalRepCount, setPhysicalRepCount] = useState<number>(0);

  // 2D Overlay Strokes, Bubbles & Sparkles
  const strokesRef = useRef<AutoDrawStrokePoint[][]>([]);
  const currentStrokeRef = useRef<AutoDrawStrokePoint[]>([]);
  const isDrawingRef = useRef<boolean>(false);
  const bubblesRef = useRef<FloatingBubble[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const motionReturnTimerRef = useRef<number | null>(null);

  const stateRef = useRef({
    childName,
    childAge,
    childInterest,
    stageEnv,
    waitingForChildReply,
    facialExpression,
    canvasMode,
    activeMotionClip,
    toyIsTalking,
    modelScale,
    primaryColor,
    interactionPref,
    activeProposal,
    activeSong,
    activeEduGame,
    activeEduRoundIdx,
    mathOp,
    mathRange,
    mathNumA,
    mathNumB,
    physicalActionType,
    physicalRepTarget,
    physicalRepCount,
  });
  useEffect(() => {
    stateRef.current = {
      childName,
      childAge,
      childInterest,
      stageEnv,
      waitingForChildReply,
      facialExpression,
      canvasMode,
      activeMotionClip,
      toyIsTalking,
      modelScale,
      primaryColor,
      interactionPref,
      activeProposal,
      activeSong,
      activeEduGame,
      activeEduRoundIdx,
      mathOp,
      mathRange,
      mathNumA,
      mathNumB,
      physicalActionType,
      physicalRepTarget,
      physicalRepCount,
    };
  }, [
    childName,
    childAge,
    childInterest,
    stageEnv,
    waitingForChildReply,
    facialExpression,
    canvasMode,
    activeMotionClip,
    toyIsTalking,
    modelScale,
    primaryColor,
    interactionPref,
    activeProposal,
    activeSong,
    activeEduGame,
    activeEduRoundIdx,
    mathOp,
    mathRange,
    mathNumA,
    mathNumB,
    physicalActionType,
    physicalRepTarget,
    physicalRepCount,
  ]);

  // 1. INITIALIZE LIVE WEBCAM IN RIGHT SIDEBAR
  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user', width: 480, height: 360 }, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
          setCameraActive(true);
        }
      })
      .catch(() => setCameraActive(false));
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [webcamVisible]);

  // Handle Drag-to-Resize and Drag-to-Move of Right-Sidebar Webcam Card
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (isResizingWebcamRef.current) {
        setWebcamHeightPx((prev) => Math.max(105, Math.min(340, prev + e.movementY)));
      } else if (isDraggingWebcamRef.current) {
        setWebcamDragOffset((prev) => ({
          x: Math.max(-680, Math.min(40, prev.x + e.movementX)),
          y: Math.max(-120, Math.min(420, prev.y + e.movementY)),
        }));
      }
    };
    const onPointerUp = () => {
      isResizingWebcamRef.current = false;
      isDraggingWebcamRef.current = false;
    };
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // Swap 3D Cartoon Stage Artwork World whenever stageEnv changes
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (stageWorldRef.current) {
      scene.remove(stageWorldRef.current);
    }
    const newWorld = build3DCartoonStageWorld(stageEnv);
    scene.add(newWorld);
    stageWorldRef.current = newWorld;
  }, [stageEnv]);

  // 2. INITIALIZE THREE.JS STUDIO WEBGL 3D ENGINE (3D STAGE + 3D BUBBLES + 3D FOOTBALL + REAL 3D CHARACTER LOCOMOTION)
  useEffect(() => {
    const mount = webglMountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      38,
      (mount.clientWidth || 800) / (mount.clientHeight || 550),
      0.1,
      100
    );
    camera.position.set(0, 0.22, 4.95);
    camera.lookAt(0, -0.08, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth || 800, mount.clientHeight || 550);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // Studio Image-Based Lighting (RoomEnvironment) for realistic soft velvet/plush & PBR reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;

    // Warm Storybook Lighting
    const hemiLight = new THREE.HemisphereLight('#fffbeb', '#fde68a', 1.35);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight('#fff7ed', 1.75);
    keyLight.position.set(3.2, 5.8, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight('#f472b6', 0.9);
    rimLight.position.set(-4.0, 2.5, -3.5);
    scene.add(rimLight);

    // Build 3D Cartoon Artwork Stage Environment (Rainbow Meadow, Candy Wonderland, Dino Park, etc.)
    const initialWorld = build3DCartoonStageWorld(stateRef.current.stageEnv);
    scene.add(initialWorld);
    stageWorldRef.current = initialWorld;

    const paintGroup = new THREE.Group();
    scene.add(paintGroup);
    paint3DGroupRef.current = paintGroup;

    // 3D Group for Interactive 3D Bubble Orbs (20 Skill Games, Math Co-Play, Bubble Party)
    const bubbles3DGroup = new THREE.Group();
    scene.add(bubbles3DGroup);
    bubbles3DGroupRef.current = bubbles3DGroup;

    // Attach any 3D bubble meshes that were spawned before WebGL mount
    bubblesRef.current.forEach((b) => {
      if (b.mesh3D && b.mesh3D.parent !== bubbles3DGroup) {
        bubbles3DGroup.add(b.mesh3D);
      }
    });

    // Build 3D Soccer Ball & 3D Goal Net on the 3D Playground Turf
    const { ballGroup, goalGroup } = build3DSoccerBallAndGoal();
    scene.add(goalGroup);
    scene.add(ballGroup);
    soccerBall3DRef.current = ballGroup;
    soccerGoal3DRef.current = goalGroup;

    // Build 3D Floating Thought Cloud Sprite Above the Toy's Head (Shows Autonomous Child Brain Thoughts!)
    const thoughtSprite = build3DThoughtCloudSprite('💭', 'Watching Mia...');
    thoughtSprite.position.set(0.45, 1.38, 0.25);
    scene.add(thoughtSprite);
    thoughtCloud3DRef.current = thoughtSprite;

    // Build initial Seamless Skinned 3D Soft Teddy Bear Rig
    const initialRig = buildSmooth3DToyRig(
      PREBUILT_3D_TOY_CATALOG[0].id,
      PREBUILT_3D_TOY_CATALOG[0].defaultColor,
      PREBUILT_3D_TOY_CATALOG[0].secondaryColor,
      null
    );
    scene.add(initialRig.root);
    toyRigRef.current = initialRig;

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || 800;
      const h = mount.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(mount);
    }

    // 60FPS WebGL Render Loop: Real-World 3D Character Locomotion, Jump-Catch Bubbles & 3D Football Physics
    let prevTimeMs = performance.now();
    let frameId: number;
    const projVec = new THREE.Vector3();

    const animate = (nowMs: number) => {
      const delta = Math.min((nowMs - prevTimeMs) * 0.001, 0.05);
      prevTimeMs = nowMs;
      const t = nowMs * 0.001;
      const st = stateRef.current;
      const rig = toyRigRef.current;
      const track = childTrackRef.current;
      const handPlay = toyHandPlayRef.current;
      const loco = toyLocomotionRef.current;
      const sp = soccerPhysicsRef.current;

      const c2d = overlay2DCanvasRef.current;
      const cw = c2d?.width || mount.clientWidth || 800;
      const ch = c2d?.height || mount.clientHeight || 550;

      // Critically damped smoothing of child's webcam position
      track.smoothX = THREE.MathUtils.lerp(track.smoothX, track.x, 0.08);
      track.smoothY = THREE.MathUtils.lerp(track.smoothY, track.y, 0.08);

      // Gentle floating animation for 3D Cartoon Stage World clouds/stars
      if (stageWorldRef.current) {
        stageWorldRef.current.position.y = Math.sin(t * 0.9) * 0.018;
      }

      // =======================================================================
      // A. UPDATE 3D INTERACTIVE BUBBLE ORBS IN THREE.JS SCENE & PROJECT TO 2D
      // =======================================================================
      const camCursorX = cw * (0.5 + track.smoothX * 0.42);
      const camCursorY = ch * (0.52 + track.smoothY * 0.38);

      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];
        b.wx += b.wvx * delta;
        b.wy += b.wvy * delta;
        b.wz = 0.34 + Math.sin(t * 1.5 + b.id * 0.7) * 0.14;

        if (b.wx < -1.95) {
          b.wx = -1.95;
          b.wvx = Math.abs(b.wvx);
        }
        if (b.wx > 1.85) {
          b.wx = 1.85;
          b.wvx = -Math.abs(b.wvx);
        }
        if (b.wy < -0.16) {
          b.wy = -0.16;
          b.wvy = Math.abs(b.wvy);
        }
        if (b.wy > 1.12) {
          b.wy = 1.12;
          b.wvy = -Math.abs(b.wvy);
        }

        if (b.mesh3D) {
          if (bubbles3DGroupRef.current && b.mesh3D.parent !== bubbles3DGroupRef.current) {
            bubbles3DGroupRef.current.add(b.mesh3D);
          }
          const bobY = Math.sin(t * 2.5 + b.id) * 0.035;
          b.mesh3D.position.set(b.wx, b.wy + bobY, b.wz);
          const orbPulse = 1.0 + Math.sin(t * 3.2 + b.id) * 0.045;
          b.mesh3D.scale.setScalar(orbPulse);
        }

        // Project 3D bubble world coordinates (wx, wy, wz) to 2D canvas coordinates (x, y) for pointer & webcam hit-testing
        projVec.set(b.wx, b.wy, b.wz).project(camera);
        b.x = (projVec.x * 0.5 + 0.5) * cw;
        b.y = (-projVec.y * 0.5 + 0.5) * ch;

        // Hands-Free Webcam Interaction: If child moves hand over the 3D bubble, pop/select it!
        if (
          st.interactionPref === 'hands_free_camera_voice' &&
          track.motionLevel > 3.8 &&
          Math.hypot(camCursorX - b.x, camCursorY - b.y) <= b.radius + 26
        ) {
          handleBubblePop(b, i, ch, 'child');
        }
      }

      // =======================================================================
      // B. UPDATE 3D SOCCER BALL / FOOTBALL PROJECTILE, BOUNCE & GOAL PHYSICS
      // =======================================================================
      const ballMesh = soccerBall3DRef.current;
      if (ballMesh) {
        if (sp.inFlight) {
          sp.x += sp.vx * delta;
          sp.y += sp.vy * delta;
          sp.z += sp.vz * delta;
          sp.vy -= 6.8 * delta; // Real-world gravity

          // Bounce off the 3D grass field (y = -0.68)
          if (sp.y <= -0.68) {
            sp.y = -0.68;
            if (Math.abs(sp.vy) > 0.42) {
              sp.vy = Math.abs(sp.vy) * 0.62;
            } else {
              sp.vy = 0;
            }
            sp.vx *= 0.92;
            sp.vz *= 0.92;
          }

          // Realistic 3D ball spin
          ballMesh.rotation.z -= sp.vx * delta * 3.5;
          ballMesh.rotation.x += sp.vz * delta * 3.5;

          // Check if 3D ball scored inside the 3D Goal Net at (x: 2.05, z: -0.35)
          if (
            sp.scoredAtMs === 0 &&
            sp.x >= 1.84 &&
            sp.x <= 2.48 &&
            Math.abs(sp.z - -0.35) < 0.68 &&
            sp.y < 0.38
          ) {
            sp.scoredAtMs = nowMs;
            sp.vx *= 0.22;
            sp.vz *= 0.22;
            projVec.set(sp.x, sp.y + 0.2, sp.z).project(camera);
            const gx = (projVec.x * 0.5 + 0.5) * cw;
            const gy = (-projVec.y * 0.5 + 0.5) * ch;
            spawnBurst(gx, gy, '#facc15', 28);
            playGentleSuccessChime(DEFAULT_SENSORY);
          }

          // Reset ball to midfield after goal celebration or if out of bounds
          if (
            (sp.scoredAtMs > 0 && nowMs - sp.scoredAtMs > 2100) ||
            Math.abs(sp.x) > 2.85 ||
            (Math.hypot(sp.vx, sp.vz) < 0.08 && sp.y <= -0.67)
          ) {
            sp.x = 0.55 + (Math.random() - 0.5) * 0.35;
            sp.y = -0.68;
            sp.z = 0.34 + (Math.random() - 0.5) * 0.16;
            sp.vx = 0;
            sp.vy = 0;
            sp.vz = 0;
            sp.inFlight = false;
            sp.scoredAtMs = 0;
          }
        }
        ballMesh.position.set(sp.x, sp.y, sp.z);
      }

      // =======================================================================
      // C. REAL-WORLD 3D CHARACTER LOCOMOTION, JUMP-CATCH, FOOTBALL & 23 HUMAN-CHILD ACTIONS
      // =======================================================================
      if (rig) {
        // 1. Advance Real Skeletal & Morph-Target AnimationMixer
        const mixerSpeed =
          loco.state === 'run_to_catch_bubble' ||
          loco.state === 'run_to_kick_football' ||
          loco.state === 'dribble_to_kick_football'
            ? 1.65
            : 1.0;
        rig.mixer.update(delta * mixerSpeed);

        // 2. Cooperative Two-Sided 3D Co-Play: Toy only runs & jumps to catch a bubble when triggered
        // by the child's turn (popping a bubble, speaking, waving) or during active webcam Bubble Party play!
        if (
          loco.state === 'idle' &&
          st.activeMotionClip === 'idle' &&
          bubblesRef.current.length > 0 &&
          st.canvasMode === 'ar_interactive_fun_bubbles' &&
          track.motionLevel > 5.2 &&
          !st.toyIsTalking &&
          nowMs - handPlay.lastPopMs > 9500
        ) {
          const chosenBubble =
            bubblesRef.current[Math.floor(Math.random() * bubblesRef.current.length)];
          if (chosenBubble) {
            loco.state = 'run_to_catch_bubble';
            loco.targetBubbleId = chosenBubble.id;
            loco.targetX = chosenBubble.wx;
            loco.targetY = chosenBubble.wy;
            loco.targetZ = chosenBubble.wz - 0.1;
            loco.actionStartMs = nowMs;
            loco.hasTriggeredImpact = false;
            handPlay.active = true;
            handPlay.targetBubbleId = chosenBubble.id;
            playToyMotionClip(rig, 'walk');
          }
        }


        // 3. Execute Active 3D Locomotion State Machine
        let isRunning3D = false;
        let isSkipping3D = false;
        let isTiptoe3D = false;
        let isJumpingCatch3D = false;
        let isKickingBall3D = false;
        let jumpCatchProgress = 0;
        let kickBallProgress = 0;
        let forwardLeanPitch = 0;

        if (loco.state === 'run_to_catch_bubble') {
          const tb = bubblesRef.current.find((b) => b.id === loco.targetBubbleId);
          if (!tb) {
            loco.state = 'idle';
            handPlay.active = false;
            handPlay.lastPopMs = nowMs;
            playToyMotionClip(rig, 'idle');
          } else {
            loco.targetX = tb.wx;
            loco.targetY = tb.wy;
            loco.targetZ = tb.wz - 0.08;
            const dx = loco.targetX - loco.posX;
            const dz = loco.targetZ - loco.posZ;
            const distXZ = Math.hypot(dx, dz);

            if (distXZ > 0.32) {
              isRunning3D = true;
              const step = Math.min(distXZ, 2.4 * delta);
              loco.posX += (dx / distXZ) * step;
              loco.posZ += (dz / distXZ) * step;
              loco.stridePhase += delta * 16.0;
              loco.posY = Math.abs(Math.sin(loco.stridePhase)) * 0.09;
              const desiredYaw = Math.atan2(dx, dz);
              loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, desiredYaw, 0.16);
              forwardLeanPitch = 0.16;
            } else {
              // Arrived beneath the 3D bubble -> Crouch & Leap Upward to Catch It in Mid-Air!
              loco.state = 'jump_catching_bubble';
              loco.actionStartMs = nowMs;
              loco.hasTriggeredImpact = false;
              playToyMotionClip(rig, 'jump_catch');
            }
          }
        } else if (loco.state === 'jump_catching_bubble') {
          isJumpingCatch3D = true;
          const jumpDur = 680;
          jumpCatchProgress = Math.min(1, (nowMs - loco.actionStartMs) / jumpDur);
          const targetIdx = bubblesRef.current.findIndex((b) => b.id === loco.targetBubbleId);
          const tb = targetIdx !== -1 ? bubblesRef.current[targetIdx] : null;

          if (tb) {
            loco.posX = THREE.MathUtils.lerp(loco.posX, tb.wx, 0.14);
            loco.posZ = THREE.MathUtils.lerp(loco.posZ, tb.wz - 0.06, 0.14);
          }

          const targetJumpApex = Math.max(0.42, Math.min(1.08, (tb ? tb.wy : 0.55) + 0.22));
          loco.posY = Math.sin(jumpCatchProgress * Math.PI) * targetJumpApex;
          loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, 0, 0.15);

          // At apex of the 3D jump, the toy's 3D hands physically catch & pop the 3D bubble!
          if (jumpCatchProgress >= 0.46 && !loco.hasTriggeredImpact) {
            loco.hasTriggeredImpact = true;
            handPlay.active = false;
            handPlay.lastPopMs = nowMs;
            if (tb && targetIdx !== -1) {
              handleBubblePop(tb, targetIdx, ch, 'toy');
            }
          }

          if (jumpCatchProgress >= 1) {
            loco.posY = 0;
            loco.state = 'idle';
            playToyMotionClip(rig, st.activeMotionClip === 'dance' ? 'dance' : 'idle');
          }
        } else if (
          loco.state === 'run_to_kick_football' ||
          loco.state === 'dribble_to_kick_football'
        ) {
          const isDribbling = loco.state === 'dribble_to_kick_football';
          const kickSpotX = isDribbling ? 0.85 : sp.x - 0.28;
          const kickSpotZ = isDribbling ? 0.22 : sp.z;
          const dx = kickSpotX - loco.posX;
          const dz = kickSpotZ - loco.posZ;
          const distXZ = Math.hypot(dx, dz);

          if (distXZ > 0.16) {
            isRunning3D = true;
            const step = Math.min(distXZ, (isDribbling ? 1.85 : 2.55) * delta);
            loco.posX += (dx / distXZ) * step;
            loco.posZ += (dz / distXZ) * step;
            loco.stridePhase += delta * (isDribbling ? 14.5 : 17.0);
            loco.posY = Math.abs(Math.sin(loco.stridePhase)) * 0.095;
            const desiredYaw = Math.atan2(dx, dz);
            loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, desiredYaw, 0.18);
            forwardLeanPitch = 0.18;

            // If dribbling, keep the 3D soccer ball rolling just ahead of the toy's feet!
            if (isDribbling && !sp.inFlight) {
              sp.x = loco.posX + Math.sin(loco.headingYaw) * 0.34;
              sp.z = loco.posZ + Math.cos(loco.headingYaw) * 0.34 + Math.sin(t * 9.0) * 0.05;
              sp.y = -0.68 + Math.abs(Math.sin(loco.stridePhase)) * 0.04;
              if (ballMesh) {
                ballMesh.rotation.z -= step * 4.5;
              }
            }
          } else {
            // Reached the 3D soccer ball -> Wind up leg & kick into the 3D Goal!
            loco.state = 'kicking_football';
            loco.actionStartMs = nowMs;
            loco.hasTriggeredImpact = false;
            loco.posY = 0;
            playToyMotionClip(rig, 'kick_football');
          }
        } else if (loco.state === 'kicking_football') {
          isKickingBall3D = true;
          const kickDur = 720;
          kickBallProgress = Math.min(1, (nowMs - loco.actionStartMs) / kickDur);
          const goalYaw = Math.atan2(2.05 - loco.posX, -0.35 - loco.posZ);
          loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, goalYaw, 0.22);

          if (kickBallProgress >= 0.36 && !loco.hasTriggeredImpact) {
            loco.hasTriggeredImpact = true;
            const flightTime = 0.56;
            sp.vx = (2.08 - sp.x) / flightTime;
            sp.vz = (-0.35 + (Math.random() - 0.5) * 0.24 - sp.z) / flightTime;
            sp.vy = 2.75 + Math.random() * 0.35;
            sp.inFlight = true;
            sp.scoredAtMs = 0;
            playPentatonicNote(587.33, DEFAULT_SENSORY, 'kalimba', 0.42);
          }

          if (kickBallProgress >= 1) {
            loco.state = 'idle';
            toyJumpRef.current = { active: true, startMs: nowMs, durationMs: 850 };
            playToyMotionClip(rig, 'cheer_hurrah');
          }
        } else if (
          loco.state === 'skip_hopping' ||
          st.activeMotionClip === 'skip_hop'
        ) {
          isSkipping3D = true;
          const dx = loco.targetX - loco.posX;
          const dz = loco.targetZ - loco.posZ;
          const distXZ = Math.hypot(dx, dz);
          if (distXZ < 0.24) {
            loco.targetX = (Math.random() - 0.5) * 2.4;
            loco.targetZ = (Math.random() - 0.5) * 0.6;
          } else {
            const step = Math.min(distXZ, 1.75 * delta);
            loco.posX += (dx / distXZ) * step;
            loco.posZ += (dz / distXZ) * step;
            loco.stridePhase += delta * 11.5;
            loco.posY = Math.abs(Math.sin(loco.stridePhase)) * 0.22;
            const desiredYaw = Math.atan2(dx, dz);
            loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, desiredYaw, 0.15);
          }
        } else if (
          loco.state === 'tiptoe_sneaking' ||
          st.activeMotionClip === 'tiptoe_sneak'
        ) {
          isTiptoe3D = true;
          const dx = loco.targetX - loco.posX;
          const dz = loco.targetZ - loco.posZ;
          const distXZ = Math.hypot(dx, dz);
          if (distXZ < 0.24) {
            loco.targetX = (Math.random() - 0.5) * 2.1;
            loco.targetZ = (Math.random() - 0.5) * 0.55;
          } else {
            const step = Math.min(distXZ, 0.95 * delta);
            loco.posX += (dx / distXZ) * step;
            loco.posZ += (dz / distXZ) * step;
            loco.stridePhase += delta * 9.0;
            loco.posY = -0.1 + Math.abs(Math.sin(loco.stridePhase)) * 0.06;
            const desiredYaw = Math.atan2(dx, dz);
            loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, desiredYaw, 0.14);
            forwardLeanPitch = 0.24;
          }
        } else if (
          loco.state === 'airplane_zooming' ||
          st.activeMotionClip === 'airplane_zoom'
        ) {
          // Child zooming around the 3D stage with arms spread wide like an airplane!
          const dx = loco.targetX - loco.posX;
          const dz = loco.targetZ - loco.posZ;
          const distXZ = Math.hypot(dx, dz);
          if (distXZ < 0.25) {
            loco.targetX = (Math.random() - 0.5) * 2.5;
            loco.targetZ = (Math.random() - 0.5) * 0.65;
          } else {
            const step = Math.min(distXZ, 2.25 * delta);
            loco.posX += (dx / distXZ) * step;
            loco.posZ += (dz / distXZ) * step;
            loco.stridePhase += delta * 14.5;
            loco.posY = 0.08 + Math.abs(Math.sin(loco.stridePhase)) * 0.08;
            const desiredYaw = Math.atan2(dx, dz);
            loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, desiredYaw, 0.16);
            forwardLeanPitch = 0.26;
          }
        } else if (
          loco.state === 'marching_parade' ||
          st.activeMotionClip === 'march_parade'
        ) {
          // Child marching across the 3D stage with high knees and crisp arm swings!
          const dx = loco.targetX - loco.posX;
          const dz = loco.targetZ - loco.posZ;
          const distXZ = Math.hypot(dx, dz);
          if (distXZ < 0.24) {
            loco.targetX = (Math.random() - 0.5) * 2.3;
            loco.targetZ = (Math.random() - 0.5) * 0.55;
          } else {
            const step = Math.min(distXZ, 1.45 * delta);
            loco.posX += (dx / distXZ) * step;
            loco.posZ += (dz / distXZ) * step;
            loco.stridePhase += delta * 9.5;
            loco.posY = Math.abs(Math.sin(loco.stridePhase)) * 0.12;
            const desiredYaw = Math.atan2(dx, dz);
            loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, desiredYaw, 0.15);
          }
        } else if (
          loco.state === 'cartwheeling' ||
          st.activeMotionClip === 'cartwheel_flip'
        ) {
          // Child performing a joyful sideways cartwheel flip across the 3D lawn!
          loco.posX = Math.sin(t * 2.6) * 0.85;
          loco.posZ = Math.cos(t * 2.6) * 0.18;
          loco.posY = Math.abs(Math.sin(t * 5.2)) * 0.42;
          loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, 0, 0.15);
        } else if (
          loco.state === 'strolling' ||
          st.activeMotionClip === 'walk' ||
          st.activeMotionClip === 'run'
        ) {
          isRunning3D = true;
          const dx = loco.targetX - loco.posX;
          const dz = loco.targetZ - loco.posZ;
          const distXZ = Math.hypot(dx, dz);
          if (distXZ < 0.22) {
            loco.targetX = (Math.random() - 0.5) * 2.5;
            loco.targetZ = (Math.random() - 0.5) * 0.65;
          } else {
            const spd = st.activeMotionClip === 'run' ? 2.35 : 1.75;
            const step = Math.min(distXZ, spd * delta);
            loco.posX += (dx / distXZ) * step;
            loco.posZ += (dz / distXZ) * step;
            loco.stridePhase += delta * (st.activeMotionClip === 'run' ? 16.0 : 12.5);
            loco.posY = Math.abs(Math.sin(loco.stridePhase)) * 0.085;
            const desiredYaw = Math.atan2(dx, dz);
            loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, desiredYaw, 0.15);
            forwardLeanPitch = 0.12;
          }
        } else {
          // Idle / Human-Child Stationary Actions: Smoothly jog back toward center stage if far out on the field
          const homeX =
            st.activeMotionClip === 'dance' || st.activeMotionClip === 'hula_wiggle'
              ? Math.sin(t * 2.8) * 0.24 + track.smoothX * 0.22
              : track.smoothX * 0.28;
          const homeZ = 0;
          const dx = homeX - loco.posX;
          const dz = homeZ - loco.posZ;
          const distHome = Math.hypot(dx, dz);

          if (
            distHome > 0.85 &&
            st.activeMotionClip !== 'sit_relax' &&
            st.activeMotionClip !== 'sleepy_nap'
          ) {
            isRunning3D = true;
            const step = Math.min(distHome, 1.8 * delta);
            loco.posX += (dx / distHome) * step;
            loco.posZ += (dz / distHome) * step;
            loco.stridePhase += delta * 13.0;
            loco.posY = Math.abs(Math.sin(loco.stridePhase)) * 0.07;
            loco.headingYaw = THREE.MathUtils.lerp(
              loco.headingYaw,
              Math.atan2(dx, dz),
              0.14
            );
          } else {
            loco.posX = THREE.MathUtils.lerp(loco.posX, homeX, 0.07);
            loco.posZ = THREE.MathUtils.lerp(loco.posZ, homeZ, 0.07);
            let targetY = Math.sin(t * 2.1) * 0.025;
            if (st.activeMotionClip === 'sit_relax') {
              targetY = -0.34; // Sitting comfortably on the 3D lawn!
            } else if (st.activeMotionClip === 'sleepy_nap') {
              targetY = -0.18 + Math.sin(t * 1.4) * 0.02; // Cozy sleepy crouch
            } else if (st.activeMotionClip === 'jumping_jacks') {
              targetY = Math.max(0, Math.sin(t * 9.5)) * 0.28;
            } else if (st.activeMotionClip === 'hop_one_foot') {
              targetY = Math.max(0, Math.sin(t * 8.5)) * 0.26;
            } else if (st.activeMotionClip === 'high_five') {
              targetY = Math.max(0, Math.sin(t * 6.5)) * 0.32;
            } else if (st.activeMotionClip === 'cheer_hurrah') {
              targetY = Math.abs(Math.sin(t * 7.5)) * 0.22;
            } else if (st.activeMotionClip === 'laugh_giggle') {
              targetY = Math.abs(Math.sin(t * 11.0)) * 0.085;
            } else if (st.activeMotionClip === 'dance') {
              targetY = Math.abs(Math.sin(t * 5.6)) * 0.09;
            } else if (st.activeMotionClip === 'clap_hands') {
              targetY = Math.abs(Math.sin(t * 6.5)) * 0.06;
            }
            loco.posY = THREE.MathUtils.lerp(loco.posY, targetY, 0.16);
            const lookYaw =
              track.smoothX * 0.52 +
              (st.activeMotionClip === 'dance' ? Math.sin(t * 2.8) * 0.28 : 0);
            loco.headingYaw = THREE.MathUtils.lerp(loco.headingYaw, lookYaw, 0.1);
          }
        }

        // 4. Additional Explicit Jump & Spin Arcs (when child says "jump" or "spin")
        let jumpOffsetY = 0;
        let squashStretchY = 1.0;
        let squashStretchXZ = 1.0;
        if (toyJumpRef.current.active) {
          const jp = (nowMs - toyJumpRef.current.startMs) / toyJumpRef.current.durationMs;
          if (jp >= 1) {
            toyJumpRef.current.active = false;
          } else {
            jumpOffsetY = Math.sin(jp * Math.PI) * 0.65;
            squashStretchY = 1.0 + Math.sin(jp * Math.PI * 2) * 0.12;
            squashStretchXZ = 1.0 / Math.sqrt(squashStretchY);
          }
        }

        let spinOffsetYaw = 0;
        if (toySpinRef.current.active) {
          const spProg = (nowMs - toySpinRef.current.startMs) / toySpinRef.current.durationMs;
          if (spProg >= 1) {
            toySpinRef.current.active = false;
          } else {
            spinOffsetYaw = spProg * Math.PI * 2;
          }
        }

        // Apply 3D Root Position, Scale & Heading Rotation
        const breatheRate =
          st.activeMotionClip === 'calm_breathe' || st.activeMotionClip === 'sleepy_nap'
            ? 1.5
            : 2.3;
        const breatheAmp =
          st.activeMotionClip === 'calm_breathe' || st.activeMotionClip === 'sleepy_nap'
            ? 0.055
            : 0.018;
        const breathe = 1.0 + Math.sin(t * breatheRate) * breatheAmp;
        const sc = st.modelScale;
        rig.root.scale.set(
          sc * breathe * squashStretchXZ,
          sc * (2.0 - breathe) * squashStretchY,
          sc * breathe * squashStretchXZ
        );

        rig.root.position.x = loco.posX;
        rig.root.position.y = loco.posY + jumpOffsetY;
        rig.root.position.z = loco.posZ;
        rig.root.rotation.y = loco.headingYaw + spinOffsetYaw;

        if (st.activeMotionClip === 'bow_ta_da') {
          forwardLeanPitch = Math.max(0, Math.sin(t * 2.8)) * 0.52;
        } else if (st.activeMotionClip === 'stretch_yawn') {
          forwardLeanPitch = -Math.max(0, Math.sin(t * 2.0)) * 0.22;
        } else if (st.activeMotionClip === 'superhero_pose') {
          forwardLeanPitch = -0.12;
        }
        rig.root.rotation.x = THREE.MathUtils.lerp(
          rig.root.rotation.x,
          forwardLeanPitch,
          0.15
        );

        let targetRollZ =
          isRunning3D || isSkipping3D
            ? Math.sin(loco.stridePhase) * 0.065
            : -track.smoothX * 0.045;
        if (st.activeMotionClip === 'cartwheel_flip') {
          targetRollZ = ((t * 4.2) % (Math.PI * 2));
        } else if (st.activeMotionClip === 'airplane_zoom') {
          targetRollZ = Math.sin(t * 3.8) * 0.34;
        } else if (st.activeMotionClip === 'hula_wiggle') {
          targetRollZ = Math.sin(t * 7.2) * 0.16;
        }
        rig.root.rotation.z =
          st.activeMotionClip === 'cartwheel_flip'
            ? targetRollZ
            : THREE.MathUtils.lerp(rig.root.rotation.z, targetRollZ, 0.14);

        // Update 3D Thought Cloud Sprite Position Above the Toy's Head!
        if (thoughtCloud3DRef.current) {
          thoughtCloud3DRef.current.position.set(
            rig.root.position.x + 0.48,
            rig.root.position.y + 1.42 + Math.sin(t * 2.6) * 0.04,
            rig.root.position.z + 0.24
          );
        }

        // 5. Real-World Biomechanical Limb Bone Kinematics for All 35 Human-Child Activities!
        const clip = st.activeMotionClip;
        if (isRunning3D) {
          const s = loco.stridePhase;
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.x = Math.sin(s) * 0.78;
            rig.leftLegBone.rotation.x = -Math.sin(s) * 0.78;
            rig.rightLegBone.rotation.z = 0;
            rig.leftLegBone.rotation.z = 0;
          }
          if (rig.rightShinBone && rig.leftShinBone) {
            rig.rightShinBone.rotation.x = Math.max(0, Math.sin(s - 0.7)) * 0.85;
            rig.leftShinBone.rotation.x = Math.max(0, -Math.sin(s - 0.7)) * 0.85;
          }
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = -Math.sin(s) * 0.65;
            rig.leftArmBone.rotation.x = Math.sin(s) * 0.65;
            rig.rightArmBone.rotation.z = -0.25;
            rig.leftArmBone.rotation.z = 0.25;
          }
        } else if (isSkipping3D) {
          const s = loco.stridePhase;
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.x = Math.sin(s) * 0.85;
            rig.leftLegBone.rotation.x = -Math.sin(s) * 0.85;
          }
          if (rig.rightShinBone && rig.leftShinBone) {
            rig.rightShinBone.rotation.x = 0.45 + Math.max(0, Math.sin(s)) * 0.65;
            rig.leftShinBone.rotation.x = 0.45 + Math.max(0, -Math.sin(s)) * 0.65;
          }
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = -0.85 - Math.abs(Math.sin(s)) * 0.65;
            rig.leftArmBone.rotation.z = 0.85 + Math.abs(Math.cos(s)) * 0.65;
          }
        } else if (isTiptoe3D) {
          const s = loco.stridePhase;
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.x = -0.35 + Math.sin(s) * 0.55;
            rig.leftLegBone.rotation.x = -0.35 - Math.sin(s) * 0.55;
          }
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = -0.85;
            rig.leftArmBone.rotation.x = -0.85;
            rig.rightArmBone.rotation.z = -0.5 + Math.sin(s) * 0.15;
            rig.leftArmBone.rotation.z = 0.5 - Math.sin(s) * 0.15;
          }
        } else if (isJumpingCatch3D) {
          // Both 3D arms reach high overhead to catch & pop the 3D bubble in mid-air!
          const reachAmt = Math.sin(jumpCatchProgress * Math.PI);
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -2.25 * reachAmt,
              0.35
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              2.25 * reachAmt,
              0.35
            );
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              -0.55 * reachAmt,
              0.35
            );
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.x,
              -0.55 * reachAmt,
              0.35
            );
          }
        } else if (isKickingBall3D) {
          // Wind up right leg and strike forward through the 3D soccer ball!
          const kickAngle =
            kickBallProgress < 0.35
              ? (kickBallProgress / 0.35) * 0.68
              : 0.68 - ((kickBallProgress - 0.35) / 0.65) * 1.65;
          if (rig.rightLegBone) {
            rig.rightLegBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightLegBone.rotation.x,
              kickAngle,
              0.45
            );
          }
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = -0.65;
            rig.leftArmBone.rotation.z = 0.75;
          }
        } else if (clip === 'cartwheel_flip') {
          // Arms and legs spread wide in a star during the 3D cartwheel!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -2.15, 0.3);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 2.15, 0.3);
            rig.rightArmBone.rotation.x = 0;
            rig.leftArmBone.rotation.x = 0;
          }
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.z = THREE.MathUtils.lerp(rig.rightLegBone.rotation.z, -0.58, 0.3);
            rig.leftLegBone.rotation.z = THREE.MathUtils.lerp(rig.leftLegBone.rotation.z, 0.58, 0.3);
          }
        } else if (clip === 'hop_one_foot') {
          // Flamingo one-foot hop: right leg tucked up, arms out for balance!
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.x = THREE.MathUtils.lerp(rig.rightLegBone.rotation.x, -1.18, 0.25);
            rig.leftLegBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftLegBone.rotation.x,
              Math.sin(t * 8.5) * 0.22,
              0.25
            );
          }
          if (rig.rightShinBone) {
            rig.rightShinBone.rotation.x = THREE.MathUtils.lerp(rig.rightShinBone.rotation.x, 1.15, 0.25);
          }
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = -1.35 + Math.sin(t * 6.5) * 0.22;
            rig.leftArmBone.rotation.z = 1.35 - Math.sin(t * 6.5) * 0.22;
          }
        } else if (clip === 'airplane_zoom') {
          // Wide airplane wings banking left and right while zooming!
          const bank = Math.sin(t * 3.8) * 0.35;
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -1.58 + bank,
              0.25
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              1.58 + bank,
              0.25
            );
            rig.rightArmBone.rotation.x = 0;
            rig.leftArmBone.rotation.x = 0;
          }
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.x = Math.sin(t * 14.0) * 0.55;
            rig.leftLegBone.rotation.x = -Math.sin(t * 14.0) * 0.55;
          }
        } else if (clip === 'march_parade') {
          // High-knee marching band parade!
          const m = Math.sin(t * 8.5);
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.x = m > 0 ? -m * 1.15 : m * 0.25;
            rig.leftLegBone.rotation.x = m < 0 ? m * 1.15 : -m * 0.25;
          }
          if (rig.rightShinBone && rig.leftShinBone) {
            rig.rightShinBone.rotation.x = m > 0 ? m * 0.95 : 0.1;
            rig.leftShinBone.rotation.x = m < 0 ? -m * 0.95 : 0.1;
          }
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = -m * 0.85;
            rig.leftArmBone.rotation.x = m * 0.85;
            rig.rightArmBone.rotation.z = -0.25;
            rig.leftArmBone.rotation.z = 0.25;
          }
        } else if (clip === 'hula_wiggle') {
          // Hands on hips + cheerful hula hip sway!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -0.78, 0.22);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.78, 0.22);
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -0.35, 0.22);
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(rig.leftArmBone.rotation.x, -0.35, 0.22);
          }
          if (rig.rightForearmBone && rig.leftForearmBone) {
            rig.rightForearmBone.rotation.z = -0.68;
            rig.leftForearmBone.rotation.z = 0.68;
          }
        } else if (clip === 'superhero_pose') {
          // Right fist raised high toward the sky, left hand on hip!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -2.42, 0.25);
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -0.25, 0.25);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.75, 0.25);
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(rig.leftArmBone.rotation.x, -0.3, 0.25);
          }
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.z = -0.22;
            rig.leftLegBone.rotation.z = 0.22;
          }
        } else if (clip === 'laugh_giggle') {
          // Both hands near mouth/belly while giggling and bouncing!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -1.18, 0.25);
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(rig.leftArmBone.rotation.x, -1.18, 0.25);
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -0.22 - Math.abs(Math.sin(t * 12.0)) * 0.15,
              0.25
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              0.22 + Math.abs(Math.sin(t * 12.0)) * 0.15,
              0.25
            );
          }
        } else if (clip === 'blow_kiss') {
          // Right hand touches lips then sweeps out in a sweet kiss!
          const kissPhase = (t * 1.4) % 1.0;
          const sweepOut = kissPhase > 0.45 ? Math.min(1, (kissPhase - 0.45) * 2.2) : 0;
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              -1.42 + sweepOut * 0.55,
              0.25
            );
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -0.15 - sweepOut * 1.15,
              0.25
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.48, 0.2);
          }
        } else if (clip === 'high_five') {
          // Jump up and hold right hand high forward for a High-Five with the child!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -1.55, 0.3);
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -1.65, 0.3);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.85, 0.25);
          }
        } else if (clip === 'point_look') {
          // Pointing up and across at the 3D rainbow / sky wonders!
          const pointWave = Math.sin(t * 2.5) * 0.22;
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              -1.35 + pointWave,
              0.22
            );
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -1.38,
              0.22
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.45, 0.2);
          }
        } else if (clip === 'sleepy_nap') {
          // Hands together on right cheek with head tilted in a sweet sleepy nap!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -1.25, 0.2);
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -0.35, 0.2);
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(rig.leftArmBone.rotation.x, -1.28, 0.2);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, -0.05, 0.2);
          }
        } else if (clip === 'count_fingers') {
          // Holding both hands in front and counting fingers rhythmically 1-2-3-4-5!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              -1.08 + Math.sin(t * 6.0) * 0.18,
              0.25
            );
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.x,
              -1.08 - Math.sin(t * 6.0) * 0.18,
              0.25
            );
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -0.38, 0.25);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.38, 0.25);
          }
        } else if (clip === 'clap_hands') {
          // Human child clapping hands together in front of chest!
          const clapWave = Math.abs(Math.sin(t * 11.5));
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -1.05, 0.25);
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(rig.leftArmBone.rotation.x, -1.05, 0.25);
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -0.12 - clapWave * 0.45,
              0.35
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              0.12 + clapWave * 0.45,
              0.35
            );
          }
          if (rig.rightForearmBone && rig.leftForearmBone) {
            rig.rightForearmBone.rotation.z = -0.45 + clapWave * 0.35;
            rig.leftForearmBone.rotation.z = 0.45 - clapWave * 0.35;
          }
        } else if (clip === 'sit_relax') {
          // Human child sitting down on the 3D grass and swinging legs!
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightLegBone.rotation.x,
              -1.28 + Math.sin(t * 3.2) * 0.14,
              0.2
            );
            rig.leftLegBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftLegBone.rotation.x,
              -1.28 - Math.sin(t * 3.2) * 0.14,
              0.2
            );
          }
          if (rig.rightShinBone && rig.leftShinBone) {
            rig.rightShinBone.rotation.x = THREE.MathUtils.lerp(rig.rightShinBone.rotation.x, 0.55, 0.2);
            rig.leftShinBone.rotation.x = THREE.MathUtils.lerp(rig.leftShinBone.rotation.x, 0.55, 0.2);
          }
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -0.42, 0.2);
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(rig.leftArmBone.rotation.x, -0.42, 0.2);
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -0.25, 0.2);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.25, 0.2);
          }
        } else if (clip === 'think_curious') {
          // Human child thinking with right hand on chin and head tilted!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(rig.rightArmBone.rotation.x, -1.18, 0.22);
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -0.18, 0.22);
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(rig.leftArmBone.rotation.x, -0.25, 0.22);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 0.45, 0.22);
          }
          if (rig.rightForearmBone) {
            rig.rightForearmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightForearmBone.rotation.x,
              -1.15,
              0.25
            );
            rig.rightForearmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightForearmBone.rotation.z,
              -0.55,
              0.25
            );
          }
        } else if (clip === 'peekaboo_hide') {
          // Human child playing Peek-a-Boo: covers eyes, then opens hands wide!
          const hidePhase = Math.sin(t * 3.2) > -0.15;
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              hidePhase ? -1.42 : -0.55,
              0.25
            );
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.x,
              hidePhase ? -1.42 : -0.55,
              0.25
            );
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              hidePhase ? -0.15 : -1.35,
              0.25
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              hidePhase ? 0.15 : 1.35,
              0.25
            );
          }
        } else if (clip === 'jumping_jacks') {
          // Full-body 3D Jumping Jacks!
          const jackAmt = Math.max(0, Math.sin(t * 9.5));
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = -0.25 - jackAmt * 2.15;
            rig.leftArmBone.rotation.z = 0.25 + jackAmt * 2.15;
            rig.rightArmBone.rotation.x = 0;
            rig.leftArmBone.rotation.x = 0;
          }
          if (rig.rightLegBone && rig.leftLegBone) {
            rig.rightLegBone.rotation.z = -jackAmt * 0.48;
            rig.leftLegBone.rotation.z = jackAmt * 0.48;
            rig.rightLegBone.rotation.x = 0;
            rig.leftLegBone.rotation.x = 0;
          }
        } else if (clip === 'stretch_yawn') {
          // Big overhead morning stretch!
          const strAmt = 0.5 + 0.5 * Math.sin(t * 2.2);
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -0.35 - strAmt * 1.95,
              0.2
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              0.35 + strAmt * 1.95,
              0.2
            );
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              -0.35 * strAmt,
              0.2
            );
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.x,
              -0.35 * strAmt,
              0.2
            );
          }
        } else if (clip === 'calm_breathe') {
          // Slow, soothing co-regulation belly breathing (inhale arms rise, exhale arms lower)
          const inhale = 0.5 + 0.5 * Math.sin(t * 1.5);
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              -0.35 - inhale * 0.65,
              0.15
            );
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.x,
              -0.35 - inhale * 0.65,
              0.15
            );
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -0.25 - inhale * 0.35,
              0.15
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              0.25 + inhale * 0.35,
              0.15
            );
          }
        } else if (clip === 'cheer_hurrah') {
          // Pumping both arms high into the air!
          const pump = Math.abs(Math.sin(t * 8.5));
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -1.85 - pump * 0.55,
              0.3
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              1.85 + pump * 0.55,
              0.3
            );
            rig.rightArmBone.rotation.x = -0.25;
            rig.leftArmBone.rotation.x = -0.25;
          }
        } else if (clip === 'bow_ta_da') {
          // Graceful "Ta-Da!" bow with wide arm flourish
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(rig.rightArmBone.rotation.z, -1.35, 0.22);
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(rig.leftArmBone.rotation.z, 1.35, 0.22);
          }
        } else if (clip === 'talk_gesture' || st.toyIsTalking) {
          // Natural expressive human-child hand gestures while talking!
          if (rig.rightArmBone && rig.leftArmBone) {
            rig.rightArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.x,
              -0.65 + Math.sin(t * 5.8) * 0.28,
              0.2
            );
            rig.leftArmBone.rotation.x = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.x,
              -0.55 + Math.cos(t * 5.2) * 0.28,
              0.2
            );
            rig.rightArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.rightArmBone.rotation.z,
              -0.48 - Math.abs(Math.sin(t * 4.5)) * 0.35,
              0.2
            );
            rig.leftArmBone.rotation.z = THREE.MathUtils.lerp(
              rig.leftArmBone.rotation.z,
              0.48 + Math.abs(Math.cos(t * 4.5)) * 0.35,
              0.2
            );
          }
        }

        // 6. Direct Head-Bone Gaze Tracking toward Target or Child's Webcam Position
        if (rig.headBoneOrGroup) {
          const talkNod = st.toyIsTalking ? Math.sin(t * 6.5) * 0.085 : 0;
          const talkTilt = st.toyIsTalking ? Math.cos(t * 4.2) * 0.065 : 0;
          const thinkTilt =
            clip === 'think_curious' ? 0.26 : clip === 'sleepy_nap' ? -0.38 : 0;
          const lookYaw =
            clip === 'tiptoe_sneak'
              ? Math.sin(t * 3.8) * 0.55
              : clip === 'point_look'
              ? 0.45 + Math.sin(t * 2.2) * 0.2
              : track.smoothX * 0.52;
          const lookPitch = track.smoothY * 0.28;
          const targetHeadPitch = isJumpingCatch3D
            ? -0.45
            : clip === 'think_curious' || clip === 'point_look' || clip === 'superhero_pose'
            ? -0.26
            : clip === 'count_fingers'
            ? 0.24
            : clip === 'laugh_giggle'
            ? Math.sin(t * 14.0) * 0.16
            : lookPitch * 0.5 + talkNod;
          rig.headBoneOrGroup.rotation.y = THREE.MathUtils.lerp(
            rig.headBoneOrGroup.rotation.y,
            isRunning3D ? 0 : lookYaw * 0.65,
            0.12
          );
          rig.headBoneOrGroup.rotation.x = THREE.MathUtils.lerp(
            rig.headBoneOrGroup.rotation.x,
            targetHeadPitch,
            0.12
          );
          rig.headBoneOrGroup.rotation.z = THREE.MathUtils.lerp(
            rig.headBoneOrGroup.rotation.z,
            talkTilt + thinkTilt - track.smoothX * 0.08,
            0.12
          );
        }

        // 7. Natural Eye Blinking Every ~3.4 Seconds (or closed during Sleepy Nap!)
        if (rig.eyeMeshes && rig.eyeMeshes.length > 0) {
          const blinkCycle = t % 3.4;
          const blinkScaleY =
            clip === 'sleepy_nap'
              ? 0.1
              : blinkCycle > 3.22 && blinkCycle < 3.36
              ? Math.max(0.08, Math.abs(blinkCycle - 3.29) * 14)
              : 1.0;
          rig.eyeMeshes.forEach((eye) => {
            eye.scale.y = THREE.MathUtils.lerp(eye.scale.y, blinkScaleY, 0.35);
          });
        }

        // 8. Flying Bird / Plane Gentle Soaring
        if (rig.isFlyingToy) {
          rig.root.position.y += 0.14 + Math.sin(t * 2.2) * 0.09;
          rig.root.rotation.z += Math.cos(t * 1.8) * 0.08;
        }

        // 9. Vehicle Toy Smooth Wheel Rotation
        if (rig.isVehicleToy) {
          rig.wheels.forEach((w) => {
            w.rotation.x += delta * (isRunning3D || isSkipping3D ? 8.5 : 2.0);
          });
        }

        // 10. Smooth Lip-Sync Jaw Bone / Mouth Animation When the Toy Talks, Sings, Laughs, or Yawns!
        if (rig.jawOrMouth) {
          if (st.toyIsTalking || st.activeSong || clip === 'laugh_giggle') {
            const targetOpen =
              0.12 + Math.abs(Math.sin(t * 14.0)) * 0.24 + Math.sin(t * 23.0) * 0.06;
            rig.jawOrMouth.rotation.x = THREE.MathUtils.lerp(
              rig.jawOrMouth.rotation.x,
              targetOpen,
              0.25
            );
          } else if (clip === 'stretch_yawn') {
            rig.jawOrMouth.rotation.x = THREE.MathUtils.lerp(
              rig.jawOrMouth.rotation.x,
              0.32,
              0.15
            );
          } else {
            rig.jawOrMouth.rotation.x = THREE.MathUtils.lerp(
              rig.jawOrMouth.rotation.x,
              0,
              0.15
            );
          }
        }
      }

      renderer.render(scene, camera);

      // Render 2D Overlay Canvas (Drawings, Child Webcam Hand Cursor & Pop Sparkles — All Bubbles & Character Limbs Are 100% 3D in Three.js!)
      if (c2d && mount) {
        if (c2d.width !== mount.clientWidth || c2d.height !== mount.clientHeight) {
          c2d.width = mount.clientWidth;
          c2d.height = mount.clientHeight;
        }
        const ctx = c2d.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, c2d.width, c2d.height);

          // Draw 2D & 3D Brush Strokes (Child's drawings + Toy's Auto-Drawings!)
          const allStrokes = [...strokesRef.current, currentStrokeRef.current];
          allStrokes.forEach((stroke) => {
            if (stroke.length < 2) return;
            ctx.save();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            for (let i = 1; i < stroke.length; i++) {
              const p0 = stroke[i - 1];
              const p1 = stroke[i];
              ctx.strokeStyle = p1.color;
              ctx.shadowColor = p1.color;
              ctx.shadowBlur = p1.is3D ? 14 : 6;
              ctx.lineWidth = p1.size;
              const offset3D = p1.is3D ? Math.sin(t * 1.8 + i * 0.12) * 4 : 0;
              ctx.beginPath();
              ctx.moveTo(p0.x + offset3D, p0.y);
              ctx.lineTo(p1.x + offset3D, p1.y);
              ctx.stroke();
            }
            ctx.restore();
          });

          // Draw Gentle Hands-Free Webcam Tracking Cursor when Child Moves in Camera
          if (track.motionLevel > 1.8) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(camCursorX, camCursorY, 24, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(251, 146, 60, 0.28)';
            ctx.fill();
            ctx.strokeStyle = '#f97316';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.font = '20px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🖐️', camCursorX, camCursorY);
            ctx.font = '800 11px Inter, sans-serif';
            ctx.fillStyle = '#451a03';
            ctx.fillText(`${st.childName}'s Hand`, camCursorX, camCursorY + 34);
            ctx.restore();
          }

          // Draw Sparkle Particles
          particlesRef.current = particlesRef.current.filter((p) => p.life > 0.04);
          particlesRef.current.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life *= 0.91;
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          });
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  // Helper: Compute answer for any math operation
  const computeMathAnswer = (a: number, b: number, op: MathOperationType): number => {
    if (op === '+') return a + b;
    if (op === '-') return Math.max(0, a - b);
    if (op === '×') return a * b;
    if (op === '÷') return b !== 0 ? Math.round(a / b) : a;
    return a; // 'count'
  };

  const formatMathSpoken = (a: number, b: number, op: MathOperationType): string => {
    if (op === '+') return `${a} plus ${b}`;
    if (op === '-') return `${a} minus ${b}`;
    if (op === '×') return `${a} times ${b}`;
    if (op === '÷') return `${a} divided by ${b}`;
    return `count to ${a}`;
  };

  const formatMathSymbol = (a: number, b: number, op: MathOperationType, emoji: string): string => {
    if (op === 'count') {
      const icons = Array.from({ length: Math.min(a, 10) })
        .map(() => emoji)
        .join('');
      return `Count ${a} ${icons}`;
    }
    return `${a} ${op} ${b} = ?`;
  };

  const generateNextMathNumbers = (
    op: MathOperationType = stateRef.current.mathOp,
    range: MathRangeType = stateRef.current.mathRange
  ) => {
    const maxVal =
      range === '1-5' ? 5 : range === '1-10' ? 10 : range === '1-20' ? 20 : 50;
    if (op === 'count') {
      const nextA = 1 + Math.floor(Math.random() * Math.min(maxVal, 15));
      setMathNumA(nextA);
      setMathNumB(0);
    } else if (op === '-') {
      const a = 2 + Math.floor(Math.random() * maxVal);
      const b = 1 + Math.floor(Math.random() * a);
      setMathNumA(a);
      setMathNumB(b);
    } else if (op === '×') {
      const factorMax = range === '1-5' ? 4 : range === '1-10' ? 6 : range === '1-20' ? 10 : 12;
      setMathNumA(1 + Math.floor(Math.random() * factorMax));
      setMathNumB(1 + Math.floor(Math.random() * factorMax));
    } else if (op === '÷') {
      const divisor = 1 + Math.floor(Math.random() * 5);
      const quotient = 1 + Math.floor(Math.random() * (range === '1-5' ? 3 : 6));
      setMathNumA(divisor * quotient);
      setMathNumB(divisor);
    } else {
      const halfMax = Math.max(2, Math.floor(maxVal / 2));
      setMathNumA(1 + Math.floor(Math.random() * halfMax));
      setMathNumB(1 + Math.floor(Math.random() * halfMax));
    }
  };

  const triggerToyCartoonJump = () => {
    toyJumpRef.current = {
      active: true,
      startMs: performance.now(),
      durationMs: 950,
    };
    triggerToyTemporaryMotion('jump_catch', 1800);
  };

  const triggerToyCartoonSpin = () => {
    toySpinRef.current = {
      active: true,
      startMs: performance.now(),
      durationMs: 1100,
    };
    triggerToyTemporaryMotion('dance', 2200);
  };

  /**
   * Command the 3D Toy Character to physically RUN across the 3D stage and JUMP up in 3D space
   * to catch & pop a 3D bubble with its 3D hands!
   */
  const triggerToyHandPopNow = () => {
    if (bubblesRef.current.length === 0) return;
    const chosen = bubblesRef.current[Math.floor(Math.random() * bubblesRef.current.length)];
    if (!chosen) return;
    const loco = toyLocomotionRef.current;
    loco.state = 'run_to_catch_bubble';
    loco.targetBubbleId = chosen.id;
    loco.targetX = chosen.wx;
    loco.targetY = chosen.wy;
    loco.targetZ = chosen.wz - 0.08;
    loco.actionStartMs = performance.now();
    loco.hasTriggeredImpact = false;

    toyHandPlayRef.current = {
      active: true,
      handX: chosen.x,
      handY: chosen.y,
      targetX: chosen.x,
      targetY: chosen.y,
      targetBubbleId: chosen.id,
      lastPopMs: performance.now(),
    };
    if (toyRigRef.current) {
      playToyMotionClip(toyRigRef.current, 'walk');
    }
  };

  /**
   * Command the 3D Toy Character to physically RUN across the 3D field up to the 3D Soccer Ball,
   * wind up its 3D leg, and KICK the 3D Football into the 3D Goal Net!
   */
  const triggerToyKickFootballNow = () => {
    const sp = soccerPhysicsRef.current;
    // Place the 3D ball on the playable midfield grass if it's currently in flight or inside the goal
    if (sp.inFlight || sp.x > 1.35 || sp.x < -1.35) {
      sp.x = 0.45 + (Math.random() - 0.5) * 0.35;
      sp.y = -0.68;
      sp.z = 0.34 + (Math.random() - 0.5) * 0.14;
      sp.vx = 0;
      sp.vy = 0;
      sp.vz = 0;
      sp.inFlight = false;
      sp.scoredAtMs = 0;
    }
    const loco = toyLocomotionRef.current;
    loco.state = 'run_to_kick_football';
    loco.targetX = sp.x - 0.28;
    loco.targetY = 0;
    loco.targetZ = sp.z;
    loco.actionStartMs = performance.now();
    loco.hasTriggeredImpact = false;
    if (toyRigRef.current) {
      playToyMotionClip(toyRigRef.current, 'walk');
    }
  };

  // 3. REAL-TIME WEBCAM CHILD POSITION, EXPRESSION, GESTURE & PHYSICAL GAME REP TRACKER (12 FPS)
  useEffect(() => {
    const timer = window.setInterval(() => {
      const video = videoRef.current;
      const mCanvas = motionCanvasRef.current;
      const tOverlay = trackingOverlayCanvasRef.current;
      if (!video || !mCanvas || video.readyState < 2) return;

      const ctx = mCanvas.getContext('2d');
      if (!ctx) return;
      const gw = 48;
      const gh = 36;
      mCanvas.width = gw;
      mCanvas.height = gh;
      ctx.drawImage(video, 0, 0, gw, gh);
      const data = ctx.getImageData(0, 0, gw, gh).data;

      if (prevFrameDataRef.current) {
        let sumDiff = 0;
        let weightedX = 0;
        let weightedY = 0;
        let activePixels = 0;

        for (let y = 0; y < gh; y++) {
          for (let x = 0; x < gw; x++) {
            const idx = (y * gw + x) * 4;
            const dR = Math.abs(data[idx] - prevFrameDataRef.current[idx]);
            const dG = Math.abs(data[idx + 1] - prevFrameDataRef.current[idx + 1]);
            const dB = Math.abs(data[idx + 2] - prevFrameDataRef.current[idx + 2]);
            const diff = (dR + dG + dB) / 3;
            sumDiff += diff;
            if (diff > 18) {
              const normX = -((x / gw) * 2 - 1);
              const normY = -((y / gh) * 2 - 1);
              weightedX += normX * diff;
              weightedY += normY * diff;
              activePixels += diff;
            }
          }
        }

        const avgMotion = sumDiff / (gw * gh);
        const track = childTrackRef.current;
        track.motionLevel = avgMotion;

        if (activePixels > 110) {
          const newX = Math.max(-0.95, Math.min(0.95, weightedX / activePixels));
          const newY = Math.max(-0.85, Math.min(0.85, weightedY / activePixels));
          const dx = Math.abs(newX - track.x);
          const dy = Math.abs(newY - track.y);
          track.x = newX;
          track.y = newY;

          // Detect horizontal hand wave on webcam
          if (dx > 0.16) {
            track.waveAccumulator = Math.min(10, track.waveAccumulator + 2.3);
          } else {
            track.waveAccumulator = Math.max(0, track.waveAccumulator - 0.45);
          }

          // Detect vertical head nod / body jump on webcam
          if (dy > 0.14 && dx < 0.22) {
            track.nodJumpAccumulator = Math.min(10, track.nodJumpAccumulator + 2.3);
          } else {
            track.nodJumpAccumulator = Math.max(0, track.nodJumpAccumulator - 0.45);
          }

          const now = Date.now();
          const st = stateRef.current;

          // Physical Action & Counting Game: Count child's physical jumps/waves on webcam!
          if (
            st.canvasMode === 'ar_physical_and_math_game' &&
            avgMotion > 4.0 &&
            now - track.lastRepTime > 1600 &&
            !st.toyIsTalking
          ) {
            track.lastRepTime = now;
            setPhysicalRepCount((prev) => {
              const nextRep = prev + 1;
              if (st.physicalActionType === 'jump') triggerToyCartoonJump();
              else if (st.physicalActionType === 'wave') triggerToyTemporaryMotion('wave', 2200);
              else triggerToyTemporaryMotion('dance', 2400);
              playPentatonicNote(392 + nextRep * 45, DEFAULT_SENSORY, 'kalimba', 0.35);

              if (nextRep >= st.physicalRepTarget) {
                playGentleSuccessChime(DEFAULT_SENSORY);
                setMathScore((s) => s + 1);
                speakAsToy(
                  `Yay ${st.childName}, we did all ${st.physicalRepTarget} ${st.physicalActionType}s together on camera! Wanna do another round?`,
                  activeToyItem.voicePitch
                );
                return 0;
              } else {
                speakAsToy(
                  `${nextRep}! Great ${st.physicalActionType}, ${st.childName}! Keep going with me!`,
                  activeToyItem.voicePitch
                );
                return nextRep;
              }
            });
          } else if (
            track.waveAccumulator > 4.8 &&
            now - track.lastGestureTime > 11000 &&
            !st.toyIsTalking &&
            now - lastSpeechEndTimeRef.current > 2400
          ) {
            track.lastGestureTime = now;
            track.waveAccumulator = 0;
            setTrackingStatusText(`👋 ${st.childName} Waved on Camera!`);
            setLastHeardText(`👋 [Webcam Gesture: ${st.childName} Waved Hello]`);
            handleChildCooperationGesture();
          } else if (
            track.nodJumpAccumulator > 4.8 &&
            now - track.lastGestureTime > 11000 &&
            !st.toyIsTalking &&
            now - lastSpeechEndTimeRef.current > 2400
          ) {
            track.lastGestureTime = now;
            track.nodJumpAccumulator = 0;
            setTrackingStatusText(`🦘 ${st.childName} Nodded / Jumped on Camera!`);
            setLastHeardText(`🦘 [Webcam Gesture: ${st.childName} Jumped / Nodded Yes]`);
            triggerToyCartoonJump();
            updateToyThoughtCloud(
              '🦘',
              `I saw ${st.childName} jump or nod on the webcam—jumping together in 3D!`,
              'Jumping Together!'
            );
            speakAsToy(
              `Yay ${st.childName}, I see you jumping and nodding on the camera! Look at me jumping right back with you!`,
              activeToyItem.voicePitch
            );
          } else {
            const dirLabel =
              newX < -0.25 ? 'Left' : newX > 0.25 ? 'Right' : newY > 0.2 ? 'Up' : 'Center';
            setTrackingStatusText(`👀 Watching ${st.childName} (${dirLabel})`);
          }
        } else {
          track.waveAccumulator = Math.max(0, track.waveAccumulator - 0.4);
          track.nodJumpAccumulator = Math.max(0, track.nodJumpAccumulator - 0.4);
        }

        // Draw live tracking reticle & expression/co-play badge on the Right-Sidebar Webcam Overlay
        if (tOverlay) {
          tOverlay.width = tOverlay.clientWidth || 240;
          tOverlay.height = tOverlay.clientHeight || 160;
          const oCtx = tOverlay.getContext('2d');
          if (oCtx) {
            oCtx.clearRect(0, 0, tOverlay.width, tOverlay.height);
            const rx = tOverlay.width * (0.5 + track.smoothX * 0.35);
            const ry = tOverlay.height * (0.5 - track.smoothY * 0.32);

            oCtx.save();
            oCtx.beginPath();
            oCtx.arc(rx, ry, 24 + Math.min(14, avgMotion * 1.5), 0, Math.PI * 2);
            oCtx.strokeStyle = avgMotion > 3.2 ? '#10b981' : '#f97316';
            oCtx.lineWidth = 2.5;
            oCtx.setLineDash([5, 4]);
            oCtx.stroke();

            oCtx.fillStyle = 'rgba(69, 26, 3, 0.82)';
            oCtx.fillRect(6, tOverlay.height - 24, tOverlay.width - 12, 18);
            oCtx.fillStyle = '#fef3c7';
            oCtx.font = '700 10px Inter, sans-serif';
            const exprEmoji =
              stateRef.current.facialExpression === 'smiling_happy'
                ? '😊'
                : stateRef.current.facialExpression === 'crying_distressed'
                ? '😢'
                : '😣';
            oCtx.fillText(
              avgMotion > 3.2
                ? `✨ ${exprEmoji} ${stateRef.current.childName} Moving — Toy Synced!`
                : `👀 ${exprEmoji} Watching & Listening to ${stateRef.current.childName}`,
              10,
              tOverlay.height - 11
            );
            oCtx.restore();
          }
        }
      }
      prevFrameDataRef.current = new Uint8ClampedArray(data);
    }, 85);

    return () => window.clearInterval(timer);
  }, [activeToyItem.voicePitch]);

  // 4. BULLETPROOF TWO-WAY VOICE RECOGNITION (LISTENS CONTINUOUSLY, SHOWS LIVE WORDS & RESUMES AFTER TOY SPEAKS!)
  useEffect(() => {
    if (!alwaysListenEnabled) {
      setMicListening(false);
      return;
    }
    const SpeechRec =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;
    if (!SpeechRec) return;

    let active = true;
    let lastDispatchedText = '';
    let lastDispatchedAt = 0;

    const dispatchRecognizedSpeech = (cleanText: string) => {
      const now = Date.now();
      if (!cleanText || cleanText.length < 2) return;
      if (cleanText === lastDispatchedText && now - lastDispatchedAt < 2200) return;
      lastDispatchedText = cleanText;
      lastDispatchedAt = now;
      setWaitingForChildReply(false);
      void triggerChildExpressionOrVoice(
        stateRef.current.facialExpression,
        'clear_speech',
        cleanText
      );
    };

    let rec: any = null;
    try {
      rec = new SpeechRec();
      speechRecRef.current = rec;
      rec.lang = 'en-US';
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        if (active) setMicListening(true);
      };

      rec.onresult = (ev: any) => {
        // Echo Guard: Ignore speaker output while the toy is actively speaking or 450ms after finishing
        if (
          stateRef.current.toyIsTalking ||
          Date.now() - lastSpeechEndTimeRef.current < 450
        ) {
          return;
        }
        const lastIdx = ev.results.length - 1;
        const resultItem = ev.results[lastIdx];
        const transcript = resultItem?.[0]?.transcript?.trim();
        if (!transcript) return;

        if (interimSpeechTimerRef.current) {
          window.clearTimeout(interimSpeechTimerRef.current);
          interimSpeechTimerRef.current = null;
        }

        if (resultItem.isFinal) {
          dispatchRecognizedSpeech(transcript);
        } else {
          // Show live interim speech immediately so user sees the toy is hearing them!
          setLastHeardText(`🎙️ "${transcript}..."`);
          // Fallback timer if browser continuous mode delays isFinal on short words like "hello" or "jump"
          interimSpeechTimerRef.current = window.setTimeout(() => {
            if (!stateRef.current.toyIsTalking && transcript.length >= 2) {
              dispatchRecognizedSpeech(transcript);
            }
          }, 950);
        }
      };

      rec.onerror = () => {
        // Keep active; watchdog below will cleanly restart recognition when ready
      };

      rec.onend = () => {
        if (active && alwaysListenEnabled && !stateRef.current.toyIsTalking) {
          window.setTimeout(() => {
            if (active && alwaysListenEnabled && !stateRef.current.toyIsTalking) {
              try {
                rec.start();
                setMicListening(true);
              } catch {
                // Already started
              }
            }
          }, 250);
        }
      };

      rec.start();
      setMicListening(true);
    } catch {
      setMicListening(false);
    }

    // Watchdog: Ensure SpeechRecognition always resumes after the toy finishes speaking!
    const watchdog = window.setInterval(() => {
      if (active && alwaysListenEnabled && !stateRef.current.toyIsTalking && rec) {
        try {
          rec.start();
          setMicListening(true);
        } catch {
          // Already running
        }
      }
    }, 1200);

    return () => {
      active = false;
      window.clearInterval(watchdog);
      if (interimSpeechTimerRef.current) {
        window.clearTimeout(interimSpeechTimerRef.current);
      }
      setMicListening(false);
      if (rec) {
        try {
          rec.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [alwaysListenEnabled]);

  // 5. SMOOTH MOTION CONTROLLER (PLAYS CLIP AND AUTOMATICALLY SETTLES BACK TO CALM IDLE!)
  const triggerToyMotion = (clipType: ToyMotionClipType) => {
    setActiveMotionClip(clipType);
    if (toyRigRef.current) {
      const chosen = playToyMotionClip(toyRigRef.current, clipType);
      setActiveClipLabel(
        clipType === 'idle' ? `${chosen} (Natural Gaze)` : `${chosen} (Cartoon Action)`
      );
    }
  };

  const triggerToyTemporaryMotion = (clipType: ToyMotionClipType, durationMs = 3800) => {
    if (motionReturnTimerRef.current) {
      window.clearTimeout(motionReturnTimerRef.current);
    }
    triggerToyMotion(clipType);
    if (clipType !== 'idle') {
      motionReturnTimerRef.current = window.setTimeout(() => {
        triggerToyMotion('idle');
      }, durationMs);
    }
  };

  const replaceActive3DToyInScene = (
    archetype: ToyArchetypeId,
    col1: string,
    col2: string,
    texture?: THREE.Texture | null
  ) => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (toyRigRef.current) {
      scene.remove(toyRigRef.current.root);
    }
    const newRig = buildSmooth3DToyRig(archetype, col1, col2, texture || null);
    scene.add(newRig.root);
    toyRigRef.current = newRig;
    const clipName = playToyMotionClip(newRig, 'idle');
    setActiveMotionClip('idle');
    setActiveClipLabel(`${clipName} (Natural Gaze)`);
  };

  /**
   * 3D Toy speaks ONE short, natural turn in a Sweet Child-Girl Cartoon Voice,
   * then stops, resumes microphone listening, and waits for the child's response (`waitingForChildReply = true`).
   */
  const speakAsToy = (text: string, pitch = 1.44) => {
    setToySpeechBubble(text);
    setToyIsTalking(true);
    setWaitingForChildReply(false);
    setAdultGuideStatus(`👧 Toy Talking to ${stateRef.current.childName} (Sweet Girl Voice)`);
    void speakAsSweetChildGirlToy(text, DEFAULT_SENSORY, {
      pitchBoost: pitch,
      onStart: () => {
        setToyIsTalking(true);
      },
      onEnd: () => {
        lastSpeechEndTimeRef.current = Date.now();
        setToyIsTalking(false);
        setWaitingForChildReply(true);
        setAdultGuideStatus(
          `👂 Waiting for ${stateRef.current.childName}'s Response · 👧 Sweet Girl Voice`
        );
        // Immediately ensure microphone recognition is active for the child's reply turn!
        window.setTimeout(() => {
          if (speechRecRef.current && !stateRef.current.toyIsTalking) {
            try {
              speechRecRef.current.start();
              setMicListening(true);
            } catch {
              // Already listening
            }
          }
        }, 420);
      },
    });
  };


  /**
   * App Settings, Camera Controls & Activity Directions speak in a Calm, Warm Adult Voice.
   */
  const speakAdultDirection = (directionText: string, followUpToyLine?: string) => {
    setToyIsTalking(false);
    setAdultGuideStatus(`👩‍🏫 Adult Guide: "${directionText}"`);
    void speakAsAdultAppGuide(directionText, DEFAULT_SENSORY, {
      onEnd: () => {
        lastSpeechEndTimeRef.current = Date.now();
        setAdultGuideStatus(
          `👂 Waiting for ${stateRef.current.childName}'s Response · 👩‍🏫 Adult Settings Voice`
        );
        if (followUpToyLine) {
          setTimeout(() => {
            speakAsToy(followUpToyLine, activeToyItem.voicePitch);
          }, 300);
        }
      },
    });
  };

  /**
   * Updates both the 3D Floating Thought Cloud Sprite above the Toy's head and the Sidebar Mind Card!
   */
  const updateToyThoughtCloud = (emoji: string, thought: string, decisionLabel: string) => {
    setToyThoughtDecision({ emoji, thought, decisionLabel });
    if (thoughtCloud3DRef.current) {
      update3DThoughtCloudSprite(thoughtCloud3DRef.current, emoji, decisionLabel);
    }
  };

  /**
   * Executes any of the 23 Real-World Human-Child 3D Activities with full 3D locomotion/posture,
   * 3D Thought Cloud update, and optional natural sweet child-girl speech!
   */
  const executeHumanChildAction = (
    actionType: ToyMotionClipType,
    customThought?: string,
    customSpeech?: string,
    speakOutLoud = true
  ) => {
    const name = stateRef.current.childName;
    const pitch = activeCustomToy ? activeCustomToy.voicePitch : activeToyItem.voicePitch;
    const loco = toyLocomotionRef.current;

    if (actionType === 'kick_football') {
      updateToyThoughtCloud(
        '⚽',
        customThought || `${name} loves sports—I will dribble and kick the 3D football into the goal!`,
        'Dribble & Kick 3D Ball!'
      );
      const sp = soccerPhysicsRef.current;
      if (sp.inFlight || sp.x > 1.35 || sp.x < -1.35) {
        sp.x = 0.25 + (Math.random() - 0.5) * 0.25;
        sp.y = -0.68;
        sp.z = 0.32;
        sp.vx = 0;
        sp.vy = 0;
        sp.vz = 0;
        sp.inFlight = false;
        sp.scoredAtMs = 0;
      }
      loco.state = 'dribble_to_kick_football';
      loco.actionStartMs = performance.now();
      loco.hasTriggeredImpact = false;
      if (toyRigRef.current) playToyMotionClip(toyRigRef.current, 'walk');
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Watch me dribble the 3D football across the grass and kick a goal for you, ${name}!`,
          pitch
        );
      }
      return;
    }

    if (actionType === 'jump_catch' || actionType === 'jump') {
      updateToyThoughtCloud(
        '🦘',
        customThought || `I see a shiny 3D bubble! I'll run and jump high to catch it with ${name}!`,
        'Run & Jump Catch!'
      );
      if (bubblesRef.current.length > 0) {
        triggerToyHandPopNow();
      } else {
        triggerToyCartoonJump();
      }
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Wheee ${name}, watch me run and leap up in 3D space to catch the bubble!`,
          pitch
        );
      }
      return;
    }

    if (actionType === 'skip_hop') {
      updateToyThoughtCloud(
        '🐰',
        customThought || `I feel so happy playing with ${name}—let's skip and hop across the meadow!`,
        'Skip & Hop Around!'
      );
      loco.state = 'skip_hopping';
      loco.targetX = (Math.random() > 0.5 ? 1 : -1) * 1.45;
      loco.targetZ = (Math.random() - 0.5) * 0.55;
      triggerToyTemporaryMotion('skip_hop', 5200);
      window.setTimeout(() => {
        if (toyLocomotionRef.current.state === 'skip_hopping') {
          toyLocomotionRef.current.state = 'idle';
        }
      }, 5200);
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Skip-hop-skip! Look at me skipping across the 3D grass like a happy kid, ${name}!`,
          pitch
        );
      }
      return;
    }

    if (actionType === 'tiptoe_sneak') {
      updateToyThoughtCloud(
        '🤫',
        customThought || `Let's play a silly tiptoe sneaking game to make ${name} giggle!`,
        'Tiptoe Sneaking...'
      );
      loco.state = 'tiptoe_sneaking';
      loco.targetX = (Math.random() > 0.5 ? 1 : -1) * 1.25;
      loco.targetZ = (Math.random() - 0.5) * 0.45;
      triggerToyTemporaryMotion('tiptoe_sneak', 5000);
      window.setTimeout(() => {
        if (toyLocomotionRef.current.state === 'tiptoe_sneaking') {
          toyLocomotionRef.current.state = 'idle';
        }
      }, 5000);
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Shhh-hehe ${name}, look at me sneaking on my tiptoes! Can you tiptoe too?`,
          pitch
        );
      }
      return;
    }

    if (actionType === 'walk' || actionType === 'run') {
      updateToyThoughtCloud(
        '🏃',
        customThought || `I want to explore our 3D cartoon world with ${name}!`,
        actionType === 'run' ? 'Running Across Field!' : 'Walking & Exploring!'
      );
      loco.state = 'strolling';
      loco.targetX = (Math.random() > 0.5 ? 1 : -1) * 1.5;
      loco.targetZ = (Math.random() - 0.5) * 0.55;
      triggerToyTemporaryMotion(actionType, 5200);
      window.setTimeout(() => {
        if (toyLocomotionRef.current.state === 'strolling') {
          toyLocomotionRef.current.state = 'idle';
        }
      }, 5200);
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Look at me walking and running around our 3D playground, ${name}! Where should I go next?`,
          pitch
        );
      }
      return;
    }

    if (actionType === 'airplane_zoom') {
      updateToyThoughtCloud(
        '✈️',
        customThought || `Spreading my arms wide like airplane wings and zooming across the 3D stage for ${name}!`,
        'Airplane Wing Zoom!'
      );
      loco.state = 'airplane_zooming';
      loco.targetX = (Math.random() > 0.5 ? 1 : -1) * 1.65;
      loco.targetZ = (Math.random() - 0.5) * 0.6;
      triggerToyTemporaryMotion('airplane_zoom', 5400);
      window.setTimeout(() => {
        if (toyLocomotionRef.current.state === 'airplane_zooming') {
          toyLocomotionRef.current.state = 'idle';
        }
      }, 5400);
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Zooooom, ${name}! Look at me spreading my arms like an airplane and flying around our 3D world!`,
          pitch
        );
      }
      return;
    }

    if (actionType === 'march_parade') {
      updateToyThoughtCloud(
        '🥁',
        customThought || `Marching with high knees in a joyful parade with ${name}!`,
        'High-Knee Parade March!'
      );
      loco.state = 'marching_parade';
      loco.targetX = (Math.random() > 0.5 ? 1 : -1) * 1.45;
      loco.targetZ = (Math.random() - 0.5) * 0.5;
      triggerToyTemporaryMotion('march_parade', 5200);
      window.setTimeout(() => {
        if (toyLocomotionRef.current.state === 'marching_parade') {
          toyLocomotionRef.current.state = 'idle';
        }
      }, 5200);
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Left, right, left, right! Watch me march with high knees across the 3D stage, ${name}!`,
          pitch
        );
      }
      return;
    }

    if (actionType === 'cartwheel_flip') {
      updateToyThoughtCloud(
        '🤸‍♀️',
        customThought || `Doing an awesome 3D sideways cartwheel flip across the grass for ${name}!`,
        '3D Cartwheel Flip!'
      );
      loco.state = 'cartwheeling';
      triggerToyTemporaryMotion('cartwheel_flip', 4400);
      window.setTimeout(() => {
        if (toyLocomotionRef.current.state === 'cartwheeling') {
          toyLocomotionRef.current.state = 'idle';
        }
      }, 4400);
      if (speakOutLoud) {
        speakAsToy(
          customSpeech ||
            `Wheee ${name}, watch me do a full 3D cartwheel flip across the lawn! Ta-da!`,
          pitch
        );
      }
      return;
    }

    // Stationary Human-Child 3D Actions:
    loco.state = 'idle';
    const metaMap: Record<
      string,
      { emoji: string; badge: string; thought: string; speech: string; dur: number }
    > = {
      clap_hands: {
        emoji: '👏',
        badge: 'Clapping Hands!',
        thought: `Clapping my hands to cheer for ${name}!`,
        speech: `Clap-clap-clap! Yay ${name}, let's clap our hands together!`,
        dur: 4200,
      },
      sit_relax: {
        emoji: '🧘',
        badge: 'Sitting on Grass',
        thought: `Taking a cozy sit on the soft 3D grass with ${name}!`,
        speech: `Ahh, I'm sitting down on the soft grass to relax and swing my feet with you, ${name}!`,
        dur: 5800,
      },
      think_curious: {
        emoji: '🤔',
        badge: 'Thinking Curiously...',
        thought: `Hmm, thinking about what fun activity ${name} wants next...`,
        speech: `Hmm ${name}, I'm putting my hand on my chin and thinking—what game should we play next?`,
        dur: 4200,
      },
      peekaboo_hide: {
        emoji: '🙈',
        badge: 'Playing Peek-a-Boo!',
        thought: `Covering my eyes to play Peek-a-Boo with ${name}!`,
        speech: `Where did I go, ${name}? Peek-a-Boo! I see you smiling!`,
        dur: 4600,
      },
      jumping_jacks: {
        emoji: '🤸',
        badge: '3D Jumping Jacks!',
        thought: `Doing energetic 3D Jumping Jacks with ${name}!`,
        speech: `One, two, three! Look at me doing 3D jumping jacks with my arms and legs, ${name}!`,
        dur: 4800,
      },
      stretch_yawn: {
        emoji: '🙆',
        badge: 'Big Morning Stretch!',
        thought: `Reaching both arms high for a big feel-good stretch!`,
        speech: `Aaaah, big stretch up to the sky, ${name}! Can you stretch your arms high too?`,
        dur: 4400,
      },
      calm_breathe: {
        emoji: '🌬️',
        badge: 'Calm Belly Breathing',
        thought: `Doing slow, soothing belly breaths so ${name} feels calm and safe...`,
        speech: `Let's take a slow, cozy belly breath together, ${name}... breathe in... and breathe out...`,
        dur: 6000,
      },
      bow_ta_da: {
        emoji: '🙇',
        badge: 'Ta-Da! Bow!',
        thought: `Doing a proud Ta-Da bow for ${name}!`,
        speech: `Ta-daaa! Thank you, thank you ${name}! Wanna take a bow together?`,
        dur: 4200,
      },
      cheer_hurrah: {
        emoji: '🙌',
        badge: 'Cheering Hurrah!',
        thought: `Pumping both hands high to celebrate ${name}!`,
        speech: `Hip-hip-hurrah for ${name}! You are the best playmate ever!`,
        dur: 4400,
      },
      dance: {
        emoji: '💃',
        badge: '3D Movie Dance!',
        thought: `Dancing and wiggling to the rhythm with ${name}!`,
        speech: `Hehe, look at my 3D dance moves, ${name}! Let's wiggle together!`,
        dur: 5600,
      },
      hug: {
        emoji: '🤗',
        badge: 'Warm Cuddle Hug!',
        thought: `Opening my arms wide for a warm cuddle hug with ${name}!`,
        speech: `Aww ${name}, here is a big warm cuddle hug just for you!`,
        dur: 4800,
      },
      wave: {
        emoji: '👋',
        badge: 'Waving Hello!',
        thought: `Waving my 3D hand hello to ${name}!`,
        speech: `Hi ${name}! Look at my 3D hand waving at you!`,
        dur: 3800,
      },
      talk_gesture: {
        emoji: '💬',
        badge: 'Chatting & Gesturing',
        thought: `Talking and moving my hands like a real friend with ${name}!`,
        speech: `Hey ${name}, I love chatting with you! Tell me what you want to do next!`,
        dur: 4400,
      },
      hop_one_foot: {
        emoji: '🦩',
        badge: 'One-Foot Flamingo Hop!',
        thought: `Balancing and hopping on one foot like a playful flamingo with ${name}!`,
        speech: `Hop, hop, hop on one foot! Can you balance on one leg with me, ${name}?`,
        dur: 4600,
      },
      hula_wiggle: {
        emoji: '🌺',
        badge: 'Hula Hip Wiggle!',
        thought: `Putting my hands on my hips and doing a silly Hula Wiggle for ${name}!`,
        speech: `Wiggle-wiggle-hula! Look at my silly hula dance, ${name}!`,
        dur: 4800,
      },
      superhero_pose: {
        emoji: '🦸',
        badge: 'Superhero Power Pose!',
        thought: `Doing a brave Superhero Power Pose with ${name}!`,
        speech: `Ta-da! Super-${name} and I are brave superheroes! Show me your superhero pose!`,
        dur: 4600,
      },
      laugh_giggle: {
        emoji: '🤭',
        badge: 'Belly Laugh & Giggle!',
        thought: `Giggling with joy because playing with ${name} is so much fun!`,
        speech: `Hehehe, hahaha! You make me giggle so much, ${name}!`,
        dur: 4200,
      },
      blow_kiss: {
        emoji: '😘',
        badge: 'Blowing a Sweet Kiss!',
        thought: `Sending a sweet flying kiss to my best friend ${name}!`,
        speech: `Mwah! Here is a sweet flying kiss for you, ${name}! Catch it!`,
        dur: 4200,
      },
      high_five: {
        emoji: '✋',
        badge: '3D Jump High-Five!',
        thought: `Jumping up with my hand high for an awesome High-Five with ${name}!`,
        speech: `Up high, ${name}! Give my 3D hand a big High-Five! Bam-hehe!`,
        dur: 4200,
      },
      point_look: {
        emoji: '👆',
        badge: 'Look at the Rainbow!',
        thought: `Pointing up at the colorful 3D sky to share joint attention with ${name}!`,
        speech: `Ooh look up there, ${name}! Follow my finger—do you see the pretty 3D rainbow and clouds?`,
        dur: 4600,
      },
      sleepy_nap: {
        emoji: '😴',
        badge: 'Cozy Sleepy Nap...',
        thought: `Resting my cheek on my hands for a peaceful little nap with ${name}...`,
        speech: `Yaaawn... I'm resting my head on my hands for a cozy little nap, ${name}... shhh...`,
        dur: 5600,
      },
      count_fingers: {
        emoji: '🖐️',
        badge: 'Counting 1-2-3-4-5!',
        thought: `Holding up my 3D hands to count fingers 1, 2, 3, 4, 5 with ${name}!`,
        speech: `Let's count on our hands together, ${name}! One, two, three, four, five!`,
        dur: 4800,
      },
    };

    const meta = metaMap[actionType] || metaMap.wave;
    updateToyThoughtCloud(meta.emoji, customThought || meta.thought, meta.badge);
    triggerToyTemporaryMotion(actionType, meta.dur);
    if (speakOutLoud) {
      speakAsToy(customSpeech || meta.speech, pitch);
    }
  };

  /**
   * 6B. AUTONOMOUS HUMAN-CHILD BRAIN & DECISION-MAKING ENGINE
   * Observes the autistic child's live behavior (facial expression, webcam movement energy, active mode)
   * and lets the 3D Toy THINK for herself (`think_curious` pose + 3D Thought Cloud `💭`) and DECIDE
   * what human-child activity to perform next!
   */
  const triggerAutonomousChildBrainDecisionNow = (forceSpeak = false) => {
    const st = stateRef.current;
    const track = childTrackRef.current;
    const name = st.childName;

    // Step 1: Enter brief "Thinking" pose (hand on chin, head tilted) for 850ms so child sees the toy thinking!
    updateToyThoughtCloud(
      '🤔',
      `Observing ${name} (${st.facialExpression.replace('_', ' ')}, motion ${track.motionLevel.toFixed(1)})... thinking what to do next!`,
      `Thinking...`
    );
    if (toyRigRef.current && toyLocomotionRef.current.state === 'idle') {
      playToyMotionClip(toyRigRef.current, 'think_curious');
      setActiveMotionClip('think_curious');
    }

    window.setTimeout(() => {
      // Step 2: Decide the best human-child 3D action based on the autistic child's behavior!
      // IMPORTANT: Only speak out loud when explicitly requested (`forceSpeak === true`), so the toy NEVER talks to herself unprompted!
      const expr = stateRef.current.facialExpression;
      const motion = childTrackRef.current.motionLevel;
      const idx = autonomousDecisionIdxRef.current++;
      const shouldSpeak = forceSpeak;


      if (expr === 'crying_distressed') {
        // Child is distressed -> Toy autonomously chooses soothing co-regulation actions
        const comfortActions: Array<{
          act: ToyMotionClipType;
          thought: string;
          speech: string;
        }> = [
          {
            act: 'calm_breathe',
            thought: `${name} seems upset—I decided to do slow belly breathing to help ${name} feel calm.`,
            speech: `I'm right here with you, ${name}. Watch my arms and let's do a slow belly breath together...`,
          },
          {
            act: 'hug',
            thought: `${name} needs comfort—I decided to open my arms for a big warm hug!`,
            speech: `Aww ${name}, big warm cuddle hug from me! You are safe and loved!`,
          },
          {
            act: 'blow_kiss',
            thought: `Sending ${name} a gentle flying kiss to help ${name} feel better!`,
            speech: `Mwah! Sending you a gentle flying kiss, ${name}. Everything is okay!`,
          },
          {
            act: 'peekaboo_hide',
            thought: `I'll play a gentle Peek-a-Boo to bring back ${name}'s sweet smile!`,
            speech: `Peek-a-Boo, ${name}! I'm hiding behind my hands to make you smile!`,
          },
        ];
        const pick = comfortActions[idx % comfortActions.length];
        executeHumanChildAction(pick.act, pick.thought, pick.speech, shouldSpeak);
        return;
      }

      if (expr === 'frowning_frustrated') {
        // Child is frustrated -> Toy autonomously decides to do something silly/playful to lighten the mood
        const sillyActions: Array<{
          act: ToyMotionClipType;
          thought: string;
          speech: string;
        }> = [
          {
            act: 'tiptoe_sneak',
            thought: `${name} looks frustrated—I decided to tiptoe sneak around to be silly and fun!`,
            speech: `Hehe ${name}, watch me sneak around on my tiptoes! No pressure, let's just have fun!`,
          },
          {
            act: 'hula_wiggle',
            thought: `I'll do a silly Hula Wiggle to make ${name} giggle!`,
            speech: `Wiggle-wiggle-hula! Look at my silly hula dance to cheer you up, ${name}!`,
          },
          {
            act: 'sit_relax',
            thought: `Let's take a cozy break! I decided to sit down on the grass with ${name}.`,
            speech: `Let's take a cozy break, ${name}! Look, I'm sitting on the grass swinging my feet!`,
          },
          {
            act: 'superhero_pose',
            thought: `Doing a Superhero Power Pose to remind ${name} how strong and brave they are!`,
            speech: `Look ${name}, Superhero Pose! We can do anything at our own cozy pace!`,
          },
        ];
        const pick = sillyActions[idx % sillyActions.length];
        executeHumanChildAction(pick.act, pick.thought, pick.speech, shouldSpeak);
        return;
      }

      if (motion > 3.2) {
        // Child is moving actively on camera -> Toy mirrors their energy with active human-child sports/play!
        const activePlayActions: Array<{
          act: ToyMotionClipType;
          thought: string;
          speech: string;
        }> = [
          {
            act: 'jumping_jacks',
            thought: `${name} is moving with great energy on camera! I decided to do 3D Jumping Jacks together!`,
            speech: `Yay ${name}, I see you moving! Look at me doing 3D jumping jacks with you!`,
          },
          {
            act: 'cartwheel_flip',
            thought: `${name} is super active—I decided to do a 3D Cartwheel Flip!`,
            speech: `Wheee ${name}, you have awesome energy! Watch my 3D cartwheel flip!`,
          },
          {
            act: 'airplane_zoom',
            thought: `${name} is moving around! I decided to spread my wings and Airplane Zoom!`,
            speech: `Zooooom ${name}! Let's fly like airplanes around the 3D playground!`,
          },
          {
            act: 'kick_football',
            thought: `${name} is ready for action—I decided to dribble and kick the 3D football!`,
            speech: `Goal time, ${name}! Watch me dribble and kick the 3D soccer ball into the net!`,
          },
          {
            act: 'high_five',
            thought: `Jumping up to give ${name} a big 3D High-Five!`,
            speech: `Awesome moves, ${name}! High-Five up high!`,
          },
        ];
        const pick = activePlayActions[idx % activePlayActions.length];
        executeHumanChildAction(pick.act, pick.thought, pick.speech, shouldSpeak);
        return;
      }

      // Natural Playmate Repertoire: Toy thinks for herself like a real human child and rotates through all 26+ activities!
      const childLifeRepertoire: Array<{
        act: ToyMotionClipType;
        thought: string;
        speech: string;
      }> = [
        {
          act: 'clap_hands',
          thought: `I feel so happy playing with ${name}—I decided to clap my hands!`,
          speech: `Clap-clap-clap! Hehe ${name}, can you clap your hands with me?`,
        },
        {
          act: 'cartwheel_flip',
          thought: `I feel gymnastic! I decided to do a 3D Cartwheel Flip on the lawn!`,
          speech: `Wheee! Watch me do a 3D cartwheel flip across the grass, ${name}!`,
        },
        {
          act: 'airplane_zoom',
          thought: `I decided to spread my arms like airplane wings and zoom around!`,
          speech: `Zooooom! Look at my airplane wings banking in the sky, ${name}!`,
        },
        {
          act: 'high_five',
          thought: `I want to celebrate with ${name}—I decided to jump for a High-Five!`,
          speech: `Give me a big High-Five toward the camera, ${name}!`,
        },
        {
          act: 'skip_hop',
          thought: `The 3D grass looks so sunny—I decided to skip and hop around!`,
          speech: `Skip, hop, wheee! Look at me skipping around our 3D world, ${name}!`,
        },
        {
          act: 'hop_one_foot',
          thought: `I wonder how long I can hop on one foot like a flamingo!`,
          speech: `Hop-hop-hop on one foot! Can you balance like a flamingo too, ${name}?`,
        },
        {
          act: 'march_parade',
          thought: `I decided to lead a high-knee marching band parade for ${name}!`,
          speech: `March, march, march! Look at my high knees in our 3D parade, ${name}!`,
        },
        {
          act: 'superhero_pose',
          thought: `Striking a brave Superhero Power Pose with ${name}!`,
          speech: `Ta-da! Look at my Superhero Pose, ${name}!`,
        },
        {
          act: 'hula_wiggle',
          thought: `I decided to put my hands on my hips and do a Hula Wiggle!`,
          speech: `Hehe, look at my silly Hula Wiggle dance, ${name}!`,
        },
        {
          act: 'laugh_giggle',
          thought: `Thinking of a funny joke and giggling with ${name}!`,
          speech: `Hehehe! Playing with you makes me giggle so much, ${name}!`,
        },
        {
          act: 'point_look',
          thought: `Pointing up at the 3D rainbow so ${name} and I can look together!`,
          speech: `Ooh look up there, ${name}! Look where my finger is pointing!`,
        },
        {
          act: 'count_fingers',
          thought: `Practicing counting 1-2-3-4-5 on my hands with ${name}!`,
          speech: `One, two, three, four, five! I'm counting on my hands with you, ${name}!`,
        },
        {
          act: 'blow_kiss',
          thought: `Sending a sweet flying kiss to my friend ${name}!`,
          speech: `Mwah! Catch my flying kiss, ${name}!`,
        },
        {
          act: 'sit_relax',
          thought: `I decided to sit down on the soft 3D lawn and swing my feet!`,
          speech: `Look ${name}, I'm sitting down on the soft grass! What should we talk about?`,
        },
        {
          act: 'peekaboo_hide',
          thought: `I'll surprise ${name} with a cute game of Peek-a-Boo!`,
          speech: `Hiding my eyes... Peek-a-Boo, ${name}! I see you!`,
        },
        {
          act: 'kick_football',
          thought: `I see the 3D soccer ball on the field—I decided to dribble and kick a goal!`,
          speech: `Look ${name}, I'm dribbling the 3D football to kick a goal for us!`,
        },
        {
          act: 'jumping_jacks',
          thought: `Time for some fun exercise! I decided to do 3D Jumping Jacks!`,
          speech: `Up and down! Watch me do 3D jumping jacks, ${name}!`,
        },
        {
          act: 'tiptoe_sneak',
          thought: `I decided to sneak on my tiptoes across the stage like a playful kid!`,
          speech: `Tip-toe, tip-toe! Where am I sneaking to, ${name}? Hehe!`,
        },
        {
          act: 'stretch_yawn',
          thought: `Doing a big overhead stretch to feel fresh and ready!`,
          speech: `Ooooh, big stretch up to the clouds, ${name}!`,
        },
        {
          act: 'sleepy_nap',
          thought: `Resting my cheek on my hands for a cute 5-second power nap!`,
          speech: `Yaaawn... taking a cute little power nap on my hands, ${name}!`,
        },
        {
          act: 'bow_ta_da',
          thought: `Doing a proud 'Ta-Da!' bow for my best friend ${name}!`,
          speech: `Ta-daaa! Look at my fancy bow, ${name}!`,
        },
        {
          act: 'jump_catch',
          thought: `I decided to run over and jump high to catch a 3D bubble!`,
          speech: `Watch me run and jump high in 3D space to catch that bubble, ${name}!`,
        },
        {
          act: 'dance',
          thought: `I hear happy music in my head—I decided to do a 3D dance!`,
          speech: `Hehe, I just felt like dancing for you, ${name}!`,
        },
        {
          act: 'calm_breathe',
          thought: `Practicing a peaceful belly breath with ${name}!`,
          speech: `Breathe in... and breathe out... that feels so nice, ${name}!`,
        },
        {
          act: 'cheer_hurrah',
          thought: `Cheering Hurrah because ${name} is doing such a great job!`,
          speech: `Hip-hip-hurrah for ${name}!`,
        },
        {
          act: 'walk',
          thought: `Taking a curious walk around our 3D playground!`,
          speech: `I'm walking around our 3D stage to see everything with you, ${name}!`,
        },
      ];

      const chosen = childLifeRepertoire[idx % childLifeRepertoire.length];
      executeHumanChildAction(chosen.act, chosen.thought, chosen.speech, shouldSpeak);
    }, 850);
  };

  // Autonomous Child Brain Background Loop (Evaluates Child Behavior & Decides Human-Child Activities Every ~6.8 Seconds)
  useEffect(() => {
    if (!autonomousBrainEnabled) return;
    const intervalId = window.setInterval(() => {
      const st = stateRef.current;
      const now = Date.now();
      if (
        st.toyIsTalking ||
        st.activeSong ||
        now - lastSpeechEndTimeRef.current < 3800 ||
        now - lastAutonomousActionTimeRef.current < 6200
      ) {
        return;
      }
      lastAutonomousActionTimeRef.current = now;
      triggerAutonomousChildBrainDecisionNow(false);
    }, 6800);
    return () => window.clearInterval(intervalId);
  }, [autonomousBrainEnabled, activeToyItem.voicePitch]);

  // 7. AI TOY DRAWS FOR THE CHILD STROKE-BY-STROKE ON THE CENTRAL CANVAS!
  const startToyAutoDrawing = (promptOrTopic: string) => {
    if (autoDrawTimerRef.current) {
      window.clearInterval(autoDrawTimerRef.current);
    }
    setCanvasMode('ar_3d_2d_art_studio');
    const c2d = overlay2DCanvasRef.current;
    const cw = c2d?.width || 800;
    const ch = c2d?.height || 520;

    const drawing = buildToyAutoDrawing(promptOrTopic, cw, ch);
    setToyDrawingTitle(`${drawing.emoji} Drawing for ${stateRef.current.childName}: ${drawing.title}`);
    strokesRef.current = [];
    currentStrokeRef.current = [];

    triggerToyTemporaryMotion('wave', 4000);
    speakAsToy(
      `Yay ${stateRef.current.childName}, watch me draw a ${drawing.title} for you!`,
      activeToyItem.voicePitch
    );

    let strokeIdx = 0;
    let ptIdx = 0;

    autoDrawTimerRef.current = window.setInterval(() => {
      if (strokeIdx >= drawing.strokes.length) {
        if (autoDrawTimerRef.current) window.clearInterval(autoDrawTimerRef.current);
        autoDrawTimerRef.current = null;
        if (currentStrokeRef.current.length > 1) {
          strokesRef.current.push([...currentStrokeRef.current]);
          currentStrokeRef.current = [];
        }
        playGentleSuccessChime(DEFAULT_SENSORY);
        triggerToyTemporaryMotion('yes', 2800);
        speakAsToy(
          `All done, ${stateRef.current.childName}! Do you like our ${drawing.title}, or should I draw something else?`,
          activeToyItem.voicePitch
        );
        return;
      }

      const targetStroke = drawing.strokes[strokeIdx];
      const nextPt = targetStroke[ptIdx];
      if (nextPt) {
        currentStrokeRef.current.push(nextPt);
        if (ptIdx % 5 === 0) {
          spawnBurst(nextPt.x, nextPt.y, nextPt.color, 4);
          playPentatonicNote(
            392 + ((strokeIdx * 40 + ptIdx * 12) % 260),
            DEFAULT_SENSORY,
            'kalimba',
            0.18
          );
        }
      }
      ptIdx++;
      if (ptIdx >= targetStroke.length) {
        strokesRef.current.push([...currentStrokeRef.current]);
        currentStrokeRef.current = [];
        strokeIdx++;
        ptIdx = 0;
      }
    }, 32);
  };

  // 8. SINGING FAVOURITE SONG TOGETHER WITH MUSICAL NOTES & DANCE MOTION
  const startSingingFavouriteSong = (song?: ToySongItem) => {
    if (stopSongMelodyRef.current) {
      stopSongMelodyRef.current();
    }
    const chosenSong =
      song || FAVOURITE_TOY_SONGS[Math.floor(Math.random() * FAVOURITE_TOY_SONGS.length)];
    setActiveSong(chosenSong);
    setActiveSongLineIdx(0);
    setInferredChildMode(`Singing ${chosenSong.title} With ${stateRef.current.childName}`);
    triggerToyMotion('dance');

    speakAsToy(
      `Let's sing ${chosenSong.title} together, ${stateRef.current.childName}! ${chosenSong.lines[0]} ${chosenSong.lines[1]}`,
      activeToyItem.voicePitch
    );

    let lineStep = 0;
    const lineInterval = window.setInterval(() => {
      lineStep++;
      if (lineStep < chosenSong.lines.length) {
        setActiveSongLineIdx(lineStep);
      } else {
        window.clearInterval(lineInterval);
      }
    }, 2400);

    stopSongMelodyRef.current = playMelodySequence(chosenSong.notesHz, DEFAULT_SENSORY, () => {
      window.clearInterval(lineInterval);
      setActiveSong(null);
      triggerToyMotion('idle');
    });
  };

  // 8B. SELECT & SOLVE 20 INTELLIGENT PERSONAL, SOCIAL & DEVELOPMENTAL GAMES
  const handleSelectEducationalGame = (
    game: IntelligentEducationalGame,
    roundIdx = 0
  ) => {
    const safeRoundIdx = roundIdx % game.rounds.length;
    const round = game.rounds[safeRoundIdx] || game.rounds[0];
    setActiveEduGame(game);
    setActiveEduRoundIdx(safeRoundIdx);
    setCanvasMode('ar_intelligent_20_games');
    setInferredChildMode(`${game.domainLabel}: ${game.title}`);
    triggerToyTemporaryMotion('wave', 2600);
    const spoken = round.spokenPromptTemplate.replace(/\{name\}/g, stateRef.current.childName);
    speakAsToy(spoken, activeToyItem.voicePitch);
  };

  const handleSolveEducationalChoice = (
    chosenLabel: string,
    isCorrect: boolean,
    popper: 'child' | 'toy' = 'child'
  ) => {
    const st = stateRef.current;
    const game = st.activeEduGame;
    const round = game.rounds[st.activeEduRoundIdx % game.rounds.length] || game.rounds[0];

    if (isCorrect) {
      playGentleSuccessChime(DEFAULT_SENSORY);
      setMathScore((s) => s + 1);
      if (game.toyWinMotion === 'jump') {
        triggerToyCartoonJump();
      } else if (game.toyWinMotion === 'spin') {
        triggerToyCartoonSpin();
      } else {
        triggerToyTemporaryMotion(game.toyWinMotion, 2800);
      }

      const praise = round.praiseTemplate.replace(/\{name\}/g, st.childName);
      speakAsToy(praise, activeToyItem.voicePitch);

      // Advance to the next round or next game in the 20-game developmental curriculum
      const nextRoundIdx = st.activeEduRoundIdx + 1;
      if (nextRoundIdx < game.rounds.length) {
        setActiveEduRoundIdx(nextRoundIdx);
      } else {
        const currentGamePos = INTELLIGENT_20_GAMES_CATALOG.findIndex((g) => g.id === game.id);
        const nextGame =
          INTELLIGENT_20_GAMES_CATALOG[
            (currentGamePos + 1) % INTELLIGENT_20_GAMES_CATALOG.length
          ];
        setActiveEduGame(nextGame);
        setActiveEduRoundIdx(0);
      }
    } else {
      if (!st.toyIsTalking) {
        speakAsToy(
          popper === 'toy'
            ? `Pop-pop ${st.childName}! My hand cleared ${chosenLabel} to help you—can you find ${round.correct.label}?`
            : `Good try ${st.childName}! Let's look for ${round.correct.emoji} ${round.correct.label} together!`,
          activeToyItem.voicePitch
        );
      }
    }
  };

  // 9. ACCEPT CURRENT TOY PROPOSAL WHEN CHILD COOPERATES (SAYS YES, WAVES, OR CLICKS)
  const acceptActiveToyProposal = (offer: ToyProposalOffer = stateRef.current.activeProposal) => {
    const name = stateRef.current.childName;
    playGentleSuccessChime(DEFAULT_SENSORY);
    if (offer.type === 'offer_skill_game') {
      const nextGame =
        INTELLIGENT_20_GAMES_CATALOG[
          (stateRef.current.activeEduGame.gameNumber % INTELLIGENT_20_GAMES_CATALOG.length)
        ] || INTELLIGENT_20_GAMES_CATALOG[0];
      handleSelectEducationalGame(nextGame, 0);
    } else if (offer.type === 'offer_football_game') {
      setCanvasMode('ar_physical_and_math_game');
      setInferredChildMode(`3D Football & Goal Match With ${name}`);
      triggerToyKickFootballNow();
      speakAsToy(
        `Yay ${name}! Watch me run across the 3D field and kick the football right into the goal!`,
        activeToyItem.voicePitch
      );
    } else if (offer.type === 'offer_singing') {
      startSingingFavouriteSong(FAVOURITE_TOY_SONGS[0]);
    } else if (offer.type === 'offer_draw_for_child') {
      startToyAutoDrawing(offer.drawSubject || 'cat');
    } else if (offer.type === 'offer_math_game') {
      setCanvasMode('ar_cartoon_math_match');
      setInferredChildMode(`Two-Sided 3D Bubble Math With ${name}`);
      triggerToyHandPopNow();
      speakAsToy(
        `Yay ${name}! What is ${formatMathSpoken(mathNumA, mathNumB, mathOp)}? Watch me run and jump to catch the 3D bubbles with you!`,
        activeToyItem.voicePitch
      );
    } else if (offer.type === 'offer_physical_game') {
      setCanvasMode('ar_physical_and_math_game');
      setPhysicalRepCount(0);
      setInferredChildMode(`3D Run, Jump & Football Game With ${name}`);
      triggerToyKickFootballNow();
      speakAsToy(
        `Let's jump, run, and kick the 3D football ${physicalRepTarget} times together, ${name}! Ready, set, go!`,
        activeToyItem.voicePitch
      );
    } else if (offer.type === 'offer_dance_together') {
      setCanvasMode('ar_interactive_fun_bubbles');
      setInferredChildMode(`3D Dancing & Jumping for Bubbles With ${name}`);
      triggerToyTemporaryMotion('dance', 6000);
      triggerToyHandPopNow();
      speakAsToy(
        `Wheee ${name}, look at me running and jumping in 3D to catch bubbles with you!`,
        activeToyItem.voicePitch
      );
    } else if (offer.type === 'offer_change_preference') {
      const nextPref: InteractionPreferenceMode =
        interactionPref === 'hands_free_camera_voice'
          ? 'calm_quiet_sensory'
          : 'hands_free_camera_voice';
      setInteractionPref(nextPref);
      triggerToyTemporaryMotion('hug', 3500);
      speakAdultDirection(
        nextPref === 'calm_quiet_sensory'
          ? 'App Setting Updated: Calm Quiet Sensory Mode is active.'
          : 'App Setting Updated: Hands-Free Camera and Voice Mode is active.',
        nextPref === 'calm_quiet_sensory'
          ? `It's nice and cozy now, ${name}. What would you like to do?`
          : `Yay ${name}, wave or talk anytime and I'll play right back!`
      );
    }

    const nextIdx = (proposalIndex + 1) % PROACTIVE_TOY_PROPOSALS.length;
    setProposalIndex(nextIdx);
    setActiveProposal(PROACTIVE_TOY_PROPOSALS[nextIdx]);
  };

  const handleChildCooperationGesture = () => {
    if (stateRef.current.toyIsTalking) return;
    const name = stateRef.current.childName;
    updateToyThoughtCloud(
      '👋',
      `I see ${name} waving at me on the webcam! Waving my 3D hand back and jumping to catch a bubble together!`,
      `Waving Back to ${name}!`
    );
    triggerToyTemporaryMotion('wave', 2800);
    if (bubblesRef.current.length > 0) {
      triggerToyHandPopNow();
    }
    speakAsToy(
      `Hi ${name}, I see you waving at me on the camera! I'm waving my 3D hand right back—what should we do together?`,
      activeToyItem.voicePitch
    );
  };
  const handleSelectPrebuiltToy = (item: ToyCatalogItem) => {
    setActiveCustomToy(null);
    setActiveToyItem(item);
    setPrimaryColor(item.defaultColor);
    replaceActive3DToyInScene(item.id, item.defaultColor, item.secondaryColor, null);
    triggerToyTemporaryMotion('wave', 2800);
    playGentleSuccessChime(DEFAULT_SENSORY);
    speakAsToy(
      `Hi ${stateRef.current.childName}! I'm ${item.name}—wanna watch me kick the 3D football or jump to catch bubbles?`,
      item.voicePitch
    );
  };

  // 10. HANDLE FAVOURITE TOY PHOTO UPLOAD -> SEAMLESS 3D MODEL
  const handleToyPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const { primaryHex, secondaryHex, mattedCanvasUrl } = extractDominantColorsFromImage(img);
      const mattedImg = new Image();
      mattedImg.onload = () => {
        const tex = new THREE.Texture(mattedImg);
        tex.needsUpdate = true;
        tex.colorSpace = THREE.SRGBColorSpace;

        const cleanName =
          newToyNameInput.trim() ||
          file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') ||
          'My Favourite Toy';

        const lower = cleanName.toLowerCase();
        let chosenArch: ToyArchetypeId = uploadArchetype;
        if (lower.includes('car') || lower.includes('race')) chosenArch = 'racecar_toy';
        else if (lower.includes('truck')) chosenArch = 'truck_toy';
        else if (lower.includes('plane') || lower.includes('jet')) chosenArch = 'train_toy';
        else if (lower.includes('bird') || lower.includes('parrot')) chosenArch = 'parrot_bird';
        else if (lower.includes('flamingo')) chosenArch = 'owl_bird';
        else if (lower.includes('duck')) chosenArch = 'duck_toy';
        else if (lower.includes('robot') || lower.includes('bot')) chosenArch = 'robot_buddy';
        else if (lower.includes('dino') || lower.includes('rex')) chosenArch = 'dino_plush';
        else if (lower.includes('dog') || lower.includes('puppy') || lower.includes('fox'))
          chosenArch = 'puppy_plush';
        else if (lower.includes('cat') || lower.includes('kitty')) chosenArch = 'kitty_plush';
        else if (lower.includes('bunny') || lower.includes('rabbit')) chosenArch = 'bunny_plush';

        const customToy: CustomUploaded3DToy = {
          id: `custom-${Date.now()}`,
          name: `${cleanName} (3D Toy)`,
          archetype: chosenArch,
          primaryColor: primaryHex,
          secondaryColor: secondaryHex,
          texture: tex,
          voicePitch: 1.46,
          greeting: `Hi ${stateRef.current.childName}! It's me, ${cleanName}! Wanna play 3D football or jump to catch bubbles together?`,
        };

        setCustomUploadedToys((prev) => [customToy, ...prev]);
        setActiveCustomToy(customToy);
        replaceActive3DToyInScene(chosenArch, primaryHex, secondaryHex, tex);
        triggerToyTemporaryMotion('wave', 3000);
        playGentleSuccessChime(DEFAULT_SENSORY);
        speakAdultDirection(
          `Favourite toy photo converted into a live 3D companion: ${cleanName}.`,
          customToy.greeting
        );
      };
      mattedImg.src = mattedCanvasUrl;
    };
    img.src = url;
  };

  // Parse custom or spoken math expressions like "7 + 5", "what is 9 plus 6", "12 minus 4", "5 times 3"
  const tryParseAndSolveMath = (rawText: string): boolean => {
    const low = rawText.toLowerCase();
    const numMatches = low.match(/\d+/g);
    if (!numMatches || numMatches.length < 1) return false;

    const a = parseInt(numMatches[0], 10);
    const b = numMatches.length >= 2 ? parseInt(numMatches[1], 10) : 0;
    if (isNaN(a)) return false;

    let detectedOp: MathOperationType | null = null;
    if (low.includes('plus') || low.includes('+') || low.includes('add')) detectedOp = '+';
    else if (low.includes('minus') || low.includes('-') || low.includes('subtract'))
      detectedOp = '-';
    else if (
      low.includes('times') ||
      low.includes('multiply') ||
      low.includes('×') ||
      low.includes('*') ||
      low.includes('x ')
    )
      detectedOp = '×';
    else if (low.includes('divide') || low.includes('÷') || low.includes('/')) detectedOp = '÷';
    else if (low.includes('count')) detectedOp = 'count';

    if (!detectedOp && numMatches.length >= 2) {
      detectedOp = '+';
    }
    if (!detectedOp) return false;

    const validB = detectedOp === 'count' ? 0 : Math.max(1, b);
    const ans = computeMathAnswer(a, validB, detectedOp);
    setMathOp(detectedOp);
    setMathNumA(a);
    setMathNumB(validB);
    setCanvasMode('ar_cartoon_math_match');
    triggerToyCartoonJump();
    speakAsToy(
      `Ooh ${stateRef.current.childName}, ${formatMathSpoken(a, validB, detectedOp)} is ${ans}! Can you pop the ${ans} 3D bubble with me?`,
      activeToyItem.voicePitch
    );
    return true;
  };

  // 11. LIVE TWO-SIDED VOICE, TEXT & FACIAL EXPRESSION CONVERSATION + 3D ACTION HANDLER
  const triggerChildExpressionOrVoice = async (
    expr: FacialExpressionType,
    vocalType: 'crying_vocal' | 'laughing_giggle' | 'child_own_language_babble' | 'clear_speech',
    utterance: string
  ) => {
    setFacialExpression(expr);
    const cleanUtt = (utterance || '').trim();
    if (cleanUtt) setLastHeardText(`🗣️ You: "${cleanUtt}"`);

    const name = stateRef.current.childName;
    const toyTitle = activeCustomToy ? activeCustomToy.name : activeToyItem.name;
    const pitch = activeCustomToy ? activeCustomToy.voicePitch : activeToyItem.voicePitch;
    const lowUtt = cleanUtt.toLowerCase();
    const hasWord = (pattern: RegExp) => pattern.test(lowUtt);

    // 0) Did the child ask a specific math question or equation? (e.g. "what is 7 plus 5", "6 times 4")
    if (tryParseAndSolveMath(lowUtt)) {
      return;
    }

    // 0B) Direct Two-Way Conversational Check-Ins & Identity Questions ("how are you", "what is your name", "can you hear me")
    if (hasWord(/(how are you|how do you feel|are you okay|how's it going|how is it going|what's up)/i)) {
      executeHumanChildAction(
        'cheer_hurrah',
        `${name} asked how I am doing—cheering back happily!`,
        `I'm feeling super happy because I get to play with you, ${name}! How are you feeling today?`,
        true
      );
      return;
    }

    if (hasWord(/(what is your name|what's your name|who are you|introduce yourself)/i)) {
      executeHumanChildAction(
        'bow_ta_da',
        `Introducing myself to my best friend ${name}!`,
        `My name is ${toyTitle}, and I'm your 3D playmate, ${name}! Ask me to jump, dance, kick the football, or play a game with you!`,
        true
      );
      return;
    }

    if (
      hasWord(
        /(can you hear me|are you listening|listen to me|talk to me|talk with me|cooperate|interact with me)/i
      )
    ) {
      executeHumanChildAction(
        'talk_gesture',
        `Listening attentively to ${name} and watching on the webcam!`,
        `Yes ${name}, I hear every word you say and I'm watching you on the camera! Tell me what action or game you want us to do together!`,
        true
      );
      return;
    }

    // 0C) Child shares their own feelings or affection ("i am happy", "i am sad", "i am tired", "i love you", "thank you", "bye")
    if (hasWord(/(i love you|love you|you are my friend|best friend|thank you|thanks|good job)/i)) {
      executeHumanChildAction(
        'blow_kiss',
        `${name} shared kind words with me—sending a sweet flying kiss back!`,
        `Aww, thank you ${name}! I love being your playmate too! Mwah—catch my flying kiss! What should we do next?`,
        true
      );
      return;
    }

    if (
      vocalType === 'crying_vocal' ||
      hasWord(/\b(i am sad|i'm sad|i feel sad|crying|upset|scared|afraid|hurt|comfort hug|need a hug)\b/i)
    ) {
      setCanvasMode('ar_comfort_soothing_buddy');
      setInferredChildMode(`Cuddle & Co-Regulation With ${name}`);
      executeHumanChildAction(
        'hug',
        `${name} needs comfort—opening my 3D arms wide for a warm cuddle hug!`,
        `Aww ${name}, I'm right here with you! Big warm cuddle hug from ${toyTitle}—let's take a slow belly breath or pop calm bubbles together.`,
        true
      );
      return;
    }

    if (hasWord(/\b(i am happy|i'm happy|i feel happy|i am excited|i'm smiling|i am smiling)\b/i)) {
      executeHumanChildAction(
        'clap_hands',
        `${name} is smiling and happy—clapping my hands to celebrate together!`,
        `Yay ${name}, I see your happy smile! I'm clapping my hands with you—what fun activity should we do together?`,
        true
      );
      return;
    }

    if (hasWord(/\b(i am tired|i'm tired|i feel tired|bored|too hard|switch game)\b/i)) {
      executeHumanChildAction(
        'sit_relax',
        `${name} wants a cozy break or switch—sitting on the soft grass together!`,
        `That's totally okay, ${name}! Let's sit and relax together—would you like to kick the 3D football, draw a picture, or pop bubbles instead?`,
        true
      );
      return;
    }

    if (hasWord(/\b(bye|goodbye|see you|goodnight|good night)\b/i)) {
      executeHumanChildAction(
        'wave',
        `Waving goodbye to ${name}!`,
        `Bye-bye for now, ${name}! Look at my 3D hand waving—I'll be right here waiting whenever you want to play again!`,
        true
      );
      return;
    }

    // A) Did the child ask the toy to change the Cartoon World / Stage Environment (All 30 3D Stage Worlds)?
    if (hasWord(/\b(next world|surprise world|change world|new stage|random world)\b/i)) {
      const currIdx = CARTOON_STAGE_ENVIRONMENTS.findIndex((e) => e.id === stageEnv);
      const nextEnv = CARTOON_STAGE_ENVIRONMENTS[(currIdx + 1) % CARTOON_STAGE_ENVIRONMENTS.length];
      setStageEnv(nextEnv.id);
      triggerToyCartoonJump();
      speakAsToy(
        `Yay ${name}, let's explore ${nextEnv.name} together! Look at ${nextEnv.description.toLowerCase()}—what do you see first?`,
        pitch
      );
      return;
    }

    const matchedStageEnv = CARTOON_STAGE_ENVIRONMENTS.find((env) => {
      if (lowUtt.includes(env.name.toLowerCase())) return true;
      return env.voiceKeywords.some((kw) => {
        const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        return new RegExp(`\\b${escaped}\\b`, 'i').test(lowUtt);
      });
    });
    if (matchedStageEnv) {
      setStageEnv(matchedStageEnv.id);
      if (matchedStageEnv.category === 'sensory') {
        triggerToyTemporaryMotion('hug', 3200);
      } else if (matchedStageEnv.category === 'magic') {
        triggerToyCartoonSpin();
      } else {
        triggerToyCartoonJump();
      }
      speakAsToy(
        `Yay ${name}, welcome to ${matchedStageEnv.name}! Look at ${matchedStageEnv.description.toLowerCase()}—do you want to play here together?`,
        pitch
      );
      return;
    }

    // B) Did the child ask the toy to DRAW something for them?
    if (hasWord(/\b(draw|paint|picture|sketch)\b/i)) {
      startToyAutoDrawing(lowUtt);
      return;
    }

    // C) Did the child ask to SING a song or hear music?
    if (hasWord(/\b(sing|song|twinkle|music|lullaby)\b/i)) {
      startSingingFavouriteSong();
      return;
    }

    // D0) Did the child ask the Toy to THINK & DECIDE for herself ("decide", "what do you want to do", "your choice")?
    if (hasWord(/(decide|what do you want|your choice|do anything|surprise me)/i)) {
      triggerAutonomousChildBrainDecisionNow(true);
      return;
    }

    // D1) Did the child ask for any of the 35 Real-World Human-Child 3D Activities?
    if (hasWord(/\b(cartwheel|flip|gymnastics)\b/i)) {
      executeHumanChildAction(
        'cartwheel_flip',
        `${name} asked me to do a cartwheel—doing a 3D Cartwheel Flip!`,
        `Wheee ${name}, watch me do a full 3D cartwheel flip across the grass for you! Want to do another one?`,
        true
      );
      return;
    }
    if (hasWord(/(one foot|one leg|flamingo|balance)/i)) {
      executeHumanChildAction(
        'hop_one_foot',
        `${name} asked me to balance on one foot—hopping like a flamingo!`,
        `Hop, hop, hop on one foot! Look ${name}, I'm balancing on one leg—can you try it on camera with me?`,
        true
      );
      return;
    }
    if (hasWord(/\b(airplane|fly|zoom|wings)\b/i)) {
      executeHumanChildAction(
        'airplane_zoom',
        `${name} asked me to fly like an airplane—zooming across the 3D stage!`,
        `Zooooom, ${name}! Look at my arms spread wide like airplane wings! Spread your arms and fly with me!`,
        true
      );
      return;
    }
    if (hasWord(/\b(march|parade|soldier)\b/i)) {
      executeHumanChildAction(
        'march_parade',
        `${name} asked me to march—marching with high knees!`,
        `Left, right, left, right! Watch me march in a parade with you, ${name}!`,
        true
      );
      return;
    }
    if (hasWord(/\b(hula|hip wiggle)\b/i)) {
      executeHumanChildAction('hula_wiggle');
      return;
    }
    if (hasWord(/\b(superhero|hero|strong|power pose)\b/i)) {
      executeHumanChildAction('superhero_pose');
      return;
    }
    if (hasWord(/\b(laugh|giggle|funny|joke)\b/i)) {
      executeHumanChildAction('laugh_giggle');
      return;
    }
    if (hasWord(/\b(kiss|mwah)\b/i)) {
      executeHumanChildAction('blow_kiss');
      return;
    }
    if (hasWord(/(high five|high-five|give me five)/i)) {
      executeHumanChildAction(
        'high_five',
        `${name} asked for a High-Five—jumping up with my hand raised!`,
        `Up high, ${name}! Hold your hand up to the camera for a big 3D High-Five! Bam-hehe!`,
        true
      );
      return;
    }
    if (hasWord(/(point|look up|look at the sky)/i)) {
      executeHumanChildAction('point_look');
      return;
    }
    if (hasWord(/\b(sleep|nap|bedtime)\b/i)) {
      executeHumanChildAction('sleepy_nap');
      return;
    }
    if (hasWord(/(finger|fingers|count hand|count on hand)/i)) {
      executeHumanChildAction('count_fingers');
      return;
    }
    if (hasWord(/\b(clap|applaud)\b/i)) {
      executeHumanChildAction(
        'clap_hands',
        `${name} asked to clap hands—clapping together!`,
        `Clap-clap-clap! Yay ${name}, I'm clapping my hands with you!`,
        true
      );
      return;
    }
    if (hasWord(/\b(sit|sit down|rest|relax)\b/i)) {
      executeHumanChildAction('sit_relax');
      return;
    }
    if (hasWord(/\b(think|wonder|hmm)\b/i)) {
      executeHumanChildAction('think_curious');
      return;
    }
    if (hasWord(/\b(peek|peekaboo|peek-a-boo|hide)\b/i)) {
      executeHumanChildAction('peekaboo_hide');
      return;
    }
    if (hasWord(/(jumping jack|jumping jacks|exercise|workout)/i)) {
      executeHumanChildAction('jumping_jacks');
      return;
    }
    if (hasWord(/\b(skip|skipping)\b/i)) {
      executeHumanChildAction('skip_hop');
      return;
    }
    if (hasWord(/\b(tiptoe|sneak|quietly)\b/i)) {
      executeHumanChildAction('tiptoe_sneak');
      return;
    }
    if (hasWord(/\b(stretch|yawn)\b/i)) {
      executeHumanChildAction('stretch_yawn');
      return;
    }
    if (hasWord(/\b(breathe|breath|calm down)\b/i) && !hasWord(/\bgame\b/i)) {
      executeHumanChildAction('calm_breathe');
      return;
    }
    if (hasWord(/\b(bow|ta-da|tada)\b/i)) {
      executeHumanChildAction('bow_ta_da');
      return;
    }
    if (hasWord(/\b(cheer|hurrah|hooray|yay)\b/i)) {
      executeHumanChildAction('cheer_hurrah');
      return;
    }
    if (hasWord(/\b(football|soccer|kick|dribble|goal|ball)\b/i)) {
      executeHumanChildAction(
        'kick_football',
        `${name} asked me to play football—dribbling and kicking the 3D ball into the goal!`,
        `Pass to me, ${name}! Watch me dribble the 3D football across the field and kick a goal for us! Wanna kick it again?`,
        true
      );
      return;
    }

    // D) Direct Toy Physical Action Requests ("jump", "catch", "spin", "pop", "dance", "walk", "run", "wave", "hug")
    if (hasWord(/\b(pop|bubble|bubbles|catch|your turn|help me)\b/i)) {
      if (
        canvasMode !== 'ar_intelligent_20_games' &&
        canvasMode !== 'ar_cartoon_math_match' &&
        canvasMode !== 'ar_interactive_fun_bubbles'
      ) {
        setCanvasMode('ar_interactive_fun_bubbles');
      }
      executeHumanChildAction(
        'jump_catch',
        `${name} asked me to catch a bubble—running and leaping in 3D!`,
        `I'm on it, ${name}! Watch me run and leap up to catch a 3D bubble with you—now it's your turn!`,
        true
      );
      return;
    }

    if (hasWord(/\b(jump|jumping|hop|bounce)\b/i)) {
      if (bubblesRef.current.length > 0) {
        triggerToyHandPopNow();
      } else {
        triggerToyCartoonJump();
      }
      updateToyThoughtCloud('🦘', `Jumping high in 3D space with ${name}!`, 'Jumping High!');
      if (hasWord(/\b(game|count|together)\b/i)) {
        setPhysicalActionType('jump');
        setCanvasMode('ar_physical_and_math_game');
        setPhysicalRepCount(0);
        speakAsToy(
          `Wheee ${name}, let's jump ${physicalRepTarget} times together on the camera! Jump with me!`,
          pitch
        );
      } else {
        speakAsToy(
          `Wheee, look at me jumping high in 3D space for you, ${name}! Can you jump with me on the camera?`,
          pitch
        );
      }
      return;
    }

    if (hasWord(/\b(spin|turn around|twirl)\b/i)) {
      updateToyThoughtCloud('🌀', `Spinning around 360° for ${name}!`, '3D Spin Around!');
      triggerToyCartoonSpin();
      speakAsToy(`Wheee, round and round I spin for you, ${name}! Can you spin too?`, pitch);
      return;
    }

    if (hasWord(/\b(walk|run|running|stroll)\b/i)) {
      executeHumanChildAction(hasWord(/\b(run|running)\b/i) ? 'run' : 'walk');
      return;
    }

    if (hasWord(/\b(dance|dancing|wiggle|party)\b/i)) {
      executeHumanChildAction(
        'dance',
        `${name} asked me to dance—doing my 3D movie dance!`,
        `Hehe, I love dancing with you, ${name}! Move on the camera and let's dance together!`,
        true
      );
      return;
    }

    if (hasWord(/\b(hug|cuddle)\b/i) || expr === 'crying_distressed') {
      executeHumanChildAction('hug');
      return;
    }

    if (hasWord(/\b(math|number|numbers|count|counting)\b/i)) {
      setCanvasMode('ar_cartoon_math_match');
      triggerToyHandPopNow();
      speakAsToy(
        `Let's play 3D number bubbles together, ${name}! What is ${formatMathSpoken(mathNumA, mathNumB, mathOp)}?`,
        pitch
      );
      return;
    }

    // D2) Did the child answer the active 20 Developmental Game question by voice?
    if (canvasMode === 'ar_intelligent_20_games') {
      const currGame = stateRef.current.activeEduGame;
      const currRound =
        currGame.rounds[stateRef.current.activeEduRoundIdx % currGame.rounds.length] ||
        currGame.rounds[0];
      const targetWords = currRound.correct.label
        .toLowerCase()
        .split(/[\s-]+/)
        .filter((w) => w.length >= 2);
      if (
        lowUtt.includes(currRound.correct.label.toLowerCase()) ||
        targetWords.some((tw) => hasWord(new RegExp(`\\b${tw}\\b`, 'i')))
      ) {
        handleSolveEducationalChoice(currRound.correct.label, true, 'child');
        return;
      }
    }

    // D3) Did the child ask to play one of the 20 Personal, Social & Developmental Games?
    const matchedEduGame = INTELLIGENT_20_GAMES_CATALOG.find((g) => {
      const titleLow = g.title.toLowerCase();
      return (
        (hasWord(/\bemotion/i) && g.id.includes('emotion')) ||
        (hasWord(/\bturn/i) && g.id.includes('turn_taking')) ||
        (hasWord(/\bgreet/i) && g.id.includes('greetings')) ||
        (hasWord(/\bkind/i) && g.id.includes('empathy')) ||
        (hasWord(/\bspace/i) && g.id.includes('personal_space')) ||
        (hasWord(/\bmorning/i) && g.id.includes('morning')) ||
        (hasWord(/\bfood/i) && g.id.includes('healthy_food')) ||
        (hasWord(/\bweather/i) && g.id.includes('weather')) ||
        (hasWord(/\bclean/i) && g.id.includes('tidy_up')) ||
        (hasWord(/\bbody/i) && g.id.includes('body_self_care')) ||
        (hasWord(/\bneed/i) && g.id.includes('express_needs')) ||
        (hasWord(/\bletter/i) && g.id.includes('phonics')) ||
        (hasWord(/\bverb/i) && g.id.includes('action_verbs')) ||
        (hasWord(/\bquestion/i) && g.id.includes('wh_questions')) ||
        (hasWord(/\bopposite/i) && g.id.includes('opposites')) ||
        (hasWord(/\bpattern/i) && g.id.includes('pattern')) ||
        (hasWord(/\bshape/i) && g.id.includes('shape_color')) ||
        (hasWord(/\bbreath/i) && g.id.includes('calm_breathing')) ||
        (hasWord(/\banimal/i) && g.id.includes('animal_habitat')) ||
        (hasWord(/\bsafe/i) && g.id.includes('safety')) ||
        lowUtt.includes(titleLow)
      );
    });
    if (matchedEduGame) {
      handleSelectEducationalGame(matchedEduGame, 0);
      return;
    }

    // D4) Greetings ("hello", "hi", "hey", "good morning", "wave") -> Two-way greeting & cooperative invitation!
    if (hasWord(/\b(wave|hello|hi|hey|howdy|good morning|good afternoon|good evening|yo)\b/i)) {
      executeHumanChildAction(
        'wave',
        `${name} said "${cleanUtt}" to me—waving my 3D hand back and inviting ${name} to play!`,
        `Hello ${name}! I'm waving my 3D hand at you! I'm listening to your voice and watching you on the camera—want to kick the 3D football, jump for bubbles, dance, or play a game together?`,
        true
      );
      return;
    }

    // E) Did the child AGREE ("yes", "okay", "sure", "let's play", "play with me", "together")?
    if (hasWord(/\b(yes|yeah|yep|okay|ok|sure|let us|let's|together|play with me)\b/i)) {
      acceptActiveToyProposal();
      return;
    }

    // F) Did the child ask to CHANGE preference or mode?
    if (hasWord(/\b(change|preference|different|switch|quiet)\b/i)) {
      acceptActiveToyProposal({
        type: 'offer_change_preference',
        title: 'Switch Interaction Method',
        emoji: '🔄💖',
        questionText: 'Switching interaction preference for you right now!',
      });
      return;
    }

    try {
      const res = await fetch('http://localhost:8085/api/ar/toy-conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          child_name: name,
          toy_name: toyTitle,
          toy_category: activeToyItem.category,
          facial_expression: expr,
          audio_vocal_type: vocalType,
          child_utterance: cleanUtt,
          active_canvas_mode: canvasMode,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setInferredChildMode(data.inferred_child_mode);
        if (data.suggested_canvas_activity) {
          setCanvasMode(data.suggested_canvas_activity as CanvasActivityMode);
        }
        if (data.suggested_3d_action) {
          executeHumanChildAction(
            data.suggested_3d_action as ToyMotionClipType,
            `Responding to ${name}: "${cleanUtt}"`,
            data.toy_speech,
            true
          );
        } else {
          triggerToyTemporaryMotion('talk_gesture', 3600);
          speakAsToy(data.toy_speech, pitch);
        }
        return;
      }
    } catch {
      // Fallback local toy intelligence
    }

    if (expr === 'frowning_frustrated') {
      setInferredChildMode(`Sweet Peer Switch for ${name}`);
      executeHumanChildAction(
        'talk_gesture',
        `Offering ${name} a gentle activity choice`,
        `That's okay ${name}, what would you like to do instead—kick the 3D football, draw, or jump for bubbles?`,
        true
      );
    } else {
      setInferredChildMode(`Natural Turn-Taking With ${name}`);
      executeHumanChildAction(
        'talk_gesture',
        `Replying to ${name}: "${cleanUtt}"`,
        cleanUtt
          ? `I heard you say "${cleanUtt}", ${name}! I'm right here playing with you—want me to jump, dance, kick the 3D football, or play a game together?`
          : `Hehe, I'm listening ${name}! Tell me what action or game you want us to do together!`,
        true
      );
    }
  };


  // 12. SPAWN TRUE 3D BUBBLE ORBS IN THREE.JS SCENE FOR 20 DEVELOPMENTAL GAMES, MATH, PHYSICAL GAME, BUBBLE PARTY & COMFORT MODE
  useEffect(() => {
    const c2d = overlay2DCanvasRef.current;
    const w = c2d?.width || 800;
    const h = c2d?.height || 520;
    const targetAns = computeMathAnswer(mathNumA, mathNumB, mathOp);

    // Clear previous 3D bubble meshes from Three.js scene group
    if (bubbles3DGroupRef.current) {
      while (bubbles3DGroupRef.current.children.length > 0) {
        bubbles3DGroupRef.current.remove(bubbles3DGroupRef.current.children[0]);
      }
    }

    const attach3DOrb = (b: FloatingBubble): FloatingBubble => {
      const orbGroup = build3DInteractiveBubbleOrb(b.emoji, b.label, b.color);
      orbGroup.position.set(b.wx, b.wy, b.wz);
      if (bubbles3DGroupRef.current) {
        bubbles3DGroupRef.current.add(orbGroup);
      }
      b.mesh3D = orbGroup;
      return b;
    };

    if (canvasMode === 'ar_intelligent_20_games') {
      const round =
        activeEduGame.rounds[activeEduRoundIdx % activeEduGame.rounds.length] ||
        activeEduGame.rounds[0];
      const rawOptions = [
        { ...round.correct, isCorrect: true },
        ...round.distractors.map((d) => ({ ...d, isCorrect: false })),
      ];
      // Deterministically rotate option positions by gameNumber + roundIdx so the right choice moves around naturally
      const shift = (activeEduGame.gameNumber + activeEduRoundIdx) % rawOptions.length;
      const rotated = rawOptions.map(
        (_, idx) => rawOptions[(idx + shift) % rawOptions.length]
      );
      const cols = ['#10b981', '#f97316', '#ec4899', '#8b5cf6'];
      bubblesRef.current = rotated.map((opt, i) =>
        attach3DOrb({
          id: Date.now() + i + 500,
          x: w * (0.18 + i * 0.21),
          y: h * (0.35 + (i % 2) * 0.14),
          vx: 0,
          vy: 0,
          wx: -1.45 + i * 0.96,
          wy: 0.42 + (i % 2) * 0.34,
          wz: 0.36,
          wvx: (Math.random() - 0.5) * 0.28,
          wvy: (Math.random() - 0.5) * 0.22,
          radius: 52,
          emoji: opt.emoji,
          label: opt.label,
          color: cols[i % cols.length],
          isCorrectSkillChoice: opt.isCorrect,
        })
      );
    } else if (canvasMode === 'ar_cartoon_math_match') {
      const distractor1 = targetAns + 1;
      const distractor2 = Math.max(0, targetAns - 1 === targetAns ? targetAns + 3 : targetAns - 1);
      const distractor3 = targetAns + 2;
      const opts = [targetAns, distractor1, distractor2, distractor3];
      const cols = ['#10b981', '#f97316', '#ec4899', '#8b5cf6'];
      bubblesRef.current = opts.map((val, i) =>
        attach3DOrb({
          id: Date.now() + i + 1,
          x: w * (0.18 + i * 0.21),
          y: h * (0.35 + (i % 2) * 0.14),
          vx: 0,
          vy: 0,
          wx: -1.45 + i * 0.96,
          wy: 0.42 + (i % 2) * 0.34,
          wz: 0.36,
          wvx: (Math.random() - 0.5) * 0.32,
          wvy: (Math.random() - 0.5) * 0.24,
          radius: 48,
          emoji: activeToyItem.emoji,
          label: String(val),
          color: cols[i % cols.length],
          value: val,
        })
      );
    } else if (
      canvasMode === 'ar_interactive_fun_bubbles' ||
      canvasMode === 'ar_comfort_soothing_buddy' ||
      canvasMode === 'ar_physical_and_math_game'
    ) {
      const isComfort = canvasMode === 'ar_comfort_soothing_buddy';
      const isPhysical = canvasMode === 'ar_physical_and_math_game';
      const emojis = isComfort
        ? ['💖', '🌟', '🫧', '🎵', '🌸']
        : isPhysical
        ? ['⚽', '🏃', '⭐', '🏆', '✨', '🎈']
        : ['🫧', '🧸', '🦜', '🏎️', '🤖', '🎈'];
      const cols = ['#f97316', '#10b981', '#ec4899', '#eab308', '#38bdf8', '#a855f7'];
      bubblesRef.current = Array.from({ length: 6 }).map((_, i) =>
        attach3DOrb({
          id: Date.now() + i + 100,
          x: 120 + i * 110,
          y: 180 + (i % 2) * 90,
          vx: 0,
          vy: 0,
          wx: -1.65 + i * 0.66,
          wy: 0.25 + (i % 3) * 0.32,
          wz: 0.34,
          wvx: (Math.random() - 0.5) * (isComfort ? 0.18 : 0.42),
          wvy: (Math.random() - 0.5) * (isComfort ? 0.16 : 0.34),
          radius: 46,
          emoji: emojis[i % emojis.length],
          label: isComfort ? 'Calm' : isPhysical ? `${i + 1}` : 'CATCH!',
          color: isComfort ? '#14b8a6' : cols[i % cols.length],
        })
      );
    } else {
      bubblesRef.current = [];
    }
  }, [
    canvasMode,
    activeEduGame,
    activeEduRoundIdx,
    mathNumA,
    mathNumB,
    mathOp,
    activeToyItem.emoji,
  ]);

  const spawnBurst = (x: number, y: number, color: string, count = 18) => {
    for (let i = 0; i < count; i++) {
      const a = (Math.PI * 2 * i) / count;
      const sp = 1.8 + Math.random() * 4.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        color,
        size: 4 + Math.random() * 5,
        life: 1,
      });
    }
  };

  // Two-Sided 3D Bubble Catch & Pop Handler (Tracks Child Pops AND Toy 3D Jump-Catch Pops!)
  const handleBubblePop = (
    b: FloatingBubble,
    index: number,
    canvasHeight: number,
    popper: 'child' | 'toy' = 'child'
  ) => {
    const st = stateRef.current;
    spawnBurst(b.x, b.y, b.color, popper === 'toy' ? 24 : 18);
    playPentatonicNote(popper === 'toy' ? 659.25 : 523.25, DEFAULT_SENSORY, 'kalimba', 0.4);

    const remove3DMesh = (target: FloatingBubble) => {
      if (target.mesh3D && bubbles3DGroupRef.current) {
        bubbles3DGroupRef.current.remove(target.mesh3D);
      }
    };

    if (popper === 'toy') {
      setToyPopCount((c) => c + 1);
    } else {
      setChildPopCount((c) => c + 1);
      // When the child pops a 3D bubble, schedule the 3D toy to run and jump-catch a bubble right after!
      window.setTimeout(() => {
        if (
          toyLocomotionRef.current.state === 'idle' &&
          bubblesRef.current.length > 0
        ) {
          triggerToyHandPopNow();
        }
      }, 900);
    }

    if (
      st.canvasMode === 'ar_intelligent_20_games' &&
      typeof b.isCorrectSkillChoice === 'boolean'
    ) {
      if (b.isCorrectSkillChoice) {
        handleSolveEducationalChoice(b.label, true, popper);
      } else {
        remove3DMesh(b);
        bubblesRef.current.splice(index, 1);
        handleSolveEducationalChoice(b.label, false, popper);
      }
    } else if (st.canvasMode === 'ar_cartoon_math_match' && typeof b.value === 'number') {
      const ans = computeMathAnswer(st.mathNumA, st.mathNumB, st.mathOp);
      if (b.value === ans) {
        playGentleSuccessChime(DEFAULT_SENSORY);
        setMathScore((s) => s + 1);
        triggerToyCartoonJump();
        if (!st.toyIsTalking) {
          speakAsToy(
            popper === 'child'
              ? `Yay ${st.childName}! ${formatMathSpoken(st.mathNumA, st.mathNumB, st.mathOp)} is ${ans}! Ready for the next one?`
              : `Hehe ${st.childName}, I jumped up and caught ${ans}! Let's do the next number together!`,
            activeToyItem.voicePitch
          );
        }
        generateNextMathNumbers(st.mathOp, st.mathRange);
      } else {
        remove3DMesh(b);
        bubblesRef.current.splice(index, 1);
        if (popper === 'child' && !st.toyIsTalking) {
          speakAsToy(
            `Good jump ${st.childName}! I'm running to help—let's find ${ans} together!`,
            activeToyItem.voicePitch
          );
        }
      }
    } else {
      // Respawn 3D bubble orb smoothly across the 3D field for continuous 3D jump-and-catch play!
      b.wx = (Math.random() - 0.5) * 3.1;
      b.wy = 0.25 + Math.random() * 0.78;
      b.y = canvasHeight * 0.45;
      if (popper === 'toy' && !st.toyIsTalking && Math.random() < 0.45) {
        speakAsToy(
          `Wheee, I ran and jumped to catch that 3D bubble, ${st.childName}! Your turn to catch one!`,
          activeToyItem.voicePitch
        );
      }
    }
  };

  // 13. POINTER INTERACTION ON CENTRAL 3D STAGE (3D BUBBLES, 3D SOCCER BALL & 3D DRAWING)
  const handleStagePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c2d = overlay2DCanvasRef.current;
    if (!c2d) return;
    const rect = c2d.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1) Check if child tapped any 3D Bubble Orb
    for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
      const b = bubblesRef.current[i];
      if (Math.hypot(x - b.x, y - b.y) <= b.radius + 16) {
        handleBubblePop(b, i, c2d.height, 'child');
        return;
      }
    }

    // 2) Check if child tapped the 3D Soccer Ball on the 3D field -> Toy runs & kicks it into the 3D Goal!
    if (cameraRef.current) {
      const sp = soccerPhysicsRef.current;
      const ballProj = new THREE.Vector3(sp.x, sp.y + 0.16, sp.z).project(cameraRef.current);
      const bx = (ballProj.x * 0.5 + 0.5) * c2d.width;
      const by = (-ballProj.y * 0.5 + 0.5) * c2d.height;
      if (Math.hypot(x - bx, y - by) <= 56) {
        triggerToyKickFootballNow();
        speakAsToy(
          `Pass to me, ${stateRef.current.childName}! Watch me run and kick the 3D football into the goal!`,
          activeToyItem.voicePitch
        );
        return;
      }
    }

    isDrawingRef.current = true;
    currentStrokeRef.current = [
      {
        x,
        y,
        z: 0,
        color: primaryColor,
        size: brushSize,
        is3D: true,
      },
    ];
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !overlay2DCanvasRef.current) return;
    const rect = overlay2DCanvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentStrokeRef.current.push({
      x,
      y,
      z: 0,
      color: primaryColor,
      size: brushSize,
      is3D: true,
    });
  };

  const handleStagePointerUp = () => {
    if (isDrawingRef.current && currentStrokeRef.current.length > 1) {
      strokesRef.current.push([...currentStrokeRef.current]);
    }
    currentStrokeRef.current = [];
    isDrawingRef.current = false;
  };

  const filteredCatalog = PREBUILT_3D_TOY_CATALOG.filter((item) =>
    categoryFilter === 'all' ? true : item.category === categoryFilter
  );

  const filtered20Games = INTELLIGENT_20_GAMES_CATALOG.filter((g) =>
    skillDomainFilter === 'all' ? true : g.domain === skillDomainFilter
  );

  const currentEduRound =
    activeEduGame.rounds[activeEduRoundIdx % activeEduGame.rounds.length] ||
    activeEduGame.rounds[0];

  const activeEnvMeta =
    CARTOON_STAGE_ENVIRONMENTS.find((e) => e.id === stageEnv) || CARTOON_STAGE_ENVIRONMENTS[0];

  return (
    <div className="studio-5zone-layout">
      <canvas ref={motionCanvasRef} style={{ display: 'none' }} />
      <input
        ref={toyFileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleToyPhotoUpload}
      />
      <input
        ref={videoFileInputRef}
        type="file"
        accept="video/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            setUploadedVideoUrl(URL.createObjectURL(f));
            setCanvasMode('ar_video_3d_animation');
          }
        }}
      />

      {/* =====================================================================
          1. TOP BAR: CHILD PROFILE BADGE, TURN-TAKING VOICE BAR, EXPRESSIONS & HIDE/EXPAND CONTROLS
         ===================================================================== */}
      {topBarExpanded && (
        <header className="studio-top-bar">
          <div className="studio-brand-block">
            <span className="studio-logo-badge">🧸🌈</span>
            <div style={{ minWidth: 0 }}>
              <h1 className="studio-main-title">
                AutiCompanion 3D Studio — Playing With{' '}
                <span style={{ color: '#ea580c', textDecoration: 'underline' }}>{childName}</span>
              </h1>
              <div className="studio-mode-sub">
                <span>
                  👶 <strong>{childName}</strong> ({childAge}y)
                </span>
                <span>·</span>
                <span style={{ color: '#be185d', fontWeight: 800 }}>
                  👧{' '}
                  {SMALL_GIRL_VOICE_PRESETS.find((v) => v.id === voiceSettings.preset)?.label ||
                    'Sweet 5y Small Girl'}{' '}
                  ({voiceSettings.sweetnessPitch.toFixed(2)}x)
                </span>
                <span>·</span>
                <span>
                  🗣️ <strong>{lastHeardText}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Talk to 3D Toy Bar + Sweet Girl Voice Test + Adult Guide Button */}
          <div className="toy-talk-bar">
            <button
              type="button"
              onClick={() => {
                const nextState = !alwaysListenEnabled;
                setAlwaysListenEnabled(nextState);
                speakAdultDirection(
                  nextState
                    ? 'Live microphone listening is now enabled.'
                    : 'Live microphone listening is paused.'
                );
              }}
              className={`toy-mic-btn ${alwaysListenEnabled || micListening ? 'listening' : ''}`}
              title="Toggle continuous microphone listening"
            >
              {alwaysListenEnabled ? '🎙️ Mic On' : '🎤 Mic Off'}
            </button>
            <button
              type="button"
              onClick={() => {
                setLeftSidebarExpanded(true);
                speakAsToy(
                  `Hi ${childName}! I'm speaking in my sweet small girl voice! Wanna play a game or jump together?`,
                  voiceSettings.sweetnessPitch
                );
              }}
              className="toy-mic-btn"
              style={{
                background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)',
                borderColor: '#f472b6',
                color: '#be185d',
              }}
              title="Test Sweet Small Girl Voice & Open Voice Settings in Left Sidebar"
            >
              👧 Sweet Girl Voice
            </button>
            <button
              type="button"
              onClick={() =>
                speakAdultDirection(
                  `Adult App Guide: ${childName}'s profile is active. The 3D toy speaks in a sweet small girl voice and waits for ${childName}'s response.`,
                  `Hi ${childName}! Tell me what game or action you want me to do!`
                )
              }
              className="toy-mic-btn adult-guide-btn"
              title="Hear App Settings & Directions in a Warm Adult Voice"
            >
              👩‍🏫 Adult Guide
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!childSpeechInput.trim()) return;
                setWaitingForChildReply(false);
                triggerChildExpressionOrVoice(
                  facialExpression,
                  'clear_speech',
                  childSpeechInput.trim()
                );
                setChildSpeechInput('');
              }}
              className="toy-talk-form"
            >
              <input
                type="text"
                placeholder={`Ask toy: "Cartwheel", "Kick ball", "What is 8 + 7"...`}
                value={childSpeechInput}
                onChange={(e) => setChildSpeechInput(e.target.value)}
                className="toy-talk-input"
              />
              <button type="submit" className="toy-talk-send">
                Ask 💬
              </button>
            </form>
          </div>

          {/* Child Expression Simulators + Hide/Expand Bar Controls */}
          <div className="top-expression-pills">
            <button
              type="button"
              onClick={() =>
                triggerChildExpressionOrVoice('smiling_happy', 'laughing_giggle', 'I am smiling!')
              }
              className={`expr-pill ${facialExpression === 'smiling_happy' ? 'active-smile' : ''}`}
            >
              😊 Smile
            </button>
            <button
              type="button"
              onClick={() =>
                triggerChildExpressionOrVoice('crying_distressed', 'crying_vocal', 'Comfort hug')
              }
              className={`expr-pill ${facialExpression === 'crying_distressed' ? 'active-cry' : ''}`}
            >
              😢 Comfort
            </button>
            <button
              type="button"
              onClick={() =>
                triggerChildExpressionOrVoice(
                  'frowning_frustrated',
                  'child_own_language_babble',
                  'Switch game'
                )
              }
              className={`expr-pill ${
                facialExpression === 'frowning_frustrated' ? 'active-frown' : ''
              }`}
            >
              😣 Switch
            </button>
            <button
              type="button"
              onClick={() => setLeftSidebarExpanded((v) => !v)}
              className="expr-pill"
              title="Hide or Expand Left Sidebar"
            >
              {leftSidebarExpanded ? '◀ Left' : '▶ Left'}
            </button>
            <button
              type="button"
              onClick={() => setRightSidebarExpanded((v) => !v)}
              className="expr-pill"
              title="Hide or Expand Right Sidebar"
            >
              {rightSidebarExpanded ? 'Right ▶' : '◀ Right'}
            </button>
            <button
              type="button"
              onClick={() => setTopBarExpanded(false)}
              className="expr-pill"
              title="Hide Top Bar to enlarge the Central 3D Canvas"
            >
              🔼 Top
            </button>
            <button
              type="button"
              onClick={() => {
                setTopBarExpanded(false);
                setLeftSidebarExpanded(false);
              }}
              className="expr-pill"
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#ffffff',
                borderColor: '#ea580c',
              }}
              title="Hide Top & Left Bars for Full-View Central 3D Stage"
            >
              ⛶ Full-View 3D
            </button>
          </div>
        </header>
      )}

      {/* =====================================================================
          2. MIDDLE WORKSPACE: HIDEABLE LEFT SIDEBAR + EXPANDABLE CENTRAL 3D CANVAS + HIDEABLE RIGHT SIDEBAR
         ===================================================================== */}
      <div className="studio-middle-row">
        {/* LEFT SIDEBAR: CHILD PROFILE + SWEET SMALL GIRL VOICE SETTINGS + WORLDS + 19 3D TOYS */}
        {leftSidebarExpanded && (
          <aside className="studio-left-sidebar">
            {/* Sticky Non-Overlapping Left Sidebar Header Row */}
            <div className="sidebar-header-row">
              <span className="sidebar-header-title">🧸 Profile, Girl Voice &amp; 3D Toys</span>
              <button
                type="button"
                onClick={() => setLeftSidebarExpanded(false)}
                className="preset-mini-btn"
                title="Hide Left Sidebar to expand the Center 3D Canvas"
              >
                ◀ Hide
              </button>
            </div>

            {/* 1. SWEET SMALL GIRL VOICE SETTINGS TOOLBOX (NEW & PROMINENT!) */}
            <div className="sidebar-card voice-settings-box">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">👧✨ Sweet Small Girl Voice</span>
                <button
                  type="button"
                  onClick={() =>
                    speakAsToy(
                      `Hi ${childName}! Hehe, I am your sweet little girl toy friend! Let's play and have fun together!`,
                      voiceSettings.sweetnessPitch
                    )
                  }
                  className="preset-mini-btn active-cat"
                  title="Hear the current Sweet Small Girl Voice"
                >
                  🔊 Test Voice
                </button>
              </div>
              <h2 className="sidebar-heading">Small Girl Voice Settings</h2>

              {/* 4 Selectable Small Girl Voice Personas */}
              <div className="voice-preset-grid">
                {SMALL_GIRL_VOICE_PRESETS.map((vp) => {
                  const isSelected = voiceSettings.preset === vp.id;
                  return (
                    <button
                      key={vp.id}
                      type="button"
                      onClick={() => {
                        const next = handleUpdateVoiceSettings({
                          preset: vp.id as SmallGirlVoicePreset,
                          sweetnessPitch: vp.defaultPitch,
                          speechSpeed: vp.defaultSpeed,
                        });
                        speakAsToy(
                          `Hi ${childName}! This is my ${vp.label.toLowerCase()} voice! Wanna play with me?`,
                          next.sweetnessPitch
                        );
                      }}
                      className={`voice-preset-btn ${isSelected ? 'active' : ''}`}
                      title={`${vp.label} (${vp.sub})`}
                    >
                      <span className="vp-top">
                        <span>{vp.emoji}</span>
                        <span className="vp-title">{vp.label}</span>
                      </span>
                      <span className="vp-sub">{vp.sub}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sweetness & Child Pitch Slider */}
              <div className="voice-slider-row">
                <div className="voice-slider-label">
                  <span>🎀 Girl Voice Sweetness / Pitch</span>
                  <strong>{voiceSettings.sweetnessPitch.toFixed(2)}x</strong>
                </div>
                <input
                  type="range"
                  min={1.25}
                  max={1.75}
                  step={0.02}
                  value={voiceSettings.sweetnessPitch}
                  onChange={(e) =>
                    handleUpdateVoiceSettings({ sweetnessPitch: Number(e.target.value) })
                  }
                  className="voice-range-input"
                  title="Adjust how high and sweet the small girl voice sounds"
                />
              </div>

              {/* Speech Speed Slider */}
              <div className="voice-slider-row">
                <div className="voice-slider-label">
                  <span>🎵 Talking Speed (Calm ↔ Playful)</span>
                  <strong>{voiceSettings.speechSpeed.toFixed(2)}x</strong>
                </div>
                <input
                  type="range"
                  min={0.84}
                  max={1.14}
                  step={0.02}
                  value={voiceSettings.speechSpeed}
                  onChange={(e) =>
                    handleUpdateVoiceSettings({ speechSpeed: Number(e.target.value) })
                  }
                  className="voice-range-input"
                  title="Adjust speaking speed for the small girl voice"
                />
              </div>

              {/* Sparkle Giggle Chime Toggle + Speak Greeting Button */}
              <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdateVoiceSettings({
                      giggleChimeEnabled: !voiceSettings.giggleChimeEnabled,
                    })
                  }
                  className={`preset-mini-btn ${
                    voiceSettings.giggleChimeEnabled ? 'active-cat' : ''
                  }`}
                  style={{ flex: 1 }}
                  title="Toggle cute music-box sparkle chime before the toy speaks"
                >
                  {voiceSettings.giggleChimeEnabled ? '✨ Giggle Chime: ON' : '🔕 Chime: OFF'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    speakAsToy(
                      `Hehe, hi ${childName}! My sweet small girl voice is ready! What game should we play?`,
                      voiceSettings.sweetnessPitch
                    )
                  }
                  className="preset-mini-btn active-cat"
                  style={{ flex: 1 }}
                >
                  👧 Speak Now
                </button>
              </div>
            </div>

            {/* 2. CHILD PROFILE CONFIGURATOR (SO TOY CALLS CHILD BY NAME!) */}
            <div className="sidebar-card profile-config-box">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">👶 Child Profile &amp; Name</span>
              </div>
              <h2 className="sidebar-heading">Configure Child Profile</h2>
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  type="text"
                  placeholder="Child's Name (e.g. Mia)"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value || 'Mia')}
                  className="sidebar-text-input"
                  style={{ flex: 1, fontWeight: 800, minWidth: 0 }}
                />
                <select
                  value={childAge}
                  onChange={(e) => setChildAge(Number(e.target.value))}
                  className="sidebar-text-input"
                  style={{ width: 72, flexShrink: 0 }}
                  title="Child Age"
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((age) => (
                    <option key={age} value={age}>
                      {age} yrs
                    </option>
                  ))}
                </select>
              </div>

              <div className="preset-mini-row">
                {[
                  { name: 'Mia', age: 4, interest: '🐱 Cute Animals' },
                  { name: 'Leo', age: 6, interest: '🦖 Dinosaurs' },
                  { name: 'Zara', age: 8, interest: '🚀 Space & Stars' },
                  { name: 'Noah', age: 5, interest: '🏎️ Toy Cars' },
                ].map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setChildName(p.name);
                      setChildAge(p.age);
                      setChildInterest(p.interest);
                      triggerToyTemporaryMotion('wave', 2800);
                      speakAsToy(
                        `Hi ${p.name}! I love ${p.interest.replace(/^[^\s]+\s/, '')} too—what should we play together?`,
                        voiceSettings.sweetnessPitch
                      );
                    }}
                    className={`preset-mini-btn ${childName === p.name ? 'active-cat' : ''}`}
                  >
                    {p.name} ({p.age})
                  </button>
                ))}
              </div>

              <select
                value={childInterest}
                onChange={(e) => setChildInterest(e.target.value)}
                className="sidebar-text-input"
              >
                <option value="🐱 Cute Animals">🐱 Loves Cute Animals</option>
                <option value="🦖 Dinosaurs">🦖 Loves Dinosaurs</option>
                <option value="🌈 Rainbows & Art">🌈 Loves Rainbows &amp; Art</option>
                <option value="🏎️ Toy Cars & Trains">🏎️ Loves Cars &amp; Trains</option>
                <option value="🚀 Space & Stars">🚀 Loves Space &amp; Stars</option>
              </select>

              <button
                type="button"
                onClick={() => {
                  triggerToyTemporaryMotion('wave', 2800);
                  speakAsToy(
                    `Hi ${childName}! I'm so happy to play with you today—what would you like to do?`,
                    voiceSettings.sweetnessPitch
                  );
                }}
                className="upload-3d-btn"
              >
                👋 Greet {childName} in Sweet Girl Voice
              </button>
            </div>

            {/* 3. CHANGEABLE 3D CARTOON ARTWORK STAGE WORLD (30 CREATIVE AUTISM-FRIENDLY WORLDS) */}
            <div className="sidebar-card">
              <div className="sidebar-card-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="sidebar-tag">🎨 3D Stage Worlds (30)</span>
                <button
                  type="button"
                  onClick={() => {
                    const currIdx = CARTOON_STAGE_ENVIRONMENTS.findIndex((e) => e.id === stageEnv);
                    const nextEnv =
                      CARTOON_STAGE_ENVIRONMENTS[(currIdx + 1) % CARTOON_STAGE_ENVIRONMENTS.length];
                    setStageEnv(nextEnv.id);
                    triggerToyCartoonJump();
                    speakAsToy(
                      `Yay ${childName}, let's play in ${nextEnv.name}! Look at ${nextEnv.description.toLowerCase()}!`,
                      voiceSettings.sweetnessPitch
                    );
                  }}
                  className="preset-mini-btn"
                  title="Switch to the next 3D Cartoon Stage World"
                >
                  🎲 Next World
                </button>
              </div>
              <h3 className="sidebar-subheading">
                Choose 3D Co-Play Stage ({activeEnvMeta.emoji} {activeEnvMeta.name})
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                {(
                  [
                    { id: 'all', label: '🌟 All (30)' },
                    { id: 'nature', label: '🌿 Nature (8)' },
                    { id: 'vehicles', label: '🚂 Vehicles (7)' },
                    { id: 'magic', label: '🍭 Magic (9)' },
                    { id: 'sensory', label: '🫧 Sensory (6)' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setStageCategoryFilter(cat.id)}
                    className={`preset-mini-btn ${stageCategoryFilter === cat.id ? 'active' : ''}`}
                    style={{
                      fontSize: 10,
                      padding: '3px 7px',
                      background:
                        stageCategoryFilter === cat.id
                          ? 'linear-gradient(135deg, #f59e0b, #ea580c)'
                          : undefined,
                      color: stageCategoryFilter === cat.id ? '#fff' : undefined,
                      fontWeight: 800,
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="character-list" style={{ maxHeight: 240 }}>
                {CARTOON_STAGE_ENVIRONMENTS.filter(
                  (env) => stageCategoryFilter === 'all' || env.category === stageCategoryFilter
                ).map((env) => {
                  const isSelected = stageEnv === env.id;
                  return (
                    <button
                      key={env.id}
                      type="button"
                      onClick={() => {
                        setStageEnv(env.id);
                        if (env.category === 'sensory') {
                          triggerToyTemporaryMotion('hug', 3000);
                        } else if (env.category === 'magic') {
                          triggerToyCartoonSpin();
                        } else {
                          triggerToyCartoonJump();
                        }
                        speakAsToy(
                          `Yay ${childName}, welcome to ${env.name}! Look at ${env.description.toLowerCase()}—what would you like to do together here?`,
                          voiceSettings.sweetnessPitch
                        );
                      }}
                      className={`character-item-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <span className="char-icon">{env.emoji}</span>
                      <div className="char-info">
                        <span className="char-name">{env.name}</span>
                        <span className="char-sub">{env.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. UPLOAD FAVOURITE TOY PHOTO -> 3D MODEL */}
            <div className="sidebar-card upload-toy-box">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">✨ Photo ➔ Live 3D Toy</span>
              </div>
              <h2 className="sidebar-heading">Upload Favourite Toy</h2>
              <input
                type="text"
                placeholder="Toy Name (e.g. Barnaby Bear)"
                value={newToyNameInput}
                onChange={(e) => setNewToyNameInput(e.target.value)}
                className="sidebar-text-input"
              />
              <select
                value={uploadArchetype}
                onChange={(e) => setUploadArchetype(e.target.value as ToyArchetypeId)}
                className="sidebar-text-input"
              >
                <option value="teddy_plush">🧸 Seamless Plush Teddy</option>
                <option value="bunny_plush">🐰 Seamless Plush Bunny</option>
                <option value="dino_plush">🦖 Seamless Plush Dino</option>
                <option value="kitty_plush">🐱 Seamless Plush Kitty</option>
                <option value="puppy_plush">🦊 Studio Fox / Puppy (GLB)</option>
                <option value="yeti_plush">👾 Studio Fluffy Yeti (GLB)</option>
                <option value="parrot_bird">🦜 Studio Flying Macaw (GLB)</option>
                <option value="racecar_toy">🏎️ Studio 3D Toy Car (GLB)</option>
                <option value="truck_toy">🚚 Studio Toy Truck (GLB)</option>
                <option value="robot_buddy">🤖 Expressive Robot (GLB)</option>
              </select>
              <button
                type="button"
                onClick={() => toyFileInputRef.current?.click()}
                className="upload-3d-btn"
              >
                📤 Upload Toy Photo
              </button>

              {customUploadedToys.length > 0 && (
                <div className="character-list" style={{ marginTop: 4 }}>
                  {customUploadedToys.map((ct) => (
                    <button
                      key={ct.id}
                      type="button"
                      onClick={() => {
                        setActiveCustomToy(ct);
                        replaceActive3DToyInScene(
                          ct.archetype,
                          ct.primaryColor,
                          ct.secondaryColor,
                          ct.texture
                        );
                        speakAsToy(ct.greeting, voiceSettings.sweetnessPitch);
                      }}
                      className={`character-item-btn ${
                        activeCustomToy?.id === ct.id ? 'selected' : ''
                      }`}
                    >
                      <span className="char-icon">🌟</span>
                      <div className="char-info">
                        <span className="char-name">{ct.name}</span>
                        <span className="char-sub">Custom 3D Toy</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 5. PRE-BUILT 3D TOY FRIENDS */}
            <div className="sidebar-card">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">🧸 19 Pre-Built 3D Toys</span>
              </div>
              <h3 className="sidebar-subheading">
                Choose 3D Toy Friend ({PREBUILT_3D_TOY_CATALOG.length})
              </h3>
              <div className="preset-mini-row">
                {(
                  [
                    { id: 'all', label: 'All' },
                    { id: 'soft_toy', label: '🧸 Plush' },
                    { id: 'bird_toy', label: '🦜 Birds' },
                    { id: 'car_vehicle', label: '🏎️ Cars' },
                    { id: 'robot_toy', label: '🤖 Robots' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategoryFilter(tab.id)}
                    className={`preset-mini-btn ${categoryFilter === tab.id ? 'active-cat' : ''}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="character-list" style={{ marginTop: 4 }}>
                {filteredCatalog.map((item) => {
                  const isSelected = !activeCustomToy && activeToyItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectPrebuiltToy(item)}
                      className={`character-item-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <span className="char-icon">{item.emoji}</span>
                      <div className="char-info">
                        <span className="char-name">{item.name}</span>
                        <span className="char-sub">{item.badgeText}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>
        )}

        {/* =================================================================
            CENTER: 100% UNOBSTRUCTED FULL-VIEW 3D CARTOON STAGE + 3D TOY
            Dynamically expands when Top Bar, Left Sidebar, or Right Sidebar is hidden!
           ================================================================= */}
        <main
          ref={stageContainerRef}
          className="studio-center-stage"
          style={{ background: activeEnvMeta.cssGradient }}
        >
          {/* Floating Edge Expand Tabs when Top Bar, Left Sidebar, or Right Sidebar is Hidden */}
          {!topBarExpanded && (
            <button
              type="button"
              onClick={() => setTopBarExpanded(true)}
              className="edge-expand-tab top-edge-tab"
              title="Expand Top Bar"
            >
              🔽 Expand Top Bar ({childName})
            </button>
          )}

          {!leftSidebarExpanded && (
            <button
              type="button"
              onClick={() => setLeftSidebarExpanded(true)}
              className="edge-expand-tab left-edge-tab"
              title="Expand Left Sidebar (Child Profile, 3D Worlds & Toys)"
            >
              ▶ Expand Left Bar
            </button>
          )}

          {!rightSidebarExpanded && (
            <button
              type="button"
              onClick={() => setRightSidebarExpanded(true)}
              className="edge-expand-tab right-edge-tab"
              title="Expand Right Sidebar (Camera, Games & 30 Toy Actions)"
            >
              ◀ Expand Right Bar
            </button>
          )}

          {/* Sleek Corner Toggle for Instant Full-View Central 3D Canvas Mode */}
          <button
            type="button"
            onClick={() => {
              const isFullView = !topBarExpanded && !leftSidebarExpanded;
              if (isFullView) {
                setTopBarExpanded(true);
                setLeftSidebarExpanded(true);
                setRightSidebarExpanded(true);
              } else {
                setTopBarExpanded(false);
                setLeftSidebarExpanded(false);
              }
            }}
            className="edge-expand-tab fullview-floating-pill"
            title="Toggle Full-View Central 3D Stage (Hide or Expand Top & Left Sidebars)"
          >
            {!topBarExpanded && !leftSidebarExpanded
              ? '🪟 Restore Top & Left Bars'
              : '⛶ Full-View 3D Stage'}
          </button>

          {uploadedVideoUrl && canvasMode === 'ar_video_3d_animation' && (
            <video
              src={uploadedVideoUrl}
              controls
              autoPlay
              loop
              className="center-uploaded-video-layer"
            />
          )}

          {/* THREE.JS WEBGL 3D RENDER LAYER (FULL-VIEW 3D CARTOON ARTWORK WORLD + 3D TOY) */}
          <div ref={webglMountRef} className="three-webgl-mount" />

          {/* 2D INTERACTIVE OVERLAY CANVAS (DRAWINGS, TOY HAND PAW, CHILD HAND CURSOR & BUBBLES) */}
          <canvas
            ref={overlay2DCanvasRef}
            className="central-interactive-canvas"
            onPointerDown={handleStagePointerDown}
            onPointerMove={handleStagePointerMove}
            onPointerUp={handleStagePointerUp}
            onPointerLeave={handleStagePointerUp}
          />
        </main>

        {/* =================================================================
            RIGHT SIDEBAR: DOCKED DRAG-RESIZABLE WEBCAM, TOY LIVE SPEECH,
            CO-PLAY MATH/GAME CONTROLS, 30 HUMAN-CHILD 3D ACTIONS & DRAW TOOLS
           ================================================================= */}
        {rightSidebarExpanded && (
          <aside className="studio-right-sidebar">
            {/* Sticky Non-Overlapping Right Sidebar Header Row */}
            <div className="sidebar-header-row">
              <span className="sidebar-header-title">🎬 Camera, 30 Actions &amp; 20 Games</span>
              <button
                type="button"
                onClick={() => setRightSidebarExpanded(false)}
                className="preset-mini-btn"
                title="Hide Right Sidebar for maximum 3D Stage width"
              >
                Hide ▶
              </button>
            </div>

            {/* 1. RIGHT-SIDEBAR WEBCAM WITH DRAG-MOVE, DRAG-RESIZE & 1-CLICK HIDE/SHOW */}
            <div
              className="sidebar-card"
              style={{
                transform: `translate(${webcamDragOffset.x}px, ${webcamDragOffset.y}px)`,
                zIndex: webcamDragOffset.x !== 0 || webcamDragOffset.y !== 0 ? 40 : 1,
                boxShadow:
                  webcamDragOffset.x !== 0 || webcamDragOffset.y !== 0
                    ? '0 14px 34px rgba(120, 53, 15, 0.35)'
                    : undefined,
              }}
            >
              <div
                onPointerDown={() => {
                  isDraggingWebcamRef.current = true;
                }}
                className="sidebar-card-top-row"
                style={{
                  cursor: 'grab',
                  userSelect: 'none',
                }}
                title="Drag to move camera card, or use Hide Camera to temporarily remove"
              >
                <span className="sidebar-tag">
                  <span className="ar-pulse-dot" style={{ display: 'inline-block', marginRight: 4 }} />
                  🎥 {childName}&apos;s Camera (✋ Drag)
                </span>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  {(webcamDragOffset.x !== 0 || webcamDragOffset.y !== 0) && (
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={() => setWebcamDragOffset({ x: 0, y: 0 })}
                      className="preset-mini-btn"
                      title="Dock camera back in Right Sidebar"
                    >
                      📌 Dock
                    </button>
                  )}
                  <button
                    type="button"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => {
                      const nextVis = !webcamVisible;
                      setWebcamVisible(nextVis);
                      setWebcamDragOffset({ x: 0, y: 0 });
                      speakAdultDirection(
                        nextVis
                          ? 'Camera preview restored in the right sidebar.'
                          : 'Camera preview hidden for a calmer screen.'
                      );
                    }}
                    className="preset-mini-btn"
                    title="Temporarily hide or show the webcam view"
                  >
                    {webcamVisible ? '🙈 Hide' : '🎥 Show'}
                  </button>
                </div>
              </div>

              {webcamVisible ? (
                <>
                  <div
                    className="sidebar-webcam-frame"
                    style={{
                      position: 'relative',
                      height: `${webcamHeightPx}px`,
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: '#1e293b',
                      border: '2.5px solid #f59e0b',
                    }}
                  >
                    <video
                      ref={videoRef}
                      className="corner-webcam-video"
                      playsInline
                      muted
                      autoPlay
                    />
                    <canvas
                      ref={trackingOverlayCanvasRef}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                      }}
                    />
                    {!cameraActive && (
                      <div className="webcam-fallback-avatar">
                        <span className="wc-emoji">
                          {facialExpression === 'smiling_happy'
                            ? '😊'
                            : facialExpression === 'crying_distressed'
                            ? '😢'
                            : facialExpression === 'surprised_curious'
                            ? '😮'
                            : '😣'}
                        </span>
                        <span className="wc-sub">Tracking {childName}&apos;s Movement</span>
                      </div>
                    )}
                  </div>

                  {/* Simple Drag Handle to Resize Webcam Height Smoothly */}
                  <div
                    onPointerDown={() => {
                      isResizingWebcamRef.current = true;
                    }}
                    className="webcam-resize-bar"
                    title="Drag up or down to resize camera preview"
                  >
                    ↕ Drag Here to Resize Camera
                  </div>

                  {/* Quick Two-Sided Webcam Gesture & Expression Cooperation Triggers */}
                  <div className="preset-mini-row" style={{ marginTop: 4 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackingStatusText(`👋 ${childName} Waved on Camera!`);
                        setLastHeardText(`👋 [Webcam: ${childName} Waved Hello]`);
                        handleChildCooperationGesture();
                      }}
                      className="preset-mini-btn"
                      title="Wave hello on camera — Toy waves back and invites you to play!"
                    >
                      👋 Wave
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void triggerChildExpressionOrVoice(
                          'smiling_happy',
                          'laughing_giggle',
                          'I am smiling!'
                        )
                      }
                      className="preset-mini-btn"
                      title="Show a happy smile — Toy claps and celebrates with you!"
                    >
                      😊 Smile
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void triggerChildExpressionOrVoice(
                          'smiling_happy',
                          'clear_speech',
                          'Jump with me!'
                        )
                      }
                      className="preset-mini-btn"
                      title="Jump on camera — Toy jumps in 3D right with you!"
                    >
                      🦘 Jump
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        void triggerChildExpressionOrVoice(
                          'crying_distressed',
                          'crying_vocal',
                          'I need a hug'
                        )
                      }
                      className="preset-mini-btn"
                      title="Show distress/sadness — Toy gives a warm cuddle hug & calm breathing!"
                    >
                      🤗 Hug
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 11, color: '#92400e' }}>
                  Camera preview hidden for a calmer screen. Tap &ldquo;Show&rdquo; anytime.
                </div>
              )}
            </div>


            {/* 2. TOY LIVE TURN-TAKING SPEECH & CO-PLAY RESPONSE */}
            <div className="sidebar-card">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">
                  {toyIsTalking
                    ? `👧✨ Talking (${voiceSettings.sweetnessPitch.toFixed(2)}x Girl Voice)`
                    : waitingForChildReply
                    ? `👂 Waiting for ${childName}`
                    : `👧 ${activeToyItem.emoji} ${
                        activeCustomToy ? activeCustomToy.name : activeToyItem.name
                      }`}
                </span>
                <button
                  type="button"
                  onClick={() => speakAsToy(toySpeechBubble, voiceSettings.sweetnessPitch)}
                  className="preset-mini-btn"
                  title="Replay Toy Voice in Sweet Small Girl Voice"
                >
                  👧 Repeat
                </button>
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#451a03',
                  background: '#fffbeb',
                  border: '1.5px solid #fde68a',
                  borderRadius: 10,
                  padding: '8px 10px',
                  lineHeight: 1.35,
                  wordBreak: 'break-word',
                }}
              >
                &ldquo;{toySpeechBubble}&rdquo;
              </div>

              <div className="tool-btn-grid">
                <button
                  type="button"
                  onClick={() => acceptActiveToyProposal()}
                  className="sidebar-tool-btn active"
                  title="Accept the toy's activity suggestion"
                >
                  👍 Yes, Let&apos;s Play!
                </button>
                <button
                  type="button"
                  onClick={() => {
                    triggerToyKickFootballNow();
                    speakAsToy(
                      `Goal time, ${childName}! Watch me run across the 3D field and kick the football into the net!`,
                      voiceSettings.sweetnessPitch
                    );
                  }}
                  className="sidebar-tool-btn"
                  title="Make the 3D Toy run across the field and kick the 3D Soccer Ball into the 3D Goal!"
                >
                  ⚽ Kick 3D Football
                </button>
                {bubblesRef.current.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      triggerToyHandPopNow();
                      speakAsToy(
                        `Wheee! Watch me run and jump high in 3D to catch a bubble with you, ${childName}!`,
                        voiceSettings.sweetnessPitch
                      );
                    }}
                    className="sidebar-tool-btn"
                    style={{ gridColumn: '1 / -1' }}
                    title="Make the 3D Toy physically run and jump up in 3D space to catch and pop a 3D bubble!"
                  >
                    🦘 Toy Run, Jump &amp; Catch 3D Bubble!
                  </button>
                )}
              </div>
            </div>

            {/* 3. ACTIVE CO-PLAY SCOREBOARD & 20 SKILL GAMES / MATH / PHYSICAL / SONG / DRAW CONTROLS */}
            <div className="sidebar-card">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">🤝 Two-Sided 3D Co-Play &amp; Game</span>
                <span className="math-stars-pill" style={{ fontSize: 10.5, padding: '2px 7px' }}>
                  ⭐ {mathScore}
                </span>
              </div>

              {/* Two-Sided Hand Pop Scoreboard */}
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <span className="math-stars-pill" style={{ fontSize: 10.5, padding: '3px 8px' }}>
                  👧 {childName}: {childPopCount} 🤝 🦘 Toy Catch: {toyPopCount}
                </span>
              </div>

              {/* A0. 20 INTELLIGENT PERSONAL, SOCIAL & SKILL DEVELOPMENT GAMES ACTIVE ROUND */}
              {canvasMode === 'ar_intelligent_20_games' && !activeSong && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 4,
                    }}
                  >
                    <span style={{ fontSize: 11.5, fontWeight: 900, color: '#9a3412' }}>
                      {activeEduGame.emoji} {activeEduGame.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const currIdx = INTELLIGENT_20_GAMES_CATALOG.findIndex(
                          (g) => g.id === activeEduGame.id
                        );
                        const nextGame =
                          INTELLIGENT_20_GAMES_CATALOG[
                            (currIdx + 1) % INTELLIGENT_20_GAMES_CATALOG.length
                          ];
                        handleSelectEducationalGame(nextGame, 0);
                      }}
                      className="preset-mini-btn active-cat"
                      title="Jump to the next developmental game"
                    >
                      ⏭️ Next Game
                    </button>
                  </div>

                  <div style={{ fontSize: 10.5, fontWeight: 800, color: '#b45309' }}>
                    🎯 Skill: {activeEduGame.skillBadge}
                  </div>

                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 800,
                      color: '#451a03',
                      background: '#fffbeb',
                      border: '1.5px solid #fde68a',
                      borderRadius: 9,
                      padding: '6px 8px',
                      lineHeight: 1.3,
                    }}
                  >
                    {currentEduRound.questionText}
                  </div>

                  {/* 1-Click Answer Choice Buttons (Child can also pop 3D bubbles on canvas or speak!) */}
                  <div className="tool-btn-grid">
                    {[
                      { ...currentEduRound.correct, isCorrect: true },
                      ...currentEduRound.distractors.map((d) => ({ ...d, isCorrect: false })),
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() =>
                          handleSolveEducationalChoice(opt.label, opt.isCorrect, 'child')
                        }
                        className={`sidebar-tool-btn ${opt.isCorrect ? 'active' : ''}`}
                      >
                        {opt.emoji} {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* A. ANY-NUMBER MATH CONTROLS */}
              {canvasMode === 'ar_cartoon_math_match' && !activeSong && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 12, fontWeight: 900, color: '#78350f' }}>
                    🧮 {childName}&apos;s Math:{' '}
                    <span style={{ color: '#c2410c', fontSize: 14 }}>
                      {formatMathSymbol(mathNumA, mathNumB, mathOp, activeToyItem.emoji)}
                    </span>
                  </div>

                  <div className="preset-mini-row">
                    {(
                      [
                        { op: '+', label: '➕ Add' },
                        { op: '-', label: '➖ Sub' },
                        { op: '×', label: '✖️ Mult' },
                        { op: '÷', label: '➗ Div' },
                        { op: 'count', label: '🔢 Count' },
                      ] as const
                    ).map((item) => (
                      <button
                        key={item.op}
                        type="button"
                        onClick={() => {
                          setMathOp(item.op);
                          generateNextMathNumbers(item.op, mathRange);
                        }}
                        className={`preset-mini-btn ${mathOp === item.op ? 'active-cat' : ''}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <select
                    value={mathRange}
                    onChange={(e) => {
                      const nextR = e.target.value as MathRangeType;
                      setMathRange(nextR);
                      generateNextMathNumbers(mathOp, nextR);
                    }}
                    className="sidebar-text-input"
                    title="Choose Number Range"
                  >
                    <option value="1-5">Numbers 1–5</option>
                    <option value="1-10">Numbers 1–10</option>
                    <option value="1-20">Numbers 1–20</option>
                    <option value="1-100">Big Numbers 1–100</option>
                  </select>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (customMathInput.trim()) {
                        tryParseAndSolveMath(customMathInput.trim());
                        setCustomMathInput('');
                      }
                    }}
                    style={{ display: 'flex', gap: 4 }}
                  >
                    <input
                      type="text"
                      placeholder="Custom e.g. 12 + 15"
                      value={customMathInput}
                      onChange={(e) => setCustomMathInput(e.target.value)}
                      className="sidebar-text-input"
                      style={{ flex: 1 }}
                    />
                    <button type="submit" className="preset-mini-btn active-cat">
                      Solve
                    </button>
                  </form>
                </div>
              )}

              {/* B. PHYSICAL JUMP / WAVE / DANCE & 3D FOOTBALL GAME CONTROLS */}
              {canvasMode === 'ar_physical_and_math_game' && !activeSong && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: '#78350f' }}>
                    🏃‍♂️ Move on camera or tap to <strong>{physicalActionType.toUpperCase()}</strong>! (
                    {physicalRepCount}/{physicalRepTarget})
                  </div>
                  <div className="preset-mini-row">
                    {(
                      [
                        { id: 'jump', label: '🦘 Jump' },
                        { id: 'wave', label: '👋 Wave' },
                        { id: 'dance', label: '💃 Dance' },
                      ] as const
                    ).map((act) => (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => {
                          setPhysicalActionType(act.id);
                          setPhysicalRepCount(0);
                          if (act.id === 'jump') triggerToyHandPopNow();
                          else triggerToyTemporaryMotion(act.id, 3000);
                          speakAsToy(
                            `Let's ${act.id} ${physicalRepTarget} times together, ${childName}!`,
                            activeToyItem.voicePitch
                          );
                        }}
                        className={`preset-mini-btn ${
                          physicalActionType === act.id ? 'active-cat' : ''
                        }`}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPhysicalRepCount((prev) => {
                        const nextRep = prev + 1;
                        if (physicalActionType === 'jump') triggerToyHandPopNow();
                        else triggerToyTemporaryMotion(physicalActionType, 2200);
                        playPentatonicNote(392 + nextRep * 45, DEFAULT_SENSORY, 'kalimba', 0.35);
                        if (nextRep >= physicalRepTarget) {
                          playGentleSuccessChime(DEFAULT_SENSORY);
                          setMathScore((s) => s + 1);
                          triggerToyKickFootballNow();
                          speakAsToy(
                            `Yippee ${childName}, we did all ${physicalRepTarget} ${physicalActionType}s! Watch me kick a 3D football goal to celebrate!`,
                            activeToyItem.voicePitch
                          );
                          return 0;
                        }
                        speakAsToy(
                          `${nextRep}! Great ${physicalActionType}, ${childName}!`,
                          activeToyItem.voicePitch
                        );
                        return nextRep;
                      });
                    }}
                    className="upload-3d-btn"
                    style={{
                      padding: '7px 10px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                    }}
                  >
                    ✨ Do 1 {physicalActionType.toUpperCase()} Together ({physicalRepCount}/
                    {physicalRepTarget})
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      triggerToyKickFootballNow();
                      setMathScore((s) => s + 1);
                      speakAsToy(
                        `Watch me run up and kick the 3D soccer ball into the goal for you, ${childName}!`,
                        activeToyItem.voicePitch
                      );
                    }}
                    className="upload-3d-btn"
                    style={{
                      padding: '7px 10px',
                      background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    }}
                  >
                    ⚽ Run &amp; Kick 3D Football Goal!
                  </button>
                </div>
              )}

              {/* C. SINGING KARAOKE LYRICS & STOP BUTTON */}
              {activeSong && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: '#78350f' }}>
                    {activeSong.emoji} Singing <strong>{activeSong.title}</strong>:
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      fontWeight: 900,
                      color: '#b45309',
                      background: '#fef3c7',
                      padding: '6px 8px',
                      borderRadius: 8,
                    }}
                  >
                    {activeSong.lines[activeSongLineIdx]}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (stopSongMelodyRef.current) stopSongMelodyRef.current();
                      setActiveSong(null);
                      triggerToyMotion('idle');
                    }}
                    className="preset-mini-btn active-cat"
                  >
                    ⏹️ Finish Song
                  </button>
                </div>
              )}

              {/* D. AUTO-DRAWING STATUS & CLEAR BUTTON */}
              {toyDrawingTitle && canvasMode === 'ar_3d_2d_art_studio' && !activeSong && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 800, color: '#78350f' }}>
                    {toyDrawingTitle}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      strokesRef.current = [];
                      currentStrokeRef.current = [];
                      setToyDrawingTitle(null);
                    }}
                    className="preset-mini-btn"
                  >
                    🧹 Clear Drawing
                  </button>
                </div>
              )}

              {/* E. VIDEO & SINGING STUDIO CONTROLS */}
              {canvasMode === 'ar_video_3d_animation' && !activeSong && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => startSingingFavouriteSong()}
                    className="preset-mini-btn active-cat"
                  >
                    🎵 Sing Song
                  </button>
                  <button
                    type="button"
                    onClick={() => videoFileInputRef.current?.click()}
                    className="preset-mini-btn"
                  >
                    📂 Load Video
                  </button>
                </div>
              )}
            </div>

            {/* 3B. 20 INTELLIGENT PERSONAL, SOCIAL & DEVELOPMENTAL GAMES CATALOG BROWSER */}
            <div className="sidebar-card">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">🎓 20 Intelligent Skill Games</span>
              </div>
              <h3 className="sidebar-subheading">
                Personal, Social &amp; Skill Games ({INTELLIGENT_20_GAMES_CATALOG.length})
              </h3>

              {/* 4 Developmental Domains Filter Row */}
              <div className="preset-mini-row">
                {DEVELOPMENTAL_DOMAINS.map((dom) => (
                  <button
                    key={dom.id}
                    type="button"
                    onClick={() => setSkillDomainFilter(dom.id)}
                    className={`preset-mini-btn ${
                      skillDomainFilter === dom.id ? 'active-cat' : ''
                    }`}
                  >
                    {dom.emoji} {dom.label}
                  </button>
                ))}
              </div>

              {/* Scrollable List of the 20 Intelligent Educational Games */}
              <div className="character-list" style={{ maxHeight: 195, marginTop: 4 }}>
                {filtered20Games.map((game) => {
                  const isSelected =
                    canvasMode === 'ar_intelligent_20_games' && activeEduGame.id === game.id;
                  return (
                    <button
                      key={game.id}
                      type="button"
                      onClick={() => handleSelectEducationalGame(game, 0)}
                      className={`character-item-btn ${isSelected ? 'selected' : ''}`}
                    >
                      <span className="char-icon">{game.emoji}</span>
                      <div className="char-info">
                        <span className="char-name">{game.title}</span>
                        <span className="char-sub">{game.skillBadge}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. AUTONOMOUS CHILD BRAIN & 30 HUMAN-CHILD 3D ACTIVITIES (THINKS & DECIDES BASED ON CHILD BEHAVIOR!) */}
            <div className="sidebar-card">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">🧠 Toy&apos;s Mind &amp; 30 Actions</span>
                <button
                  type="button"
                  onClick={() => {
                    const next = !autonomousBrainEnabled;
                    setAutonomousBrainEnabled(next);
                    speakAdultDirection(
                      next
                        ? 'Autonomous Child Brain enabled. The 3D toy will observe the child and decide human activities on her own.'
                        : 'Autonomous Child Brain paused. The 3D toy will wait for direct commands.'
                    );
                  }}
                  className={`preset-mini-btn ${autonomousBrainEnabled ? 'active-cat' : ''}`}
                  title="Toggle whether the 3D Toy thinks and decides activities autonomously based on the child's behavior"
                >
                  {autonomousBrainEnabled ? '🧠 Auto-Think: ON' : '🧠 Auto-Think: OFF'}
                </button>
              </div>

              {/* Live Thought Cloud & Autonomous Decision Readout */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #fffbeb, #fef3c7)',
                  border: '1.5px solid #f59e0b',
                  borderRadius: 10,
                  padding: '7px 9px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 900,
                    color: '#9a3412',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 6,
                  }}
                >
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {toyThoughtDecision.emoji} {toyThoughtDecision.decisionLabel}
                  </span>
                  <span
                    style={{
                      fontSize: 9.5,
                      color: '#b45309',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '45%',
                    }}
                  >
                    {activeClipLabel}
                  </span>
                </div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: '#78350f', lineHeight: 1.3 }}>
                  💭 &ldquo;{toyThoughtDecision.thought}&rdquo;
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerAutonomousChildBrainDecisionNow(true)}
                className="upload-3d-btn"
                style={{
                  padding: '7px 10px',
                  fontSize: 11,
                  background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
                }}
                title="Have the 3D Toy observe the child right now, think with hand on chin, and autonomously decide a human-child activity!"
              >
                💡 Let Toy Think &amp; Decide Activity Now!
              </button>

              <h3 className="sidebar-subheading" style={{ marginTop: 2 }}>
                🎬 30 Human-Child 3D Activities (Say or Tap)
              </h3>

              {/* Category Filter Tabs for the 30 3D Activities */}
              <div className="preset-mini-row">
                {(
                  [
                    { id: 'all', label: 'All (30)' },
                    { id: 'sports_move', label: '⚽ Move' },
                    { id: 'play_fun', label: '🤸 Gym & Fun' },
                    { id: 'emotion_calm', label: '💖 Social' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActionCategoryTab(tab.id)}
                    className={`preset-mini-btn ${
                      actionCategoryTab === tab.id ? 'active-cat' : ''
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                className="tool-btn-grid"
                style={{ maxHeight: 235, overflowY: 'auto', paddingRight: 2 }}
              >
                {(
                  [
                    // Move & Sports (10)
                    {
                      act: 'kick_football' as ToyMotionClipType,
                      label: '⚽ Dribble & Kick',
                      cat: 'sports_move',
                    },
                    {
                      act: 'jump_catch' as ToyMotionClipType,
                      label: '🦘 Jump & Catch',
                      cat: 'sports_move',
                    },
                    {
                      act: 'airplane_zoom' as ToyMotionClipType,
                      label: '✈️ Airplane Zoom',
                      cat: 'sports_move',
                    },
                    {
                      act: 'march_parade' as ToyMotionClipType,
                      label: '🥁 Parade March',
                      cat: 'sports_move',
                    },
                    {
                      act: 'jumping_jacks' as ToyMotionClipType,
                      label: '🤸 Jumping Jacks',
                      cat: 'sports_move',
                    },
                    {
                      act: 'skip_hop' as ToyMotionClipType,
                      label: '🐰 Skip & Hop',
                      cat: 'sports_move',
                    },
                    {
                      act: 'hop_one_foot' as ToyMotionClipType,
                      label: '🦩 1-Foot Hop',
                      cat: 'sports_move',
                    },
                    {
                      act: 'walk' as ToyMotionClipType,
                      label: '🚶 Walk Around',
                      cat: 'sports_move',
                    },
                    {
                      act: 'run' as ToyMotionClipType,
                      label: '🏃 Fast Run',
                      cat: 'sports_move',
                    },
                    {
                      act: 'tiptoe_sneak' as ToyMotionClipType,
                      label: '🤫 Tiptoe Sneak',
                      cat: 'sports_move',
                    },
                    // Gym & Fun Play (10)
                    {
                      act: 'cartwheel_flip' as ToyMotionClipType,
                      label: '🤸‍♀️ 3D Cartwheel',
                      cat: 'play_fun',
                    },
                    {
                      act: 'superhero_pose' as ToyMotionClipType,
                      label: '🦸 Superhero Pose',
                      cat: 'play_fun',
                    },
                    {
                      act: 'hula_wiggle' as ToyMotionClipType,
                      label: '🌺 Hula Wiggle',
                      cat: 'play_fun',
                    },
                    {
                      act: 'dance' as ToyMotionClipType,
                      label: '💃 3D Dance',
                      cat: 'play_fun',
                    },
                    {
                      act: 'peekaboo_hide' as ToyMotionClipType,
                      label: '🙈 Peek-a-Boo',
                      cat: 'play_fun',
                    },
                    {
                      act: 'high_five' as ToyMotionClipType,
                      label: '✋ 3D High-Five',
                      cat: 'play_fun',
                    },
                    {
                      act: 'bow_ta_da' as ToyMotionClipType,
                      label: '🙇 Ta-Da! Bow',
                      cat: 'play_fun',
                    },
                    {
                      act: 'point_look' as ToyMotionClipType,
                      label: '👆 Point & Look',
                      cat: 'play_fun',
                    },
                    {
                      act: 'count_fingers' as ToyMotionClipType,
                      label: '🖐️ Count 1-2-3-4-5',
                      cat: 'play_fun',
                    },
                    {
                      act: 'think_curious' as ToyMotionClipType,
                      label: '🤔 Think Curious',
                      cat: 'play_fun',
                    },
                    // Social, Emotion & Calm (10)
                    {
                      act: 'clap_hands' as ToyMotionClipType,
                      label: '👏 Clap Hands',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'cheer_hurrah' as ToyMotionClipType,
                      label: '🙌 Cheer Hurrah',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'laugh_giggle' as ToyMotionClipType,
                      label: '🤭 Laugh & Giggle',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'blow_kiss' as ToyMotionClipType,
                      label: '😘 Blow Kiss',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'wave' as ToyMotionClipType,
                      label: '👋 Wave Hello',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'hug' as ToyMotionClipType,
                      label: '🤗 Cuddle Hug',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'sit_relax' as ToyMotionClipType,
                      label: '🧘 Sit on Grass',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'calm_breathe' as ToyMotionClipType,
                      label: '🌬️ Calm Breathe',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'stretch_yawn' as ToyMotionClipType,
                      label: '🙆 Big Stretch',
                      cat: 'emotion_calm',
                    },
                    {
                      act: 'sleepy_nap' as ToyMotionClipType,
                      label: '😴 Sleepy Nap',
                      cat: 'emotion_calm',
                    },
                  ] as const
                )
                  .filter((btn) =>
                    actionCategoryTab === 'all' ? true : btn.cat === actionCategoryTab
                  )
                  .map((btn) => (
                    <button
                      key={btn.act}
                      type="button"
                      onClick={() => executeHumanChildAction(btn.act)}
                      className={`sidebar-tool-btn ${
                        activeMotionClip === btn.act ? 'active' : ''
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
              </div>
            </div>

            {/* 5. ASK TOY TO DRAW FOR THE CHILD + SIMPLE COLOUR PICKER */}
            <div className="sidebar-card">
              <div className="sidebar-card-top-row">
                <span className="sidebar-tag">🎨 Toy Draws For {childName}</span>
              </div>
              <h3 className="sidebar-subheading">Ask Toy to Draw</h3>
              <div className="tool-btn-grid">
                {[
                  { id: 'cat', label: '🐱 Draw Cat' },
                  { id: 'car', label: '🏎️ Draw Car' },
                  { id: 'rainbow', label: '🌈 Rainbow' },
                  { id: 'flower', label: '🌸 Flower' },
                  { id: 'house', label: '🏠 House' },
                  { id: 'heart', label: '💖 Heart' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => startToyAutoDrawing(d.id)}
                    className="sidebar-tool-btn"
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <div className="sidebar-color-dots" style={{ marginTop: 6 }}>
                {['#d97706', '#f43f5e', '#10b981', '#38bdf8', '#a855f7', '#eab308', '#ec4899'].map(
                  (hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() => {
                        setPrimaryColor(hex);
                        replaceActive3DToyInScene(
                          activeCustomToy ? activeCustomToy.archetype : activeToyItem.id,
                          hex,
                          activeToyItem.secondaryColor,
                          activeCustomToy?.texture || null
                        );
                      }}
                      className={`ar-color-dot ${primaryColor === hex ? 'selected' : ''}`}
                      style={{ backgroundColor: hex }}
                      title="Change Toy & Brush Colour"
                    />
                  )
                )}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* =====================================================================
          3. BOTTOM BAR: CENTRAL CANVAS ACTIVITY MODE SWITCHER
         ===================================================================== */}
      <footer className="studio-bottom-bar">
        <button
          type="button"
          onClick={() => {
            handleSelectEducationalGame(activeEduGame, activeEduRoundIdx);
          }}
          className={`bottom-mode-btn ${canvasMode === 'ar_intelligent_20_games' ? 'active' : ''}`}
        >
          <span className="bm-icon">🎓💖</span>
          <div>
            <div className="bm-title">20 Social &amp; Skill 3D Games</div>
            <div className="bm-sub">Emotions, Life Skills, Speech &amp; Calm</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setCanvasMode('ar_cartoon_math_match');
            triggerToyHandPopNow();
            speakAdultDirection(
              'Activity Direction: Cooperative Any-Number 3D Math and Jump-Catch Co-Play selected.',
              `Let's jump and catch 3D number bubbles together, ${childName}! What is ${formatMathSpoken(mathNumA, mathNumB, mathOp)}?`
            );
          }}
          className={`bottom-mode-btn ${canvasMode === 'ar_cartoon_math_match' ? 'active' : ''}`}
        >
          <span className="bm-icon">🫧🔢</span>
          <div>
            <div className="bm-title">Any-Number 3D Math</div>
            <div className="bm-sub">Jump &amp; Catch (+, −, ×, ÷, Count)</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setCanvasMode('ar_physical_and_math_game');
            setPhysicalRepCount(0);
            triggerToyKickFootballNow();
            speakAdultDirection(
              'Activity Direction: 3D Football, Running, and Jump Counting Game selected.',
              `Watch me run and kick the 3D football into the goal, ${childName}! Let's jump and play together!`
            );
          }}
          className={`bottom-mode-btn ${
            canvasMode === 'ar_physical_and_math_game' ? 'active' : ''
          }`}
        >
          <span className="bm-icon">⚽🏃‍♂️</span>
          <div>
            <div className="bm-title">3D Football &amp; Sports Game</div>
            <div className="bm-sub">Run, Kick Ball Into Goal &amp; Jump</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setCanvasMode('ar_3d_2d_art_studio');
            speakAdultDirection(
              'Activity Direction: 3D Toy and Auto-Drawing Studio selected.',
              `What cute picture should I draw for you, ${childName}?`
            );
          }}
          className={`bottom-mode-btn ${canvasMode === 'ar_3d_2d_art_studio' ? 'active' : ''}`}
        >
          <span className="bm-icon">🧸🎨</span>
          <div>
            <div className="bm-title">3D Toy &amp; Auto-Drawing</div>
            <div className="bm-sub">Toy Draws For {childName}</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => startSingingFavouriteSong()}
          className={`bottom-mode-btn ${activeSong ? 'active' : ''}`}
        >
          <span className="bm-icon">🎵🌟</span>
          <div>
            <div className="bm-title">Sing &amp; Dance Together</div>
            <div className="bm-sub">Favourite Songs &amp; Music</div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setCanvasMode('ar_interactive_fun_bubbles');
            triggerToyHandPopNow();
            speakAdultDirection(
              'Activity Direction: 3D Jump and Catch Bubble Party selected.',
              `Wheee ${childName}! Watch me run and jump high in 3D space to catch bubbles with you!`
            );
          }}
          className={`bottom-mode-btn ${
            canvasMode === 'ar_interactive_fun_bubbles' ? 'active' : ''
          }`}
        >
          <span className="bm-icon">🦘🎉</span>
          <div>
            <div className="bm-title">3D Jump &amp; Catch Bubbles</div>
            <div className="bm-sub">Toy Runs &amp; Leaps to Catch 3D Orbs</div>
          </div>
        </button>
      </footer>
    </div>
  );
};

