export const dynamic = "force-static";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://tengoku13.github.io/portofolio";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
