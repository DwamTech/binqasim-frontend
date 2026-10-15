import Link from "next/link";

export default function PublicPagination({ meta, path }) {
  if (!meta || meta.last_page <= 1) return null;
  return (
    <nav aria-label="صفحات النتائج" style={{ display: "flex", gap: 24, justifyContent: "center", padding: 32 }}>
      {meta.current_page > 1 && <Link href={`${path}?page=${meta.current_page - 1}`}>السابق</Link>}
      <span>صفحة {meta.current_page} من {meta.last_page}</span>
      {meta.current_page < meta.last_page && <Link href={`${path}?page=${meta.current_page + 1}`}>التالي</Link>}
    </nav>
  );
}
