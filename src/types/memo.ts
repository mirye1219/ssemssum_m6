export type Memo = {
  id: string;
  child_name: string;
  memo_date: string;
  content: string;
  image_path: string | null;
  created_at: string;
  updated_at: string;
};

export const PAGE_SIZE = 6;
export const IMAGE_BUCKET = "memo-images";
export const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
