import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} {site.name} — Fait avec Next.js
    </footer>
  );
}
