import Link from "next/link";
import { site } from "@/data/site";

export default function Nav() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-brand">
        {site.name}
      </Link>
      <div className="nav-links">
        <Link href="/#projets">Projets</Link>
        <Link href="/realisations">Réalisations</Link>
        <Link href="/#a-propos">À propos</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </nav>
  );
}
