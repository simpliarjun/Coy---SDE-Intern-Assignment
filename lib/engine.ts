import "server-only";
import { getDb } from "./db";
import { initSchema } from "./schema";
import { seedDatabase, SEEDED_PROFILES, PRE_SEEDED_LIKERS } from "./seed-data";
import { Profile, SwipeResult, MatchedProfile } from "./types";
import { CURRENT_USER_ID } from "./constants";

let initPromise: Promise<void> | null = null;

export function ensureDbReady(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      try {
        const db = getDb();
        await initSchema(db);
        await seedDatabase(db);
      } catch (err) {
        initPromise = null;
        console.error("ensureDbReady error:", err);
        throw err;
      }
    })();
  }
  return initPromise;
}

function seededShuffle<T>(array: T[], seedStr: string): T[] {
  const result = [...array];
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) >>> 0;
  }
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export async function getFeed(userId: string = CURRENT_USER_ID): Promise<Profile[]> {
  await ensureDbReady();
  const db = getDb();

  const query = `
    SELECT id, name, age, college, major, bio, avatar, prompts, interests
    FROM profiles
    WHERE id != ?
      AND id NOT IN (
        SELECT target_id FROM swipes WHERE swiper_id = ?
      )
  `;

  const rows = await db.execute({ sql: query, args: [userId, userId] });

  const rawProfiles: Profile[] = rows.rows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    age: Number(r.age),
    college: String(r.college),
    major: String(r.major),
    bio: String(r.bio),
    avatar: String(r.avatar),
    prompts: JSON.parse(String(r.prompts)),
    interests: JSON.parse(String(r.interests)),
  }));

  return seededShuffle(rawProfiles, userId);
}

export async function recordSwipe(
  swiperId: string = CURRENT_USER_ID,
  targetId: string,
  direction: "like" | "pass"
): Promise<SwipeResult> {
  await ensureDbReady();
  const db = getDb();

  if (!targetId || (direction !== "like" && direction !== "pass")) {
    throw new Error("Invalid swipe parameters");
  }

  if (targetId === swiperId) {
    throw new Error("Self-swipe is not allowed");
  }

  const targetProfile = await getProfileById(targetId);
  if (!targetProfile) {
    throw new Error("Target profile not found");
  }

  const existingSwipe = await db.execute({
    sql: `SELECT direction FROM swipes WHERE swiper_id = ? AND target_id = ?`,
    args: [swiperId, targetId],
  });

  if (existingSwipe.rows.length > 0) {
    throw new Error("Profile already swiped");
  }

  const nowUnix = Math.floor(Date.now() / 1000);

  await db.execute({
    sql: `INSERT INTO swipes (swiper_id, target_id, direction, created_at) VALUES (?, ?, ?, ?)`,
    args: [swiperId, targetId, direction, nowUnix],
  });

  if (direction === "pass") {
    return { matched: false };
  }

  const reciprocalCheck = await db.execute({
    sql: `SELECT direction FROM swipes WHERE swiper_id = ? AND target_id = ? AND direction IN ('like', 'right')`,
    args: [targetId, swiperId],
  });

  const isMutual = reciprocalCheck.rows.length > 0;

  if (isMutual) {
    const user1 = swiperId < targetId ? swiperId : targetId;
    const user2 = swiperId < targetId ? targetId : swiperId;
    const matchId = `match_${user1}_${user2}`;

    await db.execute({
      sql: `INSERT OR IGNORE INTO matches (id, user1_id, user2_id, matched_at) VALUES (?, ?, ?, ?)`,
      args: [matchId, user1, user2, nowUnix],
    });

    const matchedProfile: MatchedProfile = {
      ...targetProfile,
      matchedAt: nowUnix,
    };

    return {
      matched: true,
      match: matchedProfile,
    };
  }

  return { matched: false };
}

export async function getMatches(userId: string = CURRENT_USER_ID): Promise<Profile[]> {
  await ensureDbReady();
  const db = getDb();

  const query = `
    SELECT p.id, p.name, p.age, p.college, p.major, p.bio, p.avatar, p.prompts, p.interests
    FROM matches m
    JOIN profiles p ON (p.id = CASE WHEN m.user1_id = ? THEN m.user2_id ELSE m.user1_id END)
    WHERE m.user1_id = ? OR m.user2_id = ?
    ORDER BY m.matched_at DESC
  `;

  const rows = await db.execute({ sql: query, args: [userId, userId, userId] });

  return rows.rows.map((r) => ({
    id: String(r.id),
    name: String(r.name),
    age: Number(r.age),
    college: String(r.college),
    major: String(r.major),
    bio: String(r.bio),
    avatar: String(r.avatar),
    prompts: JSON.parse(String(r.prompts)),
    interests: JSON.parse(String(r.interests)),
  }));
}

export async function getProfileById(id: string): Promise<Profile | null> {
  await ensureDbReady();
  const db = getDb();
  const res = await db.execute({
    sql: `SELECT id, name, age, college, major, bio, avatar, prompts, interests FROM profiles WHERE id = ?`,
    args: [id],
  });
  if (res.rows.length === 0) return null;
  const r = res.rows[0];
  return {
    id: String(r.id),
    name: String(r.name),
    age: Number(r.age),
    college: String(r.college),
    major: String(r.major),
    bio: String(r.bio),
    avatar: String(r.avatar),
    prompts: JSON.parse(String(r.prompts)),
    interests: JSON.parse(String(r.interests)),
  };
}

export async function resetDatabase(userId: string = CURRENT_USER_ID): Promise<void> {
  await ensureDbReady();
  const db = getDb();
  await db.execute(`DELETE FROM matches`);
  await db.execute(`DELETE FROM swipes`);

  const countRes = await db.execute("SELECT COUNT(*) as c FROM profiles");
  if (Number(countRes.rows[0].c) < SEEDED_PROFILES.length) {
    await db.execute("DELETE FROM profiles");
    for (const p of SEEDED_PROFILES) {
      await db.execute({
        sql: `INSERT OR IGNORE INTO profiles (id, name, age, college, major, bio, avatar, prompts, interests)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          p.id,
          p.name,
          p.age,
          p.college,
          p.major,
          p.bio,
          p.avatar,
          JSON.stringify(p.prompts),
          JSON.stringify(p.interests),
        ],
      });
    }
  }

  for (const likerId of PRE_SEEDED_LIKERS) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO swipes (swiper_id, target_id, direction) VALUES (?, ?, 'like')`,
      args: [likerId, userId],
    });
  }
}
