

## Update Favicon & Meta Tags for Brand Identity

**What changes:**

### 1. Update `index.html` `<head>` section
- Replace the single `<link rel="icon" href="/favicon.png">` with multiple favicon references:
  - `/favicon.ico` (standard)
  - `/favicon-32x32.png` (32×32)
  - `/favicon-16x16.png` (16×16)
  - `/apple-touch-icon.png` (Apple devices)
- Update `<title>` to "Grounds Reimagined"
- Keep existing `<meta name="description">` (already suitable)
- Update OG image tags (`og:image`) to point to `/og-image.png`
- Add `og:url` pointing to `https://www.grounds.co.za`
- Update Twitter card image to `/og-image.png`
- Remove old `/favicon.png` reference

### 2. Clean up `public/` folder
- Delete `public/favicon.png` (old logo file)
- No new image files created — you'll upload `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, and `og-image.png` separately

### Technical detail

The updated favicon block in `<head>` will be:
```html
<link rel="icon" href="/favicon.ico" type="image/x-icon" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

OG/Twitter images will reference `/og-image.png` with absolute URL `https://www.grounds.co.za/og-image.png`.

Everything else in `<head>` (GTM, Meta Pixel, fonts, analytics, canonical) stays unchanged.

