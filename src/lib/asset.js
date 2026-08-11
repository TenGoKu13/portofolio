// Préfixe les chemins d'images/fichiers du dossier /public avec le basePath.
// Sur GitHub Pages (projet), le site est servi sous /site-web : les <img> en
// chemin absolu ("/avatar.jpg") ne reçoivent PAS le préfixe automatiquement
// (contrairement aux <Link> et aux imports Next). Ce helper s'en charge.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path) {
  if (!path) return path;
  // URLs externes ou data: -> inchangées.
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? "" : "/"}${path}`;
}
