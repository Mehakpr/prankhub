import { pgTable, serial, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";

export const pranks = pgTable("pranks", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  emoji: varchar("emoji", { length: 20 }).notNull().default("😂"),
  gradient: varchar("gradient", { length: 200 }).notNull().default("from-purple-600 to-indigo-600"),
  views: integer("views").notNull().default(0),
  laughs: integer("laughs").notNull().default(0),
  shares: integer("shares").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const prankComments = pgTable("prank_comments", {
  id: serial("id").primaryKey(),
  prankSlug: varchar("prank_slug", { length: 100 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  message: text("message").notNull(),
  emoji: varchar("emoji", { length: 20 }).notNull().default("😂"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Prank = typeof pranks.$inferSelect;
export type NewPrank = typeof pranks.$inferInsert;
export type PrankComment = typeof prankComments.$inferSelect;
