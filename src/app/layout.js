import "./globals.css";
import { site } from "@/data/site";
import Ambient from "@/components/Ambient";
import HudBar from "@/components/HudBar";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tengoku.ch";

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
