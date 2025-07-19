
-- Clean up conflicting policies and ensure proper admin access
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view orders by profile_id" ON public.orders;
DROP POLICY IF EXISTS "Orders select policy" ON public.orders;

-- Create a single comprehensive policy for viewing orders
CREATE POLICY "Orders view policy" 
  ON public.orders 
  FOR SELECT 
  USING (
    is_current_user_admin() OR 
    profile_id = auth.uid()
  );

-- Ensure admins can update any order
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" 
  ON public.orders 
  FOR UPDATE 
  USING (is_current_user_admin());

-- Ensure admins can create orders for any user
DROP POLICY IF EXISTS "Admins can create orders" ON public.orders;
CREATE POLICY "Admins can create orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (is_current_user_admin());

-- Ensure admins can delete any order
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
CREATE POLICY "Admins can delete orders" 
  ON public.orders 
  FOR DELETE 
  USING (is_current_user_admin());
