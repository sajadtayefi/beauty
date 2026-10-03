import { beforeEach, describe, expect, it } from "vitest";
import {
  conditionOptions,
  getSlotsForDate,
  isValidMobile,
  normalizeDigits,
  serviceTitleById,
  wizardSteps,
  type ServiceId,
} from "@/lib/booking";
import { useBookingStore } from "@/store/booking-store";

const st = () => useBookingStore.getState();

beforeEach(() => {
  st().reset();
});

function fillToDateStep() {
  st().chooseCondition("restored");
  st().toggleService("restoration");
  st().toggleService("consult");
  st().next(); // → datetime
  st().setDate("2026-10-10");
  st().setTime("10:00");
}

describe("wizard structure", () => {
  it("has exactly the four spec steps in order", () => {
    expect(wizardSteps.map((s) => s.id)).toEqual([
      "condition",
      "services",
      "datetime",
      "contact",
    ]);
    expect(conditionOptions.map((c) => c.title)).toEqual([
      "طبیعی",
      "ترمیم",
      "کاشت",
      "نمی‌دانم",
    ]);
  });
});

describe("step guards", () => {
  it("cannot skip ahead without completing the previous step", () => {
    st().goToStep("datetime");
    expect(st().step).toBe("condition"); // no condition chosen yet

    st().chooseCondition("natural");
    expect(st().step).toBe("services");

    st().next(); // services empty → next() is guarded, stays put
    expect(st().step).toBe("services");
  });

  it("requires a date AND time before the contact step", () => {
    st().chooseCondition("implant");
    st().toggleService("implant");
    st().next();
    st().setDate("2026-10-10");
    st().next(); // no time yet
    expect(st().step).toBe("datetime");
    st().setTime("16:00");
    st().next();
    expect(st().step).toBe("contact");
  });
});

describe("selection behavior", () => {
  it("supports multi-select services with toggle off", () => {
    st().chooseCondition("natural");
    st().toggleService("smile_design");
    st().toggleService("consult");
    expect(st().services).toEqual(["smile_design", "consult"]);
    st().toggleService("smile_design");
    expect(st().services).toEqual(["consult"]);
    expect(serviceTitleById("consult")).toBe("مشاوره");
  });

  it("changing the condition starts a clean service selection", () => {
    st().chooseCondition("natural");
    st().toggleService("smile_design");
    st().goToStep("condition");
    st().chooseCondition("restored");
    expect(st().services).toEqual([]);
  });

  it("changing the date clears the previously picked time", () => {
    st().setDate("2026-10-10");
    st().setTime("09:00");
    st().setDate("2026-10-11");
    expect(st().time).toBeNull();
  });
});

describe("navigation", () => {
  it("goToStep allows jumping back to completed steps", () => {
    fillToDateStep();
    st().next(); // → contact
    expect(st().step).toBe("contact");
    st().goToStep("services");
    expect(st().step).toBe("services");
    // selections preserved when navigating back
    expect(st().services).toEqual(["restoration", "consult"]);
    expect(st().dateIso).toBe("2026-10-10");
  });

  it("back() walks the order and never leaves step 1", () => {
    st().back();
    expect(st().step).toBe("condition");
    fillToDateStep();
    st().next();
    st().back();
    expect(st().step).toBe("datetime");
  });

  it("back() is a no-op on success", () => {
    fillToDateStep();
    st().next();
    st().setContact({ name: "سارا محمدی", phone: "09123456789" });
    st().confirm();
    expect(st().step).toBe("success");
    st().back();
    expect(st().step).toBe("success");
  });
});

describe("confirmation & success", () => {
  it("rejects invalid contact data", () => {
    fillToDateStep();
    st().next();
    st().setContact({ name: "س", phone: "12345" });
    st().confirm();
    expect(st().step).toBe("contact");
    expect(st().confirmed).toBeNull();
  });

  it("creates a confirmed booking with a tracking ID and Persian labels", () => {
    fillToDateStep();
    st().next();
    st().setContact({ name: "سارا محمدی", phone: "09123456789", notes: "درد دارم" });
    st().confirm();

    expect(st().step).toBe("success");
    const c = st().confirmed;
    expect(c?.trackingId).toMatch(/^BBL-\d{5}$/);
    expect(c?.conditionLabel).toBe("ترمیم");
    expect(c?.serviceTitles).toEqual(["ترمیم", "مشاوره"]);
    expect(c?.dateLabel).toBeTruthy();
    expect(c?.name).toBe("سارا محمدی");
  });

  it("reset() returns to a clean wizard", () => {
    fillToDateStep();
    st().next();
    st().confirm();
    st().reset();
    expect(st().step).toBe("condition");
    expect(st().confirmed).toBeNull();
    expect(st().services).toEqual([]);
  });
});

describe("slots & validation helpers", () => {
  it("slots are stable per date and contain taken ones", () => {
    const a = getSlotsForDate("2026-10-10");
    const b = getSlotsForDate("2026-10-10");
    expect(a).toEqual(b);
    expect(a.some((s) => s.taken)).toBe(true);
    expect(a.every((s) => s.time !== "")).toBe(true);
  });

  it("accepts mobile numbers in both digit sets", () => {
    expect(isValidMobile("09123456789")).toBe(true);
    expect(isValidMobile("۰۹۱۲۳۴۵۶۷۸۹")).toBe(true);
    expect(normalizeDigits("۱۲۳")).toBe("123");
    expect(isValidMobile("0912345678")).toBe(false);
  });

  it("service list matches the spec", () => {
    const ids: ServiceId[] = ["consult", "smile_design", "restoration", "implant", "other"];
    ids.forEach((id) => expect(serviceTitleById(id)).toBeTruthy());
  });
});
