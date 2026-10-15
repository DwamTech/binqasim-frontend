import test from "node:test";
import assert from "node:assert/strict";
import { searchSite } from "./siteSearch.js";

test("header search queries the public backend with pagination and cancellation", async () => {
  const original = globalThis.fetch;
  const controller = new AbortController();
  globalThis.fetch = async (url, options) => {
    const params = new URL(url, "http://localhost").searchParams;
    assert.equal(params.get("q"), "أخبار الوقف");
    assert.equal(params.get("page"), "2");
    assert.equal(options.signal, controller.signal);
    assert.equal(options.cache, "no-store");
    return Response.json({ data: [{ title: "خبر", href: "/news/test" }], meta: { total: 21 } });
  };
  try { assert.equal((await searchSite(" أخبار الوقف ", 2, controller.signal)).data[0].href, "/news/test"); }
  finally { globalThis.fetch = original; }
});

test("failed search remains an error instead of showing an empty result", async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
  try { await assert.rejects(searchSite("وقف"), /تعذر تحميل/); }
  finally { globalThis.fetch = original; }
});
