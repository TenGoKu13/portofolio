import { site } from "@/data/site";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://tengoku.ch";

export default function sitemap() {
  const now = new Date();

  const staticPages = ["", "/realisations", "/demande", "/privacy", "/terms"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
    })
  );

  const projectPages = (site.webExamples || [])
    .filter((e) => e.slug)
    .map((e) => ({
      url: `${baseUrl}/realisations/${e.slug}`,
      lastModified: now,
    }));

  return [...staticPages, ...projectPages];
}
