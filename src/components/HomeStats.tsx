"use client";

import { useEffect, useState } from "react";
import { Eye, Laugh, Share2, Trophy } from "lucide-react";
import { PRANKS, formatCount } from "@/lib/pranks";
import Link from "next/link";

export default function HomeStats() {
  const [totals, setTotals] = useState({ views: 0, laughs: 0 });

  useEffect(() => {
    const base = PRANKS.reduce((a, p) => ({ views: a.views + p.baseViews, laughs: a.laughs + p.baseLaughs }), { views: 0, laughs: 0 });
    setTotals(base);
    fetch("/api/pranks").then((r) => r.json()).then((d) => {
      if (d.pranks?.length) {
        setTotals({
          views: d.pranks.reduce((a: number, p: { views: number }) => a + (p.views || 0), 0),
          laughs: d.pranks.reduce((a: number, p: { laughs: number }) => a + (p.laughs || 0), 0),
        });
      }
    }).catch(() => {});
  }, []);

  const stats = [
    { icon: <Eye size={20} />, value: formatCount(totals.views), label: "Total Prank Views", color: "text-sky-300" },
    { icon: <Laugh size={20} />, value: formatCount(totals.laughs), label: "Laughs Generated", color: "text-[#ffe81a]" },
    { icon: <Share2 size={20} />, value: formatCount(Math.floor(totals.views / 6)), label: "Shares & Victims", color: "text-green-300" },
    { icon: <Trophy size={20} />, value: "9", label: "Live Pranks", color: "text-pink-300" },
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.05] border border-white/10 rounded-2xl p-4 text-center hover:bg-white/[0.08] transition-colors">
            <div className={`${s.color} flex justify-center mb-1`}>{s.icon}</div>
            <div className="font-display text-3xl">{s.value}</div>
            <div className="text-white/50 text-xs font-semibold">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-r from-[#ffe81a] via-amber-300 to-[#ffe81a] p-6 sm:p-8 text-black text-center relative overflow-hidden">
        <div className="absolute -top-6 -left-6 text-8xl opacity-20 rotate-12">🤣</div>
        <div className="absolute -bottom-8 -right-4 text-9xl opacity-20 -rotate-12">😱</div>
        <h2 className="font-display text-3xl sm:text-4xl relative">CAN'T DECIDE? FEELING BRAVE?</h2>
        <p className="font-semibold text-black/70 mt-1 relative">Hit the button. Get a random prank. No take-backs. 😈</p>
        <Link href="/pranks" className="relative inline-block mt-4 bg-black text-[#ffe81a] font-black px-8 py-3.5 rounded-full hover:scale-105 transition-transform text-sm">
          🎲 BROWSE ALL PRANKS →
        </Link>
      </div>
    </div>
  );
}
