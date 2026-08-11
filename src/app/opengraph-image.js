import { ImageResponse } from "next/og";
import { site } from "@/data/site";

// Généré une fois au build (export statique).
export const dynamic = "force-static";

// Image d'aperçu affichée au partage du lien (Discord, réseaux, etc.).
export const alt = `${site.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0b1120",
          backgroundImage:
            "radial-gradient(circle at 15% 0%, rgba(99,102,241,0.45), transparent 45%), radial-gradient(circle at 100% 100%, rgba(34,197,94,0.35), transparent 45%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#818cf8",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22c55e",
            }}
          />
          Portfolio · Disponible pour de nouveaux projets
        </div>

        <div
          style={{
            fontSize: 130,
            fontWeight: 900,
            lineHeight: 1,
            marginTop: 24,
            background: "linear-gradient(180deg, #ffffff 30%, #94a3b8)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {site.name}
        </div>

        <div
          style={{
            fontSize: 34,
            color: "#94a3b8",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {site.role}
        </div>
      </div>
    ),
    { ...size }
  );
}
