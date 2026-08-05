"use client";

import { useEffect, useState } from "react";

// Barre de statut tactique en haut de page : statut + horloge en direct.
export default function HudBar() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    // Signale que React a bien pris la main (hydratation réussie). Le filet de
    // sécurité du <head> s'en sert pour NE PAS ré-afficher brutalement le
    // contenu : ici, l'animation de reveal fonctionnera normalement.
    window.__revealReady = true;

    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hudbar" aria-hidden="true">
      <span className="hudbar-left">
        <span className="hudbar-dot" />
        SYSTÈME OPÉRATIONNEL
        <span className="hudbar-sep">·</span>
        <span className="hudbar-dim">SECTEUR GMOD</span>
      </span>
      <span className="hudbar-right">
        <span className="hudbar-dim">UPTIME</span> {time}
      </span>
    </div>
  );
}
