# rthomas.app — Project Summary

Personal homepage that acts as a launchpad for all apps built by R Thomas. Deployed as a static site on Render.

## What it is

A single-page cover site at `rthomas.app` with two sections:

- **Apps** — accordion cards for each app, with an icon, description, and launch link
- **X feed** — a pinned list of X/Twitter posts, saved in `localStorage`, with add/remove via a URL form

## Stack

- Vanilla HTML, CSS, JavaScript — no framework, no build step
- Deployed via `render.yaml` as a static site on Render
- Animated particle canvas background (`signalCanvas`)
- Fonts: Inter via Google Fonts

## Apps listed

| App | URL |
|-----|-----|
| TARS Stock Tracker | https://marketlens-jn9s.onrender.com |
| Agent Helper | https://agenthelper-frontend.onrender.com |
| Expense Processor | https://expense-processor-1.onrender.com |
| DraftDay | https://thedraftday.com/ |

## Design system

- Color palette: green (`#245f4d`), blue (`#286da8`), coral (`#d85f45`), gold (`#b98520`)
- Each app card has a custom `--accent` color bleeding as a gradient
- Fully responsive down to 520px
- Accordion pattern for both app cards and post cards
