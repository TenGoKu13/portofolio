"use client";

import { useState } from "react";

export default function RequestForm({ types }) {
  const [type, setType] = useState(types[0]?.value || "");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "error"
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const res = await fetch("/api/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, message }),
    });

    if (res.ok) {
      setStatus("ok");
      setMessage("");
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
      <select
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {types.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <label htmlFor="message">Détaille ta demande</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Explique ce dont tu as besoin (lien, détails, deadline...)"
        required
      />

      <div style={{ marginTop: 20 }}>
        <button className="btn" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Envoi..." : "Envoyer la demande"}
        </button>
      </div>
    </form>
  );
}
