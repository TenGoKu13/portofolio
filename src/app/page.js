import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Avatar from "@/components/Avatar";
import WebExamples from "@/components/WebExamples";
import { Icons } from "@/components/icons";
import { site } from "@/data/site";

export default function Home() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <>
      <Nav />

      <div className="container">
        <header className="hero">
          <Reveal>
            <Avatar src={site.avatar} name={site.name} />
          </Reveal>
          <Reveal delay={40}>
            <span className="eyebrow">
              <span className="dot" />
              Disponible pour de nouveaux projets
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1>{site.name}</h1>
          </Reveal>
          <Reveal delay={140}>
            <div className="role">{site.role}</div>
          </Reveal>
          <Reveal delay={200}>
            <p className="tagline">{site.tagline}</p>
          </Reveal>
          <Reveal delay={260}>
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
                  <Icons.github /> GitHub
                </a>
              )}
            </div>
          </Reveal>
        </header>

        <section className="section" id="projets">
          <Reveal>
            <div className="section-head">
              <h2>Projets</h2>
              <span className="count">// {site.projects.length}</span>
            </div>
          </Reveal>
          <div className="grid">
            {site.projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article className="card">
                  <span
                    className={`badge ${
                      /bient/i.test(p.status) ? "soon" : ""
                    }`}
                  >
                    {p.status}
                  </span>
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
                    <p style={{ marginTop: 16, marginBottom: 0 }}>
                      <a
                        className="btn btn-ghost"
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Voir <Icons.arrow />
                      </a>
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {site.webExamples?.length > 0 && (
          <WebExamples examples={site.webExamples} />
        )}

        {socials.length > 0 && (
          <section className="section" id="contact">
            <Reveal>
              <div className="section-head">
                <h2>Mes liens</h2>
                <span className="count">// contact</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="hero-actions">
                {socials.map(([name, url]) => {
                  const Icon = Icons[name] || Icons.arrow;
                  return (
                    <a
                      key={name}
                      className="btn btn-ghost"
                      href={name === "email" ? `mailto:${url}` : url}
                      target={name === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                      style={{ textTransform: "capitalize" }}
                    >
                      <Icon /> {name}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}
