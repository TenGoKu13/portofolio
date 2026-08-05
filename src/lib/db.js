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
// IMPORTANT : régler busy_timeout AVANT tout le reste. Le passage en WAL et
// les CREATE/ALTER ci-dessous prennent un verrou exclusif ; si le build Next
// (qui collecte les pages en parallèle) ou un serveur pm2 tourne en même temps,
// on veut attendre le verrou au lieu d'échouer immédiatement sur
// "database is locked". Réglé en second, ce timeout ne couvrait pas le passage
// en WAL — c'était là que le build échouait.
db.pragma("busy_timeout = 15000");
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

  CREATE TABLE IF NOT EXISTS request_steps (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    request_id  INTEGER NOT NULL,
    label       TEXT NOT NULL,
    done        INTEGER NOT NULL DEFAULT 0,   -- 0 = à faire, 1 = fait
    position    INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (request_id) REFERENCES requests(id)
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

// Ajoute une colonne si elle manque, en tolérant les courses entre process
// (le build Next collecte les pages en parallèle -> deux ALTER simultanés).
function addColumnIfMissing(table, column, definition) {
  const cols = db.prepare(`PRAGMA table_info(${table})`).all().map((c) => c.name);
  if (cols.includes(column)) return;
  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  } catch (err) {
    if (!/duplicate column name/i.test(String(err.message))) throw err;
  }
}

// Migrations légères (bases existantes / neuves).
addColumnIfMissing("users", "review_blocked_until", "TEXT");
addColumnIfMissing("sessions", "expires_at", "TEXT");
addColumnIfMissing("requests", "deadline", "TEXT");
addColumnIfMissing("requests", "checklist", "TEXT");

export default db;
