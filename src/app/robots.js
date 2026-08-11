// Généré une fois au build (export statique).
export const dynamic = "force-static";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://tengoku13.github.io/site-web";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
