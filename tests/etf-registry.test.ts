import { describe, expect, it } from "vitest";

import { getDefaultEtfKey, getEtfDefinition, getSupportedEtfKeys } from "../src/lib/etf-registry";

describe("ETF registry", () => {
  it("returns the default IBIT definition when no key is provided", () => {
    const definition = getEtfDefinition();

    expect(getDefaultEtfKey()).toBe("ibit");
    expect(definition.key).toBe("ibit");
    expect(definition.ticker).toBe("IBIT");
    expect(definition.snapshot.ticker).toBe("IBIT");
  });

  it("falls back to the default ETF when an unsupported key is requested", () => {
    const definition = getEtfDefinition("fbtc");

    expect(definition.key).toBe("ibit");
    expect(getSupportedEtfKeys()).toEqual(["ibit"]);
  });

  it("stores ETF-specific UI metadata and the live snapshot endpoint with the definition", () => {
    const definition = getEtfDefinition("ibit");

    expect(definition.eyebrow).toBe("Weekend estimator for IBIT holders");
    expect(definition.shareLabel).toBe("IBIT shares");
    expect(definition.officialSourceName).toBe("iShares");
    expect(definition.snapshotApiPath).toBe("/api/v1/tools/ibit-snapshot");
  });
});
