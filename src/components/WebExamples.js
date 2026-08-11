import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Icons } from "@/components/icons";
import { asset } from "@/lib/asset";

export default function WebExamples({ examples = [], showHeading = true }) {
  if (!examples.length) return null;

  return (
    <section className="section" id="realisations">
      {showHeading && (
        <Reveal>
          <div className="section-head">
            <h2>Réalisations web</h2>
            <span className="count">// {examples.length}</span>
          </div>
        </Reveal>
      )}

      <div className="examples">
        {examples.map((ex, i) => (
          <Reveal key={ex.slug || ex.title} delay={i * 80}>
            <Link className="example example-link" href={`/realisations/${ex.slug}`}>
              <div className="example-cover">

                <img src={asset(ex.cover)} alt={`Capture du site ${ex.title}`} loading="lazy" />
                <span className="example-open">
                  Voir le projet <Icons.arrow />
                </span>
              </div>

              <div className="example-body">
                <div className="example-head">
                  <div>
                    <h3>{ex.title}</h3>
                    {ex.subtitle && <p className="example-sub">{ex.subtitle}</p>}
                  </div>
                  {ex.status && <span className="badge">{ex.status}</span>}
                </div>

                <p className="example-desc">{ex.description}</p>

                {ex.stack?.length > 0 && (
                  <div className="tags" style={{ marginTop: 14 }}>
                    {ex.stack.slice(0, 5).map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                    {ex.stack.length > 5 && (
                      <span className="tag">+{ex.stack.length - 5}</span>
                    )}
                  </div>
                )}

                <span className="example-cta">
                  Découvrir le projet <Icons.arrow />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
