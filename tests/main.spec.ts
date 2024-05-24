import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  async function visitHomePage() {
    await page.goto("https://www.carvertical.com/");
  }

  async function acceptCookies() {
    page.getByRole("button", { name: "Accept all" }).click();
    await page.getByRole("button", { name: "Close" }).click();
  }

  visitHomePage();

  acceptCookies();
});
