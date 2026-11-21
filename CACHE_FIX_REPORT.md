# Offline cache fix — 2026-10-06

- Root `cache.appcache` now has an explicit `CACHE:` section.
- All cache entries are placed before `NETWORK:*`.
- Cache manifest revision was bumped to force a fresh cache update.
- Firmware-specific manifests were normalized to include an explicit `CACHE:` section where missing.
- All root manifest local entries were checked against actual files.
