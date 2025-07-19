
-- Create a table for orders
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) NOT NULL,
  quantity INTEGER NOT NULL,
  description TEXT NOT NULL,
  order_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure only admins can manage orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy that allows admins to view all orders
CREATE POLICY "Admins can view all orders" 
  ON public.orders 
  FOR SELECT 
  USING (is_current_user_admin());

-- Create policy that allows admins to create orders
CREATE POLICY "Admins can create orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (is_current_user_admin());

-- Create policy that allows admins to update orders
CREATE POLICY "Admins can update orders" 
  ON public.orders 
  FOR UPDATE 
  USING (is_current_user_admin());

-- Create policy that allows admins to delete orders
CREATE POLICY "Admins can delete orders" 
  ON public.orders 
  FOR DELETE 
  USING (is_current_user_admin());

-- Create an index on profile_id for better query performance
CREATE INDEX idx_orders_profile_id ON public.orders(profile_id);
