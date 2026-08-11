import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PlayerModelsGallery from "@/components/PlayerModelsGallery";
import { Icons } from "@/components/icons";
import { site } from "@/data/site";

export const metadata = {
  title: "Player Models",
  description: "Galerie de player models Garry's Mod créés par TenGoKu.",
};

export default function PlayerModelsPage() {
  const items = site.playerModels || [];

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
              <span className="badge">Garry's Mod</span>
              <h1>Player Models</h1>
              <p className="project-sub">Création, port, rig & optimisation</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="project-desc">
              Une sélection de player models réalisés sur mesure pour Garry's
              Mod. Clique sur une image pour l'agrandir.
            </p>
          </Reveal>
        </header>

        <section className="section" style={{ paddingTop: 20 }}>
          {items.length > 0 ? (
            <Reveal>
              <PlayerModelsGallery items={items} />
            </Reveal>
          ) : (
            <Reveal>
              <div className="pm-empty">
                <p>La galerie arrive bientôt — de nouveaux rendus sont en préparation.</p>
                <a
                  className="btn btn-indigo"
                  href={`https://discord.com/users/${site.discordUserId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icons.discord /> Commander un player model
                </a>
              </div>
            </Reveal>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
