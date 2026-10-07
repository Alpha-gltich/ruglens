# RugLens

A dashboard tracking Total Value Locked (TVL) for tokenized real-world asset (RWA) protocols — treasury bills, private credit, real estate, commodities, and similar on-chain instruments — using live data from [DefiLlama](https://defillama.com).

**Live:** [ruglens-six.vercel.app](https://ruglens-six.vercel.app)

## Features

- Live TVL tracking for 8 locked RWA tokens, filterable by category (Treasury Bills, Private Credit, Real Estate, Commodities, Money Market Funds, Other Fixed Income)
- Per-token detail pages with chain-level TVL breakdown
- Local watchlist (star any token)
- Error boundary and loading states for the live data fetch
- Graceful handling of DefiLlama's rate limiting (HTTP 429)

## Known limitation: partial TVL data

DefiLlama's `/protocols` and `/protocol/{slug}` endpoints currently return `null` TVL for most tokens in this locked list — only RealT Tokens has populated data as of this writing. This was confirmed by directly probing both endpoints; it is **not** a bug in this app's code.

DefiLlama does track market cap and TVL for these assets on their [RWA dashboard](https://defillama.com/rwa), but that data is served through an internal API (`defillama.com/api/public/rwa/*`) that is protected by Cloudflare and returns a bot-challenge page to non-browser requests, so it isn't usable here without a different, documented data source.

The app reflects this honestly rather than hiding it: tokens with no available TVL show "TVL unavailable (DefiLlama)" instead of a fabricated or stale number, and the Total TVL figure labels itself "(partial)" with a count of how many tokens are missing data.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To verify a production build locally before deploying:

```bash
npm run build && npm start
```

## Deploy

Pushes to `main` auto-deploy to Vercel.