"use client";

import { useState } from "react";

// Grille de player models avec agrandissement (lightbox).
export default function PlayerModelsGallery({ items = [] }) {
  const [open, setOpen] = useState(null); // index | null
  if (!items.length) return null;

  return (
    <>
      <div className="pm-grid">
        {items.map((pm, i) => (
          <button
            type="button"
            key={pm.image + i}
            className="pm-item"
            onClick={() => setOpen(i)}
            aria-label={`Agrandir ${pm.title || "player model"}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pm.image} alt={pm.title || `Player model ${i + 1}`} loading="lazy" />
            {pm.badge && (
              <span className={`pm-badge pm-badge--${pm.badgeTone || "before"}`}>
                {pm.badge}
              </span>
            )}
            {(pm.title || pm.tags?.length) && (
              <div className="pm-meta">
                {pm.title && <span className="pm-title">{pm.title}</span>}
                {pm.tags?.length > 0 && (
                  <span className="pm-tags">
                    {pm.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={items[open].title || "Player model"}
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
            src={items[open].image}
            alt={items[open].title || "Player model"}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
