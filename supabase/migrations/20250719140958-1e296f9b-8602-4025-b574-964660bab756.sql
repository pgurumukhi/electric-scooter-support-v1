
-- Drop the existing policy that's causing the permission error
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;

-- Create a new policy that allows users to view orders where their profile_id matches
CREATE POLICY "Users can view orders by profile_id" 
  ON public.orders 
  FOR SELECT 
  USING (
    profile_id = (
      SELECT id FROM public.profiles WHERE id = auth.uid()
    )
  );

-- Ensure admins can still create orders (this should already exist but let's make sure)
CREATE POLICY "Admins can create orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (is_current_user_admin());
