import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Smile, ShieldCheck, Share2, Zap, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070d1d]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-8">
          <div className="text-7xl mb-2">😂</div>
          <h1 className="font-display text-4xl sm:text-6xl">
            <span className="text-white">ABOUT </span><span className="text-[#ffe81a] text-outline-yellow">PRANKHUB</span>
          </h1>
          <p className="font-hand text-2xl text-white/70 mt-1">Click. Laugh. Share. Repeat!</p>
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 text-white/85 leading-relaxed">
          <div>
            <h2 className="font-display text-2xl text-[#ffe81a] mb-2">🎯 Our Mission</h2>
            <p>
              PrankHub exists for one reason: <strong className="text-white">to make people laugh</strong>. We're a collection of
              harmless, hilarious interactive pranks — funny soundboards, jump scares, fake virus alerts, love traps,
              talking animals and gloriously weird videos. Open a link, click, and see what happens!
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon: <Zap className="text-[#ffe81a]" size={24} />, t: "Instant Fun", d: "No downloads, no sign-up. Just click and laugh." },
              { icon: <Share2 className="text-[#ffe81a]" size={24} />, t: "Built to Share", d: "Every prank has a shareable link. Victims included." },
              { icon: <Smile className="text-[#ffe81a]" size={24} />, t: "100% Free", d: "Every prank is free, forever. Laughter is priceless." },
            ].map((f) => (
              <div key={f.t} className="bg-black/30 rounded-2xl p-4 border border-white/10 text-center">
                <div className="flex justify-center mb-2">{f.icon}</div>
                <p className="font-bold text-white">{f.t}</p>
                <p className="text-sm text-white/60 mt-1">{f.d}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-2xl text-[#ffe81a] mb-2">📜 The Prankster's Code</h2>
            <ol className="space-y-2.5 mt-3">
              {[
                "Prank people who can take a joke — know your audience.",
                "Never scare anyone with heart conditions, anxiety, or genuine fears.",
                "Fake errors are funny for 2 minutes, not 2 hours. Reveal quickly!",
                "If someone says stop, you stop. Laughing WITH > laughing AT.",
                "Always be ready to be pranked back. What goes around... 😈",
              ].map((r, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="w-6 h-6 shrink-0 grid place-items-center rounded-full bg-[#ffe81a] text-black font-black text-xs">{i + 1}</span>
                  <span className="pt-0.5">{r}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-5 flex gap-3">
            <ShieldCheck className="text-green-400 shrink-0" size={26} />
            <div className="text-sm">
              <p className="font-bold text-green-300">Safe & Harmless Promise</p>
              <p className="text-white/70 mt-1">
                Every prank on PrankHub is 100% fake and harmless. No real viruses, no real damage, no data collection.
                The jump scare is loud but brief, and every scary prank comes with a warning. Prank responsibly! 💛
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="font-hand text-2xl text-white/80 flex items-center justify-center gap-2">
              Because life is better with a little prank! <Heart size={20} className="text-pink-400" fill="currentColor" />
            </p>
            <Link href="/pranks" className="btn-yellow inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm mt-4">
              Start Pranking <ArrowRight size={16} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
