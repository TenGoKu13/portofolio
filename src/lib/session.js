import crypto from "node:crypto";
import { cookies } from "next/headers";
import db from "./db";

const COOKIE_NAME = "session";
const SESSION_DAYS = 30;

// On ne stocke JAMAIS le jeton en clair en base : seulement son hash SHA-256.
// Le cookie garde le jeton brut ; à la lecture on re-hash pour comparer.
function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Crée une session en base et pose le cookie correspondant.
export async function createSession(user) {
  db.prepare(
    `INSERT INTO users (id, username, global_name, avatar)
     VALUES (@id, @username, @global_name, @avatar)
     ON CONFLICT(id) DO UPDATE SET
       username = excluded.username,
       global_name = excluded.global_name,
       avatar = excluded.avatar`
  ).run({
    id: user.id,
    username: user.username,
    global_name: user.global_name ?? null,
    avatar: user.avatar ?? null,
  });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  ).toISOString();

  db.prepare(
    `INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)`
  ).run(hashToken(token), user.id, expiresAt);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * SESSION_DAYS,
  });
}

// Récupère l'utilisateur connecté à partir du cookie de session (ou null).
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const row = db
    .prepare(
      `SELECT u.* FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token = ?
         AND (s.expires_at IS NULL OR s.expires_at > ?)`
    )
    .get(hashToken(token), new Date().toISOString());

  if (!row) return null;
  return { ...row, isAdmin: row.id === process.env.ADMIN_DISCORD_ID };
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token) {
    db.prepare(`DELETE FROM sessions WHERE token = ?`).run(hashToken(token));
    cookieStore.delete(COOKIE_NAME);
  }
}

// Purge des sessions expirées (appelée ponctuellement, best-effort).
export function purgeExpiredSessions() {
  db.prepare(
    `DELETE FROM sessions WHERE expires_at IS NOT NULL AND expires_at < ?`
  ).run(new Date().toISOString());
}
