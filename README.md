
## V6 navigation safety
- Automatic retry uses `location.reload()` only; it does not navigate to a new URL.
- The 9.00 page no longer redirects to `cache.html` on initial ApplicationCache state, avoiding an extra cache page in the browser's frequently-visited list.
- Exploit modules are unchanged.

# 22