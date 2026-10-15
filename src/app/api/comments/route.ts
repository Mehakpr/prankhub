import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { prankComments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const FALLBACK: Record<string, { name: string; message: string; emoji: string }[]> = {
  "funny-sound": [
    { name: "Mike", message: "Played the airhorn in class... teacher jumped 3 feet 😭", emoji: "📯" },
    { name: "Sarah", message: "The fart sound at full volume got me grounded. Worth it.", emoji: "💨" },
  ],
  "jump-scare": [
    { name: "Alex", message: "I SCREAMED so loud my dog started barking 💀", emoji: "😱" },
    { name: "Jess", message: "Sent this to my brother, he threw his phone on the couch lol", emoji: "👻" },
  ],
  "love-prank": [
    { name: "Emma", message: "He tried to click No 6 times then just said yes 🥹❤️", emoji: "💖" },
    { name: "Liam", message: "99% with my crush!! This is a sign!!", emoji: "💘" },
  ],
};

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug") || "";
  try {
    const rows = await db.select().from(prankComments).where(eq(prankComments.prankSlug, slug)).orderBy(desc(prankComments.createdAt)).limit(30);
    const fb = (FALLBACK[slug] || []).map((c, i) => ({ id: -i - 1, prankSlug: slug, ...c, createdAt: new Date().toISOString() }));
    return NextResponse.json({ comments: [...rows, ...fb] });
  } catch {
    const fb = (FALLBACK[slug] || [
      { name: "PrankFan", message: "This is hilarious! 😂", emoji: "😂" },
      { name: "Joker", message: "Sent to 5 friends, 5 screams. 10/10", emoji: "🤣" },
    ]).map((c, i) => ({ id: -i - 1, prankSlug: slug, ...c, createdAt: new Date().toISOString() }));
    return NextResponse.json({ comments: fb });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { slug, name, message, emoji } = await req.json();
    if (!slug || !name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const inserted = await db.insert(prankComments).values({
      prankSlug: slug,
      name: name.trim().slice(0, 50),
      message: message.trim().slice(0, 300),
      emoji: (emoji || "😂").slice(0, 10),
    }).returning();
    return NextResponse.json({ ok: true, comment: inserted[0] });
  } catch (e) {
    console.error("comment post error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
