export interface PrankDef {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  emoji: string;
  gradient: string;
  accent: string;
  cardEmoji: string;
  cardArt: string; // big emoji art for card
  difficulty: "Easy" | "Medium" | "Spicy";
  duration: string;
  rating: number;
  baseViews: number;
  baseLaughs: number;
  instructions: string[];
  tags: string[];
}

export const CATEGORIES = [
  { slug: "sounds", name: "Sounds & Audio", emoji: "🔊", description: "Loud, silly and unexpected sounds", color: "from-violet-500 to-purple-700" },
  { slug: "scary", name: "Scary & Shock", emoji: "👻", description: "Jump scares and fake danger", color: "from-slate-700 to-slate-900" },
  { slug: "cute", name: "Cute & Love", emoji: "💖", description: "Wholesome pranks for friends & crushes", color: "from-pink-500 to-rose-600" },
  { slug: "trick", name: "Trick Buttons", emoji: "🔘", description: "Buttons you definitely shouldn't press", color: "from-teal-500 to-emerald-600" },
  { slug: "meme", name: "Memes & Weird", emoji: "🤪", description: "Absurd humor and weird videos", color: "from-amber-500 to-orange-600" },
  { slug: "fake", name: "Fake Screens", emoji: "💻", description: "Fake errors, viruses & glitches", color: "from-blue-600 to-slate-800" },
];

export const PRANKS: PrankDef[] = [
  {
    slug: "funny-sound",
    title: "Funny Sound",
    description: "Open and enjoy a sudden funny sound!",
    longDescription: "A soundboard of chaos! Air horns, farts, sad trombones and more. Perfect for surprising friends — just hit a button and watch them jump. Use headphones responsibly... or irresponsibly.",
    category: "sounds",
    emoji: "🔊",
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    accent: "#8b5cf6",
    cardEmoji: "🐱",
    cardArt: "🔊",
    difficulty: "Easy",
    duration: "30 sec",
    rating: 4.9,
    baseViews: 48210,
    baseLaughs: 31204,
    instructions: ["Pick any sound button", "Turn volume up (you know you want to)", "Press and enjoy the chaos", "Share the best reaction"],
    tags: ["soundboard", "loud", "fart", "airhorn", "party"],
  },
  {
    slug: "mystery-gift",
    title: "Mystery Gift",
    description: "Click to see what surprise is inside!",
    longDescription: "What's in the box?! Tap the gift to unwrap a totally random surprise — it could be wholesome, weird, or wildly funny. No two openings are the same. Feeling lucky?",
    category: "cute",
    emoji: "🎁",
    gradient: "from-pink-600 via-rose-500 to-red-500",
    accent: "#ec4899",
    cardEmoji: "🎁",
    cardArt: "🎁",
    difficulty: "Easy",
    duration: "1 min",
    rating: 4.8,
    baseViews: 39580,
    baseLaughs: 27410,
    instructions: ["Tap the gift box to shake it", "Tap again to open it", "Collect your surprise", "Open again for a new one"],
    tags: ["gift", "surprise", "random", "confetti"],
  },
  {
    slug: "funny-meme",
    title: "Funny Meme",
    description: "Wait for it... You'll laugh!",
    longDescription: "An endless slot machine of premium memes. Spin for doge wisdom, cat logic, and cursed advice animals. Warning: side effects include snorting and sending screenshots to the group chat.",
    category: "meme",
    emoji: "😎",
    gradient: "from-amber-400 via-orange-500 to-yellow-500",
    accent: "#f59e0b",
    cardEmoji: "🐶",
    cardArt: "😎",
    difficulty: "Easy",
    duration: "2 min",
    rating: 4.9,
    baseViews: 52140,
    baseLaughs: 41020,
    instructions: ["Hit 'Next Meme' to spin", "Vote: LOL or MEH", "Build your LOL streak", "Share the bangers"],
    tags: ["meme", "doge", "funny", "random"],
  },
  {
    slug: "jump-scare",
    title: "Jump Scare",
    description: "Not for the weak at heart!",
    longDescription: "The classic. Stare at the screen, follow the instructions, concentrate... and then — BOO! Best sent to a friend with the volume up. PrankHub is not responsible for dropped phones.",
    category: "scary",
    emoji: "👻",
    gradient: "from-slate-800 via-slate-900 to-black",
    accent: "#64748b",
    cardEmoji: "👻",
    cardArt: "👹",
    difficulty: "Spicy",
    duration: "45 sec",
    rating: 4.7,
    baseViews: 61800,
    baseLaughs: 28900,
    instructions: ["Turn volume up", "Stare closely at the maze/dot", "Wait for it...", "Try not to scream (you will)"],
    tags: ["scary", "scream", "maze", "shock"],
  },
  {
    slug: "love-prank",
    title: "Love Prank",
    description: "Share this link with someone special!",
    longDescription: "Send this to your crush, partner, or bestie. A sweet love calculator asks one big question... and the 'No' button is a little shy. Spoiler: love always wins here.",
    category: "cute",
    emoji: "💖",
    gradient: "from-pink-400 via-pink-500 to-fuchsia-500",
    accent: "#ec4899",
    cardEmoji: "🧸",
    cardArt: "💘",
    difficulty: "Easy",
    duration: "1 min",
    rating: 5.0,
    baseViews: 44230,
    baseLaughs: 35110,
    instructions: ["Enter two names", "Reveal your love score", "Ask the big question", "Watch 'No' try to escape"],
    tags: ["love", "crush", "valentine", "calculator"],
  },
  {
    slug: "dont-click",
    title: "Don't Click",
    description: "Seriously... Don't click!",
    longDescription: "A big red button. One rule: DON'T click it. But you want to. You really want to. Go ahead, click it once... see what happens. We dare you to stop at 10 clicks.",
    category: "trick",
    emoji: "🔴",
    gradient: "from-teal-400 via-teal-500 to-emerald-600",
    accent: "#14b8a6",
    cardEmoji: "🔘",
    cardArt: "⛔",
    difficulty: "Medium",
    duration: "3 min",
    rating: 4.8,
    baseViews: 38900,
    baseLaughs: 29800,
    instructions: ["Don't click the button", "Okay fine, click it", "Keep clicking to unlock levels", "Reach 50 for the grand finale"],
    tags: ["button", "reverse-psychology", "clicker", "addictive"],
  },
  {
    slug: "fake-error",
    title: "Fake Error",
    description: "Your device might be in danger!",
    longDescription: "A terrifyingly realistic fake virus alert with scanning animation, hacker progress bars and dramatic warnings. Show it to your parents or friends, wait for panic... then reveal it's a prank!",
    category: "fake",
    emoji: "⚠️",
    gradient: "from-blue-700 via-slate-700 to-slate-900",
    accent: "#3b82f6",
    cardEmoji: "💻",
    cardArt: "⚠️",
    difficulty: "Medium",
    duration: "2 min",
    rating: 4.6,
    baseViews: 47300,
    baseLaughs: 24600,
    instructions: ["Show fullscreen to your victim", "Let the 'virus scan' run", "Watch the panic build", "Hit reveal to show it's a joke"],
    tags: ["virus", "hacker", "fake", "bsod"],
  },
  {
    slug: "talking-animals",
    title: "Talking Animals",
    description: "They can talk... And it's hilarious!",
    longDescription: "Pick an animal, type anything, and hear them say it out loud in a ridiculous voice. Cats judging you, dogs with deep wisdom, parrots that won't shut up. Uses real text-to-speech magic.",
    category: "sounds",
    emoji: "🐱",
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    accent: "#22c55e",
    cardEmoji: "🐱",
    cardArt: "💬",
    difficulty: "Easy",
    duration: "2 min",
    rating: 4.9,
    baseViews: 35600,
    baseLaughs: 30150,
    instructions: ["Choose your animal", "Type a funny phrase", "Pick a voice style", "Press speak & laugh"],
    tags: ["animals", "tts", "voice", "cat", "talking"],
  },
  {
    slug: "weird-video",
    title: "Weird Video",
    description: "Watch till the end... if you can!",
    longDescription: "A hypnotic trip through the weird side of the internet. Swirling colors, a philosophical llama, dramatic narration and a plot twist at the end. Can you watch the whole thing without laughing?",
    category: "meme",
    emoji: "🦙",
    gradient: "from-indigo-600 via-violet-600 to-purple-700",
    accent: "#6366f1",
    cardEmoji: "🦙",
    cardArt: "▶️",
    difficulty: "Medium",
    duration: "90 sec",
    rating: 4.7,
    baseViews: 31400,
    baseLaughs: 22800,
    instructions: ["Press play", "Don't look away", "Survive the llama monologue", "Get your weirdness score"],
    tags: ["weird", "llama", "hypnotic", "video"],
  },
];

export function getPrank(slug: string) {
  return PRANKS.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function formatCount(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}
