"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { MousePointerClick, Trophy, RotateCcw } from "lucide-react";
import { SOUNDS } from "@/lib/sounds";

const MESSAGES: { at: number; text: string; sub?: string }[] = [
  { at: 0, text: "Seriously... DON'T click!", sub: "This button does nothing. Nothing at all." },
  { at: 1, text: "Hey! I said DON'T!", sub: "Okay that was 1 click. Don't do it again." },
  { at: 3, text: "Stop it! 🛑", sub: "You're really bad at following instructions." },
  { at: 5, text: "Okay, now you're just being rebellious 😤", sub: "5 clicks. Your curiosity is concerning." },
  { at: 8, text: "FINE. Keep clicking. See if I care.", sub: "Reverse psychology... or is it?" },
  { at: 12, text: "🚨 WARNING: Button addiction detected", sub: "Side effects include fun and giggling." },
  { at: 18, text: "You've unlocked: PERSISTENT CLICKER 🏅", sub: "Your mouse is filing a complaint." },
  { at: 25, text: "🎉 25 CLICKS! DISCO MODE!", sub: "The button is enjoying this more than you." },
  { at: 35, text: "Okay this is getting weird. Touch grass? 🌱", sub: "Just kidding. Keep going, champion." },
  { at: 45, text: "ALMOST THERE! 5 more for the GRAND FINALE!", sub: "Your finger deserves a medal." },
  { at: 50, text: "🏆 LEGENDARY! 50 CLICKS!", sub: "You have officially clicked too much. We salute you." },
];

const NEXT_MILESTONE = [1, 3, 5, 8, 12, 18, 25, 35, 45, 50];

export default function DontClickPrank() {
  const [clicks, setClicks] = useState(0);
  const [squish, setSquish] = useState(false);
  const [finished, setFinished] = useState(false);

  const msg = [...MESSAGES].reverse().find((m) => clicks >= m.at) ?? MESSAGES[0];
  const nextGoal = NEXT_MILESTONE.find((n) => n > clicks) ?? 50;
  const progress = Math.min(100, (clicks / 50) * 100);

  const click = () => {
    if (finished) return;
    try {
      if (clicks + 1 >= 25) SOUNDS["laser"].play();
      else SOUNDS["airhorn"].play();
    } catch {}
    const n = clicks + 1;
    setClicks(n);
    setSquish(true);
    setTimeout(() => setSquish(false), 120);
    if (n === 25) {
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    }
    if (n >= 50) {
      setFinished(true);
      confetti({ particleCount: 250, spread: 120, origin: { y: 0.5 } });
      setTimeout(() => confetti({ particleCount: 150, angle: 60, spread: 60, origin: { x: 0 } }), 300);
      setTimeout(() => confetti({ particleCount: 150, angle: 120, spread: 60, origin: { x: 1 } }), 500);
    } else if (MESSAGES.some((m) => m.at === n)) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, scalar: 0.8 });
    }
  };

  const reset = () => { setClicks(0); setFinished(false); };

  const btnSize = Math.min(1.5, 1 + clicks * 0.008);

  return (
    <div className="text-center max-w-md mx-auto">
      {!finished ? (
        <>
          <div className="bg-black/30 rounded-2xl px-5 py-3 mb-2 border border-white/10">
            <p className="font-display text-xl sm:text-2xl leading-tight">{msg.text}</p>
            {msg.sub && <p className="text-white/60 text-sm mt-1">{msg.sub}</p>}
          </div>

          <div className="flex items-center justify-center gap-3 my-4 text-sm font-bold">
            <span className="bg-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
              <MousePointerClick size={15} className="text-[#ffe81a]" /> {clicks} clicks
            </span>
            <span className="bg-white/10 px-4 py-1.5 rounded-full">Next: {nextGoal} 🎯</span>
          </div>

          <div className="h-3 bg-black/40 rounded-full overflow-hidden mb-8 border border-white/10">
            <div className="h-full bg-gradient-to-r from-teal-400 via-[#ffe81a] to-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <button
            onClick={click}
            className={`relative rounded-full bg-gradient-to-b from-red-400 via-red-500 to-red-700 border-b-8 border-red-900 shadow-[0_20px_50px_rgba(239,68,68,0.5)] font-black text-white transition-transform ${clicks >= 25 ? "animate-rainbow" : ""}`}
            style={{ width: 190 * btnSize, height: 190 * btnSize, transform: squish ? "scale(0.9)" : "scale(1)", fontSize: 26 * Math.min(1.2, btnSize) }}
          >
            <span className="drop-shadow-lg leading-tight block">DON'T<br />CLICK</span>
            <span className="absolute -top-2 -right-2 text-4xl animate-bounce">👆</span>
          </button>
          <p className="font-hand text-xl text-white/50 mt-6">go on... click it... you know you want to...</p>
        </>
      ) : (
        <div className="animate-pop-in">
          <Trophy size={80} className="mx-auto text-[#ffe81a] animate-bounce-big" />
          <h3 className="font-display text-4xl text-[#ffe81a] mt-3">CLICK MASTER!</h3>
          <p className="text-white/75 mt-2">50 clicks! You ignored every warning like a true rebel. This certificate of disobedience is yours:</p>
          <div className="bg-gradient-to-br from-[#ffe81a] to-amber-500 text-black rounded-3xl p-6 mt-5 rotate-[-2deg] shadow-2xl">
            <p className="font-display text-2xl">🏆 CERTIFICATE 🏆</p>
            <p className="font-bold mt-1">Officially Certified Button Masher</p>
            <p className="text-sm font-medium">Awarded for outstanding curiosity & terrible listening skills</p>
            <p className="font-hand text-xl mt-2">Signed, The Button (it forgives you)</p>
          </div>
          <button onClick={reset} className="mt-6 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 font-bold inline-flex items-center gap-2">
            <RotateCcw size={16} /> Disobey Again
          </button>
        </div>
      )}
    </div>
  );
}
