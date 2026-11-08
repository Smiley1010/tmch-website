import fs from "node:fs";
import path from "node:path";

const SITE_URL = "https://tmchgroup.com";
const API_BASE =
  process.env.VITE_API_URL || "http://localhost:5000/api";

const OUTPUT_FILE = path.resolve("public/sitemap.xml");

const staticPages = [
  "",
  "/about",
  "/services",
  "/projects",
  "/contact",
  "/blog",
];

async function generateSitemap() {
  console.log("Fetching published articles...");

  const response = await fetch(`${API_BASE}/articles/public`);

  if (!response.ok) {
    throw new Error(
      `Unable to fetch articles. API returned ${response.status}`
    );
  }

  const data = await response.json();
  const articles = data.articles || [];

  const urls = [
    ...staticPages.map((page) => ({
      loc: `${SITE_URL}${page}`,
      lastmod: new Date().toISOString().split("T")[0],
    })),

    ...articles.map((article) => ({
      loc: `${SITE_URL}/blog/${encodeURIComponent(article.slug)}`,
      lastmod: article.updated_at || article.published_at,
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.loc}</loc>
    ${item.lastmod ? `<lastmod>${new Date(item.lastmod).toISOString().split("T")[0]}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, xml, "utf8");

  console.log(`Sitemap generated with ${urls.length} URLs.`);
  console.log(`Saved to: ${OUTPUT_FILE}`);
}

generateSitemap().catch((error) => {
  console.error("Sitemap generation failed:", error);
  process.exitCode = 1;
});
