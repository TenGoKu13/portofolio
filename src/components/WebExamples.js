"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Icons } from "@/components/icons";

// Galerie "Réalisations web" : une carte par site avec cover cliquable,
// description, stack et fonctionnalités. Clic sur une image => lightbox.
export default function WebExamples({ examples = [] }) {
  const [lightbox, setLightbox] = useState(null); // { src, title } | null

  if (!examples.length) return null;

  return (
    <section className="section" id="realisations">
      <Reveal>
        <div className="section-head">
          <h2>Réalisations web</h2>
          <span className="count">// {examples.length}</span>
        </div>
      </Reveal>

      <div className="examples">
        {examples.map((ex, i) => (
          <Reveal key={ex.title} delay={i * 80}>
            <article className="example">
              <button
                type="button"
                className="example-cover"
                onClick={() => setLightbox({ src: ex.cover, title: ex.title })}
                aria-label={`Agrandir la capture de ${ex.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ex.cover} alt={`Capture du site ${ex.title}`} loading="lazy" />
                <span className="example-zoom">
                  <Icons.arrow /> Agrandir
                </span>
              </button>

              <div className="example-body">
                <div className="example-head">
                  <div>
                    <h3>{ex.title}</h3>
                    {ex.subtitle && <p className="example-sub">{ex.subtitle}</p>}
                  </div>
                  {ex.status && <span className="badge">{ex.status}</span>}
                </div>

                <p className="example-desc">{ex.description}</p>

                {ex.features?.length > 0 && (
                  <ul className="example-features">
                    {ex.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}

                {ex.shots?.length > 1 && (
                  <div className="example-thumbs">
                    {ex.shots.map((s) => (
                      <button
                        type="button"
                        key={s}
                        className="example-thumb"
                        onClick={() => setLightbox({ src: s, title: ex.title })}
                        aria-label={`Agrandir une capture de ${ex.title}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s} alt={`Capture de ${ex.title}`} loading="lazy" />
                      </button>
                    ))}
                  </div>
                )}

                {ex.stack?.length > 0 && (
                  <div className="tags" style={{ marginTop: 16 }}>
                    {ex.stack.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {ex.link && (
                  <p style={{ marginTop: 16, marginBottom: 0 }}>
                    <a
                      className="btn btn-ghost"
                      href={ex.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Voir le site <Icons.arrow />
                    </a>
                  </p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Fermer"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={`Capture du site ${lightbox.title}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
