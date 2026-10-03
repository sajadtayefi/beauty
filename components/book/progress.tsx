"use client";

import { motion } from "framer-motion";
import { wizardSteps, type WizardStep } from "@/lib/booking";
import { useBookingStore } from "@/store/booking-store";
import { CheckIcon } from "@/components/icons";

/** Four-step indicator: 01 وضعیت دندان → 04 اطلاعات تماس. */
export function ProgressIndicator() {
  const step = useBookingStore((s) => s.step);
  const goToStep = useBookingStore((s) => s.goToStep);

  const currentIdx = wizardSteps.findIndex((s) => s.id === step);
  const isCurrentIdxKnown = currentIdx !== -1;

  return (
    <nav aria-label="مراحل رزرو" className="mb-10">
      <ol className="flex items-start">
        {wizardSteps.map((s, i) => {
          const active = isCurrentIdxKnown && i === currentIdx;
          const done = isCurrentIdxKnown && i < currentIdx;
          const clickable = done;

          return (
            <li key={s.id} className="flex flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                {/* connector before (hidden for first) */}
                <span
                  aria-hidden
                  className={`h-0.5 flex-1 rounded ${
                    i === 0
                      ? "opacity-0"
                      : done || active
                        ? "bg-accent"
                        : "bg-line"
                  }`}
                />
                <button
                  type="button"
                  disabled={!clickable}
                  onClick={() => clickable && goToStep(s.id as WizardStep)}
                  aria-current={active ? "step" : undefined}
                  aria-label={`مرحله ${i + 1}: ${s.label}`}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                    done
                      ? "cursor-pointer bg-accent text-white"
                      : active
                        ? "bg-primary text-bg"
                        : "bg-primary/8 text-muted"
                  } ${clickable ? "hover:scale-105" : ""}`}
                >
                  {done ? (
                    <motion.span
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    i + 1
                  )}
                </button>
                {/* connector after (hidden for last) */}
                <span
                  aria-hidden
                  className={`h-0.5 flex-1 rounded ${
                    i === wizardSteps.length - 1
                      ? "opacity-0"
                      : done
                        ? "bg-accent"
                        : "bg-line"
                  }`}
                />
              </div>
              <p
                className={`mt-2 text-center text-xs font-medium sm:text-sm ${
                  active ? "text-text" : done ? "text-accent-strong" : "text-muted/70"
                }`}
              >
                {s.label}
              </p>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
