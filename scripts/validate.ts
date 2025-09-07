import * as fs from "fs";
import YAML from "yaml";
import { CollectionData } from "./types";

async function loadYamlFile<T>(filePath: string): Promise<T> {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return YAML.parse(content) as T;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    process.exit(1);
  }
}

async function validate(): Promise<{
  collectionData: CollectionData;
  collectionIdSet: Set<string>;
  relayUrlSet: Set<string>;
}> {
  console.log("🔍 Validating Nostr relay database...\n");

  const collectionData = await loadYamlFile<CollectionData>(
    "./data/collections.yaml"
  );
  const collectionIdSet = new Set<string>();
  const relayUrlSet = new Set<string>();

  collectionData.collections.forEach((collection) => {
    if (collectionIdSet.has(collection.id)) {
      console.error(`❌ Duplicate collection ID found: ${collection.id}`);
      process.exit(1);
    }
    collectionIdSet.add(collection.id);

    const _relayUrlSet = new Set<string>();
    collection.relays.forEach((relayUrl) => {
      if (_relayUrlSet.has(relayUrl)) {
        console.error(
          `❌ Duplicate relay URL in collection ${collection.id}: ${relayUrl}`
        );
        process.exit(1);
      }
      const normalizedUrl = new URL(relayUrl);
      if (normalizedUrl.toString() !== relayUrl) {
        console.error(
          `❌ Relay URL not normalized in collection ${collection.id}: ${relayUrl}`
        );
        process.exit(1);
      }
      _relayUrlSet.add(relayUrl);
      relayUrlSet.add(relayUrl);
    });
  });

  console.log("\n✅ Validation completed successfully!");

  return { collectionData, collectionIdSet, relayUrlSet };
}

if (require.main === module) {
  validate().catch((error) => {
    console.error("❌ Validation failed:", error);
    process.exit(1);
  });
}

export { validate };
