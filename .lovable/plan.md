

## Unified Admin Dashboard — Contact + Feedback Submissions

### Problem
Feedback submissions are stored in the database and viewable at `/admin/feedback`, but **contact form submissions are only emailed** — there's no record to display in an admin view. We need to store contact messages and surface both contact + feedback in one admin hub.

### Solution

**1. Store contact form submissions in the database**

New table `public.contact_messages`:
- `id` (uuid, pk), `created_at` (timestamptz), `name` (text), `email` (text), `message` (text), `read` (boolean, default false)

RLS policies:
- `INSERT` → anyone (anon + authenticated) — so the public form can submit
- `SELECT` / `UPDATE` → admins only (via `has_role`)

Update `send-contact-email` Edge Function to also insert the row into `contact_messages` (using the service role key) so the message is captured even if the email send fails.

**2. New unified Admin Dashboard hub at `/admin`**

A landing page with three cards/tiles linking to:
- Blog Posts (`/admin/blogs`)
- Feedback Responses (`/admin/feedback`) — show count + recent positive/negative split
- Contact Messages (`/admin/contact`) — show count + unread badge

Redirect `/admin/login` success to `/admin` instead of `/admin/blogs`.

**3. New page: `src/pages/admin/ContactAdmin.tsx`** at `/admin/contact`

- Same admin-auth gate pattern as the others
- Stats cards: Total messages, Unread, Last 7 days
- Filterable table: Date, Name, Email, Message preview, Status (Read/Unread)
- Click a row → dialog with full message, "Mark as read", and a `mailto:` reply button
- Date range filter (7d / 30d / all) and unread-only toggle
- Export to CSV

**4. Cross-navigation**

Replace the back-arrow header pattern in BlogAdmin and FeedbackAdmin with a small admin sub-nav (Blog · Feedback · Contact · Logout) so admins can move freely between the three sections. New ContactAdmin gets the same nav.

### Files

**New**
- `src/pages/admin/AdminHome.tsx` — dashboard hub at `/admin`
- `src/pages/admin/ContactAdmin.tsx` — contact messages list/detail
- `src/components/admin/AdminNav.tsx` — shared admin sub-nav
- Database migration: create `contact_messages` table + RLS

**Edited**
- `supabase/functions/send-contact-email/index.ts` — also insert into `contact_messages` before sending email
- `src/App.tsx` — add `/admin` and `/admin/contact` routes
- `src/pages/admin/AdminLogin.tsx` — redirect to `/admin` on success
- `src/pages/admin/BlogAdmin.tsx` + `src/pages/admin/FeedbackAdmin.tsx` — use shared `AdminNav`

### Technical notes
- The contact insert in the edge function uses the service role key (already configured) so it bypasses RLS cleanly. The form continues to call only `send-contact-email` — no client-side DB writes, keeping the schema invisible to anonymous users beyond the existing function.
- "Unread" is tracked via the `read` boolean; admins toggle it from the detail dialog.
- All admin pages remain gated by `has_role(auth.uid(), 'admin')`.

