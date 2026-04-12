# Contributing

Thanks for helping improve the `IBIT` / `BTC` ratio calculator.

## What makes a good contribution

- fixes that improve estimate clarity or trust
- small UX improvements for traders using the tool on weekends
- tests around the math, snapshot parsing, or display formatting
- lightweight interoperability improvements for dashboards, widgets, or ETF tooling

## Local setup

1. `npm install`
2. `npm run test`
3. `npm run build`
4. `npm run test:e2e`

## Snapshot refresh workflow

Run `npm run refresh:snapshot` to update the official `IBIT` anchor data in `src/data/ibit-latest.json`.

Please keep changes narrow and include the source context if you update snapshot parsing assumptions.

## Pull request expectations

- explain what changed and why
- mention any math or UX assumptions
- include test coverage when behavior changes
- avoid hardcoding personal machine paths or deployment-specific details

## Good first areas

- small calculator UX improvements
- export and embedding helpers
- extra validation around manual input states
- docs and interoperability examples
