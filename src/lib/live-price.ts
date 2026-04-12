interface PriceEnvelope {
  data?: {
    USD?: number;
  };
}

export async function fetchLiveBitcoinPrice(): Promise<number> {
  const response = await fetch("/api/v1/prices");

  if (!response.ok) {
    throw new Error(`Price request failed with ${response.status}`);
  }

  const body = (await response.json()) as PriceEnvelope;
  const usdPrice = body.data?.USD;

  if (typeof usdPrice !== "number" || Number.isNaN(usdPrice)) {
    throw new Error("BTC USD price missing from response");
  }

  return usdPrice;
}
