
## Fix Blog Post Content Spacing

**Problem:** TipTap generates proper HTML with `<p>`, `<ul>`, `<h2>` tags etc., but the rendered blog post loses spacing between paragraphs. The Tailwind `prose` class should handle this, but custom styles are likely interfering.

**Root Cause:** The `prose` utility applies default colors to child elements, but `text-foreground` on the container and potentially the base styles (e.g., all elements getting border styling) can conflict with prose's built-in spacing and color rules.

**Fix in `src/pages/BlogPost.tsx`:**
- Change the prose container classes to ensure proper paragraph spacing is preserved
- Use `prose-p:mb-4` and related prose modifiers if needed

**Fix in `src/index.css`:**
- Add styles ensuring `.prose p`, `.prose ul`, `.prose ol`, `.prose blockquote` retain proper margins, since base layer resets or other global styles may strip them

**Changes:**
1. **`src/pages/BlogPost.tsx`** — Update the content div classes to `prose prose-stone prose-lg max-w-none` and remove `text-foreground leading-relaxed` which can conflict with prose defaults.

2. **`src/index.css`** — Add a small block ensuring prose elements get proper spacing:
   ```css
   .prose p { margin-bottom: 1em; }
   .prose ul, .prose ol { margin-bottom: 1em; }
   ```
   This ensures paragraph breaks from TipTap's `<p>` tags render with visible spacing.
