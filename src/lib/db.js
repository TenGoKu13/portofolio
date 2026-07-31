import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// La base est un simple fichier SQLite dans /data.
// Parfait pour un VPS : zéro service à gérer, une sauvegarde = une copie de fichier.
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(path.join(dataDir, "site.db"));
db.pragma("journal_mode = WAL");

// Schéma : utilisateurs (via Discord), sessions, et demandes.
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            TEXT PRIMARY KEY,      -- id Discord
    username      TEXT NOT NULL,
    global_name   TEXT,
    avatar        TEXT,
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token       TEXT PRIMARY KEY,
    user_id     TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS requests (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     TEXT NOT NULL,
    type        TEXT NOT NULL,           -- ex: "playermodel", "site", "bot", "autre"
    message     TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'nouveau',  -- nouveau / en_cours / termine
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

export default db;
