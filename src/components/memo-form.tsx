"use client";

import { useActionState, useState } from "react";
import type { ActionState } from "@/app/actions/memos";
import type { Memo } from "@/types/memo";
import { publicImageUrl } from "@/lib/memos";

type Props = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  memo?: Memo;
  submitLabel: string;
};

const initial: ActionState = { ok: true };

export function MemoForm({ action, memo, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, initial);
  const [preview, setPreview] = useState<string | null>(publicImageUrl(memo?.image_path ?? null));

  return (
    <form action={formAction} className="space-y-5 rounded-[20px] border border-border-default bg-surface-base p-6">
      {state.message ? (
        <p className="rounded-[14px] bg-red-50 px-4 py-3 text-sm text-red-800">{state.message}</p>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-medium text-ink-900">원아 이름</span>
        <input
          name="childName"
          defaultValue={memo?.child_name}
          maxLength={20}
          className="w-full rounded-[14px] border border-border-default px-3 py-2"
          placeholder="예: 민서"
        />
        {state.fieldErrors?.childName ? (
          <span className="text-sm text-red-700">{state.fieldErrors.childName}</span>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-ink-900">관찰 날짜</span>
        <input
          type="date"
          name="memoDate"
          defaultValue={memo?.memo_date}
          className="w-full rounded-[14px] border border-border-default px-3 py-2"
        />
        {state.fieldErrors?.memoDate ? (
          <span className="text-sm text-red-700">{state.fieldErrors.memoDate}</span>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-ink-900">메모</span>
        <textarea
          name="content"
          defaultValue={memo?.content}
          rows={6}
          maxLength={1000}
          className="w-full rounded-[14px] border border-border-default px-3 py-2"
          placeholder="오늘 본 장면을 짧게 적어 주세요."
        />
        {state.fieldErrors?.content ? (
          <span className="text-sm text-red-700">{state.fieldErrors.content}</span>
        ) : null}
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-ink-900">사진 (선택)</span>
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setPreview(file ? URL.createObjectURL(file) : publicImageUrl(memo?.image_path ?? null));
          }}
          className="block w-full text-sm text-ink-600"
        />
        <p className="text-xs text-ink-600">JPG, PNG, WEBP / 최대 3MB</p>
        {state.fieldErrors?.image ? (
          <span className="text-sm text-red-700">{state.fieldErrors.image}</span>
        ) : null}
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="미리보기" className="mt-2 max-h-56 rounded-[14px] object-cover" />
        ) : null}
      </label>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-[14px] bg-brand-600 px-4 py-3 font-medium text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending ? "저장 중..." : submitLabel}
      </button>
    </form>
  );
}
