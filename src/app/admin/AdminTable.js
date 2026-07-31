"use client";

import { useState } from "react";

const STATUS_LABELS = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  termine: "Terminé",
};

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
              <td>{typeLabels[r.type] || r.type}</td>
              <td style={{ maxWidth: 320, whiteSpace: "pre-wrap" }}>
                {r.message}
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
