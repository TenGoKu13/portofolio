"use client";

import { useState } from "react";
import { asset } from "@/lib/asset";

export default function ProjectGallery({ shots = [], title = "" }) {
  const [open, setOpen] = useState(null);
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

            <img src={asset(src)} alt={`Capture ${i + 1} de ${title}`} loading="lazy" />
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

          <img
            src={asset(shots[open])}
            alt={`Capture de ${title}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
