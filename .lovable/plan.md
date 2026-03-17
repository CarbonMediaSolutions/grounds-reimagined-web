

## Fix Favicon: Replace heart-shaped favicon.ico with brand logo

**Problem:** The project ships a legacy `public/favicon.ico` that shows a heart icon (Lovable's default). Browsers and Google often fetch `/favicon.ico` by default, ignoring the PNG declaration.

**Solution:**

1. **Delete `public/favicon.ico`** — remove the legacy heart icon file.

2. **Update `index.html`** — change the favicon link to also explicitly reference `.ico` format, and add a second link for the PNG as an Apple touch icon:
   ```html
   <link rel="icon" href="/favicon.png" type="image/png" sizes="any" />
   ```
   Since we don't have an actual `.ico` version of the logo, we keep the PNG reference but ensure there's no competing `.ico` file on the server. Browsers that request `/favicon.ico` will get a 404 and fall back to the declared `<link>` tag.

3. **Optionally convert the PNG to ICO** — If you'd like a proper `.ico` file, you'd need to provide one or we can keep the PNG-only approach, which modern browsers support well.

**Technical note:** The key fix is simply deleting the old `public/favicon.ico` so it stops being served. The existing `<link rel="icon" href="/favicon.png">` tag is correct and sufficient for modern browsers and Google.

