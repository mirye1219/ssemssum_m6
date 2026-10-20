import type { Metadata } from "next";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import { Header } from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "쌤씀 메모",
    template: "%s | 쌤씀 메모",
  },
  description: "오늘 본 장면을 짧게 남기는 원아 메모 MVP",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full bg-surface-warm text-ink-900">
        <Header />
        <main className="mx-auto w-full max-w-5xl px-5 py-10">{children}</main>
      </body>
    </html>
  );
}
