"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

// Formulaire d'avis : note en étoiles + commentaire.
// `initial` pré-remplit si l'utilisateur a déjà laissé un avis.
export default function ReviewForm({ initial }) {
  const router = useRouter();
  const [rating, setRating] = useState(initial?.rating || 0);
  const [hover, setHover] = useState(0);
  const [body, setBody] = useState(initial?.body || "");
  const [status, setStatus] = useState(null); // null | "loading" | "ok" | error string

  async function submit(e) {
    e.preventDefault();
    if (rating < 1) {
      setStatus("Choisis une note.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus(data.error || "Une erreur est survenue.");
        return;
      }
      setStatus("ok");
      router.refresh();
    } catch {
      setStatus("Impossible d'envoyer l'avis.");
    }
  }

  const shown = hover || rating;

  return (
    <form className="review-form" onSubmit={submit}>
      {status === "ok" && (
        <div className="success">Merci pour ton avis ! 🙏</div>
      )}
      {status && status !== "ok" && status !== "loading" && (
        <div className="alert">{status}</div>
      )}

      <label>Ta note</label>
      <div className="stars-input" role="radiogroup" aria-label="Note">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            className={`star-btn ${n <= shown ? "on" : ""}`}
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
            aria-pressed={n === rating}
          >
            <Icons.star width={26} height={26} />
          </button>
        ))}
      </div>

      <label htmlFor="review-body">Ton commentaire</label>
      <textarea
        id="review-body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Décris ton expérience (qualité, délais, contact...)"
        maxLength={1000}
        required
      />

      <div style={{ marginTop: 16 }}>
        <button className="btn" type="submit" disabled={status === "loading"}>
          {status === "loading"
            ? "Envoi..."
            : initial
            ? "Mettre à jour mon avis"
            : "Publier mon avis"}
          <Icons.arrow />
        </button>
      </div>
    </form>
  );
}
