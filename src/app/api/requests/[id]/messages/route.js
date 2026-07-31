import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// Vérifie que l'utilisateur a le droit de voir/écrire sur cette demande
// (soit c'est sa demande, soit c'est l'admin).
function loadRequestFor(user, id) {
  const request = db.prepare(`SELECT * FROM requests WHERE id = ?`).get(id);
  if (!request) return { error: "Demande introuvable", status: 404 };
  if (request.user_id !== user.id && !user.isAdmin) {
    return { error: "Accès refusé", status: 403 };
  }
  return { request };
}

// Lister les messages du fil.
export async function GET(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }
  const { id } = await params;
  const check = loadRequestFor(user, id);
  if (check.error) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const messages = db
    .prepare(
      `SELECT m.id, m.body, m.created_at, m.user_id,
              u.username, u.global_name, u.avatar
       FROM messages m JOIN users u ON u.id = m.user_id
       WHERE m.request_id = ?
       ORDER BY m.created_at ASC`
    )
    .all(id);

  return NextResponse.json({ messages });
}

// Poster un message dans le fil.
export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }
  const { id } = await params;
  const check = loadRequestFor(user, id);
  if (check.error) {
    return NextResponse.json({ error: check.error }, { status: check.status });
  }

  const body = await request.json().catch(() => ({}));
  const text = String(body.body || "").trim().slice(0, 2000);
  if (!text) {
    return NextResponse.json({ error: "Message vide" }, { status: 400 });
  }

  const info = db
    .prepare(
      `INSERT INTO messages (request_id, user_id, body) VALUES (?, ?, ?)`
    )
    .run(id, user.id, text);

  return NextResponse.json({ ok: true, id: info.lastInsertRowid });
}
