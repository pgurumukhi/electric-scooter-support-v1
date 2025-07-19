
-- Add response column to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN response TEXT;

-- Add responded_at timestamp
ALTER TABLE public.contact_submissions 
ADD COLUMN responded_at TIMESTAMP WITH TIME ZONE;

-- Add responded_by to track which admin responded
ALTER TABLE public.contact_submissions 
ADD COLUMN responded_by UUID REFERENCES auth.users;

-- Create policy for admins to view all contact submissions
CREATE POLICY "Admins can view all contact submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (public.is_current_user_admin());

-- Create policy for admins to update contact submissions
CREATE POLICY "Admins can update contact submissions" 
  ON public.contact_submissions 
  FOR UPDATE 
  USING (public.is_current_user_admin());
