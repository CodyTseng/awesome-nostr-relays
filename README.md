# Awesome Nostr Relays

> [!WARNING]  
> This project is in experimental stage. Data structures may be subject to changes.

A curated collection of interesting Nostr relays, organized by collections for easy discovery.

**[📋 Browse All Relays](./AWESOME_RELAYS.md)**

## 🚀 Quick Start

### For Developers

Use the generated JSON files directly:

- **All Relays**: [https://raw.githubusercontent.com/CodyTseng/awesome-nostr-relays/master/dist/relays.json](https://raw.githubusercontent.com/CodyTseng/awesome-nostr-relays/master/dist/relays.json)
- **Collections**: [https://raw.githubusercontent.com/CodyTseng/awesome-nostr-relays/master/dist/collections.json](https://raw.githubusercontent.com/CodyTseng/awesome-nostr-relays/master/dist/collections.json)

### For Contributors

Edit the YAML source file and submit a PR:

- **Collections**: [`data/collections.yaml`](./data/collections.yaml)

## 📁 Output Files

The GitHub Action automatically generates these JSON files:

- `dist/relays.json` - Complete list of all relays
- `dist/collections.json` - Collection definitions with relay lists

## 🔧 Data Structure

### relays.json

```typescript
type RelaysJson {
  relays: string[]; // List of all relay URLs
  last_updated: number; // Unix timestamp of last update
}
```

### collections.json

```typescript
type CollectionsJson {
  collections: {
    id: string; // Unique identifier for the collection
    name: string; // Collection name
    description: string; // Brief description of the collection
    relays: string[]; // List of relay URLs in this collection
  }[];
  last_updated: number; // Unix timestamp of last update
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for detailed instructions on how to add relays and collections.

Quick steps:

1. Fork this repository
2. Edit the YAML files in the `data/` directory
3. Submit a pull request

## 📝 License

MIT License - feel free to use this data in your projects!
