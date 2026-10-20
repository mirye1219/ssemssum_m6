import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "@/types/memo";

export type FieldErrors = {
  childName?: string;
  memoDate?: string;
  content?: string;
  image?: string;
};

export type ValidatedMemo = {
  childName: string;
  memoDate: string;
  content: string;
};

export function validateMemoInput(formData: FormData): {
  values?: ValidatedMemo;
  errors?: FieldErrors;
} {
  const childName = String(formData.get("childName") ?? "").trim();
  const memoDate = String(formData.get("memoDate") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const errors: FieldErrors = {};

  if (!childName) {
    errors.childName = "원아 이름을 입력해 주세요.";
  } else if (childName.length > 20) {
    errors.childName = "이름은 20자 이내로 입력해 주세요.";
  }

  if (!memoDate) {
    errors.memoDate = "관찰 날짜를 선택해 주세요.";
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(memoDate)) {
    errors.memoDate = "날짜 형식이 올바르지 않습니다.";
  }

  if (!content) {
    errors.content = "메모 내용을 입력해 주세요.";
  } else if (content.length < 5) {
    errors.content = "메모는 5자 이상 적어 주세요.";
  } else if (content.length > 1000) {
    errors.content = "메모는 1000자 이내로 적어 주세요.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  return { values: { childName, memoDate, content } };
}

export function validateImageFile(file: File | null): string | undefined {
  if (!file || file.size === 0) return undefined;
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "이미지는 JPG, PNG, WEBP만 올릴 수 있습니다.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "이미지 크기는 3MB 이하여야 합니다.";
  }
  return undefined;
}
