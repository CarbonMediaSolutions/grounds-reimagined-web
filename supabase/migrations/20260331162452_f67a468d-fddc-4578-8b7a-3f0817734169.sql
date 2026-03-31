CREATE POLICY "Admins can read feedback"
ON public.feedback_responses
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));