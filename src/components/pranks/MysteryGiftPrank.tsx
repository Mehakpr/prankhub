"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Gift, RotateCcw, Sparkles } from "lucide-react";
import { playPop, playSuccess } from "@/lib/sounds";

const SURPRISES = [
  { emoji: "🦄", title: "A Magical Unicorn!", text: "It farts glitter and judges your life choices. Worth it." },
  { emoji: "🧦", title: "One Single Sock", text: "Just one. The other one is living its best life in the dryer dimension." },
  { emoji: "💩", title: "Fresh Poop... Emoji", text: "Don't worry, it's chocolate. Probably. We wouldn't taste it." },
  { emoji: "👑", title: "YOU Are Royalty", text: "Congratulations! You are now the King/Queen of PrankHub. Subjects: 0." },
  { emoji: "🍕", title: "Imaginary Pizza", text: "Zero calories! Also zero pizza. But infinite imagination." },
  { emoji: "🐸", title: "A Judgmental Frog", text: "He saw what you did. He is disappointed. Ribbit." },
  { emoji: "💎", title: "24-Carat... Ice Cube", text: "Extremely rare! Melts in minutes! Value: priceless (worthless)." },
  { emoji: "🛸", title: "Alien Abduction Coupon", text: "Redeem for one (1) free probing. Expires never. They're waiting." },
  { emoji: "🧠", title: "Big Brain Energy", text: "Your IQ just went up by 0.5 points. Use them wisely." },
  { emoji: "🎰", title: "JACKPOT... of Nothing!", text: "You won absolutely nothing! But the confetti is real. Enjoy!" },
  { emoji: "🦙", title: "Emotional Support Llama", text: "She believes in you. She also spits, but only with love." },
  { emoji: "📜", title: "Ancient Wisdom", text: "\"Never trust a fart after taco Tuesday.\" — Sun Tzu, probably" },
];

export default function MysteryGiftPrank() {
  const [stage, setStage] = useState<"closed" | "shaking" | "open">("closed");
  const [surprise, setSurprise] = useState<(typeof SURPRISES)[number] | null>(null);
  const [opened, setOpened] = useState(0);
  const [history, setHistory] = useState<string[]>([]);

  const shake = () => {
    if (stage !== "closed") return;
    setStage("shaking");
    try { playPop(); } catch {}
    setTimeout(() => {
      const s = SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
      setSurprise(s);
      setStage("open");
      setOpened((o) => o + 1);
      setHistory((h) => [s.emoji, ...h].slice(0, 8));
      try { playSuccess(); } catch {}
      confetti({ particleCount: 160, spread: 100, origin: { y: 0.55 }, colors: ["#ec4899", "#ffe81a", "#ffffff", "#22c55e", "#3b82f6"] });
      setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 60, origin: { x: 0 } }), 200);
      setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 60, origin: { x: 1 } }), 350);
    }, 900);
  };

  const reset = () => {
    setStage("closed");
    setSurprise(null);
  };

  return (
    <div className="text-center max-w-xl mx-auto">
      <div className="inline-flex items-center gap-2 bg-black/30 rounded-full px-4 py-1.5 text-sm font-bold mb-6">
        <Gift size={15} className="text-[#ffe81a]" /> {opened} gift{opened === 1 ? "" : "s"} opened
      </div>

      {stage !== "open" ? (
        <div>
          <button
            onClick={shake}
            className={`text-[130px] sm:text-[160px] leading-none inline-block transition-transform hover:scale-110 active:scale-95 cursor-pointer ${stage === "shaking" ? "animate-shake-hard" : "animate-bounce-big"}`}
          >
            🎁
          </button>
          <p className="font-hand text-2xl text-white/85 mt-2">
            {stage === "shaking" ? "Something's moving in there...!" : "Tap the gift to shake it... then open it!"}
          </p>
          <button onClick={shake} className="btn-yellow px-8 py-3 rounded-full text-sm mt-4 inline-flex items-center gap-2">
            <Sparkles size={17} /> {stage === "shaking" ? "Opening..." : "Open the Gift!"}
          </button>
        </div>
      ) : (
        surprise && (
          <div className="animate-pop-in bg-white/10 border border-white/15 rounded-3xl p-8 backdrop-blur">
            <div className="text-[90px] leading-none animate-bounce-big">{surprise.emoji}</div>
            <h3 className="font-display text-2xl sm:text-3xl text-[#ffe81a] mt-3">{surprise.title}</h3>
            <p className="text-white/85 mt-2 font-medium">{surprise.text}</p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button onClick={reset} className="btn-yellow px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
                <RotateCcw size={16} /> Open Another!
              </button>
            </div>
          </div>
        )
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Your collection</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {history.map((e, i) => (
              <span key={i} className="text-3xl bg-white/10 rounded-2xl w-14 h-14 grid place-items-center border border-white/10 animate-pop-in">{e}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
