"use client";

import { useState } from "react";

const STATUS_LABELS = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  termine: "Terminé",
};

// Parse la checklist stockée en JSON (tolérant aux valeurs vides/invalides).
function parseChecklist(raw) {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

// Affiche la deadline avec un repère de couleur : rouge si passée,
// jaune si dans moins de 3 jours, sinon normal.
function renderDeadline(deadline) {
  if (!deadline) return <span className="note">—</span>;
  const target = new Date(deadline + "T00:00:00");
  const now = new Date();
  const days = Math.ceil((target - now) / 86400000);
  let cls = "termine"; // vert par défaut (large)
  let extra = "";
  if (days < 0) {
    cls = "past";
    extra = " (dépassée)";
  } else if (days <= 3) {
    cls = "en_cours";
    extra = ` (J-${days})`;
  }
  const label = target.toLocaleDateString("fr-FR");
  return <span className={`status ${cls}`}>{label}{extra}</span>;
}

export default function AdminTable({ requests, typeLabels }) {
  const [items, setItems] = useState(requests);

  async function updateStatus(id, status) {
    const res = await fetch(`/api/requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status } : r))
      );
    }
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>De</th>
            <th>Type</th>
            <th>Deadline</th>
            <th>Message</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.id}>
              <td style={{ whiteSpace: "nowrap" }}>
                {new Date(r.created_at + "Z").toLocaleString("fr-FR")}
              </td>
              <td style={{ whiteSpace: "nowrap" }}>
                {r.global_name || r.username}
                <br />
                <span className="note" style={{ fontSize: "0.75rem" }}>
                  @{r.username}
                </span>
              </td>
              <td>
                {typeLabels[r.type] || r.type}
                <br />
                <a href={`/demande/${r.id}`} className="req-open">
                  Discussion →
                </a>
              </td>
              <td style={{ whiteSpace: "nowrap" }}>{renderDeadline(r.deadline)}</td>
              <td style={{ maxWidth: 320 }}>
                <div style={{ whiteSpace: "pre-wrap" }}>{r.message}</div>
                {parseChecklist(r.checklist).length > 0 && (
                  <div className="tags" style={{ marginTop: 8 }}>
                    {parseChecklist(r.checklist).map((c) => (
                      <span className="tag" key={c}>
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                )}
              </td>
              <td>
                <span className={`status ${r.status}`}>
                  {STATUS_LABELS[r.status] || r.status}
                </span>
                <select
                  value={r.status}
                  onChange={(e) => updateStatus(r.id, e.target.value)}
                  style={{ marginTop: 8, fontSize: "0.8rem", padding: "6px 8px" }}
                >
                  <option value="nouveau">Nouveau</option>
                  <option value="en_cours">En cours</option>
                  <option value="termine">Terminé</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
