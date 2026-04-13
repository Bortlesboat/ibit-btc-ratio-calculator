import ibitSnapshot from "../data/ibit-latest.json";

import type { EtfDefinition, EtfSnapshot, SupportedEtfKey } from "./types";

const DEFAULT_ETF_KEY: SupportedEtfKey = "ibit";

const ETF_DEFINITIONS: Record<SupportedEtfKey, EtfDefinition> = {
  ibit: {
    key: "ibit",
    ticker: "IBIT",
    eyebrow: "Weekend estimator for IBIT holders",
    shareLabel: "IBIT shares",
    officialSourceName: "iShares",
    officialSourceLinkLabel: "View official iShares source",
    snapshotApiPath: "/api/v1/tools/ibit-snapshot",
    snapshot: ibitSnapshot as EtfSnapshot,
  },
};

function isSupportedEtfKey(value: string): value is SupportedEtfKey {
  return Object.prototype.hasOwnProperty.call(ETF_DEFINITIONS, value);
}

export function getDefaultEtfKey(): SupportedEtfKey {
  return DEFAULT_ETF_KEY;
}

export function getSupportedEtfKeys(): SupportedEtfKey[] {
  return Object.keys(ETF_DEFINITIONS) as SupportedEtfKey[];
}

export function getEtfDefinition(key?: string | null): EtfDefinition {
  if (typeof key === "string") {
    const normalizedKey = key.trim().toLowerCase();
    if (isSupportedEtfKey(normalizedKey)) {
      return ETF_DEFINITIONS[normalizedKey];
    }
  }

  return ETF_DEFINITIONS[DEFAULT_ETF_KEY];
}
