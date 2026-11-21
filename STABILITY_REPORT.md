# Stability inspection — 22-main

Date: 2026-10-06

## Fixed
1. Added the missing root `goldhen-status.js` referenced by the root launcher and cache manifest.
2. Repaired the malformed closing of `runPAYLOAD` in `505_960/505exploit.js`, which previously produced a JavaScript `SyntaxError`.
3. Bumped the root Application Cache manifest revision to force cache invalidation after the repair.

## Firmware profiles present
- 5.05–9.60
- 9.00
- 10.00–11.02
- 11.50–13.00
- 13.02–13.52

This does not create support for firmware versions for which the project has no corresponding exploit/offset profile (for example, 13.01).
