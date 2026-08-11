import "./globals.css";
import { site } from "@/data/site";
import Ambient from "@/components/Ambient";
import HudBar from "@/components/HudBar";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://tengoku13.github.io/site-web";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — Portfolio`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — Portfolio`,
    description: site.tagline,
    url: baseUrl,
    siteName: site.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Portfolio`,
    description: site.tagline,
  },
};

export const viewport = {
  themeColor: "#0b1120",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Armé AVANT le premier rendu : masque le contenu à animer sans
            clignotement. Filet de sécurité : si le JS principal plante (chunk
            cassé, erreur d'hydratation) ou ne prend pas la main sous 2,5 s, on
            ré-affiche tout — la page ne reste jamais blanche. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var e=document.documentElement;e.classList.add('reveal-on');" +
              "function s(){e.classList.remove('reveal-on');}" +
              "addEventListener('error',function(v){if(window.__revealReady)return;" +
              "var t=v&&v.target;if((t&&t.tagName==='SCRIPT')||v instanceof ErrorEvent)s();},true);" +
              "setTimeout(function(){if(!window.__revealReady)s();},2500);})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Orbitron:wght@600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Ambient />
        <HudBar />
        {children}
      </body>
    </html>
  );
}
