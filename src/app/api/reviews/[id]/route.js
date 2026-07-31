import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// Supprimer un avis (admin uniquement).
export async function DELETE(_request, { params }) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id } = await params;
  db.prepare(`DELETE FROM reviews WHERE id = ?`).run(id);
  return NextResponse.json({ ok: true });
}

// Bloquer / débloquer temporairement l'auteur d'un avis (admin uniquement).
// body: { action: "block", days: 7 }  ou  { action: "unblock" }
export async function POST(request, { params }) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id } = await params;
  const review = db.prepare(`SELECT user_id FROM reviews WHERE id = ?`).get(id);
  if (!review) {
    return NextResponse.json({ error: "Avis introuvable" }, { status: 404 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  if (body.action === "unblock") {
    db.prepare(`UPDATE users SET review_blocked_until = NULL WHERE id = ?`).run(
      review.user_id
    );
    return NextResponse.json({ ok: true, blocked_until: null });
  }

  if (body.action === "block") {
    const days = Math.min(Math.max(Math.trunc(Number(body.days) || 7), 1), 365);
    const until = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const iso = until.toISOString();
    db.prepare(`UPDATE users SET review_blocked_until = ? WHERE id = ?`).run(
      iso,
      review.user_id
    );
    return NextResponse.json({ ok: true, blocked_until: iso });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
