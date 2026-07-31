"use client";

import { useState } from "react";
import { Icons } from "@/components/icons";

export default function RequestForm({ types, checklist = [] }) {
  const [type, setType] = useState(types[0]?.value || "");
  const currentEta = types.find((t) => t.value === type)?.eta;
  const [message, setMessage] = useState("");
  const [deadline, setDeadline] = useState("");
  const [checked, setChecked] = useState([]);
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "error"
  const [error, setError] = useState("");

  // Date minimale = aujourd'hui (pas de deadline dans le passé).
  const today = new Date().toISOString().split("T")[0];

  function toggle(item) {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, message, deadline, checklist: checked }),
    });

    if (res.ok) {
      setStatus("ok");
      setMessage("");
      setDeadline("");
      setChecked([]);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Une erreur est survenue.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="form">
        <div className="success">
          ✅ Ta demande a bien été envoyée. Je te recontacte sur Discord !
        </div>
        <button className="btn btn-ghost" onClick={() => setStatus(null)}>
          Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {status === "error" && <div className="alert">{error}</div>}

      <label htmlFor="type">Type de demande</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        {types.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {currentEta && (
        <div className="eta">
          <Icons.clock width={16} height={16} />
          <span>
            Temps estimé : <strong>{currentEta}</strong>
          </span>
        </div>
      )}

      <label htmlFor="deadline">Date souhaitée (deadline) — optionnel</label>
      <input
        id="deadline"
        type="date"
        min={today}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      {checklist.length > 0 && (
        <>
          <label>Options (coche ce qui s&apos;applique)</label>
          <div className="checklist">
            {checklist.map((item) => (
              <label key={item} className="check-item">
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => toggle(item)}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </>
      )}

      <label htmlFor="message">Détaille ta demande</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Explique ce dont tu as besoin (lien, références, détails...)"
        required
      />

      <div style={{ marginTop: 22 }}>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi..." : "Envoyer la demande"}
        </button>
      </div>
    </form>
  );
}
