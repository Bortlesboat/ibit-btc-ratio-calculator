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

## Hosted status

The project-operated `bitcoinsapi.com` demo and JSON companion are intentionally paused during an infrastructure review. The calculator remains fully usable through the local workflow or as an exported static page.

## Screenshot

![IBIT BTC Ratio Calculator screenshot](./.github/assets/ibit-btc-ratio-calculator.png)

## What this tool does

- estimates current `IBIT` price from a live or manual `BTC/USD` anchor
- translates share count into estimated USD position value
- shows `BTC` exposure implied by a given `IBIT` share count
- exposes the core math in a small static app that other builders can reuse

## Why this repo is different

Most public Bitcoin ETF tools fall into one of three buckets:

- closed calculators focused on options or strike conversion
- generic Bitcoin ETF fee and performance comparison tools
- fund-specific utilities that are not open source or easy to embed

This repo is intentionally different:

- `IBIT` first, not a diluted generic finance tool
- open source and easy to inspect
- static by default, so it can be dropped into a site, dashboard, or internal tool
- core calculation and URL-state modules that builders can reuse
- builder-friendly foundation for ETF widgets, watchlists, and weekend pricing tools

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
- reuse the calculation module in a Bitcoin ETF pricing widget
- compare `IBIT` share exposure against spot `BTC`

## Shareable URL presets

The static calculator accepts and maintains shareable query parameters:

- `?btc=74000`
- `?shares=350`
- `?btc=74000&shares=350`

Malformed or negative values are ignored safely, and missing parameters keep the default calculator behavior.

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

## Roadmap

The highest-leverage next improvements are:

- JSON and embeddable outputs for builders
- automated snapshot refreshes
- options-focused conversion workflows
- optional support for additional spot Bitcoin ETFs while keeping `IBIT` as the default path

## Notes

- This repo does not need any private local machine paths in source control.
- The export script takes a destination path at runtime instead of hardcoding one.
- Keeping the repo generic makes it safer to publish publicly and easier for other traders to reuse.
- A separate live website can consume the built artifact without this repo carrying any site-specific history.
- Not affiliated with BlackRock. Always verify the official fund source before making a trading decision.
