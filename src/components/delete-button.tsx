"use client";

import { useState, useTransition } from "react";
import { deleteMemo } from "@/app/actions/memos";
import { track } from "@/lib/analytics";

export function DeleteButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!window.confirm("이 메모를 삭제할까요? 삭제한 뒤에는 되돌릴 수 없습니다.")) {
            return;
          }
          startTransition(async () => {
            track("memo_deleted");
            const result = await deleteMemo(id);
            if (result && !result.ok) {
              setError(result.message);
            }
          });
        }}
        className="rounded-[14px] border border-red-200 px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60"
      >
        {pending ? "삭제 중..." : "삭제"}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
