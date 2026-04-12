import type { EstimateInput, EstimateResult } from "./types";

export function computeEstimate({
  btcNow,
  sharesOwned,
  snapshot,
}: EstimateInput): EstimateResult {
  const btcPerIbit = snapshot.nav / snapshot.benchmark;
  const ibitPerBtc = 1 / btcPerIbit;
  const estimatedNavNow = btcNow * btcPerIbit;
  const estimatedIbitNow = snapshot.close * (btcNow / snapshot.benchmark);
  const estimatedPositionValue = estimatedIbitNow * sharesOwned;
  const estimatedBtcExposure = sharesOwned * btcPerIbit;

  return {
    btcPerIbit,
    ibitPerBtc,
    estimatedNavNow,
    estimatedIbitNow,
    estimatedPositionValue,
    estimatedBtcExposure,
  };
}
