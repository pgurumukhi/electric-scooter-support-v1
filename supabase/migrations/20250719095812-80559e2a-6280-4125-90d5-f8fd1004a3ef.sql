
-- Create a table for storing FAQ items
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index on category for faster filtering
CREATE INDEX idx_faqs_category ON public.faqs(category);

-- Since this is a public FAQ system, we'll make it readable by everyone
-- but only allow authenticated users to modify (if needed later)
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read FAQs
CREATE POLICY "Anyone can view FAQs" 
  ON public.faqs 
  FOR SELECT 
  USING (true);

-- Insert the existing FAQ data
INSERT INTO public.faqs (category, question, answer) VALUES
('battery', 'How long does the battery last on a single charge?', 'Our electric scooters can travel up to 25-30 miles on a single charge, depending on rider weight, terrain, and riding style. The battery typically lasts 3-5 hours of continuous use.'),
('battery', 'How long does it take to fully charge the battery?', 'A complete charge takes approximately 4-6 hours using the standard charger. We also offer fast chargers that can reduce this time to 2-3 hours.'),
('safety', 'What safety gear do I need when riding?', 'We strongly recommend wearing a helmet at all times. Additionally, consider knee and elbow pads, especially for new riders. Always wear closed-toe shoes and avoid loose clothing.'),
('safety', 'What''s the maximum speed of the scooters?', 'Our scooters have a top speed of 15 mph to ensure rider safety while still providing an efficient commuting experience. Speed can be adjusted through our mobile app.'),
('account', 'How do I create an account?', 'Download our mobile app and tap ''Sign Up''. You''ll need to provide a valid email, phone number, and upload a photo of your driver''s license for verification.'),
('account', 'Can I share my account with family members?', 'Each rider must have their own account for safety and liability reasons. However, you can add multiple payment methods and manage rides for family members through our family plan.'),
('locations', 'Where can I find available scooters?', 'Use our mobile app to see real-time scooter locations on the map. Scooters are typically found near transit stops, business districts, and popular destinations.'),
('locations', 'Where can I park the scooter after my ride?', 'Park scooters upright in designated parking areas, bike racks, or against buildings. Avoid blocking sidewalks, doorways, or wheelchair access points.'),
('maintenance', 'What should I do if the scooter isn''t working properly?', 'If you encounter any issues, end your ride immediately through the app and report the problem. Our team will inspect and repair the scooter before it''s made available again.'),
('maintenance', 'How often are scooters maintained?', 'All scooters undergo daily safety checks and regular maintenance every 2-3 days. We have a dedicated team that ensures each scooter meets our safety standards.');
