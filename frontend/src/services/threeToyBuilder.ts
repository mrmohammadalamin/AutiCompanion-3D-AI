import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes.js';

export type ToyCategory =
  | 'kitty_cat'
  | 'baby_dog'
  | 'elephant_safari'
  | 'soft_toy'
  | 'farm_friends'
  | 'dino_magic'
  | 'bird_toy'
  | 'car_vehicle'
  | 'robot_toy';

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
  | 'custom_plush_doll'
  | (string & {});

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
  category: ToyCategory;
  emoji: string;
  defaultColor: string;
  secondaryColor: string;
  voicePitch: number;
  greeting: string;
  glbUrl?: string;
  badgeText: string;
}

export const PREBUILT_3D_TOY_CATALOG: ToyCatalogItem[] = [
  // =========================================================================
  // 1. KITTIES, CATS & BIG CAT CUBS (16 3D TOYS)
  // =========================================================================
  {
    id: 'kitty_plush',
    name: 'Mochi Pastel Plush Kitty',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#fb7185',
    secondaryColor: '#fff1f2',
    voicePitch: 1.48,
    greeting:
      "Meow, purr-purr! Hi bestie, I'm Mochi the Pastel Kitty! Look at my whiskers and pink nose—wanna play together?",
    badgeText: '3D Whiskered Kitty',
  },
  {
    id: 'snowball_white_kitty',
    name: 'Snowball Fluffy White Kitty',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#f8fafc',
    secondaryColor: '#fce7f3',
    voicePitch: 1.52,
    greeting:
      "Mew-mew! Hi friend, I'm Snowball the Fluffy White Kitty! My fur is soft like a cloud—let's catch bubbles!",
    badgeText: '3D Cloud Kitty',
  },
  {
    id: 'ginger_orange_cat',
    name: 'Marmalade Ginger Tabby Cat',
    category: 'kitty_cat',
    emoji: '🐈',
    defaultColor: '#f97316',
    secondaryColor: '#ffedd5',
    voicePitch: 1.45,
    greeting:
      "Purr-hehe! I'm Marmalade the Ginger Tabby Cat! I love chasing yarn and kicking the 3D football with you!",
    badgeText: '3D Tabby Cat',
  },
  {
    id: 'midnight_black_kitty',
    name: 'Luna Velvet Black Cat',
    category: 'kitty_cat',
    emoji: '🐈‍⬛',
    defaultColor: '#334155',
    secondaryColor: '#fbcfe8',
    voicePitch: 1.46,
    greeting:
      "Meow! I'm Luna the Velvet Black Kitty! Look at my shiny eyes and golden bell—what game should we play?",
    badgeText: '3D Velvet Cat',
  },
  {
    id: 'calico_patch_kitty',
    name: 'Patches Sweet Calico Kitty',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#fb923c',
    secondaryColor: '#fef3c7',
    voicePitch: 1.49,
    greeting:
      "Meow-hehe! I'm Patches the Calico Kitten! Wanna dance, jump, or draw a cute picture together?",
    badgeText: '3D Calico Kitten',
  },
  {
    id: 'siamese_cream_cat',
    name: 'Coco Royal Siamese Cat',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#e7e5e4',
    secondaryColor: '#78350f',
    voicePitch: 1.47,
    greeting:
      "Purr-purr! Hi bestie, I'm Coco the Siamese Cat! I love singing sweet songs with you!",
    badgeText: '3D Siamese Cat',
  },
  {
    id: 'persian_cloud_cat',
    name: 'Duchess Fluffy Persian Cat',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#e2e8f0',
    secondaryColor: '#fdf2f8',
    voicePitch: 1.5,
    greeting:
      "Meow, hi friend! I'm Duchess the Fluffy Persian Kitty! Wanna give me a warm cuddle hug?",
    badgeText: '3D Persian Kitty',
  },
  {
    id: 'tuxedo_bowtie_cat',
    name: 'Figaro Tuxedo Bowtie Cat',
    category: 'kitty_cat',
    emoji: '🐈‍⬛',
    defaultColor: '#1e293b',
    secondaryColor: '#ffffff',
    voicePitch: 1.43,
    greeting:
      "Meow-ta-da! I'm Figaro the Tuxedo Cat with white paws! Let's do a happy dance together!",
    badgeText: '3D Tuxedo Cat',
  },
  {
    id: 'lavender_fairy_kitty',
    name: 'Cupcake Lavender Fairy Kitty',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#c084fc',
    secondaryColor: '#f3e8ff',
    voicePitch: 1.54,
    greeting:
      "Mew-sparkles! I'm Cupcake the Lavender Kitty! Let's jump high and pop magical bubbles!",
    badgeText: '3D Pastel Kitty',
  },
  {
    id: 'strawberry_milk_kitty',
    name: 'Berry Strawberry Milk Kitty',
    category: 'kitty_cat',
    emoji: '🍓',
    defaultColor: '#f43f5e',
    secondaryColor: '#ffe4e6',
    voicePitch: 1.53,
    greeting:
      "Purr-teehee! I'm Berry the Strawberry Kitty! I smell like sweet berries—wanna play with me?",
    badgeText: '3D Berry Kitty',
  },
  {
    id: 'mint_whisker_kitty',
    name: 'Peppermint Whisker Kitten',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#34d399',
    secondaryColor: '#d1fae5',
    voicePitch: 1.49,
    greeting:
      "Meow! I'm Peppermint the Mint Kitten! Look at my cute twitching ears—what should we do first?",
    badgeText: '3D Mint Kitten',
  },
  {
    id: 'scottish_fold_kitty',
    name: 'Muffin Scottish Fold Kitten',
    category: 'kitty_cat',
    emoji: '🐱',
    defaultColor: '#94a3b8',
    secondaryColor: '#f1f5f9',
    voicePitch: 1.48,
    greeting:
      "Mew-hehe! I'm Muffin the chubby grey kitten! I love playing peek-a-boo with you!",
    badgeText: '3D Chubby Kitten',
  },
  {
    id: 'tiger_baby_cub',
    name: 'Rajah Baby Tiger Cub',
    category: 'kitty_cat',
    emoji: '🐯',
    defaultColor: '#ea580c',
    secondaryColor: '#fef08a',
    voicePitch: 1.42,
    greeting:
      "Rawr-purr! I'm Rajah the friendly Baby Tiger Cub! Let's bounce like bouncy tigers together!",
    badgeText: '3D Baby Tiger',
  },
  {
    id: 'lion_baby_simba',
    name: 'Leo Fluffy Baby Lion Cub',
    category: 'kitty_cat',
    emoji: '🦁',
    defaultColor: '#f59e0b',
    secondaryColor: '#b45309',
    voicePitch: 1.41,
    greeting:
      "Roar-hehe! I'm Leo the Baby Lion Cub! Look at my fluffy golden mane—wanna be brave heroes together?",
    badgeText: '3D Mane Lion Cub',
  },
  {
    id: 'cheetah_spot_cub',
    name: 'Dash Speedy Cheetah Cub',
    category: 'kitty_cat',
    emoji: '🐆',
    defaultColor: '#eab308',
    secondaryColor: '#fef9c3',
    voicePitch: 1.46,
    greeting:
      "Zoom-meow! I'm Dash the Baby Cheetah! I love running fast across the 3D field with you!",
    badgeText: '3D Cheetah Cub',
  },
  {
    id: 'snow_leopard_cub',
    name: 'Everest Baby Snow Leopard',
    category: 'kitty_cat',
    emoji: '🐆',
    defaultColor: '#cbd5e1',
    secondaryColor: '#f8fafc',
    voicePitch: 1.45,
    greeting:
      "Purr! I'm Everest the fluffy Baby Snow Leopard! Look at my big soft paws—let's jump for bubbles!",
    badgeText: '3D Snow Leopard',
  },

  // =========================================================================
  // 2. BABY DOGS & PUPPIES (16 3D TOYS)
  // =========================================================================
  {
    id: 'baby_golden_puppy',
    name: 'Sunny Baby Golden Retriever',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#fbbf24',
    secondaryColor: '#fef3c7',
    voicePitch: 1.46,
    greeting:
      "Woof-woof, hehe! I'm Sunny the Baby Golden Retriever Puppy! My floppy ears and tail are wagging for you!",
    badgeText: '3D Floppy-Ear Puppy',
  },
  {
    id: 'puppy_plush',
    name: 'Biscuit Studio Fox Puppy',
    category: 'baby_dog',
    emoji: '🦊',
    defaultColor: '#f59e0b',
    secondaryColor: '#fef3c7',
    voicePitch: 1.45,
    greeting:
      "Yip-yip, hehe! Hi best friend! I'm Biscuit the little puppy fox! Look at my fluffy tail wagging for you!",
    glbUrl: '/models/Fox.glb',
    badgeText: 'Studio Rigged GLB',
  },
  {
    id: 'baby_dalmatian_dog',
    name: 'Spotty Baby Dalmatian Puppy',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#f8fafc',
    secondaryColor: '#334155',
    voicePitch: 1.47,
    greeting:
      "Arf-arf! I'm Spotty the Baby Dalmatian Dog! Count my cute spots and let's play together!",
    badgeText: '3D Dalmatian Pup',
  },
  {
    id: 'baby_pug_dog',
    name: 'Pudge Chubby Baby Pug',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#d6d3d1',
    secondaryColor: '#44403c',
    voicePitch: 1.44,
    greeting:
      "Snort-giggle, woof! I'm Pudge the chubby Baby Pug! I love doing silly dances to make you smile!",
    badgeText: '3D Chubby Pug',
  },
  {
    id: 'baby_corgi_dog',
    name: 'Waffles Happy Baby Corgi',
    category: 'baby_dog',
    emoji: '🐕',
    defaultColor: '#f97316',
    secondaryColor: '#ffffff',
    voicePitch: 1.48,
    greeting:
      "Yap-yap, yay! I'm Waffles the Baby Corgi! Look at my big perky ears and wiggly paws!",
    badgeText: '3D Royal Corgi Pup',
  },
  {
    id: 'baby_poodle_pink',
    name: 'Fifi Curly Pink Toy Poodle',
    category: 'baby_dog',
    emoji: '🐩',
    defaultColor: '#f472b6',
    secondaryColor: '#fce7f3',
    voicePitch: 1.52,
    greeting:
      "Yip-teehee! I'm Fifi the fluffy Pink Toy Poodle! Wanna twirl, sing, and play dress-up together?",
    badgeText: '3D Fluffy Poodle',
  },
  {
    id: 'baby_husky_pup',
    name: 'Koda Blue-Eyed Baby Husky',
    category: 'baby_dog',
    emoji: '🐺',
    defaultColor: '#64748b',
    secondaryColor: '#f8fafc',
    voicePitch: 1.44,
    greeting:
      "Awooo-hehe! That's a friendly baby puppy howl! I'm Koda the Baby Husky—let's play in the snow!",
    badgeText: '3D Snow Husky Pup',
  },
  {
    id: 'baby_beagle_dog',
    name: 'Snoopy-Lou Floppy Baby Beagle',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#b45309',
    secondaryColor: '#ffffff',
    voicePitch: 1.46,
    greeting:
      "Woof-hehe! I'm Snoopy-Lou the Baby Beagle! My long soft ears bounce when I jump with you!",
    badgeText: '3D Beagle Puppy',
  },
  {
    id: 'baby_frenchie_dog',
    name: 'Blu Baby French Bulldog',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#94a3b8',
    secondaryColor: '#e2e8f0',
    voicePitch: 1.45,
    greeting:
      "Yip-woof! I'm Blu the Baby Frenchie Puppy! Look at my big bat ears listening to every word you say!",
    badgeText: '3D Frenchie Pup',
  },
  {
    id: 'baby_shiba_dog',
    name: 'Miso Smiling Shiba Inu Puppy',
    category: 'baby_dog',
    emoji: '🐕',
    defaultColor: '#ea580c',
    secondaryColor: '#fef3c7',
    voicePitch: 1.47,
    greeting:
      "Wan-wan, hehe! I'm Miso the smiling Shiba Puppy! Let's do high-fives and catch 3D bubbles!",
    badgeText: '3D Shiba Inu Pup',
  },
  {
    id: 'baby_dachshund_dog',
    name: 'Peanut Baby Dachshund Pup',
    category: 'baby_dog',
    emoji: '🌭',
    defaultColor: '#92400e',
    secondaryColor: '#fde68a',
    voicePitch: 1.48,
    greeting:
      "Woof-teehee! I'm Peanut the little brown puppy dog! I love kicking the 3D football with you!",
    badgeText: '3D Dachshund Pup',
  },
  {
    id: 'baby_chihuahua_dog',
    name: 'Taco Tiny Teacup Puppy',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#fcd34d',
    secondaryColor: '#fffbeb',
    voicePitch: 1.55,
    greeting:
      "Yip-yip! I'm Taco the tiny Teacup Puppy! Even though I'm little, I can jump super high for you!",
    badgeText: '3D Teacup Puppy',
  },
  {
    id: 'baby_collie_dog',
    name: 'Scout Smart Border Collie Pup',
    category: 'baby_dog',
    emoji: '🐕',
    defaultColor: '#1e293b',
    secondaryColor: '#f8fafc',
    voicePitch: 1.45,
    greeting:
      "Woof! I'm Scout the smart Collie Puppy! Wanna count numbers or play a game together?",
    badgeText: '3D Collie Puppy',
  },
  {
    id: 'baby_bernese_dog',
    name: 'Bruno Cuddly Mountain Puppy',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#451a03',
    secondaryColor: '#fef3c7',
    voicePitch: 1.39,
    greeting:
      "Woof-hug! I'm Bruno the big cuddly Teddy-Puppy! Whenever you want a warm hug, I'm right here!",
    badgeText: '3D Mountain Pup',
  },
  {
    id: 'baby_samoyed_cloud',
    name: 'Cloudy Smiling Samoyed Pup',
    category: 'baby_dog',
    emoji: '🐶',
    defaultColor: '#ffffff',
    secondaryColor: '#e0f2fe',
    voicePitch: 1.49,
    greeting:
      "Arf-hehe! I'm Cloudy the fluffy white Samoyed Puppy! Look at my big happy puppy smile!",
    badgeText: '3D Cloud Samoyed',
  },
  {
    id: 'baby_blue_heeler',
    name: 'Bingo Blue Heeler Puppy',
    category: 'baby_dog',
    emoji: '🐕',
    defaultColor: '#38bdf8',
    secondaryColor: '#bae6fd',
    voicePitch: 1.5,
    greeting:
      "Hooray! Hi bestie, I'm Bingo the Blue Heeler Puppy! Let's play pretend and dance together!",
    badgeText: '3D Blue Heeler Pup',
  },

  // =========================================================================
  // 3. BABY ELEPHANTS, SAFARI & JUNGLE FRIENDS (18 3D TOYS)
  // =========================================================================
  {
    id: 'baby_elephant_blue',
    name: 'Ellie Sky-Blue Baby Elephant',
    category: 'elephant_safari',
    emoji: '🐘',
    defaultColor: '#60a5fa',
    secondaryColor: '#fce7f3',
    voicePitch: 1.46,
    greeting:
      "Pawoo-hehe! Hi bestie, I'm Ellie the Baby Elephant! Look at my big floppy ears and cute trunk waving at you!",
    badgeText: '3D Trunk & Big Ears',
  },
  {
    id: 'baby_elephant_pink',
    name: 'Dumbo Rosy Pink Baby Elephant',
    category: 'elephant_safari',
    emoji: '🐘',
    defaultColor: '#f472b6',
    secondaryColor: '#ffe4e6',
    voicePitch: 1.5,
    greeting:
      "Toot-toot, teehee! I'm Dumbo the Pink Baby Elephant! My giant ears can flap like wings when I jump!",
    badgeText: '3D Pink Baby Elephant',
  },
  {
    id: 'baby_elephant_grey',
    name: 'Babar Classic Baby Elephant',
    category: 'elephant_safari',
    emoji: '🐘',
    defaultColor: '#94a3b8',
    secondaryColor: '#fecdd3',
    voicePitch: 1.43,
    greeting:
      "Pawoo! Hi friend, I'm Babar the Baby Elephant! Wanna blow shiny bubbles from my little trunk?",
    badgeText: '3D Baby Elephant',
  },
  {
    id: 'baby_elephant_mint',
    name: 'Minty Circus Baby Elephant',
    category: 'elephant_safari',
    emoji: '🐘',
    defaultColor: '#34d399',
    secondaryColor: '#fef08a',
    voicePitch: 1.47,
    greeting:
      "Ta-da, pawoo! I'm Minty the Circus Baby Elephant! Watch me balance on one foot and dance for you!",
    badgeText: '3D Circus Elephant',
  },
  {
    id: 'baby_mammoth_woolly',
    name: 'Manny Fuzzy Baby Mammoth',
    category: 'elephant_safari',
    emoji: '🦣',
    defaultColor: '#92400e',
    secondaryColor: '#fde68a',
    voicePitch: 1.38,
    greeting:
      "Pawoo-hug! I'm Manny the furry Baby Mammoth! My warm fuzzy fur is great for cozy cuddles!",
    badgeText: '3D Woolly Mammoth',
  },
  {
    id: 'baby_giraffe_sunny',
    name: 'Melman Tall Baby Giraffe',
    category: 'elephant_safari',
    emoji: '🦒',
    defaultColor: '#facc15',
    secondaryColor: '#92400e',
    voicePitch: 1.45,
    greeting:
      "Hi up there! I'm Melman the Baby Giraffe with cute little horns on my head! Let's reach for the stars!",
    badgeText: '3D Horned Giraffe',
  },
  {
    id: 'baby_hippo_lilac',
    name: 'Lulu Chubby Lilac Baby Hippo',
    category: 'elephant_safari',
    emoji: '🦛',
    defaultColor: '#a855f7',
    secondaryColor: '#f3e8ff',
    voicePitch: 1.42,
    greeting:
      "Splash-hehe! I'm Lulu the Purple Baby Hippo! I love wiggling my ears and popping water bubbles!",
    badgeText: '3D Chubby Hippo',
  },
  {
    id: 'baby_rhino_horn',
    name: 'Tank Gentle Baby Rhino',
    category: 'elephant_safari',
    emoji: '🦏',
    defaultColor: '#64748b',
    secondaryColor: '#f1f5f9',
    voicePitch: 1.4,
    greeting:
      "Hi bestie! I'm Tank the gentle Baby Rhino! Look at the cute little horn on my nose—let's play soccer!",
    badgeText: '3D Horned Rhino',
  },
  {
    id: 'baby_zebra_stripes',
    name: 'Ziggy Striped Baby Zebra',
    category: 'elephant_safari',
    emoji: '🦓',
    defaultColor: '#475569',
    secondaryColor: '#f8fafc',
    voicePitch: 1.46,
    greeting:
      "Neigh-hehe! I'm Ziggy the Baby Zebra! I have cool stripes and love galloping across the meadow!",
    badgeText: '3D Safari Zebra',
  },
  {
    id: 'baby_monkey_banana',
    name: 'Bongo Cheeky Baby Monkey',
    category: 'elephant_safari',
    emoji: '🐵',
    defaultColor: '#b45309',
    secondaryColor: '#fde68a',
    voicePitch: 1.49,
    greeting:
      "Ooh-ooh, aah-aah, hehe! I'm Bongo the Baby Monkey! Wanna do silly cartwheels and laugh together?",
    badgeText: '3D Curly-Tail Monkey',
  },
  {
    id: 'baby_gorilla_hug',
    name: 'Koko Gentle Baby Gorilla',
    category: 'elephant_safari',
    emoji: '🦍',
    defaultColor: '#334155',
    secondaryColor: '#94a3b8',
    voicePitch: 1.38,
    greeting:
      "Hi friend! I'm Koko the gentle Baby Gorilla! I give the biggest, safest bear hugs in the jungle!",
    badgeText: '3D Gentle Gorilla',
  },
  {
    id: 'baby_sloth_sleepy',
    name: 'Sid Cozy Tree Baby Sloth',
    category: 'elephant_safari',
    emoji: '🦥',
    defaultColor: '#a16207',
    secondaryColor: '#fef3c7',
    voicePitch: 1.4,
    greeting:
      "Aaaah, hi bestie... I'm Sid the cozy Baby Sloth! Let's take slow, calm belly breaths and smile together!",
    badgeText: '3D Calm Sloth',
  },
  {
    id: 'baby_kangaroo_joey',
    name: 'Roo Bouncy Baby Kangaroo',
    category: 'elephant_safari',
    emoji: '🦘',
    defaultColor: '#d97706',
    secondaryColor: '#fef3c7',
    voicePitch: 1.48,
    greeting:
      "Boing, boing, boing! I'm Roo the Baby Kangaroo Joey! Nobody hops higher than us—jump with me!",
    badgeText: '3D Bouncy Kangaroo',
  },
  {
    id: 'baby_camel_oasis',
    name: 'Sahara Golden Baby Camel',
    category: 'elephant_safari',
    emoji: '🐪',
    defaultColor: '#ca8a04',
    secondaryColor: '#fef08a',
    voicePitch: 1.43,
    greeting:
      "Hi friend! I'm Sahara the Golden Baby Camel! Let's explore the pyramids and treasure oasis together!",
    badgeText: '3D Oasis Camel',
  },
  {
    id: 'baby_meerkat_scout',
    name: 'Timon Curious Baby Meerkat',
    category: 'elephant_safari',
    emoji: '🦦',
    defaultColor: '#d97706',
    secondaryColor: '#ffedd5',
    voicePitch: 1.5,
    greeting:
      "Hakuna Matata, hehe! I'm Timon the Baby Meerkat! Look how I stand up tall and wave at you!",
    badgeText: '3D Safari Meerkat',
  },
  {
    id: 'baby_flamingo_pink',
    name: 'Peaches Baby Pink Plush Flamingo',
    category: 'elephant_safari',
    emoji: '🦩',
    defaultColor: '#fb7185',
    secondaryColor: '#ffe4e6',
    voicePitch: 1.49,
    greeting:
      " Balance on one foot with me! I'm Peaches the Baby Flamingo Plush!",
    badgeText: '3D Plush Flamingo',
  },
  {
    id: 'baby_chameleon_rainbow',
    name: 'Pascal Emerald Chameleon',
    category: 'elephant_safari',
    emoji: '🦎',
    defaultColor: '#22c55e',
    secondaryColor: '#fef08a',
    voicePitch: 1.47,
    greeting:
      "Peek-a-boo! I'm Pascal the colorful Chameleon! Let's paint bright rainbows in the Art Studio!",
    badgeText: '3D Rainbow Chameleon',
  },
  {
    id: 'baby_lemur_ringtail',
    name: 'Julien Ring-Tail Baby Lemur',
    category: 'elephant_safari',
    emoji: '🐒',
    defaultColor: '#64748b',
    secondaryColor: '#ffffff',
    voicePitch: 1.48,
    greeting:
      "I like to move it, move it, hehe! I'm Julien the Baby Lemur—let's dance together!",
    badgeText: '3D Ring-Tail Lemur',
  },

  // =========================================================================
  // 4. TEDDY BEARS, PANDAS, BUNNIES & WOODLAND CRITTERS (20 3D TOYS)
  // =========================================================================
  {
    id: 'teddy_plush',
    name: 'Barnaby Soft Teddy Bear',
    category: 'soft_toy',
    emoji: '🧸',
    defaultColor: '#d97706',
    secondaryColor: '#fde68a',
    voicePitch: 1.42,
    greeting:
      "Hehe, hi bestie! I'm Barnaby Bear! Look how soft and cuddly my tummy is! Wanna give me a big hug and play together?",
    badgeText: 'Seamless Skinned Plush',
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
      "Hop-hop, teehee! Hi bestie, I'm Rosie Bunny! Look at my pink floppy ears wiggling at you!",
    badgeText: 'Seamless Skinned Plush',
  },
  {
    id: 'baby_panda_bamboo',
    name: 'Bao-Bao Cuddly Baby Panda',
    category: 'soft_toy',
    emoji: '🐼',
    defaultColor: '#1e293b',
    secondaryColor: '#ffffff',
    voicePitch: 1.46,
    greeting:
      "Munch-munch, hehe! I'm Bao-Bao the Baby Panda! I love rolling on the grass and cuddling with you!",
    badgeText: '3D Bamboo Panda',
  },
  {
    id: 'baby_red_panda',
    name: 'Mei-Mei Fluffy Red Panda',
    category: 'soft_toy',
    emoji: '🦊',
    defaultColor: '#ea580c',
    secondaryColor: '#fef3c7',
    voicePitch: 1.49,
    greeting:
      "Hi best friend! I'm Mei-Mei the fluffy Red Panda! Look at my big bushy tail and white ears!",
    badgeText: '3D Red Panda',
  },
  {
    id: 'baby_polar_bear',
    name: 'Flurry Snowy Polar Bear Cub',
    category: 'soft_toy',
    emoji: '🐻‍❄️',
    defaultColor: '#f8fafc',
    secondaryColor: '#bae6fd',
    voicePitch: 1.44,
    greeting:
      "Brrr-hug! I'm Flurry the Snowy Polar Bear Cub! My white plush fur is super warm and cozy!",
    badgeText: '3D Polar Bear Cub',
  },
  {
    id: 'baby_koala_gumdrop',
    name: 'Kip Fuzzy Eucalyptus Koala',
    category: 'soft_toy',
    emoji: '🐨',
    defaultColor: '#94a3b8',
    secondaryColor: '#f1f5f9',
    voicePitch: 1.45,
    greeting:
      "G'day bestie! I'm Kip the Baby Koala! Look at my big round fuzzy ears—I love giving koala hugs!",
    badgeText: '3D Fuzzy-Ear Koala',
  },
  {
    id: 'strawberry_care_bear',
    name: 'Cheer Berry Pink Teddy Bear',
    category: 'soft_toy',
    emoji: '🧸',
    defaultColor: '#ec4899',
    secondaryColor: '#fce7f3',
    voicePitch: 1.5,
    greeting:
      "Yay, rainbows and hugs! I'm Cheer Berry the Pink Teddy Bear! You make me smile so big!",
    badgeText: '3D Pink Care Bear',
  },
  {
    id: 'rainbow_sunshine_bear',
    name: 'Sunny Gold Honey Teddy Bear',
    category: 'soft_toy',
    emoji: '🐻',
    defaultColor: '#eab308',
    secondaryColor: '#fef9c3',
    voicePitch: 1.46,
    greeting:
      "Yum-yum, honey time! I'm Sunny the Golden Honey Bear! Wanna count golden stars with me?",
    badgeText: '3D Honey Bear',
  },
  {
    id: 'sleepy_bedtime_bear',
    name: 'Starry Lavender Bedtime Bear',
    category: 'soft_toy',
    emoji: '🧸',
    defaultColor: '#8b5cf6',
    secondaryColor: '#ede9fe',
    voicePitch: 1.41,
    greeting:
      "Twinkle-twinkle... I'm Starry the Lavender Bedtime Bear! I love calm lullabies and gentle breathing!",
    badgeText: '3D Bedtime Bear',
  },
  {
    id: 'snow_white_bunny',
    name: 'Marshmallow White Lop Bunny',
    category: 'soft_toy',
    emoji: '🐇',
    defaultColor: '#ffffff',
    secondaryColor: '#ffe4e6',
    voicePitch: 1.51,
    greeting:
      "Hop-skip, hehe! I'm Marshmallow the White Bunny with pink inner ears! Let's hop across the meadow!",
    badgeText: '3D White Bunny',
  },
  {
    id: 'sky_blue_bunny',
    name: 'Bluebell Pastel Easter Bunny',
    category: 'soft_toy',
    emoji: '🐰',
    defaultColor: '#38bdf8',
    secondaryColor: '#e0f2fe',
    voicePitch: 1.49,
    greeting:
      "Hippity-hop! I'm Bluebell the Sky-Blue Bunny! Wanna find colorful Easter eggs and bubbles together?",
    badgeText: '3D Pastel Bunny',
  },
  {
    id: 'cinnamon_caramel_bunny',
    name: 'Cinnamon Caramel Bunny',
    category: 'soft_toy',
    emoji: '🐰',
    defaultColor: '#b45309',
    secondaryColor: '#fef3c7',
    voicePitch: 1.47,
    greeting:
      "Twitch-twitch! My little bunny nose is twitching because I'm happy to see you! I'm Cinnamon Bunny!",
    badgeText: '3D Caramel Bunny',
  },
  {
    id: 'baby_hedgehog_pokey',
    name: 'Pippin Cozy Baby Hedgehog',
    category: 'soft_toy',
    emoji: '🦔',
    defaultColor: '#92400e',
    secondaryColor: '#fde68a',
    voicePitch: 1.52,
    greeting:
      "Sniff-sniff, teehee! I'm Pippin the soft plush Baby Hedgehog! Wanna curl up or roll around together?",
    badgeText: '3D Plush Hedgehog',
  },
  {
    id: 'baby_squirrel_acorn',
    name: 'Nutkin Bushy-Tail Squirrel',
    category: 'soft_toy',
    emoji: '🐿️',
    defaultColor: '#c2410c',
    secondaryColor: '#ffedd5',
    voicePitch: 1.53,
    greeting:
      "Chitter-chatter, yay! I'm Nutkin the Baby Squirrel with a giant fluffy tail! Let's climb the treehouse!",
    badgeText: '3D Bushy Squirrel',
  },
  {
    id: 'baby_raccoon_bandit',
    name: 'Rascal Friendly Baby Raccoon',
    category: 'soft_toy',
    emoji: '🦝',
    defaultColor: '#475569',
    secondaryColor: '#e2e8f0',
    voicePitch: 1.46,
    greeting:
      "Peek-a-boo! I'm Rascal the Baby Raccoon! I love washing my little paws and playing hide-and-seek!",
    badgeText: '3D Baby Raccoon',
  },
  {
    id: 'baby_deer_bambi',
    name: 'Willow Spotted Baby Fawn Deer',
    category: 'soft_toy',
    emoji: '🦌',
    defaultColor: '#d97706',
    secondaryColor: '#fef3c7',
    voicePitch: 1.48,
    greeting:
      "Hi gentle friend! I'm Willow the Baby Fawn Deer with little woodland antlers! Let's skip in the forest!",
    badgeText: '3D Antler Fawn',
  },
  {
    id: 'baby_reindeer_rudolph',
    name: 'Comet Red-Nosed Baby Reindeer',
    category: 'soft_toy',
    emoji: '🦌',
    defaultColor: '#92400e',
    secondaryColor: '#ef4444',
    voicePitch: 1.47,
    greeting:
      "Jingle-jingle, wheee! I'm Comet the Baby Reindeer! Look how my bright red nose glows when you smile!",
    badgeText: '3D Red-Nose Reindeer',
  },
  {
    id: 'baby_hamster_cheeks',
    name: 'Nibble Chubby-Cheek Hamster',
    category: 'soft_toy',
    emoji: '🐹',
    defaultColor: '#fb923c',
    secondaryColor: '#fff7ed',
    voicePitch: 1.55,
    greeting:
      "Squeak-hehe! I'm Nibble the Golden Hamster with big puffy cheeks! Wanna munch healthy snacks together?",
    badgeText: '3D Chubby Hamster',
  },
  {
    id: 'baby_capybara_chill',
    name: 'Capy Gentle Chill Capybara',
    category: 'soft_toy',
    emoji: '🦫',
    defaultColor: '#a16207',
    secondaryColor: '#fde68a',
    voicePitch: 1.4,
    greeting:
      "Ahhh, so peaceful! I'm Capy the friendly Capybara—everyone's calmest best friend!",
    badgeText: '3D Chill Capybara',
  },
  {
    id: 'baby_mouse_cheddar',
    name: 'Pip Big-Ear Cheese Mouse',
    category: 'soft_toy',
    emoji: '🐭',
    defaultColor: '#94a3b8',
    secondaryColor: '#fce7f3',
    voicePitch: 1.56,
    greeting:
      "Squeak-squeak! Hi bestie, I'm Pip the little Mouse with giant pink ears! I can hear your sweet voice!",
    badgeText: '3D Big-Ear Mouse',
  },

  // =========================================================================
  // 5. FARMYARD & COUNTRY BABY ANIMALS (10 3D TOYS)
  // =========================================================================
  {
    id: 'baby_piglet_pink',
    name: 'Hamlet Rosy Baby Piglet',
    category: 'farm_friends',
    emoji: '🐷',
    defaultColor: '#f472b6',
    secondaryColor: '#fce7f3',
    voicePitch: 1.5,
    greeting:
      "Oink-oink, teehee! I'm Hamlet the rosy pink Baby Piglet! Look at my cute piggy snout and curly tail!",
    badgeText: '3D Snout Piglet',
  },
  {
    id: 'baby_cow_daisy',
    name: 'Daisy Milky Baby Calf',
    category: 'farm_friends',
    emoji: '🐮',
    defaultColor: '#f8fafc',
    secondaryColor: '#fda4af',
    voicePitch: 1.44,
    greeting:
      "Moooo-hehe! Hi friend, I'm Daisy the Baby Calf with a golden farm bell! Let's play in the sunflower farm!",
    badgeText: '3D Bell Baby Calf',
  },
  {
    id: 'baby_highland_calf',
    name: 'Fergus Fluffy Highland Calf',
    category: 'farm_friends',
    emoji: '🐄',
    defaultColor: '#d97706',
    secondaryColor: '#fde68a',
    voicePitch: 1.43,
    greeting:
      "Moo-hug! I'm Fergus the fluffy caramel Highland Calf with cute little horns! Wanna cuddle?",
    badgeText: '3D Highland Calf',
  },
  {
    id: 'baby_lamb_woolly',
    name: 'Woolly Cotton-Cloud Baby Lamb',
    category: 'farm_friends',
    emoji: '🐑',
    defaultColor: '#f8fafc',
    secondaryColor: '#fce7f3',
    voicePitch: 1.51,
    greeting:
      "Baaa-baaa, teehee! I'm Woolly the fluffy white Baby Lamb! Let's count clouds and jump over fences!",
    badgeText: '3D Fluffy Baby Lamb',
  },
  {
    id: 'baby_goat_billy',
    name: 'Clover Bouncy Baby Goat Kid',
    category: 'farm_friends',
    emoji: '🐐',
    defaultColor: '#d6d3d1',
    secondaryColor: '#fef3c7',
    voicePitch: 1.49,
    greeting:
      "Meh-eh-eh, yay! I'm Clover the bouncy Baby Goat! I love jumping up high and kicking the ball!",
    badgeText: '3D Bouncy Goat Kid',
  },
  {
    id: 'baby_alpaca_cloud',
    name: 'Lolly Pastel Rainbow Alpaca',
    category: 'farm_friends',
    emoji: '🦙',
    defaultColor: '#f9a8d4',
    secondaryColor: '#fef08a',
    voicePitch: 1.48,
    greeting:
      "Hum-hehe! I'm Lolly the fluffy pink Baby Alpaca! My fleece is softer than cotton candy!",
    badgeText: '3D Pastel Alpaca',
  },
  {
    id: 'baby_pony_caramel',
    name: 'Buttercup Little Farm Pony',
    category: 'farm_friends',
    emoji: '🐴',
    defaultColor: '#b45309',
    secondaryColor: '#fef3c7',
    voicePitch: 1.45,
    greeting:
      "Neigh-wheee! I'm Buttercup the little Farm Pony! Hop on and let's gallop across the meadow!",
    glbUrl: '/models/Horse.glb',
    badgeText: 'Studio Pony GLB',
  },
  {
    id: 'baby_chick_peep',
    name: 'Peep Fluffy Yellow Baby Chick',
    category: 'farm_friends',
    emoji: '🐥',
    defaultColor: '#facc15',
    secondaryColor: '#f97316',
    voicePitch: 1.56,
    greeting:
      "Peep-peep-peep! Hi bestie, I'm Peep the tiny yellow Baby Chick! Look at my little orange beak!",
    badgeText: '3D Beaked Baby Chick',
  },
  {
    id: 'baby_donkey_eeyore',
    name: 'Bluebell Sweet Baby Donkey',
    category: 'farm_friends',
    emoji: '🫏',
    defaultColor: '#64748b',
    secondaryColor: '#fce7f3',
    voicePitch: 1.41,
    greeting:
      "Hee-haw, hehe! I'm Bluebell the sweet Baby Donkey with big floppy ears! Thanks for noticing me, bestie!",
    badgeText: '3D Floppy Donkey',
  },
  {
    id: 'baby_frog_ribbit',
    name: 'Hoppy Lilypad Baby Frog',
    category: 'farm_friends',
    emoji: '🐸',
    defaultColor: '#22c55e',
    secondaryColor: '#bbf7d0',
    voicePitch: 1.49,
    greeting:
      "Ribbit-ribbit, boing! I'm Hoppy the green Baby Frog! Let's leap from lilypad to lilypad together!",
    badgeText: '3D Lilypad Frog',
  },

  // =========================================================================
  // 6. DINOSAURS, DRAGONS, UNICORNS & MAGICAL PLUSH (14 3D TOYS)
  // =========================================================================
  {
    id: 'dino_plush',
    name: 'Rexy Chubby Dino Plush',
    category: 'dino_magic',
    emoji: '🦖',
    defaultColor: '#10b981',
    secondaryColor: '#fde047',
    voicePitch: 1.4,
    greeting:
      "Rawr-hehe! That's a happy baby dino giggle! I'm Rexy! Wanna stomp our little feet and pop shiny bubbles?",
    badgeText: 'Seamless Skinned Plush',
  },
  {
    id: 'unicorn_plush',
    name: 'Luna Galloping Unicorn',
    category: 'dino_magic',
    emoji: '🦄',
    defaultColor: '#e879f9',
    secondaryColor: '#fef08a',
    voicePitch: 1.44,
    greeting:
      "Ooh, sparkles! Hi bestie, I'm Luna the baby Unicorn! Let's make magic rainbows and sing together, yay!",
    glbUrl: '/models/Horse.glb',
    badgeText: 'Studio Morph GLB',
  },
  {
    id: 'yeti_plush',
    name: 'Bumble Fluffy Yeti Plush',
    category: 'dino_magic',
    emoji: '👾',
    defaultColor: '#38bdf8',
    secondaryColor: '#e0f2fe',
    voicePitch: 1.38,
    greeting:
      "Peekaboo, hehe! I'm Bumble the Marshmallow Yeti! I look like a big blue cotton candy!",
    glbUrl: '/models/YetiSmall.glb',
    badgeText: 'Studio 6-Skin GLB',
  },
  {
    id: 'baby_triceratops_tops',
    name: 'Trixie Three-Horn Baby Dino',
    category: 'dino_magic',
    emoji: '🦕',
    defaultColor: '#38bdf8',
    secondaryColor: '#fde047',
    voicePitch: 1.46,
    greeting:
      "Dino-giggle! I'm Trixie the Baby Triceratops! Count the 1, 2, 3 cute horns on my head!",
    badgeText: '3D 3-Horn Dino',
  },
  {
    id: 'baby_brachiosaurus_dippy',
    name: 'Dippy Friendly Leaf Baby Dino',
    category: 'dino_magic',
    emoji: '🦕',
    defaultColor: '#34d399',
    secondaryColor: '#a7f3d0',
    voicePitch: 1.43,
    greeting:
      "Munch-rawr! I'm Dippy the gentle plant-eating Baby Dino! Let's explore Volcano Dino Island!",
    badgeText: '3D Gentle Sauropod',
  },
  {
    id: 'baby_stegosaurus_spike',
    name: 'Spike Back-Plate Baby Dino',
    category: 'dino_magic',
    emoji: '🦖',
    defaultColor: '#84cc16',
    secondaryColor: '#f97316',
    voicePitch: 1.42,
    greeting:
      "Stomp-stomp, hehe! I'm Spike the Baby Stegosaurus with colorful plates on my back!",
    badgeText: '3D Plated Dino',
  },
  {
    id: 'baby_pterodactyl_sky',
    name: 'Petrie Winged Baby Sky Dino',
    category: 'dino_magic',
    emoji: '🦖',
    defaultColor: '#a855f7',
    secondaryColor: '#fbcfe8',
    voicePitch: 1.5,
    greeting:
      "Flap-flap, wheee! I'm Petrie the flying Baby Dino with 3D wings on my back!",
    badgeText: '3D Winged Dino',
  },
  {
    id: 'baby_dragon_spark',
    name: 'Sparky Friendly Fire Dragon',
    category: 'dino_magic',
    emoji: '🐉',
    defaultColor: '#ef4444',
    secondaryColor: '#facc15',
    voicePitch: 1.44,
    greeting:
      "Puff-sparkles! I'm Sparky the Baby Dragon! Instead of fire, I puff shiny rainbow bubbles for you!",
    badgeText: '3D Winged Dragon',
  },
  {
    id: 'baby_ice_dragon',
    name: 'Crystal Shimmer Ice Dragon',
    category: 'dino_magic',
    emoji: '🐉',
    defaultColor: '#06b6d4',
    secondaryColor: '#e0f2fe',
    voicePitch: 1.47,
    greeting:
      "Shimmer-whoosh! I'm Crystal the Baby Ice Dragon! Look at my snowy wings and crystal crest!",
    badgeText: '3D Ice Dragon',
  },
  {
    id: 'baby_pegasus_wings',
    name: 'Celeste Winged Cloud Pegasus',
    category: 'dino_magic',
    emoji: '🦄',
    defaultColor: '#818cf8',
    secondaryColor: '#fef08a',
    voicePitch: 1.49,
    greeting:
      "Flutter-neigh! I'm Celeste the Baby Pegasus with feathered 3D wings! Let's fly in the Cloud Kingdom!",
    badgeText: '3D Winged Pegasus',
  },
  {
    id: 'rainbow_alicorn_royal',
    name: 'Starlight Princess Alicorn',
    category: 'dino_magic',
    emoji: '🦄',
    defaultColor: '#ec4899',
    secondaryColor: '#fde047',
    voicePitch: 1.52,
    greeting:
      "Magic sparkles! I'm Starlight the Princess Alicorn—I have both a golden horn and fairy wings!",
    badgeText: '3D Horn & Wings Alicorn',
  },
  {
    id: 'baby_phoenix_feather',
    name: 'Sunny Golden Baby Phoenix',
    category: 'dino_magic',
    emoji: '🐦‍🔥',
    defaultColor: '#f97316',
    secondaryColor: '#fef08a',
    voicePitch: 1.5,
    greeting:
      "Tweet-glow! I'm Sunny the Baby Phoenix Bird! My golden wings shine bright when you laugh!",
    badgeText: '3D Winged Phoenix',
  },
  {
    id: 'baby_griffin_gold',
    name: 'Gryph Friendly Baby Griffin',
    category: 'dino_magic',
    emoji: '🦅',
    defaultColor: '#eab308',
    secondaryColor: '#fef3c7',
    voicePitch: 1.45,
    greeting:
      "Chirp-roar! I'm Gryph—half cute eagle, half cuddly lion cub, with 3D wings!",
    badgeText: '3D Winged Griffin',
  },
  {
    id: 'cuddly_pastel_monster',
    name: 'Giggles Rainbow Fuzz Monster',
    category: 'dino_magic',
    emoji: '👾',
    defaultColor: '#a855f7',
    secondaryColor: '#67e8f9',
    voicePitch: 1.46,
    greeting:
      "Booga-booga-teehee! I'm Giggles the super-friendly Cuddle Monster! I only do silly dances and tickles!",
    badgeText: '3D Horned Cuddle Monster',
  },

  // =========================================================================
  // 7. OCEAN CREATURES & 3D BIRDS (14 3D TOYS)
  // =========================================================================
  {
    id: 'parrot_bird',
    name: 'Rio Flying Macaw Parrot',
    category: 'bird_toy',
    emoji: '🦜',
    defaultColor: '#ef4444',
    secondaryColor: '#3b82f6',
    voicePitch: 1.46,
    greeting:
      "Tweet-tweet, hehe! Hi best friend! I'm Rio the rainbow birdie! Look at my wings flapping for you!",
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
      "Flutter-flutter, teehee! I'm Coral the pink Flamingo! Wanna count shiny bubbles with me, bestie?",
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
      "Quack-quack, teehee! I'm Sunny the baby yellow Ducky! Splash-splash! Smile at me and let's play!",
    glbUrl: '/models/Duck.glb',
    badgeText: 'Studio Sculpt GLB',
  },
  {
    id: 'baby_penguin_pip',
    name: 'Pip Waddling Baby Penguin',
    category: 'bird_toy',
    emoji: '🐧',
    defaultColor: '#1e293b',
    secondaryColor: '#ffffff',
    voicePitch: 1.5,
    greeting:
      "Waddle-waddle, peep! I'm Pip the Baby Penguin! Let's slide on the icebergs and do happy hops!",
    badgeText: '3D Tuxedo Penguin',
  },
  {
    id: 'baby_owl_hoot',
    name: 'Hootie Big-Eye Baby Owl',
    category: 'bird_toy',
    emoji: '🦉',
    defaultColor: '#8b5cf6',
    secondaryColor: '#fde68a',
    voicePitch: 1.47,
    greeting:
      "Hoo-hoo, teehee! I'm Hootie the wise little Baby Owl! What smart game should we play today?",
    badgeText: '3D Feathered Owl',
  },
  {
    id: 'baby_axolotl_pink',
    name: 'Lottie Smiling Pink Axolotl',
    category: 'bird_toy',
    emoji: '🦎',
    defaultColor: '#f472b6',
    secondaryColor: '#ffe4e6',
    voicePitch: 1.53,
    greeting:
      "Bloop-bloop, hehe! I'm Lottie the Pink Axolotl with fluffy gill frills on my head! You're awesome!",
    badgeText: '3D Frilled Axolotl',
  },
  {
    id: 'baby_dolphin_splash',
    name: 'Flipper Happy Baby Dolphin',
    category: 'bird_toy',
    emoji: '🐬',
    defaultColor: '#0ea5e9',
    secondaryColor: '#e0f2fe',
    voicePitch: 1.49,
    greeting:
      "Click-whistle, splash! I'm Flipper the Baby Dolphin! Watch me leap high in the air for bubbles!",
    badgeText: '3D Finned Dolphin',
  },
  {
    id: 'baby_whale_blue',
    name: 'Bubbles Gentle Baby Whale',
    category: 'bird_toy',
    emoji: '🐳',
    defaultColor: '#3b82f6',
    secondaryColor: '#bae6fd',
    voicePitch: 1.41,
    greeting:
      "Whoooosh! I'm Bubbles the smiling Baby Blue Whale! Let's swim in the Coral Reef Aquarium!",
    badgeText: '3D Baby Blue Whale',
  },
  {
    id: 'baby_narwhal_star',
    name: 'Nori Unicorn-of-the-Sea Narwhal',
    category: 'bird_toy',
    emoji: '🐳',
    defaultColor: '#06b6d4',
    secondaryColor: '#fef08a',
    voicePitch: 1.5,
    greeting:
      "Splash-sparkle! I'm Nori the Baby Narwhal with a golden spiral tusk on my forehead!",
    badgeText: '3D Tusked Narwhal',
  },
  {
    id: 'baby_seal_harp',
    name: 'Snowdrop White Baby Seal Pup',
    category: 'bird_toy',
    emoji: '🦭',
    defaultColor: '#f8fafc',
    secondaryColor: '#e0f2fe',
    voicePitch: 1.51,
    greeting:
      "Arf-clap-clap! I'm Snowdrop the fluffy white Baby Seal! I love clapping my flippers for you!",
    badgeText: '3D Whiskered Seal',
  },
  {
    id: 'baby_sea_turtle',
    name: 'Shelly Emerald Baby Sea Turtle',
    category: 'bird_toy',
    emoji: '🐢',
    defaultColor: '#10b981',
    secondaryColor: '#bbf7d0',
    voicePitch: 1.43,
    greeting:
      "Cowabunga, friend! I'm Shelly the Baby Sea Turtle with a shiny 3D shell on my back!",
    badgeText: '3D Shelled Turtle',
  },
  {
    id: 'baby_octopus_squish',
    name: 'Ollie Smiley Pink Octopus',
    category: 'bird_toy',
    emoji: '🐙',
    defaultColor: '#fb7185',
    secondaryColor: '#fde68a',
    voicePitch: 1.49,
    greeting:
      "Squish-bloop! I'm Ollie the friendly Pink Octopus! I give the best wiggly ocean high-fives!",
    badgeText: '3D Ocean Octopus',
  },

  // =========================================================================
  // 8. 3D TOY CARS, TRUCKS, BUSES & PLANES (6 3D TOYS)
  // =========================================================================
  {
    id: 'racecar_toy',
    name: 'Turbo Studio Toy Car',
    category: 'car_vehicle',
    emoji: '🏎️',
    defaultColor: '#ef4444',
    secondaryColor: '#facc15',
    voicePitch: 1.42,
    greeting:
      "Zoom-zoom, beep-beep! Hehe, hi bestie! I'm Turbo the little red Toy Car! Wanna go on a fun adventure?",
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
      "Neee-oww, teehee! I'm SkyLoop the baby Toy Plane! Look how my little propeller spins when you smile!",
    glbUrl: '/models/AerobaticPlane.glb',
    badgeText: 'Studio Flight GLB',
  },
  {
    id: 'police_cruiser_car',
    name: 'Chase Rescue Police Toy Car',
    category: 'car_vehicle',
    emoji: '🚓',
    defaultColor: '#2563eb',
    secondaryColor: '#ef4444',
    voicePitch: 1.43,
    greeting:
      "Wee-ooo, beep-beep! Chase is on the case! I'm your friendly Rescue Police Toy Car with roof lights!",
    glbUrl: '/models/ToyCar.glb',
    badgeText: '3D Police Cruiser GLB',
  },
  {
    id: 'fire_engine_truck',
    name: 'Blaze Hero Fire Rescue Truck',
    category: 'car_vehicle',
    emoji: '🚒',
    defaultColor: '#dc2626',
    secondaryColor: '#facc15',
    voicePitch: 1.4,
    greeting:
      "Ding-ding, hero time! I'm Blaze the Red Fire Rescue Truck! Let's help everyone in Fire Rescue Plaza!",
    glbUrl: '/models/CesiumMilkTruck.glb',
    badgeText: '3D Fire Truck GLB',
  },
  {
    id: 'sunshine_school_bus',
    name: 'Buster Yellow School Toy Bus',
    category: 'car_vehicle',
    emoji: '🚌',
    defaultColor: '#eab308',
    secondaryColor: '#fef08a',
    voicePitch: 1.42,
    greeting:
      "Beep-beep! The wheels on the bus go round and round! Hop aboard Buster the Yellow Toy Bus!",
    glbUrl: '/models/CesiumMilkTruck.glb',
    badgeText: '3D Yellow Bus GLB',
  },

  // =========================================================================
  // 9. 3D ROBOTS, DOLLS, FAIRIES & SUPERHEROES (6 3D TOYS)
  // =========================================================================
  {
    id: 'robot_buddy',
    name: 'Beeper Expressive Robot',
    category: 'robot_toy',
    emoji: '🤖',
    defaultColor: '#f59e0b',
    secondaryColor: '#38bdf8',
    voicePitch: 1.45,
    greeting:
      "Beep-boop, teehee! Hi bestie, I'm Beeper your cute little robot friend! Look, I'm waving my hand at you!",
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
      "Yay, hi best friend! I'm Astro! I love doing happy little robot dances with you!",
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
      "Hi bestie, hehe! I'm Maya! I love twirling, singing, and drawing cute pictures with you!",
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
      "Three, two, one, wheee! Hehe, hi bestie! I'm Cosmo the little space friend! Let's catch twinkling stars!",
    glbUrl: '/models/Astronaut.glb',
    badgeText: 'Studio Sculpt GLB',
  },
  {
    id: 'fairy_sparkle_doll',
    name: 'Twinkle Crowned Fairy Doll',
    category: 'robot_toy',
    emoji: '🧚‍♀️',
    defaultColor: '#f472b6',
    secondaryColor: '#fef08a',
    voicePitch: 1.54,
    greeting:
      "bibbidi-bobbidi-wheee! I'm Twinkle the Fairy Doll with a golden crown and 3D fairy wings!",
    badgeText: '3D Crown & Wings Doll',
  },
  {
    id: 'superhero_kid_doll',
    name: 'Captain Star Superhero Buddy',
    category: 'robot_toy',
    emoji: '🦸‍♀️',
    defaultColor: '#3b82f6',
    secondaryColor: '#ef4444',
    voicePitch: 1.47,
    greeting:
      "Super power pose! I'm Captain Star with a 3D red superhero cape! Together we can do anything!",
    badgeText: '3D Caped Hero Buddy',
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

        const idLow = archetype.toLowerCase();
        const isElephant = idLow.includes('elephant') || idLow.includes('mammoth');
        const isKittyOrCat =
          idLow.includes('kitty') ||
          idLow.includes('cat') ||
          idLow.includes('tiger') ||
          idLow.includes('cheetah') ||
          idLow.includes('leopard');
        const isLion = idLow.includes('lion') || idLow.includes('griffin');
        const isFloppyDog =
          idLow.includes('golden') ||
          idLow.includes('dalmatian') ||
          idLow.includes('pug') ||
          idLow.includes('poodle') ||
          idLow.includes('beagle') ||
          idLow.includes('dachshund') ||
          idLow.includes('bernese') ||
          idLow.includes('donkey');
        const isPerkyDog =
          idLow.includes('corgi') ||
          idLow.includes('husky') ||
          idLow.includes('frenchie') ||
          idLow.includes('shiba') ||
          idLow.includes('chihuahua') ||
          idLow.includes('collie') ||
          idLow.includes('samoyed') ||
          idLow.includes('heeler') ||
          idLow.includes('puppy');
        const isDogOrPuppy = isFloppyDog || isPerkyDog;
        const isBunny = idLow.includes('bunny') || idLow.includes('rabbit');
        const isLongNeck =
          idLow.includes('giraffe') ||
          idLow.includes('brachiosaurus') ||
          idLow.includes('alpaca') ||
          idLow.includes('camel');
        const isChubbyHippoRhino =
          idLow.includes('hippo') ||
          idLow.includes('rhino') ||
          idLow.includes('piglet') ||
          idLow.includes('cow') ||
          idLow.includes('calf');
        const isDinoOrDragon =
          idLow.includes('dino') ||
          idLow.includes('triceratops') ||
          idLow.includes('brachiosaurus') ||
          idLow.includes('stegosaurus') ||
          idLow.includes('pterodactyl') ||
          idLow.includes('dragon') ||
          idLow.includes('chameleon');
        const isMarineFin =
          idLow.includes('dolphin') ||
          idLow.includes('whale') ||
          idLow.includes('narwhal') ||
          idLow.includes('seal') ||
          idLow.includes('otter');
        const isOctopus = idLow.includes('octopus');
        const isTurtle = idLow.includes('turtle');
        const isBirdOrFrog =
          idLow.includes('penguin') ||
          idLow.includes('owl') ||
          idLow.includes('chick') ||
          idLow.includes('phoenix') ||
          idLow.includes('frog') ||
          idLow.includes('axolotl');
        const isBigSideEar =
          idLow.includes('monkey') ||
          idLow.includes('gorilla') ||
          idLow.includes('lemur') ||
          idLow.includes('koala') ||
          idLow.includes('mouse') ||
          idLow.includes('hamster') ||
          idLow.includes('sloth');
        const isBushyTail =
          idLow.includes('squirrel') ||
          idLow.includes('raccoon') ||
          idLow.includes('red_panda') ||
          idLow.includes('hedgehog') ||
          idLow.includes('kangaroo');
        const isEquineOrDeer =
          idLow.includes('zebra') ||
          idLow.includes('deer') ||
          idLow.includes('reindeer') ||
          idLow.includes('pegasus') ||
          idLow.includes('alicorn') ||
          idLow.includes('lamb') ||
          idLow.includes('goat');

        // 1. Species-Specific 3D Torso & Tummy Silhouette
        const torsoRx = isElephant || isChubbyHippoRhino
          ? 0.37
          : isKittyOrCat || isEquineOrDeer
          ? 0.25
          : isLongNeck
          ? 0.24
          : isBirdOrFrog || isOctopus
          ? 0.34
          : 0.3;
        const torsoRy = isLongNeck
          ? 0.31
          : isBirdOrFrog || isTurtle
          ? 0.38
          : isOctopus
          ? 0.28
          : 0.35;
        const torsoRz = isElephant || isChubbyHippoRhino
          ? 0.32
          : isTurtle
          ? 0.35
          : isKittyOrCat
          ? 0.22
          : 0.26;

        const dTorso = ellipsoidSDF(fx, fy, fz, 0, -0.1, 0, torsoRx, torsoRy, torsoRz);
        const dTummy = ellipsoidSDF(
          fx,
          fy,
          fz,
          0,
          -0.15,
          0.09,
          torsoRx * 0.78,
          torsoRy * 0.72,
          torsoRz * 0.82
        );
        let dBody = smin(dTorso, dTummy, 0.1);

        // Long sculpted neck for Giraffe, Brachiosaurus, Alpaca & Camel
        if (isLongNeck) {
          const dNeck = capsuleSDF(fx, fy, fz, 0, 0.12, 0.02, 0, 0.44, 0.06, 0.115);
          dBody = smin(dBody, dNeck, 0.08);
        }

        // 2. Species-Specific 3D Head, Cheeks & Muzzle/Snout Shape
        const headY = isLongNeck ? 0.52 : isOctopus ? 0.24 : 0.39;
        const headRx = isKittyOrCat
          ? 0.32
          : isOctopus
          ? 0.38
          : isLongNeck
          ? 0.22
          : isElephant
          ? 0.33
          : 0.29;
        const headRy = isKittyOrCat
          ? 0.24
          : isOctopus
          ? 0.36
          : isLongNeck
          ? 0.21
          : 0.27;
        const headRz = isDinoOrDragon ? 0.31 : isKittyOrCat ? 0.24 : 0.26;

        const dHead = ellipsoidSDF(fx, fy, fz, 0, headY, 0.02, headRx, headRy, headRz);
        const dCheeks = ellipsoidSDF(
          ax,
          fy,
          fz,
          isKittyOrCat ? 0.19 : 0.15,
          headY - 0.06,
          0.14,
          isKittyOrCat || isBigSideEar ? 0.15 : 0.12,
          0.11,
          0.12
        );

        let dSnout = 999.0;
        if (isDinoOrDragon) {
          // Bold boxy reptile/dragon jaw snout
          dSnout = ellipsoidSDF(fx, fy, fz, 0, headY - 0.05, 0.28, 0.17, 0.13, 0.24);
        } else if (isChubbyHippoRhino) {
          // Huge wide barrel snout for Hippo, Rhino, Piglet & Cow
          dSnout = ellipsoidSDF(fx, fy, fz, 0, headY - 0.06, 0.27, 0.23, 0.14, 0.21);
        } else if (isDogOrPuppy) {
          // Prominent sculpted canine muzzle for Baby Dogs & Puppies
          const mLen = idLow.includes('pug') || idLow.includes('frenchie') ? 0.15 : 0.23;
          dSnout = capsuleSDF(fx, fy, fz, 0, headY - 0.06, 0.14, 0, headY - 0.07, 0.14 + mLen, 0.125);
        } else if (isEquineOrDeer || isLongNeck) {
          // Tapering equine/deer/giraffe muzzle
          dSnout = capsuleSDF(fx, fy, fz, 0, headY - 0.04, 0.14, 0, headY - 0.07, 0.36, 0.11);
        } else if (isKittyOrCat) {
          // Dainty twin feline whisker pads
          dSnout = ellipsoidSDF(ax, fy, fz, 0.055, headY - 0.06, 0.22, 0.085, 0.075, 0.11);
        } else if (!isBirdOrFrog && !isOctopus && !isElephant) {
          dSnout = ellipsoidSDF(fx, fy, fz, 0, headY - 0.06, 0.23, 0.14, 0.11, 0.15);
        }

        let dHeadFull = smin(dHead, dCheeks, 0.075);
        if (dSnout < 10) {
          dHeadFull = smin(dHeadFull, dSnout, 0.065);
        }
        dBody = smin(dBody, dHeadFull, 0.095);

        // 3. Species-Specific Arms, Wings, or Marine Flippers
        let dPaw = 999.0;
        if (isMarineFin || idLow.includes('penguin') || isTurtle) {
          // Flat hydrodynamic side flippers!
          const dFlipper = ellipsoidSDF(ax, fy, fz, 0.44, 0.02, 0.05, 0.22, 0.065, 0.14);
          dBody = smin(dBody, dFlipper, 0.075);
        } else {
          const armR = isElephant || isChubbyHippoRhino ? 0.115 : isKittyOrCat ? 0.082 : 0.096;
          const dArm = capsuleSDF(ax, fy, fz, 0.23, 0.13, 0.01, 0.54, -0.06, 0.11, armR);
          dPaw = ellipsoidSDF(ax, fy, fz, 0.56, -0.07, 0.12, armR * 1.12, armR * 1.02, armR * 1.12);
          const dArmFull = smin(dArm, dPaw, 0.055);
          dBody = smin(dBody, dArmFull, 0.085);
        }

        // 4. Species-Specific Legs, Tentacles, or Marine Tail Fluke
        let dFoot = 999.0;
        if (isOctopus) {
          // 6 sculpted Octopus tentacles splaying around the base!
          const tFront = capsuleSDF(ax, fy, fz, 0.15, -0.28, 0.12, 0.34, -0.66, 0.32, 0.085);
          const tMid = capsuleSDF(ax, fy, fz, 0.22, -0.28, 0.0, 0.46, -0.66, 0.02, 0.085);
          const tBack = capsuleSDF(ax, fy, fz, 0.15, -0.28, -0.12, 0.34, -0.66, -0.28, 0.085);
          dFoot = Math.min(tFront, tMid, tBack);
          dBody = smin(dBody, dFoot, 0.075);
        } else if (isMarineFin) {
          // Tapering marine lower body + wide horizontal whale/dolphin tail flukes!
          const dTailCone = capsuleSDF(fx, fy, fz, 0, -0.25, 0.0, 0, -0.62, -0.22, 0.15);
          const dFlukes = ellipsoidSDF(ax, fy, fz, 0.2, -0.66, -0.28, 0.22, 0.055, 0.12);
          dFoot = smin(dTailCone, dFlukes, 0.07);
          dBody = smin(dBody, dFoot, 0.09);
        } else {
          const legR = isElephant || isChubbyHippoRhino ? 0.135 : isKittyOrCat ? 0.098 : 0.112;
          const dLeg = capsuleSDF(ax, fy, fz, 0.16, -0.34, 0.0, 0.19, -0.68, 0.03, legR);
          dFoot = ellipsoidSDF(ax, fy, fz, 0.2, -0.71, 0.1, legR * 1.12, 0.085, 0.155);
          const dLegFull = smin(dLeg, dFoot, 0.06);
          dBody = smin(dBody, dLegFull, 0.085);
        }

        // 5. Crisp Species-Specific Ears, Trunk, Mane, Crest & Tail
        let dEar = 999.0;
        let dTail = 999.0;
        let dCrest = 999.0;
        let dTrunk = 999.0;

        if (isElephant) {
          // Huge wide fan-shaped Baby Elephant ears + long S-curved 3D Trunk!
          dEar = ellipsoidSDF(ax, fy, fz, 0.45, 0.42, -0.03, 0.25, 0.29, 0.065);
          const t1 = capsuleSDF(fx, fy, fz, 0, 0.35, 0.2, 0, 0.08, 0.54, 0.082);
          const t2 = capsuleSDF(fx, fy, fz, 0, 0.08, 0.54, 0, 0.22, 0.66, 0.066);
          dTrunk = smin(t1, t2, 0.045);
          dTail = capsuleSDF(fx, fy, fz, 0, -0.28, -0.28, 0, -0.46, -0.46, 0.048);
        } else if (isBunny) {
          // Extra-long tall Bunny ears + round cotton tail
          dEar = capsuleSDF(ax, fy, fz, 0.13, 0.58, 0.0, 0.19, 0.96, -0.02, 0.078);
          dTail = ellipsoidSDF(fx, fy, fz, 0, -0.28, -0.29, 0.115, 0.115, 0.115);
        } else if (isKittyOrCat) {
          // Sharp pointed triangular Kitty/Cat ears + high S-curved feline tail
          const earBase = capsuleSDF(ax, fy, fz, 0.18, 0.54, 0.02, 0.31, 0.84, 0.02, 0.072);
          const earTip = ellipsoidSDF(ax, fy, fz, 0.33, 0.87, 0.02, 0.042, 0.055, 0.042);
          dEar = smin(earBase, earTip, 0.04);
          const ct1 = capsuleSDF(fx, fy, fz, 0, -0.26, -0.22, 0.12, -0.04, -0.48, 0.056);
          const ct2 = capsuleSDF(fx, fy, fz, 0.12, -0.04, -0.48, 0.22, 0.24, -0.45, 0.052);
          dTail = smin(ct1, ct2, 0.04);
        } else if (isFloppyDog) {
          // Long hanging floppy Baby Dog ears framing the cheeks + happy wagging puppy tail
          dEar = capsuleSDF(ax, fy, fz, 0.28, 0.5, 0.04, 0.37, 0.12, 0.09, 0.088);
          dTail = capsuleSDF(fx, fy, fz, 0, -0.24, -0.24, 0, 0.06, -0.54, 0.072);
        } else if (isPerkyDog) {
          // Tall perky Corgi / Husky / Frenchie puppy ears + curled fluffy puppy tail
          dEar = capsuleSDF(ax, fy, fz, 0.18, 0.56, 0.02, 0.28, 0.88, 0.03, 0.078);
          dTail = capsuleSDF(fx, fy, fz, 0, -0.24, -0.24, 0.09, 0.05, -0.52, 0.085);
        } else if (isLion) {
          dEar = ellipsoidSDF(ax, fy, fz, 0.27, 0.66, 0.02, 0.095, 0.095, 0.065);
          // Thick 3D Lion Mane collar framing the entire head
          dCrest = ellipsoidSDF(fx, fy, fz, 0, 0.4, -0.04, 0.44, 0.41, 0.26);
          dTail = capsuleSDF(fx, fy, fz, 0, -0.28, -0.24, 0.16, -0.06, -0.52, 0.06);
        } else if (isDinoOrDragon) {
          // Thick sweeping dinosaur/dragon tail + dorsal ridge plates
          dTail = capsuleSDF(fx, fy, fz, 0, -0.24, -0.2, 0, -0.34, -0.64, 0.13);
          const c1 = ellipsoidSDF(fx, fy, fz, 0, headY + 0.28, -0.05, 0.055, 0.095, 0.095);
          const c2 = ellipsoidSDF(fx, fy, fz, 0, 0.48, -0.24, 0.055, 0.095, 0.095);
          const c3 = ellipsoidSDF(fx, fy, fz, 0, 0.18, -0.3, 0.055, 0.095, 0.095);
          const c4 = ellipsoidSDF(fx, fy, fz, 0, -0.1, -0.31, 0.055, 0.09, 0.09);
          dCrest = Math.min(c1, c2, c3, c4);
        } else if (isBigSideEar) {
          // Huge round Monkey / Koala / Lemur / Mouse side ears
          dEar = ellipsoidSDF(ax, fy, fz, 0.36, 0.46, 0.02, 0.165, 0.165, 0.07);
          if (!idLow.includes('koala') && !idLow.includes('sloth') && !idLow.includes('hamster')) {
            dTail = capsuleSDF(fx, fy, fz, 0, -0.28, -0.24, 0.22, 0.08, -0.54, 0.056);
          }
        } else if (isBushyTail) {
          dEar = capsuleSDF(ax, fy, fz, 0.18, 0.56, 0.01, 0.25, 0.78, 0.01, 0.07);
          // Giant upright Squirrel / Red Panda / Raccoon plume tail
          dTail = ellipsoidSDF(fx, fy, fz, 0, -0.04, -0.4, 0.18, 0.32, 0.18);
        } else if (isChubbyHippoRhino || isEquineOrDeer || isLongNeck) {
          // Outward-flicked farm & safari ears
          dEar = capsuleSDF(ax, fy, fz, 0.21, headY + 0.17, 0.0, 0.37, headY + 0.15, -0.02, 0.068);
          dTail = capsuleSDF(fx, fy, fz, 0, -0.28, -0.25, 0, -0.4, -0.46, 0.058);
        } else if (!isBirdOrFrog && !isOctopus && !isMarineFin && !isTurtle) {
          // Classic round Teddy Bear / Panda / Polar Bear ears + pom tail
          dEar = ellipsoidSDF(ax, fy, fz, 0.25, 0.63, 0.01, 0.12, 0.12, 0.07);
          dTail = ellipsoidSDF(fx, fy, fz, 0, -0.28, -0.28, 0.095, 0.095, 0.095);
        }

        if (dEar < 10) dBody = smin(dBody, dEar, 0.05);
        if (dTrunk < 10) dBody = smin(dBody, dTrunk, 0.05);
        if (dTail < 10) dBody = smin(dBody, dTail, 0.065);
        if (dCrest < 10) dBody = smin(dBody, dCrest, 0.05);

        const q = yOff + x;
        field[q] = -dBody * 100.0;

        // 6. Species-Specific 3D Vertex Color Markings (Stripes, Spots, Patches, Masks & Tuxedos!)
        if (dBody < 0.12) {
          let r = colPrimary.r;
          let g = colPrimary.g;
          let b = colPrimary.b;

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

          // A. Bold 3D Stripes for Tiger, Ginger Tabby, Zebra, Raccoon, Red Panda & Lemur
          const isStriped =
            idLow.includes('tiger') ||
            idLow.includes('tabby') ||
            idLow.includes('zebra') ||
            idLow.includes('raccoon') ||
            idLow.includes('red_panda') ||
            idLow.includes('lemur');
          if (isStriped && bellyMask < 0.35) {
            const wave = Math.sin(fy * 26.0 + fz * 14.0);
            if (wave > 0.42) {
              const sw = Math.min(1, (wave - 0.42) * 3.0) * 0.85;
              const stripeR = idLow.includes('tabby') ? 0.62 : 0.11;
              const stripeG = idLow.includes('tabby') ? 0.24 : 0.11;
              const stripeB = idLow.includes('tabby') ? 0.05 : 0.14;
              r = r * (1 - sw) + stripeR * sw;
              g = g * (1 - sw) + stripeG * sw;
              b = b * (1 - sw) + stripeB * sw;
            }
          }

          // B. Bold 3D Spots/Patches for Dalmatian, Giraffe, Cheetah, Snow Leopard, Calico Cat, Cow & Deer
          const isSpotted =
            idLow.includes('dalmatian') ||
            idLow.includes('giraffe') ||
            idLow.includes('cheetah') ||
            idLow.includes('leopard') ||
            idLow.includes('calico') ||
            idLow.includes('cow') ||
            idLow.includes('calf') ||
            idLow.includes('deer') ||
            idLow.includes('monster') ||
            idLow.includes('frog');
          if (isSpotted && bellyMask < 0.4 && dSnout > 0.03) {
            const freq = idLow.includes('cow') || idLow.includes('calico') ? 9.5 : 15.5;
            const sp = Math.sin(fx * freq) * Math.sin(fy * freq) * Math.sin(fz * freq);
            if (sp > 0.26) {
              const pw = Math.min(1, (sp - 0.26) * 4.0) * 0.88;
              let spotR = colSecondary.r;
              let spotG = colSecondary.g;
              let spotB = colSecondary.b;
              if (idLow.includes('dalmatian') || idLow.includes('cheetah') || idLow.includes('leopard')) {
                spotR = 0.09;
                spotG = 0.09;
                spotB = 0.12;
              } else if (idLow.includes('calico') && fx < 0) {
                spotR = 0.15;
                spotG = 0.15;
                spotB = 0.18;
              }
              r = r * (1 - pw) + spotR * pw;
              g = g * (1 - pw) + spotG * pw;
              b = b * (1 - pw) + spotB * pw;
            }
          }

          // C. Giant Panda & Penguin & Tuxedo/Siamese Cat & Pug/Husky/Raccoon Distinct Face/Limb Masks
          if (idLow.includes('panda') && !idLow.includes('red_panda')) {
            // Black Panda ears, arms, legs & shoulder band on snowy white body
            if (dEar < 0.05 || ax > 0.24 || fy < -0.32 || (fy > 0.0 && fy < 0.16 && fz < 0.18)) {
              r = 0.08;
              g = 0.09;
              b = 0.12;
            }
          } else if (
            idLow.includes('siamese') ||
            idLow.includes('pug') ||
            idLow.includes('raccoon') ||
            idLow.includes('sloth')
          ) {
            // Dark facial mask & ear tips
            if ((fy > 0.26 && fy < 0.48 && fz > 0.16) || dEar < 0.04) {
              r = r * 0.3 + colSecondary.r * 0.7;
              g = g * 0.3 + colSecondary.g * 0.7;
              b = b * 0.3 + colSecondary.b * 0.7;
            }
          }

          // Rosy Plush Cheek Blush
          const dCheekCenter = Math.sqrt(
            (ax - 0.18) * (ax - 0.18) + (fy - (headY - 0.05)) * (fy - (headY - 0.05)) + (fz - 0.22) * (fz - 0.22)
          );
          if (dCheekCenter < 0.095) {
            const cw = (1 - dCheekCenter / 0.095) * 0.55;
            r = r * (1 - cw) + colCheek.r * cw;
            g = g * (1 - cw) + colCheek.g * cw;
            b = b * (1 - cw) + colCheek.b * cw;
          }

          // Soft Paw & Foot Pads
          if ((dPaw < 0.03 || dFoot < 0.03) && fz > 0.1) {
            r = r * 0.35 + colPaw.r * 0.65;
            g = g * 0.35 + colPaw.g * 0.65;
            b = b * 0.35 + colPaw.b * 0.65;
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
  // 3 gentle passes of Taubin surface relaxation so sculpted ears, trunks, and tails stay crisp
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
  const taubinFactors = [0.38, -0.4, 0.28];
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
  chestBone: THREE.Bone,
  archetype: ToyArchetypeId,
  primaryHex = '#f59e0b',
  secondaryHex = '#fef08a'
): THREE.Object3D[] {
  const idLow = archetype.toLowerCase();

  // NOTE ON SCALE: MarchingCubes vertices are multiplied by scaleFactor = 1.42!
  // Relative to headBone (at y=0.44, z=0.02):
  //   - Front face surface is z = +0.36 to +0.42
  //   - Snout tip is z = +0.52 to +0.64
  //   - Top of head is y = +0.50 to +0.56
  //   - Sides of head are x = ±0.42 to ±0.46
  // Relative to chestBone (at y=0.22, z=0):
  //   - Neck collar ring is y = +0.18, radius = 0.36
  //   - Front belly surface is z = +0.38 to +0.44
  //   - Back spine surface is z = -0.36 to -0.40

  const isBeaked =
    idLow.includes('penguin') ||
    idLow.includes('owl') ||
    idLow.includes('chick') ||
    idLow.includes('phoenix') ||
    idLow.includes('griffin');
  const isKittyOrCat =
    idLow.includes('kitty') ||
    idLow.includes('cat') ||
    idLow.includes('tiger') ||
    idLow.includes('lion') ||
    idLow.includes('cheetah') ||
    idLow.includes('leopard');
  const isDogOrPuppy =
    idLow.includes('dog') ||
    idLow.includes('puppy') ||
    idLow.includes('corgi') ||
    idLow.includes('pug') ||
    idLow.includes('poodle') ||
    idLow.includes('husky') ||
    idLow.includes('beagle') ||
    idLow.includes('frenchie') ||
    idLow.includes('shiba') ||
    idLow.includes('dachshund') ||
    idLow.includes('chihuahua') ||
    idLow.includes('collie') ||
    idLow.includes('bernese') ||
    idLow.includes('samoyed') ||
    idLow.includes('heeler');
  const isFloppyDog =
    idLow.includes('golden') ||
    idLow.includes('dalmatian') ||
    idLow.includes('pug') ||
    idLow.includes('poodle') ||
    idLow.includes('beagle') ||
    idLow.includes('dachshund') ||
    idLow.includes('bernese');
  const isElephant = idLow.includes('elephant') || idLow.includes('mammoth');
  const isPiglet = idLow.includes('piglet');
  const isRudolph = idLow.includes('reindeer') || idLow.includes('rudolph');
  const isFrog = idLow.includes('frog');
  const isOwl = idLow.includes('owl');
  const isPenguin = idLow.includes('penguin');
  const isMonster = idLow.includes('monster');

  // Eye patches for Giant Panda, Raccoon, Bandit & Owl facial discs
  if (idLow.includes('panda') && !idLow.includes('red_panda')) {
    const patchGeo = new THREE.SphereGeometry(0.135, 18, 18);
    patchGeo.scale(1.15, 1.3, 0.45);
    const patchMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.65 });
    [-0.19, 0.19].forEach((px) => {
      const patch = new THREE.Mesh(patchGeo, patchMat);
      patch.position.set(px, 0.16, 0.35);
      patch.rotation.z = px < 0 ? 0.28 : -0.28;
      headBone.add(patch);
    });
  } else if (isOwl) {
    const discGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.04, 24);
    const discMat = new THREE.MeshStandardMaterial({ color: secondaryHex, roughness: 0.5 });
    [-0.18, 0.18].forEach((ox) => {
      const disc = new THREE.Mesh(discGeo, discMat);
      disc.rotation.x = Math.PI * 0.5;
      disc.position.set(ox, 0.17, 0.36);
      headBone.add(disc);
    });
  } else if (idLow.includes('raccoon')) {
    const maskGeo = new THREE.BoxGeometry(0.62, 0.18, 0.14);
    const maskMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.6 });
    const mask = new THREE.Mesh(maskGeo, maskMat);
    mask.position.set(0, 0.16, 0.33);
    headBone.add(mask);
  }

  // Glossy 3D Eyes (Frog has giant top-mounted amphibious eye domes; Monster has 3 eyes!)
  const eyeScale = isOwl ? 1.32 : isFrog ? 1.25 : 1.0;
  const eyeWhiteGeo = new THREE.SphereGeometry(0.095 * eyeScale, 24, 24);
  eyeWhiteGeo.scale(1, 1.12, 0.68);
  const eyeWhiteMat = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.1,
    clearcoat: 1.0,
  });

  const pupilGeo = new THREE.SphereGeometry(0.068 * eyeScale, 24, 24);
  pupilGeo.scale(isKittyOrCat ? 0.72 : 1, 1.15, 0.75);
  const pupilMat = new THREE.MeshPhysicalMaterial({
    color: idLow.includes('husky') || idLow.includes('siamese') ? '#0284c7' : '#0f172a',
    roughness: 0.05,
    clearcoat: 1.0,
  });

  const sparkGeo = new THREE.SphereGeometry(0.025 * eyeScale, 16, 16);
  const sparkMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });

  const eyeGroups: THREE.Object3D[] = [];
  const eyePositions: [number, number, number][] = isFrog
    ? [
        [-0.22, 0.46, 0.24],
        [0.22, 0.46, 0.24],
      ]
    : isMonster
    ? [
        [-0.21, 0.17, 0.38],
        [0, 0.31, 0.39],
        [0.21, 0.17, 0.38],
      ]
    : [
        [-0.19, 0.17, 0.39],
        [0.19, 0.17, 0.39],
      ];

  if (isFrog) {
    const domeGeo = new THREE.SphereGeometry(0.15, 20, 20);
    const domeMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.45 });
    [-0.22, 0.22].forEach((fx) => {
      const dome = new THREE.Mesh(domeGeo, domeMat);
      dome.position.set(fx, 0.44, 0.18);
      headBone.add(dome);
    });
  }

  eyePositions.forEach(([ex, ey, ez]) => {
    const eyeGrp = new THREE.Group();
    eyeGrp.position.set(ex, ey, ez);

    const ew = new THREE.Mesh(eyeWhiteGeo, eyeWhiteMat);
    const pupil = new THREE.Mesh(pupilGeo, pupilMat);
    pupil.position.set(0, 0, 0.038 * eyeScale);

    const spark = new THREE.Mesh(sparkGeo, sparkMat);
    spark.position.set(0.024 * eyeScale, 0.032 * eyeScale, 0.085 * eyeScale);

    eyeGrp.add(ew, pupil, spark);
    headBone.add(eyeGrp);
    eyeGroups.push(eyeGrp);
  });

  // ==========================================================================
  // 1. DISTINCT EXTERIOR 3D EARS, SNOUTS, TRUNKS, TUSKS & NOSES BY SPECIES
  // ==========================================================================
  if (isElephant) {
    // Giant Unmistakable Exterior 3D Fan Ears + Articulated Multi-Ring 3D Elephant Trunk + Ivory Tusks!
    const outerEarGeo = new THREE.SphereGeometry(0.38, 24, 24);
    outerEarGeo.scale(0.95, 1.25, 0.22);
    const outerEarMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.55 });

    const innerEarGeo = new THREE.SphereGeometry(0.29, 20, 20);
    innerEarGeo.scale(0.9, 1.18, 0.18);
    const innerEarMat = new THREE.MeshStandardMaterial({ color: secondaryHex, roughness: 0.5 });

    [-1, 1].forEach((side) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(side * 0.54, 0.18, -0.02);
      earGroup.rotation.y = side * -0.28;
      earGroup.rotation.z = side * -0.12;
      const outer = new THREE.Mesh(outerEarGeo, outerEarMat);
      const inner = new THREE.Mesh(innerEarGeo, innerEarMat);
      inner.position.set(0, -0.02, 0.045);
      earGroup.add(outer, inner);
      headBone.add(earGroup);
    });

    // 5-Segment Curved 3D Elephant Trunk extending clearly in front of the face!
    const trunkMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.5 });
    const trunkSegments: [number, number, number, number][] = [
      [0, 0.06, 0.44, 0.135],
      [0, -0.06, 0.58, 0.118],
      [0, -0.16, 0.7, 0.102],
      [0, -0.14, 0.82, 0.09],
      [0, -0.02, 0.9, 0.082],
    ];
    trunkSegments.forEach(([tx, ty, tz, tr]) => {
      const seg = new THREE.Mesh(new THREE.SphereGeometry(tr, 20, 20), trunkMat);
      seg.scale.set(1.0, 0.95, 1.25);
      seg.position.set(tx, ty, tz);
      headBone.add(seg);
    });
    // Pink nostrils at tip of trunk
    const tipDisk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.065, 0.065, 0.03, 18),
      new THREE.MeshStandardMaterial({ color: '#fda4af', roughness: 0.4 })
    );
    tipDisk.position.set(0, 0.03, 0.94);
    tipDisk.rotation.x = Math.PI * 0.25;
    headBone.add(tipDisk);

    // 2 Prominent Curved Ivory Tusks!
    const tuskLen = idLow.includes('mammoth') ? 0.38 : 0.24;
    const tuskGeo = new THREE.ConeGeometry(0.048, tuskLen, 18);
    const tuskMat = new THREE.MeshPhysicalMaterial({
      color: '#fffbeb',
      roughness: 0.18,
      clearcoat: 0.9,
    });
    [-0.17, 0.17].forEach((tx) => {
      const tusk = new THREE.Mesh(tuskGeo, tuskMat);
      tusk.position.set(tx, -0.04, 0.54);
      tusk.rotation.x = Math.PI * 0.36;
      tusk.rotation.z = tx < 0 ? 0.24 : -0.24;
      headBone.add(tusk);
    });
  } else if (isKittyOrCat && !idLow.includes('lion')) {
    // Sharp Tall 3D Triangular Kitty/Cat Ears + Pink Inner Triangles + Plump Whisker Pads + Pink Triangle Nose!
    const catEarOuterGeo = new THREE.ConeGeometry(0.18, 0.38, 4);
    const catEarOuterMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.5 });
    const catEarInnerGeo = new THREE.ConeGeometry(0.11, 0.26, 4);
    const catEarInnerMat = new THREE.MeshStandardMaterial({ color: '#fda4af', roughness: 0.4 });

    [-1, 1].forEach((side) => {
      const earGrp = new THREE.Group();
      earGrp.position.set(side * 0.28, 0.54, 0.04);
      earGrp.rotation.z = side * -0.32;
      earGrp.rotation.y = side * 0.25 + Math.PI * 0.25;
      const outer = new THREE.Mesh(catEarOuterGeo, catEarOuterMat);
      const inner = new THREE.Mesh(catEarInnerGeo, catEarInnerMat);
      inner.position.set(0.02, -0.02, 0.035);
      earGrp.add(outer, inner);
      headBone.add(earGrp);
    });

    // Twin Plump White/Cream Cat Whisker Muzzle Puffs (ω shape)
    const padGeo = new THREE.SphereGeometry(0.11, 18, 18);
    padGeo.scale(1.15, 0.88, 0.95);
    const padMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.45 });
    [-0.085, 0.085].forEach((px) => {
      const pad = new THREE.Mesh(padGeo, padMat);
      pad.position.set(px, 0.01, 0.46);
      headBone.add(pad);
    });

    // Cute Pink 3D Triangle Kitty Nose
    const catNoseGeo = new THREE.ConeGeometry(0.068, 0.075, 3);
    const catNoseMat = new THREE.MeshPhysicalMaterial({
      color: '#f43f5e',
      roughness: 0.25,
      clearcoat: 0.8,
    });
    const catNose = new THREE.Mesh(catNoseGeo, catNoseMat);
    catNose.rotation.z = Math.PI;
    catNose.rotation.x = Math.PI * 0.15;
    catNose.position.set(0, 0.07, 0.55);
    headBone.add(catNose);
  } else if (isDogOrPuppy) {
    // Distinct 3D Canine Muzzle Box + Big Glossy Black Dog Nose + Long Floppy OR Perky Puppy Ears!
    const muzzleLen = idLow.includes('pug') || idLow.includes('frenchie') ? 0.16 : 0.26;
    const muzzleGeo = new THREE.SphereGeometry(0.18, 22, 22);
    muzzleGeo.scale(1.15, 0.85, muzzleLen / 0.16);
    const muzzleColor =
      idLow.includes('pug') || idLow.includes('german') ? '#1e293b' : secondaryHex;
    const muzzleMat = new THREE.MeshStandardMaterial({ color: muzzleColor, roughness: 0.5 });
    const muzzle = new THREE.Mesh(muzzleGeo, muzzleMat);
    muzzle.position.set(0, 0.02, 0.44);
    headBone.add(muzzle);

    // Big Glossy Black 3D Dog Nose at the front tip of the muzzle!
    const dogNoseGeo = new THREE.SphereGeometry(0.085, 22, 22);
    dogNoseGeo.scale(1.3, 0.95, 0.9);
    const dogNoseMat = new THREE.MeshPhysicalMaterial({
      color: '#0f172a',
      roughness: 0.12,
      clearcoat: 1.0,
    });
    const dogNose = new THREE.Mesh(dogNoseGeo, dogNoseMat);
    dogNose.position.set(0, 0.08, 0.46 + muzzleLen * 0.65);
    headBone.add(dogNose);

    // Breed-Specific Exterior 3D Dog Ears!
    const earColor =
      idLow.includes('dalmatian') || idLow.includes('beagle') || idLow.includes('bernese')
        ? '#1e293b'
        : primaryHex;
    const dogEarMat = new THREE.MeshStandardMaterial({ color: earColor, roughness: 0.55 });

    if (isFloppyDog) {
      // Long Droopy Floppy Puppy Ears hanging down the sides of the head
      const flopGeo = new THREE.CapsuleGeometry(0.11, 0.34, 12, 18);
      flopGeo.scale(0.65, 1.0, 1.15);
      [-1, 1].forEach((side) => {
        const ear = new THREE.Mesh(flopGeo, dogEarMat);
        ear.position.set(side * 0.42, 0.12, 0.08);
        ear.rotation.z = side * 0.18;
        ear.rotation.x = 0.15;
        headBone.add(ear);
      });
    } else {
      // Tall Perky Corgi / Husky / Frenchie / Shiba / Puppy Ears!
      const perkGeo = new THREE.ConeGeometry(0.16, 0.4, 16);
      perkGeo.scale(1.0, 1.0, 0.55);
      const innerPerkGeo = new THREE.ConeGeometry(0.1, 0.28, 14);
      innerPerkGeo.scale(1.0, 1.0, 0.4);
      const innerPerkMat = new THREE.MeshStandardMaterial({ color: '#fda4af', roughness: 0.45 });
      [-1, 1].forEach((side) => {
        const earGrp = new THREE.Group();
        earGrp.position.set(side * 0.27, 0.56, 0.04);
        earGrp.rotation.z = side * -0.25;
        const outer = new THREE.Mesh(perkGeo, dogEarMat);
        const inner = new THREE.Mesh(innerPerkGeo, innerPerkMat);
        inner.position.set(0, -0.02, 0.045);
        earGrp.add(outer, inner);
        headBone.add(earGrp);
      });
    }

    // Poodle Fluffy 3D Pom-Pom Crown & Ear Puffs!
    if (idLow.includes('poodle')) {
      const pomMat = new THREE.MeshStandardMaterial({ color: secondaryHex, roughness: 0.65 });
      const topPom = new THREE.Mesh(new THREE.SphereGeometry(0.22, 18, 18), pomMat);
      topPom.position.set(0, 0.54, 0.05);
      headBone.add(topPom);
    }
  } else if (isBeaked) {
    // Large Bright Orange/Gold 3D Bird Beak
    const beakGeo = new THREE.ConeGeometry(0.12, 0.28, 22);
    const beakMat = new THREE.MeshPhysicalMaterial({
      color: '#f59e0b',
      roughness: 0.2,
      clearcoat: 0.85,
    });
    const beak = new THREE.Mesh(beakGeo, beakMat);
    beak.rotation.x = Math.PI * 0.5;
    beak.position.set(0, 0.08, 0.54);
    headBone.add(beak);
  } else if (isPiglet) {
    // Iconic Flat Pink 3D Piglet Snout Disk + Twin Nostrils
    const snoutDiskGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.1, 24);
    const snoutDiskMat = new THREE.MeshStandardMaterial({ color: '#fb7185', roughness: 0.35 });
    const snoutDisk = new THREE.Mesh(snoutDiskGeo, snoutDiskMat);
    snoutDisk.rotation.x = Math.PI * 0.5;
    snoutDisk.position.set(0, 0.06, 0.54);
    headBone.add(snoutDisk);
    const nostrilGeo = new THREE.SphereGeometry(0.032, 12, 12);
    const nostrilMat = new THREE.MeshBasicMaterial({ color: '#881337' });
    [-0.055, 0.055].forEach((nx) => {
      const n = new THREE.Mesh(nostrilGeo, nostrilMat);
      n.position.set(nx, 0.06, 0.59);
      headBone.add(n);
    });
  } else {
    // Classic Velvet Plush Nose on exterior snout surface
    const noseGeo = new THREE.SphereGeometry(isRudolph ? 0.1 : 0.082, 24, 24);
    noseGeo.scale(1.3, 0.9, 0.9);
    const noseColor = isRudolph
      ? '#ef4444'
      : idLow.includes('bunny') || idLow.includes('mouse') || idLow.includes('hamster')
      ? '#f43f5e'
      : '#291509';
    const noseMat = new THREE.MeshPhysicalMaterial({
      color: noseColor,
      emissive: isRudolph ? new THREE.Color('#dc2626') : new THREE.Color('#000000'),
      emissiveIntensity: isRudolph ? 0.55 : 0,
      roughness: 0.25,
      sheen: 0.8,
    });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, 0.08, idLow.includes('dino') || idLow.includes('dragon') ? 0.64 : 0.56);
    headBone.add(nose);
  }

  // ==========================================================================
  // 2. LONG EXTERIOR 3D WHISKERS (Kitties, Cats, Big Cats, Bunnies, Mice, Seals)
  // ==========================================================================
  if (
    isKittyOrCat ||
    idLow.includes('bunny') ||
    idLow.includes('mouse') ||
    idLow.includes('hamster') ||
    idLow.includes('seal') ||
    idLow.includes('otter')
  ) {
    const whiskerGeo = new THREE.CylinderGeometry(0.008, 0.005, 0.34, 8);
    const whiskerMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.2 });
    [-1, 1].forEach((side) => {
      [-0.16, 0, 0.16].forEach((angleOffset, idx) => {
        const w = new THREE.Mesh(whiskerGeo, whiskerMat);
        w.position.set(side * 0.42, 0.02 + (idx - 1) * 0.04, 0.44);
        w.rotation.z = side * (Math.PI * 0.5 + angleOffset);
        w.rotation.y = side * -0.18;
        headBone.add(w);
      });
    });
  }

  // ==========================================================================
  // 3. LION MANE RING, GIRAFFE OSSICONES, DEER ANTLERS, DINO FRILLS & HORNS
  // ==========================================================================
  if (idLow.includes('lion') || idLow.includes('griffin')) {
    // 14-Petal Fluffy 3D Lion Mane Ring framing the entire head!
    const manePetalGeo = new THREE.SphereGeometry(0.17, 16, 16);
    const maneMat = new THREE.MeshStandardMaterial({ color: secondaryHex, roughness: 0.65 });
    for (let m = 0; m < 14; m++) {
      const ang = (m / 14) * Math.PI * 2;
      const petal = new THREE.Mesh(manePetalGeo, maneMat);
      petal.position.set(Math.cos(ang) * 0.46, 0.18 + Math.sin(ang) * 0.44, -0.02);
      headBone.add(petal);
    }
  }

  if (
    idLow.includes('unicorn') ||
    idLow.includes('alicorn') ||
    idLow.includes('narwhal')
  ) {
    const hornGeo = new THREE.ConeGeometry(0.085, 0.48, 24);
    const hornMat = new THREE.MeshPhysicalMaterial({
      color: '#facc15',
      roughness: 0.12,
      metalness: 0.65,
      clearcoat: 1.0,
    });
    const horn = new THREE.Mesh(hornGeo, hornMat);
    horn.position.set(0, 0.62, 0.28);
    horn.rotation.x = 0.42;
    headBone.add(horn);
  } else if (idLow.includes('giraffe')) {
    const stalkGeo = new THREE.CylinderGeometry(0.036, 0.042, 0.28, 14);
    const stalkMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.45 });
    const tipGeo = new THREE.SphereGeometry(0.068, 16, 16);
    const tipMat = new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.55 });
    [-0.15, 0.15].forEach((gx) => {
      const stalk = new THREE.Mesh(stalkGeo, stalkMat);
      stalk.position.set(gx, 0.62, 0.04);
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.set(gx, 0.77, 0.04);
      headBone.add(stalk, tip);
    });
  } else if (idLow.includes('deer') || idLow.includes('reindeer')) {
    const antlerMat = new THREE.MeshStandardMaterial({ color: '#fde68a', roughness: 0.4 });
    const mainBranchGeo = new THREE.CylinderGeometry(0.028, 0.038, 0.38, 12);
    const subBranchGeo = new THREE.CylinderGeometry(0.02, 0.028, 0.2, 10);
    [-1, 1].forEach((side) => {
      const b1 = new THREE.Mesh(mainBranchGeo, antlerMat);
      b1.position.set(side * 0.22, 0.64, 0.02);
      b1.rotation.z = side * -0.35;
      const b2 = new THREE.Mesh(subBranchGeo, antlerMat);
      b2.position.set(side * 0.32, 0.7, 0.05);
      b2.rotation.z = side * -0.85;
      const b3 = new THREE.Mesh(subBranchGeo, antlerMat);
      b3.position.set(side * 0.18, 0.76, 0.05);
      b3.rotation.z = side * 0.35;
      headBone.add(b1, b2, b3);
    });
  } else if (idLow.includes('triceratops') || idLow.includes('rhino')) {
    const hornMat = new THREE.MeshStandardMaterial({ color: '#fef3c7', roughness: 0.25 });
    const noseHornGeo = new THREE.ConeGeometry(0.065, 0.24, 18);
    const noseHorn = new THREE.Mesh(noseHornGeo, hornMat);
    noseHorn.position.set(0, 0.2, 0.58);
    noseHorn.rotation.x = 0.55;
    headBone.add(noseHorn);
    if (idLow.includes('triceratops')) {
      // Wide Sculpted Triceratops Crown Shield Frill + 2 Long Brow Horns!
      const frillGeo = new THREE.CylinderGeometry(0.52, 0.42, 0.08, 24);
      const frillMat = new THREE.MeshStandardMaterial({ color: secondaryHex, roughness: 0.45 });
      const frill = new THREE.Mesh(frillGeo, frillMat);
      frill.rotation.x = Math.PI * 0.38;
      frill.position.set(0, 0.38, -0.14);
      headBone.add(frill);

      const browHornGeo = new THREE.ConeGeometry(0.052, 0.32, 16);
      [-0.18, 0.18].forEach((bx) => {
        const bh = new THREE.Mesh(browHornGeo, hornMat);
        bh.position.set(bx, 0.44, 0.34);
        bh.rotation.x = 0.48;
        bh.rotation.z = bx < 0 ? 0.22 : -0.22;
        headBone.add(bh);
      });
    }
  } else if (
    idLow.includes('cow') ||
    idLow.includes('calf') ||
    idLow.includes('goat') ||
    idLow.includes('dragon') ||
    isMonster
  ) {
    const budGeo = new THREE.ConeGeometry(0.06, 0.24, 16);
    const budMat = new THREE.MeshStandardMaterial({ color: '#fef08a', roughness: 0.3 });
    [-0.22, 0.22].forEach((bx) => {
      const bud = new THREE.Mesh(budGeo, budMat);
      bud.position.set(bx, 0.58, 0.06);
      bud.rotation.z = bx < 0 ? 0.38 : -0.38;
      headBone.add(bud);
    });
  }

  // 6. 3D Axolotl External Feathery Gill Frills (on exterior head sides x = ±0.46)
  if (idLow.includes('axolotl')) {
    const frillGeo = new THREE.CapsuleGeometry(0.038, 0.22, 8, 12);
    const frillMat = new THREE.MeshStandardMaterial({ color: '#e11d48', roughness: 0.35 });
    [-1, 1].forEach((side) => {
      [-0.28, 0.04, 0.36].forEach((ang, idx) => {
        const frill = new THREE.Mesh(frillGeo, frillMat);
        frill.position.set(side * 0.46, 0.16 + idx * 0.12, 0.04);
        frill.rotation.z = side * (Math.PI * 0.38 + ang * 0.45);
        headBone.add(frill);
      });
    });
  }

  // 7. 3D Golden Crown & Superhero Eye Mask
  if (idLow.includes('fairy') || idLow.includes('alicorn')) {
    const crownGeo = new THREE.CylinderGeometry(0.16, 0.12, 0.14, 18);
    const crownMat = new THREE.MeshStandardMaterial({
      color: '#facc15',
      metalness: 0.75,
      roughness: 0.18,
    });
    const crown = new THREE.Mesh(crownGeo, crownMat);
    crown.position.set(0, 0.58, 0.06);
    headBone.add(crown);
  } else if (idLow.includes('superhero')) {
    const maskGeo = new THREE.BoxGeometry(0.64, 0.18, 0.14);
    const maskMat = new THREE.MeshStandardMaterial({ color: '#1d4ed8', roughness: 0.3 });
    const mask = new THREE.Mesh(maskGeo, maskMat);
    mask.position.set(0, 0.17, 0.36);
    headBone.add(mask);
  }

  // ==========================================================================
  // 4. EXTERIOR CHEST/BACK/BELLY ANATOMY (Collars, Bells, Bowties, Wings,
  //    Turtle Shells, Dorsal Fins, Kangaroo Pouch + Joey, Hedgehog Quills, Capes)
  // ==========================================================================
  if (isDogOrPuppy || isKittyOrCat || idLow.includes('cow') || idLow.includes('calf')) {
    // Exterior Neck Collar (radius 0.36 wraps outside the 1.42x neck!)
    const collarGeo = new THREE.TorusGeometry(0.35, 0.036, 16, 36);
    const collarMat = new THREE.MeshStandardMaterial({
      color: isKittyOrCat ? '#ec4899' : '#ef4444',
      roughness: 0.3,
    });
    const collar = new THREE.Mesh(collarGeo, collarMat);
    collar.rotation.x = Math.PI * 0.52;
    collar.position.set(0, 0.18, 0.04);
    chestBone.add(collar);

    if (idLow.includes('tuxedo')) {
      // Cute Red 3D Bowtie on Tuxedo Kitty!
      const bowCone = new THREE.ConeGeometry(0.065, 0.12, 14);
      const bowMat = new THREE.MeshStandardMaterial({ color: '#e11d48', roughness: 0.3 });
      [-1, 1].forEach((s) => {
        const b = new THREE.Mesh(bowCone, bowMat);
        b.position.set(s * 0.06, 0.15, 0.39);
        b.rotation.z = s * Math.PI * 0.5;
        chestBone.add(b);
      });
    } else {
      const bellGeo = new THREE.SphereGeometry(0.065, 18, 18);
      const bellMat = new THREE.MeshStandardMaterial({
        color: '#facc15',
        metalness: 0.8,
        roughness: 0.15,
      });
      const bell = new THREE.Mesh(bellGeo, bellMat);
      bell.position.set(0, 0.13, 0.39);
      chestBone.add(bell);
    }
  } else if (isPenguin) {
    // Cozy Red 3D Winter Scarf & Snowy White Tuxedo Belly Front for Baby Penguin!
    const scarfGeo = new THREE.TorusGeometry(0.36, 0.048, 16, 32);
    const scarfMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.5 });
    const scarf = new THREE.Mesh(scarfGeo, scarfMat);
    scarf.rotation.x = Math.PI * 0.52;
    scarf.position.set(0, 0.16, 0.04);
    chestBone.add(scarf);
  }

  // Kangaroo Belly Pouch + Cute Baby Joey Head Peeking Out!
  if (idLow.includes('kangaroo')) {
    const pouchGeo = new THREE.SphereGeometry(0.24, 20, 20);
    pouchGeo.scale(1.1, 0.95, 0.65);
    const pouchMat = new THREE.MeshStandardMaterial({ color: secondaryHex, roughness: 0.55 });
    const pouch = new THREE.Mesh(pouchGeo, pouchMat);
    pouch.position.set(0, -0.34, 0.32);
    chestBone.add(pouch);

    const joeyHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 18, 18),
      new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.5 })
    );
    joeyHead.position.set(0, -0.18, 0.38);
    chestBone.add(joeyHead);
  }

  // 20 Exterior 3D Hedgehog Back Quills!
  if (idLow.includes('hedgehog')) {
    const quillGeo = new THREE.ConeGeometry(0.048, 0.22, 12);
    const quillMat = new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.45 });
    for (let r = 0; r < 4; r++) {
      for (let c = -2; c <= 2; c++) {
        const q = new THREE.Mesh(quillGeo, quillMat);
        q.position.set(c * 0.11, 0.16 - r * 0.15, -0.36);
        q.rotation.x = -Math.PI * 0.42;
        q.rotation.z = c * -0.15;
        chestBone.add(q);
      }
    }
  }

  // Stegosaurus Diamond Dorsal Plates!
  if (idLow.includes('stegosaurus')) {
    const plateGeo = new THREE.ConeGeometry(0.14, 0.26, 4);
    plateGeo.scale(0.35, 1.0, 1.0);
    const plateMat = new THREE.MeshStandardMaterial({ color: secondaryHex, roughness: 0.35 });
    [0.24, 0.04, -0.16, -0.36].forEach((py) => {
      const p = new THREE.Mesh(plateGeo, plateMat);
      p.position.set(0, py, -0.4);
      p.rotation.x = -Math.PI * 0.38;
      chestBone.add(p);
    });
  }

  // Large 1.4m-Span Exterior 3D Back Wings, Domed Turtle Shell, Dorsal Fin & Superhero Cape
  if (
    idLow.includes('dragon') ||
    idLow.includes('pegasus') ||
    idLow.includes('alicorn') ||
    idLow.includes('pterodactyl') ||
    idLow.includes('phoenix') ||
    idLow.includes('griffin') ||
    idLow.includes('fairy')
  ) {
    const wingGeo = new THREE.SphereGeometry(0.36, 20, 20);
    wingGeo.scale(1.45, 0.85, 0.18);
    const wingMat = new THREE.MeshPhysicalMaterial({
      color: secondaryHex,
      roughness: 0.22,
      transmission: idLow.includes('fairy') ? 0.45 : 0.0,
      transparent: idLow.includes('fairy'),
      opacity: idLow.includes('fairy') ? 0.9 : 1.0,
      clearcoat: 0.85,
    });
    [-1, 1].forEach((side) => {
      const wing = new THREE.Mesh(wingGeo, wingMat);
      wing.position.set(side * 0.52, 0.1, -0.34);
      wing.rotation.y = side * -0.38;
      wing.rotation.z = side * 0.28;
      chestBone.add(wing);
    });
  } else if (idLow.includes('turtle')) {
    // Huge Domed Emerald 3D Sea Turtle Carapace Shell + Golden Rim!
    const shellGeo = new THREE.SphereGeometry(0.48, 24, 24);
    shellGeo.scale(1.05, 1.22, 0.65);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: '#047857',
      roughness: 0.25,
      clearcoat: 0.8,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    shell.position.set(0, -0.14, -0.32);
    chestBone.add(shell);
  } else if (idLow.includes('dolphin') || idLow.includes('whale') || idLow.includes('narwhal')) {
    const finGeo = new THREE.ConeGeometry(0.15, 0.38, 18);
    const finMat = new THREE.MeshStandardMaterial({ color: primaryHex, roughness: 0.3 });
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.set(0, 0.04, -0.44);
    fin.rotation.x = -Math.PI * 0.38;
    chestBone.add(fin);
  } else if (idLow.includes('superhero')) {
    const capeGeo = new THREE.BoxGeometry(0.76, 0.88, 0.04);
    const capeMat = new THREE.MeshStandardMaterial({ color: '#dc2626', roughness: 0.38 });
    const cape = new THREE.Mesh(capeGeo, capeMat);
    cape.position.set(0, -0.2, -0.38);
    cape.rotation.x = 0.22;
    chestBone.add(cape);

    const starBadge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13, 0.13, 0.04, 5),
      new THREE.MeshStandardMaterial({ color: '#facc15', metalness: 0.6, roughness: 0.2 })
    );
    starBadge.rotation.x = Math.PI * 0.5;
    starBadge.position.set(0, -0.04, 0.42);
    chestBone.add(starBadge);
  }

  // Happy Pink Puppy Tongue + Expressive Mouth attached to Jaw Bone for real lip-sync
  if (isDogOrPuppy) {
    const tongueGeo = new THREE.SphereGeometry(0.068, 16, 16);
    tongueGeo.scale(1.1, 0.35, 1.55);
    const tongueMat = new THREE.MeshStandardMaterial({ color: '#fb7185', roughness: 0.3 });
    const tongue = new THREE.Mesh(tongueGeo, tongueMat);
    tongue.position.set(0, -0.08, 0.36);
    tongue.rotation.x = 0.38;
    jawBone.add(tongue);
  }

  const mouthGeo = new THREE.SphereGeometry(0.085, 20, 20);
  mouthGeo.scale(1.4, 0.55, 0.68);
  const mouthMat = new THREE.MeshStandardMaterial({
    color: '#be123c',
    roughness: 0.35,
  });
  const mouth = new THREE.Mesh(mouthGeo, mouthMat);
  mouth.position.set(0, -0.05, idLow.includes('dino') || idLow.includes('dragon') ? 0.34 : 0.28);
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
    archetype === 'racecar_toy' ||
    archetype === 'truck_toy' ||
    archetype === 'train_toy' ||
    archetype === 'police_cruiser_car' ||
    archetype === 'fire_engine_truck' ||
    archetype === 'sunshine_school_bus';

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

  const eyeMeshes = attachPlushFacialDetailsToHeadBone(
    bones[3],
    bones[4],
    bones[2],
    archetype,
    primaryHex,
    secondaryHex
  );
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
        if (archetype === 'baby_pony_caramel') targetSpan = 1.78;
        if (isVehicleToy && archetype !== 'train_toy') targetSpan = 2.45;
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
        if (
          archetype === 'truck_toy' ||
          archetype === 'fire_engine_truck' ||
          archetype === 'sunshine_school_bus'
        ) {
          model.rotation.y = Math.PI * 0.35;
        } else if (archetype === 'racecar_toy' || archetype === 'police_cruiser_car') {
          model.rotation.y = Math.PI * 0.22;
        } else if (archetype === 'duck_toy') {
          model.rotation.y = -Math.PI * 0.35;
        }

        const isTintedVariant =
          archetype === 'police_cruiser_car' ||
          archetype === 'fire_engine_truck' ||
          archetype === 'sunshine_school_bus' ||
          archetype === 'baby_pony_caramel';
        const tintCol = new THREE.Color(primaryHex);

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
            if (isTintedVariant && mesh.material && (mesh.material as THREE.MeshStandardMaterial).color) {
              const clonedMat = (mesh.material as THREE.MeshStandardMaterial).clone();
              clonedMat.color.lerp(tintCol, 0.78);
              mesh.material = clonedMat;
            }
            if (mesh.morphTargetInfluences && mesh.morphTargetInfluences.length > 0) {
              morphMeshes.push(mesh);
            }
          }
        });

        const topY = scaledBox.max.y - scaledBox.min.y - 1.12;

        // Distinct 3D Exterior Equipment for Studio GLB Variants!
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
        } else if (archetype === 'baby_pony_caramel') {
          // Cozy Pink & Gold 3D Pony Saddle Blanket!
          const saddle = new THREE.Mesh(
            new THREE.BoxGeometry(0.48, 0.14, 0.52),
            new THREE.MeshStandardMaterial({ color: '#ec4899', roughness: 0.4 })
          );
          saddle.position.set(0, 0.08, -0.05);
          innerModel.add(saddle);
        } else if (archetype === 'police_cruiser_car') {
          // High-Visibility Red & Blue 3D Police Roof Siren Bar + White Doors!
          const barLeft = new THREE.Mesh(
            new THREE.BoxGeometry(0.34, 0.14, 0.18),
            new THREE.MeshBasicMaterial({ color: '#ef4444' })
          );
          barLeft.position.set(-0.18, topY + 0.04, 0);
          const barRight = new THREE.Mesh(
            new THREE.BoxGeometry(0.34, 0.14, 0.18),
            new THREE.MeshBasicMaterial({ color: '#3b82f6' })
          );
          barRight.position.set(0.18, topY + 0.04, 0);
          innerModel.add(barLeft, barRight);
        } else if (archetype === 'fire_engine_truck') {
          // White 3D Fire Engine Extension Ladder Rack + Flashing Red Beacon + Golden Hose Reel!
          const ladderMat = new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.3 });
          [-0.16, 0.16].forEach((lx) => {
            const rail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.55), ladderMat);
            rail.position.set(lx, topY + 0.08, -0.1);
            rail.rotation.y = Math.PI * 0.35;
            innerModel.add(rail);
          });
          const beacon = new THREE.Mesh(
            new THREE.CylinderGeometry(0.14, 0.16, 0.18, 18),
            new THREE.MeshBasicMaterial({ color: '#ef4444' })
          );
          beacon.position.set(0, topY + 0.14, 0.35);
          innerModel.add(beacon);
        } else if (archetype === 'sunshine_school_bus') {
          // Yellow School Bus Roof Sign Box + Red Octagonal STOP Arm!
          const roofSign = new THREE.Mesh(
            new THREE.BoxGeometry(0.58, 0.18, 0.24),
            new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 0.3 })
          );
          roofSign.position.set(0, topY + 0.06, 0.25);
          roofSign.rotation.y = Math.PI * 0.35;
          const stopSign = new THREE.Mesh(
            new THREE.CylinderGeometry(0.18, 0.18, 0.04, 8),
            new THREE.MeshBasicMaterial({ color: '#dc2626' })
          );
          stopSign.position.set(0.58, -0.35, 0.25);
          stopSign.rotation.z = Math.PI * 0.5;
          innerModel.add(roofSign, stopSign);
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
  | 'lava_lamp_chill_zone'
  | 'carnival_ferris_park'
  | 'steam_train_station'
  | 'submarine_deep_sea'
  | 'volcano_dino_island'
  | 'lunar_moon_base'
  | 'mars_rover_outpost'
  | 'dutch_tulip_windmill'
  | 'ancient_pyramid_oasis'
  | 'bamboo_panda_grove'
  | 'penguin_iceberg_bay'
  | 'grand_piano_stage'
  | 'storybook_library_nook'
  | 'mega_construction_zone'
  | 'sunny_airport_runway'
  | 'harbor_lighthouse_bay'
  | 'jellyfish_glow_tank'
  | 'honeybee_meadow_hive'
  | 'trampoline_bounce_dome'
  | 'cupcake_bakery_kitchen'
  | 'dino_fossil_museum'
  | 'steampunk_clockwork_tower'
  | 'magic_wizard_observatory'
  | 'koi_lantern_bridge'
  | 'rainbow_waterpark_splash'
  | 'camping_campfire_woods'
  | 'infinity_mirror_portal'
  | 'subway_metro_station'
  | 'chocolate_waffle_village'
  | 'planetarium_star_dome'
  | 'tropical_surf_island';

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

  // ================= 31–60: 30 NEW TOTALLY DIFFERENT 3D ARCHITECTURAL & BIOME STAGE WORLDS =================
  {
    id: 'carnival_ferris_park',
    name: 'Giant Ferris Wheel Carnival',
    emoji: '🎡🎪',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #fbcfe8 42%, #bae6fd 78%, #f472b6 100%)',
    pedestalColor: '#ec4899',
    ringColor: '#fde047',
    hillLeftColor: '#f472b6',
    hillRightColor: '#38bdf8',
    description: '3D Giant Spoked Ferris Wheel with hanging passenger gondolas & circus tent',
    voiceKeywords: ['ferris wheel', 'carnival', 'circus', 'amusement park', 'fairground'],
  },
  {
    id: 'steam_train_station',
    name: 'Grand Steam Train Station',
    emoji: '🚉🚂',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef3c7 0%, #bae6fd 42%, #fde68a 78%, #d97706 100%)',
    pedestalColor: '#475569',
    ringColor: '#ef4444',
    hillLeftColor: '#86efac',
    hillRightColor: '#4ade80',
    description: 'Full 3D Red/Black Steam Locomotive Engine on 3D railroad tracks with clock tower',
    voiceKeywords: ['steam train', 'train station', 'locomotive', 'railroad', 'station'],
  },
  {
    id: 'submarine_deep_sea',
    name: 'Yellow Submarine Trench',
    emoji: '🚤🐙',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #22d3ee 0%, #0284c7 42%, #0369a1 78%, #0f172a 100%)',
    pedestalColor: '#0e7490',
    ringColor: '#facc15',
    hillLeftColor: '#0891b2',
    hillRightColor: '#155e75',
    description: '3D Yellow Research Submarine with portholes, periscope, propeller & sea vents',
    voiceKeywords: ['submarine', 'yellow submarine', 'deep sea', 'underwater boat'],
  },
  {
    id: 'volcano_dino_island',
    name: 'Lava Volcano Dino Island',
    emoji: '🌋🦖',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef08a 0%, #fdba74 40%, #f97316 76%, #7c2d12 100%)',
    pedestalColor: '#65a30d',
    ringColor: '#f97316',
    hillLeftColor: '#84cc16',
    hillRightColor: '#4d7c0f',
    description: 'Towering 3D Volcanic Mountain with glowing molten crater, ferns & 3D dino eggs',
    voiceKeywords: ['volcano', 'dino island', 'lava', 'prehistoric'],
  },
  {
    id: 'lunar_moon_base',
    name: 'Lunar Moon Base & Rocket',
    emoji: '🌕🚀',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #312e81 0%, #1e1b4b 45%, #0f172a 80%, #020617 100%)',
    pedestalColor: '#94a3b8',
    ringColor: '#38bdf8',
    hillLeftColor: '#64748b',
    hillRightColor: '#475569',
    description: '3D Cratered Moon surface, Multi-Stage Space Rocket on launchpad & glass biodome',
    voiceKeywords: ['moon base', 'lunar', 'rocket launch', 'astronaut'],
  },
  {
    id: 'mars_rover_outpost',
    name: 'Red Planet Mars Rover Lab',
    emoji: '🔴🛞',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fed7aa 0%, #fb923c 42%, #ea580c 78%, #7c2d12 100%)',
    pedestalColor: '#c2410c',
    ringColor: '#fde047',
    hillLeftColor: '#ea580c',
    hillRightColor: '#9a3412',
    description: 'Rust-red Martian canyon, 6-wheeled 3D Mars Rover with camera mast & twin moons',
    voiceKeywords: ['mars', 'mars rover', 'red planet', 'rover'],
  },
  {
    id: 'dutch_tulip_windmill',
    name: 'Dutch Windmill & Tulip Field',
    emoji: '🌷🌬️',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #bae6fd 42%, #fbcfe8 76%, #4ade80 100%)',
    pedestalColor: '#22c55e',
    ringColor: '#f43f5e',
    hillLeftColor: '#86efac',
    hillRightColor: '#4ade80',
    description: 'Tall 3D Wooden Windmill with 4 giant sails and rows of colorful 3D tulips',
    voiceKeywords: ['windmill', 'tulip', 'tulip field', 'dutch'],
  },
  {
    id: 'ancient_pyramid_oasis',
    name: 'Golden Pyramid Desert Oasis',
    emoji: '🐪🏜️',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #fde047 40%, #f59e0b 78%, #b45309 100%)',
    pedestalColor: '#eab308',
    ringColor: '#06b6d4',
    hillLeftColor: '#facc15',
    hillRightColor: '#d97706',
    description: '3D Great Golden Pyramids, desert sand dunes, turquoise oasis pool & obelisks',
    voiceKeywords: ['pyramid', 'desert', 'oasis', 'egypt', 'camel'],
  },
  {
    id: 'bamboo_panda_grove',
    name: 'Emerald Bamboo Panda Zen',
    emoji: '🐼🎍',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #ecfdf5 0%, #a7f3d0 42%, #6ee7b7 78%, #059669 100%)',
    pedestalColor: '#10b981',
    ringColor: '#ef4444',
    hillLeftColor: '#34d399',
    hillRightColor: '#059669',
    description: 'Towering segmented 3D green bamboo forest, red wooden zen bridge & lanterns',
    voiceKeywords: ['bamboo', 'panda grove', 'panda forest', 'zen bridge'],
  },
  {
    id: 'penguin_iceberg_bay',
    name: 'Penguin Iceberg & Igloo Bay',
    emoji: '🐧🧊',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #f0f9ff 0%, #bae6fd 42%, #7dd3fc 78%, #0284c7 100%)',
    pedestalColor: '#e0f2fe',
    ringColor: '#06b6d4',
    hillLeftColor: '#bae6fd',
    hillRightColor: '#7dd3fc',
    description: '3D Domed Snow Igloo with tunnel, faceted turquoise icebergs & icy skating rink',
    voiceKeywords: ['penguin', 'iceberg', 'igloo', 'snow bay'],
  },
  {
    id: 'grand_piano_stage',
    name: 'Giant Floor Piano Concert',
    emoji: '🎹🎼',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef3c7 0%, #e0e7ff 42%, #c7d2fe 78%, #4f46e5 100%)',
    pedestalColor: '#1e1b4b',
    ringColor: '#facc15',
    hillLeftColor: '#818cf8',
    hillRightColor: '#6366f1',
    description: 'Walk-on 3D Giant Piano Keyboard floor with white/black keys & golden organ pipes',
    voiceKeywords: ['piano', 'piano stage', 'keyboard', 'concert hall'],
  },
  {
    id: 'storybook_library_nook',
    name: 'Giant Open Storybook Library',
    emoji: '📚🦉',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fde68a 42%, #fcd34d 78%, #b45309 100%)',
    pedestalColor: '#fef3c7',
    ringColor: '#d97706',
    hillLeftColor: '#fde68a',
    hillRightColor: '#f59e0b',
    description: 'Giant 3D Open Hardcover Book floor, towering colorful 3D book stacks & lamp',
    voiceKeywords: ['storybook', 'library', 'book world', 'reading nook'],
  },
  {
    id: 'mega_construction_zone',
    name: 'Tower Crane Construction Site',
    emoji: '🏗️🚜',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #fed7aa 42%, #fdba74 78%, #ea580c 100%)',
    pedestalColor: '#d97706',
    ringColor: '#facc15',
    hillLeftColor: '#fbbf24',
    hillRightColor: '#b45309',
    description: 'Giant 3D Yellow Tower Crane with boom & hook, steel beams & safety barriers',
    voiceKeywords: ['construction', 'crane', 'bulldozer', 'digger', 'building site'],
  },
  {
    id: 'sunny_airport_runway',
    name: 'Airport Runway & Control Tower',
    emoji: '✈️🛫',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #f0f9ff 0%, #bae6fd 45%, #7dd3fc 78%, #38bdf8 100%)',
    pedestalColor: '#334155',
    ringColor: '#facc15',
    hillLeftColor: '#4ade80',
    hillRightColor: '#22c55e',
    description: '3D Asphalt Runway with centerline lights, Air Traffic Control Tower & Biplane',
    voiceKeywords: ['airport', 'runway', 'control tower', 'airplane station'],
  },
  {
    id: 'harbor_lighthouse_bay',
    name: 'Striped Lighthouse & Sailboat',
    emoji: '🚨⛵',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #bae6fd 42%, #38bdf8 78%, #0369a1 100%)',
    pedestalColor: '#0284c7',
    ringColor: '#ef4444',
    hillLeftColor: '#38bdf8',
    hillRightColor: '#0284c7',
    description: 'Tall Red-and-White Striped 3D Lighthouse with glowing lantern & 3D Sailboat',
    voiceKeywords: ['lighthouse', 'sailboat', 'harbor', 'seaport'],
  },
  {
    id: 'jellyfish_glow_tank',
    name: 'Bioluminescent Jellyfish Tank',
    emoji: '🪼💙',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #1e1b4b 0%, #312e81 42%, #0f172a 80%, #020617 100%)',
    pedestalColor: '#1e3a8a',
    ringColor: '#22d3ee',
    hillLeftColor: '#1d4ed8',
    hillRightColor: '#3b82f6',
    description: 'Translucent 3D glowing jellyfish domes with trailing tentacles in deep indigo calm',
    voiceKeywords: ['jellyfish', 'glow tank', 'bioluminescent', 'deep ocean calm'],
  },
  {
    id: 'honeybee_meadow_hive',
    name: 'Golden Honeycomb Bee Hive',
    emoji: '🐝🍯',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fefce8 0%, #fef08a 42%, #facc15 78%, #ca8a04 100%)',
    pedestalColor: '#eab308',
    ringColor: '#f59e0b',
    hillLeftColor: '#fde047',
    hillRightColor: '#eab308',
    description: '3D Hexagonal Golden Honeycomb wall & floor tiles with giant 3D Sunflowers',
    voiceKeywords: ['honeycomb', 'bee hive', 'honeybee', 'sunflower'],
  },
  {
    id: 'trampoline_bounce_dome',
    name: 'Bouncy Trampoline & Foam Pit',
    emoji: '🤸‍♂️🟣',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #f5f3ff 0%, #ddd6fe 42%, #a78bfa 78%, #6d28d9 100%)',
    pedestalColor: '#7c3aed',
    ringColor: '#22d3ee',
    hillLeftColor: '#c084fc',
    hillRightColor: '#8b5cf6',
    description: '3D Circular Spring Trampoline pads, colorful soft foam-cube walls & gym rings',
    voiceKeywords: ['trampoline', 'bounce park', 'foam pit', 'gymnastics'],
  },
  {
    id: 'cupcake_bakery_kitchen',
    name: 'Giant Birthday Cake Bakery',
    emoji: '🎂🍩',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fff1f2 0%, #fecdd3 42%, #fda4af 78%, #f43f5e 100%)',
    pedestalColor: '#fb7185',
    ringColor: '#fef08a',
    hillLeftColor: '#fda4af',
    hillRightColor: '#f472b6',
    description: '3D 3-Tier Frosted Birthday Cake with glowing candles & giant glazed donuts',
    voiceKeywords: ['birthday cake', 'cupcake', 'bakery', 'donut'],
  },
  {
    id: 'dino_fossil_museum',
    name: 'Natural History Fossil Hall',
    emoji: '🦴🏛️',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fef3c7 42%, #e7e5e4 78%, #a8a29e 100%)',
    pedestalColor: '#d6d3d1',
    ringColor: '#d97706',
    hillLeftColor: '#e7e5e4',
    hillRightColor: '#d6d3d1',
    description: 'Marble 3D Museum Columns, giant prehistoric dino ribcage fossil arch & pedestals',
    voiceKeywords: ['museum', 'fossil', 'skeleton', 'dino museum'],
  },
  {
    id: 'steampunk_clockwork_tower',
    name: 'Brass Clockwork Gear Tower',
    emoji: '⚙️🕰️',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef3c7 0%, #fde68a 40%, #d97706 78%, #78350f 100%)',
    pedestalColor: '#b45309',
    ringColor: '#facc15',
    hillLeftColor: '#d97706',
    hillRightColor: '#92400e',
    description: 'Interlocking 3D Golden & Copper Toothed Gears, giant clock face & brass pipes',
    voiceKeywords: ['clockwork', 'gear tower', 'clock tower', 'gears'],
  },
  {
    id: 'magic_wizard_observatory',
    name: 'Starlight Telescope Observatory',
    emoji: '🔭✨',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #312e81 0%, #4c1d95 42%, #1e1b4b 78%, #0f172a 100%)',
    pedestalColor: '#4338ca',
    ringColor: '#fbbf24',
    hillLeftColor: '#6366f1',
    hillRightColor: '#4f46e5',
    description: '3D Brass Astronomical Telescope pointed at the stars & celestial armillary rings',
    voiceKeywords: ['observatory', 'telescope', 'wizard tower', 'stargazing'],
  },
  {
    id: 'koi_lantern_bridge',
    name: 'Floating Paper Lantern River',
    emoji: '🏮🐟',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef3c7 0%, #fed7aa 40%, #fb7185 76%, #881337 100%)',
    pedestalColor: '#0284c7',
    ringColor: '#f97316',
    hillLeftColor: '#fb7185',
    hillRightColor: '#f43f5e',
    description: '3D Vermilion Torii Gate, warm glowing paper lanterns floating on water & lotus pads',
    voiceKeywords: ['lantern river', 'koi pond', 'paper lantern', 'torii'],
  },
  {
    id: 'rainbow_waterpark_splash',
    name: 'Spiral Water Slide Lagoon',
    emoji: '🛝💦',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #ecfeff 0%, #67e8f9 42%, #22d3ee 78%, #0284c7 100%)',
    pedestalColor: '#06b6d4',
    ringColor: '#facc15',
    hillLeftColor: '#22d3ee',
    hillRightColor: '#38bdf8',
    description: 'Curved 3D Aqua & Yellow Water Slide tubes, splash lagoon & colorful pool rings',
    voiceKeywords: ['waterpark', 'water slide', 'splash park', 'swimming pool'],
  },
  {
    id: 'camping_campfire_woods',
    name: 'Cozy Woodland Tent & Campfire',
    emoji: '⛺🔥',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef3c7 0%, #a7f3d0 42%, #059669 78%, #064e3b 100%)',
    pedestalColor: '#15803d',
    ringColor: '#f97316',
    hillLeftColor: '#22c55e',
    hillRightColor: '#166534',
    description: '3D A-Frame Canvas Camping Tent, glowing stone-ring campfire, logs & pine woods',
    voiceKeywords: ['camping', 'campfire', 'tent', 'woodland camp'],
  },
  {
    id: 'infinity_mirror_portal',
    name: 'Sensory Infinity Light Tunnel',
    emoji: '🌀🔮',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #2e1065 0%, #1e1b4b 45%, #090d16 82%, #020617 100%)',
    pedestalColor: '#1e1b4b',
    ringColor: '#ec4899',
    hillLeftColor: '#4c1d95',
    hillRightColor: '#312e81',
    description: 'Concentric 3D Neon Geometric Portal Rings creating a soothing optical light tunnel',
    voiceKeywords: ['infinity mirror', 'light tunnel', 'portal', 'neon sensory'],
  },
  {
    id: 'subway_metro_station',
    name: 'Modern Metro Subway Platform',
    emoji: '🚇🎫',
    category: 'vehicles',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #f8fafc 0%, #cbd5e1 42%, #94a3b8 78%, #334155 100%)',
    pedestalColor: '#475569',
    ringColor: '#38bdf8',
    hillLeftColor: '#94a3b8',
    hillRightColor: '#64748b',
    description: 'Sleek 3D Silver/Blue Metro Commuter Train Car with glowing windows & platform arch',
    voiceKeywords: ['subway', 'metro', 'underground train', 'tube station'],
  },
  {
    id: 'chocolate_waffle_village',
    name: 'Chocolate River & Waffle Village',
    emoji: '🧇🍫',
    category: 'magic',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fffbeb 0%, #fde68a 42%, #f59e0b 78%, #78350f 100%)',
    pedestalColor: '#78350f',
    ringColor: '#fef08a',
    hillLeftColor: '#d97706',
    hillRightColor: '#92400e',
    description: '3D Waffle-Grid Gingerbread Cottages with whipped-cream roofs & peppermint pillars',
    voiceKeywords: ['chocolate', 'waffle', 'gingerbread', 'cookie village'],
  },
  {
    id: 'planetarium_star_dome',
    name: '360° Constellation Planetarium',
    emoji: '🌌⭐',
    category: 'sensory',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #1e1b4b 0%, #172554 45%, #0f172a 82%, #020617 100%)',
    pedestalColor: '#1e293b',
    ringColor: '#60a5fa',
    hillLeftColor: '#1d4ed8',
    hillRightColor: '#1e3a8a',
    description: 'Geodesic 3D Star Projector Sphere, glowing constellation star-rings & nebula',
    voiceKeywords: ['planetarium', 'constellation', 'star dome', 'night sky'],
  },
  {
    id: 'tropical_surf_island',
    name: 'Tiki Surfboard Beach Island',
    emoji: '🏄‍♂️🌺',
    category: 'nature',
    cssGradient:
      'radial-gradient(circle at 50% 18%, #fef9c3 0%, #67e8f9 42%, #06b6d4 78%, #0284c7 100%)',
    pedestalColor: '#fde047',
    ringColor: '#06b6d4',
    hillLeftColor: '#22d3ee',
    hillRightColor: '#0891b2',
    description: '3D Colorful Surfboards standing in golden sand, curling 3D ocean wave & palms',
    voiceKeywords: ['surf island', 'surfboard', 'tropical island', 'hawaii'],
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

  // 1. Wide 3D Stage Platform + Glowing Rim (No permanent soccer pitch lines!)
  const padGeo = new THREE.CylinderGeometry(3.45, 3.65, 0.2, 64);
  const padMat = new THREE.MeshStandardMaterial({
    color: meta.pedestalColor,
    roughness: 0.42,
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

  // Helper: 3D Fluffy Cloud
  const addFluffyCloud = (x: number, y: number, z: number, scale = 1.0, tint = '#ffffff') => {
    const cloud = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color: tint, roughness: 0.65 });
    const puffs: [number, number, number, number][] = [
      [0, 0, 0, 0.38],
      [-0.32, -0.06, 0.04, 0.28],
      [0.32, -0.05, 0.04, 0.3],
      [0.14, 0.16, -0.02, 0.26],
      [-0.14, 0.14, 0.02, 0.25],
    ];
    puffs.forEach(([px, py, pz, r]) => {
      const m = new THREE.Mesh(new THREE.SphereGeometry(r, 18, 18), mat);
      m.position.set(px, py, pz);
      cloud.add(m);
    });
    cloud.position.set(x, y, z);
    cloud.scale.setScalar(scale);
    world.add(cloud);
  };

  // Helper: 3D Glowing Archway
  const addGlowingArch = (colors: string[], radius = 2.8, tube = 0.06, zPos = -2.45) => {
    colors.forEach((col, i) => {
      const archGeo = new THREE.TorusGeometry(radius - i * (tube * 1.85), tube, 16, 48, Math.PI);
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

  // Helper: 3D Floating Glowing Orbs / Crystals
  const addFloatingOrbs = (
    positions: [number, number, number][],
    col: string,
    octahedron = false,
    size = 0.16
  ) => {
    positions.forEach(([ox, oy, oz]) => {
      const geo = octahedron
        ? new THREE.OctahedronGeometry(size, 0)
        : new THREE.SphereGeometry(size, 18, 18);
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

  // Helper: Rolling Hills (only used for outdoor nature worlds)
  const addRollingHills = () => {
    const hillLeft = new THREE.Mesh(
      new THREE.SphereGeometry(2.6, 28, 20),
      new THREE.MeshStandardMaterial({ color: meta.hillLeftColor, roughness: 0.7 })
    );
    hillLeft.position.set(-2.3, -3.1, -2.8);
    hillLeft.scale.set(1.4, 0.75, 0.8);
    world.add(hillLeft);

    const hillRight = new THREE.Mesh(
      new THREE.SphereGeometry(2.8, 28, 20),
      new THREE.MeshStandardMaterial({ color: meta.hillRightColor, roughness: 0.7 })
    );
    hillRight.position.set(2.4, -3.2, -3.0);
    hillRight.scale.set(1.45, 0.78, 0.8);
    world.add(hillRight);
  };

  switch (envId) {
    case 'rainbow_meadow': {
      addRollingHills();
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

    case 'candy_wonderland':
    case 'cupcake_bakery_kitchen':
    case 'chocolate_waffle_village':
    case 'ice_cream_beach': {
      // Giant 3D Tiered Birthday Cake / Waffle Cones & Swirl Lollipops!
      const cakeGrp = new THREE.Group();
      [
        { r: 0.75, h: 0.38, y: -0.95, col: '#f472b6' },
        { r: 0.55, h: 0.34, y: -0.6, col: '#fef08a' },
        { r: 0.36, h: 0.3, y: -0.28, col: '#38bdf8' },
      ].forEach((tier) => {
        const tMesh = new THREE.Mesh(
          new THREE.CylinderGeometry(tier.r, tier.r, tier.h, 28),
          new THREE.MeshStandardMaterial({ color: tier.col, roughness: 0.3 })
        );
        tMesh.position.set(0, tier.y, -2.1);
        cakeGrp.add(tMesh);
      });
      // Glowing Birthday Candles on top of the 3D Cake!
      [-0.18, 0, 0.18].forEach((cx) => {
        const candle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.28, 12),
          new THREE.MeshStandardMaterial({ color: '#ffffff' })
        );
        candle.position.set(cx, -0.02, -2.1);
        const flame = new THREE.Mesh(
          new THREE.SphereGeometry(0.055, 12, 12),
          new THREE.MeshStandardMaterial({
            color: '#facc15',
            emissive: '#f97316',
            emissiveIntensity: 0.85,
          })
        );
        flame.position.set(cx, 0.16, -2.1);
        cakeGrp.add(candle, flame);
      });
      world.add(cakeGrp);

      // 3D Giant Ice Cream Waffle Cones & Glazed Donuts on Left & Right
      [-2.35, 2.35].forEach((xPos, idx) => {
        const cone = new THREE.Mesh(
          new THREE.ConeGeometry(0.32, 0.75, 20),
          new THREE.MeshStandardMaterial({ color: '#d97706', roughness: 0.55 })
        );
        cone.rotation.x = Math.PI;
        cone.position.set(xPos, -0.78, -1.15);
        const scoop = new THREE.Mesh(
          new THREE.SphereGeometry(0.34, 20, 20),
          new THREE.MeshStandardMaterial({
            color: idx === 0 ? '#fbcfe8' : '#a7f3d0',
            roughness: 0.3,
          })
        );
        scoop.position.set(xPos, -0.32, -1.15);
        const donut = new THREE.Mesh(
          new THREE.TorusGeometry(0.28, 0.12, 16, 32),
          new THREE.MeshStandardMaterial({
            color: idx === 0 ? '#ec4899' : '#38bdf8',
            roughness: 0.25,
          })
        );
        donut.position.set(xPos * 0.78, 0.35, -1.65);
        world.add(cone, scoop, donut);
      });
      break;
    }

    case 'dino_jungle':
    case 'volcano_dino_island':
    case 'jungle_treehouse': {
      addRollingHills();
      // Towering 3D Volcanic Cone with Glowing Molten Lava Crater Rim!
      const volcano = new THREE.Mesh(
        new THREE.ConeGeometry(1.55, 2.35, 28, 1, true),
        new THREE.MeshStandardMaterial({ color: '#57534e', roughness: 0.8 })
      );
      volcano.position.set(0, -0.15, -2.55);
      const lavaRim = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.11, 16, 32),
        new THREE.MeshStandardMaterial({
          color: '#f97316',
          emissive: '#ef4444',
          emissiveIntensity: 0.85,
        })
      );
      lavaRim.rotation.x = Math.PI / 2;
      lavaRim.position.set(0, 0.98, -2.55);
      world.add(volcano, lavaRim);

      // Prehistoric Palm Trees & 3D Spotted Dino Eggs on Left & Right
      [-2.45, 2.45, -1.85, 1.85].forEach((tx, idx) => {
        const tz = idx < 2 ? -1.25 : -1.75;
        const trunk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.11, 0.17, 1.35, 14),
          new THREE.MeshStandardMaterial({ color: '#78350f', roughness: 0.7 })
        );
        trunk.position.set(tx, -0.58, tz);
        const crown = new THREE.Mesh(
          new THREE.SphereGeometry(0.52, 20, 20),
          new THREE.MeshStandardMaterial({
            color: idx % 2 === 0 ? '#22c55e' : '#65a30d',
            roughness: 0.5,
          })
        );
        crown.scale.set(1.25, 0.55, 1.25);
        crown.position.set(tx, 0.16, tz);
        world.add(trunk, crown);
      });
      addFloatingOrbs(
        [
          [-0.25, 1.35, -2.4],
          [0.22, 1.55, -2.45],
          [0, 1.75, -2.5],
        ],
        '#fb923c',
        false,
        0.13
      );
      break;
    }

    case 'space_galaxy':
    case 'lunar_moon_base':
    case 'mars_rover_outpost':
    case 'planetarium_star_dome': {
      // 3D Multi-Stage Space Rocket on Launchpad + Ringed Saturn + Lunar Craters!
      const rocketGrp = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, 1.25, 24),
        new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.25 })
      );
      const nose = new THREE.Mesh(
        new THREE.ConeGeometry(0.24, 0.48, 24),
        new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.25 })
      );
      nose.position.y = 0.86;
      const windowPorch = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshStandardMaterial({
          color: '#38bdf8',
          emissive: '#38bdf8',
          emissiveIntensity: 0.5,
        })
      );
      windowPorch.position.set(0, 0.22, 0.2);
      rocketGrp.add(body, nose, windowPorch);
      rocketGrp.position.set(2.15, -0.45, -1.45);
      world.add(rocketGrp);

      // Giant Ringed Saturn Planet in the Sky
      const planetGrp = new THREE.Group();
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.58, 28, 28),
        new THREE.MeshStandardMaterial({
          color: envId === 'mars_rover_outpost' ? '#ea580c' : '#f59e0b',
          emissive: '#d97706',
          emissiveIntensity: 0.25,
        })
      );
      const pRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.02, 0.075, 14, 48),
        new THREE.MeshStandardMaterial({
          color: '#38bdf8',
          emissive: '#38bdf8',
          emissiveIntensity: 0.35,
        })
      );
      pRing.rotation.x = 1.15;
      pRing.rotation.y = 0.35;
      planetGrp.add(sphere, pRing);
      planetGrp.position.set(-1.85, 1.25, -2.2);
      world.add(planetGrp);

      // 3D Lunar Craters on the Stage Floor
      [-2.1, 1.85].forEach((cx) => {
        const crater = new THREE.Mesh(
          new THREE.TorusGeometry(0.36, 0.06, 12, 28),
          new THREE.MeshStandardMaterial({ color: meta.hillLeftColor, roughness: 0.8 })
        );
        crater.rotation.x = Math.PI / 2;
        crater.position.set(cx, -1.14, -0.85);
        world.add(crater);
      });
      addFloatingOrbs(
        [
          [0, 1.5, -2.0],
          [1.1, 1.6, -2.1],
          [-0.6, 1.55, -2.0],
        ],
        '#fde047',
        true,
        0.16
      );
      break;
    }

    case 'train_wonderland':
    case 'steam_train_station':
    case 'subway_metro_station': {
      // Full 3D Steam Locomotive / Metro Train on 3D Railroad Tracks with Sleepers!
      for (let i = -6; i <= 6; i++) {
        const sleeper = new THREE.Mesh(
          new THREE.BoxGeometry(0.18, 0.04, 0.65),
          new THREE.MeshStandardMaterial({ color: '#78350f' })
        );
        sleeper.position.set(i * 0.45, -1.14, -1.35);
        world.add(sleeper);
      }
      const trainGrp = new THREE.Group();
      const boiler = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.32, 1.35, 24),
        new THREE.MeshStandardMaterial({
          color: envId === 'subway_metro_station' ? '#38bdf8' : '#ef4444',
          roughness: 0.3,
        })
      );
      boiler.rotation.z = Math.PI / 2;
      boiler.position.set(-1.75, -0.58, -1.35);
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.82, 0.68),
        new THREE.MeshStandardMaterial({ color: '#1e3a8a', roughness: 0.35 })
      );
      cabin.position.set(-2.35, -0.45, -1.35);
      const chimney = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.09, 0.45, 16),
        new THREE.MeshStandardMaterial({ color: '#facc15' })
      );
      chimney.position.set(-1.3, -0.15, -1.35);
      trainGrp.add(boiler, cabin, chimney);
      [-2.35, -1.85, -1.35].forEach((wx) => {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.22, 0.12, 20),
          new THREE.MeshStandardMaterial({ color: '#facc15', metalness: 0.3 })
        );
        wheel.rotation.x = Math.PI / 2;
        wheel.position.set(wx, -0.92, -0.98);
        trainGrp.add(wheel);
      });
      world.add(trainGrp);
      addFluffyCloud(-1.25, 0.45, -1.35, 0.55, '#ffffff');
      addFluffyCloud(-0.95, 0.85, -1.45, 0.72, '#ffffff');
      break;
    }

    case 'carnival_ferris_park':
    case 'balloon_fiesta_sky': {
      // Giant 3D Spoked Ferris Wheel with 8 Colorful Hanging Gondolas!
      const wheelGrp = new THREE.Group();
      const rim = new THREE.Mesh(
        new THREE.TorusGeometry(1.55, 0.055, 16, 48),
        new THREE.MeshStandardMaterial({
          color: '#fde047',
          emissive: '#facc15',
          emissiveIntensity: 0.4,
        })
      );
      wheelGrp.add(rim);
      const gondolaCols = [
        '#ef4444',
        '#f97316',
        '#facc15',
        '#22c55e',
        '#06b6d4',
        '#3b82f6',
        '#a855f7',
        '#ec4899',
      ];
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        const spoke = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, 1.55, 8),
          new THREE.MeshStandardMaterial({ color: '#ffffff' })
        );
        spoke.rotation.z = ang;
        spoke.position.set(Math.cos(ang) * 0.77, Math.sin(ang) * 0.77, 0);
        const gondola = new THREE.Mesh(
          new THREE.SphereGeometry(0.19, 16, 16),
          new THREE.MeshStandardMaterial({ color: gondolaCols[i], roughness: 0.25 })
        );
        gondola.position.set(Math.cos(ang) * 1.55, Math.sin(ang) * 1.55, 0.08);
        wheelGrp.add(spoke, gondola);
      }
      wheelGrp.position.set(0, 0.55, -2.35);
      world.add(wheelGrp);
      break;
    }

    case 'submarine_deep_sea':
    case 'ocean_aquarium':
    case 'jellyfish_glow_tank':
    case 'ducky_pond_oasis': {
      // 3D Yellow Research Submarine with Portholes & Periscope + Bioluminescent Jellyfish!
      const subGrp = new THREE.Group();
      const hull = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.38, 0.95, 16, 24),
        new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 0.25 })
      );
      hull.rotation.z = Math.PI / 2;
      const conning = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.22, 0.42, 18),
        new THREE.MeshStandardMaterial({ color: '#eab308', roughness: 0.28 })
      );
      conning.position.set(0, 0.45, 0);
      [-0.32, 0, 0.32].forEach((px) => {
        const port = new THREE.Mesh(
          new THREE.CylinderGeometry(0.11, 0.11, 0.08, 16),
          new THREE.MeshStandardMaterial({
            color: '#38bdf8',
            emissive: '#22d3ee',
            emissiveIntensity: 0.6,
          })
        );
        port.rotation.x = Math.PI / 2;
        port.position.set(px, 0, 0.36);
        subGrp.add(port);
      });
      subGrp.add(hull, conning);
      subGrp.position.set(-1.95, 0.65, -1.75);
      world.add(subGrp);

      // Translucent 3D Glowing Jellyfish / Coral Columns on Right
      [
        { x: 1.85, y: 0.85, z: -1.65, col: '#f472b6' },
        { x: 2.35, y: 0.35, z: -1.35, col: '#22d3ee' },
      ].forEach((jf) => {
        const bell = new THREE.Mesh(
          new THREE.SphereGeometry(0.32, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.6),
          new THREE.MeshPhysicalMaterial({
            color: jf.col,
            emissive: jf.col,
            emissiveIntensity: 0.45,
            transparent: true,
            opacity: 0.82,
          })
        );
        bell.position.set(jf.x, jf.y, jf.z);
        world.add(bell);
      });
      addFloatingOrbs(
        [
          [-1.2, 1.1, -1.8],
          [0.8, 1.35, -1.9],
          [2.1, -0.3, -1.2],
        ],
        '#e0f2fe',
        false,
        0.13
      );
      break;
    }

    case 'dutch_tulip_windmill':
    case 'sunny_farmyard': {
      addRollingHills();
      // 3D Wooden Windmill with 4 Giant Angled Sails + Red Farm Barn!
      const millTower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.52, 1.75, 16),
        new THREE.MeshStandardMaterial({ color: '#b45309', roughness: 0.6 })
      );
      millTower.position.set(-1.95, -0.28, -1.75);
      const millCap = new THREE.Mesh(
        new THREE.ConeGeometry(0.38, 0.42, 16),
        new THREE.MeshStandardMaterial({ color: '#ef4444' })
      );
      millCap.position.set(-1.95, 0.78, -1.75);
      world.add(millTower, millCap);
      for (let i = 0; i < 4; i++) {
        const blade = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 1.45, 0.04),
          new THREE.MeshStandardMaterial({ color: '#fef3c7' })
        );
        blade.rotation.z = (i * Math.PI) / 4 + 0.35;
        blade.position.set(-1.95, 0.55, -1.4);
        world.add(blade);
      }
      // Colorful 3D Tulip Blossoms along the right side
      [1.65, 2.05, 2.45].forEach((tx, idx) => {
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.55, 10),
          new THREE.MeshStandardMaterial({ color: '#16a34a' })
        );
        stem.position.set(tx, -0.88, -1.15);
        const cup = new THREE.Mesh(
          new THREE.SphereGeometry(0.18, 16, 14),
          new THREE.MeshStandardMaterial({
            color: idx === 0 ? '#f43f5e' : idx === 1 ? '#facc15' : '#ec4899',
          })
        );
        cup.position.set(tx, -0.58, -1.15);
        world.add(stem, cup);
      });
      break;
    }

    case 'ancient_pyramid_oasis': {
      // 3D Great Golden Egyptian Pyramids & Desert Oasis Palms!
      [
        { x: -1.65, z: -2.25, s: 1.45 },
        { x: 0.25, z: -2.55, s: 1.85 },
        { x: 1.95, z: -2.15, s: 1.25 },
      ].forEach((pyr) => {
        const pMesh = new THREE.Mesh(
          new THREE.ConeGeometry(pyr.s * 0.85, pyr.s * 1.15, 4),
          new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.45 })
        );
        pMesh.rotation.y = Math.PI / 4;
        pMesh.position.set(pyr.x, -1.15 + (pyr.s * 1.15) / 2, pyr.z);
        world.add(pMesh);
      });
      break;
    }

    case 'bamboo_panda_grove':
    case 'cherry_blossom_zen':
    case 'koi_lantern_bridge': {
      // Authentic 3D Vermilion Japanese Torii Gate + Segmented Green Bamboo Stalks & Lanterns!
      const toriiMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.35 });
      [-1.15, 1.15].forEach((px) => {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 2.15, 16), toriiMat);
        pillar.position.set(px, -0.1, -2.25);
        world.add(pillar);
      });
      const topBeam = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.16, 0.22), toriiMat);
      topBeam.position.set(0, 0.95, -2.25);
      const midBeam = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.12, 0.18), toriiMat);
      midBeam.position.set(0, 0.62, -2.25);
      world.add(topBeam, midBeam);

      // Towering Green Bamboo Stalks or Sakura Trees on Left & Right
      [-2.45, -2.15, 2.15, 2.45].forEach((bx) => {
        const stalk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.07, 0.08, 2.1, 14),
          new THREE.MeshStandardMaterial({
            color: envId === 'cherry_blossom_zen' ? '#f472b6' : '#10b981',
            roughness: 0.4,
          })
        );
        stalk.position.set(bx, -0.15, -1.35);
        world.add(stalk);
      });
      addFloatingOrbs(
        [
          [-1.6, -0.85, -1.1],
          [1.6, -0.85, -1.1],
          [-0.8, 1.35, -1.8],
          [0.8, 1.35, -1.8],
        ],
        '#fde047',
        false,
        0.15
      );
      break;
    }

    case 'penguin_iceberg_bay':
    case 'crystal_ice_palace':
    case 'aurora_arctic_glow': {
      // 3D Domed Snow Igloo with Entrance Tunnel + Faceted Turquoise Icebergs & Snowman!
      const iglooDome = new THREE.Mesh(
        new THREE.SphereGeometry(0.78, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.52),
        new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.35 })
      );
      iglooDome.position.set(-1.95, -1.12, -1.45);
      const iglooTunnel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.28, 0.48, 16),
        new THREE.MeshStandardMaterial({ color: '#e0f2fe', roughness: 0.35 })
      );
      iglooTunnel.rotation.z = Math.PI / 2;
      iglooTunnel.position.set(-1.25, -0.95, -1.25);
      world.add(iglooDome, iglooTunnel);

      // Towering Faceted Crystal Ice Spires on the Right
      [1.75, 2.25, 2.55].forEach((ix, idx) => {
        const spire = new THREE.Mesh(
          new THREE.ConeGeometry(0.34, 1.45 + idx * 0.35, 6),
          new THREE.MeshPhysicalMaterial({
            color: '#38bdf8',
            emissive: '#0284c7',
            emissiveIntensity: 0.3,
            roughness: 0.15,
            transparent: true,
            opacity: 0.86,
          })
        );
        spire.position.set(ix, -0.45, -1.55);
        world.add(spire);
      });
      addGlowingArch(['#34d399', '#2dd4bf', '#38bdf8', '#a855f7'], 2.85, 0.06, -2.45);
      break;
    }

    case 'grand_piano_stage':
    case 'musical_symphony_park': {
      // Walk-On 3D Giant Piano Keyboard Floor (White & Black Keys) + Golden Harp Pipes!
      for (let k = -7; k <= 7; k++) {
        const whiteKey = new THREE.Mesh(
          new THREE.BoxGeometry(0.26, 0.06, 0.95),
          new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.2 })
        );
        whiteKey.position.set(k * 0.29, -1.14, 0.45);
        world.add(whiteKey);
        if (k % 7 !== 2 && k % 7 !== 6 && k < 7) {
          const blackKey = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.1, 0.58),
            new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.2 })
          );
          blackKey.position.set(k * 0.29 + 0.145, -1.1, 0.28);
          world.add(blackKey);
        }
      }
      // Golden Organ / Xylophone Chime Pipes in Back
      for (let p = -4; p <= 4; p++) {
        const pipe = new THREE.Mesh(
          new THREE.CylinderGeometry(0.09, 0.09, 1.85 - Math.abs(p) * 0.18, 16),
          new THREE.MeshStandardMaterial({
            color: '#facc15',
            metalness: 0.55,
            roughness: 0.2,
          })
        );
        pipe.position.set(p * 0.42, -0.25, -2.25);
        world.add(pipe);
      }
      break;
    }

    case 'storybook_library_nook':
    case 'magic_wizard_observatory':
    case 'dino_fossil_museum': {
      // Towering 3D Book Stacks / Museum Pillars + Brass Astronomical Telescope / Fossil Arch!
      [-2.35, 2.35].forEach((bx) => {
        ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'].forEach((col, i) => {
          const book = new THREE.Mesh(
            new THREE.BoxGeometry(0.65, 0.18, 0.48),
            new THREE.MeshStandardMaterial({ color: col, roughness: 0.35 })
          );
          book.position.set(bx, -1.05 + i * 0.19, -1.25);
          book.rotation.y = i * 0.15;
          world.add(book);
        });
      });
      // Brass Telescope / Arch in Backdrop
      const scopeTube = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14, 0.22, 1.15, 20),
        new THREE.MeshStandardMaterial({ color: '#f59e0b', metalness: 0.5, roughness: 0.25 })
      );
      scopeTube.rotation.z = -0.65;
      scopeTube.position.set(1.55, 0.15, -1.65);
      world.add(scopeTube);
      addFloatingOrbs(
        [
          [-1.5, 1.25, -1.8],
          [0, 1.55, -2.0],
          [1.5, 1.25, -1.8],
        ],
        '#fde047',
        true,
        0.16
      );
      break;
    }

    case 'mega_construction_zone':
    case 'brick_builder_land':
    case 'cozy_playroom':
    case 'steampunk_clockwork_tower':
    case 'robot_invention_lab': {
      // Giant 3D Yellow Tower Crane + Interlocking 3D Studded LEGO Bricks & Clockwork Gears!
      const mast = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 2.45, 0.28),
        new THREE.MeshStandardMaterial({ color: '#facc15', roughness: 0.3 })
      );
      mast.position.set(-2.15, 0.05, -1.85);
      const jib = new THREE.Mesh(
        new THREE.BoxGeometry(2.35, 0.2, 0.22),
        new THREE.MeshStandardMaterial({ color: '#f59e0b', roughness: 0.3 })
      );
      jib.position.set(-1.15, 1.18, -1.85);
      world.add(mast, jib);

      // Giant 3D Toothed Gears & Studded Bricks on Right
      [
        { x: 2.35, y: -0.92, z: -1.1, col: '#ef4444' },
        { x: 2.35, y: -0.52, z: -1.1, col: '#3b82f6' },
        { x: 1.85, y: -0.92, z: -1.3, col: '#22c55e' },
      ].forEach((b) => {
        const brick = new THREE.Mesh(
          new THREE.BoxGeometry(0.46, 0.38, 0.46),
          new THREE.MeshStandardMaterial({ color: b.col, roughness: 0.28 })
        );
        brick.position.set(b.x, b.y, b.z);
        const stud = new THREE.Mesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.09, 16),
          new THREE.MeshStandardMaterial({ color: b.col })
        );
        stud.position.set(b.x, b.y + 0.23, b.z);
        world.add(brick, stud);
      });
      break;
    }

    case 'sunny_airport_runway':
    case 'rainbow_racetrack':
    case 'fire_rescue_plaza': {
      // 3D Runway / Racetrack Dashed Centerline Stripes + Control Tower & Biplane!
      for (let s = -4; s <= 4; s++) {
        const stripe = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.02, 0.12),
          new THREE.MeshBasicMaterial({ color: '#ffffff' })
        );
        stripe.position.set(s * 0.65, -1.15, 0.42);
        world.add(stripe);
      }
      const towerStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.3, 1.65, 18),
        new THREE.MeshStandardMaterial({ color: '#e2e8f0' })
      );
      towerStem.position.set(2.25, -0.32, -1.65);
      const towerCab = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.32, 0.38, 18),
        new THREE.MeshStandardMaterial({
          color: '#38bdf8',
          emissive: '#0284c7',
          emissiveIntensity: 0.35,
        })
      );
      towerCab.position.set(2.25, 0.65, -1.65);
      world.add(towerStem, towerCab);
      addGlowingArch(['#ef4444', '#facc15', '#38bdf8'], 2.82, 0.06, -2.4);
      break;
    }

    case 'harbor_lighthouse_bay':
    case 'pirate_treasure_cove':
    case 'tropical_surf_island':
    case 'rainbow_waterpark_splash': {
      // Tall Red-and-White Striped 3D Lighthouse with Glowing Lantern + 3D Sailboat!
      ['#ef4444', '#ffffff', '#ef4444', '#ffffff'].forEach((col, idx) => {
        const seg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.28 - idx * 0.03, 0.31 - idx * 0.03, 0.45, 20),
          new THREE.MeshStandardMaterial({ color: col, roughness: 0.3 })
        );
        seg.position.set(-2.25, -0.92 + idx * 0.45, -1.55);
        world.add(seg);
      });
      const lantern = new THREE.Mesh(
        new THREE.SphereGeometry(0.24, 18, 18),
        new THREE.MeshStandardMaterial({
          color: '#fef08a',
          emissive: '#facc15',
          emissiveIntensity: 0.85,
        })
      );
      lantern.position.set(-2.25, 0.92, -1.55);
      world.add(lantern);

      // 3D Sailboat / Surfboard on the Right
      const boatHull = new THREE.Mesh(
        new THREE.BoxGeometry(0.85, 0.24, 0.38),
        new THREE.MeshStandardMaterial({ color: '#92400e' })
      );
      boatHull.position.set(2.05, -0.98, -1.35);
      const sail = new THREE.Mesh(
        new THREE.ConeGeometry(0.42, 0.95, 3),
        new THREE.MeshStandardMaterial({ color: '#ffffff' })
      );
      sail.position.set(2.05, -0.38, -1.35);
      world.add(boatHull, sail);
      break;
    }

    case 'snoezelen_sensory':
    case 'lava_lamp_chill_zone':
    case 'crystal_gem_cavern':
    case 'infinity_mirror_portal':
    case 'starlight_garden': {
      // Concentric 3D Neon Sensory Portal Rings + Illuminated Snoezelen Bubble Columns!
      const portalCols = ['#ec4899', '#a855f7', '#6366f1', '#22d3ee', '#34d399'];
      portalCols.forEach((col, idx) => {
        const ringPortal = new THREE.Mesh(
          new THREE.TorusGeometry(2.55 - idx * 0.34, 0.055, 16, 48),
          new THREE.MeshStandardMaterial({
            color: col,
            emissive: col,
            emissiveIntensity: 0.55,
            roughness: 0.15,
          })
        );
        ringPortal.position.set(0, 0.15, -2.1 - idx * 0.18);
        world.add(ringPortal);
      });
      [
        { x: -2.4, z: -1.15, col: '#a855f7' },
        { x: 2.4, z: -1.15, col: '#22d3ee' },
      ].forEach((tube) => {
        const cyl = new THREE.Mesh(
          envId === 'crystal_gem_cavern'
            ? new THREE.ConeGeometry(0.28, 1.55, 6)
            : new THREE.CylinderGeometry(0.22, 0.22, 1.55, 24),
          new THREE.MeshPhysicalMaterial({
            color: tube.col,
            emissive: tube.col,
            emissiveIntensity: 0.4,
            transparent: true,
            opacity: 0.82,
          })
        );
        cyl.position.set(tube.x, -0.4, tube.z);
        world.add(cyl);
      });
      break;
    }

    case 'honeybee_meadow_hive':
    case 'butterfly_sanctuary':
    case 'fairy_mushroom_grove':
    case 'camping_campfire_woods':
    case 'teddy_picnic_park':
    case 'puppy_agility_meadow': {
      addRollingHills();
      // 3D A-Frame Woodland Tent / Giant Toadstools + Glowing Stone-Ring Campfire / Sunflowers!
      const tent = new THREE.Mesh(
        new THREE.ConeGeometry(0.72, 1.15, 4),
        new THREE.MeshStandardMaterial({
          color: envId === 'honeybee_meadow_hive' ? '#facc15' : '#f97316',
          roughness: 0.45,
        })
      );
      tent.rotation.y = Math.PI / 4;
      tent.position.set(-2.05, -0.58, -1.45);
      const fireGlow = new THREE.Mesh(
        new THREE.ConeGeometry(0.24, 0.48, 12),
        new THREE.MeshStandardMaterial({
          color: '#facc15',
          emissive: '#ef4444',
          emissiveIntensity: 0.85,
        })
      );
      fireGlow.position.set(1.95, -0.92, -1.25);
      world.add(tent, fireGlow);
      addFloatingOrbs(
        [
          [-1.5, 0.85, -1.5],
          [1.5, 0.95, -1.5],
          [0, 1.35, -1.9],
        ],
        '#fde047',
        false,
        0.14
      );
      break;
    }

    default: {
      // Cloud Castle Kingdom & Trampoline Bounce Dome: 4 Royal Golden Turrets + Castle Wall!
      [
        { x: -2.45, z: -1.2, h: 1.15, col: meta.pedestalColor },
        { x: -1.65, z: -1.75, h: 1.45, col: meta.ringColor },
        { x: 1.65, z: -1.75, h: 1.45, col: meta.ringColor },
        { x: 2.45, z: -1.2, h: 1.15, col: meta.pedestalColor },
      ].forEach((tower) => {
        const base = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.26, tower.h, 20),
          new THREE.MeshStandardMaterial({ color: '#f8fafc', roughness: 0.3 })
        );
        base.position.set(tower.x, -1.15 + tower.h / 2, tower.z);
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(0.34, 0.62, 20),
          new THREE.MeshStandardMaterial({
            color: tower.col,
            emissive: tower.col,
            emissiveIntensity: 0.25,
          })
        );
        roof.position.set(tower.x, -1.15 + tower.h + 0.3, tower.z);
        world.add(base, roof);
      });
      addFluffyCloud(-2.2, 1.35, -2.0, 1.05, '#ffffff');
      addFluffyCloud(2.2, 1.28, -2.0, 1.0, '#ffffff');
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



