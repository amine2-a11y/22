/* Copyright (C) 2023-2025 anonymous

PSFree error display hook. Retry is handled centrally by ../smart-retry.js. */

// smart-retry.js runs before this module on the 9.00 page.  When it schedules
// a reload, it marks the event so this diagnostic handler does not also show
// an alert for the same failure. This prevents duplicate handlers from
// producing a reload + alert race.

addEventListener('unhandledrejection', event => {
    if (window.__safeReloadRetryHandled) {
        event.preventDefault();
        return;
    }

    const reason = event.reason;
    alert(
        'Unhandled rejection\n'
        + `${reason}\n`
        + `${reason?.sourceURL || ''}:${reason?.line || ''}:${reason?.column || ''}\n`
        + `${reason?.stack || ''}`
    );
    event.preventDefault();
});

addEventListener('error', event => {
    if (window.__safeReloadRetryHandled) {
        event.preventDefault();
        return;
    }

    const reason = event.error;
    alert(
        'Unhandled error\n'
        + `${reason}\n`
        + `${reason?.sourceURL || event.filename || ''}:${reason?.line || event.lineno || ''}:${reason?.column || event.colno || ''}\n`
        + `${reason?.stack || ''}`
    );
    event.preventDefault();
});

// Dynamically import the program so syntax/runtime failures reach the global
// retry/diagnostic handlers above.
import('./psfree.mjs');
