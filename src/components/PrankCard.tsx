"use client";

import Link from "next/link";
import { ArrowRight, Eye, Laugh } from "lucide-react";
import type { PrankDef } from "@/lib/pranks";
import { formatCount } from "@/lib/pranks";

const STATS_OVERRIDE: Record<string, { views: number; laughs: number }> = {};

export function setCardStats(slug: string, views: number, laughs: number) {
  STATS_OVERRIDE[slug] = { views, laughs };
}

export default function PrankCard({ prank, index = 0 }: { prank: PrankDef; index?: number }) {
  const stats = STATS_OVERRIDE[prank.slug];

  return (
    <Link
      href={`/prank/${prank.slug}`}
      className={`card-shine group relative rounded-2xl overflow-hidden bg-gradient-to-br ${prank.gradient} p-5 sm:p-6 min-h-[220px] sm:min-h-[240px] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_16px_44px_rgba(0,0,0,0.55)] hover:-translate-y-1.5 transition-all duration-300 border border-white/15`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* decorative rays */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "repeating-conic-gradient(from 0deg at 80% 20%, rgba(255,255,255,0.25) 0deg 8deg, transparent 8deg 20deg)" }} />
      <div className="absolute -right-6 -bottom-8 text-[130px] sm:text-[160px] leading-none select-none opacity-95 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
        {prank.cardEmoji}
      </div>
      {/* floating sparkles */}
      <div className="absolute top-3 right-3 text-xl animate-floaty" style={{ ["--r" as string]: "12deg" }}>✨</div>

      <div className="relative z-10 max-w-[62%]">
        <h3 className="font-display text-2xl sm:text-[28px] leading-[1.05] text-white text-outline">{prank.title}</h3>
        <p className="text-white/95 text-[13px] sm:text-sm font-medium mt-1.5 leading-snug drop-shadow">{prank.description}</p>
        <div className="flex items-center gap-3 mt-2 text-[11px] font-bold text-white/80">
          <span className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full"><Eye size={11} /> {formatCount(stats?.views ?? prank.baseViews)}</span>
          <span className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded-full"><Laugh size={11} /> {formatCount(stats?.laughs ?? prank.baseLaughs)}</span>
        </div>
      </div>

      <div className="relative z-10 mt-4">
        <span className="btn-yellow inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px]">
          Open Now <ArrowRight size={15} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
