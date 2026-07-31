import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata = { title: `Confidentialité — ${site.name}` };

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="section container legal">
        <div className="section-head">
          <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2rem)", margin: 0 }}>
            Politique de confidentialité
          </h2>
        </div>
        <p className="updated">Dernière mise à jour : {site.legal.lastUpdated}</p>

        <p>
          Cette politique explique quelles données sont collectées, pourquoi, et
          comment elles sont traitées, conformément à la loi fédérale
          {" "}{site.legal.country} sur la protection des données (nLPD).
        </p>

        <h2>1. Données collectées</h2>
        <ul>
          <li>
            <strong>Compte Discord</strong> : identifiant, nom d&apos;utilisateur
            et avatar, obtenus via la connexion Discord (scope
            <code> identify</code>).
          </li>
          <li>
            <strong>Demandes</strong> : type, message, date souhaitée, options
            cochées et messages échangés dans le fil de la demande.
          </li>
        </ul>
        <p>
          Aucune donnée bancaire n&apos;est collectée. Aucun mot de passe
          Discord n&apos;est reçu ni stocké.
        </p>

        <h2>2. Utilisation des données</h2>
        <p>
          Ces données servent uniquement à identifier vos demandes, à y répondre
          et à échanger avec vous. Elles ne sont ni vendues, ni louées, ni
          transmises à des tiers à des fins commerciales.
        </p>

        <h2>3. Hébergement</h2>
        <p>
          Le site et sa base de données sont hébergés sur un serveur privé.
          Les données sont conservées aussi longtemps que nécessaire au suivi
          des demandes.
        </p>

        <h2>4. Cookies</h2>
        <p>
          Un unique cookie de session (strictement nécessaire) est utilisé pour
          vous garder connecté. Aucun cookie publicitaire ni traceur tiers
          n&apos;est utilisé.
        </p>

        <h2>5. Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression
          de vos données à tout moment en écrivant à{" "}
          <a href={`mailto:${site.legal.contactEmail}`}>
            {site.legal.contactEmail}
          </a>
          . Vous pouvez aussi vous déconnecter pour mettre fin à la session.
        </p>

        <h2>6. Contact</h2>
        <p>
          Responsable du traitement : {site.name} ({site.legal.country}). Contact
          :{" "}
          <a href={`mailto:${site.legal.contactEmail}`}>
            {site.legal.contactEmail}
          </a>
          .
        </p>

        <Footer />
      </main>
    </>
  );
}
