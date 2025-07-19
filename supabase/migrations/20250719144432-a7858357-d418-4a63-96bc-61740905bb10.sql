
-- Insert sample FAQs for Billing, Technical, and Support categories
INSERT INTO public.faqs (category, question, answer) VALUES
-- Billing FAQs
('billing', 'How do I update my payment method?', 'You can update your payment method by going to your account settings and selecting "Payment Methods". Click "Add New Method" or "Edit" next to your existing payment method to make changes.'),
('billing', 'When will I be charged for my subscription?', 'You will be charged on the same date each month as your initial subscription date. For example, if you subscribed on the 15th, you will be charged on the 15th of each month.'),
('billing', 'Can I get a refund for my subscription?', 'We offer a 30-day money-back guarantee for new subscriptions. If you are not satisfied within the first 30 days, please contact our support team for a full refund.'),
('billing', 'How do I cancel my subscription?', 'You can cancel your subscription at any time by going to your account settings and selecting "Subscription". Click "Cancel Subscription" and follow the prompts. You will continue to have access until the end of your current billing period.'),
('billing', 'Do you offer discounts for annual plans?', 'Yes! We offer a 20% discount when you choose to pay annually instead of monthly. You can switch to an annual plan from your account settings.'),

-- Technical FAQs
('technical', 'The app is running slowly. What can I do?', 'Try clearing your browser cache and cookies first. If the issue persists, try using a different browser or check your internet connection. You can also try logging out and logging back in.'),
('technical', 'I cannot log into my account. What should I do?', 'First, make sure you are using the correct email address and password. If you have forgotten your password, use the "Forgot Password" link on the login page. If you continue to have issues, contact our support team.'),
('technical', 'How do I reset my password?', 'Click on the "Forgot Password" link on the login page, enter your email address, and we will send you instructions to reset your password. Check your spam folder if you do not see the email within a few minutes.'),
('technical', 'The website is not loading correctly. What can I do?', 'This is usually a browser-related issue. Try refreshing the page, clearing your browser cache, or trying a different browser. Make sure JavaScript is enabled in your browser settings.'),
('technical', 'How do I enable two-factor authentication?', 'Go to your account settings and select "Security". Click on "Enable Two-Factor Authentication" and follow the setup instructions using your preferred authenticator app.'),

-- Support FAQs
('support', 'How can I contact customer support?', 'You can contact our support team through the floating contact button on any page, by email at support@helpdesk.com, or through our live chat feature available 24/7.'),
('support', 'What are your support hours?', 'Our customer support team is available 24/7 to assist you. You can reach us anytime through live chat, email, or by submitting a support ticket through our contact form.'),
('support', 'How long does it take to get a response from support?', 'We typically respond to support inquiries within 2-4 hours during business hours and within 24 hours on weekends and holidays. Urgent issues are prioritized and handled faster.'),
('support', 'Can I schedule a call with support?', 'Yes! Premium subscribers can schedule a call with our support team. Go to your account settings and select "Schedule Support Call" to book a convenient time slot.'),
('support', 'How do I submit a feature request?', 'We love hearing from our users! You can submit feature requests through our contact form, selecting "Feature Request" as the category. Our product team reviews all suggestions regularly.');
