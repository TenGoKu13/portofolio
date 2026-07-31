import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link href="/terms">Conditions d&apos;utilisation</Link>
        <span className="sep">•</span>
        <Link href="/privacy">Confidentialité</Link>
      </div>
      <div className="footer-made">
        <span aria-hidden="true">🇨🇭</span> {site.legal.madeIn}
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} {site.name} — Fait avec Next.js
      </div>
    </footer>
  );
}
