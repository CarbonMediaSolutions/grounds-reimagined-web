CREATE TABLE public.feedback_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  overall_experience text NOT NULL,
  staff_helpful text NOT NULL,
  product_quality text NOT NULL,
  store_experience text NOT NULL,
  found_everything text NOT NULL,
  email text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON public.feedback_responses FOR INSERT
  TO anon, authenticated WITH CHECK (true);
