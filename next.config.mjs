/** @type {import('next').NextConfig} */

// Site 100 % statique, hébergé sur GitHub Pages (page de projet).
// URL finale : https://tengoku13.github.io/site-web
const basePath = "/site-web";

const nextConfig = {
  // Export statique : `next build` génère un dossier `out/` déployable tel quel.
  output: "export",
  // Le site est servi sous un sous-chemin sur GitHub Pages.
  basePath,
  // GitHub Pages sert des dossiers avec index.html -> les URLs finissent par "/".
  trailingSlash: true,
  // Pas de serveur d'optimisation d'images en statique.
  images: { unoptimized: true },
  // Exposé au code client pour préfixer les <img> (cf. src/lib/asset.js).
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
