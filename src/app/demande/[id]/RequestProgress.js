"use client";

import { useState } from "react";

// Suivi d'avancement d'une demande : todo list de progression + deadline.
// - Le client voit tout en lecture seule (barre + étapes cochées).
// - L'admin peut ajouter/cocher/supprimer des étapes et changer la deadline.
export default function RequestProgress({
  requestId,
  isAdmin,
  initialSteps = [],
  initialDeadline = null,
}) {
  const [steps, setSteps] = useState(initialSteps);
  const [deadline, setDeadline] = useState(initialDeadline || "");
  const [newLabel, setNewLabel] = useState("");
  const [savingDeadline, setSavingDeadline] = useState(false);

  const total = steps.length;
  const done = steps.filter((s) => s.done).length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  async function addStep(e) {
    e.preventDefault();
    const label = newLabel.trim();
    if (!label) return;
    const res = await fetch(`/api/requests/${requestId}/steps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });
    if (res.ok) {
      const data = await res.json();
      setSteps((prev) => [...prev, data.step]);
      setNewLabel("");
    }
  }

  async function toggle(step) {
    const nextDone = step.done ? 0 : 1;
    setSteps((prev) =>
      prev.map((s) => (s.id === step.id ? { ...s, done: nextDone } : s))
    );
    await fetch(`/api/requests/${requestId}/steps/${step.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: nextDone }),
    });
  }

  async function remove(step) {
    setSteps((prev) => prev.filter((s) => s.id !== step.id));
    await fetch(`/api/requests/${requestId}/steps/${step.id}`, {
      method: "DELETE",
    });
  }

  async function saveDeadline() {
    setSavingDeadline(true);
    try {
      await fetch(`/api/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deadline }),
      });
    } finally {
      setSavingDeadline(false);
    }
  }

  // Rien à montrer au client s'il n'y a aucune étape ni deadline.
  if (!isAdmin && total === 0) return null;

  return (
    <div className="progress-box">
      <div className="progress-head">
        <h3>Avancement</h3>
        {total > 0 && (
          <span className="progress-pct">
            {done}/{total} · {pct}%
          </span>
        )}
      </div>

      {total > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      )}

      <ul className="progress-steps">
        {steps.map((s) => (
          <li key={s.id} className={`progress-step ${s.done ? "done" : ""}`}>
            {isAdmin ? (
              <label className="check-item" style={{ margin: 0 }}>
                <input
                  type="checkbox"
                  checked={!!s.done}
                  onChange={() => toggle(s)}
                />
                <span>{s.label}</span>
              </label>
            ) : (
              <span className="step-view">
                <span className="step-mark">{s.done ? "✓" : "○"}</span>
                {s.label}
              </span>
            )}
            {isAdmin && (
              <button
                type="button"
                className="step-del"
                onClick={() => remove(s)}
                aria-label="Supprimer l'étape"
              >
                ✕
              </button>
            )}
          </li>
        ))}
        {total === 0 && isAdmin && (
          <li className="note">Aucune étape. Ajoute-en pour montrer où tu en es.</li>
        )}
      </ul>

      {isAdmin && (
        <>
          <form className="step-add" onSubmit={addStep}>
            <input
              type="text"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Nouvelle étape (ex: Modélisation en cours)"
              maxLength={200}
            />
            <button className="btn" type="submit">
              Ajouter
            </button>
          </form>

          <div className="deadline-edit">
            <label htmlFor="dl" style={{ margin: 0 }}>
              Deadline
            </label>
            <div className="deadline-row">
              <input
                id="dl"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              <button
                className="btn btn-ghost"
                type="button"
                onClick={saveDeadline}
                disabled={savingDeadline}
              >
                {savingDeadline ? "..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
