# IBIT BTC Ratio Calculator

[![CI](https://github.com/Bortlesboat/ibit-btc-ratio-calculator/actions/workflows/ci.yml/badge.svg)](https://github.com/Bortlesboat/ibit-btc-ratio-calculator/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-black.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Bortlesboat/ibit-btc-ratio-calculator?style=social)](https://github.com/Bortlesboat/ibit-btc-ratio-calculator)

Open-source `IBIT` to `BTC` ratio calculator and weekend price estimator for BlackRock's iShares Bitcoin Trust ETF.

It uses the latest official `IBIT` snapshot from iShares plus a live or manual `BTC/USD` price anchor to estimate:

- `btc_per_ibit`
- `ibit_per_btc`
- estimated `IBIT` share price
- estimated position value for a share count

Useful for:

- Bitcoin ETF traders checking `IBIT` against weekend Bitcoin moves
- investors estimating Monday open expectations from a live `BTC/USD` price
- builders creating Bitcoin ETF dashboards, watchlists, and comparison tools

The app is intentionally static so it can be dropped into any site, repo, or simple hosting setup.
It is not tied to any specific website deployment.

## Live links

- Live demo: [bitcoinsapi.com/ibit](https://bitcoinsapi.com/ibit)
- JSON API companion: [bitcoinsapi.com/api/v1/tools/ibit-estimate](https://bitcoinsapi.com/api/v1/tools/ibit-estimate)

## Screenshot

![IBIT BTC Ratio Calculator screenshot](./.github/assets/ibit-btc-ratio-calculator.png)

## What this tool does

- estimates current `IBIT` price from a live or manual `BTC/USD` anchor
- translates share count into estimated USD position value
- shows `BTC` exposure implied by a given `IBIT` share count
- exposes the core math in a small static app that other builders can reuse

## Formula

The estimate is anchored to the latest official `IBIT` trading snapshot:

- `btc_per_ibit = nav / benchmark`
- `ibit_per_btc = 1 / btc_per_ibit`
- `estimated_ibit_now = close * (btc_now / benchmark)`
- `estimated_position_value = estimated_ibit_now * shares`
- `estimated_btc_exposure = shares * btc_per_ibit`

This is a weekend estimate, not a guaranteed Monday opening print.

## Use cases

- check `IBIT` against weekend Bitcoin price moves
- embed a ratio calculator in a Bitcoin ETF dashboard or watchlist
- power a simple JSON/API-backed Bitcoin ETF pricing widget
- compare `IBIT` share exposure against spot `BTC`

## Local workflow

1. `npm install`
2. `npm run refresh:snapshot`
3. `npm run dev`

## Test and build

1. `npm run test`
2. `npm run test:e2e`
3. `npm run build`

## Refresh snapshot data

`npm run refresh:snapshot`

This updates [`src/data/ibit-latest.json`](./src/data/ibit-latest.json) from the current iShares product page.

## Project structure

- `src/lib/calc.ts` - core `IBIT` / `BTC` estimate math
- `src/data/ibit-latest.json` - latest official snapshot anchor
- `scripts/refresh-ibit-snapshot.ts` - snapshot refresh/parser logic
- `tests/` - unit tests, parser tests, and browser coverage

## Export the static page

1. `npm run build`
2. `npm run export:static -- -Target ./deploy/ibit.html`

You can also copy `dist/index.html` anywhere you want after the build finishes.

## Contributing

Contributions are welcome, especially around interoperability, snapshot automation, and Bitcoin ETF builder workflows.

- Start here: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Open issues: [github.com/Bortlesboat/ibit-btc-ratio-calculator/issues](https://github.com/Bortlesboat/ibit-btc-ratio-calculator/issues)

## Notes

- This repo does not need any private local machine paths in source control.
- The export script takes a destination path at runtime instead of hardcoding one.
- Keeping the repo generic makes it safer to publish publicly and easier for other traders to reuse.
- A separate live website can consume the built artifact without this repo carrying any site-specific history.
- Not affiliated with BlackRock. Always verify the official fund source before making a trading decision.
