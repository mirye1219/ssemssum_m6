import { TrackLink } from "@/components/track-link";

export function EmptyState() {
  return (
    <div className="rounded-[20px] border border-dashed border-border-default bg-surface-base px-6 py-16 text-center">
      <p className="text-lg font-medium text-ink-900">아직 남겨 둔 메모가 없어요</p>
      <p className="mt-2 text-sm text-ink-600">오늘 본 장면을 짧게 적어 보세요.</p>
      <TrackLink
        href="/memos/new"
        event="cta_new_memo_clicked"
        eventProps={{ from: "empty" }}
        className="mt-6 inline-flex rounded-[14px] bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
      >
        첫 메모 쓰기
      </TrackLink>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-[20px] border border-red-200 bg-red-50 px-6 py-10 text-center text-red-800">
      {message}
    </div>
  );
}
