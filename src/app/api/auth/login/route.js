import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getAuthorizeUrl } from "@/lib/discord";

// Démarre le flux OAuth2 : on génère un "state" anti-CSRF puis on redirige vers Discord.
export async function GET() {
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
