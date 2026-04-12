import { describe, expect, it } from "vitest";

import { computeEstimate } from "../src/lib/calc";

describe("computeEstimate", () => {
  it("computes ratio, estimate, and btc exposure from the approved formula", () => {
    const result = computeEstimate({
      btcNow: 73500.75,
      sharesOwned: 5200,
      snapshot: {
        date: "2026-04-10",
        nav: 41.44,
        close: 41.56,
        benchmark: 73109.73,
        premiumDiscountPct: 0.3,
        sponsorFeePct: 0.25,
      },
    });

    expect(result.btcPerIbit).toBeCloseTo(0.000566819, 9);
    expect(result.estimatedIbitNow).toBeCloseTo(41.78, 2);
    expect(result.estimatedBtcExposure).toBeCloseTo(2.94746, 5);
  });
});
