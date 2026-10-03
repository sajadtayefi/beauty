import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "بل بیوتی لب | کلینیک لبخند و خدمات دندانپزشکی",
  description:
    "مشاوره و خدمات تخصصی دندانپزشکی — طراحی لبخند، ترمیم و ایمپلنت، با تجربه‌ای ساده، شفاف و شخصی‌سازی‌شده. رزرو آنلاین در ۴ مرحله.",
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
