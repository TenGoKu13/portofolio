import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RequestForm from "./RequestForm";
import { site } from "@/data/site";
import { getCurrentUser } from "@/lib/session";

export const metadata = { title: `Faire une demande — ${site.name}` };

export default async function DemandePage() {
  const user = await getCurrentUser();

  return (
    <>
      <Nav />
      <main className="section container">
        <h2>Faire une demande</h2>

        {user ? (
          <>
            <p className="note" style={{ marginBottom: 20 }}>
              Connecté en tant que{" "}
              <strong>{user.global_name || user.username}</strong>. Décris ta
              demande, je la reçois directement sur mon tableau de bord.
            </p>
            <RequestForm types={site.requestTypes} />
          </>
        ) : (
          <div className="center-narrow">
            <p className="note" style={{ marginBottom: 20 }}>
              Connecte-toi avec ton compte Discord pour envoyer une demande.
            </p>
            <a className="btn" href="/api/auth/login">
              Se connecter avec Discord
            </a>
          </div>
        )}
      </main>
      <div className="container">
        <Footer />
      </div>
    </>
  );
}
