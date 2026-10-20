import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteButton } from "@/components/delete-button";
import { getMemo, publicImageUrl } from "@/lib/memos";

export default async function MemoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isUuid(id)) {
    notFound();
  }

  let memo;
  try {
    memo = await getMemo(id);
  } catch {
    return (
      <p className="rounded-[20px] bg-red-50 px-6 py-10 text-red-800">
        메모를 불러오지 못했습니다.
      </p>
    );
  }

  if (!memo) {
    notFound();
  }

  const image = publicImageUrl(memo.image_path);

  return (
    <article className="mx-auto max-w-2xl space-y-6">
      <p className="text-sm text-brand-700">{memo.memo_date}</p>
      <h1 className="text-3xl font-semibold">{memo.child_name}</h1>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={`${memo.child_name} 메모 사진`} className="w-full rounded-[20px] object-cover" />
      ) : (
        <div className="rounded-[20px] border border-dashed border-border-default bg-surface-cool px-6 py-16 text-center text-ink-600">
          첨부된 사진이 없습니다.
        </div>
      )}
      <p className="whitespace-pre-wrap text-lg leading-8 text-ink-900">{memo.content}</p>
      <div className="flex gap-3">
        <Link
          href={`/memos/${memo.id}/edit`}
          className="rounded-[14px] bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          수정
        </Link>
        <DeleteButton id={memo.id} />
        <Link href="/" className="rounded-[14px] border border-border-default px-4 py-2 text-sm">
          목록
        </Link>
      </div>
    </article>
  );
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}
