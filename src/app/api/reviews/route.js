import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// Poster (ou mettre à jour) son avis. Connexion Discord obligatoire.
export async function POST(request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  }

  // Blocage temporaire : refuse si la date de blocage est dans le futur.
  if (user.review_blocked_until) {
    const until = new Date(user.review_blocked_until);
    if (!Number.isNaN(until.getTime()) && until > new Date()) {
      return NextResponse.json(
        { error: "Tu ne peux pas laisser d'avis pour le moment." },
        { status: 403 }
      );
    }
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const rating = Math.trunc(Number(body.rating));
  const text = String(body.body || "").trim().slice(0, 1000);

  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Note invalide (1 à 5)" },
      { status: 400 }
    );
  }
  if (!text) {
    return NextResponse.json(
      { error: "Le commentaire est obligatoire" },
      { status: 400 }
    );
  }

  // Un seul avis par personne : on met à jour s'il existe déjà.
  db.prepare(
    `INSERT INTO reviews (user_id, rating, body)
     VALUES (@user_id, @rating, @body)
     ON CONFLICT(user_id) DO UPDATE SET
       rating = excluded.rating,
       body = excluded.body,
       created_at = datetime('now')`
  ).run({ user_id: user.id, rating, body: text });

  return NextResponse.json({ ok: true });
}

// Lister tous les avis (admin uniquement, pour la modération).
export async function GET() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const rows = db
    .prepare(
      `SELECT r.*, u.username, u.global_name, u.review_blocked_until
       FROM reviews r JOIN users u ON u.id = r.user_id
       ORDER BY r.created_at DESC`
    )
    .all();

  return NextResponse.json({ reviews: rows });
}
