

## Update Sitemap Domain + Add Google Tag Manager

**Changes:**

1. **`public/sitemap.xml`** — Replace all `https://grounds-reimagined-web.lovable.app` with `https://www.grounds.co.za`. Also fix the typo in the xmlns (`sitemaszones` → `sitemaps`).

2. **`public/robots.txt`** — Update the Sitemap directive to `https://www.grounds.co.za/sitemap.xml`.

3. **`index.html`** — Add GTM snippet in `<head>` (before existing scripts) and the `<noscript>` iframe right after `<body>`.

4. **`index.html`** — Update canonical URL to `https://www.grounds.co.za`.

