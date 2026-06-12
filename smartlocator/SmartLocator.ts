import * as fs from "fs";
import { Page, expect } from "@playwright/test";
import { SelfHeal } from "./SelfHeal";

export class SmartLocator {

    static getLocator(key: string) {

        const repository = JSON.parse(
            fs.readFileSync(
                "smartlocator/locatorRepository.json",
                "utf8"
            )
        );

        return repository[key];
    }

    static async isVisible(
        page: Page,
        key: string
    ) {

        let element = this.getLocator(key);

        console.log("");
        console.log("================================");
        console.log("SMART LOCATOR");
        console.log("================================");
        console.log("Searching for : " + key);
        console.log("");
        console.log("Repository Locator:");
        console.log(element);
        console.log("");

        try {

            await expect(

                page.getByRole(
                    element.type,
                    {
                        name: element.locator
                    }
                )

            ).toBeVisible({
                timeout: 3000
            });

            console.log("✅ Locator Found");
            console.log("");

        }

        catch {

            console.log("❌ Locator Failed");
            console.log("");

            console.log("================================");
            console.log("SMART LOCATOR ENGINE STARTED");
            console.log("================================");

            SelfHeal.heal(key);

            console.log("");
            console.log("Reading Updated Repository...");
            console.log("");

            element = this.getLocator(key);

            console.log("New Locator:");
            console.log(element);

            await expect(

                page.getByRole(
                    element.type,
                    {
                        name: element.locator
                    }
                )

            ).toBeVisible({
                timeout: 5000
            });

            console.log("");
            console.log("✅ SELF HEAL SUCCESSFUL");
            console.log("");

        }

    }

}