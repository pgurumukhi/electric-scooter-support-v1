import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateOrder, useProfiles, useAllProfiles, CreateOrderData } from "@/hooks/useOrders";
import { useIsAdmin } from "@/hooks/useProfile";

const formSchema = z.object({
  profile_id: z.string().min(1, "Profile is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  description: z.string().min(1, "Description is required"),
  order_date: z.string().min(1, "Order date is required"),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
});

type FormData = z.infer<typeof formSchema>;

const AddOrderDialog = () => {
  const [open, setOpen] = useState(false);
  const isAdmin = useIsAdmin();
  const { data: verifiedProfiles, isLoading: verifiedProfilesLoading } = useProfiles();
  const { data: allProfiles, isLoading: allProfilesLoading } = useAllProfiles();
  const createOrder = useCreateOrder();

  // Use all profiles for admin, verified profiles for regular users
  const profiles = isAdmin ? allProfiles : verifiedProfiles;
  const profilesLoading = isAdmin ? allProfilesLoading : verifiedProfilesLoading;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile_id: "",
      quantity: 1,
      description: "",
      order_date: new Date().toISOString().split('T')[0],
      status: "pending",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form data:", data);
      
      // Ensure the data matches CreateOrderData interface
      const orderData: CreateOrderData = {
        profile_id: data.profile_id,
        quantity: Number(data.quantity),
        description: data.description,
        order_date: data.order_date,
        status: data.status,
      };
      
      console.log("Order data to submit:", orderData);
      
      await createOrder.mutateAsync(orderData);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Create a new order for a customer. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="profile_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Email</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer email" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {profilesLoading ? (
                        <SelectItem value="" disabled>Loading profiles...</SelectItem>
                      ) : (
                        profiles?.map((profile) => (
                          <SelectItem key={profile.id} value={profile.id}>
                            {profile.email}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter order description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="order_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createOrder.isPending}>
                {createOrder.isPending ? "Creating..." : "Create Order"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
