# Browser Agent Bench — public scorecard

A standalone GitHub Pages presentation of the 2026-11-16 benchmark snapshot. Contains page assets and three tool-level aggregates only. No per-attempt results, raw sessions, credentials or private benchmark source are included.

## Preview

Serve this directory with any static server, for example `python3 -m http.server 4189 --bind 127.0.0.1`, and open the root URL. There are no build dependencies, analytics or external asset requests.

## Publish

GitHub Settings → Pages → Deploy from a branch → `main` / `(root)`. `.nojekyll` makes this a plain static deployment.

## Update

Edit the three explicitly reviewed aggregate records at the start of `app.js` and the snapshot date/conditions in `index.html`. Preserve component-bucket denominators and token categories. Do not copy raw logs or the removed `results/` tree into this repository.

Default quality = singles 40% + combinations 30% + journeys 30%. Token value = quality per weighted token, normalized to the best observed stack = 100. Composite = quality 80% + token value 20%. Turnstile official test modes are separate. These are exploratory, single-repetition scores, not monetary prices or a stable leaderboard.
