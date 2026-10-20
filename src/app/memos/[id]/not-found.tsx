import Link from "next/link";

export default function MemoNotFound() {
  return (
    <section className="rounded-[20px] border border-border-default bg-surface-base px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold">없는 메모입니다</h1>
      <p className="mt-2 text-ink-600">주소가 잘못됐거나 이미 삭제된 메모예요.</p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-[14px] bg-brand-600 px-4 py-2 text-sm font-medium text-white"
      >
        목록으로
      </Link>
    </section>
  );
}
