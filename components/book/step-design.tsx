"use client";

import { motion } from "framer-motion";
import { designOptionsFor, designTypeLabel } from "@/lib/nail-flow";
import { useNailBookingStore } from "@/store/nail-booking-store";
import { fadeUp, staggerParent } from "@/lib/motion";
import { CheckIcon } from "@/components/icons";

export function StepDesign() {
  const designType = useNailBookingStore((s) => s.designType);
  const chooseDesignType = useNailBookingStore((s) => s.chooseDesignType);

  const options = designOptionsFor("extension"); // same set for repair

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        طرح مورد نظر خود را انتخاب کنید
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        می‌توانید بدون طرح، از نمونه‌های سایت انتخاب کنید یا عکس طرح دلخواه‌تان را بفرستید.
      </p>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="mt-8 flex flex-col gap-3"
        role="radiogroup"
        aria-label="نوع طرح"
      >
        {options.map((value) => {
          const selected = designType === value;
          return (
            <motion.button
              key={value}
              variants={fadeUp}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => chooseDesignType(value)}
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
                <span className="font-medium text-text">{designTypeLabel[value]}</span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
