/**
 * Dental booking flow — single source of truth for the 4-step wizard.
 *
 * Pure logic and all data live here: the store (store/booking-store.ts)
 * orchestrates, components render from the data below. Copy is Persian.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** Step 1 — current condition of the client's teeth. */
export type ToothCondition = "natural" | "restored" | "implant" | "unknown";

export type WizardStep = "condition" | "services" | "datetime" | "contact" | "success";

/** The four wizard steps shown in the progress indicator. */
export const wizardSteps: { id: WizardStep; label: string }[] = [
  { id: "condition", label: "وضعیت دندان" },
  { id: "services", label: "خدمات موردنظر" },
  { id: "datetime", label: "زمان مراجعه" },
  { id: "contact", label: "اطلاعات تماس" },
  { id: "success", label: "تأیید رزرو" },
];

export function stepIndexOf(step: WizardStep): number {
  return wizardSteps.findIndex((s) => s.id === step);
}

export function isMainStep(step: WizardStep): boolean {
  return step !== "success";
}

// ─── Condition options (step 1) ──────────────────────────────────────────────

export const conditionOptions: {
  value: ToothCondition;
  title: string;
  description: string;
}[] = [
  {
    value: "natural",
    title: "طبیعی",
    description: "نیازی به درمان ترمیمی ندارم",
  },
  {
    value: "restored",
    title: "ترمیم",
    description: "در حال حاضر روی دندان‌هایم ترمیم وجود دارد",
  },
  {
    value: "implant",
    title: "کاشت",
    description: "در حال حاضر ایمپلنت / کاشت دارم",
  },
  {
    value: "unknown",
    title: "نمی‌دانم",
    description: "از وضعیت دقیق دندان‌هایم مطمئن نیستم",
  },
];

export const conditionLabel: Record<ToothCondition, string> = {
  natural: "طبیعی",
  restored: "ترمیم",
  implant: "کاشت",
  unknown: "نمی‌دانم",
};

// ─── Services (step 2, multi-select) ─────────────────────────────────────────

export type ServiceId = "consult" | "smile_design" | "restoration" | "implant" | "other";

export type DentalService = {
  id: ServiceId;
  title: string;
  description: string;
};

export const dentalServices: DentalService[] = [
  {
    id: "consult",
    title: "مشاوره",
    description: "بررسی وضعیت دهان و دندان و پاسخ به سؤالات شما",
  },
  {
    id: "smile_design",
    title: "طراحی لبخند",
    description: "اصلاح طرح لبخند با برنامه‌ریزی دیجیتال",
  },
  {
    id: "restoration",
    title: "ترمیم",
    description: "کامپوزیت، لمینت و درمان‌های ترمیمی زیبایی",
  },
  {
    id: "implant",
    title: "ایمپلنت",
    description: "جایگزینی دندان از دست رفته با ایمپلنت",
  },
  {
    id: "other",
    title: "سایر خدمات",
    description: "جرم‌گیری، بلیچینگ و خدمات عمومی",
  },
];

export function serviceTitleById(id: ServiceId): string {
  return dentalServices.find((s) => s.id === id)?.title ?? id;
}

// ─── Dates & slots (step 3) ──────────────────────────────────────────────────

export type BookingDate = { iso: string; weekday: string; dayNumber: string; month: string };

const faWeekday = new Intl.DateTimeFormat("fa-IR", { weekday: "short" });
const faDay = new Intl.DateTimeFormat("fa-IR", { day: "numeric" });
const faMonth = new Intl.DateTimeFormat("fa-IR", { month: "long" });
const faFull = new Intl.DateTimeFormat("fa-IR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const pad2 = (n: number) => String(n).padStart(2, "0");

/** The next 7 days as calendar chips with Jalali labels. */
export function getBookingDates(): BookingDate[] {
  const dates: BookingDate[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    dates.push({
      iso: `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`,
      weekday: faWeekday.format(d),
      dayNumber: faDay.format(d),
      month: faMonth.format(d),
    });
  }
  return dates;
}

export function fullDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return faFull.format(new Date(y, m - 1, d));
}

export type TimeSlot = { time: string; taken: boolean };

const baseSlots: TimeSlot[] = [
  { time: "09:00", taken: false },
  { time: "10:00", taken: false },
  { time: "11:00", taken: true },
  { time: "12:00", taken: false },
  { time: "15:00", taken: false },
  { time: "16:00", taken: false },
  { time: "17:00", taken: true },
  { time: "18:00", taken: false },
];

/** Stable pseudo-random availability per date so slots differ day to day. */
function hashDate(iso: string): number {
  let h = 0;
  for (let i = 0; i < iso.length; i++) {
    h = (h * 31 + iso.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function getSlotsForDate(iso: string): TimeSlot[] {
  const h = hashDate(iso);
  return baseSlots.map((slot, i) => ({
    ...slot,
    taken: ((h >> i) & 1) === 1 ? !slot.taken : slot.taken,
  }));
}

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toFaDigits(value: string): string {
  return value.replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function formatSlotTime(time: string): string {
  return toFaDigits(time);
}

// ─── Phone validation & tracking ID ──────────────────────────────────────────

/** Convert Persian digits to Latin so validation works for both keyboards. */
export function normalizeDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)));
}

/** Iranian mobile number: 09 followed by 9 digits. */
export function isValidMobile(phone: string): boolean {
  return /^09\d{9}$/.test(normalizeDigits(phone).trim());
}

/** Human-readable tracking number for the success screen. */
export function makeTrackingId(): string {
  return `BBL-${Math.floor(10000 + Math.random() * 90000)}`;
}
