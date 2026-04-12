import snapshot from "./data/ibit-latest.json";
import { computeEstimate } from "./lib/calc";
import { formatUsd } from "./lib/format";
import type { IbitSnapshot } from "./lib/types";
import { fetchLiveBitcoinPrice } from "./lib/live-price";
import { renderEstimateCards, renderSourceCard } from "./lib/render";

const root = document.querySelector<HTMLDivElement>("#app");

if (!root) {
  throw new Error("App root not found");
}

const ibitSnapshot = snapshot as IbitSnapshot;
const defaultBtcPrice = ibitSnapshot.benchmark;

root.innerHTML = `
  <main class="page-shell">
    <section class="hero">
      <p class="eyebrow">Weekend estimator for IBIT holders</p>
      <h1>What Is IBIT Worth Right Now?</h1>
      <p class="subtitle">
        Estimate <code>IBIT</code> from live Bitcoin price when the market is closed, then translate your shares into current BTC exposure.
      </p>
    </section>

    <section class="calculator-card">
      <div class="calculator-grid">
        <label class="input-card">
          <span class="input-label">Bitcoin price now</span>
          <input id="btc-price" aria-label="Bitcoin price now" inputmode="decimal" />
        </label>
        <label class="input-card">
          <span class="input-label">IBIT shares</span>
          <input id="ibit-shares" aria-label="IBIT shares" inputmode="decimal" value="0" />
        </label>
      </div>

      <p id="live-price-status" class="status-text">Loading live BTC price...</p>

      <div class="result-grid">
        <article class="result-card result-card-primary">
          <span class="result-label">Estimated IBIT price now</span>
          <strong data-testid="estimated-ibit-price" id="estimated-ibit-price">--</strong>
        </article>
        <article class="result-card">
          <span class="result-label">Estimated position value</span>
          <strong data-testid="estimated-position-value" id="estimated-position-value">--</strong>
        </article>
        <article class="result-card">
          <span class="result-label">BTC exposure</span>
          <strong data-testid="btc-exposure" id="btc-exposure">--</strong>
        </article>
        <article class="result-card">
          <span class="result-label">Ratio now</span>
          <strong data-testid="ratio-card" id="ratio-card">--</strong>
        </article>
      </div>
    </section>

    <section class="explain-grid">
      <article class="story-card">
        <h2>How we calculate this</h2>
        <p>
          We anchor the estimate to the last official <code>IBIT</code> trading snapshot and scale it by the current Bitcoin price.
        </p>
        <ul class="formula-list">
          <li><code>btc_per_ibit = nav / benchmark</code></li>
          <li><code>estimated_ibit_now = close * (btc_now / benchmark)</code></li>
          <li><code>btc_exposure = shares * btc_per_ibit</code></li>
        </ul>
      </article>
      <article class="story-card" id="source-card"></article>
    </section>

    <section class="faq-card">
      <h2>Important caveat</h2>
      <p>
        This is an informational estimate, not an exact Monday-open prediction. <code>IBIT</code> can open above or below this number because ETF premiums, discounts, and broader market sentiment can move independently from weekend Bitcoin trading.
      </p>
      <p class="footnote">
        Not affiliated with BlackRock. Always verify with the official fund page before making a trading decision.
      </p>
    </section>
  </main>
`;

const btcPriceInput = document.querySelector<HTMLInputElement>("#btc-price");
const sharesInput = document.querySelector<HTMLInputElement>("#ibit-shares");
const livePriceStatus = document.querySelector<HTMLParagraphElement>("#live-price-status");
const sourceCard = document.querySelector<HTMLDivElement>("#source-card");

if (!btcPriceInput || !sharesInput || !livePriceStatus || !sourceCard) {
  throw new Error("Required calculator elements are missing");
}

btcPriceInput.value = defaultBtcPrice.toString();
renderSourceCard(sourceCard, ibitSnapshot);

function parseNumber(value: string): number {
  const normalized = value.replace(/,/g, "").trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function updateEstimate(): void {
  const btcNow = parseNumber(btcPriceInput.value);
  const sharesOwned = parseNumber(sharesInput.value);
  const estimate = computeEstimate({
    btcNow: btcNow || ibitSnapshot.benchmark,
    sharesOwned,
    snapshot: ibitSnapshot,
  });

  renderEstimateCards({
    estimatedIbitPrice: formatUsd(estimate.estimatedIbitNow),
    estimatedPositionValue: formatUsd(estimate.estimatedPositionValue),
    estimatedBtcExposure: `${estimate.estimatedBtcExposure.toFixed(6)} BTC`,
    ratioText: `1 IBIT = ${estimate.btcPerIbit.toFixed(9)} BTC`,
  });
}

btcPriceInput.addEventListener("input", () => {
  livePriceStatus.textContent = "Using manual BTC price input.";
  updateEstimate();
});

sharesInput.addEventListener("input", updateEstimate);

void fetchLiveBitcoinPrice()
  .then((btcPrice) => {
    btcPriceInput.value = btcPrice.toFixed(2);
    livePriceStatus.textContent = `Live BTC price loaded from /api/v1/prices: ${formatUsd(btcPrice)}`;
    updateEstimate();
  })
  .catch(() => {
    livePriceStatus.textContent = `Live BTC price unavailable. Using the last official benchmark anchor of ${formatUsd(defaultBtcPrice)} until you type a manual value.`;
    updateEstimate();
  });
