"use client";

import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";
import { playSuccess, playPop } from "@/lib/sounds";

function loveScore(a: string, b: string): number {
  const s = (a + "❤" + b).toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 997;
  // bias high: 72-99
  return 72 + (h % 28);
}

export default function LovePrank() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const [asked, setAsked] = useState(false);
  const [yes, setYes] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement>(null);

  const calculate = () => {
    if (!name1.trim() || !name2.trim() || animating) return;
    setAnimating(true);
    setScore(null);
    setDisplayScore(0);
    const target = loveScore(name1, name2);
    const start = Date.now();
    const iv = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / 1800);
      setDisplayScore(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p >= 1) {
        clearInterval(iv);
        setScore(target);
        setAnimating(false);
        try { playSuccess(); } catch {}
        confetti({ particleCount: 100, spread: 75, origin: { y: 0.6 }, colors: ["#ec4899", "#ff6b9d", "#ffe81a", "#ffffff"] });
      }
    }, 40);
  };

  const dodgeNo = () => {
    const n = noCount + 1;
    setNoCount(n);
    try { playPop(); } catch {}
    const range = Math.min(140, 60 + n * 18);
    setNoPos({
      x: (Math.random() - 0.5) * 2 * range,
      y: (Math.random() - 0.5) * 2 * range * 0.7,
    });
    if (n >= 5) {
      // give up, auto-yes
      setTimeout(accept, 600);
    }
  };

  const accept = () => {
    setYes(true);
    try { playSuccess(); } catch {}
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors: ["#ec4899", "#ff6b9d", "#ffffff"] });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors: ["#ec4899", "#ff6b9d", "#ffffff"] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const noTexts = ["No", "Are you sure?", "Really?", "Think again!", "Last chance!", "Nope, too slow!"];
  const verdict = score === null ? "" : score >= 95 ? "SOULMATES! 💍" : score >= 88 ? "True Love! 💘" : score >= 80 ? "Hot & Spicy! 🔥" : "Cute Potential! 💕";

  if (yes) {
    return (
      <div className="text-center max-w-md mx-auto animate-pop-in">
        <div className="text-8xl mb-2">💍</div>
        <h3 className="font-display text-4xl text-[#ffe81a]">SHE/HE SAID YES!</h3>
        <p className="font-hand text-2xl text-white/85 mt-2">Love wins every time. Screenshot this and make it official! 💖</p>
        <div className="bg-white/10 rounded-2xl p-4 mt-5 border border-pink-400/30">
          <p className="font-display text-xl">{name1} ❤️ {name2}</p>
          <p className="text-pink-300 font-bold">{score}% compatible — {verdict}</p>
        </div>
        <button onClick={() => { setYes(false); setAsked(false); setScore(null); setNoCount(0); setNoPos({x:0,y:0}); }} className="mt-6 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 font-bold">
          Try other names
        </button>
      </div>
    );
  }

  if (asked) {
    return (
      <div className="text-center max-w-lg mx-auto" ref={boxRef}>
        <div className="text-7xl mb-3 animate-bounce-big">🧸</div>
        <h3 className="font-display text-2xl sm:text-3xl leading-tight">
          {name2 || "Someone special"},<br />will you go out with {name1 || "me"}?
        </h3>
        <p className="font-hand text-xl text-white/60 mt-1">Choose wisely... (one button is shy 🙈)</p>
        <div className="relative h-56 mt-6 bg-black/20 rounded-3xl border border-white/10 overflow-hidden">
          <button
            onClick={accept}
            className="absolute left-1/2 top-1/2 -translate-x-[110%] -translate-y-1/2 bg-green-500 hover:bg-green-400 text-white font-black rounded-full shadow-xl transition-all"
            style={{ padding: `${14 + noCount * 5}px ${28 + noCount * 10}px`, fontSize: `${16 + noCount * 2.5}px` }}
          >
            YES! 💖
          </button>
          {noCount < 5 ? (
            <button
              onMouseEnter={dodgeNo}
              onTouchStart={dodgeNo}
              onClick={dodgeNo}
              className="absolute left-1/2 top-1/2 bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold rounded-full transition-all duration-200"
              style={{
                transform: `translate(calc(-50% + 70px + ${noPos.x}px), calc(-50% + ${noPos.y}px)) scale(${Math.max(0.5, 1 - noCount * 0.12)})`,
                padding: "12px 26px",
                fontSize: "14px",
              }}
            >
              {noTexts[Math.min(noCount, noTexts.length - 1)]}
            </button>
          ) : (
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-10 font-hand text-2xl text-[#ffe81a]">The universe has decided... 💫</p>
          )}
        </div>
        <p className="text-xs text-white/40 mt-3">No dodges: {noCount} 😏</p>
      </div>
    );
  }

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="text-7xl mb-2 animate-floaty">💘</div>
      <h3 className="font-display text-2xl mb-1">Love Calculator</h3>
      <p className="font-hand text-xl text-white/60 mb-5">Enter two names to reveal your destiny...</p>

      <div className="space-y-3">
        <input
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          placeholder="Your name 💁"
          className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/15 placeholder:text-white/35 font-semibold outline-none focus:border-pink-400 focus:bg-white/15 transition-colors text-center"
        />
        <div className="text-3xl animate-pulse">💖</div>
        <input
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          placeholder="Crush's name 😍"
          className="w-full px-5 py-3.5 rounded-2xl bg-white/10 border border-white/15 placeholder:text-white/35 font-semibold outline-none focus:border-pink-400 focus:bg-white/15 transition-colors text-center"
        />
      </div>

      <button onClick={calculate} disabled={animating || !name1.trim() || !name2.trim()} className="btn-yellow w-full mt-4 py-3.5 rounded-2xl text-sm inline-flex items-center justify-center gap-2 disabled:opacity-40">
        <Sparkles size={17} /> {animating ? "Consulting Cupid..." : "Calculate Love %"}
      </button>

      {(animating || score !== null) && (
        <div className="mt-6 animate-pop-in">
          <div className="relative h-8 bg-black/40 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-red-400 transition-all rounded-full" style={{ width: `${animating ? displayScore : score}%` }} />
            <span className="absolute inset-0 grid place-items-center font-black text-sm drop-shadow">{animating ? displayScore : score}%</span>
          </div>
          {score !== null && (
            <div className="animate-pop-in">
              <p className="font-display text-2xl text-pink-300 mt-3">{verdict}</p>
              <button onClick={() => setAsked(true)} className="mt-4 px-8 py-3.5 rounded-full bg-pink-500 hover:bg-pink-400 font-black inline-flex items-center gap-2 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
                <Heart size={18} fill="currentColor" /> Ask the Big Question!
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
