import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  async function visitHomePage() {
    await page.goto("https://www.carvertical.com/");
  }

  async function acceptCookies() {
    await page.getByRole("button", { name: "Accept all" }).click();
  }

  async function stayInUS() {
    await page.getByRole("button", { name: "Stay in US" }).click();
  }

  async function enterVIN() {
    await page
      .locator("section")
      .filter({ hasText: "Learn the story of your" })
      .getByLabel("Enter VIN numberEnter VIN")
      .click();
    await page
      .locator("section")
      .filter({ hasText: "Learn the story of your" })
      .getByLabel("Enter VIN numberEnter VIN")
      .fill("SALLAAA146A396339");

      await page.getByRole("button", { name: "Get report" }).first().click();
  }

  async function selectReason() {
    await page.getByText("Buying a car").click();
    await page.getByRole("button", { name: "Continue" }).click();
  }

  async function selectReportPackage() {
    await page.locator('div').filter({ hasText: /^Check 3 cars-47%\$15\.99\/ reportYou pay \$47\.97\$89\.97$/ }).nth(2).click();
  }

  async function getReport() {
    await page.getByRole('link', { name: 'Get report' }).click();
    await page.getByRole("link", { name: "Stay in US" }).click();
  }

  async function login() {
    await page.getByLabel("Your email").click();
    await page.getByLabel("Your email").fill("alansulsk@gmail.com");
    await page
      .locator("label")
      .filter({ hasText: "I agree to the terms and" })
      .click();
    await page.getByRole("button", { name: "Continue" }).click();
    await page.getByLabel("Your password").click();
    await page.getByLabel("Your password").fill("Testuoju123");
    await page.getByRole("button", { name: "Log In", exact: true }).click();
  }

  await visitHomePage();

  await acceptCookies();

  await stayInUS();

  await enterVIN();

  await selectReason();

  await selectReportPackage();

  await getReport();

  await login();

  async function getPrice() {
    const priceElement = await page.getByTestId("Checkout-TotalAmount");
    const initialPrice = await priceElement.textContent();

    if (!initialPrice) {
      return 0;
    }

    return parseFloat(initialPrice.replace("$", "").trim());
  }

  const priceBeforeVoucher = await getPrice();

  async function applyVoucher() {
    await page.getByRole("button", { name: "Add" }).click();
    await page.getByPlaceholder("Voucher code").click();
    await page.getByPlaceholder("Voucher code").fill("qahomework");
    await page.getByRole("button", { name: "Apply" }).click();
  }

  await applyVoucher();

  async function validateDiscountPercentage() {
    const discountValueElement = await page.getByTestId(
      "Checkout-VoucherRemoveButton"
    );
    const discount = await discountValueElement.textContent();
    const discountPercentage = discount
      ? parseFloat(discount.replace("%", "").trim()) / -100
      : 0;

    const priceAfterVoucher = await getPrice();

    const expectedPriceAfterVoucher = (
      priceBeforeVoucher *
      (1 - discountPercentage)
    ).toFixed(2);

    expect(priceAfterVoucher.toFixed(2)).toBe(expectedPriceAfterVoucher);
  }
  
  await validateDiscountPercentage();
});
