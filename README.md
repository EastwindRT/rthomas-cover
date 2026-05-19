# rthomas.app homepage

Static personal homepage for `rthomas.app` with links to:

- TARS Stock Tracker — https://marketlens-jn9s.onrender.com
- Agent Helper — https://agenthelper-frontend.onrender.com
- Expense Processor — https://expense-processor-1.onrender.com
- DraftDay — https://thedraftday.com/

## Update app links

Edit the `apps` array at the top of `app.js` and replace the `url` values with the Render URLs or custom subdomains.

## X feed

Paste an X or Twitter post URL into the feed form on the homepage. Added links are saved in the browser with `localStorage`.

To change the default links that appear on first load, edit the `sharedPosts` array at the top of `app.js`. Each post supports:

- `title`
- `url`

## Deploy on Render

This repo includes `render.yaml` for a static site. Create a new Blueprint or Static Site on Render and point it at this repository.
