import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import ProjectGallery from "@/components/ProjectGallery";
import { Icons } from "@/components/icons";
import { site } from "@/data/site";

const examples = site.webExamples || [];

// Génère une page statique par réalisation.
export function generateStaticParams() {
  return examples.filter((e) => e.slug).map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }) {
  const ex = examples.find((e) => e.slug === params.slug);
  if (!ex) return {};
  return {
    title: ex.title,
    description: ex.subtitle || ex.description,
  };
}

export default function RealisationPage({ params }) {
  const ex = examples.find((e) => e.slug === params.slug);
  if (!ex) notFound();

  return (
    <>
      <Nav />

      <div className="container">
        <div className="reveal in" style={{ paddingTop: 28 }}>
          <Link href="/realisations" className="back-link">
            <span className="back-arrow">←</span> Retour aux réalisations
          </Link>
        </div>

        <header className="project-hero">
          <Reveal>
            <div className="project-head">
              {ex.status && <span className="badge">{ex.status}</span>}
              <h1>{ex.title}</h1>
              {ex.subtitle && <p className="project-sub">{ex.subtitle}</p>}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="project-desc">{ex.description}</p>
          </Reveal>
          {ex.link && (
            <Reveal delay={120}>
              <div className="hero-actions" style={{ marginTop: 24 }}>
                <a className="btn" href={ex.link} target="_blank" rel="noreferrer">
                  Visiter le site <Icons.arrow />
                </a>
              </div>
            </Reveal>
          )}
        </header>

        {ex.shots?.length > 0 && (
          <section className="section" style={{ paddingTop: 20 }}>
            <Reveal>
              <div className="section-head">
                <h2>Aperçu</h2>
                <span className="count">// {ex.shots.length}</span>
              </div>
            </Reveal>
            <Reveal delay={60}>
              <ProjectGallery shots={ex.shots} title={ex.title} />
            </Reveal>
          </section>
        )}

        <section className="section" style={{ paddingTop: 20 }}>
          <div className="project-cols">
            {ex.features?.length > 0 && (
              <Reveal>
                <div className="project-panel">
                  <h2 className="panel-title">Fonctionnalités clés</h2>
                  <ul className="example-features">
                    {ex.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
            {ex.stack?.length > 0 && (
              <Reveal delay={80}>
                <div className="project-panel">
                  <h2 className="panel-title">Stack technique</h2>
                  <div className="tags">
                    {ex.stack.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <div className="hero-actions">
            <Link className="btn btn-ghost" href="/realisations">
              <span className="back-arrow">←</span> Toutes les réalisations
            </Link>
            <a
              className="btn btn-indigo"
              href={`https://discord.com/users/${site.discordUserId}`}
              target="_blank"
              rel="noreferrer"
            >
              <Icons.discord /> Me contacter
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
