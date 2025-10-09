import { describe, expect, it } from "vitest";

import { dateUtils } from "../design-system-utils";

describe("Design System Utils", () => {
  describe("dateUtils", () => {
    const testDate = new Date("2023-12-25T10:30:00");

    describe("format", () => {
      it("formats date with default locale", () => {
        const formatted = dateUtils.format(testDate);
        expect(formatted).toBe("25/12/2023");
      });

      it("formats date string", () => {
        const formatted = dateUtils.format("2023-12-25T10:30:00");
        expect(formatted).toBe("25/12/2023");
      });

      it("formats date with custom locale", () => {
        const formatted = dateUtils.format(testDate, "en-US");
        expect(formatted).toBe("12/25/2023");
      });
    });

    describe("formatWithTime", () => {
      it("formats date with time using default locale", () => {
        const formatted = dateUtils.formatWithTime(testDate);
        expect(formatted).toBe("25/12/2023, 10:30");
      });

      it("formats date string with time", () => {
        const formatted = dateUtils.formatWithTime("2023-12-25T10:30:00");
        expect(formatted).toBe("25/12/2023, 10:30");
      });
    });

    describe("isValid", () => {
      it("validates valid dates", () => {
        expect(dateUtils.isValid(testDate)).toBe(true);
        expect(dateUtils.isValid("2023-12-25")).toBe(true);
        expect(dateUtils.isValid("2023-12-25T10:30:00")).toBe(true);
      });

      it("invalidates invalid dates", () => {
        expect(dateUtils.isValid("invalid-date")).toBe(false);
        expect(dateUtils.isValid("2023-13-45")).toBe(false);
        expect(dateUtils.isValid(new Date("invalid"))).toBe(false);
      });
    });
  });
});
