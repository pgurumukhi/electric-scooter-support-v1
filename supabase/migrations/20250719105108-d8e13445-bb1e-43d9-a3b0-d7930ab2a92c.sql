
-- Create a table for contact submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved'))
);

-- Add Row Level Security (RLS) to ensure users can only see their own submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own submissions
CREATE POLICY "Users can view their own contact submissions" 
  ON public.contact_submissions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own submissions
CREATE POLICY "Users can create contact submissions" 
  ON public.contact_submissions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows authenticated users to insert submissions
CREATE POLICY "Authenticated users can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);
