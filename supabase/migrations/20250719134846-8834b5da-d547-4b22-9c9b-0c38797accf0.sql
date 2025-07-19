
-- Allow users to view orders that belong to their profile
CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE email = (
        SELECT email FROM auth.users WHERE id = auth.uid()
      )
    )
  );
