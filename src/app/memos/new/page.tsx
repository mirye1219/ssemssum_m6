import { createMemo } from "@/app/actions/memos";
import { MemoForm } from "@/components/memo-form";

export default function NewMemoPage() {
  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">새 메모</h1>
        <p className="mt-2 text-ink-600">원아 이름, 날짜, 장면을 적으면 바로 저장됩니다.</p>
      </div>
      <MemoForm action={createMemo} submitLabel="등록하기" />
    </section>
  );
}
