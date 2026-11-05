# PS4 firmware 9.00 stability check

Changes in this package:
- Hardened the error-reporting handler in `alert.mjs` so an error event without an `Error` object does not trigger a second exception while displaying diagnostics.
- Kept the firmware 9.00 exploit implementation, offsets, payloads, and binaries unchanged.
- Checked that every local entry listed in `psfree_lapse.cache` exists in the 900 directory.

Important limitation:
- This is a defensive JavaScript/UI fix, not a guarantee that the exploit will succeed every time. The upstream README describes the 9.00 chain as probabilistic; race-based exploits can still fail or freeze. If the console freezes, power it down only after allowing time for the browser/system to recover, and avoid repeated rapid retries.
- Application Cache is legacy technology and behavior depends on the PS4 browser and how the host serves the files.
