interface EstimateCardValues {
  estimatedIbitPrice: string;
  estimatedPositionValue: string;
  estimatedBtcExposure: string;
  ratioText: string;
}

export function renderEstimateCards(values: EstimateCardValues): void {
  const estimatedIbitPrice = document.querySelector<HTMLElement>("#estimated-ibit-price");
  const estimatedPositionValue = document.querySelector<HTMLElement>("#estimated-position-value");
  const estimatedBtcExposure = document.querySelector<HTMLElement>("#btc-exposure");
  const ratioCard = document.querySelector<HTMLElement>("#ratio-card");

  if (!estimatedIbitPrice || !estimatedPositionValue || !estimatedBtcExposure || !ratioCard) {
    throw new Error("Result targets not found");
  }

  estimatedIbitPrice.textContent = values.estimatedIbitPrice;
  estimatedPositionValue.textContent = values.estimatedPositionValue;
  estimatedBtcExposure.textContent = values.estimatedBtcExposure;
  ratioCard.textContent = values.ratioText;
}

export function renderSourceCard(
  target: HTMLElement,
  snapshot: {
    date: string;
    nav: number;
    close: number;
    benchmark: number;
    premiumDiscountPct: number;
    sponsorFeePct: number;
    sourceUrl: string;
  },
): void {
  target.innerHTML = `
    <h2>Official snapshot anchor</h2>
    <p>These are the last official fields used to anchor the estimate.</p>
    <div class="source-list">
      <div class="source-row"><span>Snapshot date</span><strong>${snapshot.date}</strong></div>
      <div class="source-row"><span>NAV</span><strong>${snapshot.nav.toFixed(2)}</strong></div>
      <div class="source-row"><span>Closing price</span><strong>${snapshot.close.toFixed(2)}</strong></div>
      <div class="source-row"><span>Benchmark</span><strong>${snapshot.benchmark.toFixed(2)}</strong></div>
      <div class="source-row"><span>Premium/discount</span><strong>${snapshot.premiumDiscountPct.toFixed(2)}%</strong></div>
      <div class="source-row"><span>Sponsor fee</span><strong>${snapshot.sponsorFeePct.toFixed(2)}%</strong></div>
    </div>
    <p><a href="${snapshot.sourceUrl}" target="_blank" rel="noreferrer">View official iShares source</a></p>
  `;
}
