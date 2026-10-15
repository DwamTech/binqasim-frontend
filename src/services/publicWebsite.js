import { cache } from "react";

const apiBase = (process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api").replace(/\/$/, "");

async function request(path, allowMissing = false) {
  const response = await fetch(`${apiBase}/${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (allowMissing && response.status === 404) return null;
  if (!response.ok) throw new Error("تعذر تحميل بيانات الموقع. يرجى المحاولة مرة أخرى.");
  return response.json();
}

export function assetUrl(value, fallback = "") {
  if (!value) return fallback;
  if (value.startsWith("/backend-assets/")) return value;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return fallback;
    if (url.origin === new URL(apiBase).origin && url.pathname.startsWith("/storage/")) {
      return `/backend-assets/${url.pathname.slice(9)}${url.search}`;
    }
    return url.href;
  } catch {
    if (value.startsWith("/")) return value;
    return `/backend-assets/${value.replace(/^storage\//, "")}`;
  }
}

export function dateLabel(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("ar-SA", { dateStyle: "long", calendar: "gregory", timeZone: "Asia/Riyadh" }).format(date);
}

function newsItem(article) {
  return {
    ...article,
    category: article.section?.name || "أخبار الوقف",
    date: dateLabel(article.gregorian_date || article.published_at || article.created_at),
    coverSrc: assetUrl(article.featured_image, "/ben-logo.png"),
    href: `/news/${encodeURIComponent(article.slug || article.id)}`,
    media: (article.media || []).map((media) => ({ ...media, url: assetUrl(media.url) })),
  };
}

export async function getNews(page = 1, perPage = 12) {
  const result = await request(`articles?page=${page}&per_page=${perPage}`);
  return { items: result.data.map(newsItem), meta: result.meta };
}

export const getNewsItem = cache(async (slug) => {
  const result = await request(`articles/${encodeURIComponent(slug)}`, true);
  return result ? newsItem(result.article) : null;
});

export const getSystemContent = cache(async (key) => {
  const result = await request(`system-content/${encodeURIComponent(key)}`);
  return result.content || "";
});

export const getSiteContact = cache(() => request("site-contact"));
export const getSupportSettings = cache(() => request("support/settings"));

export function governanceItem(book) {
  return {
    ...book,
    image: assetUrl(book.cover_path, "/ben-logo.png"),
    file: book.source_type === "file" ? assetUrl(book.file_path) : assetUrl(book.source_link),
    date: dateLabel(book.published_at || book.created_at),
    type: book.section?.name || "وثيقة",
    category: book.section?.name || "الحوكمة",
    href: `/documents/${encodeURIComponent(book.slug || book.id)}`,
  };
}

export async function getGovernance(categorySlug, page = 1) {
  const navigation = await request("library/navigation");
  const category = navigation.data.find((area) => area.slug === "governance")?.children?.find((category) => category.slug === categorySlug);
  if (!category) return { items: [], meta: { current_page: 1, last_page: 1, total: 0 } };
  const result = await request(`library/governance/${encodeURIComponent(category.slug)}/books?page=${page}&per_page=24`);
  return {
    items: result.books.data.map((book) => governanceItem({ ...book, section: category })),
    meta: { current_page: result.books.current_page, last_page: result.books.last_page, total: result.books.total, per_page: result.books.per_page },
  };
}

export const getGovernanceItem = cache(async (slug) => {
  const result = await request(`library/books/${encodeURIComponent(slug)}`, true);
  return result ? governanceItem(result.book) : null;
});

export function pageNumber(value) {
  const page = Number(value);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
