# Amine PS4 FIX

Merged from the supplied 11-main project and the supplied 9.00 to 13.02/13.50/13.52/ 14.00 project.

## Design
- Uses the 11-main blue PS4-style `theme.css` / `unified-theme.css`.
- Uses the existing `background.jpg` across firmware pages.
- Lightweight shell: removed the 5.4 MB background MP3 and unused duplicate 6.72 files.
- Firmware engines and patch binaries are kept separate; UI changes do not alter exploit code.

## Included profiles
- 5.05–9.60
- 9.00
- 10.00–11.02
- 11.50–13.00
- 13.02 / 13.50 / 13.52

The 13.02–13.52 engine is packaged under `1302-1352/`.


## Added 14.00 host
- Added the supplied Afterglow web host under `14.00/`.
- The main firmware dispatcher routes exact firmware 14.00 to this separate host.
- Added a local application-cache manifest listing the host's local files and added those files to the top-level cache manifest.
- The Afterglow exploit source and payload files were copied as supplied; they were not rewritten or independently validated.
- Offline use requires one successful first load while connected to the same-origin host so the browser can populate its cache. Application Cache support varies by browser/firmware.
