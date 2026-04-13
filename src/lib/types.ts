export type SupportedEtfKey = "ibit";

export interface EtfSnapshot {
  ticker: string;
  date: string;
  nav: number;
  close: number;
  benchmark: number;
  premiumDiscountPct: number;
  sponsorFeePct: number;
  sharesOutstanding: number;
  basketBitcoinAmount: number;
  sourceUrl: string;
}

export interface EtfDefinition {
  key: SupportedEtfKey;
  ticker: string;
  eyebrow: string;
  shareLabel: string;
  officialSourceName: string;
  officialSourceLinkLabel: string;
  snapshotApiPath: string;
  snapshot: EtfSnapshot;
}

export interface EstimateInput {
  btcNow: number;
  sharesOwned: number;
  snapshot: EtfSnapshot;
}

export interface EstimateResult {
  btcPerIbit: number;
  ibitPerBtc: number;
  estimatedNavNow: number;
  estimatedIbitNow: number;
  estimatedPositionValue: number;
  estimatedBtcExposure: number;
}
