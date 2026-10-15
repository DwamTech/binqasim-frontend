import test from "node:test";
import assert from "node:assert/strict";

process.env.BACKEND_API_URL = "http://127.0.0.1:8000/api";
const { getNewsItem, getNews, assetUrl, getGovernance, pageNumber } = await import("./publicWebsite.js");

test("news reads the public detail envelope and loads fresh published data", async () => {
  const original = globalThis.fetch;
  const article = { id: 1, slug: "news", title: "New title", featured_image: "http://127.0.0.1:8000/storage/news.jpg", content: "<p>Updated</p>" };
  globalThis.fetch = async (url, options) => {
    assert.equal(options.cache, "no-store");
    return Response.json(url.includes("articles/news") ? { article } : { data: [article], meta: { total: 1 } });
  };
  try {
    assert.equal((await getNewsItem("news")).content, "<p>Updated</p>");
    assert.equal((await getNews()).items[0].coverSrc, "/backend-assets/news.jpg");
  } finally { globalThis.fetch = original; }
});

test("an unpublished or missing news detail stays unavailable", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response(null, { status: 404 });
  try { assert.equal(await getNewsItem("draft"), null); }
  finally { globalThis.fetch = original; }
});

test("governance uses the active category rather than unrelated library books", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (url.endsWith("library/navigation")) return Response.json({ data: [{ slug: "governance", children: [{ slug: "annual-reports", name: "Annual" }] }] });
    assert.match(url, /library\/governance\/annual-reports\/books/);
    return Response.json({ books: { data: [{ id: 4, slug: "report", source_type: "file", file_path: "report.pdf", download_allowed: false }], current_page: 1, last_page: 1, total: 1 } });
  };
  try {
    const result = await getGovernance("annual-reports");
    assert.equal(result.items[0].href, "/documents/report");
    assert.equal(result.items[0].download_allowed, false);
  } finally { globalThis.fetch = original; }
});

test("asset URLs reject unsafe schemes and pagination rejects invalid pages", () => {
  assert.equal(assetUrl("javascript:alert(1)"), "");
  assert.equal(assetUrl("reports/report.pdf"), "/backend-assets/reports/report.pdf");
  assert.equal(pageNumber("-2"), 1);
  assert.equal(pageNumber("3"), 3);
});
