# Contributing to Awesome Nostr Relays

Thank you for your interest in contributing! This document explains how to add relays and collections to the database.

## 📝 How to Contribute

### Adding a New Relay

1. **Fork this repository**

2. **Add to collections** in `data/collections.yaml`:

   - Find appropriate existing collections
   - Add your relay URL to the `relays` list

3. **Submit a pull request**

### Adding a New Collection

1. **Edit `data/collections.yaml`** and add:

```yaml
- id: "new-collection"
  name: "Collection Display Name"
  description: "What this collection is about"
  relays:
    - "relay-id-1"
    - "relay-id-2"
```

## 🎯 Guidelines

### Relay Selection Criteria

- **Stability**: Relay should have good uptime
- **Performance**: Reasonable response times
- **Accessibility**: Publicly accessible (unless specialized)
- **Unique Value**: Offers something interesting or useful

### ID Naming Convention

- Use lowercase letters and hyphens
- Keep it short but descriptive

### Collection Guidelines

- Collections should be useful for discovery
- Avoid too many small collections
- Each collection should have at least 2-3 relays
- One relay can belong to multiple collections

## 🔍 Validation

Before submitting, the system validates:

- ✅ Valid WebSocket URLs (`wss://` or `ws://`)
- ✅ All collection references exist
- ⚠️ Warns about unreferenced relays

## 🚫 What We Don't Accept

- Relays that are frequently down
- Private relays not accessible to the public
- Duplicate submissions
- Relays with malicious content

## 🤝 Code of Conduct

- Be respectful and constructive
- Focus on data quality and usefulness
- No spam or promotional content
- Follow the project's structure and conventions

## 🆘 Need Help?

- Open an issue for questions
- Check existing issues before creating new ones
- Tag maintainers for urgent matters

Thank you for making the Nostr ecosystem more discoverable! 🚀
