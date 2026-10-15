import { Smile, Smartphone, Share2, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const feats = [
    { icon: <Smile className="text-[#ffe81a]" size={32} />, title: "100+ Pranks", sub: "Always something new!" },
    { icon: <Smartphone className="text-[#ffe81a]" size={32} />, title: "Mobile Friendly", sub: "Works on all devices!" },
    { icon: <Share2 className="text-[#ffe81a]" size={32} />, title: "Share & Spread", sub: "Make your friends laugh!" },
    { icon: <Heart className="text-[#ffe81a]" size={32} />, title: "100% Free", sub: "No sign up needed!" },
  ];

  return (
    <footer className="mt-10 border-t border-white/10 bg-[#050a18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {feats.map((f, i) => (
            <div key={f.title} className={`flex items-center gap-3 ${i > 0 ? "md:border-l md:border-white/10 md:pl-6" : ""}`}>
              <div className="shrink-0">{f.icon}</div>
              <div>
                <div className="font-bold text-sm">{f.title}</div>
                <div className="text-white/50 text-xs">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="font-hand text-xl text-white/90">Because life is better with a little prank! 😉</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10 text-sm text-white/50">
          <div className="flex items-center gap-2">
            <span className="text-2xl">😂</span>
            <span className="font-display text-lg"><span className="text-white">Prank</span><span className="text-[#ffe81a]">Hub</span></span>
            <span className="ml-2">© 2026 — Made for laughs.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/pranks" className="hover:text-[#ffe81a]">All Pranks</Link>
            <Link href="/categories" className="hover:text-[#ffe81a]">Categories</Link>
            <Link href="/about" className="hover:text-[#ffe81a]">About</Link>
          </div>
        </div>
        <p className="text-center text-[11px] text-white/30 mt-4">All pranks are harmless jokes. Please prank responsibly — no real scares for people with heart conditions. 💛</p>
      </div>
    </footer>
  );
}
