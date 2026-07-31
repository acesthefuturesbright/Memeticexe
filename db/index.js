import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

function getD1Database() {
  // Try to read from process.env.DB
  if (globalThis.process?.env?.DB) {
    return globalThis.process.env.DB;
  }
  // Try to read from Cloudflare next-on-pages request context
  try {
    const { getRequestContext } = require("@cloudflare/next-on-pages");
    const ctx = getRequestContext();
    if (ctx?.env?.DB) {
      return ctx.env.DB;
    }
  } catch (e) {
    // Fallback if not running in cloudflare context
  }
  return null;
}

let dbInstance;
const d1 = getD1Database();

if (d1) {
  dbInstance = drizzleD1(d1, { schema });
} else {
  // Fallback to local SQLite database file in the workspace
  const client = createClient({
    url: "file:local.db",
  });
  dbInstance = drizzleLibsql(client, { schema });
}

export const db = dbInstance;
export * as schema from "./schema";
