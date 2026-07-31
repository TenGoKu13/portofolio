import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// Créer une demande (utilisateur connecté).
export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const type = String(body.type || "").slice(0, 40);
  const message = String(body.message || "").trim().slice(0, 4000);

  if (!type || !message) {
    return NextResponse.json(
      { error: "Type et message obligatoires" },
      { status: 400 }
    );
  }

  // Deadline : on ne garde qu'un format de date valide YYYY-MM-DD.
  const rawDeadline = String(body.deadline || "").trim();
  const deadline = /^\d{4}-\d{2}-\d{2}$/.test(rawDeadline) ? rawDeadline : null;

  // Checklist : tableau de chaînes -> stocké en JSON (max 20 items).
  const checklist = Array.isArray(body.checklist)
    ? JSON.stringify(
        body.checklist.map((s) => String(s).slice(0, 120)).slice(0, 20)
      )
    : null;

  const info = db
    .prepare(
      `INSERT INTO requests (user_id, type, message, deadline, checklist)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(user.id, type, message, deadline, checklist);

  return NextResponse.json({ ok: true, id: info.lastInsertRowid });
}

// Lister les demandes (admin uniquement).
export async function GET() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const rows = db
    .prepare(
      `SELECT r.*, u.username, u.global_name
       FROM requests r JOIN users u ON u.id = r.user_id
       ORDER BY r.created_at DESC`
    )
    .all();

  return NextResponse.json({ requests: rows });
}
