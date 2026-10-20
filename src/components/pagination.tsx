import Link from "next/link";

export function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
  if (pageCount <= 1) return null;

  const prev = Math.max(1, page - 1);
  const next = Math.min(pageCount, page + 1);

  return (
    <nav className="mt-8 flex items-center justify-center gap-3 text-sm" aria-label="페이지">
      <Link
        href={page === 1 ? "/" : `/?page=${prev}`}
        aria-disabled={page === 1}
        className={`rounded-[14px] border px-3 py-2 ${
          page === 1
            ? "pointer-events-none border-border-default text-ink-600/40"
            : "border-border-default text-ink-900 hover:bg-brand-050"
        }`}
      >
        이전
      </Link>
      <p className="text-ink-600">
        {page} / {pageCount}
      </p>
      <Link
        href={`/?page=${next}`}
        aria-disabled={page === pageCount}
        className={`rounded-[14px] border px-3 py-2 ${
          page === pageCount
            ? "pointer-events-none border-border-default text-ink-600/40"
            : "border-border-default text-ink-900 hover:bg-brand-050"
        }`}
      >
        다음
      </Link>
    </nav>
  );
}
