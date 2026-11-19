"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase/client";
import { validateImageFile, validateMemoInput } from "@/lib/validation";
import { IMAGE_BUCKET } from "@/types/memo";

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: {
    childName?: string;
    memoDate?: string;
    content?: string;
    image?: string;
  };
};

async function uploadImage(file: File | null, previousPath?: string | null) {
  if (!file || file.size === 0) return previousPath ?? null;

  const imageError = validateImageFile(file);
  if (imageError) {
    throw new Error(imageError);
  }

  const supabase = createSupabaseClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(IMAGE_BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });

  if (error) {
    throw new Error("사진 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요.");
  }

  if (previousPath) {
    await supabase.storage.from(IMAGE_BUCKET).remove([previousPath]);
  }

  return path;
}

export async function createMemo(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = validateMemoInput(formData);
  if (parsed.errors || !parsed.values) {
    return { ok: false, fieldErrors: parsed.errors };
  }

  const file = formData.get("image");
  const imageFile = file instanceof File ? file : null;
  const imageError = validateImageFile(imageFile);
  if (imageError) {
    return { ok: false, fieldErrors: { image: imageError } };
  }

  try {
    const imagePath = await uploadImage(imageFile);
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("memos")
      .insert({
        child_name: parsed.values.childName,
        memo_date: parsed.values.memoDate,
        content: parsed.values.content,
        image_path: imagePath,
      })
      .select("id")
      .single();

    if (error || !data) {
      return {
        ok: false,
        message: "메모를 저장하지 못했습니다. 테이블이 준비됐는지 확인해 주세요.",
      };
    }

    revalidatePath("/");
    redirect(`/memos/${data.id}?src=created`);
  } catch (error) {
    if (isRedirect(error)) throw error;
    return {
      ok: false,
      message: error instanceof Error ? error.message : "저장 중 오류가 났습니다.",
    };
  }
}

export async function updateMemo(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = validateMemoInput(formData);
  if (parsed.errors || !parsed.values) {
    return { ok: false, fieldErrors: parsed.errors };
  }

  const file = formData.get("image");
  const imageFile = file instanceof File ? file : null;
  const imageError = validateImageFile(imageFile);
  if (imageError) {
    return { ok: false, fieldErrors: { image: imageError } };
  }

  try {
    const supabase = createSupabaseClient();
    const { data: current, error: currentError } = await supabase
      .from("memos")
      .select("image_path")
      .eq("id", id)
      .maybeSingle();

    if (currentError || !current) {
      return { ok: false, message: "수정할 메모를 찾지 못했습니다." };
    }

    const imagePath = await uploadImage(imageFile, current.image_path);
    const { error } = await supabase
      .from("memos")
      .update({
        child_name: parsed.values.childName,
        memo_date: parsed.values.memoDate,
        content: parsed.values.content,
        image_path: imagePath,
      })
      .eq("id", id);

    if (error) {
      return { ok: false, message: "메모를 수정하지 못했습니다." };
    }

    revalidatePath("/");
    revalidatePath(`/memos/${id}`);
    redirect(`/memos/${id}?src=updated`);
  } catch (error) {
    if (isRedirect(error)) throw error;
    return {
      ok: false,
      message: error instanceof Error ? error.message : "수정 중 오류가 났습니다.",
    };
  }
}

export async function deleteMemo(id: string) {
  const supabase = createSupabaseClient();
  const { data } = await supabase
    .from("memos")
    .select("image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("memos").delete().eq("id", id);
  if (error) {
    return { ok: false as const, message: "메모를 삭제하지 못했습니다." };
  }

  if (data?.image_path) {
    await supabase.storage.from(IMAGE_BUCKET).remove([data.image_path]);
  }

  revalidatePath("/");
  redirect("/");
}

function isRedirect(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    String((error as { digest?: string }).digest).startsWith("NEXT_REDIRECT")
  );
}
