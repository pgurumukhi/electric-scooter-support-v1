
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useFAQOperations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const refreshFAQs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error refreshing FAQs:', error);
      toast({
        title: "Error",
        description: "Failed to refresh FAQs. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    refreshFAQs,
    isLoading,
  };
};
</tml>
