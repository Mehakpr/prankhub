"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Laugh, Eye, Share2, Link2, Check } from "lucide-react";
import ShareModal from "./ShareModal";
import { formatCount } from "@/lib/pranks";

export default function PrankActions({ slug, title, description }: { slug: string; title: string; description: string }) {
  const [views, setViews] = useState<number | null>(null);
  const [laughs, setLaughs] = useState<number | null>(null);
  const [laughed, setLaughed] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/pranks/${slug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "view" }) })
      .then((r) => r.json()).then((d) => {
        if (d.prank) { setViews(d.prank.views); setLaughs(d.prank.laughs); }
      }).catch(() => {});
    try {
      if (localStorage.getItem(`laughed-${slug}`)) setLaughed(true);
    } catch {}
  }, [slug]);

  const laugh = () => {
    if (laughed) return;
    setLaughed(true);
    try { localStorage.setItem(`laughed-${slug}`, "1"); } catch {}
    setLaughs((l) => (l ?? 0) + 1);
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.4 }, scalar: 0.9 });
    fetch(`/api/pranks/${slug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "laugh" }) }).catch(() => {});
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = window.location.href;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    fetch(`/api/pranks/${slug}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "share" }) }).catch(() => {});
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5 mt-4">
        <button
          onClick={laugh}
          disabled={laughed}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-black text-sm transition-all ${laughed ? "bg-pink-500/30 border border-pink-400/40 text-pink-200" : "btn-yellow"}`}
        >
          <Laugh size={17} /> {laughed ? "You laughed! 😂" : "I laughed! 😂"}
          {laughs !== null && <span className="opacity-80">· {formatCount(laughs)}</span>}
        </button>
        <span className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.07] border border-white/10 text-sm font-bold text-white/80">
          <Eye size={16} /> {views !== null ? formatCount(views) : "..."} views
        </span>
        <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 text-sm font-bold transition-colors">
          {copied ? <><Check size={16} className="text-green-400" /> Copied!</> : <><Link2 size={16} /> Copy Prank Link</>}
        </button>
        <button onClick={() => setShareOpen(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 text-sm font-bold transition-colors">
          <Share2 size={16} /> Share
        </button>
      </div>
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} title={`${title} — PrankHub`} text={`😂 ${title}: ${description}`} />
    </>
  );
}
