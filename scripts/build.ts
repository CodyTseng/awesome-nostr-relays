import * as fs from "fs";
import * as path from "path";
import { validate } from "./validate";

async function saveJsonFile(filePath: string, data: any): Promise<void> {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
  console.log(`✅ Generated: ${filePath}`);
}

async function generateDataMarkdown(
  collectionData: any,
  timestamp: number
): Promise<void> {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toISOString().split("T")[0];
  const formattedTime = date.toISOString().split("T")[1].slice(0, 8);

  let markdown = `# Awesome Nostr Relays

*Last updated: ${formattedDate} ${formattedTime} UTC*

`;

  // Generate collections section
  collectionData.collections.forEach((collection: any) => {
    markdown += `## ${collection.name}\n\n`;
    markdown += `${collection.description}\n\n`;

    collection.relays.forEach((relay: string) => {
      markdown += `- [${relay}](https://jumble.social/?r=${relay})\n`;
    });

    markdown += `\n`;
  });

  const filePath = "./AWESOME_RELAYS.md";
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, markdown);
  console.log(`✅ Generated: ${filePath}`);
}

async function build(): Promise<void> {
  const { collectionData, relayUrlSet } = await validate();

  console.log("🚀 Building Nostr relay database...\n");

  // Generate output files
  const timestamp = Math.floor(Date.now() / 1000);

  // All relays
  await saveJsonFile("./dist/relays.json", {
    relays: Array.from(relayUrlSet).sort(),
    last_updated: timestamp,
  });

  // Collections
  await saveJsonFile("./dist/collections.json", {
    collections: collectionData.collections,
    last_updated: timestamp,
  });

  // Generate data markdown
  await generateDataMarkdown(collectionData, timestamp);

  // Generate statistics
  console.log("\n📊 Statistics:");
  console.log(`   Relays: ${relayUrlSet.size}`);
  console.log(`   Collections: ${collectionData.collections.length}`);
  console.log(`   Generated: ${timestamp}`);

  console.log("\n🎉 Build completed successfully!");
}

build().catch((error) => {
  console.error("❌ Build failed:", error);
  process.exit(1);
});
