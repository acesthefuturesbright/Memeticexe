import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const creatorApplications = sqliteTable("creator_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  displayName: text("display_name").notNull(),
  email: text("email").notNull(),
  twitter: text("twitter"),
  portfolio: text("portfolio"),
  bio: text("bio"),
  designSamples: text("design_samples"),
  status: text("status").default("pending").notNull(), // 'pending', 'approved', 'rejected'
  createdAt: text("created_at").notNull(),
});

export const creators = sqliteTable("creators", {
  id: text("id").primaryKey(), // e.g. '0x8C'
  name: text("name").notNull(),
  email: text("email").notNull(), // unique checked in schema/logic
  nodeId: text("node_id").notNull(),
  status: text("status").notNull(), // 'Creator', 'Lead Designer', 'Design Node'
  cardStatus: text("card_status").notNull(), // 'ACTIVE', 'PRIMARY', 'STANDBY'
  bio: text("bio"),
  twitter: text("twitter"),
  isOnline: integer("is_online").default(0).notNull(), // 0 = standby/off, 1 = active/on
  royaltyTier: text("royalty_tier").notNull(), // 'Level 1 — New Drop (fresh payload)'
  payoutInfo: text("payout_info").notNull(), // '$1.00 / shirt payout'
  role: text("role").default("creator").notNull(), // 'creator', 'admin'
  createdAt: text("created_at").notNull(),
});

export const otpCodes = sqliteTable("otp_codes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  code: text("code").notNull(),
  expiresAt: text("expires_at").notNull(),
});
