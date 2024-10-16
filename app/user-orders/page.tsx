"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/components/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import OrderItemsList from "@/app/user-orders/OrderItemsList";
import { Badge } from "@/components/ui/badge";
import { Supabase } from "@/lib/supabaseClient";

// Define Product interface
interface Product {
  id: string;
  title: string;
  price: number;
}

// Define OrderItem interface
interface OrderItem {
  id: string;
  quantity: number;
  item_id: string;
  products: Product;
}

// Define the structure of the data returned by Supabase
interface SupabaseOrder {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  user_id: string;
  order_items: OrderItem[];
}

// Define the structure of the raw data returned by Supabase
interface RawSupabaseOrder {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  user_id: string;
  order_items: Array<{
    id: string;
    quantity: number;
    item_id: string;
    products: Product;
  }>;
}

export default function UserOrders() {
  const { user } = useUser();
  const [orders, setOrders] = useState<SupabaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data: ordersData, error: ordersError } = await Supabase.from(
          "orders",
        )
          .select(
            `
            id, 
            created_at, 
            total_amount, 
            status, 
            user_id, 
            order_items (
              id, 
              quantity, 
              item_id, 
              products (id, title, price)
            )
          `,
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (ordersError) throw ordersError;

        if (ordersData) {
          const formattedOrders: SupabaseOrder[] = (
            ordersData as unknown as RawSupabaseOrder[]
          ).map((order) => ({
            id: order.id,
            created_at: order.created_at,
            total_amount: order.total_amount,
            status: order.status,
            user_id: order.user_id,
            order_items: order.order_items.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              item_id: item.item_id,
              products: item.products,
            })),
          }));
          setOrders(formattedOrders);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (isLoading) {
    return <div className="container mx-auto p-4">Loading orders...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        Please log in to view your orders.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="grid gap-8">
          {orders.map((order) => (
            <Card key={order.id} className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Package className="mr-2" />
                    Order #{order.id}
                  </span>
                  <span className="text-sm font-normal">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex justify-between">
                  <span>
                    Status:{" "}
                    <Badge className="font-semibold">{order.status}</Badge>
                  </span>
                  <span>
                    Total:{" "}
                    <span className="font-semibold">
                      ${order.total_amount.toFixed(2)}
                    </span>
                  </span>
                </div>
                <OrderItemsList
                  items={order.order_items.map((item) => ({
                    id: item.id,
                    title: item.products.title,
                    quantity: item.quantity,
                    price: item.products.price,
                  }))}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
