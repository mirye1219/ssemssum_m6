import Link from "next/link";
import { publicImageUrl } from "@/lib/memos";
import type { Memo } from "@/types/memo";

export function MemoCard({ memo }: { memo: Memo }) {
  const image = publicImageUrl(memo.image_path);

  return (
    <Link
      href={`/memos/${memo.id}`}
      className="block overflow-hidden rounded-[20px] border border-border-default bg-surface-base shadow-[0_12px_32px_rgba(31,24,48,0.06)] transition hover:-translate-y-0.5"
    >
      <div className="aspect-[16/10] bg-surface-cool">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-ink-600">
            사진 없음
          </div>
        )}
      </div>
      <div className="space-y-2 p-5">
        <p className="text-xs text-brand-700">{memo.memo_date}</p>
        <h2 className="text-lg font-semibold text-ink-900">{memo.child_name}</h2>
        <p className="line-clamp-2 text-sm text-ink-600">{memo.content}</p>
      </div>
    </Link>
  );
}
