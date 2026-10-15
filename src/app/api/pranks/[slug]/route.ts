import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { pranks } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { getPrank } from "@/lib/pranks";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const def = getPrank(slug);
  if (!def) return NextResponse.json({ error: "Not found" }, { status: 404 });
  try {
    const rows = await db.select().from(pranks).where(eq(pranks.slug, slug));
    if (rows.length === 0) {
      return NextResponse.json({ prank: { slug: def.slug, views: def.baseViews, laughs: def.baseLaughs, shares: 100 } });
    }
    return NextResponse.json({ prank: rows[0] });
  } catch {
    return NextResponse.json({ prank: { slug: def.slug, views: def.baseViews, laughs: def.baseLaughs, shares: 100 } });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const def = getPrank(slug);
  if (!def) return NextResponse.json({ error: "Not found" }, { status: 404 });
  let action = "view";
  try {
    const body = await req.json();
    action = body.action || "view";
  } catch {}
  try {
    const col = action === "laugh" ? pranks.laughs : action === "share" ? pranks.shares : pranks.views;
    const updated = await db.update(pranks).set({ [action === "laugh" ? "laughs" : action === "share" ? "shares" : "views"]: sql`${col} + 1` }).where(eq(pranks.slug, slug)).returning();
    if (updated.length === 0) {
      // insert if missing
      await db.insert(pranks).values({
        slug: def.slug, title: def.title, description: def.description,
        category: def.category, emoji: def.emoji, gradient: def.gradient,
        views: def.baseViews + (action === "view" ? 1 : 0),
        laughs: def.baseLaughs + (action === "laugh" ? 1 : 0),
        shares: 100 + (action === "share" ? 1 : 0),
      }).onConflictDoNothing();
    }
    const rows = await db.select().from(pranks).where(eq(pranks.slug, slug));
    return NextResponse.json({ ok: true, prank: rows[0] });
  } catch (e) {
    console.error("react error", e);
    return NextResponse.json({ ok: true, fallback: true });
  }
}
