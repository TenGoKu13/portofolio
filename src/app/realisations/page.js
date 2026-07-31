import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import WebExamples from "@/components/WebExamples";
import { site } from "@/data/site";

export const metadata = {
  title: "Réalisations web",
  description: "Sites et applications web réalisés par TenGoKu.",
};

export default function RealisationsPage() {
  const examples = site.webExamples || [];

  return (
    <>
      <Nav />

      <div className="container">
        <div className="reveal in" style={{ paddingTop: 28 }}>
          <Link href="/" className="back-link">
            <span className="back-arrow">←</span> Retour à l'accueil
          </Link>
        </div>

        <header className="project-hero">
          <Reveal>
            <div className="project-head">
              <span className="badge">Portfolio</span>
              <h1>Réalisations web</h1>
              <p className="project-sub">Sites & applications sur mesure</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="project-desc">
              Une sélection de sites et plateformes que j'ai conçus et
              développés. Clique sur un projet pour voir le détail : aperçus,
              fonctionnalités et stack technique.
            </p>
          </Reveal>
        </header>

        {examples.length > 0 ? (
          <WebExamples examples={examples} showHeading={false} />
        ) : (
          <p className="note" style={{ padding: "40px 0" }}>
            Aucune réalisation à afficher pour le moment.
          </p>
        )}

        <Footer />
      </div>
    </>
  );
}
