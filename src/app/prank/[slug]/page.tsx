import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Star, Gauge } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrankRunner from "@/components/PrankRunner";
import Comments from "@/components/Comments";
import PrankActions from "@/components/PrankActions";
import PrankCard from "@/components/PrankCard";
import { PRANKS, getPrank, getCategory, formatCount } from "@/lib/pranks";

export function generateStaticParams() {
  return PRANKS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPrank(slug);
  if (!p) return { title: "Prank not found — PrankHub" };
  return {
    title: `${p.title} — PrankHub`,
    description: p.description,
  };
}

export default async function PrankPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const prank = getPrank(slug);
  if (!prank) notFound();
  const cat = getCategory(prank.category);
  const related = PRANKS.filter((p) => p.slug !== slug && p.category === prank.category)
    .concat(PRANKS.filter((p) => p.slug !== slug && p.category !== prank.category))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070d1d]">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#ffe81a] font-semibold text-sm mb-4">
          <ArrowLeft size={16} /> Back to all pranks
        </Link>

        {/* hero banner */}
        <div className={`rounded-3xl overflow-hidden bg-gradient-to-br ${prank.gradient} p-6 sm:p-10 relative border border-white/15`}>
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "repeating-conic-gradient(from 0deg at 85% 15%, rgba(255,255,255,0.3) 0deg 8deg, transparent 8deg 22deg)" }} />
          <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 text-[110px] sm:text-[170px] leading-none select-none animate-floaty drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)]">
            {prank.cardEmoji}
          </div>
          <div className="relative max-w-[65%]">
            {cat && (
              <Link href={`/categories#${cat.slug}`} className="inline-block bg-black/35 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full mb-3 hover:bg-black/55">
                {cat.emoji} {cat.name}
              </Link>
            )}
            <h1 className="font-display text-3xl sm:text-5xl text-white text-outline leading-tight">{prank.title}</h1>
            <p className="text-white/95 font-medium mt-2 text-sm sm:text-base">{prank.longDescription}</p>
            <div className="flex flex-wrap gap-2 mt-4 text-xs font-bold">
              <span className="bg-black/35 px-3 py-1.5 rounded-full flex items-center gap-1.5"><Clock size={13} /> {prank.duration}</span>
              <span className="bg-black/35 px-3 py-1.5 rounded-full flex items-center gap-1.5"><Gauge size={13} /> {prank.difficulty}</span>
              <span className="bg-black/35 px-3 py-1.5 rounded-full flex items-center gap-1.5"><Star size={13} className="text-[#ffe81a]" /> {prank.rating.toFixed(1)}</span>
              <span className="bg-black/35 px-3 py-1.5 rounded-full">👁️ {formatCount(prank.baseViews)} plays</span>
            </div>
          </div>
        </div>

        <PrankActions slug={prank.slug} title={prank.title} description={prank.description} />

        {/* interactive stage */}
        <div className="mt-4 bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-8">
          <PrankRunner slug={prank.slug} />
        </div>

        {/* how to prank */}
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-6">
            <h3 className="font-display text-xl text-[#ffe81a]">📋 How to prank</h3>
            <ol className="mt-3 space-y-2.5">
              {prank.instructions.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/85">
                  <span className="w-6 h-6 shrink-0 grid place-items-center rounded-full bg-[#ffe81a] text-black font-black text-xs">{i + 1}</span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-6">
            <h3 className="font-display text-xl text-[#ffe81a]">🏷️ Tags</h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {prank.tags.map((t) => (
                <Link key={t} href={`/pranks?q=${encodeURIComponent(t)}`} className="text-xs font-bold bg-white/10 hover:bg-[#ffe81a] hover:text-black border border-white/10 px-3 py-1.5 rounded-full transition-colors">
                  #{t}
                </Link>
              ))}
            </div>
            <div className="mt-5 bg-[#ffe81a]/10 border border-[#ffe81a]/25 rounded-2xl p-4">
              <p className="font-hand text-xl text-[#ffe81a]">Prankster tip 💡</p>
              <p className="text-sm text-white/75 mt-0.5">Copy the link and send it with zero context. "bro look at this" works 99% of the time.</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Comments slug={prank.slug} />
        </div>

        {/* related */}
        <h2 className="font-display text-2xl sm:text-3xl mt-10 mb-4">More pranks you'll love 🤣</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((p, i) => (
            <PrankCard key={p.slug} prank={p} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
