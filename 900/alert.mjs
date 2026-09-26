/* Copyright (C) 2023-2025 anonymous

This file is part of PSFree.

PSFree is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

PSFree is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.  */

// We can't just open a console on the ps4 browser, make sure the errors thrown
// by our program are alerted.

// We don't use a custom logging function to avoid a dependency on a logging
// module since we want this file to stand alone. We don't want to copy the
// log function here either for the sake avoiding dependencies since using
// alert() is good enough.

// We log the line and column numbers as well since some exceptions (like
// SyntaxError) do not show it in the stack trace.

let retryCount = Number(sessionStorage.getItem('psfree_retry_count') || '0');

function isRaceError(reason) {
    const text = String(reason || '');
    return /multiple blurs|blurs before pop/i.test(text);
}

function retryRace(reason) {
    if (retryCount >= 1 || !isRaceError(reason)) return false;
    retryCount++;
    sessionStorage.setItem('psfree_retry_count', String(retryCount));
    setTimeout(() => location.reload(), 350);
    return true;
}

addEventListener('unhandledrejection', event => {
    const reason = event.reason;
    if (retryRace(reason)) {
        event.preventDefault();
        return;
    }
    try { if (typeof showJailbreakFailure === 'function') showJailbreakFailure(); } catch (e) {}
    alert(
        'Unhandled rejection\n'
        + `${reason}\n`
        + `${reason?.sourceURL || ''}:${reason?.line || ''}:${reason?.column || ''}\n`
        + `${reason?.stack || ''}`
    );
    event.preventDefault();
});

addEventListener('error', event => {
    const reason = event.error;
    const text = String(reason || '');
    // The PSFree 9.00 UAF race can occasionally hit the same blur twice.
    // Retry once automatically; after that, keep the diagnostic visible.
    if (retryRace(reason)) {
        return true;
    }
    sessionStorage.removeItem('psfree_retry_count');
    try { if (typeof showJailbreakFailure === 'function') showJailbreakFailure(); } catch (e) {}
    alert(
        'Unhandled error\n'
        + `${reason}\n`
        + `${reason.sourceURL}:${reason.line}:${reason.column}\n`
        + `${reason.stack}`
    );
    return true;
});

// Normalize a stale #foo supplied in the URL before starting PSFree.
// #foo is used internally by the UAF flow; carrying it in from a previous
// browser state can cause the 9.00 page to re-enter with the wrong history
// state and contribute to the memory/race failure.
if (location.hash === '#foo') {
    history.replaceState(null, '', location.pathname + location.search);
}

// we have to dynamically import the program if we want to catch its syntax
// errors
import('./psfree.mjs');
