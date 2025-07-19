
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserOrder {
  id: string;
  profile_id: string;
  quantity: number;
  description: string;
  order_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    email: string;
  };
}

export const useUserOrders = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-orders', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles!inner(email)
        `)
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserOrder[];
    },
    enabled: !!user,
  });
};
