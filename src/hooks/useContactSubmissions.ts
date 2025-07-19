
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface ContactSubmission {
  id: string;
  user_id: string;
  email: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  created_at: string;
}

export const useContactSubmissions = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const submitContactForm = async (email: string, message: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit a contact form",
        variant: "destructive",
      });
      return { success: false, error: "Not authenticated" };
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            user_id: user.id,
            email,
            message,
            status: 'new'
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error submitting contact form:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your message. Please try again.",
          variant: "destructive",
        });
        return { success: false, error: error.message };
      }

      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you soon.",
      });

      return { success: true, data };
    } catch (err) {
      console.error('Unexpected error:', err);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { success: false, error: "Unexpected error" };
    } finally {
      setLoading(false);
    }
  };

  return {
    submitContactForm,
    loading
  };
};
