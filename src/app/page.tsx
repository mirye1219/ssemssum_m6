import { EmptyState, ErrorState } from "@/components/empty-state";
import { MemoCard } from "@/components/memo-card";
import { Pagination } from "@/components/pagination";
import { listMemos } from "@/lib/memos";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);

  try {
    const { memos, total, pageCount } = await listMemos(page);

    return (
      <section className="space-y-8">
        <div>
          <p className="text-sm font-medium text-brand-700">원아 메모</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">오늘의 장면을 남겨 두세요</h1>
          <p className="mt-2 text-ink-600">등록한 메모는 새로고침해도 그대로 남아 있습니다.</p>
        </div>

        {total === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {memos.map((memo) => (
                <MemoCard key={memo.id} memo={memo} />
              ))}
            </div>
            <Pagination page={page} pageCount={pageCount} />
          </>
        )}
      </section>
    );
  } catch (error) {
    const detail = error instanceof Error ? error.message : "알 수 없는 오류";
    return (
      <ErrorState message={`메모를 불러오지 못했습니다. ${detail}`} />
    );
  }
}
