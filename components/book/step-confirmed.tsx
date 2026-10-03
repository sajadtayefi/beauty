"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  formatToman,
  fullDateLabel,
  nailStatusLabel,
  serviceTitle,
  designSummary,
  type FlowSnapshot,
} from "@/lib/nail-flow";
import { useNailBookingStore } from "@/store/nail-booking-store";
import { fadeIn, scaleIn } from "@/lib/motion";
import { CheckIcon } from "@/components/icons";

export function StepConfirmed() {
  const booking = useNailBookingStore((s) => s.booking);
  const designType = useNailBookingStore((s) => s.designType);
  const sampleId = useNailBookingStore((s) => s.sampleId);
  const reset = useNailBookingStore((s) => s.reset);

  if (!booking) return null;

  const snap: FlowSnapshot = {
    step: "confirmed",
    status: booking.condition,
    service: booking.service,
    designType,
    sampleId,
    photoName: booking.photoName,
    photoPreview: null,
    postRemoval: booking.postRemoval,
    removalIntent: booking.removalIntent,
    dateIso: booking.dateIso,
    time: booking.time,
    phone: null,
  };

  const rows: [string, string][] = [
    ["وضعیت اولیهٔ ناخن", nailStatusLabel[booking.condition]],
    ["خدمت", serviceTitle[booking.service]],
    ["طرح", designSummary(snap)],
    ["تاریخ", fullDateLabel(booking.dateIso)],
    ["ساعت", booking.time],
    ["مبلغ خدمات", formatToman(booking.total)],
    ["بیعانهٔ پرداخت‌شده", formatToman(booking.deposit)],
    ["باقی‌مانده در محل", formatToman(booking.remainder)],
  ];

  return (
    <div className="flex flex-col items-center py-8 text-center">
      <motion.span
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success"
      >
        <CheckIcon className="h-8 w-8" strokeWidth={2.2} />
      </motion.span>

      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-5">
        <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
          رزرو شما با موفقیت ثبت شد
        </h2>
        <p className="mt-2 text-sm leading-7 text-muted">
          شناسهٔ پیگیری: <span className="font-semibold text-accent-strong">{booking.id}</span>
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="mt-8 w-full rounded-2xl border border-line bg-surface p-5 text-start"
        aria-label="جزئیات رزرو"
      >
        <dl className="flex flex-col gap-2.5 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">{k}</dt>
              <dd className="font-medium text-text">{v}</dd>
            </div>
          ))}
        </dl>
      </motion.div>

      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="mt-8 flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={reset}
          className="min-h-11 cursor-pointer rounded-xl bg-primary px-6 text-sm font-semibold text-bg transition-colors hover:bg-black"
        >
          رزرو جدید
        </button>
        <Link
          href="/"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-6 text-sm font-semibold text-text transition-colors hover:border-accent/50"
        >
          بازگشت به صفحهٔ اصلی
        </Link>
      </motion.div>
    </div>
  );
}
