import { NextResponse } from "next/server";
import { db } from "@/db";
import { pranks } from "@/db/schema";
import { PRANKS } from "@/lib/pranks";

export async function GET() {
  try {
    const rows = await db.select().from(pranks);
    if (rows.length === 0) {
      // auto-seed
      for (const p of PRANKS) {
        await db.insert(pranks).values({
          slug: p.slug,
          title: p.title,
          description: p.description,
          category: p.category,
          emoji: p.emoji,
          gradient: p.gradient,
          views: p.baseViews,
          laughs: p.baseLaughs,
          shares: Math.floor(p.baseViews / 7),
        }).onConflictDoNothing();
      }
      const seeded = await db.select().from(pranks);
      return NextResponse.json({ pranks: seeded });
    }
    return NextResponse.json({ pranks: rows });
  } catch (e) {
    // fallback to static data if DB unavailable
    console.error("pranks GET error", e);
    return NextResponse.json({
      pranks: PRANKS.map((p, i) => ({
        id: i + 1,
        slug: p.slug,
        title: p.title,
        description: p.description,
        category: p.category,
        emoji: p.emoji,
        gradient: p.gradient,
        views: p.baseViews,
        laughs: p.baseLaughs,
        shares: Math.floor(p.baseViews / 7),
        createdAt: new Date().toISOString(),
      })),
    });
  }
}
