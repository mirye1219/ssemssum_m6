import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border-default bg-surface-base/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-brand-700">
          쌤씀 메모
        </Link>
        <Link
          href="/memos/new"
          className="rounded-[14px] bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          새 메모
        </Link>
      </div>
    </header>
  );
}
