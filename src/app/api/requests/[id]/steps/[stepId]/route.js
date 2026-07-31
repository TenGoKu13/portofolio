import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

// Modifier une étape (cocher/décocher ou renommer). Admin uniquement.
export async function PATCH(request, { params }) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id, stepId } = await params;
  const body = await request.json().catch(() => ({}));

  if (body.done !== undefined) {
    db.prepare(
      `UPDATE request_steps SET done = ? WHERE id = ? AND request_id = ?`
    ).run(body.done ? 1 : 0, stepId, id);
  }

  if (body.label !== undefined) {
    const label = String(body.label || "").trim().slice(0, 200);
    if (label) {
      db.prepare(
        `UPDATE request_steps SET label = ? WHERE id = ? AND request_id = ?`
      ).run(label, stepId, id);
    }
  }

  return NextResponse.json({ ok: true });
}

// Supprimer une étape. Admin uniquement.
export async function DELETE(_request, { params }) {
  const user = await getCurrentUser();
  if (!user?.isAdmin) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { id, stepId } = await params;
  db.prepare(
    `DELETE FROM request_steps WHERE id = ? AND request_id = ?`
  ).run(stepId, id);

  return NextResponse.json({ ok: true });
}
