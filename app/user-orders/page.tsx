"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/components/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import OrderItemsList from "@/app/user-orders/OrderItemsList";
import { Badge } from "@/components/ui/badge"; // Import the Badge component

interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
  userEmail: string; // Add this field to associate orders with users
}

export default function UserOrders() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5500/orders`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const allOrders: Order[] = await response.json();

        // Filter orders to only include those associated with the logged-in user
        const userOrders = allOrders.filter(
          (order) => order.userEmail === user.email,
        );
        setOrders(userOrders);
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
                    {new Date(order.date).toLocaleDateString()}
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
                      ${order.total.toFixed(2)}
                    </span>
                  </span>
                </div>
                <OrderItemsList items={order.items || []} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
