import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';

export type ToyArchetypeId =
  | 'teddy_plush'
  | 'puppy_plush'
  | 'yeti_plush'
  | 'bunny_plush'
  | 'dino_plush'
  | 'kitty_plush'
  | 'unicorn_plush'
  | 'parrot_bird'
  | 'owl_bird'
  | 'penguin_bird'
  | 'seagull_bird'
  | 'duck_toy'
  | 'racecar_toy'
  | 'truck_toy'
  | 'train_toy'
  | 'robot_buddy'
  | 'robo_dog'
  | 'michelle_doll'
  | 'rocket_toy'
  | 'custom_plush_doll';

export type ToyMotionClipType =
  | 'idle'
  | 'walk'
  | 'run'
  | 'dance'
  | 'jump'
  | 'wave'
  | 'yes'
  | 'no'
  | 'hug'
  | 'kick_football'
  | 'jump_catch'
  | 'clap_hands'
  | 'sit_relax'
  | 'think_curious'
  | 'peekaboo_hide'
  | 'stretch_yawn'
  | 'jumping_jacks'
  | 'skip_hop'
  | 'calm_breathe'
  | 'bow_ta_da'
  | 'tiptoe_sneak'
  | 'cheer_hurrah'
  | 'talk_gesture'
  | 'cartwheel_flip'
  | 'hop_one_foot'
  | 'airplane_zoom'
  | 'march_parade'
  | 'hula_wiggle'
  | 'superhero_pose'
  | 'laugh_giggle'
  | 'blow_kiss'
  | 'high_five'
  | 'point_look'
  | 'sleepy_nap'
  | 'count_fingers';

export interface ToyCatalogItem {
  id: ToyArchetypeId;
  name: string;
  category: 'soft_toy' | 'bird_toy' | 'car_vehicle' | 'robot_toy';
  emoji: string;
  defaultColor: string;
  secondaryColor: string;
  voicePitch: number;
  greeting: string;
  glbUrl?: string;
  badgeText: string;
}

export const PREBUILT_3D_TOY_CATALOG: ToyCatalogItem[] = [
  // ================= SOFT PLUSH TOYS & ANIMALS =================
  {
    id: 'teddy_plush',
    name: 'Barnaby Soft Teddy Bear',
    category: 'soft_toy',
    emoji: '🧸',
    defaultColor: '#d97706',
    secondaryColor: '#fde68a',
    voicePitch: 1.42,
    greeting:
      "Hehe, hi bestie! I'm Barnaby Bear! Look how soft and cuddly my tummy is! Wanna give me a big hug and play together? Yay!",
    badgeText: 'Seamless Skinned Plush',
  },
  {
    id: 'puppy_plush',
    name: 'Biscuit Studio Fox Puppy',
    category: 'soft_toy',
    emoji: '🦊',
    defaultColor: '#f59e0b',
    secondaryColor: '#fef3c7',
    voicePitch: 1.45,
    greeting:
      "Yip-yip, hehe! Hi best friend! I'm Biscuit the little puppy fox! Look at my fluffy tail wagging for you! Wanna play with me?",
    glbUrl: '/models/Fox.glb',
    badgeText: 'Studio Rigged GLB',
  },
  {
    id: 'yeti_plush',
    name: 'Bumble Fluffy Yeti Plush',
    category: 'soft_toy',
    emoji: '👾',
    defaultColor: '#38bdf8',
    secondaryColor: '#e0f2fe',
    voicePitch: 1.38,
    greeting:
      "Peekaboo, hehe! I'm Bumble the Marshmallow Yeti! I look like a big blue cotton candy! Wanna giggle and dance with me, bestie?",
    glbUrl: '/models/YetiSmall.glb',
    badgeText: 'Studio 6-Skin GLB',
  },
  {
    id: 'bunny_plush',
    name: 'Rosie Velvet Plush Bunny',
    category: 'soft_toy',
    emoji: '🐰',
    defaultColor: '#f472b6',
    secondaryColor: '#fce7f3',
    voicePitch: 1.48,
    greeting:
      "Hop-hop, teehee! Hi bestie, I'm Rosie Bunny! Look at my pink floppy ears wiggling at you! Wanna sing a cute song with me?",
    badgeText: 'Seamless Skinned Plush',
  },
  {
    id: 'dino_plush',
    name: 'Rexy Chubby Dino Plush',
    category: 'soft_toy',
    emoji: '🦖',
    defaultColor: '#10b981',
    secondaryColor: '#fde047',
    voicePitch: 1.4,
    greeting:
      "Rawr-hehe! That's a happy baby dino giggle! I'm Rexy! Wanna stomp our little feet and pop shiny bubbles together?",
    badgeText: 'Seamless Skinned Plush',
  },
  {
    id: 'kitty_plush',
    name: 'Mochi Pastel Plush Kitty',
    category: 'soft_toy',
    emoji: '🐱',
    defaultColor: '#fb7185',
    secondaryColor: '#fff1f2',
    voicePitch: 1.48,
    greeting:
      "Meow, purr-purr! Hi bestie, I'm Mochi Kitty! You're so cute! Wanna draw a pretty picture or cuddle with me?",
    badgeText: 'Seamless Skinned Plush',
  },
  {
    id: 'unicorn_plush',
    name: 'Luna Galloping Unicorn',
    category: 'soft_toy',
    emoji: '🦄',
    defaultColor: '#e879f9',
    secondaryColor: '#fef08a',
    voicePitch: 1.44,
    greeting:
      "Ooh, sparkles! Hi bestie, I'm Luna the baby Unicorn! Let's make magic rainbows and sing together, yay!",
    glbUrl: '/models/Horse.glb',
    badgeText: 'Studio Morph GLB',
  },

  // ================= 3D BIRDS =================
  {
    id: 'parrot_bird',
    name: 'Rio Flying Macaw Parrot',
    category: 'bird_toy',
    emoji: '🦜',
    defaultColor: '#ef4444',
    secondaryColor: '#3b82f6',
    voicePitch: 1.46,
    greeting:
      "Tweet-tweet, hehe! Hi best friend! I'm Rio the rainbow birdie! Look at my wings flapping for you! Wanna fly with me?",
    glbUrl: '/models/Parrot.glb',
    badgeText: 'Studio Flight GLB',
  },
  {
    id: 'owl_bird',
    name: 'Coral Flying Flamingo',
    category: 'bird_toy',
    emoji: '🦩',
    defaultColor: '#fb7185',
    secondaryColor: '#fecdd3',
    voicePitch: 1.44,
    greeting:
      "Flutter-flutter, teehee! I'm Coral the pink Flamingo! I love pink so much! Wanna count shiny bubbles with me, bestie?",
    glbUrl: '/models/Flamingo.glb',
    badgeText: 'Studio Flight GLB',
  },
  {
    id: 'penguin_bird',
    name: 'Sky Soaring Stork Bird',
    category: 'bird_toy',
    emoji: '🕊️',
    defaultColor: '#f8fafc',
    secondaryColor: '#f97316',
    voicePitch: 1.42,
    greeting:
      "Wheee! Hi bestie, I'm Sky the little white birdie! I'm floating in the clouds looking right at you!",
    glbUrl: '/models/Stork.glb',
    badgeText: 'Studio Flight GLB',
  },
  {
    id: 'seagull_bird',
    name: 'Sunny Coastal Seagull',
    category: 'bird_toy',
    emoji: '🐦',
    defaultColor: '#e2e8f0',
    secondaryColor: '#facc15',
    voicePitch: 1.45,
    greeting:
      "Hehe, hi friend! I'm Sunny the little beach birdie! Wanna pop ocean bubbles and giggle with me?",
    glbUrl: '/models/Seagull.glb',
    badgeText: 'Studio PBR GLB',
  },
  {
    id: 'duck_toy',
    name: 'Sunny Classic Plush Ducky',
    category: 'bird_toy',
    emoji: '🦆',
    defaultColor: '#facc15',
    secondaryColor: '#f97316',
    voicePitch: 1.48,
    greeting:
      "Quack-quack, teehee! I'm Sunny the baby yellow Ducky! Splash-splash! Smile at me and let's play bubbles together!",
    glbUrl: '/models/Duck.glb',
    badgeText: 'Studio Sculpt GLB',
  },

  // ================= 3D TOY CARS, TRUCKS & PLANES =================
  {
    id: 'racecar_toy',
    name: 'Turbo Studio Toy Car',
    category: 'car_vehicle',
    emoji: '🏎️',
    defaultColor: '#ef4444',
    secondaryColor: '#facc15',
    voicePitch: 1.42,
    greeting:
      "Zoom-zoom, beep-beep! Hehe, hi bestie! I'm Turbo the little red Toy Car! Wanna go on a fun adventure together?",
    glbUrl: '/models/ToyCar.glb',
    badgeText: 'Studio PBR GLB',
  },
  {
    id: 'truck_toy',
    name: 'Buddy Delivery Toy Truck',
    category: 'car_vehicle',
    emoji: '🚚',
    defaultColor: '#3b82f6',
    secondaryColor: '#f8fafc',
    voicePitch: 1.38,
    greeting:
      "Toot-toot, hehe! Hi friend, I'm Buddy the little blue Toy Truck! My wheels go round and round for you!",
    glbUrl: '/models/CesiumMilkTruck.glb',
    badgeText: 'Studio Rigged GLB',
  },
  {
    id: 'train_toy',
    name: 'SkyLoop Toy Airplane',
    category: 'car_vehicle',
    emoji: '🛩️',
    defaultColor: '#06b6d4',
    secondaryColor: '#fde047',
    voicePitch: 1.44,
    greeting:
      "Neee-oww, teehee! I'm SkyLoop the baby Toy Plane! Look how my little propeller spins when you smile at me!",
    glbUrl: '/models/AerobaticPlane.glb',
    badgeText: 'Studio Flight GLB',
  },

  // ================= 3D ROBOTS & EXPRESSIVE CHARACTERS =================
  {
    id: 'robot_buddy',
    name: 'Beeper Expressive Robot',
    category: 'robot_toy',
    emoji: '🤖',
    defaultColor: '#f59e0b',
    secondaryColor: '#38bdf8',
    voicePitch: 1.45,
    greeting:
      "Beep-boop, teehee! Hi bestie, I'm Beeper your cute little robot friend! Look, I'm waving my hand at you! Wanna dance with me?",
    glbUrl: '/models/RobotExpressive.glb',
    badgeText: '14-Clip Rigged GLB',
  },
  {
    id: 'robo_dog',
    name: 'Astro Humanoid Robot',
    category: 'robot_toy',
    emoji: '🦾',
    defaultColor: '#8b5cf6',
    secondaryColor: '#c4b5fd',
    voicePitch: 1.42,
    greeting:
      "Yay, hi best friend! I'm Astro! I love doing happy little robot dances with you! Wanna play a game together?",
    glbUrl: '/models/Xbot.glb',
    badgeText: '7-Clip Rigged GLB',
  },
  {
    id: 'michelle_doll',
    name: 'Maya Dancing Character Doll',
    category: 'robot_toy',
    emoji: '💃',
    defaultColor: '#ec4899',
    secondaryColor: '#fbcfe8',
    voicePitch: 1.46,
    greeting:
      "Hi bestie, hehe! I'm Maya! I love twirling, singing, and drawing cute pictures with you! What should we play first?",
    glbUrl: '/models/Michelle.glb',
    badgeText: 'MoCap Dance GLB',
  },
  {
    id: 'rocket_toy',
    name: 'Cosmo Space Explorer Toy',
    category: 'robot_toy',
    emoji: '🧑‍🚀',
    defaultColor: '#f8fafc',
    secondaryColor: '#38bdf8',
    voicePitch: 1.43,
    greeting:
      "Three, two, one, wheee! Hehe, hi bestie! I'm Cosmo the little space friend! Let's catch twinkling stars together!",
    glbUrl: '/models/Astronaut.glb',
    badgeText: 'Studio Sculpt GLB',
  },
];

export interface AnimatedToyRig {
  root: THREE.Group;
  innerModel: THREE.Object3D;
  mixer: THREE.AnimationMixer;
  actions: Record<string, THREE.AnimationAction>;
  activeAction: THREE.AnimationAction | null;
  activeClipType: ToyMotionClipType;
  spineBone: THREE.Object3D | null;
  headBoneOrGroup: THREE.Object3D | null;
  jawOrMouth: THREE.Object3D | null;
  rightArmBone: THREE.Object3D | null;
  leftArmBone: THREE.Object3D | null;
  rightForearmBone: THREE.Object3D | null;
  leftForearmBone: THREE.Object3D | null;
  rightLegBone: THREE.Object3D | null;
  leftLegBone: THREE.Object3D | null;
  rightShinBone: THREE.Object3D | null;
  leftShinBone: THREE.Object3D | null;
  eyeMeshes: THREE.Object3D[];
  morphMeshes: THREE.Mesh[];
  wheels: THREE.Object3D[];
  isFlyingToy: boolean;
  isVehicleToy: boolean;
  availableClipNames: string[];
}

// Singleton GLTF + Draco Loaders & caches
let sharedGltfLoader: GLTFLoader | null = null;
const sculptedGeometryCache = new Map<string, THREE.BufferGeometry>();
let cachedFuzzyNormalMap: THREE.CanvasTexture | null = null;

function getGltfLoader(): GLTFLoader {
  if (!sharedGltfLoader) {
    const loader = new GLTFLoader();
    const draco = new DRACOLoader();
    draco.setDecoderPath('/draco/');
    loader.setDRACOLoader(draco);
    sharedGltfLoader = loader;
  }
  return sharedGltfLoader;
}

/**
 * Generates a subtle micro-fleece / plush fabric normal map so soft toys catch
 * rim lighting like real Pixar/TV-movie velvet & plush characters.
 */
function getPlushVelvetNormalMap(): THREE.CanvasTexture {
  if (cachedFuzzyNormalMap) return cachedFuzzyNormalMap;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const img = ctx.createImageData(size, size);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const nx = 128 + Math.floor((Math.random() - 0.5) * 36);
      const ny = 128 + Math.floor((Math.random() - 0.5) * 36);
      d[i] = nx;
      d[i + 1] = ny;
      d[i + 2] = 255;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 10);
  cachedFuzzyNormalMap = tex;
  return tex;
}

// ============================================================================
// PART 1: SEAMLESS ORGANIC SMOOTH-SDF (MarchingCubes + smin) + 16-BONE SKINNED
//         PLUSH ENGINE (Zero Seams, Single Continuous Sculpted Skin + Skeleton)
// ============================================================================

function smin(a: number, b: number, k: number): number {
  const h = Math.max(0, Math.min(1, 0.5 + (0.5 * (b - a)) / k));
  return b * (1 - h) + a * h - k * h * (1 - h);
}

function capsuleSDF(
  px: number,
  py: number,
  pz: number,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
  r: number
): number {
  const pax = px - ax;
  const pay = py - ay;
  const paz = pz - az;
  const bax = bx - ax;
  const bay = by - ay;
  const baz = bz - az;
  const dotBa = bax * bax + bay * bay + baz * baz;
  const h =
    dotBa > 1e-6 ? Math.max(0, Math.min(1, (pax * bax + pay * bay + paz * baz) / dotBa)) : 0;
  const dx = pax - bax * h;
  const dy = pay - bay * h;
  const dz = paz - baz * h;
  return Math.sqrt(dx * dx + dy * dy + dz * dz) - r;
}

function ellipsoidSDF(
  px: number,
  py: number,
  pz: number,
  cx: number,
  cy: number,
  cz: number,
  rx: number,
  ry: number,
  rz: number
): number {
  const dx = (px - cx) / rx;
  const dy = (py - cy) / ry;
  const dz = (pz - cz) / rz;
  const k0 = Math.sqrt(dx * dx + dy * dy + dz * dz);
  if (k0 < 1e-6) return -Math.min(rx, ry, rz);
  const dx2 = dx / rx;
  const dy2 = dy / ry;
  const dz2 = dz / rz;
  const k1 = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2);
  return (k0 * (k0 - 1.0)) / k1;
}

interface BoneSegmentDef {
  name: string;
  parentIndex: number;
  headPos: [number, number, number];
  tailPos: [number, number, number];
}

// 16-Bone Hierarchical Plush Skeleton Definition (in model-space coordinates)
const PLUSH_BONE_DEFS: BoneSegmentDef[] = [
  { name: 'PlushRoot', parentIndex: -1, headPos: [0, -0.18, 0], tailPos: [0, 0.0, 0] }, // 0
  { name: 'PlushSpine', parentIndex: 0, headPos: [0, -0.1, 0], tailPos: [0, 0.22, 0] }, // 1
  { name: 'PlushChest', parentIndex: 1, headPos: [0, 0.22, 0], tailPos: [0, 0.44, 0] }, // 2
  { name: 'PlushHead', parentIndex: 2, headPos: [0, 0.44, 0.02], tailPos: [0, 0.85, 0.04] }, // 3
  { name: 'PlushJaw', parentIndex: 3, headPos: [0, 0.46, 0.24], tailPos: [0, 0.42, 0.46] }, // 4
  { name: 'PlushEarL', parentIndex: 3, headPos: [-0.26, 0.78, 0.0], tailPos: [-0.36, 1.15, 0.0] }, // 5
  { name: 'PlushEarR', parentIndex: 3, headPos: [0.26, 0.78, 0.0], tailPos: [0.36, 1.15, 0.0] }, // 6
  { name: 'PlushArmLU', parentIndex: 2, headPos: [-0.34, 0.22, 0.02], tailPos: [-0.58, 0.06, 0.08] }, // 7
  { name: 'PlushArmLL', parentIndex: 7, headPos: [-0.58, 0.06, 0.08], tailPos: [-0.84, -0.1, 0.18] }, // 8
  { name: 'PlushArmRU', parentIndex: 2, headPos: [0.34, 0.22, 0.02], tailPos: [0.58, 0.06, 0.08] }, // 9
  { name: 'PlushArmRL', parentIndex: 9, headPos: [0.58, 0.06, 0.08], tailPos: [0.84, -0.1, 0.18] }, // 10
  { name: 'PlushLegLU', parentIndex: 0, headPos: [-0.24, -0.42, 0.0], tailPos: [-0.26, -0.74, 0.04] }, // 11
  { name: 'PlushLegLL', parentIndex: 11, headPos: [-0.26, -0.74, 0.04], tailPos: [-0.28, -1.04, 0.16] }, // 12
  { name: 'PlushLegRU', parentIndex: 0, headPos: [0.24, -0.42, 0.0], tailPos: [0.26, -0.74, 0.04] }, // 13
  { name: 'PlushLegRL', parentIndex: 13, headPos: [0.26, -0.74, 0.04], tailPos: [0.28, -1.04, 0.16] }, // 14
  { name: 'PlushTail', parentIndex: 0, headPos: [0, -0.38, -0.34], tailPos: [0, -0.44, -0.78] }, // 15
];

function createPlushSkeleton(): { bones: THREE.Bone[]; skeleton: THREE.Skeleton } {
  const bones: THREE.Bone[] = [];
  PLUSH_BONE_DEFS.forEach((def, idx) => {
    const b = new THREE.Bone();
    b.name = def.name;
    if (def.parentIndex === -1) {
      b.position.set(def.headPos[0], def.headPos[1], def.headPos[2]);
    } else {
      const pDef = PLUSH_BONE_DEFS[def.parentIndex];
      b.position.set(
        def.headPos[0] - pDef.headPos[0],
        def.headPos[1] - pDef.headPos[1],
        def.headPos[2] - pDef.headPos[2]
      );
      bones[def.parentIndex].add(b);
    }
    bones.push(b);
    void idx;
  });
  return { bones, skeleton: new THREE.Skeleton(bones) };
}

/**
 * Sculpts a SINGLE continuous, water-tight, seamless organic 3D mesh using
 * Polynomial Smooth-Min (smin) Signed Distance Fields + MarchingCubes +
 * Smooth Vertex Color Blending + 16-Bone Skin Weight Binding.
 */
function buildSeamlessSculptedPlushGeometry(
  archetype: ToyArchetypeId,
  primaryHex: string,
  secondaryHex: string
): THREE.BufferGeometry {
  const cacheKey = `${archetype}_${primaryHex}_${secondaryHex}`;
  const cached = sculptedGeometryCache.get(cacheKey);
  if (cached) return cached.clone();

  const res = 54;
  const dummyMat = new THREE.MeshBasicMaterial();
  const mc = new MarchingCubes(res, dummyMat, true, true, 55000);
  mc.isolation = 0.0;

  const colPrimary = new THREE.Color(primaryHex);
  const colSecondary = new THREE.Color(secondaryHex);
  const colCheek = new THREE.Color('#fb7185');
  const colPaw = colSecondary.clone().lerp(colPrimary, 0.25);

  const size = mc.size;
  const size2 = mc.size2;
  const half = mc.halfsize;
  const field = mc.field;
  const palette = mc.palette;

  for (let z = 1; z < size - 1; z++) {
    const fz = (z - half) / half;
    const zOff = z * size2;
    for (let y = 1; y < size - 1; y++) {
      const fy = (y - half) / half;
      const yOff = zOff + y * size;
      for (let x = 1; x < size - 1; x++) {
        const fx = (x - half) / half;
        const ax = Math.abs(fx);

        // 1. Chubby Pear-Shaped Plush Torso & Soft Lower Tummy
        const dTorso = ellipsoidSDF(fx, fy, fz, 0, -0.1, 0, 0.31, 0.35, 0.26);
        const dTummy = ellipsoidSDF(fx, fy, fz, 0, -0.15, 0.08, 0.23, 0.25, 0.21);
        let dBody = smin(dTorso, dTummy, 0.11);

        // 2. Seamless Organic Head + Chubby Cheeks + Plush Snout
        const dHead = ellipsoidSDF(fx, fy, fz, 0, 0.39, 0.02, 0.3, 0.27, 0.26);
        const dCheeks = ellipsoidSDF(ax, fy, fz, 0.15, 0.33, 0.15, 0.13, 0.11, 0.12);
        const snoutLen = archetype === 'dino_plush' ? 0.2 : 0.14;
        const dSnout = ellipsoidSDF(fx, fy, fz, 0, 0.33, 0.23, 0.14, 0.11, snoutLen);

        let dHeadFull = smin(dHead, dCheeks, 0.08);
        dHeadFull = smin(dHeadFull, dSnout, 0.075);

        // Smooth neck fillet connecting Head and Torso into ONE continuous skin
        dBody = smin(dBody, dHeadFull, 0.105);

        // 3. Seamless Sculpted Arms & Chubby Paws (Symmetrical via ax = |fx|)
        const dArm = capsuleSDF(ax, fy, fz, 0.23, 0.13, 0.01, 0.54, -0.06, 0.11, 0.098);
        const dPaw = ellipsoidSDF(ax, fy, fz, 0.56, -0.07, 0.12, 0.11, 0.1, 0.11);
        const dArmFull = smin(dArm, dPaw, 0.06);
        dBody = smin(dBody, dArmFull, 0.095);

        // 4. Seamless Sculpted Legs & Plush Feet
        const dLeg = capsuleSDF(ax, fy, fz, 0.16, -0.34, 0.0, 0.19, -0.68, 0.03, 0.115);
        const dFoot = ellipsoidSDF(ax, fy, fz, 0.2, -0.71, 0.1, 0.125, 0.085, 0.155);
        const dLegFull = smin(dLeg, dFoot, 0.065);
        dBody = smin(dBody, dLegFull, 0.095);

        // 5. Archetype-Specific Seamless Ears, Crest & Tail
        let dEar = 999.0;
        let dTail = 999.0;
        let dCrest = 999.0;

        if (archetype === 'bunny_plush') {
          dEar = capsuleSDF(ax, fy, fz, 0.13, 0.6, 0.0, 0.18, 0.9, -0.02, 0.075);
          dTail = ellipsoidSDF(fx, fy, fz, 0, -0.28, -0.27, 0.1, 0.1, 0.1);
        } else if (archetype === 'dino_plush') {
          dTail = capsuleSDF(fx, fy, fz, 0, -0.25, -0.2, 0, -0.36, -0.58, 0.115);
          const c1 = ellipsoidSDF(fx, fy, fz, 0, 0.67, -0.05, 0.055, 0.09, 0.09);
          const c2 = ellipsoidSDF(fx, fy, fz, 0, 0.5, -0.22, 0.055, 0.09, 0.09);
          const c3 = ellipsoidSDF(fx, fy, fz, 0, 0.2, -0.28, 0.055, 0.09, 0.09);
          const c4 = ellipsoidSDF(fx, fy, fz, 0, -0.08, -0.29, 0.055, 0.085, 0.085);
          dCrest = Math.min(c1, c2, c3, c4);
        } else if (archetype === 'kitty_plush') {
          dEar = capsuleSDF(ax, fy, fz, 0.18, 0.58, 0.01, 0.25, 0.74, 0.01, 0.068);
          dTail = capsuleSDF(fx, fy, fz, 0, -0.28, -0.23, 0.16, -0.06, -0.45, 0.058);
        } else {
          // Teddy Bear & Custom Plush Doll round ears + cute pom tail
          dEar = ellipsoidSDF(ax, fy, fz, 0.24, 0.62, 0.01, 0.115, 0.115, 0.07);
          dTail = ellipsoidSDF(fx, fy, fz, 0, -0.28, -0.27, 0.09, 0.09, 0.09);
        }

        if (dEar < 10) dBody = smin(dBody, dEar, 0.065);
        if (dTail < 10) dBody = smin(dBody, dTail, 0.085);
        if (dCrest < 10) dBody = smin(dBody, dCrest, 0.06);

        const q = yOff + x;
        field[q] = -dBody * 100.0;

        // Smooth Vertex Color Zones (Belly patch, Snout, Inner Ears, Cheeks, Paw Pads)
        if (dBody < 0.12) {
          let r = colPrimary.r;
          let g = colPrimary.g;
          let b = colPrimary.b;

          // Belly & Snout cream/pastel blend
          const bellyMask =
            fz > 0.08 && ax < 0.21 && fy > -0.35 && fy < 0.14
              ? Math.min(1, (0.21 - ax) * 7.5 * Math.min(1, (fz - 0.08) * 8))
              : 0;
          const snoutMask = dSnout < 0.05 ? Math.max(0, Math.min(1, (0.05 - dSnout) * 14)) : 0;
          const crestMask = dCrest < 0.05 ? Math.max(0, Math.min(1, (0.05 - dCrest) * 14)) : 0;
          const earInnerMask =
            dEar < 0.03 && fz > 0.01 ? Math.max(0, Math.min(1, (0.03 - dEar) * 18)) : 0;

          const secWeight = Math.max(bellyMask, snoutMask * 0.85, crestMask, earInnerMask * 0.8);
          if (secWeight > 0) {
            r = r * (1 - secWeight) + colSecondary.r * secWeight;
            g = g * (1 - secWeight) + colSecondary.g * secWeight;
            b = b * (1 - secWeight) + colSecondary.b * secWeight;
          }

          // Rosy Plush Cheek Blush
          const dCheekCenter = Math.sqrt(
            (ax - 0.18) * (ax - 0.18) + (fy - 0.33) * (fy - 0.33) + (fz - 0.22) * (fz - 0.22)
          );
          if (dCheekCenter < 0.095) {
            const cw = (1 - dCheekCenter / 0.095) * 0.55;
            r = r * (1 - cw) + colCheek.r * cw;
            g = g * (1 - cw) + colCheek.g * cw;
            b = b * (1 - cw) + colCheek.b * cw;
          }

          // Soft Paw & Foot Pads
          if ((dPaw < 0.03 || dFoot < 0.03) && fz > 0.1) {
            r = r * 0.4 + colPaw.r * 0.6;
            g = g * 0.4 + colPaw.g * 0.6;
            b = b * 0.4 + colPaw.b * 0.6;
          }

          const q3 = q * 3;
          palette[q3] = r;
          palette[q3 + 1] = g;
          palette[q3 + 2] = b;
        }
      }
    }
  }

  mc.update();

  // Weld coincident MarchingCubes vertices into an indexed topology and apply
  // 5 passes of Taubin/Laplacian surface smoothing (zero shrinkage, Pixar-smooth skin)
  const rawTriVertCount = mc.count;
  const srcPos = mc.geometry.getAttribute('position').array as Float32Array;
  const srcCol = mc.geometry.getAttribute('color').array as Float32Array;
  const scaleFactor = 1.42;

  const weldMap = new Map<string, number>();
  const uPos: number[] = [];
  const uCol: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < rawTriVertCount; i++) {
    const i3 = i * 3;
    const vx = srcPos[i3] * scaleFactor;
    const vy = srcPos[i3 + 1] * scaleFactor;
    const vz = srcPos[i3 + 2] * scaleFactor;

    const key = `${Math.round(vx * 2500)}_${Math.round(vy * 2500)}_${Math.round(vz * 2500)}`;
    let uIdx = weldMap.get(key);
    if (uIdx === undefined) {
      uIdx = uPos.length / 3;
      weldMap.set(key, uIdx);
      uPos.push(vx, vy, vz);
      uCol.push(srcCol[i3], srcCol[i3 + 1], srcCol[i3 + 2]);
    }
    indices.push(uIdx);
  }

  const numUnique = uPos.length / 3;
  const posArr = new Float32Array(uPos);
  const colArr = new Float32Array(uCol);

  // Build vertex adjacency graph for Taubin surface relaxation
  const adj: number[][] = Array.from({ length: numUnique }, () => []);
  const addEdge = (a: number, b: number) => {
    const list = adj[a];
    if (!list.includes(b)) list.push(b);
  };
  for (let t = 0; t < indices.length; t += 3) {
    const i0 = indices[t];
    const i1 = indices[t + 1];
    const i2 = indices[t + 2];
    addEdge(i0, i1);
    addEdge(i0, i2);
    addEdge(i1, i0);
    addEdge(i1, i2);
    addEdge(i2, i0);
    addEdge(i2, i1);
  }

  const tmpPos = new Float32Array(posArr.length);
  const taubinFactors = [0.46, -0.48, 0.46, -0.48, 0.42, -0.44, 0.35];
  for (const factor of taubinFactors) {
    for (let u = 0; u < numUnique; u++) {
      const nbrs = adj[u];
      const u3 = u * 3;
      if (nbrs.length === 0) {
        tmpPos[u3] = posArr[u3];
        tmpPos[u3 + 1] = posArr[u3 + 1];
        tmpPos[u3 + 2] = posArr[u3 + 2];
        continue;
      }
      let ax = 0,
        ay = 0,
        az = 0;
      for (let k = 0; k < nbrs.length; k++) {
        const n3 = nbrs[k] * 3;
        ax += posArr[n3];
        ay += posArr[n3 + 1];
        az += posArr[n3 + 2];
      }
      ax /= nbrs.length;
      ay /= nbrs.length;
      az /= nbrs.length;

      tmpPos[u3] = posArr[u3] + factor * (ax - posArr[u3]);
      tmpPos[u3 + 1] = posArr[u3 + 1] + factor * (ay - posArr[u3 + 1]);
      tmpPos[u3 + 2] = posArr[u3 + 2] + factor * (az - posArr[u3 + 2]);
    }
    posArr.set(tmpPos);
  }

  const uvArr = new Float32Array(numUnique * 2);
  const skinIndices = new Uint16Array(numUnique * 4);
  const skinWeights = new Float32Array(numUnique * 4);

  for (let i = 0; i < numUnique; i++) {
    const i3 = i * 3;
    const vx = posArr[i3];
    const vy = posArr[i3 + 1];
    const vz = posArr[i3 + 2];

    // Planar front-projection UVs for custom uploaded toy texture support
    uvArr[i * 2] = Math.max(0, Math.min(1, (vx + 0.85) / 1.7));
    uvArr[i * 2 + 1] = Math.max(0, Math.min(1, (vy + 1.1) / 2.2));

    // Compute smooth skinning weights to the 16 bones
    let bestB0 = 0,
      bestB1 = 1,
      bestB2 = 2,
      bestB3 = 3;
    let bestW0 = 0,
      bestW1 = 0,
      bestW2 = 0,
      bestW3 = 0;

    for (let bIdx = 0; bIdx < PLUSH_BONE_DEFS.length; bIdx++) {
      const bDef = PLUSH_BONE_DEFS[bIdx];
      const d =
        capsuleSDF(
          vx,
          vy,
          vz,
          bDef.headPos[0],
          bDef.headPos[1],
          bDef.headPos[2],
          bDef.tailPos[0],
          bDef.tailPos[1],
          bDef.tailPos[2],
          0.0
        ) + 0.05;
      const w = 1.0 / Math.pow(d * d + 0.015, 2.2);
      if (w > bestW0) {
        bestW3 = bestW2;
        bestB3 = bestB2;
        bestW2 = bestW1;
        bestB2 = bestB1;
        bestW1 = bestW0;
        bestB1 = bestB0;
        bestW0 = w;
        bestB0 = bIdx;
      } else if (w > bestW1) {
        bestW3 = bestW2;
        bestB3 = bestB2;
        bestW2 = bestW1;
        bestB2 = bestB1;
        bestW1 = w;
        bestB1 = bIdx;
      } else if (w > bestW2) {
        bestW3 = bestW2;
        bestB3 = bestB2;
        bestW2 = w;
        bestB2 = bIdx;
      } else if (w > bestW3) {
        bestW3 = w;
        bestB3 = bIdx;
      }
    }

    const wSum = bestW0 + bestW1 + bestW2 + bestW3 || 1;
    const i4 = i * 4;
    skinIndices[i4] = bestB0;
    skinIndices[i4 + 1] = bestB1;
    skinIndices[i4 + 2] = bestB2;
    skinIndices[i4 + 3] = bestB3;

    skinWeights[i4] = bestW0 / wSum;
    skinWeights[i4 + 1] = bestW1 / wSum;
    skinWeights[i4 + 2] = bestW2 / wSum;
    skinWeights[i4 + 3] = bestW3 / wSum;
  }

  const geom = new THREE.BufferGeometry();
  geom.setIndex(indices);
  geom.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colArr, 3));
  geom.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
  geom.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(skinIndices, 4));
  geom.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));
  geom.computeVertexNormals();

  sculptedGeometryCache.set(cacheKey, geom);
  return geom.clone();
}

/**
 * Generates 9 full-body Pixar/TV-style skeletal AnimationClips for the 16-Bone
 * Seamless Plush Skeleton so `THREE.AnimationMixer` drives real motion.
 */
function buildPlushSkeletalAnimationClips(): THREE.AnimationClip[] {
  const qTrack = (
    boneName: string,
    times: number[],
    eulerKeys: [number, number, number][]
  ): THREE.QuaternionKeyframeTrack => {
    const values: number[] = [];
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    eulerKeys.forEach(([rx, ry, rz]) => {
      e.set(rx, ry, rz, 'XYZ');
      q.setFromEuler(e);
      values.push(q.x, q.y, q.z, q.w);
    });
    return new THREE.QuaternionKeyframeTrack(`${boneName}.quaternion`, times, values);
  };

  const vTrack = (
    boneName: string,
    times: number[],
    posKeys: [number, number, number][]
  ): THREE.VectorKeyframeTrack => {
    const values: number[] = [];
    posKeys.forEach(([px, py, pz]) => values.push(px, py, pz));
    return new THREE.VectorKeyframeTrack(`${boneName}.position`, times, values);
  };

  // 1. IDLE (Breathing, gentle head curiosity, soft ear & tail sway)
  const tIdle = [0, 0.8, 1.6, 2.4];
  const clipIdle = new THREE.AnimationClip('Idle', 2.4, [
    vTrack('PlushRoot', tIdle, [
      [0, -0.18, 0],
      [0, -0.15, 0],
      [0, -0.19, 0],
      [0, -0.18, 0],
    ]),
    qTrack('PlushSpine', tIdle, [
      [0, 0, 0],
      [0.03, 0.04, 0.02],
      [-0.02, -0.04, -0.02],
      [0, 0, 0],
    ]),
    qTrack('PlushHead', tIdle, [
      [0, 0, 0],
      [0.04, 0.12, 0.05],
      [-0.03, -0.12, -0.05],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tIdle, [
      [0, 0, 0],
      [0.08, 0, 0.08],
      [-0.05, 0, -0.04],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tIdle, [
      [0, 0, 0],
      [-0.05, 0, -0.08],
      [0.08, 0, 0.04],
      [0, 0, 0],
    ]),
    qTrack('PlushEarL', tIdle, [
      [0, 0, 0],
      [0.06, 0, 0.1],
      [-0.04, 0, -0.06],
      [0, 0, 0],
    ]),
    qTrack('PlushEarR', tIdle, [
      [0, 0, 0],
      [-0.04, 0, -0.1],
      [0.06, 0, 0.06],
      [0, 0, 0],
    ]),
    qTrack('PlushTail', tIdle, [
      [0, 0, 0],
      [0.1, 0.28, 0],
      [0.1, -0.28, 0],
      [0, 0, 0],
    ]),
  ]);

  // 2. WALK (Natural contra-lateral bipedal walking cycle with hip bob & knee bend)
  const tWalk = [0, 0.3, 0.6, 0.9, 1.2];
  const clipWalk = new THREE.AnimationClip('Walk', 1.2, [
    vTrack('PlushRoot', tWalk, [
      [0, -0.18, 0],
      [0, -0.11, 0.04],
      [0, -0.18, 0],
      [0, -0.11, 0.04],
      [0, -0.18, 0],
    ]),
    qTrack('PlushSpine', tWalk, [
      [0.06, -0.12, 0.04],
      [0.08, 0, 0],
      [0.06, 0.12, -0.04],
      [0.08, 0, 0],
      [0.06, -0.12, 0.04],
    ]),
    qTrack('PlushHead', tWalk, [
      [0, 0.08, -0.04],
      [-0.05, 0, 0],
      [0, -0.08, 0.04],
      [-0.05, 0, 0],
      [0, 0.08, -0.04],
    ]),
    qTrack('PlushLegLU', tWalk, [
      [-0.52, 0, 0],
      [0, 0, 0],
      [0.48, 0, 0],
      [-0.1, 0, 0],
      [-0.52, 0, 0],
    ]),
    qTrack('PlushLegLL', tWalk, [
      [0.15, 0, 0],
      [0.45, 0, 0],
      [0.1, 0, 0],
      [0.05, 0, 0],
      [0.15, 0, 0],
    ]),
    qTrack('PlushLegRU', tWalk, [
      [0.48, 0, 0],
      [-0.1, 0, 0],
      [-0.52, 0, 0],
      [0, 0, 0],
      [0.48, 0, 0],
    ]),
    qTrack('PlushLegRL', tWalk, [
      [0.1, 0, 0],
      [0.05, 0, 0],
      [0.15, 0, 0],
      [0.45, 0, 0],
      [0.1, 0, 0],
    ]),
    qTrack('PlushArmLU', tWalk, [
      [0.42, 0, 0.1],
      [0, 0, 0.1],
      [-0.42, 0, 0.1],
      [0, 0, 0.1],
      [0.42, 0, 0.1],
    ]),
    qTrack('PlushArmRU', tWalk, [
      [-0.42, 0, -0.1],
      [0, 0, -0.1],
      [0.42, 0, -0.1],
      [0, 0, -0.1],
      [-0.42, 0, -0.1],
    ]),
    qTrack('PlushTail', tWalk, [
      [0.15, 0.35, 0],
      [0.2, 0, 0],
      [0.15, -0.35, 0],
      [0.2, 0, 0],
      [0.15, 0.35, 0],
    ]),
  ]);

  // 3. RUN (Energetic cartoon run with forward lean, high knees & floppy ear bounce)
  const tRun = [0, 0.18, 0.36, 0.54, 0.72];
  const clipRun = new THREE.AnimationClip('Run', 0.72, [
    vTrack('PlushRoot', tRun, [
      [0, -0.19, 0],
      [0, -0.02, 0.08],
      [0, -0.19, 0],
      [0, -0.02, 0.08],
      [0, -0.19, 0],
    ]),
    qTrack('PlushSpine', tRun, [
      [0.22, -0.18, 0.06],
      [0.25, 0, 0],
      [0.22, 0.18, -0.06],
      [0.25, 0, 0],
      [0.22, -0.18, 0.06],
    ]),
    qTrack('PlushLegLU', tRun, [
      [-0.82, 0, 0],
      [0, 0, 0],
      [0.72, 0, 0],
      [-0.2, 0, 0],
      [-0.82, 0, 0],
    ]),
    qTrack('PlushLegRU', tRun, [
      [0.72, 0, 0],
      [-0.2, 0, 0],
      [-0.82, 0, 0],
      [0, 0, 0],
      [0.72, 0, 0],
    ]),
    qTrack('PlushArmLU', tRun, [
      [0.7, 0, 0.15],
      [0, 0, 0.15],
      [-0.7, 0, 0.15],
      [0, 0, 0.15],
      [0.7, 0, 0.15],
    ]),
    qTrack('PlushArmRU', tRun, [
      [-0.7, 0, -0.15],
      [0, 0, -0.15],
      [0.7, 0, -0.15],
      [0, 0, -0.15],
      [-0.7, 0, -0.15],
    ]),
    qTrack('PlushEarL', tRun, [
      [-0.25, 0, 0.15],
      [0.2, 0, 0.25],
      [-0.25, 0, 0.15],
      [0.2, 0, 0.25],
      [-0.25, 0, 0.15],
    ]),
    qTrack('PlushEarR', tRun, [
      [-0.25, 0, -0.15],
      [0.2, 0, -0.25],
      [-0.25, 0, -0.15],
      [0.2, 0, -0.25],
      [-0.25, 0, -0.15],
    ]),
  ]);

  // 4. DANCE (Joyful full-body rhythmic groove, raised arms, hip sway & head bop)
  const tDance = [0, 0.3, 0.6, 0.9, 1.2];
  const clipDance = new THREE.AnimationClip('Dance', 1.2, [
    vTrack('PlushRoot', tDance, [
      [-0.08, -0.18, 0],
      [0, -0.02, 0.05],
      [0.08, -0.18, 0],
      [0, -0.02, 0.05],
      [-0.08, -0.18, 0],
    ]),
    qTrack('PlushSpine', tDance, [
      [0, -0.18, 0.16],
      [-0.08, 0, 0],
      [0, 0.18, -0.16],
      [-0.08, 0, 0],
      [0, -0.18, 0.16],
    ]),
    qTrack('PlushHead', tDance, [
      [0.08, 0.2, -0.18],
      [-0.1, 0, 0.1],
      [0.08, -0.2, 0.18],
      [-0.1, 0, -0.1],
      [0.08, 0.2, -0.18],
    ]),
    qTrack('PlushArmLU', tDance, [
      [-0.3, 0, 0.85],
      [-0.5, 0, 0.35],
      [-0.3, 0, -0.2],
      [-0.5, 0, 0.85],
      [-0.3, 0, 0.85],
    ]),
    qTrack('PlushArmRU', tDance, [
      [-0.3, 0, 0.2],
      [-0.5, 0, -0.85],
      [-0.3, 0, -0.85],
      [-0.5, 0, -0.35],
      [-0.3, 0, 0.2],
    ]),
    qTrack('PlushLegLU', tDance, [
      [-0.35, 0, 0.15],
      [0.15, 0, 0],
      [0, 0, -0.1],
      [-0.4, 0, 0.1],
      [-0.35, 0, 0.15],
    ]),
    qTrack('PlushLegRU', tDance, [
      [0, 0, 0.1],
      [-0.4, 0, -0.1],
      [-0.35, 0, -0.15],
      [0.15, 0, 0],
      [0, 0, 0.1],
    ]),
    qTrack('PlushTail', tDance, [
      [0.2, 0.55, 0],
      [0.3, 0, 0],
      [0.2, -0.55, 0],
      [0.3, 0, 0],
      [0.2, 0.55, 0],
    ]),
  ]);

  // 5. JUMP (Anticipation crouch -> high leap with arms up -> soft landing)
  const tJump = [0, 0.22, 0.5, 0.78, 1.0];
  const clipJump = new THREE.AnimationClip('Jump', 1.0, [
    vTrack('PlushRoot', tJump, [
      [0, -0.18, 0],
      [0, -0.32, 0],
      [0, 0.26, 0.06],
      [0, -0.26, 0],
      [0, -0.18, 0],
    ]),
    qTrack('PlushSpine', tJump, [
      [0, 0, 0],
      [0.22, 0, 0],
      [-0.16, 0, 0],
      [0.14, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tJump, [
      [0, 0, 0],
      [0.3, 0, -0.2],
      [-0.4, 0, 0.95],
      [0.1, 0, 0.2],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tJump, [
      [0, 0, 0],
      [0.3, 0, 0.2],
      [-0.4, 0, -0.95],
      [0.1, 0, -0.2],
      [0, 0, 0],
    ]),
    qTrack('PlushLegLU', tJump, [
      [0, 0, 0],
      [-0.45, 0, 0],
      [0.35, 0, 0.12],
      [-0.3, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRU', tJump, [
      [0, 0, 0],
      [-0.45, 0, 0],
      [0.35, 0, -0.12],
      [-0.3, 0, 0],
      [0, 0, 0],
    ]),
  ]);

  // 6. WAVE (Right arm raised high waving hello with elbow flex & cheerful head tilt)
  const tWave = [0, 0.25, 0.5, 0.75, 1.0];
  const clipWave = new THREE.AnimationClip('Wave', 1.0, [
    qTrack('PlushHead', tWave, [
      [0, 0.1, 0.14],
      [-0.06, 0.15, 0.18],
      [0, 0.1, 0.12],
      [-0.06, 0.15, 0.18],
      [0, 0.1, 0.14],
    ]),
    qTrack('PlushArmRU', tWave, [
      [-0.35, 0, -0.92],
      [-0.35, 0, -1.08],
      [-0.35, 0, -0.78],
      [-0.35, 0, -1.08],
      [-0.35, 0, -0.92],
    ]),
    qTrack('PlushArmRL', tWave, [
      [0, 0, -0.25],
      [0, 0, -0.55],
      [0, 0, 0.15],
      [0, 0, -0.55],
      [0, 0, -0.25],
    ]),
    qTrack('PlushTail', tWave, [
      [0.1, 0.4, 0],
      [0.1, -0.4, 0],
      [0.1, 0.4, 0],
      [0.1, -0.4, 0],
      [0.1, 0.4, 0],
    ]),
  ]);

  // 7. YES (Enthusiastic nodding head + celebratory arms)
  const tYes = [0, 0.22, 0.45, 0.68, 0.9];
  const clipYes = new THREE.AnimationClip('Yes', 0.9, [
    qTrack('PlushHead', tYes, [
      [0, 0, 0],
      [0.34, 0, 0],
      [-0.14, 0, 0],
      [0.34, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tYes, [
      [0, 0, 0],
      [-0.4, 0, 0.55],
      [-0.2, 0, 0.35],
      [-0.4, 0, 0.55],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tYes, [
      [0, 0, 0],
      [-0.4, 0, -0.55],
      [-0.2, 0, -0.35],
      [-0.4, 0, -0.55],
      [0, 0, 0],
    ]),
  ]);

  // 8. NO (Gentle reassuring head shake)
  const tNo = [0, 0.25, 0.5, 0.75, 1.0];
  const clipNo = new THREE.AnimationClip('No', 1.0, [
    qTrack('PlushHead', tNo, [
      [0, 0, 0],
      [0, 0.36, 0.05],
      [0, -0.36, -0.05],
      [0, 0.32, 0.05],
      [0, 0, 0],
    ]),
  ]);

  // 9. SITTING / COMFORT HUG (Warm open arms forward & gentle soothing sway)
  const tHug = [0, 0.8, 1.6, 2.4];
  const clipHug = new THREE.AnimationClip('Sitting', 2.4, [
    vTrack('PlushRoot', tHug, [
      [0, -0.26, 0],
      [0, -0.23, 0.04],
      [0, -0.26, 0],
      [0, -0.26, 0],
    ]),
    qTrack('PlushSpine', tHug, [
      [0.05, 0, 0.08],
      [0.08, 0, -0.08],
      [0.05, 0, 0.08],
      [0.05, 0, 0.08],
    ]),
    qTrack('PlushHead', tHug, [
      [0.06, 0, 0.12],
      [0.06, 0, -0.12],
      [0.06, 0, 0.12],
      [0.06, 0, 0.12],
    ]),
    qTrack('PlushArmLU', tHug, [
      [-0.65, 0.35, 0.25],
      [-0.72, 0.48, 0.32],
      [-0.65, 0.35, 0.25],
      [-0.65, 0.35, 0.25],
    ]),
    qTrack('PlushArmRU', tHug, [
      [-0.65, -0.35, -0.25],
      [-0.72, -0.48, -0.32],
      [-0.65, -0.35, -0.25],
      [-0.65, -0.35, -0.25],
    ]),
    qTrack('PlushLegLU', tHug, [
      [-0.55, 0, 0.12],
      [-0.52, 0, 0.12],
      [-0.55, 0, 0.12],
      [-0.55, 0, 0.12],
    ]),
    qTrack('PlushLegRU', tHug, [
      [-0.55, 0, -0.12],
      [-0.52, 0, -0.12],
      [-0.55, 0, -0.12],
      [-0.55, 0, -0.12],
    ]),
  ]);

  // 10. KICK FOOTBALL (Athletic wind-up right leg back -> explosive soccer strike forward -> follow-through)
  const tKick = [0, 0.22, 0.42, 0.68, 0.95];
  const clipKick = new THREE.AnimationClip('KickFootball', 0.95, [
    vTrack('PlushRoot', tKick, [
      [0, -0.18, 0],
      [0, -0.22, -0.04],
      [0, -0.08, 0.12],
      [0, -0.14, 0.08],
      [0, -0.18, 0],
    ]),
    qTrack('PlushSpine', tKick, [
      [0, 0, 0],
      [0.14, 0.25, -0.08],
      [-0.22, -0.28, 0.12],
      [-0.1, -0.12, 0.05],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRU', tKick, [
      [0, 0, 0],
      [0.78, 0, -0.08],
      [-1.08, 0, 0.06],
      [-0.55, 0, 0.04],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRL', tKick, [
      [0, 0, 0],
      [0.72, 0, 0],
      [0.05, 0, 0],
      [0.2, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegLU', tKick, [
      [0, 0, 0],
      [-0.25, 0, 0],
      [0.18, 0, 0],
      [0.08, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tKick, [
      [0, 0, 0],
      [-0.65, 0, 0.45],
      [0.45, 0, 0.65],
      [0.15, 0, 0.25],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tKick, [
      [0, 0, 0],
      [0.5, 0, -0.35],
      [-0.55, 0, -0.55],
      [-0.2, 0, -0.25],
      [0, 0, 0],
    ]),
  ]);

  // 11. JUMP & CATCH IN MID-AIR (Deep knee crouch -> explosive upward leap with both arms reaching overhead to catch -> soft knee landing)
  const tCatch = [0, 0.22, 0.52, 0.8, 1.05];
  const clipJumpCatch = new THREE.AnimationClip('JumpCatch', 1.05, [
    vTrack('PlushRoot', tCatch, [
      [0, -0.18, 0],
      [0, -0.36, -0.02],
      [0, 0.34, 0.08],
      [0, -0.28, 0.02],
      [0, -0.18, 0],
    ]),
    qTrack('PlushSpine', tCatch, [
      [0, 0, 0],
      [0.28, 0, 0],
      [-0.22, 0, 0],
      [0.18, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushHead', tCatch, [
      [0, 0, 0],
      [0.12, 0, 0],
      [-0.36, 0, 0],
      [0.08, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tCatch, [
      [0, 0, 0],
      [0.45, 0, -0.2],
      [-1.35, 0, 0.55],
      [-0.3, 0, 0.25],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLL', tCatch, [
      [0, 0, 0],
      [0.3, 0, 0],
      [-0.35, 0, 0.2],
      [0, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tCatch, [
      [0, 0, 0],
      [0.45, 0, 0.2],
      [-1.35, 0, -0.55],
      [-0.3, 0, -0.25],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRL', tCatch, [
      [0, 0, 0],
      [0.3, 0, 0],
      [-0.35, 0, -0.2],
      [0, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegLU', tCatch, [
      [0, 0, 0],
      [-0.62, 0, 0],
      [0.28, 0, 0.1],
      [-0.42, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegLL', tCatch, [
      [0, 0, 0],
      [0.68, 0, 0],
      [0.12, 0, 0],
      [0.45, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRU', tCatch, [
      [0, 0, 0],
      [-0.62, 0, 0],
      [0.28, 0, -0.1],
      [-0.42, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRL', tCatch, [
      [0, 0, 0],
      [0.68, 0, 0],
      [0.12, 0, 0],
      [0.45, 0, 0],
      [0, 0, 0],
    ]),
  ]);

  // 12. CLAP HANDS (Rhythmic hand-clapping celebration in front of chest + joyful bounce)
  const tClap = [0, 0.2, 0.4, 0.6, 0.8];
  const clipClap = new THREE.AnimationClip('ClapHands', 0.8, [
    vTrack('PlushRoot', tClap, [
      [0, -0.18, 0],
      [0, -0.12, 0.03],
      [0, -0.18, 0],
      [0, -0.12, 0.03],
      [0, -0.18, 0],
    ]),
    qTrack('PlushHead', tClap, [
      [0, 0, 0.08],
      [-0.1, 0, -0.08],
      [0, 0, 0.08],
      [-0.1, 0, -0.08],
      [0, 0, 0.08],
    ]),
    qTrack('PlushArmLU', tClap, [
      [-0.65, 0.25, 0.15],
      [-0.75, 0.85, 0.45],
      [-0.65, 0.15, 0.05],
      [-0.75, 0.85, 0.45],
      [-0.65, 0.25, 0.15],
    ]),
    qTrack('PlushArmLL', tClap, [
      [-0.25, 0.35, 0],
      [-0.45, 0.75, 0.2],
      [-0.2, 0.2, 0],
      [-0.45, 0.75, 0.2],
      [-0.25, 0.35, 0],
    ]),
    qTrack('PlushArmRU', tClap, [
      [-0.65, -0.25, -0.15],
      [-0.75, -0.85, -0.45],
      [-0.65, -0.15, -0.05],
      [-0.75, -0.85, -0.45],
      [-0.65, -0.25, -0.15],
    ]),
    qTrack('PlushArmRL', tClap, [
      [-0.25, -0.35, 0],
      [-0.45, -0.75, -0.2],
      [-0.2, -0.2, 0],
      [-0.45, -0.75, -0.2],
      [-0.25, -0.35, 0],
    ]),
  ]);

  // 13. SIT RELAX (Child sitting down on the grass, knees bent, hands resting, swinging feet gently)
  const tSit = [0, 0.8, 1.6, 2.4];
  const clipSitRelax = new THREE.AnimationClip('SitRelax', 2.4, [
    vTrack('PlushRoot', tSit, [
      [0, -0.48, 0.06],
      [0, -0.46, 0.06],
      [0, -0.49, 0.06],
      [0, -0.48, 0.06],
    ]),
    qTrack('PlushSpine', tSit, [
      [-0.08, 0, 0.05],
      [-0.06, 0.06, -0.05],
      [-0.08, -0.06, 0.05],
      [-0.08, 0, 0.05],
    ]),
    qTrack('PlushHead', tSit, [
      [0.06, 0.14, 0.08],
      [0.04, -0.14, -0.08],
      [0.06, 0.14, 0.08],
      [0.06, 0.14, 0.08],
    ]),
    qTrack('PlushLegLU', tSit, [
      [-1.18, 0.22, 0.18],
      [-1.12, 0.22, 0.18],
      [-1.22, 0.22, 0.18],
      [-1.18, 0.22, 0.18],
    ]),
    qTrack('PlushLegLL', tSit, [
      [0.65, 0, 0],
      [0.42, 0, 0],
      [0.72, 0, 0],
      [0.65, 0, 0],
    ]),
    qTrack('PlushLegRU', tSit, [
      [-1.18, -0.22, -0.18],
      [-1.22, -0.22, -0.18],
      [-1.12, -0.22, -0.18],
      [-1.18, -0.22, -0.18],
    ]),
    qTrack('PlushLegRL', tSit, [
      [0.72, 0, 0],
      [0.65, 0, 0],
      [0.42, 0, 0],
      [0.72, 0, 0],
    ]),
    qTrack('PlushArmLU', tSit, [
      [-0.35, 0.2, 0.15],
      [-0.32, 0.2, 0.18],
      [-0.35, 0.2, 0.15],
      [-0.35, 0.2, 0.15],
    ]),
    qTrack('PlushArmRU', tSit, [
      [-0.35, -0.2, -0.15],
      [-0.32, -0.2, -0.18],
      [-0.35, -0.2, -0.15],
      [-0.35, -0.2, -0.15],
    ]),
  ]);

  // 14. THINK CURIOUS (Hand on chin, head tilted curiously, tapping foot while deciding what to do next!)
  const tThink = [0, 0.5, 1.0, 1.5, 2.0];
  const clipThink = new THREE.AnimationClip('ThinkCurious', 2.0, [
    qTrack('PlushSpine', tThink, [
      [0.04, 0.08, 0.06],
      [0.04, -0.06, 0.08],
      [0.04, 0.08, 0.06],
      [0.04, -0.06, 0.08],
      [0.04, 0.08, 0.06],
    ]),
    qTrack('PlushHead', tThink, [
      [-0.08, 0.18, 0.24],
      [-0.12, -0.12, 0.28],
      [-0.06, 0.18, 0.22],
      [-0.12, -0.12, 0.28],
      [-0.08, 0.18, 0.24],
    ]),
    qTrack('PlushArmRU', tThink, [
      [-0.85, -0.45, -0.35],
      [-0.88, -0.48, -0.38],
      [-0.85, -0.45, -0.35],
      [-0.88, -0.48, -0.38],
      [-0.85, -0.45, -0.35],
    ]),
    qTrack('PlushArmRL', tThink, [
      [-0.65, -0.55, -0.35],
      [-0.7, -0.58, -0.38],
      [-0.65, -0.55, -0.35],
      [-0.7, -0.58, -0.38],
      [-0.65, -0.55, -0.35],
    ]),
    qTrack('PlushArmLU', tThink, [
      [0.15, 0, 0.25],
      [0.15, 0, 0.28],
      [0.15, 0, 0.25],
      [0.15, 0, 0.28],
      [0.15, 0, 0.25],
    ]),
    qTrack('PlushLegRU', tThink, [
      [0, 0, 0],
      [-0.18, 0, 0],
      [0, 0, 0],
      [-0.18, 0, 0],
      [0, 0, 0],
    ]),
  ]);

  // 15. PEEKABOO HIDE (Both hands cover eyes while crouching, then pop wide open with surprise bounce!)
  const tPeek = [0, 0.45, 0.9, 1.35, 1.8];
  const clipPeekaboo = new THREE.AnimationClip('PeekabooHide', 1.8, [
    vTrack('PlushRoot', tPeek, [
      [0, -0.18, 0],
      [0, -0.32, -0.04],
      [0, -0.32, -0.04],
      [0, 0.08, 0.06],
      [0, -0.18, 0],
    ]),
    qTrack('PlushHead', tPeek, [
      [0, 0, 0],
      [0.24, 0, 0],
      [0.24, 0.1, 0],
      [-0.16, 0, 0.12],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tPeek, [
      [0, 0, 0],
      [-1.15, 0.65, 0.45],
      [-1.15, 0.65, 0.45],
      [-0.45, -0.35, 0.95],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tPeek, [
      [0, 0, 0],
      [-1.15, -0.65, -0.45],
      [-1.15, -0.65, -0.45],
      [-0.45, 0.35, -0.95],
      [0, 0, 0],
    ]),
  ]);

  // 16. STRETCH YAWN (Big cozy morning stretch with arms reaching high & spine arching back)
  const tStretch = [0, 0.6, 1.3, 1.9, 2.4];
  const clipStretch = new THREE.AnimationClip('StretchYawn', 2.4, [
    vTrack('PlushRoot', tStretch, [
      [0, -0.18, 0],
      [0, -0.08, 0],
      [0, -0.05, 0],
      [0, -0.2, 0],
      [0, -0.18, 0],
    ]),
    qTrack('PlushSpine', tStretch, [
      [0, 0, 0],
      [-0.22, 0, 0],
      [-0.26, 0, 0.06],
      [0.08, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushHead', tStretch, [
      [0, 0, 0],
      [-0.25, 0, 0.1],
      [-0.28, 0, -0.1],
      [0.06, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tStretch, [
      [0, 0, 0],
      [-1.25, 0, 0.85],
      [-1.35, 0, 0.95],
      [0.1, 0, 0.15],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tStretch, [
      [0, 0, 0],
      [-1.25, 0, -0.85],
      [-1.35, 0, -0.95],
      [0.1, 0, -0.15],
      [0, 0, 0],
    ]),
  ]);

  // 17. JUMPING JACKS (Energetic exercise jumping jacks: legs wide + arms overhead in sync!)
  const tJacks = [0, 0.25, 0.5, 0.75, 1.0];
  const clipJumpingJacks = new THREE.AnimationClip('JumpingJacks', 1.0, [
    vTrack('PlushRoot', tJacks, [
      [0, -0.18, 0],
      [0, 0.08, 0],
      [0, -0.22, 0],
      [0, 0.08, 0],
      [0, -0.18, 0],
    ]),
    qTrack('PlushArmLU', tJacks, [
      [0, 0, 0.1],
      [-0.2, 0, 1.35],
      [0, 0, 0.1],
      [-0.2, 0, 1.35],
      [0, 0, 0.1],
    ]),
    qTrack('PlushArmRU', tJacks, [
      [0, 0, -0.1],
      [-0.2, 0, -1.35],
      [0, 0, -0.1],
      [-0.2, 0, -1.35],
      [0, 0, -0.1],
    ]),
    qTrack('PlushLegLU', tJacks, [
      [0, 0, 0],
      [0, 0, -0.45],
      [0, 0, 0],
      [0, 0, -0.45],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRU', tJacks, [
      [0, 0, 0],
      [0, 0, 0.45],
      [0, 0, 0],
      [0, 0, 0.45],
      [0, 0, 0],
    ]),
  ]);

  // 18. SKIP HOP (Playful child skipping & hopping on one foot then the other)
  const tSkip = [0, 0.25, 0.5, 0.75, 1.0];
  const clipSkipHop = new THREE.AnimationClip('SkipHop', 1.0, [
    vTrack('PlushRoot', tSkip, [
      [0, -0.18, 0],
      [-0.06, 0.12, 0.05],
      [0, -0.2, 0],
      [0.06, 0.12, 0.05],
      [0, -0.18, 0],
    ]),
    qTrack('PlushLegLU', tSkip, [
      [0, 0, 0],
      [-0.75, 0, 0],
      [0.2, 0, 0],
      [0.35, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegLL', tSkip, [
      [0, 0, 0],
      [0.85, 0, 0],
      [0.1, 0, 0],
      [0.1, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRU', tSkip, [
      [0, 0, 0],
      [0.35, 0, 0],
      [0.2, 0, 0],
      [-0.75, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushLegRL', tSkip, [
      [0, 0, 0],
      [0.1, 0, 0],
      [0.1, 0, 0],
      [0.85, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tSkip, [
      [0, 0, 0.2],
      [0.55, 0, 0.35],
      [0, 0, 0.2],
      [-0.65, 0, 0.55],
      [0, 0, 0.2],
    ]),
    qTrack('PlushArmRU', tSkip, [
      [0, 0, -0.2],
      [-0.65, 0, -0.55],
      [0, 0, -0.2],
      [0.55, 0, -0.35],
      [0, 0, -0.2],
    ]),
  ]);

  // 19. CALM BREATHE (Slow 3.6s belly breathing co-regulation: hands rise on inhale, float down on exhale)
  const tCalm = [0, 1.2, 1.8, 3.2, 3.6];
  const clipCalmBreathe = new THREE.AnimationClip('CalmBreathe', 3.6, [
    vTrack('PlushRoot', tCalm, [
      [0, -0.18, 0],
      [0, -0.11, 0.02],
      [0, -0.1, 0.02],
      [0, -0.19, 0],
      [0, -0.18, 0],
    ]),
    qTrack('PlushSpine', tCalm, [
      [0.04, 0, 0],
      [-0.08, 0, 0],
      [-0.08, 0, 0],
      [0.05, 0, 0],
      [0.04, 0, 0],
    ]),
    qTrack('PlushArmLU', tCalm, [
      [-0.2, 0.2, 0.1],
      [-0.75, 0.25, 0.55],
      [-0.78, 0.25, 0.58],
      [-0.18, 0.2, 0.08],
      [-0.2, 0.2, 0.1],
    ]),
    qTrack('PlushArmRU', tCalm, [
      [-0.2, -0.2, -0.1],
      [-0.75, -0.25, -0.55],
      [-0.78, -0.25, -0.58],
      [-0.18, -0.2, -0.08],
      [-0.2, -0.2, -0.1],
    ]),
  ]);

  // 20. BOW TA-DA (Theatrical bow forward with one arm across tummy & one arm sweeping wide)
  const tBow = [0, 0.4, 0.9, 1.4, 1.8];
  const clipBowTaDa = new THREE.AnimationClip('BowTaDa', 1.8, [
    qTrack('PlushSpine', tBow, [
      [0, 0, 0],
      [0.52, 0.08, 0],
      [0.55, -0.08, 0],
      [-0.12, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushHead', tBow, [
      [0, 0, 0],
      [0.25, 0, 0.1],
      [0.2, 0, -0.1],
      [-0.1, 0, 0.08],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tBow, [
      [0, 0, 0],
      [-0.55, 0.75, 0.25],
      [-0.55, 0.75, 0.25],
      [-0.35, 0, 0.85],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tBow, [
      [0, 0, 0],
      [-0.25, -0.35, -1.05],
      [-0.25, -0.35, -1.12],
      [-0.35, 0, -0.85],
      [0, 0, 0],
    ]),
  ]);

  // 21. TIPTOE SNEAK (Playful high-knee tiptoe sneaking with curious head turns)
  const tSneak = [0, 0.35, 0.7, 1.05, 1.4];
  const clipTiptoe = new THREE.AnimationClip('TiptoeSneak', 1.4, [
    vTrack('PlushRoot', tSneak, [
      [0, -0.22, 0],
      [0, -0.08, 0.04],
      [0, -0.22, 0],
      [0, -0.08, 0.04],
      [0, -0.22, 0],
    ]),
    qTrack('PlushSpine', tSneak, [
      [0.18, -0.15, 0.08],
      [0.2, 0, 0],
      [0.18, 0.15, -0.08],
      [0.2, 0, 0],
      [0.18, -0.15, 0.08],
    ]),
    qTrack('PlushHead', tSneak, [
      [-0.1, 0.28, 0.08],
      [-0.1, 0, 0],
      [-0.1, -0.28, -0.08],
      [-0.1, 0, 0],
      [-0.1, 0.28, 0.08],
    ]),
    qTrack('PlushLegLU', tSneak, [
      [-0.68, 0, 0],
      [0.1, 0, 0],
      [0.35, 0, 0],
      [-0.2, 0, 0],
      [-0.68, 0, 0],
    ]),
    qTrack('PlushLegRU', tSneak, [
      [0.35, 0, 0],
      [-0.2, 0, 0],
      [-0.68, 0, 0],
      [0.1, 0, 0],
      [0.35, 0, 0],
    ]),
    qTrack('PlushArmLU', tSneak, [
      [-0.55, 0, 0.45],
      [-0.35, 0, 0.35],
      [-0.55, 0, 0.45],
      [-0.35, 0, 0.35],
      [-0.55, 0, 0.45],
    ]),
    qTrack('PlushArmRU', tSneak, [
      [-0.35, 0, -0.35],
      [-0.55, 0, -0.45],
      [-0.35, 0, -0.35],
      [-0.55, 0, -0.45],
      [-0.35, 0, -0.35],
    ]),
  ]);

  // 22. CHEER HURRAH (Victory fist-pumping high in the air with excited bounce)
  const tCheer = [0, 0.22, 0.45, 0.68, 0.9];
  const clipCheer = new THREE.AnimationClip('CheerHurrah', 0.9, [
    vTrack('PlushRoot', tCheer, [
      [0, -0.18, 0],
      [0, 0.06, 0.04],
      [0, -0.16, 0],
      [0, 0.08, 0.04],
      [0, -0.18, 0],
    ]),
    qTrack('PlushArmLU', tCheer, [
      [-0.5, 0, 0.75],
      [-1.25, 0, 0.95],
      [-0.6, 0, 0.75],
      [-1.3, 0, 0.98],
      [-0.5, 0, 0.75],
    ]),
    qTrack('PlushArmRU', tCheer, [
      [-0.5, 0, -0.75],
      [-1.25, 0, -0.95],
      [-0.6, 0, -0.75],
      [-1.3, 0, -0.98],
      [-0.5, 0, -0.75],
    ]),
    qTrack('PlushHead', tCheer, [
      [-0.1, 0, 0.1],
      [-0.22, 0, -0.1],
      [-0.1, 0, 0.1],
      [-0.22, 0, -0.1],
      [-0.1, 0, 0.1],
    ]),
  ]);

  // 23. TALK GESTURE (Expressive human conversational hand gestures while speaking)
  const tTalk = [0, 0.35, 0.7, 1.05, 1.4];
  const clipTalkGesture = new THREE.AnimationClip('TalkGesture', 1.4, [
    qTrack('PlushSpine', tTalk, [
      [0.03, 0.06, 0.03],
      [0.05, -0.06, -0.03],
      [0.02, 0.04, 0.04],
      [0.05, -0.04, -0.02],
      [0.03, 0.06, 0.03],
    ]),
    qTrack('PlushArmLU', tTalk, [
      [-0.45, 0.15, 0.25],
      [-0.65, 0.35, 0.45],
      [-0.35, 0.1, 0.2],
      [-0.58, 0.25, 0.38],
      [-0.45, 0.15, 0.25],
    ]),
    qTrack('PlushArmRU', tTalk, [
      [-0.35, -0.1, -0.2],
      [-0.58, -0.25, -0.38],
      [-0.45, -0.15, -0.25],
      [-0.65, -0.35, -0.45],
      [-0.35, -0.1, -0.2],
    ]),
  ]);

  // 24. CARTWHEEL / SOMMERSAULT FLIP (CartwheelFlip)
  const tCart = [0, 0.3, 0.6, 0.9, 1.2];
  const clipCartwheel = new THREE.AnimationClip('CartwheelFlip', 1.2, [
    vTrack('PlushRoot', tCart, [
      [0, -0.38, 0],
      [0, 0.25, 0],
      [0, 0.45, 0],
      [0, 0.15, 0],
      [0, -0.38, 0],
    ]),
    qTrack('PlushArmLU', tCart, [
      [0, 0, 2.15],
      [0, 0, 2.35],
      [0, 0, 2.35],
      [0, 0, 2.15],
      [0, 0, 2.15],
    ]),
    qTrack('PlushArmRU', tCart, [
      [0, 0, -2.15],
      [0, 0, -2.35],
      [0, 0, -2.35],
      [0, 0, -2.15],
      [0, 0, -2.15],
    ]),
    qTrack('PlushLegLU', tCart, [
      [0, 0, 0.35],
      [0, 0, 0.55],
      [0, 0, 0.55],
      [0, 0, 0.35],
      [0, 0, 0.35],
    ]),
    qTrack('PlushLegRU', tCart, [
      [0, 0, -0.35],
      [0, 0, -0.55],
      [0, 0, -0.55],
      [0, 0, -0.35],
      [0, 0, -0.35],
    ]),
  ]);

  // 25. BALANCE & HOP ON ONE FOOT (HopOneFoot)
  const tHop1 = [0, 0.25, 0.5, 0.75, 1.0];
  const clipHopOneFoot = new THREE.AnimationClip('HopOneFoot', 1.0, [
    vTrack('PlushRoot', tHop1, [
      [0, -0.36, 0],
      [0, -0.1, 0],
      [0, -0.38, 0],
      [0, -0.1, 0],
      [0, -0.36, 0],
    ]),
    qTrack('PlushLegLU', tHop1, [
      [-0.95, 0, 0.12],
      [-1.08, 0, 0.12],
      [-0.92, 0, 0.12],
      [-1.08, 0, 0.12],
      [-0.95, 0, 0.12],
    ]),
    qTrack('PlushLegLL', tHop1, [
      [1.15, 0, 0],
      [1.25, 0, 0],
      [1.1, 0, 0],
      [1.25, 0, 0],
      [1.15, 0, 0],
    ]),
    qTrack('PlushArmLU', tHop1, [
      [0, 0, 1.35],
      [0, 0, 1.55],
      [0, 0, 1.25],
      [0, 0, 1.55],
      [0, 0, 1.35],
    ]),
    qTrack('PlushArmRU', tHop1, [
      [0, 0, -1.35],
      [0, 0, -1.55],
      [0, 0, -1.25],
      [0, 0, -1.55],
      [0, 0, -1.35],
    ]),
  ]);

  // 26. AIRPLANE ARMS ZOOM (AirplaneZoom)
  const tPlane = [0, 0.4, 0.8, 1.2, 1.6];
  const clipAirplane = new THREE.AnimationClip('AirplaneZoom', 1.6, [
    qTrack('PlushSpine', tPlane, [
      [0.18, 0, 0.26],
      [0.18, 0, 0],
      [0.18, 0, -0.26],
      [0.18, 0, 0],
      [0.18, 0, 0.26],
    ]),
    qTrack('PlushArmLU', tPlane, [
      [0, 0, 1.48],
      [0, 0, 1.48],
      [0, 0, 1.48],
      [0, 0, 1.48],
      [0, 0, 1.48],
    ]),
    qTrack('PlushArmRU', tPlane, [
      [0, 0, -1.48],
      [0, 0, -1.48],
      [0, 0, -1.48],
      [0, 0, -1.48],
      [0, 0, -1.48],
    ]),
  ]);

  // 27. TOY SOLDIER PARADE MARCH WITH HIGH KNEES (MarchParade)
  const tMarch = [0, 0.25, 0.5, 0.75, 1.0];
  const clipMarch = new THREE.AnimationClip('MarchParade', 1.0, [
    vTrack('PlushRoot', tMarch, [
      [0, -0.36, 0],
      [0, -0.26, 0],
      [0, -0.36, 0],
      [0, -0.26, 0],
      [0, -0.36, 0],
    ]),
    qTrack('PlushLegLU', tMarch, [
      [-1.15, 0, 0],
      [0, 0, 0],
      [0.35, 0, 0],
      [0, 0, 0],
      [-1.15, 0, 0],
    ]),
    qTrack('PlushLegRU', tMarch, [
      [0.35, 0, 0],
      [0, 0, 0],
      [-1.15, 0, 0],
      [0, 0, 0],
      [0.35, 0, 0],
    ]),
    qTrack('PlushArmLU', tMarch, [
      [0.75, 0, 0.15],
      [0, 0, 0.15],
      [-0.95, 0, 0.15],
      [0, 0, 0.15],
      [0.75, 0, 0.15],
    ]),
    qTrack('PlushArmRU', tMarch, [
      [-0.95, 0, -0.15],
      [0, 0, -0.15],
      [0.75, 0, -0.15],
      [0, 0, -0.15],
      [-0.95, 0, -0.15],
    ]),
  ]);

  // 28. HULA HOOP HIP WIGGLE (HulaWiggle)
  const tHula = [0, 0.25, 0.5, 0.75, 1.0];
  const clipHula = new THREE.AnimationClip('HulaWiggle', 1.0, [
    vTrack('PlushRoot', tHula, [
      [-0.12, -0.38, 0],
      [0, -0.38, 0.1],
      [0.12, -0.38, 0],
      [0, -0.38, -0.1],
      [-0.12, -0.38, 0],
    ]),
    qTrack('PlushSpine', tHula, [
      [0, 0, 0.22],
      [-0.15, 0, 0],
      [0, 0, -0.22],
      [0.15, 0, 0],
      [0, 0, 0.22],
    ]),
    qTrack('PlushArmLU', tHula, [
      [-0.2, 0, 0.65],
      [-0.2, 0, 0.65],
      [-0.2, 0, 0.65],
      [-0.2, 0, 0.65],
      [-0.2, 0, 0.65],
    ]),
    qTrack('PlushArmRU', tHula, [
      [-0.2, 0, -0.65],
      [-0.2, 0, -0.65],
      [-0.2, 0, -0.65],
      [-0.2, 0, -0.65],
      [-0.2, 0, -0.65],
    ]),
  ]);

  // 29. SUPERHERO POWER POSE (SuperheroPose)
  const tHero = [0, 0.5, 1.0, 1.5, 2.0];
  const clipHero = new THREE.AnimationClip('SuperheroPose', 2.0, [
    qTrack('PlushSpine', tHero, [
      [-0.14, 0, 0],
      [-0.2, 0, 0],
      [-0.16, 0, 0],
      [-0.2, 0, 0],
      [-0.14, 0, 0],
    ]),
    qTrack('PlushArmRU', tHero, [
      [-0.25, 0, -2.35],
      [-0.35, 0, -2.48],
      [-0.25, 0, -2.35],
      [-0.35, 0, -2.48],
      [-0.25, 0, -2.35],
    ]),
    qTrack('PlushArmLU', tHero, [
      [-0.15, 0, 0.55],
      [-0.15, 0, 0.55],
      [-0.15, 0, 0.55],
      [-0.15, 0, 0.55],
      [-0.15, 0, 0.55],
    ]),
  ]);

  // 30. BELLY LAUGH & GIGGLE (LaughGiggle)
  const tLaugh = [0, 0.18, 0.36, 0.54, 0.72, 0.9];
  const clipLaugh = new THREE.AnimationClip('LaughGiggle', 0.9, [
    vTrack('PlushRoot', tLaugh, [
      [0, -0.38, 0],
      [0, -0.32, 0],
      [0, -0.38, 0],
      [0, -0.32, 0],
      [0, -0.38, 0],
      [0, -0.38, 0],
    ]),
    qTrack('PlushHead', tLaugh, [
      [-0.12, 0, 0.08],
      [0.08, 0, -0.08],
      [-0.12, 0, 0.08],
      [0.08, 0, -0.08],
      [-0.12, 0, 0.08],
      [-0.12, 0, 0.08],
    ]),
    qTrack('PlushArmRU', tLaugh, [
      [-1.15, -0.25, -0.2],
      [-1.22, -0.25, -0.2],
      [-1.15, -0.25, -0.2],
      [-1.22, -0.25, -0.2],
      [-1.15, -0.25, -0.2],
      [-1.15, -0.25, -0.2],
    ]),
    qTrack('PlushArmLU', tLaugh, [
      [-0.65, 0.35, 0.15],
      [-0.65, 0.35, 0.15],
      [-0.65, 0.35, 0.15],
      [-0.65, 0.35, 0.15],
      [-0.65, 0.35, 0.15],
      [-0.65, 0.35, 0.15],
    ]),
  ]);

  // 31. BLOW A SWEET KISS (BlowKiss)
  const tKiss = [0, 0.45, 0.9, 1.35, 1.8];
  const clipBlowKiss = new THREE.AnimationClip('BlowKiss', 1.8, [
    qTrack('PlushHead', tKiss, [
      [0, 0, 0],
      [0.08, 0, 0.12],
      [-0.08, 0, -0.06],
      [-0.05, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tKiss, [
      [-0.35, 0, -0.25],
      [-1.32, -0.3, -0.12],
      [-0.75, 0.2, -1.25],
      [-0.65, 0.15, -1.05],
      [-0.35, 0, -0.25],
    ]),
  ]);

  // 32. JUMP HIGH-FIVE (HighFive)
  const tH5 = [0, 0.3, 0.6, 0.9, 1.2];
  const clipHighFive = new THREE.AnimationClip('HighFive', 1.2, [
    vTrack('PlushRoot', tH5, [
      [0, -0.38, 0],
      [0, 0.18, 0.18],
      [0, 0.24, 0.22],
      [0, -0.32, 0.08],
      [0, -0.38, 0],
    ]),
    qTrack('PlushArmRU', tH5, [
      [-0.35, 0, -0.35],
      [-1.45, 0, -1.65],
      [-1.55, 0, -1.75],
      [-0.85, 0, -0.95],
      [-0.35, 0, -0.35],
    ]),
  ]);

  // 33. POINT & LOOK AT RAINBOW / SKY (PointLook)
  const tPoint = [0, 0.5, 1.0, 1.5, 2.0];
  const clipPointLook = new THREE.AnimationClip('PointLook', 2.0, [
    qTrack('PlushHead', tPoint, [
      [0, 0, 0],
      [-0.35, -0.28, 0.08],
      [-0.38, -0.32, 0.1],
      [-0.35, -0.28, 0.08],
      [0, 0, 0],
    ]),
    qTrack('PlushArmRU', tPoint, [
      [-0.25, 0, -0.35],
      [-0.95, -0.25, -1.85],
      [-1.05, -0.28, -1.95],
      [-0.95, -0.25, -1.85],
      [-0.25, 0, -0.35],
    ]),
  ]);

  // 34. COZY SLEEPY NAP (SleepyNap)
  const tNap = [0, 0.7, 1.4, 2.1, 2.8];
  const clipSleepyNap = new THREE.AnimationClip('SleepyNap', 2.8, [
    qTrack('PlushHead', tNap, [
      [0.08, 0, 0.32],
      [0.12, 0, 0.36],
      [0.08, 0, 0.32],
      [0.12, 0, 0.36],
      [0.08, 0, 0.32],
    ]),
    qTrack('PlushArmRU', tNap, [
      [-1.18, -0.35, -0.22],
      [-1.18, -0.35, -0.22],
      [-1.18, -0.35, -0.22],
      [-1.18, -0.35, -0.22],
      [-1.18, -0.35, -0.22],
    ]),
    qTrack('PlushArmLU', tNap, [
      [-1.18, -0.15, 0.45],
      [-1.18, -0.15, 0.45],
      [-1.18, -0.15, 0.45],
      [-1.18, -0.15, 0.45],
      [-1.18, -0.15, 0.45],
    ]),
  ]);

  // 35. COUNT ON FINGERS 1-2-3-4-5 (CountFingers)
  const tCount = [0, 0.3, 0.6, 0.9, 1.2, 1.5];
  const clipCountFingers = new THREE.AnimationClip('CountFingers', 1.5, [
    qTrack('PlushHead', tCount, [
      [0.08, -0.12, 0],
      [-0.05, 0.12, 0],
      [0.08, -0.12, 0],
      [-0.05, 0.12, 0],
      [0.08, 0, 0],
      [0, 0, 0],
    ]),
    qTrack('PlushArmLU', tCount, [
      [-0.95, 0.25, 0.35],
      [-1.15, 0.25, 0.45],
      [-0.95, 0.25, 0.35],
      [-1.15, 0.25, 0.45],
      [-0.95, 0.25, 0.35],
      [-0.95, 0.25, 0.35],
    ]),
    qTrack('PlushArmRU', tCount, [
      [-1.15, -0.25, -0.45],
      [-0.95, -0.25, -0.35],
      [-1.15, -0.25, -0.45],
      [-0.95, -0.25, -0.35],
      [-1.15, -0.25, -0.45],
      [-0.95, -0.25, -0.35],
    ]),
  ]);

  return [
    clipIdle,
    clipWalk,
    clipRun,
    clipDance,
    clipJump,
    clipWave,
    clipYes,
    clipNo,
    clipHug,
    clipKick,
    clipJumpCatch,
    clipClap,
    clipSitRelax,
    clipThink,
    clipPeekaboo,
    clipStretch,
    clipJumpingJacks,
    clipSkipHop,
    clipCalmBreathe,
    clipBowTaDa,
    clipTiptoe,
    clipCheer,
    clipTalkGesture,
    clipCartwheel,
    clipHopOneFoot,
    clipAirplane,
    clipMarch,
    clipHula,
    clipHero,
    clipLaugh,
    clipBlowKiss,
    clipHighFive,
    clipPointLook,
    clipSleepyNap,
    clipCountFingers,
  ];
}

/**
 * Attaches high-detail glossy 3D eyes, specular catchlights, velvet nose, and
 * articulated jaw/mouth directly to the Head & Jaw bones of the SkinnedMesh.
 */
function attachPlushFacialDetailsToHeadBone(
  headBone: THREE.Bone,
  jawBone: THREE.Bone,
  archetype: ToyArchetypeId
): THREE.Object3D[] {
  const eyeWhiteGeo = new THREE.SphereGeometry(0.088, 24, 24);
  eyeWhiteGeo.scale(1, 1.12, 0.65);
  const eyeWhiteMat = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.12,
    clearcoat: 1.0,
  });

  const pupilGeo = new THREE.SphereGeometry(0.062, 24, 24);
  pupilGeo.scale(1, 1.12, 0.72);
  const pupilMat = new THREE.MeshPhysicalMaterial({
    color: '#0f172a',
    roughness: 0.05,
    clearcoat: 1.0,
  });

  const sparkGeo = new THREE.SphereGeometry(0.022, 16, 16);
  const sparkMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });

  const eyeGroups: THREE.Object3D[] = [];
  [-0.175, 0.175].forEach((ex) => {
    const eyeGrp = new THREE.Group();
    eyeGrp.position.set(ex, 0.16, 0.34);

    const ew = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.set(0, 0, 0.035);

    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.set(0.022, 0.03, 0.08);

    eyeGrp.add(ew, pupil, spark);
    headBone.add(eyeGrp);
    eyeGroups.push(eyeGrp);
  });

  // Soft Velvet Sculpted Nose on Snout
  const noseGeo = new THREE.SphereGeometry(0.068, 24, 24);
  noseGeo.scale(1.3, 0.88, 0.85);
  const noseColor =
    archetype === 'bunny_plush' || archetype === 'kitty_plush' ? '#f43f5e' : '#291509';
  const noseMat = new THREE.MeshPhysicalMaterial({
    color: noseColor,
    roughness: 0.35,
    sheen: 0.8,
  });
  const nose = new THREE.Mesh(noseGeo, noseMat);
  nose.position.set(0, 0.08, archetype === 'dino_plush' ? 0.56 : 0.49);
  headBone.add(nose);

  // Expressive Mouth attached to Jaw Bone for real lip-sync
  const mouthGeo = new THREE.SphereGeometry(0.075, 20, 20);
  mouthGeo.scale(1.35, 0.55, 0.65);
  const mouthMat = new THREE.MeshStandardMaterial({
    color: '#be123c',
    roughness: 0.4,
  });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -0.04, archetype === 'dino_plush' ? 0.24 : 0.18);
  jawBone.add(mouth);

  return eyeGroups;
}

// ============================================================================
// PART 2: UNIFIED BUILDER (Seamless Skinned Plush + Studio GLB Loader)
// ============================================================================

export function buildSmooth3DToyRig(
  archetype: ToyArchetypeId,
  primaryHex: string,
  secondaryHex: string,
  customTexture?: THREE.Texture | null
): AnimatedToyRig {
  const root = new THREE.Group();
  const innerModel = new THREE.Group();
  root.add(innerModel);

  const catalogEntry = PREBUILT_3D_TOY_CATALOG.find((item) => item.id === archetype);
  const glbUrl = catalogEntry?.glbUrl;

  const isFlyingToy =
    archetype === 'parrot_bird' ||
    archetype === 'owl_bird' ||
    archetype === 'penguin_bird' ||
    archetype === 'seagull_bird' ||
    archetype === 'train_toy';

  const isVehicleToy =
    archetype === 'racecar_toy' || archetype === 'truck_toy' || archetype === 'train_toy';

  // Always build the immediate seamless organic SkinnedMesh first (for plush toys, or as an instant
  // zero-latency stand-in during the 15ms async GLB parse for studio GLB toys)
  const { bones, skeleton } = createPlushSkeleton();
  const plushGeom = buildSeamlessSculptedPlushGeometry(
    glbUrl ? 'teddy_plush' : archetype,
    primaryHex,
    secondaryHex
  );

  const plushMat = new THREE.MeshPhysicalMaterial({
    vertexColors: !customTexture,
    color: customTexture ? '#ffffff' : '#ffffff',
    map: customTexture || null,
    roughness: 0.68,
    metalness: 0.02,
    sheen: 1.0,
    sheenRoughness: 0.38,
    sheenColor: new THREE.Color(secondaryHex),
    normalMap: getPlushVelvetNormalMap(),
    normalScale: new THREE.Vector2(0.14, 0.14),
  });

  const skinnedMesh = new THREE.SkinnedMesh(plushGeom, plushMat);
  skinnedMesh.castShadow = true;
  skinnedMesh.receiveShadow = true;
  skinnedMesh.add(bones[0]);
  skinnedMesh.bind(skeleton);

  const eyeMeshes = attachPlushFacialDetailsToHeadBone(bones[3], bones[4], archetype);
  innerModel.add(skinnedMesh);

  // Set up AnimationMixer & register all 35 skeletal clips
  const mixer = new THREE.AnimationMixer(innerModel);
  const actions: Record<string, THREE.AnimationAction> = {};
  const plushClips = buildPlushSkeletalAnimationClips();
  plushClips.forEach((clip) => {
    actions[clip.name] = mixer.clipAction(clip);
  });

  const defaultAction = actions['Idle'] || actions['Dance'] || null;
  if (defaultAction) {
    defaultAction.play();
  }

  const rig: AnimatedToyRig = {
    root,
    innerModel,
    mixer,
    actions,
    activeAction: defaultAction,
    activeClipType: 'idle',
    spineBone: bones[1] || null,
    headBoneOrGroup: bones[3],
    jawOrMouth: bones[4],
    rightArmBone: bones[9] || null,
    leftArmBone: bones[7] || null,
    rightForearmBone: bones[10] || null,
    leftForearmBone: bones[8] || null,
    rightLegBone: bones[13] || null,
    leftLegBone: bones[11] || null,
    rightShinBone: bones[14] || null,
    leftShinBone: bones[12] || null,
    eyeMeshes,
    morphMeshes: [],
    wheels: [],
    isFlyingToy,
    isVehicleToy,
    availableClipNames: Object.keys(actions),
  };

  // If this toy maps to one of our 15 Studio .GLB Models, load it via GLTFLoader + DRACOLoader!
  if (glbUrl) {
    const loader = getGltfLoader();
    loader.load(
      glbUrl,
      (gltf) => {
        // Clear the temporary stand-in mesh
        mixer.stopAllAction();
        while (innerModel.children.length > 0) {
          innerModel.remove(innerModel.children[0]);
        }

        const model = gltf.scene;
        model.updateMatrixWorld(true);

        // Normalize bounding box size & ground alignment on the stage pedestal
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        let targetSpan = 2.15;
        if (archetype === 'robot_buddy') targetSpan = 2.35;
        if (archetype === 'racecar_toy' || archetype === 'truck_toy') targetSpan = 2.45;
        if (isFlyingToy) targetSpan = 2.05;

        const normScale = targetSpan / maxDim;
        model.scale.setScalar(normScale);
        model.updateMatrixWorld(true);

        const scaledBox = new THREE.Box3().setFromObject(model);
        const scaledCenter = new THREE.Vector3();
        scaledBox.getCenter(scaledCenter);

        model.position.x = -scaledCenter.x;
        model.position.z = -scaledCenter.z;
        if (isFlyingToy) {
          model.position.y = -scaledCenter.y + 0.15;
        } else {
          model.position.y = -scaledBox.min.y - 1.18;
        }

        // Orient models that naturally face +X or -Z so they greet the child (+Z)
        if (archetype === 'truck_toy') {
          model.rotation.y = Math.PI * 0.35;
        } else if (archetype === 'racecar_toy') {
          model.rotation.y = Math.PI * 0.22;
        } else if (archetype === 'duck_toy') {
          model.rotation.y = -Math.PI * 0.35;
        }

        // Enhance materials with soft plush sheen / clearcoat & discover bones/morphs/wheels
        const morphMeshes: THREE.Mesh[] = [];
        const wheels: THREE.Object3D[] = [];
        let foundSpine: THREE.Object3D | null = null;
        let foundHead: THREE.Object3D | null = null;
        let foundJaw: THREE.Object3D | null = null;
        let foundRightArm: THREE.Object3D | null = null;
        let foundLeftArm: THREE.Object3D | null = null;
        let foundRightLeg: THREE.Object3D | null = null;
        let foundLeftLeg: THREE.Object3D | null = null;

        model.traverse((node) => {
          const nLow = node.name.toLowerCase();
          if (!foundSpine && (nLow.includes('spine') || nLow.includes('torso'))) {
            foundSpine = node;
          }
          if (!foundHead && (nLow.includes('head') || nLow.includes('neck'))) {
            foundHead = node;
          }
          if (!foundJaw && (nLow.includes('jaw') || nLow.includes('mouth'))) {
            foundJaw = node;
          }
          if (
            !foundRightArm &&
            (nLow.includes('armr') ||
              nLow.includes('rightarm') ||
              nLow.includes('shoulder.r') ||
              nLow.includes('handr'))
          ) {
            foundRightArm = node;
          }
          if (
            !foundLeftArm &&
            (nLow.includes('arml') ||
              nLow.includes('leftarm') ||
              nLow.includes('shoulder.l') ||
              nLow.includes('handl'))
          ) {
            foundLeftArm = node;
          }
          if (
            !foundRightLeg &&
            (nLow.includes('leg.r') ||
              nLow.includes('rightupleg') ||
              nLow.includes('thigh.r') ||
              nLow.includes('upperleg.r'))
          ) {
            foundRightLeg = node;
          }
          if (
            !foundLeftLeg &&
            (nLow.includes('leg.l') ||
              nLow.includes('leftupleg') ||
              nLow.includes('thigh.l') ||
              nLow.includes('upperleg.l'))
          ) {
            foundLeftLeg = node;
          }
          if (nLow.includes('wheel') || nLow.includes('tire')) {
            wheels.push(node);
          }

          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.morphTargetInfluences && mesh.morphTargetInfluences.length > 0) {
              morphMeshes.push(mesh);
            }
          }
        });

        // For Unicorn (`Horse.glb`), attach a magical golden spiral horn to its head area
        if (archetype === 'unicorn_plush') {
          const hornGeo = new THREE.ConeGeometry(0.11, 0.55, 24);
          const hornMat = new THREE.MeshPhysicalMaterial({
            color: '#facc15',
            roughness: 0.15,
            metalness: 0.65,
            clearcoat: 1.0,
          });
          const horn = new THREE.Mesh(hornGeo, hornMat);
          horn.position.set(0, 0.95, 0.72);
          horn.rotation.x = 0.45;
          innerModel.add(horn);
        }

        // If user uploaded a custom toy photo onto a GLB archetype, display a floating 3D badge
        if (customTexture) {
          const badgeGeo = new THREE.CircleGeometry(0.32, 32);
          const badgeMat = new THREE.MeshBasicMaterial({
            map: customTexture,
            side: THREE.DoubleSide,
          });
          const badge = new THREE.Mesh(badgeGeo, badgeMat);
          badge.position.set(0, 0.95, 0.68);
          innerModel.add(badge);
        }

        innerModel.add(model);

        const glbMixer = new THREE.AnimationMixer(model);
        const newActions: Record<string, THREE.AnimationAction> = {};
        gltf.animations.forEach((clip) => {
          const act = glbMixer.clipAction(clip);
          newActions[clip.name] = act;
        });

        rig.mixer = glbMixer;
        rig.actions = newActions;
        rig.availableClipNames = Object.keys(newActions);
        if (foundSpine) rig.spineBone = foundSpine;
        rig.headBoneOrGroup = foundHead;
        rig.jawOrMouth = foundJaw;
        if (foundRightArm) rig.rightArmBone = foundRightArm;
        if (foundLeftArm) rig.leftArmBone = foundLeftArm;
        if (foundRightLeg) rig.rightLegBone = foundRightLeg;
        if (foundLeftLeg) rig.leftLegBone = foundLeftLeg;
        rig.morphMeshes = morphMeshes;
        rig.wheels = wheels;

        // Play the matching motion clip right away
        playToyMotionClip(rig, rig.activeClipType);
      },
      undefined,
      () => {
        // Fallback keeps the seamless sculpted SkinnedMesh active
      }
    );
  }

  return rig;
}

/**
 * Maps a high-level child motion intent (`idle`, `walk`, `run`, `dance`, `jump`,
 * `wave`, `yes`, `no`, `hug`, `kick_football`, `jump_catch`, etc.) to the best available
 * skeletal/morph clip on the current 3D toy and crossfades smoothly.
 */
export function playToyMotionClip(rig: AnimatedToyRig, clipType: ToyMotionClipType): string {
  rig.activeClipType = clipType;
  const names = Object.keys(rig.actions);
  if (names.length === 0) return 'Procedural Motion';

  const preferenceTable: Record<ToyMotionClipType, string[]> = {
    idle: ['Idle', 'idle', 'Survey', 'Standing', 'SambaDance'],
    walk: ['Walk', 'Walking', 'walk', 'Survey', 'flight_path_1', 'Wheels'],
    run: ['Run', 'Running', 'run', 'WalkJump', 'flight_path_2', 'horse_A_'],
    dance: ['Dance', 'SambaDance', 'WalkJump', 'Jump', 'Run', 'flight_path_3'],
    jump: ['Jump', 'JumpCatch', 'WalkJump', 'Dance', 'Run', 'flight_path_2'],
    wave: ['Wave', 'ThumbsUp', 'Yes', 'agree', 'Survey'],
    yes: ['Yes', 'ThumbsUp', 'agree', 'Wave', 'Jump'],
    no: ['No', 'headShake', 'Wave', 'Idle'],
    hug: ['Sitting', 'sad_pose', 'Standing', 'Idle', 'Survey'],
    kick_football: ['KickFootball', 'Punch', 'WalkJump', 'Run', 'Jump'],
    jump_catch: ['JumpCatch', 'Jump', 'WalkJump', 'ThumbsUp', 'Wave'],
    clap_hands: ['ClapHands', 'ThumbsUp', 'Wave', 'Yes', 'Dance'],
    sit_relax: ['SitRelax', 'Sitting', 'sad_pose', 'Idle', 'Standing'],
    think_curious: ['ThinkCurious', 'Survey', 'Idle', 'Standing'],
    peekaboo_hide: ['PeekabooHide', 'Jump', 'Wave', 'Yes'],
    stretch_yawn: ['StretchYawn', 'Standing', 'Idle', 'Wave'],
    jumping_jacks: ['JumpingJacks', 'JumpCatch', 'Jump', 'Dance'],
    skip_hop: ['SkipHop', 'WalkJump', 'Run', 'Jump', 'Walk'],
    calm_breathe: ['CalmBreathe', 'Idle', 'Sitting', 'Standing'],
    bow_ta_da: ['BowTaDa', 'Yes', 'Wave', 'ThumbsUp'],
    tiptoe_sneak: ['TiptoeSneak', 'Walk', 'Survey', 'Sneak'],
    cheer_hurrah: ['CheerHurrah', 'JumpCatch', 'ThumbsUp', 'Yes', 'Jump'],
    talk_gesture: ['TalkGesture', 'Wave', 'Yes', 'Idle', 'Survey'],
    cartwheel_flip: ['CartwheelFlip', 'Jump', 'Dance', 'WalkJump'],
    hop_one_foot: ['HopOneFoot', 'Jump', 'WalkJump', 'SkipHop'],
    airplane_zoom: ['AirplaneZoom', 'Run', 'flight_path_2', 'Walk'],
    march_parade: ['MarchParade', 'Walk', 'Walking', 'Run'],
    hula_wiggle: ['HulaWiggle', 'Dance', 'SambaDance', 'Idle'],
    superhero_pose: ['SuperheroPose', 'ThumbsUp', 'Standing', 'Yes'],
    laugh_giggle: ['LaughGiggle', 'Yes', 'Dance', 'ThumbsUp'],
    blow_kiss: ['BlowKiss', 'Wave', 'Yes', 'ThumbsUp'],
    high_five: ['HighFive', 'JumpCatch', 'ThumbsUp', 'Wave'],
    point_look: ['PointLook', 'Wave', 'Survey', 'Standing'],
    sleepy_nap: ['SleepyNap', 'Sitting', 'sad_pose', 'Idle'],
    count_fingers: ['CountFingers', 'TalkGesture', 'Wave', 'Yes'],
  };

  const candidates = preferenceTable[clipType] || [];
  let chosenName = candidates.find((c) => rig.actions[c] !== undefined);
  if (!chosenName) {
    chosenName = names.find((n) =>
      candidates.some((c) => n.toLowerCase().includes(c.toLowerCase()))
    );
  }
  if (!chosenName) {
    chosenName = names[0];
  }

  const nextAction = rig.actions[chosenName];
  if (nextAction && nextAction !== rig.activeAction) {
    nextAction.reset();
    nextAction.setEffectiveTimeScale(1.0);
    nextAction.setEffectiveWeight(1.0);
    if (rig.activeAction) {
      rig.activeAction.crossFadeTo(nextAction, 0.32, false);
    } else {
      nextAction.fadeIn(0.25);
    }
    nextAction.play();
    rig.activeAction = nextAction;
  } else if (nextAction && !nextAction.isRunning()) {
    nextAction.reset().play();
    rig.activeAction = nextAction;
  }

  return chosenName;
}

/**
 * Extracts dominant primary & secondary hex colors AND creates a clean
 * background-matted texture from an uploaded favourite toy photo.
 */
export function extractDominantColorsFromImage(img: HTMLImageElement): {
  primaryHex: string;
  secondaryHex: string;
  mattedCanvasUrl: string;
} {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  if (!ctx) {
    return { primaryHex: '#f59e0b', secondaryHex: '#fde68a', mattedCanvasUrl: img.src };
  }
  ctx.drawImage(img, 0, 0, size, size);
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  const corners = [0, (size - 1) * 4, size * (size - 1) * 4, (size * size - 1) * 4];
  let bgR = 0,
    bgG = 0,
    bgB = 0;
  corners.forEach((idx) => {
    bgR += data[idx];
    bgG += data[idx + 1];
    bgB += data[idx + 2];
  });
  bgR /= 4;
  bgG /= 4;
  bgB /= 4;

  let rSum = 0,
    gSum = 0,
    bSum = 0,
    count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bgR;
    const dg = data[i + 1] - bgG;
    const db = data[i + 2] - bgB;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist < 26) {
      data[i + 3] = Math.floor((dist / 26) * 80);
    } else if (data[i + 3] > 60) {
      rSum += data[i];
      gSum += data[i + 1];
      bSum += data[i + 2];
      count++;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  const mattedCanvasUrl = c.toDataURL('image/png');

  if (count === 0) {
    return { primaryHex: '#38bdf8', secondaryHex: '#e0f2fe', mattedCanvasUrl };
  }
  const r = Math.round(rSum / count);
  const g = Math.round(gSum / count);
  const b = Math.round(bSum / count);
  const primaryHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
    .toString(16)
    .padStart(2, '0')}`;
  const lr = Math.min(255, r + 60);
  const lg = Math.min(255, g + 60);
  const lb = Math.min(255, b + 60);
  const secondaryHex = `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb
    .toString(16)
    .padStart(2, '0')}`;

  return { primaryHex, secondaryHex, mattedCanvasUrl };
}

// ============================================================================
// PART 2: 30 CHANGEABLE 3D CARTOON ARTWORK STAGE ENVIRONMENTS FOR AUTISTIC CHILDREN
// ============================================================================

export type CartoonEnvironmentCategory = 'nature' | 'vehicles' | 'magic' | 'sensory';

export type CartoonEnvironmentId =
  | 'rainbow_meadow'
  | 'candy_wonderland'
  | 'dino_jungle'
  | 'cozy_playroom'
  | 'starlight_garden'
  | 'ocean_aquarium'
  | 'space_galaxy'
  | 'train_wonderland'
  | 'butterfly_sanctuary'
  | 'snoezelen_sensory'
  | 'fairy_mushroom_grove'
  | 'crystal_ice_palace'
  | 'sunny_farmyard'
  | 'brick_builder_land'
  | 'musical_symphony_park'
  | 'ice_cream_beach'
  | 'pirate_treasure_cove'
  | 'cherry_blossom_zen'
  | 'rainbow_racetrack'
  | 'robot_invention_lab'
  | 'teddy_picnic_park'
  | 'aurora_arctic_glow'
  | 'jungle_treehouse'
  | 'cloud_castle_kingdom'
  | 'fire_rescue_plaza'
  | 'crystal_gem_cavern'
  | 'ducky_pond_oasis'
  | 'balloon_fiesta_sky'
  | 'puppy_agility_meadow'
  | 'lava_lamp_chill_zone';

export interface CartoonEnvironmentMeta {
  id: CartoonEnvironmentId;
  name: string;
  emoji: string;
  category: CartoonEnvironmentCategory;
  cssGradient: string;
  pedestalColor: string;
  ringColor: string;
  hillLeftColor: string;
  hillRightColor: string;
  description: string;
  voiceKeywords: string[];
}

export const CARTOON_STAGE_ENVIRONMENTS: CartoonEnvironmentMeta[] = [
  // ================= 1–5: ORIGINAL SIGNATURE 3D WORLDS =================
  {
    id: 'rainbow_meadow',
    name: 'Rainbow Meadow',
    emoji: '🌈🌸',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #bae6fd 42%, #bbf7d0 78%, #86efac 100%)',
    pedestalColor: '#4ade80',
    ringColor: '#facc15',
    hillLeftColor: '#86efac',
    hillRightColor: '#4ade80',
    description: 'Sunny cartoon meadow with a 3D rainbow arch, fluffy clouds, and flowers',
    voiceKeywords: ['rainbow meadow', 'meadow', 'rainbow world'],
  },
  {
    id: 'candy_wonderland',
    name: 'Candy Wonderland',
    emoji: '🍭🧁',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 20%, #fff1f2 0%, #fbcfe8 46%, #fde68a 82%, #fda4af 100%)',
    pedestalColor: '#f472b6',
    ringColor: '#fef08a',
    hillLeftColor: '#f9a8d4',
    hillRightColor: '#fda4af',
    description: 'Sweet pastel candy land with 3D lollipops and marshmallow clouds',
    voiceKeywords: ['candy', 'lollipop', 'cupcake', 'sweet land'],
  },
  {
    id: 'dino_jungle',
    name: 'Sunny Dino Park',
    emoji: '🦕🌴',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 16%, #fef9c3 0%, #fde047 30%, #a7f3d0 68%, #34d399 100%)',
    pedestalColor: '#10b981',
    ringColor: '#fb923c',
    hillLeftColor: '#6ee7b7',
    hillRightColor: '#34d399',
    description: 'Golden adventure park with 3D cartoon trees and cute spotted mushrooms',
    voiceKeywords: ['dino park', 'dinosaur park', 'prehistoric'],
  },
  {
    id: 'cozy_playroom',
    name: 'Cozy Toy Playroom',
    emoji: '🎠🧸',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 22%, #fffbeb 0%, #fed7aa 48%, #fecdd3 82%, #fdba74 100%)',
    pedestalColor: '#fb923c',
    ringColor: '#f43f5e',
    hillLeftColor: '#fed7aa',
    hillRightColor: '#fde68a',
    description: 'Warm sunlit nursery playroom with 3D toy blocks and floating stars',
    voiceKeywords: ['playroom', 'nursery', 'toy room'],
  },
  {
    id: 'starlight_garden',
    name: 'Starlight Cloud Garden',
    emoji: '🌟🌙',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 20%, #fef3c7 0%, #e9d5ff 45%, #c7d2fe 78%, #a5b4fc 100%)',
    pedestalColor: '#a855f7',
    ringColor: '#fde047',
    hillLeftColor: '#c4b5fd',
    hillRightColor: '#a5b4fc',
    description: 'Dreamy pastel cloud garden with a 3D golden moon and twinkling stars',
    voiceKeywords: ['starlight', 'moon garden', 'night garden', 'bedtime world'],
  },

  // ================= 6–30: 25 NEW CREATIVE 3D STAGE ENVIRONMENTS =================
  {
    id: 'ocean_aquarium',
    name: 'Coral Reef Aquarium',
    emoji: '🐠🫧',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 15%, #e0f2fe 0%, #7dd3fc 38%, #38bdf8 72%, #0284c7 100%)',
    pedestalColor: '#06b6d4',
    ringColor: '#fde047',
    hillLeftColor: '#38bdf8',
    hillRightColor: '#22d3ee',
    description: 'Gentle underwater reef with 3D coral tubes, sea pearls, and rising bubbles',
    voiceKeywords: ['aquarium', 'ocean', 'coral', 'underwater', 'sea', 'fish world'],
  },
  {
    id: 'space_galaxy',
    name: 'Ringed Planet Space Station',
    emoji: '🚀🪐',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fae8ff 0%, #c084fc 35%, #6366f1 72%, #312e81 100%)',
    pedestalColor: '#6366f1',
    ringColor: '#38bdf8',
    hillLeftColor: '#818cf8',
    hillRightColor: '#a855f7',
    description: 'Cosmic play deck with a 3D ringed Saturn planet, moons, and glowing stars',
    voiceKeywords: ['space', 'galaxy', 'planet', 'saturn', 'rocket world', 'astronaut'],
  },
  {
    id: 'train_wonderland',
    name: 'Choo-Choo Train Valley',
    emoji: '🚂🛤️',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #bae6fd 42%, #bbf7d0 78%, #4ade80 100%)',
    pedestalColor: '#22c55e',
    ringColor: '#ef4444',
    hillLeftColor: '#86efac',
    hillRightColor: '#4ade80',
    description: 'Happy railway valley with 3D station arches, signal posts, and puffing clouds',
    voiceKeywords: ['train', 'railway', 'choo choo', 'station', 'tracks'],
  },
  {
    id: 'butterfly_sanctuary',
    name: 'Butterfly Blossom Sanctuary',
    emoji: '🦋🌺',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fff1f2 0%, #fbcfe8 40%, #d9f99d 78%, #86efac 100%)',
    pedestalColor: '#84cc16',
    ringColor: '#ec4899',
    hillLeftColor: '#bef264',
    hillRightColor: '#f9a8d4',
    description: 'Peaceful flower sanctuary with giant 3D pastel blossoms and fluttering arches',
    voiceKeywords: ['butterfly', 'butterflies', 'blossom', 'flower garden'],
  },
  {
    id: 'snoezelen_sensory',
    name: 'Snoezelen Sensory Bubble Room',
    emoji: '🫧💡',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 20%, #f5f3ff 0%, #ddd6fe 42%, #a5f3fc 78%, #67e8f9 100%)',
    pedestalColor: '#8b5cf6',
    ringColor: '#22d3ee',
    hillLeftColor: '#c4b5fd',
    hillRightColor: '#a5f3fc',
    description: 'Calming multi-sensory room with glowing 3D bubble tubes and soft light pillars',
    voiceKeywords: ['sensory room', 'snoezelen', 'bubble tube', 'calm room'],
  },
  {
    id: 'fairy_mushroom_grove',
    name: 'Glowing Fairy Mushroom Grove',
    emoji: '🍄✨',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef3c7 0%, #fbcfe8 40%, #a7f3d0 76%, #10b981 100%)',
    pedestalColor: '#10b981',
    ringColor: '#f43f5e',
    hillLeftColor: '#6ee7b7',
    hillRightColor: '#f9a8d4',
    description: 'Enchanted woodland with giant 3D spotted toadstools and golden firefly orbs',
    voiceKeywords: ['mushroom', 'toadstool', 'fairy', 'enchanted'],
  },
  {
    id: 'crystal_ice_palace',
    name: 'Sparkling Snow & Ice Castle',
    emoji: '❄️🏰',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 16%, #ffffff 0%, #e0f2fe 42%, #bae6fd 76%, #7dd3fc 100%)',
    pedestalColor: '#38bdf8',
    ringColor: '#ffffff',
    hillLeftColor: '#e0f2fe',
    hillRightColor: '#bae6fd',
    description: 'Winter wonderland with 3D translucent ice crystal spires and friendly snowmen',
    voiceKeywords: ['ice', 'snow', 'winter', 'frozen', 'snowman'],
  },
  {
    id: 'sunny_farmyard',
    name: 'Happy Sunflower Farmyard',
    emoji: '🐮🌻',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #fde047 36%, #fed7aa 72%, #86efac 100%)',
    pedestalColor: '#65a30d',
    ringColor: '#facc15',
    hillLeftColor: '#bef264',
    hillRightColor: '#fde047',
    description: 'Cheerful country meadow with giant 3D golden sunflowers and cozy barn pillars',
    voiceKeywords: ['farm', 'farmyard', 'sunflower', 'barn', 'country'],
  },
  {
    id: 'brick_builder_land',
    name: 'Colorful Mega-Brick World',
    emoji: '🧱🏗️',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 20%, #fffbeb 0%, #fef08a 38%, #93c5fd 76%, #60a5fa 100%)',
    pedestalColor: '#ef4444',
    ringColor: '#facc15',
    hillLeftColor: '#60a5fa',
    hillRightColor: '#4ade80',
    description: 'Creative construction stage built from giant 3D interlocking studded bricks',
    voiceKeywords: ['brick', 'lego', 'blocks', 'builder', 'construction'],
  },
  {
    id: 'musical_symphony_park',
    name: 'Musical Xylophone Park',
    emoji: '🎹🎵',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fff1f2 0%, #fde68a 40%, #c4b5fd 76%, #818cf8 100%)',
    pedestalColor: '#ec4899',
    ringColor: '#facc15',
    hillLeftColor: '#f9a8d4',
    hillRightColor: '#c4b5fd',
    description: 'Melodic 3D stage with rainbow xylophone bars and floating musical chime orbs',
    voiceKeywords: ['xylophone', 'music park', 'symphony', 'piano world'],
  },
  {
    id: 'ice_cream_beach',
    name: 'Pastel Ice Cream Boardwalk',
    emoji: '🍦🏖️',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fed7aa 38%, #fbcfe8 72%, #7dd3fc 100%)',
    pedestalColor: '#f472b6',
    ringColor: '#38bdf8',
    hillLeftColor: '#fde68a',
    hillRightColor: '#fbcfe8',
    description: 'Sunny seaside boardwalk with giant 3D ice cream cones and pastel umbrellas',
    voiceKeywords: ['ice cream', 'beach', 'boardwalk', 'gelato', 'sundae'],
  },
  {
    id: 'pirate_treasure_cove',
    name: 'Friendly Treasure Island Cove',
    emoji: '🏴‍☠️🏝️',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 16%, #fef9c3 0%, #fde68a 35%, #67e8f9 72%, #06b6d4 100%)',
    pedestalColor: '#fbbf24',
    ringColor: '#06b6d4',
    hillLeftColor: '#fde047',
    hillRightColor: '#22d3ee',
    description: 'Sunny tropical island with 3D palm trees, golden coins, and ocean waves',
    voiceKeywords: ['pirate', 'treasure', 'island', 'palm tree', 'cove'],
  },
  {
    id: 'cherry_blossom_zen',
    name: 'Calm Cherry Blossom Zen Garden',
    emoji: '🌸⛩️',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fff1f2 0%, #fce7f3 42%, #fbcfe8 76%, #f9a8d4 100%)',
    pedestalColor: '#fb7185',
    ringColor: '#fef08a',
    hillLeftColor: '#fbcfe8',
    hillRightColor: '#f472b6',
    description: 'Serene pink sakura garden with 3D cherry blossom trees and peaceful arches',
    voiceKeywords: ['cherry blossom', 'sakura', 'zen garden', 'pink garden'],
  },
  {
    id: 'rainbow_racetrack',
    name: 'Super Rainbow Speedway',
    emoji: '🏎️🏁',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #fed7aa 38%, #bae6fd 74%, #38bdf8 100%)',
    pedestalColor: '#f97316',
    ringColor: '#facc15',
    hillLeftColor: '#fdba74',
    hillRightColor: '#7dd3fc',
    description: 'Exciting 3D cartoon speedway with victory arches and colorful speed rings',
    voiceKeywords: ['racetrack', 'speedway', 'race track', 'car track'],
  },
  {
    id: 'robot_invention_lab',
    name: 'Friendly Robot Invention Lab',
    emoji: '🤖⚙️',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #f0f9ff 0%, #bae6fd 40%, #c7d2fe 76%, #818cf8 100%)',
    pedestalColor: '#0284c7',
    ringColor: '#facc15',
    hillLeftColor: '#7dd3fc',
    hillRightColor: '#a5b4fc',
    description: 'Futuristic play lab with 3D golden gears, energy rings, and holo-pillars',
    voiceKeywords: ['robot lab', 'invention', 'science lab', 'gears'],
  },
  {
    id: 'teddy_picnic_park',
    name: 'Teddy Bear Berry Picnic',
    emoji: '🧺🍓',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fecdd3 40%, #bbf7d0 78%, #4ade80 100%)',
    pedestalColor: '#22c55e',
    ringColor: '#f43f5e',
    hillLeftColor: '#86efac',
    hillRightColor: '#fda4af',
    description: 'Cozy park lawn with giant 3D strawberries, picnic cushions, and balloons',
    voiceKeywords: ['picnic', 'berry', 'strawberry', 'teddy park'],
  },
  {
    id: 'aurora_arctic_glow',
    name: 'Northern Lights Aurora Snowland',
    emoji: '🐻‍❄️🌌',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #d1fae5 0%, #6ee7b7 36%, #a5b4fc 74%, #6366f1 100%)',
    pedestalColor: '#14b8a6',
    ringColor: '#a7f3d0',
    hillLeftColor: '#99f6e4',
    hillRightColor: '#c4b5fd',
    description: 'Soothing arctic sky with shimmering 3D aurora ribbons and cozy igloo domes',
    voiceKeywords: ['aurora', 'northern lights', 'arctic', 'igloo'],
  },
  {
    id: 'jungle_treehouse',
    name: 'Canopy Treehouse Adventure',
    emoji: '🐒🌳',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #d9f99d 40%, #86efac 76%, #22c55e 100%)',
    pedestalColor: '#16a34a',
    ringColor: '#eab308',
    hillLeftColor: '#86efac',
    hillRightColor: '#4ade80',
    description: 'Treetop play village with 3D wooden treehouse huts and tropical canopies',
    voiceKeywords: ['treehouse', 'canopy', 'forest', 'monkey'],
  },
  {
    id: 'cloud_castle_kingdom',
    name: 'Fluffy Cloud Castle Kingdom',
    emoji: '☁️👑',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fde68a 36%, #e9d5ff 74%, #c084fc 100%)',
    pedestalColor: '#a855f7',
    ringColor: '#facc15',
    hillLeftColor: '#f3e8ff',
    hillRightColor: '#fde68a',
    description: 'Royal sky kingdom with 3D golden-roofed castle turrets on marshmallow clouds',
    voiceKeywords: ['castle', 'kingdom', 'crown', 'princess', 'royal'],
  },
  {
    id: 'fire_rescue_plaza',
    name: 'Hero Rescue & Fire Station',
    emoji: '🚒🔔',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fed7aa 40%, #fca5a5 76%, #ef4444 100%)',
    pedestalColor: '#dc2626',
    ringColor: '#facc15',
    hillLeftColor: '#fca5a5',
    hillRightColor: '#fdba74',
    description: 'Friendly community rescue plaza with 3D red station arches and golden beacons',
    voiceKeywords: ['fire station', 'firetruck', 'rescue', 'firefighter'],
  },
  {
    id: 'crystal_gem_cavern',
    name: 'Glowing Amethyst Crystal Cave',
    emoji: '💎🔮',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #f5f3ff 0%, #e9d5ff 38%, #c084fc 74%, #7e22ce 100%)',
    pedestalColor: '#9333ea',
    ringColor: '#67e8f9',
    hillLeftColor: '#d8b4fe',
    hillRightColor: '#a855f7',
    description: 'Luminous sensory cavern with glowing 3D amethyst & aqua crystal clusters',
    voiceKeywords: ['crystal', 'gem', 'amethyst', 'cave', 'diamond'],
  },
  {
    id: 'ducky_pond_oasis',
    name: 'Lilypad & Waterfall Pond',
    emoji: '🦆🪷',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #ecfdf5 0%, #99f6e4 40%, #67e8f9 76%, #06b6d4 100%)',
    pedestalColor: '#14b8a6',
    ringColor: '#f472b6',
    hillLeftColor: '#6ee7b7',
    hillRightColor: '#67e8f9',
    description: 'Calm turquoise pond with 3D floating green lilypads and pink lotus flowers',
    voiceKeywords: ['pond', 'lilypad', 'lotus', 'duck pond', 'waterfall'],
  },
  {
    id: 'balloon_fiesta_sky',
    name: 'Hot Air Balloon Fiesta Sky',
    emoji: '🎈🎪',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fde047 35%, #bae6fd 72%, #38bdf8 100%)',
    pedestalColor: '#f59e0b',
    ringColor: '#ec4899',
    hillLeftColor: '#fde68a',
    hillRightColor: '#7dd3fc',
    description: 'Breezy festival sky filled with floating 3D colorful hot air balloons',
    voiceKeywords: ['balloon', 'hot air balloon', 'fiesta', 'festival', 'carnival'],
  },
  {
    id: 'puppy_agility_meadow',
    name: 'Puppy Play & Agility Park',
    emoji: '🐶🦴',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #bbf7d0 42%, #86efac 78%, #22c55e 100%)',
    pedestalColor: '#16a34a',
    ringColor: '#38bdf8',
    hillLeftColor: '#86efac',
    hillRightColor: '#4ade80',
    description: 'Playful puppy park with 3D jump hoops, colorful tunnels, and cheerful flags',
    voiceKeywords: ['puppy park', 'dog park', 'agility', 'hoops'],
  },
  {
    id: 'lava_lamp_chill_zone',
    name: 'Cozy Lava-Lamp Chill Zone',
    emoji: '🛋️🫧',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fff7ed 0%, #fed7aa 38%, #f9a8d4 74%, #f43f5e 100%)',
    pedestalColor: '#e11d48',
    ringColor: '#fde047',
    hillLeftColor: '#fda4af',
    hillRightColor: '#fdba74',
    description: 'Warm sensory relaxation zone with 3D glowing lava-lamp columns and soft blobs',
    voiceKeywords: ['lava lamp', 'chill zone', 'cozy zone', 'relax room'],
  },
];

/**
 * Builds a rich, child-friendly 3D Cartoon Artwork Stage World around the 3D toy
 * for all 30 creative stage environments!
 */
export function build3DCartoonStageWorld(envId: CartoonEnvironmentId): THREE.Group {
  const world = new THREE.Group();
  world.name = `CartoonWorld_${envId}`;

  const meta =
    CARTOON_STAGE_ENVIRONMENTS.find((e) => e.id === envId) || CARTOON_STAGE_ENVIRONMENTS[0];

  // 1. Wide 3D Cartoon Playground & Football Turf Field + Glowing Ring
  const padGeo = new THREE.CylinderGeometry(3.45, 3.65, 0.2, 64);
  const padMat = new THREE.MeshStandardMaterial({
    color: meta.pedestalColor,
    roughness: 0.45,
    metalness: 0.08,
  });
  const pad = new THREE.Mesh(padGeo, padMat);
  pad.scale.set(1.22, 1, 0.72);
  pad.position.set(0, -1.26, 0);
  pad.receiveShadow = true;
  world.add(pad);

  const ringGeo = new THREE.TorusGeometry(3.48, 0.045, 16, 64);
  ringGeo.rotateX(Math.PI / 2);
  const ringMat = new THREE.MeshStandardMaterial({
    color: meta.ringColor,
    roughness: 0.25,
    emissive: meta.ringColor,
    emissiveIntensity: 0.35,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.scale.set(1.22, 1, 0.72);
  ring.position.set(0, -1.17, 0);
  world.add(ring);

  // Center Playground / Soccer Pitch Circle Marking on the 3D Stage Floor
  const centerCircleGeo = new THREE.TorusGeometry(0.95, 0.018, 12, 48);
  centerCircleGeo.rotateX(Math.PI / 2);
  const centerCircleMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.45,
  });
  const centerCircle = new THREE.Mesh(centerCircleGeo, centerCircleMat);
  centerCircle.position.set(0, -1.155, 0);
  world.add(centerCircle);

  // Helper to build a cute 3D Fluffy Cartoon Cloud
  const addFluffyCloud = (x: number, y: number, z: number, scale = 1.0, tint = '#ffffff') => {
    const cloud = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({
      color: tint,
      roughness: 0.65,
      metalness: 0.02,
    });
    const puffs: [number, number, number, number][] = [
      [0, 0, 0, 0.38],
      [-0.32, -0.06, 0.04, 0.28],
      [0.32, -0.05, 0.04, 0.3],
      [0.14, 0.16, -0.02, 0.26],
      [-0.14, 0.14, 0.02, 0.25],
    ];
    puffs.forEach(([px, py, pz, r]) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 20), mat);
      m.position.set(px, py, pz);
      cloud.add(m);
    });
    cloud.position.set(x, y, z);
    cloud.scale.setScalar(scale);
    world.add(cloud);
  };

  // Helper to build a 3D Rainbow / Glowing Archway
  const addGlowingArch = (
    colors: string[],
    radius = 2.8,
    tube = 0.06,
    zPos = -2.45
  ) => {
    colors.forEach((col, i) => {
      const archGeo = new THREE.TorusGeometry(radius - i * (tube * 1.85), tube, 16, 64, Math.PI);
      const archMat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.28,
        emissive: col,
        emissiveIntensity: 0.22,
      });
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(0, -1.0, zPos);
      world.add(arch);
    });
  };

  // Helper to build 3D Floating Glowing Orbs / Stars / Bubbles
  const addFloatingOrbs = (
    positions: [number, number, number][],
    col: string,
    octahedron = false,
    size = 0.16
  ) => {
    positions.forEach(([ox, oy, oz]) => {
      const geo = octahedron
        ? new THREE.OctahedronGeometry(size, 0)
        : new THREE.SphereGeometry(size, 20, 20);
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.45,
        roughness: 0.18,
      });
      const orb = new THREE.Mesh(geo, mat);
      orb.position.set(ox, oy, oz);
      world.add(orb);
    });
  };

  // Distant rolling cartoon hills behind the pedestal
  const hillLeftMat = new THREE.MeshStandardMaterial({
    color: meta.hillLeftColor,
    roughness: 0.7,
  });
  const hillLeft = new THREE.Mesh(new THREE.SphereGeometry(2.6, 32, 24), hillLeftMat);
  hillLeft.position.set(-2.3, -3.1, -2.8);
  hillLeft.scale.set(1.4, 0.75, 0.8);
  world.add(hillLeft);

  const hillRightMat = new THREE.MeshStandardMaterial({
    color: meta.hillRightColor,
    roughness: 0.7,
  });
  const hillRight = new THREE.Mesh(new THREE.SphereGeometry(2.8, 32, 24), hillRightMat);
  hillRight.position.set(2.4, -3.2, -3.0);
  hillRight.scale.set(1.45, 0.78, 0.8);
  world.add(hillRight);

  // Environment-specific 3D Scenery & Props
  switch (envId) {
    case 'rainbow_meadow': {
      addGlowingArch(['#ef4444', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#a855f7']);
      addFluffyCloud(-2.3, 1.35, -2.1, 1.05, '#ffffff');
      addFluffyCloud(2.35, 1.25, -2.2, 0.95, '#ffffff');
      [-2.55, 2.55, -1.85, 1.9].forEach((fx, idx) => {
        const fz = idx < 2 ? -0.9 : -1.35;
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.42, 12),
          new THREE.MeshStandardMaterial({ color: '#16a34a' })
        );
        stem.position.set(fx, -1.05, fz);
        world.add(stem);
        const center = new THREE.Mesh(
          new THREE.SphereGeometry(0.11, 16, 16),
          new THREE.MeshStandardMaterial({ color: '#facc15' })
        );
        center.position.set(fx, -0.82, fz);
        world.add(center);
      });
      break;
    }

    case 'candy_wonderland': {
      addFluffyCloud(-2.2, 1.3, -2.1, 1.0, '#fce7f3');
      addFluffyCloud(2.2, 1.2, -2.1, 1.0, '#fff1f2');
      [
        { x: -2.45, z: -1.2, col: '#ec4899' },
        { x: 2.45, z: -1.2, col: '#38bdf8' },
        { x: -1.75, z: -1.7, col: '#a855f7' },
        { x: 1.8, z: -1.7, col: '#facc15' },
      ].forEach((lp) => {
        const stick = new THREE.Mesh(
          new THREE.CylinderGeometry(0.04, 0.04, 1.1, 16),
          new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 })
        );
        stick.position.set(lp.x, -0.7, lp.z);
        world.add(stick);
        const candy = new THREE.Mesh(
          new THREE.CylinderGeometry(0.34, 0.34, 0.14, 32),
          new THREE.MeshStandardMaterial({ color: lp.col, roughness: 0.2 })
        );
        candy.rotation.x = Math.PI / 2;
        candy.position.set(lp.x, -0.1, lp.z);
        world.add(candy);
      });
      break;
    }

    case 'dino_jungle':
    case 'jungle_treehouse': {
      addFluffyCloud(-2.1, 1.4, -2.2, 0.95, '#fef9c3');
      [-2.5, 2.5, -1.85, 1.85].forEach((tx, idx) => {
        const tz = idx < 2 ? -1.35 : -1.85;
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.18, 1.35, 16),
          new THREE.MeshStandardMaterial({ color: '#92400e', roughness: 0.7 })
        );
        trunk.position.set(tx, -0.6, tz);
        world.add(trunk);
        const crown = new THREE.Mesh(
          new THREE.SphereGeometry(0.55, 24, 24),
          new THREE.MeshStandardMaterial({
            color: idx % 2 === 0 ? '#22c55e' : '#16a34a',
            roughness: 0.5,
          })
        );
        crown.position.set(tx, 0.18, tz);
        world.add(crown);
      });
      if (envId === 'jungle_treehouse') {
        addGlowingArch(['#84cc16', '#22c55e', '#facc15'], 2.75, 0.055, -2.4);
      }
      [-1.95, 1.95].forEach((mx) => {
        const cap = new THREE.Mesh(
          new THREE.SphereGeometry(0.24, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
          new THREE.MeshStandardMaterial({ color: '#f43f5e', roughness: 0.35 })
        );
        cap.position.set(mx, -0.95, -1.05);
        world.add(cap);
      });
      break;
    }

    case 'cozy_playroom':
    case 'brick_builder_land': {
      addGlowingArch(['#ef4444', '#facc15', '#3b82f6', '#22c55e'], 2.75, 0.06, -2.45);
      [
        { x: -2.45, y: -0.95, z: -1.0, col: '#ef4444', rot: 0.25 },
        { x: -2.45, y: -0.55, z: -1.0, col: '#facc15', rot: 0.1 },
        { x: -1.9, y: -0.98, z: -1.25, col: '#3b82f6', rot: -0.3 },
        { x: 2.45, y: -0.95, z: -1.0, col: '#22c55e', rot: -0.2 },
        { x: 2.45, y: -0.55, z: -1.0, col: '#a855f7', rot: 0.05 },
        { x: 1.95, y: -0.98, z: -1.2, col: '#fb923c', rot: 0.15 },
      ].forEach((b) => {
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.38, 0.42),
          new THREE.MeshStandardMaterial({ color: b.col, roughness: 0.28 })
        );
        cube.position.set(b.x, b.y, b.z);
        cube.rotation.y = b.rot;
        world.add(cube);
        const stud = new THREE.Mesh(
          new THREE.CylinderGeometry(0.11, 0.11, 0.08, 16),
          new THREE.MeshStandardMaterial({ color: b.col, roughness: 0.25 })
        );
        stud.position.set(b.x, b.y + 0.22, b.z);
        world.add(stud);
      });
      break;
    }

    case 'starlight_garden':
    case 'aurora_arctic_glow': {
      addFluffyCloud(-2.2, 1.15, -2.0, 1.05, '#f3e8ff');
      addFluffyCloud(2.2, 1.1, -2.0, 1.0, '#e0e7ff');
      if (envId === 'aurora_arctic_glow') {
        addGlowingArch(['#34d399', '#2dd4bf', '#38bdf8', '#a855f7'], 2.85, 0.065, -2.45);
      }
      const moon = new THREE.Mesh(
        new THREE.TorusGeometry(0.55, 0.16, 20, 40, Math.PI * 1.35),
        new THREE.MeshStandardMaterial({
          color: '#fde047',
          emissive: '#facc15',
          emissiveIntensity: 0.45,
          roughness: 0.2,
        })
      );
      moon.position.set(1.9, 1.35, -1.8);
      moon.rotation.z = 0.6;
      world.add(moon);
      addFloatingOrbs(
        [
          [-1.8, 1.3, -1.6],
          [-1.1, 1.55, -2.0],
          [0.9, 1.5, -1.9],
          [-2.0, 0.3, -1.3],
          [2.05, 0.35, -1.3],
        ],
        '#fde047',
        true,
        0.16
      );
      break;
    }

    case 'ocean_aquarium':
    case 'ducky_pond_oasis': {
      addGlowingArch(['#22d3ee', '#38bdf8', '#f472b6', '#facc15'], 2.8, 0.055, -2.45);
      // 3D Coral Reef Tubes & Sea Lilypads
      [
        { x: -2.45, z: -1.15, h: 1.15, col: '#fb7185' },
        { x: -2.1, z: -1.35, h: 0.85, col: '#facc15' },
        { x: 2.45, z: -1.15, h: 1.2, col: '#a855f7' },
        { x: 2.08, z: -1.35, h: 0.9, col: '#34d399' },
      ].forEach((c) => {
        const tube = new THREE.Mesh(
          new THREE.CylinderGeometry(0.14, 0.1, c.h, 20),
          new THREE.MeshStandardMaterial({ color: c.col, roughness: 0.35 })
        );
        tube.position.set(c.x, -1.15 + c.h / 2, c.z);
        world.add(tube);
      });
      addFloatingOrbs(
        [
          [-1.9, 0.5, -1.5],
          [-1.5, 1.1, -1.8],
          [1.6, 0.9, -1.7],
          [2.0, 0.4, -1.4],
          [0, 1.35, -2.0],
        ],
        '#e0f2fe',
        false,
        0.14
      );
      break;
    }

    case 'space_galaxy': {
      // Giant 3D Ringed Saturn Planet in the background sky!
      const planetGrp = new THREE.Group();
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 32, 32),
        new THREE.MeshStandardMaterial({
          color: '#f59e0b',
          emissive: '#d97706',
          emissiveIntensity: 0.25,
          roughness: 0.35,
        })
      );
      const pRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.05, 0.08, 16, 64),
        new THREE.MeshStandardMaterial({
          color: '#38bdf8',
          emissive: '#38bdf8',
          emissiveIntensity: 0.35,
          roughness: 0.25,
        })
      );
      pRing.rotation.x = 1.15;
      pRing.rotation.y = 0.35;
      planetGrp.add(sphere, pRing);
      planetGrp.position.set(-1.75, 1.25, -2.2);
      world.add(planetGrp);

      addGlowingArch(['#818cf8', '#c084fc', '#38bdf8'], 2.85, 0.05, -2.5);
      addFloatingOrbs(
        [
          [1.8, 1.4, -1.8],
          [1.1, 1.6, -2.1],
          [-0.4, 1.55, -2.0],
          [2.2, 0.55, -1.5],
          [-2.3, 0.35, -1.5],
        ],
        '#fde047',
        true,
        0.16
      );
      break;
    }

    case 'train_wonderland':
    case 'rainbow_racetrack':
    case 'fire_rescue_plaza': {
      const archCols =
        envId === 'fire_rescue_plaza'
          ? ['#ef4444', '#facc15', '#ffffff']
          : envId === 'rainbow_racetrack'
          ? ['#f97316', '#facc15', '#38bdf8', '#ec4899']
          : ['#ef4444', '#3b82f6', '#facc15'];
      addGlowingArch(archCols, 2.82, 0.065, -2.4);
      addFluffyCloud(-2.15, 1.35, -2.0, 1.0, '#ffffff');
      addFluffyCloud(2.15, 1.3, -2.0, 0.95, '#ffffff');

      // 3D Signal / Beacon Pillars on Left & Right
      [-2.45, 2.45].forEach((px, idx) => {
        const post = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.1, 1.25, 16),
          new THREE.MeshStandardMaterial({ color: '#e2e8f0', roughness: 0.3 })
        );
        post.position.set(px, -0.55, -1.2);
        world.add(post);
        const beacon = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 20, 20),
          new THREE.MeshStandardMaterial({
            color: idx === 0 ? '#ef4444' : '#22c55e',
            emissive: idx === 0 ? '#ef4444' : '#22c55e',
            emissiveIntensity: 0.5,
          })
        );
        beacon.position.set(px, 0.15, -1.2);
        world.add(beacon);
      });
      break;
    }

    case 'snoezelen_sensory':
    case 'lava_lamp_chill_zone':
    case 'crystal_gem_cavern': {
      const col1 = envId === 'lava_lamp_chill_zone' ? '#fb7185' : '#a855f7';
      const col2 = envId === 'lava_lamp_chill_zone' ? '#facc15' : '#22d3ee';
      addGlowingArch([col1, col2, '#fde047'], 2.8, 0.06, -2.45);
      // 3D Glowing Sensory Bubble Tubes / Crystal Columns
      [
        { x: -2.45, z: -1.15, col: col1 },
        { x: -1.9, z: -1.5, col: col2 },
        { x: 2.45, z: -1.15, col: col2 },
        { x: 1.9, z: -1.5, col: col1 },
      ].forEach((tube) => {
        const cyl = new THREE.Mesh(
          envId === 'crystal_gem_cavern'
            ? new THREE.ConeGeometry(0.24, 1.45, 6)
            : new THREE.CylinderGeometry(0.2, 0.2, 1.45, 24),
          new THREE.MeshPhysicalMaterial({
            color: tube.col,
            emissive: tube.col,
            emissiveIntensity: 0.35,
            roughness: 0.15,
            transparent: true,
            opacity: 0.82,
          })
        );
        cyl.position.set(tube.x, -0.45, tube.z);
        world.add(cyl);
      });
      addFloatingOrbs(
        [
          [-2.1, 0.65, -1.3],
          [2.1, 0.75, -1.3],
          [-1.2, 1.35, -1.9],
          [1.2, 1.35, -1.9],
        ],
        col2,
        envId === 'crystal_gem_cavern',
        0.16
      );
      break;
    }

    case 'fairy_mushroom_grove':
    case 'butterfly_sanctuary':
    case 'sunny_farmyard':
    case 'cherry_blossom_zen':
    case 'teddy_picnic_park': {
      addGlowingArch(['#f472b6', '#facc15', '#4ade80', '#38bdf8'], 2.8, 0.055, -2.45);
      addFluffyCloud(-2.2, 1.35, -2.1, 1.0, '#fff1f2');
      addFluffyCloud(2.2, 1.3, -2.1, 1.0, '#fef9c3');
      [
        { x: -2.45, z: -1.15, col: '#f43f5e' },
        { x: -1.85, z: -1.55, col: '#facc15' },
        { x: 2.45, z: -1.15, col: '#ec4899' },
        { x: 1.85, z: -1.55, col: '#a855f7' },
      ].forEach((p) => {
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.08, 0.11, 0.85, 16),
          new THREE.MeshStandardMaterial({ color: '#fef3c7', roughness: 0.5 })
        );
        stem.position.set(p.x, -0.75, p.z);
        world.add(stem);
        const cap = new THREE.Mesh(
          new THREE.SphereGeometry(0.36, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.58),
          new THREE.MeshStandardMaterial({ color: p.col, roughness: 0.3 })
        );
        cap.position.set(p.x, -0.35, p.z);
        world.add(cap);
      });
      break;
    }

    default: {
      // Crystal Ice Palace, Cloud Castle, Ice Cream Beach, Balloon Fiesta, Musical Park, Robot Lab, Pirate Cove, Puppy Park
      addGlowingArch(
        [meta.ringColor, meta.pedestalColor, '#facc15', '#38bdf8'],
        2.82,
        0.06,
        -2.45
      );
      addFluffyCloud(-2.25, 1.35, -2.05, 1.05, '#ffffff');
      addFluffyCloud(2.25, 1.28, -2.05, 1.0, '#ffffff');
      [
        { x: -2.45, z: -1.2, col: meta.pedestalColor },
        { x: -1.85, z: -1.55, col: meta.ringColor },
        { x: 2.45, z: -1.2, col: meta.ringColor },
        { x: 1.85, z: -1.55, col: meta.pedestalColor },
      ].forEach((tower) => {
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.22, 0.95, 20),
          new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.3 })
        );
        base.position.set(tower.x, -0.7, tower.z);
        world.add(base);
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(0.3, 0.55, 20),
          new THREE.MeshStandardMaterial({
            color: tower.col,
            emissive: tower.col,
            emissiveIntensity: 0.22,
            roughness: 0.25,
          })
        );
        roof.position.set(tower.x, -0.02, tower.z);
        world.add(roof);
      });
      addFloatingOrbs(
        [
          [-1.6, 1.25, -1.7],
          [1.6, 1.25, -1.7],
          [0, 1.48, -1.9],
        ],
        meta.ringColor,
        false,
        0.17
      );
      break;
    }
  }

  return world;
}


/**
 * Builds a real 3D Soccer/Football (`ballGroup`) with classic black pentagon patches
 * and a 3D Football Goal Net (`goalGroup`) on the 3D Stage so the 3D Toy Character
 * can physically run across the grass, kick the ball, and score goals with the child!
 */
export function build3DSoccerBallAndGoal(): {
  ballGroup: THREE.Group;
  goalGroup: THREE.Group;
} {
  const ballGroup = new THREE.Group();
  ballGroup.name = 'SoccerBall3D';

  // Glossy White Soccer Sphere
  const whiteSphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.26, 32, 32),
    new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 0.9,
    })
  );
  whiteSphere.castShadow = true;
  whiteSphere.receiveShadow = true;
  ballGroup.add(whiteSphere);

  // Classic Black Pentagon Patches around the 3D Soccer Ball
  const patchMat = new THREE.MeshStandardMaterial({
    color: '#0f172a',
    roughness: 0.35,
  });
  const patchDirs: [number, number, number][] = [
    [0, 1, 0],
    [0, -1, 0],
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
    [0.65, 0.65, 0.4],
    [-0.65, 0.65, 0.4],
    [0.65, -0.65, 0.4],
    [-0.65, -0.65, 0.4],
    [0.65, 0.65, -0.4],
    [-0.65, 0.65, -0.4],
  ];
  patchDirs.forEach(([dx, dy, dz]) => {
    const v = new THREE.Vector3(dx, dy, dz).normalize().multiplyScalar(0.242);
    const patch = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.04, 5), patchMat);
    patch.position.copy(v);
    patch.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize());
    ballGroup.add(patch);
  });

  // 3D Football Goal Post + Net on the right side of the 3D field
  const goalGroup = new THREE.Group();
  goalGroup.name = 'FootballGoal3D';
  const postMat = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.25,
    metalness: 0.2,
  });

  const leftPost = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.35, 16), postMat);
  leftPost.position.set(0, 0.675, -0.65);
  const rightPost = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.35, 16), postMat);
  rightPost.position.set(0, 0.675, 0.65);
  const crossbar = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.38, 16), postMat);
  crossbar.rotation.x = Math.PI / 2;
  crossbar.position.set(0, 1.35, 0);

  // Semi-transparent 3D Goal Netting Box
  const netMat = new THREE.MeshBasicMaterial({
    color: '#fef08a',
    wireframe: true,
    transparent: true,
    opacity: 0.42,
  });
  const netBox = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.32, 1.28, 6, 8, 8), netMat);
  netBox.position.set(0.28, 0.66, 0);

  goalGroup.add(leftPost, rightPost, crossbar, netBox);
  goalGroup.position.set(2.55, -1.16, -0.35);
  goalGroup.rotation.y = -0.22;

  return { ballGroup, goalGroup };
}

/**
 * Builds a real 3D Floating Interactive Game Orb / Bubble (`THREE.Group`) in Three.js
 * with a glossy physical 3D sphere shell, specular highlight, and a crisp 3D Billboard
 * Sprite displaying the Emoji + Label right inside the 3D scene!
 */
export function build3DInteractiveBubbleOrb(
  emoji: string,
  label: string,
  hexColor: string
): THREE.Group {
  const orbGroup = new THREE.Group();

  // 1. Glossy 3D Translucent Bubble Sphere
  const sphereGeo = new THREE.SphereGeometry(0.46, 32, 32);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: hexColor,
    roughness: 0.08,
    metalness: 0.05,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    transparent: true,
    opacity: 0.82,
    emissive: hexColor,
    emissiveIntensity: 0.18,
  });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  sphereMesh.castShadow = true;
  orbGroup.add(sphereMesh);

  // 2. Cute 3D Specular Highlight Dot on Upper-Left of the 3D Sphere
  const shineGeo = new THREE.SphereGeometry(0.095, 16, 16);
  const shineMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.78,
  });
  const shineMesh = new THREE.Mesh(shineGeo, shineMat);
  shineMesh.position.set(-0.16, 0.18, 0.38);
  orbGroup.add(shineMesh);

  // 3. High-DPI 3D Billboard Sprite for Emoji + Label in 3D World Space
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 256, 256);

    // Subtle dark-warm pill behind label for 100% readability
    ctx.fillStyle = 'rgba(69, 26, 3, 0.72)';
    ctx.beginPath();
    ctx.roundRect(18, 146, 220, 64, 24);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fde68a';
    ctx.stroke();

    // Big Emoji
    ctx.font = '92px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 128, 92);

    // Crisp Label
    ctx.font = label.length > 6 ? '900 28px Inter, sans-serif' : '900 38px Inter, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, 128, 179);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const spriteMat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.86, 0.86, 1);
  sprite.position.set(0, 0, 0.22);
  orbGroup.add(sprite);

  return orbGroup;
}

/**
 * Builds & updates a 3D Floating Thought-Cloud Billboard Sprite above the 3D Toy Character
 * so the child can visually see the Toy thinking ("💭 Hmm, Mia is smiling!") and deciding
 * what human activity to do next!
 */
export function build3DThoughtCloudSprite(emoji = '💭', shortText = 'Thinking...'): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({
    map: tex,
    transparent: true,
    depthTest: false,
  });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(1.55, 0.58, 1);
  sprite.userData.canvas = canvas;
  sprite.userData.texture = tex;
  update3DThoughtCloudSprite(sprite, emoji, shortText);
  return sprite;
}

export function update3DThoughtCloudSprite(
  sprite: THREE.Sprite,
  emoji: string,
  shortText: string
): void {
  const canvas = sprite.userData.canvas as HTMLCanvasElement | undefined;
  const tex = sprite.userData.texture as THREE.CanvasTexture | undefined;
  if (!canvas || !tex) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Fluffy cartoon thought cloud pill
  ctx.fillStyle = 'rgba(255, 251, 235, 0.94)';
  ctx.beginPath();
  ctx.roundRect(16, 14, 480, 118, 56);
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = '#f59e0b';
  ctx.stroke();

  // Thought trail dots below cloud
  ctx.beginPath();
  ctx.arc(210, 152, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(185, 176, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Emoji + Thought Decision Text
  ctx.font = '50px sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(emoji, 38, 74);

  ctx.font = '900 27px Inter, sans-serif';
  ctx.fillStyle = '#78350f';
  const clipped = shortText.length > 26 ? `${shortText.slice(0, 25)}…` : shortText;
  ctx.fillText(clipped, 108, 74);

  tex.needsUpdate = true;
}



