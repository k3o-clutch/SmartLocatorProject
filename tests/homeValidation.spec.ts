import { test } from "@playwright/test";
import { SmartLocator } from "../smartlocator/SmartLocator";

test("TC001 - Verify Home Tab", async ({ page }) => {

    await page.goto("https://moviesandtv.myvi.in/");

    await page.waitForLoadState("networkidle");

    await SmartLocator.isVisible(
        page,
        "Home"
    );

});