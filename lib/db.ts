import "server-only";
import { createClient, Client } from "@libsql/client";

let clientInstance: Client | null = null;

export function getDb(): Client {
  if (clientInstance) {
    return clientInstance;
  }

  const tursoUrl = process.env.TURSO_DATABASE_URL || (process.env.DATABASE_URL?.startsWith("libsql:") ? process.env.DATABASE_URL : undefined);
  const authToken = process.env.TURSO_AUTH_TOKEN || process.env.TURSO_TOKEN;

  if (tursoUrl) {
    clientInstance = createClient({
      url: tursoUrl,
      authToken: authToken,
    });
  } else {
    const isVercel = Boolean(process.env.VERCEL);
    const defaultDb = isVercel ? "file:/tmp/local.db" : "file:local.db";
    const url = process.env.DATABASE_URL || defaultDb;
    clientInstance = createClient({ url });

    if (url.startsWith("file:")) {
      clientInstance.execute("PRAGMA journal_mode = WAL;").catch(() => {});
      clientInstance.execute("PRAGMA busy_timeout = 5000;").catch(() => {});
    }
  }

  return clientInstance;
}
