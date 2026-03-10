

## Remove Lovable Branding & Use Grounds Logo for Search

**Changes needed:**

1. **`index.html`** — Replace the Lovable OpenGraph/Twitter images with the Grounds logo (`/favicon.png`) so Google and social previews show your branding instead of the Lovable placeholder:
   - Line 23: `og:image` → `/favicon.png`
   - Line 28: `twitter:image` → `/favicon.png`

2. **Hide the "Edit in Lovable" badge** — This is a setting you toggle in your project: **Settings → Hide 'Lovable' Badge**. No code change needed for this.

The favicon is already set to your Grounds logo (`/favicon.png`). The only code change is swapping the two social/search preview image URLs.

