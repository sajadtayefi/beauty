"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useBookingStore } from "@/store/booking-store";
import { isValidMobile, wizardSteps } from "@/lib/booking";
import { slideX } from "@/lib/motion";
import { ProgressIndicator } from "@/components/book/progress";
import { StepStatus } from "@/components/book/step-status";
import { StepDesign } from "@/components/book/step-design";
import { StepDateTime } from "@/components/book/step-datetime";
import { StepPay } from "@/components/book/step-pay";
import { ArrowIcon } from "@/components/icons";

export function BookingWizard() {
  const step = useBookingStore((s) => s.step);
  const direction = useBookingStore((s) => s.direction);
  const next = useBookingStore((s) => s.next);
  const back = useBookingStore((s) => s.back);
  const confirm = useBookingStore((s) => s.confirm);
  const condition = useBookingStore((s) => s.condition);
  const services = useBookingStore((s) => s.services);
  const dateIso = useBookingStore((s) => s.dateIso);
  const time = useBookingStore((s) => s.time);
  const name = useBookingStore((s) => s.name);
  const phone = useBookingStore((s) => s.phone);

  const stepIdx = wizardSteps.findIndex((s) => s.id === step);

  const canContinue =
    (step === "condition" && condition !== null) ||
    (step === "services" && services.length > 0) ||
    (step === "datetime" && !!dateIso && !!time) ||
    (step === "contact" && name.trim().length >= 2 && isValidMobile(phone));

  const onPrimary = () => {
    if (step === "contact") confirm();
    else next();
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col">
      {step === "success" ? (
        <StepSuccess />
      ) : (
        <>
          {/* header row */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-text">
                رزرو آنلاین
              </h1>
              <p className="mt-1 text-sm text-muted" aria-live="polite">
                مرحله {stepIdx + 1} از {wizardSteps.length}
              </p>
            </div>
            {stepIdx > 0 && (
              <button
                type="button"
                onClick={back}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-sm font-medium text-text transition-colors hover:border-primary/30"
              >
                <ArrowIcon className="h-4 w-4" />
                بازگشت
              </button>
            )}
          </div>

          <ProgressIndicator />

          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideX}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {step === "status" && <StepStatus />}
              {step === "design" && <StepDesign />}
              {step === "datetime" && <StepDateTime />}
              {step === "pay" && <StepPay />}
            </motion.div>
          </AnimatePresence>

          {/* sticky footer action bar */}
          <div className="sticky bottom-4 mt-10">
            <div className="rounded-2xl border border-line bg-surface/90 p-3 shadow-lift backdrop-blur">
              <button
                type="button"
                onClick={onPrimary}
                disabled={!canContinue}
                className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-bg transition-all duration-200 hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === "contact" ? "تأیید و رزرو" : "ادامه"}
                <span aria-hidden>←</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
