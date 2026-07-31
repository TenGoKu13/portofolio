import "./globals.css";
import { site } from "@/data/site";
import Ambient from "@/components/Ambient";

export const metadata = {
  title: `${site.name} — Portfolio`,
  description: site.tagline,
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
        {children}
      </body>
    </html>
  );
}
