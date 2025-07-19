
-- Remove the otp_expires_at column from profiles table
ALTER TABLE public.profiles DROP COLUMN otp_expires_at;
