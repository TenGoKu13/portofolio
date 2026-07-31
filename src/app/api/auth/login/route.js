import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getAuthorizeUrl } from "@/lib/discord";
import { rateLimit, clientIp, tooMany } from "@/lib/rateLimit";

// Démarre le flux OAuth2 : on génère un "state" anti-CSRF puis on redirige vers Discord.
export async function GET(request) {
  // Anti-martèlement : max 20 démarrages de login / minute par IP.
  const rl = rateLimit(`login:${clientIp(request)}`, 20, 60_000);
  if (!rl.ok) return tooMany(rl.retryAfter);

  const state = crypto.randomBytes(16).toString("hex");
  const res = NextResponse.redirect(getAuthorizeUrl(state));
  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 min
  });
  return res;
}
