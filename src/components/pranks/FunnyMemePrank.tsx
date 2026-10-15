"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { ThumbsUp, ThumbsDown, RefreshCw, Flame } from "lucide-react";
import { playPop } from "@/lib/sounds";

const MEMES = [
  { top: "NOBODY:", bottom: "ABSOLUTELY NOBODY:\nME AT 3AM: ...", emoji: "🐶", bg: "from-amber-400 to-orange-600" },
  { top: "WHEN YOU WAVE BACK", bottom: "AND THEY WEREN'T WAVING AT YOU", emoji: "🙈", bg: "from-sky-400 to-blue-700" },
  { top: "MY PHONE BATTERY: 1%", bottom: "ME: I CAN STILL WATCH ONE MORE VIDEO", emoji: "📱", bg: "from-emerald-400 to-teal-700" },
  { top: "BRAIN: SLEEP", bottom: "ALSO BRAIN: REMEMBER THAT EMBARRASSING THING FROM 2014?", emoji: "🧠", bg: "from-violet-500 to-purple-800" },
  { top: "ADULTING IS EASY", bottom: "SAID NO ADULT EVER", emoji: "🧾", bg: "from-rose-400 to-red-700" },
  { top: "ME: I'LL BE PRODUCTIVE TODAY", bottom: "ALSO ME: *REARRANGES DESKTOP ICONS FOR 2 HOURS*", emoji: "💻", bg: "from-cyan-400 to-indigo-700" },
  { top: "WHEN THE WIFI DROPS", bottom: "FOR 0.5 SECONDS", emoji: "😱", bg: "from-red-500 to-orange-700" },
  { top: "DOGE KNOWS", bottom: "SUCH WISDOM. MUCH LAUGH. WOW.", emoji: "🐕", bg: "from-yellow-400 to-amber-700" },
  { top: "MONDAY MOTIVATION", bottom: "ERROR 404: MOTIVATION NOT FOUND", emoji: "☕", bg: "from-slate-500 to-slate-800" },
  { top: "ME EXPLAINING TO MY CAT", bottom: "WHY I NEED PERSONAL SPACE", emoji: "🐱", bg: "from-pink-400 to-fuchsia-700" },
  { top: "POV: YOU SAID 'ONE MORE EPISODE'", bottom: "5 SEASONS LATER...", emoji: "📺", bg: "from-indigo-500 to-blue-900" },
  { top: "MY WALLET AFTER PAYDAY", bottom: "IT WAS NICE KNOWING YOU, MONEY", emoji: "💸", bg: "from-green-500 to-emerald-800" },
];

export default function FunnyMemePrank() {
  const [index, setIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [lols, setLols] = useState(0);
  const [mehs, setMehs] = useState(0);
  const [streak, setStreak] = useState(0);
  const [voted, setVoted] = useState(false);

  const meme = MEMES[index];

  const next = () => {
    if (spinning) return;
    setSpinning(true);
    try { playPop(); } catch {}
    let ticks = 0;
    const iv = setInterval(() => {
      setIndex(Math.floor(Math.random() * MEMES.length));
      ticks++;
      if (ticks > 8) {
        clearInterval(iv);
        setSpinning(false);
        setVoted(false);
      }
    }, 90);
  };

  const vote = (lol: boolean) => {
    if (voted || spinning) return;
    setVoted(true);
    if (lol) {
      const s = streak + 1;
      setStreak(s);
      setLols((l) => l + 1);
      if (s >= 3) confetti({ particleCount: 60 + s * 15, spread: 70, origin: { y: 0.6 } });
    } else {
      setStreak(0);
      setMehs((m) => m + 1);
    }
    setTimeout(next, 700);
  };

  return (
    <div className="text-center max-w-lg mx-auto">
      <div className="flex justify-center gap-2 mb-5 flex-wrap">
        <span className="bg-green-500/20 border border-green-400/30 text-green-300 px-4 py-1.5 rounded-full text-sm font-bold">😂 {lols} LOLs</span>
        <span className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-1.5 rounded-full text-sm font-bold">😐 {mehs} MEHs</span>
        <span className="bg-orange-500/20 border border-orange-400/30 text-orange-300 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
          <Flame size={14} /> {streak} streak
        </span>
      </div>

      <div className={`relative rounded-3xl overflow-hidden border-4 border-black shadow-2xl bg-gradient-to-br ${meme.bg} min-h-[380px] flex flex-col ${spinning ? "animate-shake-hard" : ""}`}>
        <div className="p-4 pt-5">
          <p className="font-display text-xl sm:text-2xl text-white text-outline-sm leading-tight whitespace-pre-line">{meme.top}</p>
        </div>
        <div className="flex-1 grid place-items-center py-2">
          <span className={`text-[120px] leading-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${spinning ? "" : "animate-floaty"}`}>{meme.emoji}</span>
        </div>
        <div className="p-4 pb-6">
          <p className="font-display text-xl sm:text-2xl text-white text-outline-sm leading-tight whitespace-pre-line">{meme.bottom}</p>
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-[11px] font-bold px-2 py-1 rounded-full">MEME #{index + 1}</div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5">
        <button onClick={() => vote(false)} disabled={voted || spinning} className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/10 hover:bg-red-500/40 border border-white/15 font-bold disabled:opacity-40 transition-colors">
          <ThumbsDown size={19} /> MEH
        </button>
        <button onClick={next} disabled={spinning} className="btn-yellow flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm disabled:opacity-50">
          <RefreshCw size={18} className={spinning ? "animate-spin" : ""} /> NEXT
        </button>
        <button onClick={() => vote(true)} disabled={voted || spinning} className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-green-500 hover:bg-green-400 font-bold disabled:opacity-40 transition-colors text-white">
          <ThumbsUp size={19} /> LOL!
        </button>
      </div>
      {streak >= 5 && <p className="font-hand text-2xl text-[#ffe81a] mt-3 animate-pop-in">🔥 Certified meme lord! {streak} LOL streak!</p>}
    </div>
  );
}
