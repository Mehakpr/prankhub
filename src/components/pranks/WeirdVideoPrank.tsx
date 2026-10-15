"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";

const SCENES = [
  { emoji: "🦙", bg: "from-indigo-600 to-purple-800", caption: "Our story begins...", sub: "In a field. With a llama. Obviously.", dur: 3500 },
  { emoji: "👁️", bg: "from-fuchsia-600 to-pink-800", caption: "The llama KNOWS things.", sub: "She has seen your browser history.", dur: 3500 },
  { emoji: "🌀", bg: "from-cyan-500 to-blue-800", caption: "You feel sleepy...", sub: "Do not resist the spiral. Embrace the weird.", dur: 4000 },
  { emoji: "🍕", bg: "from-orange-500 to-red-800", caption: "PLOT TWIST: Pizza appears!", sub: "No reason. Pizza needs no reason.", dur: 3500 },
  { emoji: "🦙", bg: "from-violet-700 to-indigo-900", caption: "The llama speaks:", sub: "\"The real video was the friends we confused along the way.\"", dur: 4500 },
  { emoji: "🎉", bg: "from-green-500 to-emerald-800", caption: "THE END (?)", sub: "You survived. Barely. Weirdness +100.", dur: 3000 },
];

export default function WeirdVideoPrank() {
  const [playing, setPlaying] = useState(false);
  const [scene, setScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const raf = useRef<number | null>(null);
  const startRef = useRef(0);
  const sceneStartRef = useRef(0);

  const total = SCENES.reduce((a, s) => a + s.dur, 0);

  useEffect(() => {
    if (!playing || finished) return;
    // fake buffering at scene 3
    if (scene === 2 && !buffering && progress > 0) {
      // occasional buffering handled in tick
    }
    startRef.current = performance.now() - progress;
    sceneStartRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      // fake buffer pause between 40-46%
      const pct = elapsed / total;
      if (pct > 0.4 && pct < 0.46) {
        setBuffering(true);
        startRef.current += 16;
        raf.current = requestAnimationFrame(tick);
        return;
      }
      setBuffering(false);
      setProgress(elapsed);
      let acc = 0;
      let idx = 0;
      for (let i = 0; i < SCENES.length; i++) {
        acc += SCENES[i].dur;
        if (elapsed < acc) { idx = i; break; }
        idx = i;
      }
      setScene(Math.min(idx, SCENES.length - 1));
      if (elapsed >= total) {
        setPlaying(false);
        setFinished(true);
        confetti({ particleCount: 180, spread: 100, origin: { y: 0.6 } });
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, finished]);

  const toggle = () => {
    if (finished) { restart(); return; }
    setPlaying((p) => !p);
  };

  const restart = () => {
    setProgress(0);
    setScene(0);
    setFinished(false);
    setPlaying(true);
  };

  const pct = Math.min(100, (progress / total) * 100);
  const s = SCENES[scene];
  const timeStr = (ms: number) => {
    const sec = Math.floor(ms / 1000);
    return `0:${sec.toString().padStart(2, "0")}`;
  };

  if (finished) {
    return (
      <div className="text-center max-w-md mx-auto animate-pop-in">
        <div className="text-8xl mb-3">🦙</div>
        <h3 className="font-display text-3xl text-[#ffe81a]">YOU SURVIVED!</h3>
        <p className="text-white/75 mt-2">Official Weirdness Score:</p>
        <div className="font-display text-7xl text-white my-2">98<span className="text-2xl text-white/50">/100</span></div>
        <p className="font-hand text-xl text-white/60">Diagnosis: delightfully strange. The llama is proud.</p>
        <div className="bg-white/10 rounded-2xl p-4 mt-4 text-left text-sm space-y-1 border border-white/10">
          <p>🏆 Achievement: <strong>Watched the whole thing</strong></p>
          <p>👁️ Blinks: probably not enough</p>
          <p>🧠 Brain cells: -2 (worth it)</p>
        </div>
        <button onClick={restart} className="btn-yellow px-6 py-3 rounded-full text-sm mt-5 inline-flex items-center gap-2">
          <RotateCcw size={16} /> Watch Again (why?)
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className={`relative rounded-3xl overflow-hidden border-4 border-black bg-gradient-to-br ${s.bg} min-h-[360px] flex flex-col transition-colors duration-1000`}>
        {/* hypnotic bg */}
        <div className="absolute inset-0 opacity-25 animate-hypno" style={{ background: "repeating-conic-gradient(from 0deg at 50% 50%, rgba(255,255,255,0.4) 0deg 10deg, transparent 10deg 30deg)" }} />
        {/* fake REC */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full text-xs font-bold z-10">
          <span className={`w-2.5 h-2.5 rounded-full ${playing ? "bg-red-500 animate-pulse" : "bg-gray-400"}`} /> {playing ? "PLAYING" : "PAUSED"}
        </div>
        <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1">
          <Volume2 size={12} /> WEIRD-O-VISION
        </div>

        <div className="flex-1 grid place-items-center relative z-10 py-10">
          {buffering ? (
            <div className="text-center">
              <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              <p className="text-sm font-bold mt-3">Buffering weirdness...</p>
            </div>
          ) : !playing && progress === 0 ? (
            <button onClick={toggle} className="w-24 h-24 rounded-full bg-[#ffe81a] text-black grid place-items-center hover:scale-110 transition-transform shadow-[0_0_50px_rgba(255,232,26,0.6)] animate-glow-pulse">
              <Play size={40} fill="currentColor" className="ml-1" />
            </button>
          ) : (
            <div key={scene} className="text-center animate-pop-in px-6">
              <div className="text-[100px] leading-none animate-floaty">{s.emoji}</div>
              <p className="font-display text-2xl sm:text-3xl text-white text-outline-sm mt-3">{s.caption}</p>
              <p className="text-white/85 font-semibold mt-1">{s.sub}</p>
            </div>
          )}
        </div>

        {/* controls */}
        <div className="relative z-10 bg-black/60 backdrop-blur px-4 py-3">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2.5 cursor-pointer" onClick={(e) => {
            const r = (e.target as HTMLDivElement).getBoundingClientRect();
            const ratio = (e.clientX - r.left) / r.width;
            setProgress(ratio * total);
            startRef.current = performance.now() - ratio * total;
          }}>
            <div className="h-full bg-[#ffe81a] transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="w-10 h-10 rounded-full bg-white text-black grid place-items-center hover:scale-105 transition-transform">
              {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </button>
            <span className="text-xs font-mono font-bold">{timeStr(progress)} / {timeStr(total)}</span>
            <span className="ml-auto text-xs font-bold text-white/60">Scene {scene + 1}/{SCENES.length} 🎬</span>
          </div>
        </div>
      </div>
      <p className="text-center font-hand text-xl text-white/50 mt-3">Watch till the end... if you can! No skipping, that's cheating 😤</p>
    </div>
  );
}
