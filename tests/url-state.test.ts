import { describe, expect, it } from "vitest";

import { parseShareableState, toShareableSearch } from "../src/lib/url-state";

describe("shareable URL state", () => {
  it("reads btc and shares presets from the query string", () => {
    expect(parseShareableState("?etf=ibit&btc=85000&shares=125.5")).toEqual({
      etfKey: "ibit",
      btcPrice: 85000,
      sharesOwned: 125.5,
    });
  });

  it("drops invalid values when serializing a shareable URL", () => {
    expect(
      toShareableSearch({
        etfKey: null,
        btcPrice: Number.NaN,
        sharesOwned: -3,
      }),
    ).toBe("");

    expect(
      toShareableSearch({
        etfKey: "fbtc",
        btcPrice: 85000,
        sharesOwned: 100,
      }, {
        defaultEtfKey: "ibit",
      }),
    ).toBe("?etf=fbtc&btc=85000&shares=100");
  });
});
