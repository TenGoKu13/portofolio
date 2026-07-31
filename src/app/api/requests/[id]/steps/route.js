import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// Ajouter une étape de progression à une demande (admin uniquement).
export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id } = await params;
  const exists = db.prepare(`SELECT id FROM requests WHERE id = ?`).get(id);
  if (!exists) {
    return NextResponse.json({ error: "Demande introuvable" }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  const label = String(body.label || "").trim().slice(0, 200);
  if (!label) {
    return NextResponse.json({ error: "Intitulé requis" }, { status: 400 });
  }

  const pos =
    db
      .prepare(
        `SELECT COALESCE(MAX(position), 0) + 1 AS n FROM request_steps WHERE request_id = ?`
      )
      .get(id).n || 1;

  const info = db
    .prepare(
      `INSERT INTO request_steps (request_id, label, position) VALUES (?, ?, ?)`
    )
    .run(id, label, pos);

  return NextResponse.json({
    ok: true,
    step: { id: info.lastInsertRowid, label, done: 0, position: pos },
  });
}
