

## Email Notifications + Admin Feedback Dashboard

### 1. Email notification on each submission

**New Edge Function: `send-feedback-notification`**

When a feedback response is submitted, invoke this function to email a summary to `info@grounds.co.za` via the existing Resend integration. The email will include all answers, the customer's email/phone (if provided), and a positive/negative sentiment indicator.

**Update `src/pages/Feedback.tsx`**: After the successful insert, call `supabase.functions.invoke('send-feedback-notification', { body: payload })`.

### 2. Admin Feedback Dashboard

**New page: `src/pages/admin/FeedbackAdmin.tsx`** at `/admin/feedback`

- Protected behind the same admin auth gate used by BlogAdmin
- Header with navigation back to blog admin and logout
- Summary stats cards: total responses, positive %, negative %, responses with contact info
- Filterable, sortable table showing all feedback responses:
  - Date, overall experience, staff, product quality, store, found everything, email, phone
  - Color-coded sentiment badges (green = positive, red = negative)
- Date range filter (last 7 days, 30 days, all time)
- Export to CSV button

**RLS update**: Add a SELECT policy on `feedback_responses` for admin users so the dashboard can read responses.

### 3. Route + Navigation

- Add route `/admin/feedback` in `App.tsx`
- Add a link to feedback dashboard from BlogAdmin header (and vice versa)

### Files changed
- `supabase/functions/send-feedback-notification/index.ts` (new)
- `src/pages/admin/FeedbackAdmin.tsx` (new)
- `src/pages/Feedback.tsx` (add email invoke after submit)
- `src/App.tsx` (add route)
- `src/pages/admin/BlogAdmin.tsx` (add nav link to feedback admin)
- Database migration: add SELECT RLS policy for admins on `feedback_responses`

