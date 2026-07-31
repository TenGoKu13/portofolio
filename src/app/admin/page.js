import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdminTable from "./AdminTable";
import AdminReviews from "./AdminReviews";
import db from "@/lib/db";
import { site } from "@/data/site";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: `Admin — ${site.name}` };

const TYPE_LABELS = Object.fromEntries(
  site.requestTypes.map((t) => [t.value, t.label])
);

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user?.isAdmin) {
    return (
      <>
        <Nav />
        <main className="section container center-narrow">
          <h2>Admin</h2>
          <p className="note">
            Cette page est réservée à l'administrateur.
            {!user && " Connecte-toi avec le compte Discord admin."}
          </p>
        </main>
      </>
    );
  }

  const requests = db
    .prepare(
      `SELECT r.*, u.username, u.global_name
       FROM requests r JOIN users u ON u.id = r.user_id
       ORDER BY r.created_at DESC`
    )
    .all();

  const reviews = db
    .prepare(
      `SELECT r.*, u.username, u.global_name, u.review_blocked_until
       FROM reviews r JOIN users u ON u.id = r.user_id
       ORDER BY r.created_at DESC`
    )
    .all();

  return (
    <>
      <Nav />
      <main className="section container">
        <div className="section-head">
          <h2>Demandes reçues</h2>
          <span className="count">// {requests.length}</span>
        </div>
        {requests.length === 0 ? (
          <p className="note">Aucune demande pour le moment.</p>
        ) : (
          <AdminTable requests={requests} typeLabels={TYPE_LABELS} />
        )}

        <div className="section-head" style={{ marginTop: 48 }}>
          <h2>Avis clients</h2>
          <span className="count">// {reviews.length}</span>
        </div>
        <AdminReviews reviews={reviews} />
      </main>
      <div className="container">
        <Footer />
      </div>
    </>
  );
}
