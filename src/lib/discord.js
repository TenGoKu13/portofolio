// Helpers pour l'OAuth2 Discord (aucun bot nécessaire).

const DISCORD_API = "https://discord.com/api";

export function getRedirectUri() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${base}/api/auth/callback`;
}

// URL vers laquelle on envoie l'utilisateur pour qu'il autorise la connexion.
export function getAuthorizeUrl(state) {
  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: "identify",
    state,
  });
  return `${DISCORD_API}/oauth2/authorize?${params.toString()}`;
}

// Échange le "code" reçu contre un token d'accès.
export async function exchangeCode(code) {
  const res = await fetch(`${DISCORD_API}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: getRedirectUri(),
    }),
  });
  if (!res.ok) throw new Error("Échec de l'échange du code Discord");
  return res.json();
}

// Récupère le profil Discord de l'utilisateur.
export async function fetchDiscordUser(accessToken) {
  const res = await fetch(`${DISCORD_API}/users/@me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error("Impossible de récupérer le profil Discord");
  return res.json();
}

// Construit l'URL de l'avatar Discord.
export function avatarUrl(user) {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
  }
  const index = (BigInt(user.id) >> 22n) % 6n;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}
