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
    type        TEXT NOT NULL,           -- ex: "pm_create", "site", "bot", "autre"
    message     TEXT NOT NULL,
    deadline    TEXT,                    -- date souhaitée (YYYY-MM-DD), optionnelle
    checklist   TEXT,                    -- options cochées (JSON), optionnelle
    status      TEXT NOT NULL DEFAULT 'nouveau',  -- nouveau / en_cours / termine
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id  INTEGER NOT NULL,
    user_id     TEXT NOT NULL,           -- auteur du message
    body        TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (request_id) REFERENCES requests(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     TEXT NOT NULL UNIQUE,    -- 1 avis par personne (mis à jour si re-posté)
    rating      INTEGER NOT NULL,        -- note de 1 à 5
    body        TEXT NOT NULL,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Migration légère : blocage temporaire d'un auteur d'avis (date ISO ou null).
const userCols = db.prepare(`PRAGMA table_info(users)`).all().map((c) => c.name);
if (!userCols.includes("review_blocked_until")) {
  db.exec(`ALTER TABLE users ADD COLUMN review_blocked_until TEXT`);
}

// Migration légère : ajoute les colonnes si une ancienne base existe déjà.
const cols = db.prepare(`PRAGMA table_info(requests)`).all().map((c) => c.name);
if (!cols.includes("deadline")) {
  db.exec(`ALTER TABLE requests ADD COLUMN deadline TEXT`);
}
if (!cols.includes("checklist")) {
  db.exec(`ALTER TABLE requests ADD COLUMN checklist TEXT`);
}

export default db;
