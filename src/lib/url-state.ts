function parseOptionalNumber(
  rawValue: string | null,
  options: {
    allowZero: boolean;
  },
): number | null {
  if (rawValue === null) {
    return null;
  }

  const parsed = Number.parseFloat(rawValue);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  if (options.allowZero) {
    return parsed >= 0 ? parsed : null;
  }

  return parsed > 0 ? parsed : null;
}

export function parseShareableState(search: string): {
  btcPrice: number | null;
  sharesOwned: number | null;
} {
  const params = new URLSearchParams(search);

  return {
    btcPrice: parseOptionalNumber(params.get("btc"), { allowZero: false }),
    sharesOwned: parseOptionalNumber(params.get("shares"), { allowZero: true }),
  };
}

export function toShareableSearch(state: {
  btcPrice: number | null;
  sharesOwned: number | null;
}): string {
  const params = new URLSearchParams();

  if (typeof state.btcPrice === "number" && Number.isFinite(state.btcPrice) && state.btcPrice > 0) {
    params.set("btc", `${state.btcPrice}`);
  }

  if (
    typeof state.sharesOwned === "number" &&
    Number.isFinite(state.sharesOwned) &&
    state.sharesOwned >= 0
  ) {
    params.set("shares", `${state.sharesOwned}`);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
