
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface AdminContactSubmission {
  id: string;
  user_id: string;
  email: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  response?: string;
  responded_at?: string;
  responded_by?: string;
  created_at: string;
}

export const useAdminContactSubmissions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, refetch } = useQuery({
    queryKey: ['admin-contact-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as AdminContactSubmission[];
    },
    enabled: !!user,
  });

  const updateSubmissionMutation = useMutation({
    mutationFn: async (variables: { 
      id: string; 
      response: string; 
      status: 'new' | 'in_progress' | 'resolved' 
    }) => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update({
          response: variables.response,
          status: variables.status,
          responded_at: new Date().toISOString(),
          responded_by: user?.id
        })
        .eq('id', variables.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contact-submissions'] });
      toast({
        title: "Response Sent",
        description: "The response has been saved successfully.",
      });
    },
    onError: (error) => {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "Failed to update the submission. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateSubmission = (id: string, response: string, status: 'new' | 'in_progress' | 'resolved') => {
    updateSubmissionMutation.mutate({ id, response, status });
  };

  return {
    submissions,
    isLoading,
    refetch,
    updateSubmission,
    isUpdating: updateSubmissionMutation.isPending
  };
};
