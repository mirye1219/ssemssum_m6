"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics";

type Props = ComponentProps<typeof Link> & {
  event: string;
  eventProps?: Record<string, string | number | boolean | undefined>;
};

export function TrackLink({ event, eventProps, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}
