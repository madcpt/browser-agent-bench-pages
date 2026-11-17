# Browser Agent Bench — public scorecard

**English** · [简体中文](README.zh-CN.md)

[Open the live site](https://madcpt.github.io/browser-agent-bench-pages/?lang=en)

A standalone GitHub Pages presentation of the 2026-11-16 benchmark snapshot. Contains page assets, three tool-level aggregates, and generated public task definitions / UI previews. No per-attempt results, raw sessions, credentials or grader implementation are included.

## Language selection

Use the language selector in the page header, or share `?lang=en` / `?lang=zh`. The browser remembers the selection. Task deep links (`#task=<id>`), scoring weights, task filters and the selected stage are preserved when switching.

The leaderboard, tool profiles, methodology, task titles and task instructions are bilingual. Original task controls, option values and target strings retain their wording to preserve task semantics; preview notices and instructions follow the selected language.

Page translations live in `i18n.js`; Chinese task translations are in `task-translations.zh.json`. English task instructions are exported from the original manifests.

## Preview

Serve this directory with any static server, for example `python3 -m http.server 4189 --bind 127.0.0.1`, and open the root URL. There are no build dependencies, analytics or external asset requests.

## Publish

GitHub Settings → Pages → Deploy from a branch → `main` / `(root)`. `.nojekyll` makes this a plain static deployment.

## Update

Edit the three explicitly reviewed aggregate records at the start of `app.js` and the snapshot date/conditions in `index.html`. Preserve component-bucket denominators and token categories. Do not copy raw logs or the removed `results/` tree into this repository.

Default quality = singles 40% + combinations 30% + journeys 30%. Token value = quality per weighted token, normalized to the best observed stack = 100. Composite = quality 80% + token value 20%. Turnstile official test modes are separate. These are exploratory, single-repetition scores, not monetary prices or a stable leaderboard.

## Shared task previews

`task-catalog.json` and `demo/assets/` are generated from the original benchmark's task manifests, public stage briefs and React components. They contain no evaluation records or grader implementation. Each task has a deep link at `#task=<id>` and a full preview at `demo/lab.html?task=<id>`.

Regenerate from the local benchmark checkout (with its existing build dependencies installed):

```sh
node scripts/export-tasks.mjs ../browser-agent-bench
```

The exporter records the source commit. It substitutes only a static-preview persistence adapter and asset paths; it does not change the original evaluation code. Public previews store drafts locally, do not grade outcomes, use same-origin iframe presentation, and do not offer Turnstile server verification. `scripts/demo-api.js` is preview infrastructure, not an authoritative grader.
