"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Share2, Menu, X, Shuffle } from "lucide-react";
import ShareModal from "./ShareModal";
import { PRANKS } from "@/lib/pranks";
import { useRouter } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [shareOpen, setShareOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const links = [
    { href: "/", label: "Home" },
    { href: "/pranks", label: "All Pranks" },
    { href: "/categories", label: "Categories" },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const randomPrank = () => {
    const p = PRANKS[Math.floor(Math.random() * PRANKS.length)];
    router.push(`/prank/${p.slug}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#070d1d]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <span className="text-4xl sm:text-5xl group-hover:animate-wiggle inline-block">😂</span>
            <div className="leading-none">
              <div className="font-display text-3xl sm:text-5xl tracking-wide">
                <span className="text-white">Prank</span>
                <span className="text-[#ffe81a]">Hub</span>
              </div>
              <div className="font-hand text-white/90 text-lg sm:text-2xl -mt-0.5 sm:mt-0 relative inline-block">
                Click. Laugh. Share. Repeat!
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M2 6 Q 100 -2 198 5" stroke="#ffe81a" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative font-semibold text-[15px] transition-colors pb-1 ${
                  isActive(l.href) ? "text-[#ffe81a]" : "text-white/80 hover:text-white"
                }`}
              >
                {l.label}
                {isActive(l.href) && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-[#ffe81a] rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={randomPrank}
              title="Random prank!"
              className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-all hover:rotate-180 duration-500"
            >
              <Shuffle size={18} />
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="btn-yellow hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
            >
              <Share2 size={16} strokeWidth={2.5} /> Share This Site
            </button>
            <button
              className="md:hidden w-10 h-10 grid place-items-center rounded-full bg-white/10"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1 bg-[#0b1330]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl font-semibold ${
                  isActive(l.href) ? "bg-[#ffe81a] text-black" : "text-white/80 hover:bg-white/10"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <button onClick={() => { setShareOpen(true); setMobileOpen(false); }} className="btn-yellow flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm">
                <Share2 size={16} /> Share This Site
              </button>
              <button onClick={randomPrank} className="px-4 py-3 rounded-xl bg-white/10 font-bold flex items-center gap-2">
                <Shuffle size={16} /> Random
              </button>
            </div>
          </div>
        )}
      </header>
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title="PrankHub — Click. Laugh. Share. Repeat!" text="Ready for some FUNNY SURPRISES? Open a link, click, and see what happens! 🤣" />
    </>
  );
}
