import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MessageThread from "./MessageThread";
import RequestProgress from "./RequestProgress";
import { Icons } from "@/components/icons";
import db from "@/lib/db";
import { site } from "@/data/site";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: `Suivi de demande — ${site.name}` };

const TYPE_LABELS = Object.fromEntries(
  site.requestTypes.map((t) => [t.value, t.label])
);

export default async function RequestThreadPage({ params }) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user) {
    return (
      <>
        <Nav />
        <main className="section container center-narrow">
          <p className="note" style={{ marginBottom: 20 }}>
            Connecte-toi pour voir cette demande.
          </p>
          <a className="btn btn-indigo" href="/api/auth/login">
            Se connecter avec Discord
          </a>
        </main>
      </>
    );
  }

  const request = db.prepare(`SELECT * FROM requests WHERE id = ?`).get(id);
  const allowed = request && (request.user_id === user.id || user.isAdmin);

  if (!allowed) {
    return (
      <>
        <Nav />
        <main className="section container center-narrow">
          <p className="note">Demande introuvable ou accès refusé.</p>
          <Link className="btn btn-ghost" href="/demande">
            Retour
          </Link>
        </main>
      </>
    );
  }

  const steps = db
    .prepare(
      `SELECT id, label, done, position FROM request_steps
       WHERE request_id = ? ORDER BY position ASC, id ASC`
    )
    .all(request.id);

  const dmLink = site.discordUserId
    ? `https://discord.com/users/${site.discordUserId}`
    : null;

  return (
    <>
      <Nav />
      <main className="section container legal">
        <div className="section-head">
          <h2 style={{ fontSize: "clamp(1.3rem,3vw,1.8rem)", margin: 0 }}>
            Demande #{request.id}
          </h2>
          <span className="count">// {TYPE_LABELS[request.type] || request.type}</span>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{request.message}</p>
          {request.deadline && (
            <p className="note" style={{ marginTop: 10, marginBottom: 0 }}>
              Deadline souhaitée :{" "}
              {new Date(request.deadline + "T00:00:00").toLocaleDateString(
                "fr-FR"
              )}
            </p>
          )}
        </div>

        <RequestProgress
          requestId={request.id}
          isAdmin={user.isAdmin}
          initialSteps={steps}
          initialDeadline={request.deadline}
        />

        {/* Contacter TenGoKu directement en DM Discord */}
        {!user.isAdmin && dmLink && (
          <p style={{ marginBottom: 22 }}>
            <a className="btn btn-indigo" href={dmLink} target="_blank" rel="noreferrer">
              <Icons.discord /> Me contacter en DM Discord
            </a>
          </p>
        )}

        <h2 style={{ marginTop: 0 }}>Discussion</h2>
        <MessageThread requestId={request.id} currentUserId={user.id} />

        <div style={{ marginTop: 28 }}>
          <Link className="btn btn-ghost" href={user.isAdmin ? "/admin" : "/demande"}>
            ← Retour
          </Link>
        </div>

        <Footer />
      </main>
    </>
  );
}
