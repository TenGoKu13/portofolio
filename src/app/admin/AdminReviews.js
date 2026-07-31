"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";

function Stars({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <Icons.star
          key={n}
          width={14}
          height={14}
          className={n <= rating ? "star on" : "star"}
        />
      ))}
    </span>
  );
}

export default function AdminReviews({ reviews }) {
  const router = useRouter();
  const [busy, setBusy] = useState(null);

  async function call(id, method, body) {
    setBusy(id);
    try {
      await fetch(`/api/reviews/${id}`, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body: body ? JSON.stringify(body) : undefined,
      });
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function remove(id) {
    if (!confirm("Supprimer cet avis ?")) return;
    call(id, "DELETE");
  }

  function block(id) {
    const days = Number(prompt("Bloquer l'auteur pour combien de jours ?", "7"));
    if (!days || days < 1) return;
    call(id, "POST", { action: "block", days });
  }

  function unblock(id) {
    call(id, "POST", { action: "unblock" });
  }

  if (!reviews.length) {
    return <p className="note">Aucun avis pour le moment.</p>;
  }

  return (
    <div className="admin-reviews">
      {reviews.map((r) => {
        const blocked =
          r.review_blocked_until &&
          new Date(r.review_blocked_until) > new Date();
        return (
          <article className="review" key={r.id}>
            <div className="review-top">
              <div>
                <div className="review-name">
                  {r.global_name || r.username}
                  {blocked && <span className="status past">bloqué</span>}
                </div>
                <Stars rating={r.rating} />
              </div>
            </div>
            <p className="review-body">{r.body}</p>
            <div className="admin-review-actions">
              <button
                className="btn btn-ghost"
                onClick={() => remove(r.id)}
                disabled={busy === r.id}
              >
                Supprimer
              </button>
              {blocked ? (
                <button
                  className="btn btn-ghost"
                  onClick={() => unblock(r.id)}
                  disabled={busy === r.id}
                >
                  Débloquer
                </button>
              ) : (
                <button
                  className="btn btn-ghost"
                  onClick={() => block(r.id)}
                  disabled={busy === r.id}
                >
                  Bloquer l'auteur
                </button>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
