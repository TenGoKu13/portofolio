import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { avatarUrl } from "@/lib/discord";
import { Icons } from "@/components/icons";
import Reveal from "@/components/Reveal";
import ReviewForm from "@/components/ReviewForm";

// Affiche N étoiles pleines / vides pour une note.
function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icons.star
          key={n}
          width={16}
          height={16}
          className={n <= rating ? "star on" : "star"}
        />
      ))}
    </span>
  );
}

// Section "Avis clients" : liste publique + formulaire (connexion Discord).
// Server component : lit directement la base et l'utilisateur courant.
export default async function Reviews() {
  const user = await getCurrentUser();

  const reviews = db
    .prepare(
      `SELECT r.id, r.rating, r.body, r.created_at, u.id AS user_id,
              u.username, u.global_name, u.avatar
       FROM reviews r JOIN users u ON u.id = r.user_id
       ORDER BY r.created_at DESC`
    )
    .all();

  const count = reviews.length;
  const avg = count
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10
    : 0;

  const myReview = user ? reviews.find((r) => r.user_id === user.id) : null;
  const blocked =
    user?.review_blocked_until &&
    new Date(user.review_blocked_until) > new Date();

  return (
    <section className="section" id="avis">
      <Reveal>
        <div className="section-head">
          <h2>Avis clients</h2>
          <span className="count">
            {count > 0 ? (
              <>
                // {avg}/5 · {count} avis
              </>
            ) : (
              <>// témoignages</>
            )}
          </span>
        </div>
      </Reveal>

      {count > 0 && (
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 60}>
              <article className="review">
                <div className="review-top">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="review-avatar"
                    src={avatarUrl(r)}
                    alt=""
                    loading="lazy"
                  />
                  <div>
                    <div className="review-name">
                      {r.global_name || r.username}
                    </div>
                    <Stars rating={r.rating} />
                  </div>
                </div>
                <p className="review-body">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal delay={80}>
        <div className="review-cta">
          {!user ? (
            <>
              <p className="note" style={{ marginTop: 0 }}>
                Tu as fait appel à mes services ? Connecte-toi pour laisser un
                avis.
              </p>
              <a className="btn btn-indigo" href="/api/auth/login">
                Se connecter avec Discord
              </a>
            </>
          ) : blocked ? (
            <p className="note" style={{ marginTop: 0 }}>
              Tu ne peux pas laisser d'avis pour le moment.
            </p>
          ) : (
            <>
              <h3 className="review-form-title">
                {myReview ? "Modifier ton avis" : "Laisser un avis"}
              </h3>
              <ReviewForm initial={myReview || null} />
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}
