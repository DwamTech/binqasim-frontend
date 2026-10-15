export async function searchSite(query, page = 1, signal) {
  const params = new URLSearchParams({ q: query.trim(), page: String(page) });
  const response = await fetch(`/api/public/site-search?${params}`, {
    signal, cache: "no-store", headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error("تعذر تحميل نتائج البحث. حاول مرة أخرى.");
  const result = await response.json();
  if (!Array.isArray(result.data) || !result.meta) {
    throw new Error("تعذر تحميل نتائج البحث. حاول مرة أخرى.");
  }
  return result;
}
