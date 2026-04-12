export interface IbitSnapshot {
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

export interface EstimateInput {
  btcNow: number;
  sharesOwned: number;
  snapshot: IbitSnapshot;
}

export interface EstimateResult {
  btcPerIbit: number;
  ibitPerBtc: number;
  estimatedNavNow: number;
  estimatedIbitNow: number;
  estimatedPositionValue: number;
  estimatedBtcExposure: number;
}
