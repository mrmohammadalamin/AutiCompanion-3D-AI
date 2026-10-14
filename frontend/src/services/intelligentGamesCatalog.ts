// ============================================================================
// 20 INTELLIGENT EDUCATIONAL & DEVELOPMENTAL GAMES FOR AUTISTIC CHILDREN
// Covers 4 Core Developmental Domains (5 Games Each = 20 Games Total):
//   1. Social & Emotional Intelligence (Games 1–5)
//   2. Personal Daily Living & Independence (Games 6–10)
//   3. Communication, Language & Expressive Voice (Games 11–15)
//   4. Executive Function, Sensory Regulation & Cognitive Skills (Games 16–20)
// ============================================================================

export type DevelopmentalDomainId =
  | 'social_emotional'
  | 'personal_life'
  | 'communication_language'
  | 'cognitive_sensory';

export interface SkillBubbleChoice {
  emoji: string;
  label: string;
  color: string;
  isCorrect: boolean;
}

export interface EducationalGameRound {
  id: string;
  questionText: string; // Display text in sidebar
  spokenPromptTemplate: string; // Uses {name} for child's name
  correct: { emoji: string; label: string };
  distractors: Array<{ emoji: string; label: string }>;
  praiseTemplate: string; // Uses {name} for child's name
}

export interface IntelligentEducationalGame {
  id: string;
  gameNumber: number;
  title: string;
  emoji: string;
  domain: DevelopmentalDomainId;
  domainLabel: string;
  skillBadge: string;
  toyWinMotion: 'wave' | 'dance' | 'hug' | 'yes' | 'jump' | 'spin';
  rounds: EducationalGameRound[];
}

export const DEVELOPMENTAL_DOMAINS: Array<{
  id: 'all' | DevelopmentalDomainId;
  label: string;
  emoji: string;
}> = [
  { id: 'all', label: 'All 20 Games', emoji: '🎓' },
  { id: 'social_emotional', label: 'Social & Emotions (5)', emoji: '💖' },
  { id: 'personal_life', label: 'Personal & Life (5)', emoji: '🪥' },
  { id: 'communication_language', label: 'Speech & Words (5)', emoji: '🗣️' },
  { id: 'cognitive_sensory', label: 'Mind & Calm (5)', emoji: '🧠' },
];

export const INTELLIGENT_20_GAMES_CATALOG: IntelligentEducationalGame[] = [
  // ==========================================================================
  // DOMAIN 1: SOCIAL & EMOTIONAL INTELLIGENCE (GAMES 1–5)
  // ==========================================================================
  {
    id: 'game_01_emotion_mirror',
    gameNumber: 1,
    title: '1. Emotion Mirror & Face Match',
    emoji: '😊',
    domain: 'social_emotional',
    domainLabel: '💖 Social & Emotions',
    skillBadge: 'Recognizing Feelings & Facial Cues',
    toyWinMotion: 'hug',
    rounds: [
      {
        id: 'em_1',
        questionText: 'Which face shows feeling HAPPY and smiling?',
        spokenPromptTemplate:
          'Hi {name}! Which bubble shows a happy smiling face? Let’s pop it together!',
        correct: { emoji: '😊', label: 'Happy' },
        distractors: [
          { emoji: '😢', label: 'Sad' },
          { emoji: '😠', label: 'Angry' },
          { emoji: '😴', label: 'Sleepy' },
        ],
        praiseTemplate: 'Yay {name}! That smiling face is happy, just like us playing together!',
      },
      {
        id: 'em_2',
        questionText: 'When we feel overwhelmed or loud, which face shows CALM and peaceful?',
        spokenPromptTemplate:
          '{name}, which bubble shows a calm, peaceful face taking a gentle breath?',
        correct: { emoji: '😌', label: 'Calm' },
        distractors: [
          { emoji: '😱', label: 'Scared' },
          { emoji: '😤', label: 'Frustrated' },
          { emoji: '🤪', label: 'Silly' },
        ],
        praiseTemplate: 'So sweet {name}! Feeling calm and peaceful helps our body relax!',
      },
      {
        id: 'em_3',
        questionText: 'Which face shows feeling SURPRISED by a fun magic trick?',
        spokenPromptTemplate: '{name}, can you find the surprised face that says Ohh Wow?',
        correct: { emoji: '😮', label: 'Surprised' },
        distractors: [
          { emoji: '😴', label: 'Tired' },
          { emoji: '😢', label: 'Crying' },
          { emoji: '😠', label: 'Mad' },
        ],
        praiseTemplate: 'Woohoo {name}! Ooooh, you found the surprised face!',
      },
    ],
  },
  {
    id: 'game_02_turn_taking_share',
    gameNumber: 2,
    title: '2. Turn-Taking & Sharing Bestie',
    emoji: '🤝',
    domain: 'social_emotional',
    domainLabel: '💖 Social & Emotions',
    skillBadge: 'Cooperative Turn-Taking & Sharing',
    toyWinMotion: 'wave',
    rounds: [
      {
        id: 'tt_1',
        questionText: 'If we both want to play with the toy ball, what is the kindest choice?',
        spokenPromptTemplate:
          '{name}, if we both want the ball, what should we do together?',
        correct: { emoji: '🤝', label: 'Take Turns' },
        distractors: [
          { emoji: '🙈', label: 'Hide It' },
          { emoji: '💢', label: 'Grab It' },
          { emoji: '🏃', label: 'Run Away' },
        ],
        praiseTemplate: 'Yay {name}! Taking turns means my turn, then your turn—so much fun!',
      },
      {
        id: 'tt_2',
        questionText: 'Your friend has no crayons to draw. What can we do to be a good friend?',
        spokenPromptTemplate: '{name}, our friend needs a crayon to draw! What can we do?',
        correct: { emoji: '🖍️', label: 'Share Crayons' },
        distractors: [
          { emoji: '🚫', label: 'Say No' },
          { emoji: '📦', label: 'Lock Box' },
          { emoji: '😴', label: 'Go Sleep' },
        ],
        praiseTemplate: 'Aww {name}, sharing crayons makes drawing together twice as fun!',
      },
    ],
  },
  {
    id: 'game_03_greetings_manners',
    gameNumber: 3,
    title: '3. Friendly Greetings & Polite Words',
    emoji: '👋',
    domain: 'social_emotional',
    domainLabel: '💖 Social & Emotions',
    skillBadge: 'Social Greetings & Polite Conversation',
    toyWinMotion: 'wave',
    rounds: [
      {
        id: 'gm_1',
        questionText: 'When we meet a friend in the morning, what do we do?',
        spokenPromptTemplate: 'Hi {name}! When we see a friend, which friendly greeting do we use?',
        correct: { emoji: '👋', label: 'Wave Hi!' },
        distractors: [
          { emoji: '🚪', label: 'Close Door' },
          { emoji: '🙈', label: 'Turn Back' },
          { emoji: '😠', label: 'Frown' },
        ],
        praiseTemplate: 'Hi-hi {name}! Waving hello is the sweetest way to greet a friend!',
      },
      {
        id: 'gm_2',
        questionText: 'When someone gives us a yummy snack or helps us, what magic word do we say?',
        spokenPromptTemplate: '{name}, when someone helps us, what sweet polite word do we say?',
        correct: { emoji: '💖', label: 'Thank You' },
        distractors: [
          { emoji: '🔇', label: 'Nothing' },
          { emoji: '😤', label: 'Go Away' },
          { emoji: '🛑', label: 'Stop' },
        ],
        praiseTemplate: 'Yay {name}! Saying Thank You makes everyone smile!',
      },
    ],
  },
  {
    id: 'game_04_empathy_kindness',
    gameNumber: 4,
    title: '4. Kindness & Helping Friends',
    emoji: '🤗',
    domain: 'social_emotional',
    domainLabel: '💖 Social & Emotions',
    skillBadge: 'Empathy, Comforting & Helping Others',
    toyWinMotion: 'hug',
    rounds: [
      {
        id: 'ek_1',
        questionText: 'Little Bunny dropped her ice cream and feels sad 😢. How can we comfort her?',
        spokenPromptTemplate:
          '{name}, Little Bunny feels sad! Which bubble helps comfort our friend?',
        correct: { emoji: '🤗', label: 'Gentle Hug' },
        distractors: [
          { emoji: '😂', label: 'Laugh' },
          { emoji: '🔊', label: 'Shout Loud' },
          { emoji: '🏃', label: 'Walk Past' },
        ],
        praiseTemplate: 'You have the kindest heart, {name}! A gentle hug helps friends feel loved!',
      },
      {
        id: 'ek_2',
        questionText: 'It is raining and Teddy has no umbrella 🌧️. How can we help Teddy?',
        spokenPromptTemplate: '{name}, it’s raining on Teddy! What can we share with him?',
        correct: { emoji: '☂️', label: 'Share Umbrella' },
        distractors: [
          { emoji: '💦', label: 'Splash Puddle' },
          { emoji: '🕶️', label: 'Sunglasses' },
          { emoji: '🎈', label: 'Balloon' },
        ],
        praiseTemplate: 'Hooray {name}! Sharing an umbrella keeps both friends dry and cozy!',
      },
    ],
  },
  {
    id: 'game_05_personal_space',
    gameNumber: 5,
    title: '5. Personal Space & Safe Boundaries',
    emoji: '🫧',
    domain: 'social_emotional',
    domainLabel: '💖 Social & Emotions',
    skillBadge: 'Comfortable Space & Asking Permission',
    toyWinMotion: 'yes',
    rounds: [
      {
        id: 'ps_1',
        questionText: 'Before giving a friend a big hug, what is the best thing to do first?',
        spokenPromptTemplate:
          '{name}, before we hug a friend, what polite thing should we do first?',
        correct: { emoji: '🙋', label: 'Ask First' },
        distractors: [
          { emoji: '🏃', label: 'Tackle Fast' },
          { emoji: '📢', label: 'Yell Loud' },
          { emoji: '🙈', label: 'Grab Arm' },
        ],
        praiseTemplate: 'Awesome job {name}! Asking "Can I have a hug?" respects everyone’s space!',
      },
      {
        id: 'ps_2',
        questionText: 'When talking to a friend, how close should we stand?',
        spokenPromptTemplate: '{name}, what is a comfortable space when talking to a friend?',
        correct: { emoji: '🫧', label: 'Comfy Bubble' },
        distractors: [
          { emoji: '👃', label: 'Too Close' },
          { emoji: '🏔️', label: 'Mile Away' },
          { emoji: '🤸', label: 'On Top' },
        ],
        praiseTemplate: 'Yes {name}! Standing one comfy arm-bubble apart feels nice and safe!',
      },
    ],
  },

  // ==========================================================================
  // DOMAIN 2: PERSONAL DAILY LIVING & INDEPENDENCE (GAMES 6–10)
  // ==========================================================================
  {
    id: 'game_06_morning_routine',
    gameNumber: 6,
    title: '6. Morning Routine Sequencer',
    emoji: '🪥',
    domain: 'personal_life',
    domainLabel: '🪥 Personal & Life Skills',
    skillBadge: 'Daily Hygiene & Morning Independence',
    toyWinMotion: 'jump',
    rounds: [
      {
        id: 'mr_1',
        questionText: 'When we wake up in the morning, what keeps our teeth sparkling clean?',
        spokenPromptTemplate:
          'Good morning {name}! Which bubble do we use to brush our teeth clean?',
        correct: { emoji: '🪥', label: 'Toothbrush' },
        distractors: [
          { emoji: '🥄', label: 'Soup Spoon' },
          { emoji: '🖍️', label: 'Crayon' },
          { emoji: '🧦', label: 'Fuzzy Sock' },
        ],
        praiseTemplate: 'Brush-brush-brush {name}! Your teeth are sparkling like stars!',
      },
      {
        id: 'mr_2',
        questionText: 'Before we eat our yummy breakfast, what should we wash our hands with?',
        spokenPromptTemplate: '{name}, before we eat, what do we use with water to wash our hands?',
        correct: { emoji: '🧼', label: 'Bubbly Soap' },
        distractors: [
          { emoji: '泥', label: 'Mud' },
          { emoji: '🎨', label: 'Paint' },
          { emoji: '🧸', label: 'Plush Toy' },
        ],
        praiseTemplate: 'Yay {name}! Washing hands with bubbly soap keeps us healthy and strong!',
      },
    ],
  },
  {
    id: 'game_07_healthy_food',
    gameNumber: 7,
    title: '7. Healthy Food & Yummy Plate',
    emoji: '🍎',
    domain: 'personal_life',
    domainLabel: '🪥 Personal & Life Skills',
    skillBadge: 'Healthy Nutrition & Trying Foods',
    toyWinMotion: 'dance',
    rounds: [
      {
        id: 'hf_1',
        questionText: 'Which crunchy red fruit gives our body healthy energy to play?',
        spokenPromptTemplate: '{name}, can you pop the healthy red fruit that gives us energy?',
        correct: { emoji: '🍎', label: 'Sweet Apple' },
        distractors: [
          { emoji: '🪨', label: 'Hard Rock' },
          { emoji: '👟', label: 'Sneaker' },
          { emoji: '📎', label: 'Paperclip' },
        ],
        praiseTemplate: 'Yum-yum {name}! Crunch! Apples are so sweet and healthy!',
      },
      {
        id: 'hf_2',
        questionText: 'When we feel thirsty after jumping and dancing, what is the best drink?',
        spokenPromptTemplate: '{name}, after we jump and play, what is the best drink for our body?',
        correct: { emoji: '💧', label: 'Fresh Water' },
        distractors: [
          { emoji: '🌶️', label: 'Hot Sauce' },
          { emoji: '🧴', label: 'Shampoo' },
          { emoji: '🧂', label: 'Salty Sand' },
        ],
        praiseTemplate: 'Refreshing {name}! Drinking cool water keeps us feeling great!',
      },
    ],
  },
  {
    id: 'game_08_dress_for_weather',
    gameNumber: 8,
    title: '8. Weather & Dress-Up Choice',
    emoji: '🧥',
    domain: 'personal_life',
    domainLabel: '🪥 Personal & Life Skills',
    skillBadge: 'Dressing Appropriately for Weather',
    toyWinMotion: 'spin',
    rounds: [
      {
        id: 'dw_1',
        questionText: 'Look outside—it is SNOWING and cold ❄️! What should we wear to stay warm?',
        spokenPromptTemplate:
          'Brrr {name}, it is snowy and cold! Which warm item should we wear?',
        correct: { emoji: '🧥', label: 'Warm Coat' },
        distractors: [
          { emoji: '🩱', label: 'Swimsuit' },
          { emoji: '🩴', label: 'Flip-Flops' },
          { emoji: '🪭', label: 'Paper Fan' },
        ],
        praiseTemplate: 'Cozy choice {name}! A warm coat keeps us snuggly in the snow!',
      },
      {
        id: 'dw_2',
        questionText: 'It is a bright SUNNY day at the park ☀️! What protects our head and eyes?',
        spokenPromptTemplate: '{name}, on a bright sunny day, what can we wear on our head?',
        correct: { emoji: '🧢', label: 'Sun Hat' },
        distractors: [
          { emoji: '🧣', label: 'Wool Scarf' },
          { emoji: '🧤', label: 'Snow Mittens' },
          { emoji: '🛌', label: 'Blanket' },
        ],
        praiseTemplate: 'Super cool {name}! A sun hat keeps the bright sun out of our eyes!',
      },
    ],
  },
  {
    id: 'game_09_tidy_up_sorter',
    gameNumber: 9,
    title: '9. Clean-Up & Toy Sorting',
    emoji: '🧺',
    domain: 'personal_life',
    domainLabel: '🪥 Personal & Life Skills',
    skillBadge: 'Organization, Sorting & Clean-Up Habits',
    toyWinMotion: 'yes',
    rounds: [
      {
        id: 'tu_1',
        questionText: 'Playtime is done and blocks are on the floor. Where do we put our toys?',
        spokenPromptTemplate:
          '{name}, when playtime is finished, where do we put our toys so nobody trips?',
        correct: { emoji: '🧺', label: 'Toy Basket' },
        distractors: [
          { emoji: '🛁', label: 'Bathtub' },
          { emoji: '🗑️', label: 'Trash Can' },
          { emoji: '🍲', label: 'Soup Pot' },
        ],
        praiseTemplate: 'Yay {name}! Putting toys in the toy basket makes our room neat and safe!',
      },
      {
        id: 'tu_2',
        questionText: 'Where do our storybooks belong when we finish reading?',
        spokenPromptTemplate: '{name}, where do we put our storybooks after reading?',
        correct: { emoji: '📚', label: 'Bookshelf' },
        distractors: [
          { emoji: '👟', label: 'Shoe Rack' },
          { emoji: '🧊', label: 'Freezer' },
          { emoji: '🌧️', label: 'Outside' },
        ],
        praiseTemplate: 'Smart sorting {name}! Our books look so tidy on the bookshelf!',
      },
    ],
  },
  {
    id: 'game_10_body_self_care',
    gameNumber: 10,
    title: '10. Body Parts & Self-Care Check',
    emoji: '👟',
    domain: 'personal_life',
    domainLabel: '🪥 Personal & Life Skills',
    skillBadge: 'Body Awareness & Self-Care Matching',
    toyWinMotion: 'jump',
    rounds: [
      {
        id: 'bs_1',
        questionText: 'Before we go outside to walk and run, what do we put on our FEET?',
        spokenPromptTemplate: '{name}, what do we put on our two feet before going outside?',
        correct: { emoji: '👟', label: 'Comfy Shoes' },
        distractors: [
          { emoji: '🎩', label: 'Top Hat' },
          { emoji: '👓', label: 'Glasses' },
          { emoji: '🎧', label: 'Headphones' },
        ],
        praiseTemplate: 'Stomp-stomp {name}! Comfy shoes go right on our feet!',
      },
      {
        id: 'bs_2',
        questionText: 'If noises are too loud for our EARS, what helpful tool can we wear?',
        spokenPromptTemplate:
          '{name}, if sounds feel too loud for our ears, what cozy helper can we wear?',
        correct: { emoji: '🎧', label: 'Cozy Earphones' },
        distractors: [
          { emoji: '🧦', label: 'Socks' },
          { emoji: '🥄', label: 'Spoon' },
          { emoji: '🧤', label: 'Gloves' },
        ],
        praiseTemplate: 'Great self-care {name}! Cozy earphones protect our ears when it’s loud!',
      },
    ],
  },

  // ==========================================================================
  // DOMAIN 3: COMMUNICATION, LANGUAGE & EXPRESSIVE VOICE (GAMES 11–15)
  // ==========================================================================
  {
    id: 'game_11_express_needs',
    gameNumber: 11,
    title: '11. I Need / Expressive Choice Board',
    emoji: '🗣️',
    domain: 'communication_language',
    domainLabel: '🗣️ Speech & Language',
    skillBadge: 'Expressing Needs, Breaks & Asking for Help',
    toyWinMotion: 'hug',
    rounds: [
      {
        id: 'en_1',
        questionText: 'If a puzzle is tricky and you feel stuck, what can you say or tap?',
        spokenPromptTemplate:
          '{name}, if something is tricky to open or solve, what can you ask me?',
        correct: { emoji: '🙋', label: 'Help Please' },
        distractors: [
          { emoji: '💥', label: 'Throw It' },
          { emoji: '😭', label: 'Give Up' },
          { emoji: '🙈', label: 'Hide' },
        ],
        praiseTemplate: 'I love how you asked, {name}! Saying "Help please" is super brave!',
      },
      {
        id: 'en_2',
        questionText: 'If you feel tired and need a quiet rest from playing, what can you tell us?',
        spokenPromptTemplate: '{name}, if you want a little quiet rest, which bubble tells us?',
        correct: { emoji: '🛋️', label: 'Break Please' },
        distractors: [
          { emoji: '🔊', label: 'Scream' },
          { emoji: '🏃', label: 'Run Off' },
          { emoji: '💢', label: 'Push' },
        ],
        praiseTemplate: 'Awesome communicating {name}! You can ask for a cozy break anytime!',
      },
    ],
  },
  {
    id: 'game_12_phonics_letter_pop',
    gameNumber: 12,
    title: '12. First Letter & Phonics Sound Pop',
    emoji: '🔤',
    domain: 'communication_language',
    domainLabel: '🗣️ Speech & Language',
    skillBadge: 'Phonics, Letter Sounds & Early Reading',
    toyWinMotion: 'jump',
    rounds: [
      {
        id: 'pl_1',
        questionText: 'Which cute animal starts with the letter B ("Buh-Buh-Bear")?',
        spokenPromptTemplate: '{name}, which bubble starts with the letter B—Buh, Buh, Bear?',
        correct: { emoji: '🧸', label: 'B - Bear' },
        distractors: [
          { emoji: '🐱', label: 'C - Cat' },
          { emoji: '🐸', label: 'F - Frog' },
          { emoji: '🦁', label: 'L - Lion' },
        ],
        praiseTemplate: 'Buh-Buh-Bear! Fantastic phonics, {name}!',
      },
      {
        id: 'pl_2',
        questionText: 'Which shining object in the sky starts with the letter S ("Sss-Star")?',
        spokenPromptTemplate: '{name}, can you find the bubble that starts with S—Sss, Star?',
        correct: { emoji: '⭐', label: 'S - Star' },
        distractors: [
          { emoji: '🌙', label: 'M - Moon' },
          { emoji: '🌳', label: 'T - Tree' },
          { emoji: '🦆', label: 'D - Duck' },
        ],
        praiseTemplate: 'Sss-Star! You are a reading superstar, {name}!',
      },
    ],
  },
  {
    id: 'game_13_action_verbs',
    gameNumber: 13,
    title: '13. Action Verbs & Doing Words',
    emoji: '🦘',
    domain: 'communication_language',
    domainLabel: '🗣️ Speech & Language',
    skillBadge: 'Action Words (Verbs) & Body Movement',
    toyWinMotion: 'dance',
    rounds: [
      {
        id: 'av_1',
        questionText: 'Which bubble shows the action word JUMPING up high?',
        spokenPromptTemplate: '{name}, which bubble shows the action word JUMP? Let’s jump too!',
        correct: { emoji: '🦘', label: 'Jump!' },
        distractors: [
          { emoji: '😴', label: 'Sleep' },
          { emoji: '📖', label: 'Read' },
          { emoji: '🍽️', label: 'Eat' },
        ],
        praiseTemplate: 'Boing-boing {name}! We jumped up high together!',
      },
      {
        id: 'av_2',
        questionText: 'Which bubble shows the action word CLAPPING our hands?',
        spokenPromptTemplate: '{name}, can you find the bubble for CLAP hands?',
        correct: { emoji: '👏', label: 'Clap Hands' },
        distractors: [
          { emoji: '🏊', label: 'Swim' },
          { emoji: '🛌', label: 'Nap' },
          { emoji: '✍️', label: 'Write' },
        ],
        praiseTemplate: 'Clap-clap-clap {name}! Hooray for your awesome action words!',
      },
    ],
  },
  {
    id: 'game_14_wh_questions',
    gameNumber: 14,
    title: '14. Wh- Questions Detective (Who/What/Where)',
    emoji: '🔍',
    domain: 'communication_language',
    domainLabel: '🗣️ Speech & Language',
    skillBadge: 'Answering Who, What & Where Questions',
    toyWinMotion: 'yes',
    rounds: [
      {
        id: 'wh_1',
        questionText: 'WHO drives a big red fire truck and helps put out fires?',
        spokenPromptTemplate: 'Detective {name}, WHO drives a fire truck and helps people?',
        correct: { emoji: '👩‍🚒', label: 'Firefighter' },
        distractors: [
          { emoji: '⛄', label: 'Snowman' },
          { emoji: '🐧', label: 'Penguin' },
          { emoji: '🎸', label: 'Guitar' },
        ],
        praiseTemplate: 'Bingo {name}! The firefighter drives the fire truck!',
      },
      {
        id: 'wh_2',
        questionText: 'WHERE do fish and dolphins swim and live?',
        spokenPromptTemplate: '{name}, WHERE do fish and dolphins swim?',
        correct: { emoji: '🌊', label: 'Blue Ocean' },
        distractors: [
          { emoji: '🏜️', label: 'Dry Desert' },
          { emoji: '🛋️', label: 'Sofa' },
          { emoji: '🎒', label: 'Backpack' },
        ],
        praiseTemplate: 'Splash {name}! Fish and dolphins swim in the blue ocean!',
      },
    ],
  },
  {
    id: 'game_15_opposites_match',
    gameNumber: 15,
    title: '15. Opposites Explorer (Big/Small, Hot/Cold)',
    emoji: '⚖️',
    domain: 'communication_language',
    domainLabel: '🗣️ Speech & Language',
    skillBadge: 'Descriptive Concepts & Opposites',
    toyWinMotion: 'spin',
    rounds: [
      {
        id: 'op_1',
        questionText: 'The sun is HOT ☀️. What is the opposite of hot—something very COLD?',
        spokenPromptTemplate: '{name}, the sun is hot! Which bubble is the opposite—super COLD?',
        correct: { emoji: '🧊', label: 'Cold Ice' },
        distractors: [
          { emoji: '🔥', label: 'Campfire' },
          { emoji: '☕', label: 'Hot Cocoa' },
          { emoji: '🌋', label: 'Volcano' },
        ],
        praiseTemplate: 'Brrr {name}! Cold ice is the opposite of hot!',
      },
      {
        id: 'op_2',
        questionText: 'A mouse is tiny and SMALL 🐭. Which animal is the opposite—very BIG?',
        spokenPromptTemplate: '{name}, a mouse is small! Which animal is the opposite—super BIG?',
        correct: { emoji: '🐘', label: 'Big Elephant' },
        distractors: [
          { emoji: '🐜', label: 'Tiny Ant' },
          { emoji: '🐝', label: 'Little Bee' },
          { emoji: '🐞', label: 'Ladybug' },
        ],
        praiseTemplate: 'Whoa {name}! The big elephant is the opposite of tiny!',
      },
    ],
  },

  // ==========================================================================
  // DOMAIN 4: EXECUTIVE FUNCTION, SENSORY REGULATION & COGNITIVE (GAMES 16–20)
  // ==========================================================================
  {
    id: 'game_16_pattern_builder',
    gameNumber: 16,
    title: '16. Pattern & Sequence Builder',
    emoji: '🧩',
    domain: 'cognitive_sensory',
    domainLabel: '🧠 Mind & Sensory Calm',
    skillBadge: 'Logical Patterns & Working Memory',
    toyWinMotion: 'jump',
    rounds: [
      {
        id: 'pb_1',
        questionText: 'Complete the pattern: ⭐ 🌙 ⭐ 🌙 ⭐ ... What comes next?',
        spokenPromptTemplate:
          '{name}, look at our pattern: Star, Moon, Star, Moon, Star! What comes next?',
        correct: { emoji: '🌙', label: 'Moon' },
        distractors: [
          { emoji: '🚗', label: 'Car' },
          { emoji: '🥦', label: 'Broccoli' },
          { emoji: '👟', label: 'Shoe' },
        ],
        praiseTemplate: 'Brilliant pattern thinking, {name}! Moon comes next!',
      },
      {
        id: 'pb_2',
        questionText: 'Complete the pattern: 🍎 🍌 🍎 🍌 🍎 ... What comes next?',
        spokenPromptTemplate:
          '{name}, Apple, Banana, Apple, Banana, Apple! Which fruit comes next?',
        correct: { emoji: '🍌', label: 'Banana' },
        distractors: [
          { emoji: '🎈', label: 'Balloon' },
          { emoji: '🦖', label: 'Dino' },
          { emoji: '⏰', label: 'Clock' },
        ],
        praiseTemplate: 'Yay {name}! You solved the fruit pattern like a genius!',
      },
    ],
  },
  {
    id: 'game_17_shape_color_hunt',
    gameNumber: 17,
    title: '17. Shape & Color Treasure Hunt',
    emoji: '🔶',
    domain: 'cognitive_sensory',
    domainLabel: '🧠 Mind & Sensory Calm',
    skillBadge: 'Visual Discrimination of Shapes & Colors',
    toyWinMotion: 'spin',
    rounds: [
      {
        id: 'sc_1',
        questionText: 'Can you find the round RED CIRCLE bubble?',
        spokenPromptTemplate: '{name}, let’s go on a treasure hunt! Can you pop the Red Circle?',
        correct: { emoji: '🔴', label: 'Red Circle' },
        distractors: [
          { emoji: '🟦', label: 'Blue Square' },
          { emoji: '🔺', label: 'Triangle' },
          { emoji: '🟩', label: 'Green Box' },
        ],
        praiseTemplate: 'Treasure found, {name}! That’s the round red circle!',
      },
      {
        id: 'sc_2',
        questionText: 'Can you find the sparkling GOLDEN STAR shape?',
        spokenPromptTemplate: '{name}, where is the sparkling Golden Star shape?',
        correct: { emoji: '⭐', label: 'Gold Star' },
        distractors: [
          { emoji: '⬛', label: 'Black Square' },
          { emoji: '🟣', label: 'Purple Dot' },
          { emoji: '🔶', label: 'Diamond' },
        ],
        praiseTemplate: 'Twinkle-twinkle {name}! You popped the golden star!',
      },
    ],
  },
  {
    id: 'game_18_calm_breathing',
    gameNumber: 18,
    title: '18. Calm Breathing & Sensory Thermometer',
    emoji: '🌸',
    domain: 'cognitive_sensory',
    domainLabel: '🧠 Mind & Sensory Calm',
    skillBadge: 'Emotional Self-Regulation & Mindful Breathing',
    toyWinMotion: 'hug',
    rounds: [
      {
        id: 'cb_1',
        questionText: 'When we feel big feelings inside, what is Step 1 of flower breathing?',
        spokenPromptTemplate:
          '{name}, let’s practice calm breathing together! First, what do we smell gently?',
        correct: { emoji: '🌸', label: 'Smell Flower' },
        distractors: [
          { emoji: '💢', label: 'Stomp Loud' },
          { emoji: '📢', label: 'Shout Fast' },
          { emoji: '🏃', label: 'Rush Around' },
        ],
        praiseTemplate: 'Breathe in slowly {name}... smelling the sweet flower feels so peaceful!',
      },
      {
        id: 'cb_2',
        questionText: 'Now for Step 2: how do we breathe out slowly and gently?',
        spokenPromptTemplate: '{name}, now how do we breathe out nice and slow?',
        correct: { emoji: '🫧', label: 'Blow Bubble' },
        distractors: [
          { emoji: '😤', label: 'Hold Breath' },
          { emoji: '⚡', label: 'Shake Fast' },
          { emoji: '🥁', label: 'Bang Drum' },
        ],
        praiseTemplate: 'Whoooosh {name}! Blowing a slow bubble makes our whole body feel calm!',
      },
    ],
  },
  {
    id: 'game_19_animal_habitat',
    gameNumber: 19,
    title: '19. Animal Sounds & Habitat Match',
    emoji: '🦁',
    domain: 'cognitive_sensory',
    domainLabel: '🧠 Mind & Sensory Calm',
    skillBadge: 'Nature Knowledge, Auditory Associations & Categorization',
    toyWinMotion: 'dance',
    rounds: [
      {
        id: 'ah_1',
        questionText: 'Which friendly farm animal says "MOOOO" and gives us milk?',
        spokenPromptTemplate: '{name}, which friendly animal says Moooo?',
        correct: { emoji: '🐮', label: 'Moo Cow' },
        distractors: [
          { emoji: '🐍', label: 'Hiss Snake' },
          { emoji: '🐸', label: 'Ribbit Frog' },
          { emoji: '🐝', label: 'Buzz Bee' },
        ],
        praiseTemplate: 'Moooo! Hehe {name}, you found the friendly cow!',
      },
      {
        id: 'ah_2',
        questionText: 'Which cute bird says "QUACK-QUACK" and loves swimming in the pond?',
        spokenPromptTemplate: '{name}, who says Quack-Quack and paddles in the water?',
        correct: { emoji: '🦆', label: 'Quack Duck' },
        distractors: [
          { emoji: '🐱', label: 'Meow Kitty' },
          { emoji: '🐶', label: 'Woof Puppy' },
          { emoji: '🐴', label: 'Neigh Horse' },
        ],
        praiseTemplate: 'Quack-quack {name}! Look at the little duck swimming happily!',
      },
    ],
  },
  {
    id: 'game_20_safety_choices',
    gameNumber: 20,
    title: '20. Safe vs. Careful Everyday Choices',
    emoji: '🚦',
    domain: 'cognitive_sensory',
    domainLabel: '🧠 Mind & Sensory Calm',
    skillBadge: 'Personal Safety Awareness in Daily Life',
    toyWinMotion: 'yes',
    rounds: [
      {
        id: 'sf_1',
        questionText: 'Before crossing the street outside, what safe thing do we always do?',
        spokenPromptTemplate:
          '{name}, when we cross the street outside, what keeps us safe?',
        correct: { emoji: '🤝', label: 'Hold Adult Hand' },
        distractors: [
          { emoji: '🙈', label: 'Close Eyes' },
          { emoji: '🏃', label: 'Dash Alone' },
          { emoji: '🛹', label: 'Roll Into Road' },
        ],
        praiseTemplate: 'Super safe choice, {name}! Holding a grown-up’s hand keeps us safe!',
      },
      {
        id: 'sf_2',
        questionText: 'At the crosswalk light, which color light means it is SAFE to walk?',
        spokenPromptTemplate: '{name}, which traffic light color tells us it is safe to walk?',
        correct: { emoji: '🟢', label: 'Green Walk' },
        distractors: [
          { emoji: '🛑', label: 'Red Stop' },
          { emoji: '🔥', label: 'Hot Stove' },
          { emoji: '⚡', label: 'Wire Plug' },
        ],
        praiseTemplate: 'Hooray {name}! Green means safe to walk, and Red means stop and wait!',
      },
    ],
  },
];
