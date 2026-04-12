import { describe, expect, it } from "vitest";

import fixtureHtml from "./fixtures/ibit-ishares-page.html?raw";
import { parseIbitSnapshot } from "../scripts/refresh-ibit-snapshot";

describe("parseIbitSnapshot", () => {
  it("extracts normalized snapshot fields from the official iShares page fixture", () => {
    const snapshot = parseIbitSnapshot(fixtureHtml);

    expect(snapshot.ticker).toBe("IBIT");
    expect(snapshot.date).toBe("2026-04-10");
    expect(snapshot.nav).toBe(41.44);
    expect(snapshot.close).toBe(41.56);
    expect(snapshot.benchmark).toBe(73109.73);
    expect(snapshot.premiumDiscountPct).toBe(0.3);
    expect(snapshot.sponsorFeePct).toBe(0.25);
    expect(snapshot.sharesOutstanding).toBe(1391920000);
    expect(snapshot.basketBitcoinAmount).toBe(22.67);
    expect(snapshot.sourceUrl).toContain("ishares.com");
  });
});
