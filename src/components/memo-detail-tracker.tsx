"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";

export function MemoDetailTracker({ hasImage }: { hasImage: boolean }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    track("memo_detail_viewed", { has_image: hasImage });
    const src = searchParams.get("src");
    if (src === "created") track("memo_created", { has_image: hasImage });
    if (src === "updated") track("memo_updated", { has_image: hasImage });
  }, [hasImage, searchParams]);

  return null;
}
