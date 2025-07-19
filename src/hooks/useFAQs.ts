
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  created_at?: string;
  updated_at?: string;
}

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFAQs = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      setFaqs(data || []);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const refetch = useCallback(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  return { faqs, loading, error, refetch };
};
