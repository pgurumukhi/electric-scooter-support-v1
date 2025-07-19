
-- Add OTP column to profiles table for email verification
ALTER TABLE public.profiles 
ADD COLUMN otp TEXT,
ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;

-- Create an index on OTP for faster lookups
CREATE INDEX idx_profiles_otp ON public.profiles(otp);

-- Update the handle_new_user function to include the new columns
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, email_verified)
  VALUES (NEW.id, NEW.email, FALSE);
  RETURN NEW;
END;
$$;
