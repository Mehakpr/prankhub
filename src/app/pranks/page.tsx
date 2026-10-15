"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrankCard from "@/components/PrankCard";
import { PRANKS, CATEGORIES } from "@/lib/pranks";
import { Search, Shuffle, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";

function PranksInner() {
  const params = useSearchParams();
  const initialQ = params.get("q") || "";
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<"popular" | "rating" | "az">("popular");
  const router = useRouter();

  const filtered = useMemo(() => {
    let list = [...PRANKS];
    if (cat !== "all") list = list.filter((p) => p.category === cat);
    if (q.trim()) {
      const needle = q.toLowerCase();
      list = list.filter((p) =>
        (p.title + " " + p.description + " " + p.tags.join(" ") + " " + p.category).toLowerCase().includes(needle)
      );
    }
    if (sort === "popular") list.sort((a, b) => b.baseViews - a.baseViews);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [q, cat, sort]);

  const random = () => {
    const p = PRANKS[Math.floor(Math.random() * PRANKS.length)];
    router.push(`/prank/${p.slug}`);
  };

  return (
    <div className="min-h-screen bg-[#070d1d]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-6">
          <h1 className="font-display text-4xl sm:text-6xl">
            <span className="text-white">ALL </span><span className="text-[#ffe81a] text-outline-yellow">PRANKS</span>
          </h1>
          <p className="font-hand text-2xl text-white/70 mt-1">Pick your weapon of mass hilarity 😈</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 mb-4">
          <div className="flex-1 flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-3 focus-within:border-[#ffe81a] transition-colors">
            <Search size={18} className="text-white/50 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pranks, tags, vibes..."
              className="bg-transparent outline-none text-sm w-full placeholder:text-white/40 font-medium"
            />
            {q && <button onClick={() => setQ("")} className="text-white/50 hover:text-white text-sm font-bold">✕</button>}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="bg-white/10 border border-white/15 rounded-full px-4 py-3 text-sm font-bold outline-none [&>option]:text-black">
            <option value="popular">🔥 Most Popular</option>
            <option value="rating">⭐ Top Rated</option>
            <option value="az">🔤 A – Z</option>
          </select>
          <button onClick={random} className="btn-yellow px-5 py-3 rounded-full text-sm flex items-center justify-center gap-2">
            <Shuffle size={16} /> Random
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
          <button onClick={() => setCat("all")} className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-colors flex items-center gap-1.5 ${cat === "all" ? "bg-[#ffe81a] text-black border-[#ffe81a]" : "bg-white/5 border-white/15 hover:bg-white/10"}`}>
            <LayoutGrid size={14} /> All
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => setCat(c.slug)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-bold border transition-colors ${cat === c.slug ? "bg-[#ffe81a] text-black border-[#ffe81a]" : "bg-white/5 border-white/15 hover:bg-white/10"}`}>
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <p className="text-white/50 text-sm font-semibold mb-4">Showing {filtered.length} prank{filtered.length === 1 ? "" : "s"}{q && <> for "<span className="text-[#ffe81a]">{q}</span>"</>}</p>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white/[0.03] rounded-3xl border border-white/10">
            <div className="text-7xl mb-3">🕵️</div>
            <h3 className="font-display text-2xl">No pranks found!</h3>
            <p className="text-white/60 mt-1 mb-4">Even our detectives couldn't find that one.</p>
            <button onClick={() => { setQ(""); setCat("all"); }} className="btn-yellow px-6 py-2.5 rounded-full text-sm">Show Everything</button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((p, i) => (
              <PrankCard key={p.slug} prank={p} index={i} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function PranksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070d1d] grid place-items-center"><span className="text-5xl animate-bounce">😂</span></div>}>
      <PranksInner />
    </Suspense>
  );
}
