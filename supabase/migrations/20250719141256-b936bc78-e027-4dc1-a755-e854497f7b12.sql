
-- Drop the existing policies that might be causing conflicts
DROP POLICY IF EXISTS "Users can view orders by profile_id" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- Create a comprehensive policy that allows admins to view all orders and users to view their own
CREATE POLICY "Orders select policy" 
  ON public.orders 
  FOR SELECT 
  USING (
    is_current_user_admin() OR 
    profile_id = auth.uid()
  );

-- Ensure the admin create policy exists and is correct
DROP POLICY IF EXISTS "Admins can create orders" ON public.orders;
CREATE POLICY "Admins can create orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (is_current_user_admin());

-- Also ensure admins can update orders
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" 
  ON public.orders 
  FOR UPDATE 
  USING (is_current_user_admin());

-- And ensure admins can delete orders
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
CREATE POLICY "Admins can delete orders" 
  ON public.orders 
  FOR DELETE 
  USING (is_current_user_admin());
