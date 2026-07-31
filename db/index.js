import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { getRequestContext } from "@cloudflare/next-on-pages";
import * as schema from "./schema.js";

let dbInstance;

function initDb() {
  if (dbInstance) return dbInstance;

  let d1 = null;
  try {
    const ctx = getRequestContext();
    if (ctx?.env?.DB) {
      d1 = ctx.env.DB;
    }
  } catch (e) {
    // Fallback if not running in Cloudflare context
  }

  // Fallback to process.env.DB if mapped
  if (!d1 && globalThis.process?.env?.DB) {
    d1 = globalThis.process.env.DB;
  }

  if (d1) {
    dbInstance = drizzleD1(d1, { schema });
  } else if (globalThis.process?.env?.NEXT_RUNTIME === "edge") {
    // In the local Next.js Edge runtime simulator, native filesystem access is unavailable.
    // Return a throwing proxy so that pages catch the error and fall back to static data gracefully.
    dbInstance = new Proxy({}, {
      get(target, prop) {
        return () => {
          throw new Error(
            "Local SQLite filesystem access is not supported in the simulated Edge runtime. " +
            "Please deploy to Cloudflare Pages to use the D1 database."
          );
        };
      }
    });
  } else {
    // Local SQLite database fallback (Runs under standard Node.js for migrations and seeding)
    const client = createClient({
      url: "file:local.db",
    });
    dbInstance = drizzleLibsql(client, { schema });
  }

  return dbInstance;
}

// Export a lazy-loading proxy for the database client
export const db = new Proxy({}, {
  get(target, prop) {
    const instance = initDb();
    const value = instance[prop];
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  }
});

export * as schema from "./schema.js";
