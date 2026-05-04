## Remove Contact Form, Funnel to WhatsApp + Archive Improvements

### 1. `src/pages/Contact.tsx` — replace form with WhatsApp CTA
- Keep "Reach Out" hero, shop interior image, address, embedded map.
- Remove form, submit handler, `useState`, `toast`, `supabase` imports, `Input`/`Textarea` imports.
- New right-hand panel:
  - Heading: "Chat with us on WhatsApp"
  - Copy: "The fastest way to reach us — orders, questions, and special requests. We reply within trading hours."
  - Large green button (`#25D366`) with official `WhatsAppIcon` → `https://wa.me/27608153050`, displays `+27 60 815 3050`
  - Divider, then small muted line: "Prefer email? info@grounds.co.za" (`mailto:`)

### 2. `src/pages/admin/AdminHome.tsx` — relabel Contact tile
- Tile caption changes from "messages" to "archived"
- Add `Badge` "Archive — form removed" so admins know the form is no longer active
- Keep unread badge if any unread messages remain

### 3. `src/pages/admin/ContactAdmin.tsx` — archive enhancements
- **Archive notice banner** at top: "The public contact form has been removed. This view is now an archive of historical messages."
- **Search input**: filter by name, email, or message text (client-side over loaded rows)
- **Bulk read actions**:
  - Add a checkbox column + select-all checkbox in the table header
  - When any row selected, show a toolbar with "Mark as read", "Mark as unread", and clear-selection
  - Updates via `supabase.from("contact_messages").update({ read }).in("id", selectedIds)`
- **CSV export** already exists — keep it (exports the currently filtered + searched set)

### 4. Verification
- After implementation, query `contact_messages` to confirm no new rows arrive after the form removal (manual check by user over time).
- Confirm `/contact` no longer calls `send-contact-email`; the edge function and table remain in place untouched for archive integrity.

### Left untouched
- `contact_messages` table, `send-contact-email` edge function, footer/navbar Contact link, floating WhatsApp bubble.

### Files changed
- `src/pages/Contact.tsx`
- `src/pages/admin/AdminHome.tsx`
- `src/pages/admin/ContactAdmin.tsx`
