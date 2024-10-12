"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";

interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  date: string;
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the latest order from your JSON server
    const fetchLatestOrder = async () => {
      try {
        const response = await fetch(
          "http://localhost:5500/orders?_sort=date&_order=desc&_limit=1",
        );
        if (response.ok) {
          const orders = await response.json();
          if (orders.length > 0) {
            setOrder(orders[0]);
          }
        } else {
          console.error("Failed to fetch order");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchLatestOrder();
  }, []);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center py-12">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <CardTitle className="text-2xl font-bold">
                Order Confirmed
              </CardTitle>
            </div>
            <CardDescription>Thank you for your purchase!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Order Details</h3>
                <p className="text-sm text-muted-foreground">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold">Items</h3>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => router.push("/products")}>
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}
