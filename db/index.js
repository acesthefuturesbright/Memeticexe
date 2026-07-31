import { drizzle as drizzleD1 } from "drizzle-orm/d1";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema.js";

let dbInstance;

function initDb() {
  if (dbInstance) return dbInstance;

  const d1 = globalThis.process?.env?.DB;

  if (d1) {
    dbInstance = drizzleD1(d1, { schema });
  } else {
    // Local SQLite database fallback
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
