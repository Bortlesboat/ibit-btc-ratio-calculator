# IBIT BTC Ratio Calculator

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

## Export the static page

1. `npm run build`
2. `npm run export:static -- -Target ./deploy/ibit.html`

You can also copy `dist/index.html` anywhere you want after the build finishes.

## Notes

- This repo does not need any private local machine paths in source control.
- The export script takes a destination path at runtime instead of hardcoding one.
- Keeping the repo generic makes it safer to publish publicly and easier for other traders to reuse.
- A separate live website can consume the built artifact without this repo carrying any site-specific history.
