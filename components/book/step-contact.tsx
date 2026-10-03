"use client";

import { motion } from "framer-motion";
import {
  conditionLabel,
  formatSlotTime,
  fullDateLabel,
  isValidMobile,
  serviceTitleById,
} from "@/lib/booking";
import { useBookingStore } from "@/store/booking-store";
import { fadeUp, staggerParent } from "@/lib/motion";
import { CalendarIcon } from "@/components/icons";

const inputClass =
  "min-h-11 w-full rounded-xl border border-line bg-surface px-4 text-sm text-text outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

export function StepContact() {
  const condition = useBookingStore((s) => s.condition);
  const services = useBookingStore((s) => s.services);
  const dateIso = useBookingStore((s) => s.dateIso);
  const time = useBookingStore((s) => s.time);
  const name = useBookingStore((s) => s.name);
  const phone = useBookingStore((s) => s.phone);
  const notes = useBookingStore((s) => s.notes);
  const setContact = useBookingStore((s) => s.setContact);

  if (!dateIso || !time || !condition) return null;

  const nameOk = name.trim().length >= 2;
  const phoneOk = isValidMobile(phone);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        اطلاعات تماس
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        برای ثبت نهایی رزرو، فقط سه چیز لازم داریم.
      </p>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="mt-8 flex flex-col gap-8"
      >
        {/* form */}
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          <div>
            <label htmlFor="bk-name" className="mb-1.5 block text-sm font-medium text-text">
              نام و نام خانوادگی
            </label>
            <input
              id="bk-name"
              className={inputClass}
              value={name}
              onChange={(e) => setContact({ name: e.target.value })}
              autoComplete="name"
            />
            {name.length > 0 && !nameOk && (
              <p className="mt-1.5 text-xs text-error">نام را کامل وارد کنید.</p>
            )}
          </div>

          <div>
            <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-medium text-text">
              شماره موبایل
            </label>
            <input
              id="bk-phone"
              className={`${inputClass} text-start`}
              dir="ltr"
              inputMode="tel"
              placeholder="09xxxxxxxxx"
              value={phone}
              onChange={(e) => setContact({ phone: e.target.value })}
              autoComplete="tel"
            />
            {phone.length > 0 && !phoneOk && (
              <p className="mt-1.5 text-xs text-error">
                شماره موبایل معتبر وارد کنید؛ مثلاً ۰۹۱۲۳۴۵۶۷۸۹
              </p>
            )}
          </div>

          <div>
            <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-medium text-text">
              توضیحات <span className="font-normal text-muted">(اختیاری)</span>
            </label>
            <textarea
              id="bk-notes"
              rows={3}
              className={`${inputClass} resize-none py-3`}
              value={notes}
              onChange={(e) => setContact({ notes: e.target.value })}
            />
          </div>
        </motion.div>

        {/* summary */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-line bg-surface p-5"
          aria-label="خلاصهٔ رزرو"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/12 text-accent-strong">
              <CalendarIcon className="h-4.5 w-4.5" />
            </span>
            <p className="text-sm font-semibold text-text">خلاصهٔ رزرو شما</p>
          </div>

          <dl className="mt-4 flex flex-col gap-2.5 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">خدمات</dt>
              <dd className="text-end font-medium text-text">
                {services.map(serviceTitleById).join("، ")}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">وضعیت دندان</dt>
              <dd className="font-medium text-text">{conditionLabel[condition]}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">تاریخ</dt>
              <dd className="font-medium text-text">{fullDateLabel(dateIso)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">ساعت</dt>
              <dd className="font-medium text-text">{formatSlotTime(time)}</dd>
            </div>
          </dl>
        </motion.div>
      </motion.div>
    </div>
  );
}
