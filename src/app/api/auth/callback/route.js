import { NextResponse } from "next/server";
import { exchangeCode, fetchDiscordUser } from "@/lib/discord";
import { createSession } from "@/lib/session";

// Discord nous renvoie ici avec un "code" et le "state".
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = request.cookies.get("oauth_state")?.value;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Vérif anti-CSRF + présence du code.
  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(`${base}/?error=auth`);
  }

  try {
    const tokens = await exchangeCode(code);
    const discordUser = await fetchDiscordUser(tokens.access_token);
    await createSession(discordUser);
  } catch (err) {
    console.error(err);
    return NextResponse.redirect(`${base}/?error=auth`);
  }

  const res = NextResponse.redirect(`${base}/demande`);
  res.cookies.delete("oauth_state");
  return res;
}
