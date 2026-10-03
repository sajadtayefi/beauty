"use client";

import { motion } from "framer-motion";
import {
  serviceOptionsByStatus,
  serviceTitle,
  nailPrices,
  formatToman,
} from "@/lib/nail-flow";
import { useNailBookingStore } from "@/store/nail-booking-store";
import { fadeUp, staggerParent } from "@/lib/motion";
import { ArrowIcon, CheckIcon } from "@/components/icons";

export function StepService() {
  const status = useNailBookingStore((s) => s.status);
  const service = useNailBookingStore((s) => s.service);
  const chooseService = useNailBookingStore((s) => s.chooseService);

  const options = status ? serviceOptionsByStatus(status) : [];

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        چه خدمتی می‌خواهید؟
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        انتخاب وضعیت شما، لیست خدمت‌های در دسترس را تعیین می‌کند.
      </p>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="mt-8 flex flex-col gap-3"
        role="radiogroup"
        aria-label="خدمت موردنظر"
      >
        {options.map((value) => {
          const selected = service === value;
          return (
            <motion.button
              key={value}
              variants={fadeUp}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => chooseService(value)}
              whileTap={{ scale: 0.99 }}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-start transition-colors duration-200 sm:px-5 ${
                selected
                  ? "border-accent bg-accent/8"
                  : "border-line bg-surface hover:border-accent/40"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-5.5 w-5.5 items-center justify-center rounded-full border transition-colors ${
                    selected ? "border-accent bg-accent text-bg" : "border-line"
                  }`}
                >
                  {selected && <CheckIcon className="h-3 w-3" strokeWidth={2.6} />}
                </span>
                <span className="font-medium text-text">{serviceTitle[value]}</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="text-sm text-muted">{formatToman(nailPrices[value])}</span>
                <ArrowIcon className="h-4 w-4 text-muted transition-transform duration-200 group-hover:-translate-x-0.5" />
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
