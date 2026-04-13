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
