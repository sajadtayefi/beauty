"use client";

import { create } from "zustand";
import {
  DEPOSIT_RATE,
  designSummary,
  depositFor,
  initialSnapshot,
  invalidateDownstream,
  makeBookingId,
  makeConsultId,
  nailPrices,
  nailStatusLabel,
  normalizeDigits,
  remainderFor,
  resolveNextStep,
  serviceTitle,
  designTypeLabel,
  postRemovalTitle,
  type DesignType,
  type FlowSnapshot,
  type NailService,
  type NailStatus,
  type PostRemovalService,
} from "@/lib/nail-flow";

export type ConfirmedBooking = {
  id: string;
  condition: NailStatus;
  service: NailService;
  designType: DesignType | null;
  sampleId: string | null;
  photoName: string | null;
  postRemoval: PostRemovalService | null;
  removalIntent: "re_extension" | "removal_only" | null;
  dateIso: string;
  time: string;
  total: number;
  deposit: number;
  remainder: number;
};

export type ConsultationRequest = {
  id: string;
  photoName: string;
  photoPreview: string | null;
  phone: string;
  status: "pending_consultation";
};

type NailBookingState = FlowSnapshot & {
  /** History of snapshots for the back button (invalid picks are cleared on back). */
  history: FlowSnapshot[];
  direction: 1 | -1;
  booking: ConfirmedBooking | null;
  consultation: ConsultationRequest | null;
  payError: string | null;
  processing: boolean;

  chooseStatus: (status: NailStatus) => void;
  chooseService: (service: NailService) => void;
  chooseDesignType: (designType: DesignType) => void;
  chooseSample: (sampleId: string) => void;
  setPhoto: (name: string, preview: string | null) => void;
  clearPhoto: () => void;
  choosePostRemoval: (service: PostRemovalService) => void;
  chooseRemovalIntent: (intent: "re_extension" | "removal_only") => void;
  setDate: (iso: string) => void;
  setTime: (time: string) => void;
  setPhone: (phone: string) => void;
  next: () => void;
  back: () => void;
  submitConsultation: () => void;
  pay: (card: string) => void;
  reset: () => void;
};

/** Snapshot of all flow fields (excluding runtime UI state). */
function snap(s: NailBookingState): FlowSnapshot {
  return {
    step: s.step,
    status: s.status,
    service: s.service,
    designType: s.designType,
    sampleId: s.sampleId,
    photoName: s.photoName,
    photoPreview: s.photoPreview,
    postRemoval: s.postRemoval,
    removalIntent: s.removalIntent,
    dateIso: s.dateIso,
    time: s.time,
    phone: s.phone,
  };
}

export const useNailBookingStore = create<NailBookingState>()((set, get) => ({
  ...initialSnapshot(),
  history: [],
  direction: 1,
  booking: null,
  consultation: null,
  payError: null,
  processing: false,

  chooseStatus: (status) =>
    set((s) => ({
      status,
      history: [...s.history, { ...snap(s), step: "status" }],
      direction: 1,
      ...invalidateDownstream({ ...snap(s), step: "service" }),
      step: "service",
    })),

  chooseService: (service) =>
    set((s) => ({
      service,
      history: [...s.history, { ...snap(s), step: "service" }],
      direction: 1,
      ...invalidateDownstream({ ...snap(s), step: resolveNextStep({ ...snap(s), service }) }),
      step: resolveNextStep({ ...snap(s), service }),
    })),

  chooseDesignType: (designType) =>
    set((s) => {
      const step = resolveNextStep({ ...snap(s), designType });
      return {
        designType,
        history: [...s.history, { ...snap(s), step: "design" }],
        direction: 1,
        ...invalidateDownstream({ ...snap(s), designType, step }),
        step,
      };
    }),

  chooseSample: (sampleId) => set({ sampleId }),

  setPhoto: (photoName, photoPreview) => set({ photoName, photoPreview }),
  clearPhoto: () => set({ photoName: null, photoPreview: null }),

  choosePostRemoval: (postRemoval) =>
    set((s) => ({
      postRemoval,
      history: [...s.history, snap(s)],
      direction: 1,
      step: "datetime",
    })),

  chooseRemovalIntent: (removalIntent) =>
    set((s) => ({
      removalIntent,
      history: [...s.history, snap(s)],
      direction: 1,
      step: removalIntent === "re_extension" ? "design" : "datetime",
      ...(removalIntent === "re_extension"
        ? { service: "extension" as NailService }
        : {}),
    })),

  setDate: (dateIso) => set({ dateIso, time: null }),
  setTime: (time) => set({ time }),
  setPhone: (phone) => set({ phone }),

  next: () => {
    const s = get();
    const nextStep = resolveNextStep(snap(s));
    set({
      step: nextStep,
      direction: 1,
      history: [...s.history, snap(s)],
      payError: null,
    });
  },

  back: () => {
    const s = get();
    if (s.history.length === 0) return;
    const prev = s.history[s.history.length - 1];
    // Restore the previous snapshot but clear choices made *at* that step,
    // so returning always presents a fresh, valid choice (UX rule 4).
    const cleared = { ...prev };
    if (cleared.step === "status") cleared.status = null;
    if (cleared.step === "service") cleared.service = null;
    if (cleared.step === "design") cleared.designType = null;
    if (cleared.step === "gallery") cleared.sampleId = null;
    if (cleared.step === "upload") {
      cleared.photoName = null;
      cleared.photoPreview = null;
    }
    if (cleared.step === "post_removal") cleared.postRemoval = null;
    if (cleared.step === "removal_intent") cleared.removalIntent = null;
    if (cleared.step === "datetime") {
      cleared.dateIso = null;
      cleared.time = null;
    }
    set({ ...cleared, history: s.history.slice(0, -1), direction: -1, payError: null });
  },

  submitConsultation: () => {
    const s = get();
    if (!s.photoName || !s.phone || !/^09\d{9}$/.test(normalizeDigits(s.phone))) return;
    set({
      consultation: {
        id: makeConsultId(),
        photoName: s.photoName,
        photoPreview: s.photoPreview,
        phone: normalizeDigits(s.phone),
        status: "pending_consultation",
      },
      history: [...s.history, snap(s)],
      direction: 1,
      step: "consult_done",
    });
  },

  pay: (card) => {
    const s = get();
    const digits = card.replace(/[\s-]/g, "");
    if (digits.length !== 16 || !/^\d+$/.test(normalizeDigits(digits))) {
      set({ payError: "شماره کارت ۱۶ رقمی را کامل وارد کنید." });
      return;
    }
    // Simulated gateway: cards ending in «0» decline.
    if (normalizeDigits(digits).endsWith("0")) {
      set({ payError: "پرداخت ناموفق بود. مبلغی از حساب شما کسر نشد." });
      return;
    }
    const total = s.service ? nailPrices[s.service] : 0;
    set({
      processing: false,
      payError: null,
      booking: {
        id: makeBookingId(),
        condition: s.status ?? "unknown",
        service: s.service ?? "manicure",
        designType: s.designType,
        sampleId: s.sampleId,
        photoName: s.photoName,
        postRemoval: s.postRemoval,
        removalIntent: s.removalIntent,
        dateIso: s.dateIso ?? "",
        time: s.time ?? "",
        total,
        deposit: depositFor(total),
        remainder: remainderFor(total),
      },
      history: [...s.history, snap(s)],
      direction: 1,
      step: "confirmed",
    });
  },

  reset: () =>
    set({
      ...initialSnapshot(),
      history: [],
      direction: 1,
      booking: null,
      consultation: null,
      payError: null,
      processing: false,
    }),
}));

// ─── Derived helpers used by components ─────────────────────────────────────

export function bookingTotal(s: { service: NailService | null }): number {
  return s.service ? nailPrices[s.service] : 0;
}

export { DEPOSIT_RATE, depositFor, remainderFor, designSummary, nailPrices, nailStatusLabel, serviceTitle, designTypeLabel, postRemovalTitle };
