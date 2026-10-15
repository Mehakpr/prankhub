"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Volume2, AlertTriangle } from "lucide-react";
import { playJumpScream } from "@/lib/sounds";

export default function JumpScarePrank() {
  const [stage, setStage] = useState<"warn" | "focus" | "scare" | "caught">("warn");
  const [count, setCount] = useState(5);
  const [dot, setDot] = useState({ x: 50, y: 50 });
  const [score, setScore] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const startFocus = () => {
    setStage("focus");
    setCount(5);
    setScore(0);
  };

  // countdown then scare
  useEffect(() => {
    if (stage !== "focus") return;
    if (count <= 0) {
      // small random delay for maximum scare
      const t = setTimeout(() => {
        setStage("scare");
        try { playJumpScream(); } catch {}
        if (navigator.vibrate) navigator.vibrate([200, 100, 300]);
        setTimeout(() => setStage("caught"), 1400);
      }, 400 + Math.random() * 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, count]);

  // move dot randomly
  useEffect(() => {
    if (stage !== "focus") return;
    const iv = setInterval(() => {
      setDot({ x: 8 + Math.random() * 84, y: 12 + Math.random() * 70 });
    }, 1100);
    return () => clearInterval(iv);
  }, [stage]);

  const hitDot = useCallback(() => {
    setScore((s) => s + 1);
    setDot({ x: 8 + Math.random() * 84, y: 12 + Math.random() * 70 });
  }, []);

  if (stage === "warn") {
    return (
      <div className="text-center max-w-md mx-auto">
        <div className="text-7xl mb-4">👻</div>
        <div className="bg-red-500/15 border border-red-500/40 rounded-2xl p-4 mb-5 flex gap-3 text-left">
          <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={22} />
          <p className="text-sm text-red-200">
            <strong>Warning:</strong> This prank contains a loud sound & sudden scary image.
            Not for the faint of heart. Turn your volume <strong>UP</strong>... if you dare.
          </p>
        </div>
        <h3 className="font-display text-2xl mb-2">The Concentration Test 🧠</h3>
        <p className="text-white/70 mb-6">Tap the moving dot as many times as you can in 5 seconds. It requires <em>extreme focus</em>. Stare closely...</p>
        <button onClick={startFocus} className="btn-yellow px-8 py-3.5 rounded-full text-sm inline-flex items-center gap-2">
          <Play size={17} /> I'm Ready... Start!
        </button>
        <p className="text-white/40 text-xs mt-4 flex items-center justify-center gap-1"><Volume2 size={13} /> Volume up for best experience</p>
      </div>
    );
  }

  if (stage === "focus") {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="font-display text-5xl text-[#ffe81a]">{count}</span>
          <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-bold">Score: {score}</span>
        </div>
        <p className="font-hand text-2xl text-white/80 mb-3">Stare closer... focus... tap the dot!</p>
        <div ref={areaRef} className="relative h-[320px] rounded-3xl bg-black/50 border border-white/10 overflow-hidden cursor-crosshair select-none">
          <div className="absolute inset-0 grid place-items-center opacity-10 text-[200px]">👁️</div>
          <button
            onClick={hitDot}
            className="absolute w-12 h-12 rounded-full bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.9)] animate-pulse transition-all duration-500 hover:scale-125"
            style={{ left: `${dot.x}%`, top: `${dot.y}%`, transform: "translate(-50%,-50%)" }}
          />
        </div>
      </div>
    );
  }

  if (stage === "scare") {
    return (
      <div className="fixed inset-0 z-[90] bg-black grid place-items-center animate-shake-hard">
        <div className="text-center">
          <div className="text-[220px] sm:text-[300px] leading-none">👹</div>
          <div className="font-display text-5xl sm:text-7xl text-red-500 -mt-6">BOOOO!</div>
        </div>
        <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="text-center max-w-md mx-auto animate-pop-in">
      <div className="text-8xl mb-3">🤣</div>
      <h3 className="font-display text-4xl text-[#ffe81a]">GOTCHAAA!</h3>
      <p className="text-white/80 mt-2 mb-1">Your score was <strong>{score}</strong> — but the real score is PrankHub: 1, You: 0.</p>
      <p className="font-hand text-xl text-white/60 mb-6">Admit it, you screamed. Now send this to a friend and compare screams.</p>
      <div className="flex justify-center gap-3">
        <button onClick={startFocus} className="btn-yellow px-6 py-3 rounded-full text-sm inline-flex items-center gap-2">
          <RotateCcw size={16} /> Scare Me Again
        </button>
      </div>
    </div>
  );
}
