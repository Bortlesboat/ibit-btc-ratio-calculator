import type { EtfDefinition, EtfSnapshot } from "./types";

interface ApiSnapshotEnvelope {
  data?: ApiSnapshot;
}

interface ApiSnapshot {
  ticker?: string;
  date?: string;
  nav?: number;
  close?: number;
  benchmark?: number;
  premium_discount_pct?: number;
  sponsor_fee_pct?: number;
  shares_outstanding?: number;
  basket_bitcoin_amount?: number;
  source_url?: string;
}

function normalizeSnapshot(body: ApiSnapshot): EtfSnapshot {
  if (
    typeof body.ticker !== "string" ||
    typeof body.date !== "string" ||
    typeof body.nav !== "number" ||
    typeof body.close !== "number" ||
    typeof body.benchmark !== "number" ||
    typeof body.premium_discount_pct !== "number" ||
    typeof body.sponsor_fee_pct !== "number" ||
    typeof body.shares_outstanding !== "number" ||
    typeof body.basket_bitcoin_amount !== "number" ||
    typeof body.source_url !== "string"
  ) {
    throw new Error("Snapshot response missing required fields");
  }

  return {
    ticker: body.ticker,
    date: body.date,
    nav: body.nav,
    close: body.close,
    benchmark: body.benchmark,
    premiumDiscountPct: body.premium_discount_pct,
    sponsorFeePct: body.sponsor_fee_pct,
    sharesOutstanding: body.shares_outstanding,
    basketBitcoinAmount: body.basket_bitcoin_amount,
    sourceUrl: body.source_url,
  };
}

export async function fetchLiveEtfSnapshot(definition: EtfDefinition): Promise<EtfSnapshot> {
  const response = await fetch(definition.snapshotApiPath);

  if (!response.ok) {
    throw new Error(`Snapshot request failed with ${response.status}`);
  }

  const body = (await response.json()) as ApiSnapshotEnvelope;

  if (!body.data) {
    throw new Error("Snapshot response missing data");
  }

  return normalizeSnapshot(body.data);
}
