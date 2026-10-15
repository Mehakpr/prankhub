import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrankCard from "@/components/PrankCard";
import { PRANKS, CATEGORIES } from "@/lib/pranks";
import { ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#070d1d]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl sm:text-6xl">
            <span className="text-white">PRANK </span><span className="text-[#ffe81a] text-outline-yellow">CATEGORIES</span>
          </h1>
          <p className="font-hand text-2xl text-white/70 mt-1">Every flavor of funny, organized for your mischief 🎯</p>
        </div>

        <div className="space-y-10">
          {CATEGORIES.map((c) => {
            const items = PRANKS.filter((p) => p.category === c.slug);
            return (
              <section key={c.slug} id={c.slug} className="scroll-mt-24">
                <div className={`rounded-3xl bg-gradient-to-r ${c.color} p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between border border-white/15 mb-4`}>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl sm:text-6xl bg-black/25 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 grid place-items-center">{c.emoji}</span>
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl text-white text-outline-sm">{c.name}</h2>
                      <p className="text-white/85 text-sm font-medium">{c.description}</p>
                    </div>
                  </div>
                  <Link href={`/pranks`} className="shrink-0 inline-flex items-center gap-1.5 bg-black/35 hover:bg-black/55 px-4 py-2.5 rounded-full text-sm font-bold transition-colors">
                    View all <ArrowRight size={15} />
                  </Link>
                </div>
                {items.length === 0 ? (
                  <p className="text-white/40 text-sm py-4 text-center bg-white/[0.03] rounded-2xl border border-white/10">More pranks in this category coming soon... 👀</p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((p, i) => (
                      <PrankCard key={p.slug} prank={p} index={i} />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
