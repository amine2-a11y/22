# Firmware preflight guard

This wrapper only dispatches exact firmware profiles present in `ps4_offsets.js`.
It verifies that the local metadata, the firmware-specific patch asset, and the selected chain entry are available before navigation.
Unknown/intermediate firmware versions are stopped instead of being guessed into a neighboring profile.
