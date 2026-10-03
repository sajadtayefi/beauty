"use client";

import { motion } from "framer-motion";
import { nailStatuses, type NailStatus } from "@/lib/nail-flow";
import { useNailBookingStore } from "@/store/nail-booking-store";
import { fadeUp, staggerParent } from "@/lib/motion";
import { SparkleIcon, HeartIcon, ShieldIcon, ChatIcon, CheckIcon } from "@/components/icons";

const statusIcons: Record<NailStatus, typeof SparkleIcon> = {
  natural: SparkleIcon,
  gel_polish: HeartIcon,
  extension: ShieldIcon,
  unknown: ChatIcon,
};

export function StepStatus() {
  const status = useNailBookingStore((s) => s.status);
  const chooseStatus = useNailBookingStore((s) => s.chooseStatus);

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
        وضعیت فعلی ناخن شما چیست؟
      </h2>
      <p className="mt-2 text-sm leading-7 text-muted">
        یکی از گزینه‌های زیر را انتخاب کنید — مسیر رزرو با آن متناظر نمایش داده می‌شود.
      </p>
    </div>
  );
}
