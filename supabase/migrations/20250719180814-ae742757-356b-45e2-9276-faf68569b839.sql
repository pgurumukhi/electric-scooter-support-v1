
-- Update the default value for email_verified column to TRUE
ALTER TABLE public.profiles 
ALTER COLUMN email_verified SET DEFAULT TRUE;

-- Update existing records to have email_verified as TRUE
UPDATE public.profiles 
SET email_verified = TRUE 
WHERE email_verified IS NULL OR email_verified = FALSE;

-- Update the handle_new_user function to set email_verified to TRUE by default
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, email_verified)
  VALUES (NEW.id, NEW.email, TRUE);
  RETURN NEW;
END;
$$;
