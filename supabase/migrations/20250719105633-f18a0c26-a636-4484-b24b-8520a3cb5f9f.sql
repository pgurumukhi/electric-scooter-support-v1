
-- Add admin role column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN is_admin BOOLEAN DEFAULT FALSE;

-- Create an index on is_admin for faster lookups
CREATE INDEX idx_profiles_is_admin ON public.profiles(is_admin);

-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT COALESCE(is_admin, FALSE) FROM public.profiles WHERE id = auth.uid();
$$;
