"use client";

import { useEffect, useRef } from "react";

// L'armement de l'animation (classe `reveal-on` sur <html>) est posé très tôt
// par un script inline dans le <head> (cf. layout.js), AVANT le premier rendu,
// pour éviter tout clignotement. Un filet de sécurité y ré-affiche le contenu
// si le JS ne prend jamais la main (page blanche évitée).

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
