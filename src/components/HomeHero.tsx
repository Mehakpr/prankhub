"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Shuffle, Play } from "lucide-react";
import { PRANKS } from "@/lib/pranks";

export default function HomeHero() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const goSearch = () => {
    router.push(`/pranks?q=${encodeURIComponent(q)}`);
  };

  const random = () => {
    const p = PRANKS[Math.floor(Math.random() * PRANKS.length)];
    router.push(`/prank/${p.slug}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-6 sm:pb-8">
      <div className="grid lg:grid-cols-[1fr_auto_1fr] items-center gap-4">
        {/* left doodle */}
        <div className="hidden lg:flex items-start gap-2 justify-start">
          <div className="font-hand text-[22px] leading-tight text-white/90 -rotate-3">
            Share with<br />your friends<br />and make<br />their day!
          </div>
          <svg width="60" height="80" viewBox="0 0 60 80" className="mt-6 -ml-2">
            <path d="M8 8 C 30 20, 45 30, 40 65 M40 65 l-8 -12 M40 65 l9 -10" className="doodle-arrow" />
            <circle cx="8" cy="8" r="4" fill="none" stroke="#ffe81a" strokeWidth="2.5" />
          </svg>
        </div>

        {/* center */}
        <div className="text-center">
          <h1 className="font-display leading-[0.95]">
            <span className="block text-white text-3xl sm:text-5xl rotate-[-2deg]">Ready for some</span>
            <span className="block text-[#ffe81a] text-4xl sm:text-6xl mt-1 rotate-[-2deg] text-outline-yellow">FUNNY SURPRISES?</span>
          </h1>
          <p className="font-hand text-xl sm:text-2xl text-white/90 mt-2 rotate-[-1deg]">
            Open a link, click, and see what happens!
          </p>

          {/* search */}
          <div className="flex items-center gap-2 max-w-md mx-auto mt-5">
            <div className="flex-1 flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2.5 focus-within:border-[#ffe81a] transition-colors">
              <Search size={18} className="text-white/50 shrink-0" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goSearch()}
                placeholder="Search pranks... (try 'scare')"
                className="bg-transparent outline-none text-sm w-full placeholder:text-white/40 font-medium"
              />
            </div>
            <button onClick={random} title="Random prank" className="w-11 h-11 shrink-0 rounded-full bg-[#ffe81a] text-black grid place-items-center hover:scale-110 transition-transform font-black">
              <Shuffle size={18} strokeWidth={2.5} />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-white/50 font-semibold">
            <Play size={12} /> 9 pranks live now — more dropping soon!
          </div>
        </div>

        {/* right */}
        <div className="hidden lg:flex items-center justify-end gap-3">
          <svg width="70" height="50" viewBox="0 0 70 50" className="mt-8">
            <path d="M5 5 C 25 25, 40 30, 62 30 M62 30 l-12 -6 M62 30 l-11 7" className="doodle-arrow" />
          </svg>
          <span className="text-7xl animate-floaty inline-block">😂</span>
          <div className="font-hand text-[22px] leading-tight text-white/90 rotate-3 text-center">
            <span className="text-[#ffe81a] font-bold text-3xl">100+</span><br />Pranks Inside!
          </div>
        </div>
      </div>

      {/* mobile decorations */}
      <div className="flex lg:hidden items-center justify-center gap-4 mt-4">
        <span className="text-5xl animate-floaty">😂</span>
        <div className="font-hand text-xl text-white/90 rotate-2">
          <span className="text-[#ffe81a] font-bold text-2xl">100+</span> Pranks Inside!
        </div>
      </div>

      {/* ticker */}
      <div className="mt-6 overflow-hidden rounded-full bg-[#ffe81a] py-2 -rotate-1 shadow-lg">
        <div className="flex whitespace-nowrap animate-marquee font-black text-black text-sm w-max">
          {[0, 1].map((n) => (
            <span key={n} className="flex gap-8 pr-8">
              <span>🤣 100+ PRANKS INSIDE</span><span>🔊 FUNNY SOUNDS</span><span>👻 JUMP SCARES</span><span>🎁 MYSTERY GIFTS</span><span>💖 LOVE PRANKS</span><span>⚠️ FAKE ERRORS</span><span>🦙 TALKING ANIMALS</span><span>🔴 DON'T CLICK!</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
