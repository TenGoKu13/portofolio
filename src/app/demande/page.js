import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RequestForm from "./RequestForm";
import { Icons } from "@/components/icons";
import db from "@/lib/db";
import { site } from "@/data/site";
import { getCurrentUser } from "@/lib/session";

export const metadata = {
  title: "Faire une demande",
  description:
    "Envoie-moi ta demande : player model GMod, site web, bot Discord ou autre. Réponse rapide.",
};

const TYPE_LABELS = Object.fromEntries(
  site.requestTypes.map((t) => [t.value, t.label])
);
const STATUS_LABELS = {
  nouveau: "Nouveau",
  en_cours: "En cours",
  termine: "Terminé",
};

export default async function DemandePage() {
  const user = await getCurrentUser();

  // Les demandes de l'utilisateur connecté (pour le suivi / la discussion).
  const myRequests = user
    ? db
        .prepare(
          `SELECT id, type, status, created_at FROM requests
           WHERE user_id = ? ORDER BY created_at DESC`
        )
        .all(user.id)
    : [];

  return (
    <>
      <Nav />
      <main className="section container">
        <div className="section-head">
          <h2>Faire une demande</h2>
          <span className="count">// direct</span>
        </div>

        {user ? (
          <>
            <p className="note" style={{ marginBottom: 20 }}>
              Connecté en tant que{" "}
              <strong>{user.global_name || user.username}</strong>. Décris ta
              demande, je la reçois directement sur mon tableau de bord.
            </p>
            <RequestForm types={site.requestTypes} checklist={site.checklist} />

            {myRequests.length > 0 && (
              <section style={{ marginTop: 44 }}>
                <div className="section-head">
                  <h2>Mes demandes</h2>
                  <span className="count">// {myRequests.length}</span>
                </div>
                <div className="req-list">
                  {myRequests.map((r) => (
                    <Link key={r.id} href={`/demande/${r.id}`} className="req-row">
                      <div>
                        <strong>{TYPE_LABELS[r.type] || r.type}</strong>
                        <div className="note" style={{ fontSize: "0.8rem" }}>
                          {new Date(r.created_at + "Z").toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                      <div className="req-row-right">
                        <span className={`status ${r.status}`}>
                          {STATUS_LABELS[r.status] || r.status}
                        </span>
                        <span className="req-open">
                          Ouvrir <Icons.arrow width={15} height={15} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="center-narrow">
            <p className="note" style={{ marginBottom: 20 }}>
              Connecte-toi avec ton compte Discord pour envoyer une demande.
            </p>
            <a className="btn btn-indigo" href="/api/auth/login">
              Se connecter avec Discord
            </a>
          </div>
        )}

        <Footer />
      </main>
    </>
  );
}
