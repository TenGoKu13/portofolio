/** @type {import('next').NextConfig} */
const nextConfig = {
  // better-sqlite3 est un module natif : on le laisse externe côté serveur
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
