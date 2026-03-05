

## Add Rich Text Editing to Blog Admin

Currently the blog content uses a plain `<Textarea>` and renders with `whitespace-pre-wrap` (plain text). To support bold, italics, bullet points, etc., we need a rich text editor.

### Approach

**Install TipTap** — a headless rich text editor for React that's lightweight and extensible.

**Packages to add:**
- `@tiptap/react`
- `@tiptap/starter-kit` (includes bold, italic, headings, bullet lists, ordered lists, blockquote, code, etc.)
- `@tiptap/extension-underline`

### Changes

1. **Create `src/components/RichTextEditor.tsx`** — A reusable TipTap editor component with a toolbar (bold, italic, underline, bullet list, ordered list, headings, blockquote). Content stored as HTML.

2. **Update `src/pages/admin/BlogAdmin.tsx`** — Replace the content `<Textarea>` with the new `RichTextEditor`. The `content` state will now store HTML strings.

3. **Update `src/pages/BlogPost.tsx`** — Change from `{post.content}` with `whitespace-pre-wrap` to `dangerouslySetInnerHTML={{ __html: post.content }}` so HTML content renders properly with the existing `prose` classes.

4. **Update `src/pages/Blogs.tsx`** — If blog cards show content snippets, strip HTML tags for the preview text.

### Notes
- Existing plain-text posts will still display fine since HTML rendering handles plain text.
- When pasting from Word/Google Docs, TipTap automatically preserves bold, italic, and list formatting.

