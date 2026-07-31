"use client";

import { useState } from "react";

// Galerie d'images d'une réalisation, avec agrandissement (lightbox).
export default function ProjectGallery({ shots = [], title = "" }) {
  const [open, setOpen] = useState(null); // index | null
  if (!shots.length) return null;

  return (
    <>
      <div className="pg-grid">
        {shots.map((src, i) => (
          <button
            type="button"
            key={src}
            className="pg-item"
            onClick={() => setOpen(i)}
            aria-label={`Agrandir la capture ${i + 1} de ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={`Capture ${i + 1} de ${title}`} loading="lazy" />
            <span className="pg-zoom">Agrandir</span>
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Fermer"
            onClick={() => setOpen(null)}
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shots[open]}
            alt={`Capture de ${title}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
