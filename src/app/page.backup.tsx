import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrankCard from "@/components/PrankCard";
import { PRANKS } from "@/lib/pranks";
import HomeHero from "@/components/HomeHero";
import HomeStats from "@/components/HomeStats";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070d1d]">
      <Header />
      <HomeHero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {PRANKS.map((p, i) => (
            <PrankCard key={p.slug} prank={p} index={i} />
          ))}
        </div>
        <HomeStats />
      </main>
      <Footer />
    </div>
  );
}
