"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  getBookingDates,
  isSlotTaken,
  timeSlots,
} from "@/lib/nail-flow";
import { useNailBookingStore } from "@/store/nail-booking-store";
import { fadeUp, staggerParent } from "@/lib/motion";

export function StepDateTime() {
  const dateIso = useNailBookingStore((s) => s.dateIso);
  const time = useNailBookingStore((s) => s.time);
  const setDate = useNailBookingStore((s) => s.setDate);
  const setTime = useNailBookingStore((s) => s.setTime);

  const dates = useMemo(() => getBookingDates(), []);
  const slots = useMemo(
    () => getSlots(dateIso ?? dates[0].iso),
    [dateIso, dates],
  );

  // Preselect the first day so its free slots are visible right away.
  useEffect(() => {
    if (!dateIso) setDate(dates[0].iso);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        تاریخ و ساعت مورد نظر خود را انتخاب کنید
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        روز و ساعت دلخواه‌تان را انتخاب کنید — اسلات‌های خاکستری رزروشده‌اند.
      </p>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        animate="visible"
        className="mt-8 flex flex-col gap-6"
      >
        {/* day chips */}
        <motion.div variants={fadeUp} className="flex gap-2 overflow-x-auto pb-1">
          {dates.map((d) => {
            const selected = (dateIso ?? dates[0].iso) === d.iso;
            return (
              <button
                key={d.iso}
                type="button"
                aria-pressed={selected}
                onClick={() => setDate(d.iso)}
                className={`flex min-h-11 min-w-20 shrink-0 cursor-pointer flex-col items-center gap-0.5 rounded-2xl border px-3.5 py-2.5 transition-colors ${
                  selected
                    ? "border-accent bg-accent/10"
                    : "border-line bg-surface hover:border-accent/40"
                }`}
              >
                <span className={`text-xs ${selected ? "text-accent-strong" : "text-muted"}`}>
                  {d.weekday}
                </span>
                <span className="text-base font-bold text-text">{d.dayNum}</span>
                <span className="text-[10px] text-muted">{d.month}</span>
              </button>
            );
          })}
        </motion.div>

        {/* time slots */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2.5 sm:grid-cols-4" role="radiogroup" aria-label="ساعت مراجعه">
          {slots.map(({ slot, taken, label }) => {
            const selected = time === slot;
            return (
              <button
                key={slot}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={taken}
                onClick={() => setTime(slot)}
                className={`min-h-11 cursor-pointer rounded-xl border text-sm font-medium transition-colors ${
                  selected
                    ? "border-accent bg-accent text-bg"
                    : taken
                      ? "cursor-not-allowed border-line/60 bg-muted/8 text-muted/50 line-through"
                      : "border-line bg-surface text-text hover:border-accent/40"
                }`}
              >
                {label}
              </button>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

/** Slot list for a date, with taken flags and Persian labels. */
function getSlots(iso: string) {
  return timeSlots.map((slot) => ({
    slot,
    taken: isSlotTaken(iso, slot),
    label: slot.replace(":", " :"),
  }));
}
