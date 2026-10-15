"use client";

import { useState, useEffect, useRef } from "react";
import { X, AlertTriangle, ShieldAlert, Maximize, PartyPopper } from "lucide-react";

const THREATS = [
  "Trojan.LaughVirus..exe",
  "Spyware.GiggleTracker.dll",
  "Worm.PranksAreFun.sys",
  "Adware.FreeHugs.popup",
  "Ransomware.PayInTickles.lock",
  "Virus.SnortLaugh.vbs",
  "Malware.DadJokes.overload",
];

const TERMINAL_LINES = [
  "> initializing deep scan...",
  "> scanning memory sectors... 34%",
  "> CRITICAL: funny_business.exe detected!",
  "> tracing giggle signatures...",
  "> WARNING: laughter levels rising!",
  "> scanning cookies... found 47 (chocolate chip)",
  "> firewall tickled successfully",
  "> danger level: EXTREME 😱",
];

export default function FakeErrorPrank() {
  const [stage, setStage] = useState<"popup" | "scan" | "reveal">("popup");
  const [progress, setProgress] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const [termLines, setTermLines] = useState<string[]>([]);
  const [popups, setPopups] = useState([0]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stage !== "scan") return;
    setProgress(0);
    setFound([]);
    setTermLines([]);
    const iv = setInterval(() => {
      setProgress((p) => {
        const n = Math.min(100, p + Math.random() * 4);
        if (Math.random() > 0.55 && found.length < THREATS.length) {
          setFound((f) => (f.length < THREATS.length ? [...f, THREATS[f.length]] : f));
        }
        return n;
      });
    }, 220);
    const iv2 = setInterval(() => {
      setTermLines((l) => (l.length < TERMINAL_LINES.length ? [...l, TERMINAL_LINES[l.length]] : l));
    }, 900);
    return () => { clearInterval(iv); clearInterval(iv2); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  const closePopup = () => {
    // prank: closing spawns more!
    if (popups.length < 4) {
      setPopups((p) => [...p, p.length]);
    } else {
      setStage("scan");
    }
  };

  const fullscreen = () => {
    try {
      if (boxRef.current?.requestFullscreen) void boxRef.current.requestFullscreen();
    } catch {}
  };

  if (stage === "reveal") {
    return (
      <div className="text-center max-w-md mx-auto animate-pop-in">
        <div className="text-8xl mb-3">🤣</div>
        <h3 className="font-display text-4xl text-green-400">IT'S A PRANK!</h3>
        <p className="text-white/80 mt-2">Your device is 100% safe. There is no virus — only your gullible friend staring at the screen. 😏</p>
        <div className="bg-green-500/15 border border-green-500/40 rounded-2xl p-4 mt-5 text-left text-sm">
          <p className="font-bold text-green-300 mb-1">✅ Official All-Clear Report</p>
          <ul className="text-white/75 space-y-1">
            <li>• Viruses found: 0 (but 7 fake ones were hilarious)</li>
            <li>• Panic level: MAXIMUM (perfect)</li>
            <li>• Friendships damaged: hopefully 0</li>
          </ul>
        </div>
        <button onClick={() => { setStage("popup"); setPopups([0]); }} className="btn-yellow px-6 py-3 rounded-full text-sm mt-6">
          Prank Someone Else
        </button>
      </div>
    );
  }

  if (stage === "scan") {
    return (
      <div ref={boxRef} className="bg-[#0a0a14] rounded-3xl border border-red-500/40 overflow-hidden">
        <div className="bg-red-600 px-4 py-2.5 flex items-center gap-2 font-bold text-sm">
          <ShieldAlert size={18} /> ⚠️ SYSTEM SECURITY BREACH — DO NOT TURN OFF YOUR DEVICE ⚠️
        </div>
        <div className="p-5 sm:p-6 grid md:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Deep Virus Scan</span>
              <span className="text-red-400">{Math.floor(progress)}%</span>
            </div>
            <div className="h-5 bg-black/60 rounded-full overflow-hidden border border-red-500/30">
              <div className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-red-500 transition-all duration-200 animate-pulse" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-4 space-y-1.5 max-h-44 overflow-y-auto custom-scroll">
              {found.map((f, i) => (
                <div key={i} className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1.5 text-xs font-mono text-red-300 animate-pop-in">
                  <AlertTriangle size={13} /> {f} — <span className="font-bold">THREAT!</span>
                </div>
              ))}
              {found.length === 0 && <p className="text-white/40 text-xs font-mono">Scanning... nothing yet... (that's suspicious)</p>}
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={fullscreen} className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold flex items-center justify-center gap-1.5">
                <Maximize size={14} /> Fullscreen Panic Mode
              </button>
              <button onClick={() => setStage("reveal")} className="flex-1 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-xs font-black flex items-center justify-center gap-1.5">
                <PartyPopper size={14} /> Reveal It's a Prank
              </button>
            </div>
          </div>
          <div className="bg-black rounded-2xl p-4 font-mono text-[11px] sm:text-xs text-green-400 min-h-[220px] border border-green-500/20">
            {termLines.map((l, i) => (
              <p key={i} className={l.includes("CRITICAL") || l.includes("WARNING") ? "text-red-400" : ""}>{l}</p>
            ))}
            <span className="inline-block w-2 h-4 bg-green-400 animate-pulse mt-1" />
          </div>
        </div>
        <p className="text-center text-[11px] text-white/30 pb-3">😏 Psst... prankster: hit "Reveal It's a Prank" before they call tech support</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="font-hand text-2xl text-white/70 mb-5">Show this to your victim. Tell them to click OK. Try not to laugh. 😈</p>
      <div className="relative max-w-md mx-auto" style={{ height: popups.length > 1 ? 300 : 220 }}>
        {popups.map((p) => (
          <div
            key={p}
            className="absolute left-1/2 top-0 w-full max-w-sm bg-[#e8e8e8] rounded-lg overflow-hidden shadow-2xl text-left animate-pop-in border-2 border-gray-400"
            style={{ transform: `translateX(calc(-50% + ${(p % 2 === 0 ? 1 : -1) * p * 14}px)) translateY(${p * 22}px)`, zIndex: p }}
          >
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-3 py-1.5 flex items-center justify-between text-white text-xs font-bold">
              <span>⚠️ System Warning</span>
              <button onClick={closePopup} className="w-5 h-5 grid place-items-center bg-red-500 rounded-sm hover:bg-red-400"><X size={12} /></button>
            </div>
            <div className="p-4 flex gap-3 items-start">
              <span className="w-9 h-9 shrink-0 grid place-items-center rounded-full bg-red-500 text-white font-black text-xl">✕</span>
              <div>
                <p className="text-gray-800 text-sm font-semibold">Something went wrong!</p>
                <p className="text-gray-500 text-xs mt-0.5">Virus detected in C:\fun\pranks.exe — {3 + p} threats found. Click OK to start emergency scan.</p>
              </div>
            </div>
            <div className="px-4 pb-4 flex justify-end gap-2">
              <button onClick={closePopup} className="px-6 py-1.5 bg-gray-300 hover:bg-gray-200 text-gray-700 text-xs rounded border border-gray-400">Cancel</button>
              <button onClick={() => setStage("scan")} className="px-8 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded font-bold">OK</button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-4">Fun fact: pressing ✕ just makes it worse. Classic Windows energy.</p>
    </div>
  );
}
