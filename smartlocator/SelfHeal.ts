import * as fs from "fs";

export class SelfHeal {

    static heal(key: string) {

        const repository = JSON.parse(

            fs.readFileSync(
                "smartlocator/locatorRepository.json",
                "utf8"
            )

        );

        console.log("Searching Similar Locator...");
        console.log("");

        // Demo Logic
        // Later we'll replace this with our comparison engine

        repository[key].locator = "Home";

        fs.writeFileSync(

            "smartlocator/locatorRepository.json",

            JSON.stringify(repository, null, 4)

        );

        console.log("Best Match Found");
        console.log("");
        console.log("Updated Locator : Home");
        console.log("");

    }

}