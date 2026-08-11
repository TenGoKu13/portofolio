import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-status" aria-hidden="true">
        <span className="footer-status-dot" /> SYSTÈME OPÉRATIONNEL · SECTEUR GMOD
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
