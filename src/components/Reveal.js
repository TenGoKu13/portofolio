"use client";

import { useEffect, useRef } from "react";

// Dès que ce module s'exécute côté navigateur, on arme l'animation d'apparition.
// Tant que cette classe n'est pas posée, `.reveal` reste visible (cf. globals.css) :
// si le JS ne tourne pas, la page s'affiche quand même au lieu d'être blanche.
if (typeof document !== "undefined") {
  document.documentElement.classList.add("reveal-on");
}

// Anime l'apparition d'un bloc quand il entre dans le viewport (stagger via delay).
export default function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Filet de sécurité : si l'observer n'existe pas, on révèle immédiatement.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
