"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  depositFor,
  designSummary,
  formatToman,
  fullDateLabel,
  nailPrices,
  nailStatusLabel,
  serviceTitle,
  type FlowSnapshot,
} from "@/lib/nail-flow";
import { useNailBookingStore } from "@/store/nail-booking-store";
import { fadeUp, staggerParent } from "@/lib/motion";
import { ShieldIcon } from "@/components/icons";

export function StepPay() {
  const status = useNailBookingStore((s) => s.status);
  const service = useNailBookingStore((s) => s.service);
  const designType = useNailBookingStore((s) => s.designType);
  const sampleId = useNailBookingStore((s) => s.sampleId);
  const photoName = useNailBookingStore((s) => s.photoName);
  const postRemoval = useNailBookingStore((s) => s.postRemoval);
  const removalIntent = useNailBookingStore((s) => s.removalIntent);
  const phone = useNailBookingStore((s) => s.phone);
  const dateIso = useNailBookingStore((s) => s.dateIso);
  const time = useNailBookingStore((s) => s.time);
  const payError = useNailBookingStore((s) => s.payError);
  const pay = useNailBookingStore((s) => s.pay);
  const [card, setCard] = useState("");

  if (!service || !dateIso || !time || !status) return null;

  const snapshot: FlowSnapshot = {
    step: "pay",
    status,
    service,
    designType,
    sampleId,
    photoName,
    photoPreview: null,
    postRemoval,
    removalIntent,
    dateIso,
    time,
    phone,
  };

  const total = nailPrices[service];
  const deposit = depositFor(total);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        پرداخت بیعانه
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        برای نهایی شدن رزرو، ۱۰٪ مبلغ خدمات را به‌عنوان بیعانه پرداخت کنید.
      </p>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="mt-8 flex flex-col gap-5"
      >
        {/* order summary — exactly the fields the spec requires */}
        <motion.div variants={fadeUp} className="rounded-2xl border border-line bg-surface p-5" aria-label="خلاصهٔ سفارش">
          <dl className="flex flex-col gap-2.5 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">وضعیت اولیهٔ ناخن</dt>
              <dd className="font-medium text-text">{nailStatusLabel[status]}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">خدمت انتخاب‌شده</dt>
              <dd className="font-medium text-text">{serviceTitle[service]}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">طرح</dt>
              <dd className="font-medium text-text">{designSummary(snapshot)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">تاریخ</dt>
              <dd className="font-medium text-text">{fullDateLabel(dateIso)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">ساعت</dt>
              <dd className="font-medium text-text">{time}</dd>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-3">
              <dt className="text-muted">مبلغ خدمات</dt>
              <dd className="font-semibold text-text">{formatToman(total)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="font-semibold text-text">بیعانه (۱۰٪)</dt>
              <dd className="text-base font-bold text-accent-strong">{formatToman(deposit)}</dd>
            </div>
          </dl>
        </motion.div>

        {/* simulated card entry */}
        <motion.div variants={fadeUp} className="flex flex-col gap-2">
          <label htmlFor="pay-card" className="block text-sm font-medium text-text">
            شماره کارت
          </label>
          <input
            id="pay-card"
            dir="ltr"
            inputMode="numeric"
            autoComplete="cc-number"
            placeholder="1234 5678 9012 3456"
            value={card}
            onChange={(e) => setCard(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-text outline-none transition-colors placeholder:text-muted/60 focus:border-accent"
          />
          {payError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="rounded-lg bg-error/8 px-3 py-2 text-xs font-medium text-error"
            >
              {payError}
            </motion.p>
          )}
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <ShieldIcon className="h-3.5 w-3.5" />
            درگاه پرداخت امن — این یک شبیه‌ساز دمو است.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
