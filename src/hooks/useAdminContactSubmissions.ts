
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

interface UseAdminContactSubmissionsOptions {
  status?: 'all' | 'new' | 'in_progress' | 'resolved';
  page?: number;
  limit?: number;
}

export const useAdminContactSubmissions = (options: UseAdminContactSubmissionsOptions = {}) => {
  const { status = 'all', page = 1, limit = 5 } = options;
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-contact-submissions', status, page, limit],
    queryFn: async () => {
      let query = supabase
        .from('contact_submissions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      // Apply status filter if not 'all'
      if (status !== 'all') {
        query = query.eq('status', status);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;
      query = query.range(from, to);

      const { data: submissions, error, count } = await query;

      if (error) {
        throw error;
      }

      return {
        submissions: submissions as AdminContactSubmission[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      };
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
    submissions: data?.submissions || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    refetch,
    updateSubmission,
    isUpdating: updateSubmissionMutation.isPending
  };
};
