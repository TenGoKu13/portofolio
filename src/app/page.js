import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export default function Home() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <>
      <Nav />

      <header className="hero container">
        <h1>{site.name}</h1>
        <div className="role">{site.role}</div>
        <p className="tagline">{site.tagline}</p>
        <div className="hero-actions">
          <Link className="btn" href="/demande">
            Faire une demande
          </Link>
          {site.socials.github && (
            <a
              className="btn btn-ghost"
              href={site.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </header>

      <section className="section container" id="projets">
        <h2>Projets</h2>
        <div className="grid">
          {site.projects.map((p) => (
            <article className="card" key={p.title}>
              <span className="badge">{p.status}</span>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <p style={{ marginTop: 14 }}>
                  <a
                    className="btn btn-ghost"
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Voir le projet
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      {socials.length > 0 && (
        <section className="section container" id="contact">
          <h2>Mes liens</h2>
          <div className="hero-actions">
            {socials.map(([name, url]) => (
              <a
                key={name}
                className="btn btn-ghost"
                href={name === "email" ? `mailto:${url}` : url}
                target={name === "email" ? undefined : "_blank"}
                rel="noreferrer"
                style={{ textTransform: "capitalize" }}
              >
                {name}
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="container">
        <Footer />
      </div>
    </>
  );
}
