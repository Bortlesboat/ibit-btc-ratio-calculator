import { expect, test } from "@playwright/test";

test("renders estimate cards and supports manual BTC input", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("What Is IBIT Worth Right Now?")).toBeVisible();
  await page.getByLabel("Bitcoin price now").fill("74000");
  await page.getByLabel("IBIT shares").fill("100");

  await expect(page.getByTestId("estimated-ibit-price")).not.toHaveText("--");
  await expect(page.getByTestId("btc-exposure")).not.toHaveText("--");
});
