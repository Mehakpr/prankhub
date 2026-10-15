"use client";

import { useEffect, useState } from "react";
import { X, Link2, Check, MessageCircle, Send, Mail } from "lucide-react";

export default function ShareModal({
  open,
  onClose,
  title,
  text,
  url,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (open) {
      setShareUrl(url || window.location.href);
      setCopied(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open, url]);

  if (!open) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = shareUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encoded = encodeURIComponent(`${text} ${shareUrl}`);

  const options = [
    { name: "WhatsApp", icon: <MessageCircle size={20} />, color: "bg-green-500 hover:bg-green-400", href: `https://wa.me/?text=${encoded}` },
    { name: "Telegram", icon: <Send size={20} />, color: "bg-sky-500 hover:bg-sky-400", href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}` },
    { name: "X / Twitter", icon: <span className="font-black text-lg leading-none">𝕏</span>, color: "bg-black hover:bg-gray-800 border border-white/20", href: `https://twitter.com/intent/tweet?text=${encoded}` },
    { name: "Email", icon: <Mail size={20} />, color: "bg-gray-600 hover:bg-gray-500", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encoded}` },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#0f1838] border border-white/15 rounded-3xl p-6 sm:p-8 animate-pop-in shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20">
          <X size={18} />
        </button>
        <div className="text-5xl mb-3">🤣</div>
        <h3 className="font-display text-2xl sm:text-3xl text-[#ffe81a]">Share the laugh!</h3>
        <p className="text-white/70 text-sm mt-1 mb-5">Send this to a friend and make their day (or ruin it, lovingly).</p>

        <div className="grid grid-cols-4 gap-2 mb-5">
          {options.map((o) => (
            <a key={o.name} href={o.href} target="_blank" rel="noopener noreferrer" className={`${o.color} rounded-2xl py-3 flex flex-col items-center gap-1 text-xs font-bold transition-transform hover:scale-105`}>
              {o.icon}
              <span className="hidden sm:inline">{o.name.split(" ")[0]}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-2xl p-2 pl-4">
          <span className="text-white/50 text-sm truncate flex-1">{shareUrl}</span>
          <button onClick={copy} className="btn-yellow px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shrink-0">
            {copied ? <><Check size={16} /> Copied!</> : <><Link2 size={16} /> Copy</>}
          </button>
        </div>

        {typeof navigator !== "undefined" && "share" in navigator && (
          <button
            onClick={() => { (navigator as unknown as { share: (d: {title:string;text:string;url:string}) => void }).share({ title, text, url: shareUrl }); }}
            className="w-full mt-3 py-3 rounded-2xl bg-white/10 hover:bg-white/15 font-bold text-sm"
          >
            More options...
          </button>
        )}
      </div>
    </div>
  );
}
