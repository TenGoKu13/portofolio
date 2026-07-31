"use client";

import { useState } from "react";

// Photo de profil du hero. Si l'image est absente/cassée, on retombe
// proprement sur une initiale dans un cercle dégradé.
export default function Avatar({ src, name, size = 104 }) {
  const [failed, setFailed] = useState(false);
  const initial = (name || "?").trim().charAt(0).toUpperCase();

  return (
    <div className="avatar-ring" style={{ width: size, height: size }}>
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="avatar-img"
          src={src}
          alt=""
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="avatar-fallback">{initial}</span>
      )}
      <span className="avatar-status" title="En ligne" />
    </div>
  );
}
