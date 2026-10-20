import { createSupabaseClient } from "@/lib/supabase/client";
import { IMAGE_BUCKET, PAGE_SIZE, type Memo } from "@/types/memo";

export function publicImageUrl(path: string | null): string | null {
  if (!path) return null;
  const supabase = createSupabaseClient();
  return supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function listMemos(page: number) {
  const supabase = createSupabaseClient();
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("memos")
    .select("*", { count: "exact" })
    .order("memo_date", { ascending: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    memos: (data ?? []) as Memo[],
    total: count ?? 0,
    page,
    pageCount: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

export async function getMemo(id: string): Promise<Memo | null> {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as Memo | null) ?? null;
}
