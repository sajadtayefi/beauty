import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingWizard } from "@/components/book/booking-wizard";

export const metadata: Metadata = {
  title: "رزرو آنلاین | بل بیوتی لب",
  description:
    "در چهار مرحلهٔ ساده وقت خود را رزرو کنید: وضعیت دندان، خدمات، زمان مراجعه و اطلاعات تماس.",
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 md:py-16">
          <BookingWizard />
        </div>
      </main>
      <Footer />
    </>
  );
}
