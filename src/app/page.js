import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Avatar from "@/components/Avatar";
import Stats from "@/components/Stats";
import { Icons } from "@/components/icons";
import { asset } from "@/lib/asset";
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
              <a
                className="btn btn-indigo"
                href={`https://discord.com/users/${site.discordUserId}`}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.discord /> Me contacter
              </a>
              <a className="btn btn-ghost" href={`mailto:${site.socials.email}`}>
                <Icons.email /> Email
              </a>
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

        {site.stats?.length > 0 && (
          <Reveal>
            <Stats stats={site.stats} />
          </Reveal>
        )}

        <section className="section" id="projets">
          <Reveal>
            <div className="section-head">
              <h2>Projets</h2>
              <span className="count">// {site.projects.length}</span>
            </div>
          </Reveal>
          <div className="grid">
            {site.projects.map((p, i) => {
              // La galerie Player Models n'est cliquable que si des images existent.
              const pmNotReady =
                p.link === "/player-models" && !(site.playerModels?.length > 0);
              const clickable = Boolean(p.link) && !pmNotReady;
              // Lien interne (#ancre ou /page) -> même onglet ; externe -> nouvel onglet
              const internal = clickable && /^[#/]/.test(p.link);
              const Card = clickable ? "a" : "article";
              const linkProps = clickable
                ? {
                    href: p.link,
                    ...(internal
                      ? {}
                      : { target: "_blank", rel: "noreferrer" }),
                  }
                : {};
              return (
                <Reveal key={p.title} delay={i * 60}>
                  <Card
                    className={`card ${clickable ? "card-link" : ""}`}
                    {...linkProps}
                  >
                    <div className="card-top">
                      <span
                        className={`badge ${
                          /bient/i.test(p.status) ? "soon" : ""
                        }`}
                      >
                        {p.status}
                      </span>
                      {p.category && (
                        <span className="card-cat">{p.category}</span>
                      )}
                    </div>
                    <h3>
                      {p.title}
                      {clickable && <Icons.arrow width={16} height={16} />}
                    </h3>
                    <p>{p.description}</p>
                    <div className="tags">
                      {p.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {clickable && (
                      <span className="card-cta">
                        {p.cta || (internal ? "Voir" : "Visiter le site")}
                        <Icons.arrow width={16} height={16} />
                      </span>
                    )}
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal>
          <div
            className="deco-band"
            style={{ backgroundImage: `url(${asset("/deco/stars.jpg")})` }}
            role="img"
            aria-label="Équipement tactique — ambiance S.T.A.R.S."
          >
            <span className="deco-caption">
              <span className="deco-tick" /> ÉQUIPEMENT TACTIQUE · SECTEUR GMOD
            </span>
          </div>
        </Reveal>

        {site.about && (
          <section className="section" id="a-propos">
            <Reveal>
              <div className="section-head">
                <h2>À propos</h2>
                <span className="count">// profil</span>
              </div>
            </Reveal>
            <div className="about">
              <Reveal>
                <div className="about-text">
                  {site.about.text.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={80}>
                <div className="about-skills">
                  {site.about.skills.map((s) => (
                    <div className="skill-group" key={s.group}>
                      <h3>{s.group}</h3>
                      <div className="tags">
                        {s.items.map((t) => (
                          <span className="tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
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
