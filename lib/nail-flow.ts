/**
 * Nail booking flow — single source of truth for the conditional wizard.
 *
 * Pure logic and all data live here; the store (store/nail-booking-store.ts)
 * orchestrates, components render from the data below. Copy is Persian.
 * Flow per the business spec — no extra steps or invented decisions.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

/** Step 1 — current state of the client's nails. */
export type NailStatus = "natural" | "gel_polish" | "extension" | "unknown";

/** Step-level services (names follow the spec). */
export type NailService =
  | "manicure"
  | "gel_polish"
  | "extension"
  | "repair"
  | "removal";

/** How the client wants the design handled (extension / repair paths). */
export type DesignType = "none" | "site_sample" | "custom_image";

/** Service chosen after a removal (removal path). */
export type PostRemovalService = "extension" | "gel_polish" | "repair";

/** Every distinct screen the flow can show. */
export type NailStep =
  | "status"
  | "service"
  | "design"
  | "gallery"
  | "upload"
  | "post_removal" // C-1 «بعد از برداشت چه خدمتی می‌خواهید؟»
  | "removal_intent" // B-3 «بعد از برداشت، کاشت می‌خواهید؟»
  | "consult" // D — photo + mobile
  | "consult_done"
  | "datetime"
  | "pay"
  | "confirmed";

// ─── Copy + data ─────────────────────────────────────────────────────────────

export const nailStatuses: { value: NailStatus; title: string; desc: string }[] = [
  { value: "natural", title: "طبیعی", desc: "ناخن هیچ کاشت، ژلیش یا ترمیمی ندارد" },
  { value: "gel_polish", title: "ژلیش", desc: "در حال حاضر روی ناخن‌هایم ژلیش وجود دارد" },
  { value: "extension", title: "کاشت", desc: "در حال حاضر ناخن کاشت دارم" },
  { value: "unknown", title: "نمی‌دانم", desc: "از وضعیت دقیق ناخن‌هایم مطمئن نیستم" },
];

export const nailStatusLabel: Record<NailStatus, string> = {
  natural: "طبیعی",
  gel_polish: "ژلیش",
  extension: "کاشت",
  unknown: "نمی‌دانم",
};

export const serviceTitle: Record<NailService, string> = {
  manicure: "مانیکور",
  gel_polish: "ژلیش",
  extension: "کاشت",
  repair: "ترمیم",
  removal: "ریموو / برداشت",
};

export const designTypeLabel: Record<DesignType, string> = {
  none: "بدون طرح",
  site_sample: "انتخاب نمونه از سایت",
  custom_image: "ارسال عکس طرح",
};

export const postRemovalTitle: Record<PostRemovalService, string> = {
  extension: "کاشت",
  gel_polish: "ژلیش",
  repair: "ترمیم",
};

/** Step-2 options per status (A, B, C rows of the spec tree). */
export function serviceOptionsByStatus(status: NailStatus): NailService[] {
  switch (status) {
    case "natural":
      return ["manicure", "gel_polish", "extension", "repair"];
    case "gel_polish":
      return ["extension", "repair", "removal"];
    case "extension":
      return ["removal", "gel_polish", "repair"];
    case "unknown":
      return [];
  }
}

/** Design options for extension (A-3) and repair (A-4). */
export function designOptionsFor(service: NailService): DesignType[] {
  if (service === "extension" || service === "repair") {
    return ["none", "site_sample", "custom_image"];
  }
  return [];
}

/** Prices in Toman — applied at the pay step. */
export const nailPrices: Record<NailService, number> = {
  manicure: 450_000,
  gel_polish: 800_000,
  extension: 1_800_000,
  repair: 1_100_000,
  removal: 500_000,
};

/** Gallery samples (base designs shown for gel_polish / site_sample). */
export const designSamples = [
  { id: "sample-1", title: "فرنچ کلاسیک", image: "/images/nail-design-1.svg" },
  { id: "sample-2", title: "نود مینیمال", image: "/images/nail-design-2.svg" },
  { id: "sample-3", title: "گلد فویل", image: "/images/nail-design-3.svg" },
  { id: "sample-4", title: "مرواریدی", image: "/images/nail-design-4.svg" },
  { id: "sample-5", title: "طرح هندسی", image: "/images/nail-design-5.svg" },
  { id: "sample-6", title: "کروم", image: "/images/nail-design-6.svg" },
] as const;

export const DEPOSIT_RATE = 0.1;

/** Next 7 days as selectable day chips. */
export function getBookingDates(): { iso: string; weekday: string; dayNum: string; month: string }[] {
  const fmt = new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long" });
  const out: { iso: string; weekday: string; dayNum: string; month: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const parts = fmt.formatToParts(d);
    out.push({
      iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      weekday: parts.find((p) => p.type === "weekday")?.value ?? "",
      dayNum: parts.find((p) => p.type === "day")?.value ?? "",
      month: parts.find((p) => p.type === "month")?.value ?? "",
    });
  }
  return out;
}

export const timeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"] as const;

/** Deterministic "already booked" slots so the UI has disabled states. */
export function isSlotTaken(iso: string, time: string): boolean {
  let h = 0;
  for (const c of iso + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 4 === 0;
}

/** Full date label for summaries — e.g. «دوشنبه ۱۲ آبان». */
export function fullDateLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("fa-IR", { weekday: "long", day: "numeric", month: "long" }).format(
    new Date(y, m - 1, d),
  );
}

export function formatToman(n: number): string {
  return `${n.toLocaleString("fa-IR")} تومان`;
}

/** Persian mobile: 09xxxxxxxxx (accepts Persian/Arabic digits). */
export function normalizeDigits(s: string): string {
  const fa = "۰۱۲۳۴۵۶۷۸۹";
  const ar = "٠١٢٣٤٥٦٧٨٩";
  return s.replace(/[۰-۹٠-٩]/g, (c) => String(Math.max(fa.indexOf(c), ar.indexOf(c))));
}

export function isValidMobile(raw: string): boolean {
  return /^09\d{9}$/.test(normalizeDigits(raw).replace(/[\s-]/g, ""));
}

// ─── Transition table ────────────────────────────────────────────────────────

export type FlowSnapshot = {
  step: NailStep;
  status: NailStatus | null;
  service: NailService | null;
  designType: DesignType | null;
  sampleId: string | null;
  photoName: string | null;
  photoPreview: string | null;
  postRemoval: PostRemovalService | null;
  removalIntent: "re_extension" | "removal_only" | null;
  dateIso: string | null;
  time: string | null;
  phone: string | null;
};

export function initialSnapshot(): FlowSnapshot {
  return {
    step: "status",
    status: null,
    service: null,
    designType: null,
    sampleId: null,
    photoName: null,
    photoPreview: null,
    postRemoval: null,
    removalIntent: null,
    dateIso: null,
    time: null,
    phone: null,
  };
}

/**
 * The one transition function. Given the current snapshot, returns the next
 * step (without mutating). Pure → trivially testable per the spec.
 */
export function resolveNextStep(s: FlowSnapshot): NailStep {
  switch (s.step) {
    case "status":
      return s.status === "unknown" ? "consult" : "service";

    case "service": {
      if (s.service === "manicure") return "datetime"; // A-1
      if (s.service === "gel_polish") return "gallery"; // A-2 / C-2
      if (s.service === "extension") return "design"; // A-3 / B-1
      if (s.service === "repair") return "design"; // A-4
      if (s.service === "removal") {
        return s.status === "gel_polish" ? "removal_intent" : "post_removal"; // B-3 vs C-1
      }
      return "service";
    }

    case "design":
      if (s.designType === "none") return "datetime";
      if (s.designType === "site_sample") return "gallery";
      if (s.designType === "custom_image") return "upload";
      return "design";

    case "gallery":
    case "upload":
    case "post_removal":
    case "removal_intent":
      return "datetime";

    case "consult":
      return "consult_done";
    case "consult_done":
      return "status";

    case "datetime":
      return "pay";
    case "pay":
      return "confirmed";
    case "confirmed":
      return "status";
  }
}

/** Clear downstream choices that became invalid after a change. */
export function invalidateDownstream(s: FlowSnapshot): FlowSnapshot {
  const next = { ...s };
  if (next.step === "status") {
    next.service = null;
    next.designType = null;
    next.sampleId = null;
    next.photoName = null;
    next.photoPreview = null;
    next.postRemoval = null;
    next.removalIntent = null;
  }
  if (next.step === "service") {
    next.designType = null;
    next.sampleId = null;
    next.photoName = null;
    next.photoPreview = null;
    next.postRemoval = null;
    next.removalIntent = null;
  }
  if (next.step === "design") {
    next.sampleId = null;
    next.photoName = null;
    next.photoPreview = null;
  }
  if (next.step === "post_removal" || next.step === "removal_intent") {
    next.dateIso = null;
    next.time = null;
  }
  return next;
}

/** One-line description of the chosen design for the order summary. */
export function designSummary(s: FlowSnapshot): string {
  if (s.designType === "custom_image") return "عکس طرح شخصی";
  if (s.sampleId) {
    const sample = designSamples.find((d) => d.id === s.sampleId);
    if (sample) return sample.title;
  }
  if (s.designType === "site_sample") return "نمونهٔ سایت";
  if (s.designType === "none") return "بدون طرح";
  return "—";
}

/** Deposit = 10% of the total. */
export function depositFor(total: number): number {
  return Math.round(total * DEPOSIT_RATE);
}

export function remainderFor(total: number): number {
  return total - depositFor(total);
}

export function makeBookingId(): string {
  return `BBL-${Math.floor(10000 + Math.random() * 89999)}`;
}

export function makeConsultId(): string {
  return `CONS-${Math.floor(10000 + Math.random() * 89999)}`;
}
