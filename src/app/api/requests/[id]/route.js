import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

const ALLOWED_STATUS = ["nouveau", "en_cours", "termine"];

// Mettre à jour une demande (admin uniquement) : statut et/ou deadline.
export async function PATCH(request, { params }) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  // Statut (optionnel)
  if (body.status !== undefined) {
    const status = String(body.status || "");
    if (!ALLOWED_STATUS.includes(status)) {
      return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
    }
    db.prepare(`UPDATE requests SET status = ? WHERE id = ?`).run(status, id);
  }

  // Deadline (optionnelle) : "" ou null pour l'effacer, sinon YYYY-MM-DD valide.
  if (body.deadline !== undefined) {
    const raw = String(body.deadline || "").trim();
    if (raw === "") {
      db.prepare(`UPDATE requests SET deadline = NULL WHERE id = ?`).run(id);
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      db.prepare(`UPDATE requests SET deadline = ? WHERE id = ?`).run(raw, id);
    } else {
      return NextResponse.json({ error: "Date invalide" }, { status: 400 });
    }
  }

  return NextResponse.json({ ok: true });
}
