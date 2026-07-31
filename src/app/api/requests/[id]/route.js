import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const ALLOWED_STATUS = ["nouveau", "en_cours", "termine"];

// Mettre à jour le statut d'une demande (admin uniquement).
export async function PATCH(request, { params }) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const status = String(body.status || "");

  if (!ALLOWED_STATUS.includes(status)) {
    return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
  }

  db.prepare(`UPDATE requests SET status = ? WHERE id = ?`).run(status, id);
  return NextResponse.json({ ok: true });
}
