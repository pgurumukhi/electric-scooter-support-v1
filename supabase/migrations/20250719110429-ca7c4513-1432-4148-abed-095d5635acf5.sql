
-- Allow authenticated users to insert new FAQs
CREATE POLICY "Authenticated users can create FAQs" 
  ON public.faqs 
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to update FAQs (optional, for editing)
CREATE POLICY "Authenticated users can update FAQs" 
  ON public.faqs 
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- Allow authenticated users to delete FAQs (optional, for deletion)
CREATE POLICY "Authenticated users can delete FAQs" 
  ON public.faqs 
  FOR DELETE 
  TO authenticated
  USING (auth.uid() IS NOT NULL);
