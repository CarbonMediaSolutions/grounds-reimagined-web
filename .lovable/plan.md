

## Feedback Page Updates

### Changes to `src/pages/Feedback.tsx`

**1. Enlarge logo** — Change `h-16` to `h-24` on the logo image.

**2. Add phone number field for unhappy customers on Step 6** — Use the `isPositive()` check. If feedback is negative, show an optional phone number field with copy like: *"We'd love the chance to make things right. Leave your number and we'll reach out to hear your feedback."* If positive, keep the existing email/newsletter capture. Add `phone` state variable.

**3. Remove emoji** — Remove the `🙏` div on the thank-you screen (step 7). Also remove the star emojis from step 1 options and the `⭐` from the review button text.

### Database migration

Add a `phone` column (nullable text) to the `feedback_responses` table so the contact number can be stored.

### Flow summary

- Steps 1-5: unchanged (except star emojis removed from step 1 labels)
- Step 6 (positive): email capture for newsletter (unchanged)
- Step 6 (negative): phone number field with warm, optional wording + email field kept
- Step 7: no emoji, just the thank-you text and conditional Google review prompt

