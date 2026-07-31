import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata = { title: `Conditions d'utilisation — ${site.name}` };

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="section container legal">
        <div className="section-head">
          <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2rem)", margin: 0 }}>
            Conditions d&apos;utilisation
          </h2>
        </div>
        <p className="updated">Dernière mise à jour : {site.legal.lastUpdated}</p>

        <p>
          Bienvenue sur {site.name}. En utilisant ce site et en effectuant une
          demande, vous acceptez les conditions ci-dessous.
        </p>

        <h2>1. Objet du site</h2>
        <p>
          Ce site présente les projets de {site.name} (player models, sites web,
          bots Discord, outils) et permet aux visiteurs connectés d&apos;envoyer
          des demandes de prestation.
        </p>

        <h2>2. Connexion</h2>
        <p>
          La connexion se fait via Discord (OAuth2). En vous connectant, vous
          autorisez le site à afficher votre nom d&apos;utilisateur et votre
          avatar Discord afin d&apos;identifier vos demandes.
        </p>

        <h2>3. Demandes</h2>
        <ul>
          <li>Les demandes envoyées sont indicatives et ne constituent pas un contrat.</li>
          <li>
            Les temps estimés affichés sont donnés à titre indicatif et peuvent
            varier selon la charge et la complexité.
          </li>
          <li>
            {site.name} se réserve le droit d&apos;accepter, de refuser ou de ne
            pas donner suite à une demande, sans justification.
          </li>
        </ul>

        <h2>4. Contenu et propriété</h2>
        <p>
          Vous êtes responsable du contenu que vous fournissez (liens,
          références, fichiers). Vous garantissez disposer des droits
          nécessaires sur ce contenu. Tout contenu illégal ou portant atteinte
          aux droits d&apos;autrui est interdit.
        </p>

        <h2>5. Responsabilité</h2>
        <p>
          Le site est fourni « en l&apos;état », sans garantie. {site.name} ne
          saurait être tenu responsable d&apos;éventuels dommages liés à
          l&apos;utilisation du site ou des livrables.
        </p>

        <h2>6. Droit applicable</h2>
        <p>
          Les présentes conditions sont régies par le droit {site.legal.country}.
          Tout litige relève des tribunaux compétents en {site.legal.country}.
        </p>

        <h2>7. Hébergeur</h2>
        <p>
          Le site est hébergé sur un {site.legal.host.product} chez{" "}
          <strong>{site.legal.host.name}</strong>, {site.legal.host.address} (
          <a href={site.legal.host.website} target="_blank" rel="noreferrer">
            {site.legal.host.website}
          </a>
          ).
        </p>

        <h2>8. Contact</h2>
        <p>
          Pour toute question :{" "}
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
