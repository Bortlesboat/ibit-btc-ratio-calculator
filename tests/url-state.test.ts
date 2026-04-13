import { describe, expect, it } from "vitest";

import { parseShareableState, toShareableSearch } from "../src/lib/url-state";

describe("shareable URL state", () => {
  it("reads btc and shares presets from the query string", () => {
    expect(parseShareableState("?btc=85000&shares=125.5")).toEqual({
      btcPrice: 85000,
      sharesOwned: 125.5,
    });
  });

  it("drops invalid values when serializing a shareable URL", () => {
    expect(
      toShareableSearch({
        btcPrice: Number.NaN,
        sharesOwned: -3,
      }),
    ).toBe("");

    expect(
      toShareableSearch({
        btcPrice: 85000,
        sharesOwned: 100,
      }),
    ).toBe("?btc=85000&shares=100");
  });
});
