import { notFound } from "next/navigation";
import { updateMemo } from "@/app/actions/memos";
import { MemoForm } from "@/components/memo-form";
import { getMemo } from "@/lib/memos";

export default async function EditMemoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const memo = await getMemo(id).catch(() => null);

  if (!memo) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">메모 수정</h1>
        <p className="mt-2 text-ink-600">기존 내용을 고친 뒤 다시 저장하세요.</p>
      </div>
      <MemoForm
        memo={memo}
        submitLabel="수정 저장"
        action={updateMemo.bind(null, memo.id)}
      />
    </section>
  );
}
