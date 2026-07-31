import Link from "next/link";
import { site } from "@/data/site";
import { getCurrentUser } from "@/lib/session";
import { avatarUrl } from "@/lib/discord";

// Barre de navigation. Server component : elle lit l'utilisateur connecté.
export default async function Nav() {
  const user = await getCurrentUser();

  return (
    <nav className="nav container">
      <Link href="/" className="nav-brand">
        {site.name}
      </Link>
      <div className="nav-links">
        <Link href="/#projets">Projets</Link>
        <Link href="/demande">Demande</Link>
        {user?.isAdmin && <Link href="/admin">Admin</Link>}
        {user ? (
          <span className="user-chip">
            <img src={avatarUrl(user)} alt="" />
            <span>{user.global_name || user.username}</span>
            <form action="/api/auth/logout" method="post" style={{ margin: 0 }}>
              <button className="btn btn-ghost" type="submit">
                Déconnexion
              </button>
            </form>
          </span>
        ) : (
          <a className="btn" href="/api/auth/login">
            Se connecter avec Discord
          </a>
        )}
      </div>
    </nav>
  );
}
