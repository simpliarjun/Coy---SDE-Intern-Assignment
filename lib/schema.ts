import { Client } from "@libsql/client";

export async function initSchema(db: Client): Promise<void> {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      college TEXT NOT NULL,
      major TEXT NOT NULL,
      bio TEXT NOT NULL,
      avatar TEXT NOT NULL,
      prompts TEXT NOT NULL,
      interests TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS swipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      swiper_id TEXT NOT NULL,
      target_id TEXT NOT NULL,
      direction TEXT CHECK(direction IN ('like', 'pass', 'right', 'left')) NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      UNIQUE(swiper_id, target_id)
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS matches (
      id TEXT PRIMARY KEY,
      user1_id TEXT NOT NULL,
      user2_id TEXT NOT NULL,
      matched_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      UNIQUE(user1_id, user2_id)
    );
  `);
}
