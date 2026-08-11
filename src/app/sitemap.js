import { site } from "@/data/site";

export const dynamic = "force-static";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://tengoku13.github.io/portofolio";

export default function sitemap() {
  const now = new Date();

  const staticPages = ["", "/realisations", "/player-models"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
  }));

  const projectPages = (site.webExamples || [])
    .filter((e) => e.slug)
    .map((e) => ({
      url: `${baseUrl}/realisations/${e.slug}`,
      lastModified: now,
    }));

  return [...staticPages, ...projectPages];
}
