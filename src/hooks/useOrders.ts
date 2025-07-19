
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Order {
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

export interface CreateOrderData {
  profile_id: string;
  quantity: number;
  description: string;
  order_date: string;
  status: string;
}

export interface UpdateOrderData {
  id: string;
  quantity?: number;
  description?: string;
  order_date?: string;
  status?: string;
}

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      console.log('Fetching all orders...');
      
      // Fetch all orders without any filtering
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw ordersError;
      }

      console.log('All orders fetched:', ordersData?.length || 0);

      // Fetch all profiles to get email information
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email');

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        console.log('Continuing without profile data...');
      }

      console.log('Profiles fetched:', profilesData?.length || 0);

      // Combine the data
      const ordersWithProfiles = ordersData?.map(order => ({
        ...order,
        profiles: profilesData?.find(profile => profile.id === order.profile_id) || { email: 'Unknown' }
      })) || [];

      console.log('Final orders with profiles:', ordersWithProfiles);
      return ordersWithProfiles as Order[];
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      toast({
        title: "Order Created",
        description: "Order has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
      console.error('Create order error:', error);
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: UpdateOrderData) => {
      const { id, ...updateData } = orderData;
      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['user-orders'] });
      toast({
        title: "Order Updated",
        description: "Order has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update order. Please try again.",
        variant: "destructive",
      });
      console.error('Update order error:', error);
    },
  });
};

export const useProfiles = () => {
  return useQuery({
    queryKey: ['verified-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .eq('email_verified', true)
        .order('email');

      if (error) throw error;
      return data;
    },
  });
};

export const useAllProfiles = () => {
  return useQuery({
    queryKey: ['all-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email')
        .order('email');

      if (error) throw error;
      return data;
    },
  });
};
