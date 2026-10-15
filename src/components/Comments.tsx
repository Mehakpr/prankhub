"use client";

import { useEffect, useState } from "react";
import { Send, MessageCircle } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  message: string;
  emoji: string;
  createdAt: string;
}

const EMOJIS = ["😂", "🤣", "😱", "💀", "🔥", "❤️", "👏", "🤯"];

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState("😂");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetch(`/api/comments?slug=${slug}`).then((r) => r.json()).then((d) => setComments(d.comments || [])).catch(() => {});
  }, [slug]);

  const post = async () => {
    if (!name.trim() || !message.trim() || sending) return;
    setSending(true);
    try {
      const r = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, message, emoji }),
      });
      const d = await r.json();
      if (d.ok) {
        setComments((c) => [d.comment, ...c]);
        setMessage("");
      }
    } catch {}
    setSending(false);
  };

  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-5 sm:p-7">
      <h3 className="font-display text-2xl flex items-center gap-2">
        <MessageCircle className="text-[#ffe81a]" /> Reactions ({comments.length})
      </h3>

      <div className="mt-4 bg-black/30 rounded-2xl p-4 border border-white/10">
        <div className="flex gap-2 mb-3 flex-wrap">
          {EMOJIS.map((e) => (
            <button key={e} onClick={() => setEmoji(e)} className={`text-2xl w-11 h-11 grid place-items-center rounded-xl transition-all ${emoji === e ? "bg-[#ffe81a]/25 ring-2 ring-[#ffe81a] scale-110" : "bg-white/5 hover:bg-white/15"}`}>
              {e}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name..."
            maxLength={50}
            className="sm:w-40 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm font-semibold outline-none focus:border-[#ffe81a] placeholder:text-white/35"
          />
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && post()}
            placeholder="How hard did you laugh? 😂"
            maxLength={300}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-sm font-medium outline-none focus:border-[#ffe81a] placeholder:text-white/35"
          />
          <button onClick={post} disabled={sending || !name.trim() || !message.trim()} className="btn-yellow px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-40">
            <Send size={15} /> Post
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2.5 max-h-80 overflow-y-auto custom-scroll pr-1">
        {comments.length === 0 && <p className="text-white/40 text-sm text-center py-6">No reactions yet. Be the first to laugh! 😄</p>}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 bg-white/[0.05] rounded-2xl p-3.5 border border-white/[0.07] animate-pop-in">
            <span className="text-3xl shrink-0">{c.emoji}</span>
            <div className="min-w-0">
              <p className="font-bold text-sm">{c.name} <span className="text-white/30 font-normal text-xs ml-1">{new Date(c.createdAt).toLocaleDateString()}</span></p>
              <p className="text-white/80 text-sm break-words">{c.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
