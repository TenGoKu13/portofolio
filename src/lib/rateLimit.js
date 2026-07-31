// Rate limiter simple en mémoire (fenêtre glissante par clé).
// Suffisant pour un seul process (PM2 sur VPS). Pas de dépendance externe.
const buckets = new Map();

// Nettoyage périodique des entrées expirées pour éviter la fuite mémoire.
let lastSweep = 0;
function sweep(now) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, hits] of buckets) {
    const alive = hits.filter((t) => t > now - 3_600_000);
    if (alive.length) buckets.set(key, alive);
    else buckets.delete(key);
  }
}

// Retourne { ok, remaining, retryAfter }. `limit` requêtes par `windowMs`.
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  sweep(now);
  const hits = (buckets.get(key) || []).filter((t) => t > now - windowMs);
  if (hits.length >= limit) {
    const retryAfter = Math.ceil((hits[0] + windowMs - now) / 1000);
    return { ok: false, remaining: 0, retryAfter };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, remaining: limit - hits.length, retryAfter: 0 };
}

// Extrait l'IP client en tenant compte du reverse proxy (Nginx -> X-Forwarded-For).
export function clientIp(request) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

// Réponse 429 prête à l'emploi.
export function tooMany(retryAfter) {
  return Response.json(
    { error: "Trop de requêtes, réessaie plus tard." },
    { status: 429, headers: { "Retry-After": String(retryAfter || 60) } }
  );
}

// Garde-fou taille du corps : rejette si Content-Length dépasse maxBytes.
export function bodyTooLarge(request, maxBytes = 100_000) {
  const len = Number(request.headers.get("content-length") || 0);
  return len > maxBytes;
}
