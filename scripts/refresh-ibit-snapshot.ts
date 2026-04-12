import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import * as cheerio from "cheerio";

import type { IbitSnapshot } from "../src/lib/types";

const SOURCE_URL = "https://www.ishares.com/us/products/333011/ishares-bitcoin-trust-etf";

function normalizeText(html: string): string {
  const $ = cheerio.load(html);
  return $.text().replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function extractNumber(text: string, pattern: RegExp, label: string): number {
  const match = text.match(pattern);
  if (!match) {
    throw new Error(`Could not parse ${label}`);
  }

  return Number.parseFloat(match[1].replace(/,/g, ""));
}

function parseAsOfDate(raw: string): string {
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? raw : parsed.toISOString().slice(0, 10);
}

export function parseIbitSnapshot(html: string): IbitSnapshot {
  const text = normalizeText(html);

  const navDateMatch = text.match(/NAV as of ([A-Za-z]{3} \d{1,2}, \d{4}) \$[\d.,]+/);
  const navMatch = text.match(/NAV as of [A-Za-z]{3} \d{1,2}, \d{4} \$([\d.,]+)/);
  const close = extractNumber(text, /Closing Price as of [A-Za-z]{3} \d{1,2}, \d{4} ([\d.,]+)/, "closing price");
  const benchmark = extractNumber(text, /Benchmark Level as of [A-Za-z]{3} \d{1,2}, \d{4} USD ([\d.,]+)/, "benchmark level");
  const premiumDiscountPct = extractNumber(text, /Premium\/Discount as of [A-Za-z]{3} \d{1,2}, \d{4} ([\d.,]+)/, "premium discount");
  const sponsorFeePct = extractNumber(text, /Sponsor Fee: ([\d.]+)%/, "sponsor fee");
  const sharesOutstanding = extractNumber(text, /Shares Outstanding as of [A-Za-z]{3} \d{1,2}, \d{4} ([\d,]+)/, "shares outstanding");
  const basketBitcoinAmount = extractNumber(text, /Basket Bitcoin Amount as of [A-Za-z]{3} \d{1,2}, \d{4} ([\d.]+)/, "basket bitcoin amount");

  if (!navDateMatch || !navMatch) {
    throw new Error("Could not parse NAV fields");
  }

  return {
    ticker: "IBIT",
    date: parseAsOfDate(navDateMatch[1]),
    nav: Number.parseFloat(navMatch[1].replace(/,/g, "")),
    close,
    benchmark,
    premiumDiscountPct,
    sponsorFeePct,
    sharesOutstanding,
    basketBitcoinAmount,
    sourceUrl: SOURCE_URL,
  };
}

async function refreshSnapshot(): Promise<void> {
  const response = await fetch(SOURCE_URL, {
    headers: {
      "User-Agent": "ibit-weekend-calculator/1.0",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch iShares page: ${response.status}`);
  }

  const html = await response.text();
  const snapshot = parseIbitSnapshot(html);
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const outputPath = resolve(__dirname, "../src/data/ibit-latest.json");
  writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outputPath}`);
}

const isDirectExecution =
  typeof process.argv[1] === "string" &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  refreshSnapshot().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(message);
    process.exitCode = 1;
  });
}
