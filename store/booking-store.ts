"use client";

import { create } from "zustand";
import {
  conditionLabel,
  fullDateLabel,
  isValidMobile,
  makeTrackingId,
  serviceTitleById,
  type ServiceId,
  type ToothCondition,
  type WizardStep,
} from "@/lib/booking";

export type ConfirmedBooking = {
  trackingId: string;
  conditionLabel: string;
  serviceTitles: string[];
  dateLabel: string;
  time: string;
  name: string;
  phone: string;
};

export type BookingState = {
  step: WizardStep;
  /** +1 forward, -1 back — drives the direction of step transitions. */
  direction: 1 | -1;
  condition: ToothCondition | null;
  services: ServiceId[];
  dateIso: string | null;
  time: string | null;
  name: string;
  phone: string;
  notes: string;
  confirmed: ConfirmedBooking | null;

  chooseCondition: (c: ToothCondition) => void;
  toggleService: (id: ServiceId) => void;
  setDate: (iso: string) => void;
  setTime: (time: string) => void;
  setContact: (patch: { name?: string; phone?: string; notes?: string }) => void;
  goToStep: (step: WizardStep) => void;
  next: () => void;
  back: () => void;
  confirm: () => void;
  reset: () => void;
};

const order: WizardStep[] = ["condition", "services", "datetime", "contact", "success"];

/** Step-order guard shared by next() and goToStep(). */
function canEnter(step: WizardStep, s: BookingState): boolean {
  switch (step) {
    case "condition":
      return true;
    case "services":
      return s.condition !== null;
    case "datetime":
      return s.condition !== null && s.services.length > 0;
    case "contact":
      return s.condition !== null && s.services.length > 0 && !!s.dateIso && !!s.time;
    case "success":
      return s.confirmed !== null;
  }
}

export const useBookingStore = create<BookingState>()((set, get) => ({
  step: "condition",
  direction: 1,
  condition: null,
  services: [],
  dateIso: null,
  time: null,
  name: "",
  phone: "",
  notes: "",
  confirmed: null,

  chooseCondition: (c) =>
    set((s) => ({
      condition: c,
      step: "services",
      direction: 1,
      // a fresh condition starts a clean service selection
      services: s.condition === c ? s.services : [],
      dateIso: s.condition === c ? s.dateIso : null,
      time: s.condition === c ? s.time : null,
    })),

  toggleService: (id) =>
    set((s) => ({
      services: s.services.includes(id)
        ? s.services.filter((x) => x !== id)
        : [...s.services, id],
    })),

  setDate: (iso) => set({ dateIso: iso, time: null }),
  setTime: (time) => set({ time }),

  setContact: (patch) => set(patch),

  goToStep: (step) =>
    set((s) => {
      if (!canEnter(step, s)) return {};
      const from = order.indexOf(s.step);
      const to = order.indexOf(step);
      if (from === -1 || to === -1) return {};
      return { step, direction: to > from ? 1 : -1 };
    }),

  next: () => {
    const s = get();
    const i = order.indexOf(s.step);
    const target = order[Math.min(i + 1, order.length - 1)];
    if (!canEnter(target, s)) return;
    set({ step: target, direction: 1 });
  },

  back: () => {
    const s = get();
    if (s.step === "success") return;
    const i = order.indexOf(s.step);
    if (i <= 0) return;
    set({ step: order[i - 1], direction: -1 });
  },

  confirm: () => {
    const s = get();
    if (s.step !== "contact") return;
    if (!s.condition || !s.dateIso || !s.time || !s.services.length) return;
    if (s.name.trim().length < 2 || !isValidMobile(s.phone)) return;

    set({
      direction: 1,
      step: "success",
      confirmed: {
        trackingId: makeTrackingId(),
        conditionLabel: conditionLabel[s.condition],
        serviceTitles: s.services.map(serviceTitleById),
        dateLabel: fullDateLabel(s.dateIso),
        time: s.time,
        name: s.name.trim(),
        phone: s.phone.trim(),
      },
    });
  },

  reset: () =>
    set({
      step: "condition",
      direction: 1,
      condition: null,
      services: [],
      dateIso: null,
      time: null,
      name: "",
      phone: "",
      notes: "",
      confirmed: null,
    }),
}));
