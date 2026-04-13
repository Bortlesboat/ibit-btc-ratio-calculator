import { expect, test } from "@playwright/test";

test("renders estimate cards and supports manual BTC input", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("What Is IBIT Worth Right Now?")).toBeVisible();
  await page.getByLabel("Bitcoin price now").fill("74000");
  await page.getByLabel("IBIT shares").fill("100");

  await expect(page.getByTestId("estimated-ibit-price")).not.toHaveText("--");
  await expect(page.getByTestId("btc-exposure")).not.toHaveText("--");
});

test("hydrates from a shareable URL and preserves the shared BTC input", async ({ page }) => {
  await page.route("**/api/v1/prices", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          USD: 91000,
        },
      }),
    });
  });

  await page.goto("/?btc=85000&shares=100");

  await expect(page.getByLabel("Bitcoin price now")).toHaveValue("85000");
  await expect(page.getByLabel("IBIT shares")).toHaveValue("100");
  await expect(page.getByTestId("live-price-status")).toContainText("shared URL");
  await expect(page.getByTestId("ratio-card")).not.toHaveText("--");
});

test("shows the official ratio and holdings details in the snapshot card", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Shares outstanding")).toBeVisible();
  await expect(page.getByText("Basket Bitcoin amount")).toBeVisible();
  await expect(page.getByTestId("official-ratio")).toContainText("1 IBIT =");
});

test("prefers the live snapshot endpoint over the bundled snapshot when it is available", async ({ page }) => {
  await page.route("**/api/v1/tools/ibit-snapshot", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          ticker: "IBIT",
          date: "2026-04-11",
          nav: 42,
          close: 42.1,
          benchmark: 74000,
          premium_discount_pct: 0.4,
          sponsor_fee_pct: 0.25,
          shares_outstanding: 1393000000,
          basket_bitcoin_amount: 22.8,
          source_url: "https://www.ishares.com/us/products/333011/ishares-bitcoin-trust-etf",
        },
      }),
    });
  });

  await page.route("**/api/v1/prices", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: {
          USD: 74000,
        },
      }),
    });
  });

  await page.goto("/");

  await expect(page.locator("#source-card").getByText("2026-04-11").first()).toBeVisible();
  await expect(page.getByTestId("official-ratio")).toContainText("1 IBIT = 0.000567568 BTC");
});
