"use client";

import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { SOUNDS } from "@/lib/sounds";
import { Volume2, Shuffle, Zap } from "lucide-react";

export default function FunnySoundPrank() {
  const [lastPlayed, setLastPlayed] = useState<string | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [dancing, setDancing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = (key: string) => {
    try {
      SOUNDS[key].play();
    } catch { /* audio needs gesture */ }
    setLastPlayed(key);
    const n = playCount + 1;
    setPlayCount(n);
    setDancing(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDancing(false), 900);
    if (n % 5 === 0) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#ffe81a", "#8b5cf6", "#ffffff", "#ec4899"] });
    }
  };

  const random = () => {
    const keys = Object.keys(SOUNDS);
    play(keys[Math.floor(Math.random() * keys.length)]);
  };

  const chaos = () => {
    const keys = Object.keys(SOUNDS);
    keys.forEach((k, i) => setTimeout(() => play(k), i * 450));
  };

  return (
    <div className="text-center">
      <div className={`text-[110px] leading-none mb-2 transition-transform ${dancing ? "animate-shake-hard" : "animate-floaty"}`}>
        {lastPlayed ? SOUNDS[lastPlayed].emoji : "🔊"}
      </div>
      <p className="font-hand text-2xl text-white/80 mb-1">
        {lastPlayed ? `You played: ${SOUNDS[lastPlayed].name}!` : "Tap a sound. Any sound. You know you want to."}
      </p>
      <div className="inline-flex items-center gap-2 bg-black/30 rounded-full px-4 py-1.5 text-sm font-bold mb-6">
        <Volume2 size={15} className="text-[#ffe81a]" /> {playCount} sounds played
        {playCount >= 5 && <span className="text-[#ffe81a]">🎉 Party animal!</span>}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
        {Object.entries(SOUNDS).map(([key, s]) => (
          <button
            key={key}
            onClick={() => play(key)}
            className={`${s.color} rounded-2xl p-4 flex flex-col items-center gap-1 shadow-lg hover:scale-105 active:scale-95 transition-transform border-2 border-black/30 ${lastPlayed === key ? "ring-4 ring-[#ffe81a] scale-105" : ""}`}
          >
            <span className="text-4xl">{s.emoji}</span>
            <span className="font-extrabold text-xs sm:text-sm text-white drop-shadow">{s.name}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button onClick={random} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 font-bold border border-white/15">
          <Shuffle size={18} /> Surprise Me
        </button>
        <button onClick={chaos} className="btn-yellow flex items-center gap-2 px-6 py-3 rounded-full text-sm">
          <Zap size={18} /> CHAOS MODE (play all)
        </button>
      </div>
      <p className="text-white/40 text-xs mt-4">🔊 Best experienced at full volume near unsuspecting friends</p>
    </div>
  );
}
