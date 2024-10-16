"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@/components/UserContext";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface OrderItem {
  id: number;
  title: string;
  quantity: number;
  unit_price: number;
}

interface Order {
  id: string;
  user_email: string;
  total_amount: number;
  created_at: string;
  items: OrderItem[];
}

export default function OrderSummaryPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("orders")
          .select(
            `
            id,
            user_email,
            total_amount,
            created_at,
            order_items (
              id,
              item_id,
              quantity
            )
          `,
          )
          .eq("user_email", user.email)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;

        if (data) {
          // Fetch product details for each order item
          const itemsWithDetails = await Promise.all(
            data.order_items.map(async (item) => {
              const { data: productData } = await supabase
                .from("products")
                .select("title, price")
                .eq("id", item.item_id)
                .single();
              return {
                ...item,
                title: productData?.title || "Unknown Product",
                unit_price: productData?.price || 0,
              };
            }),
          );

          setOrder({
            ...data,
            items: itemsWithDetails,
          });
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestOrder();
  }, [user]);

  if (isLoading) {
    return (
      <Container>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg">Loading order details...</p>
        </div>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container>
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-lg">No recent order found.</p>
        </div>
      </Container>
    );
  }

  const calculateItemTotal = (item: OrderItem) =>
    item.quantity * item.unit_price;

  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center py-12">
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <CardTitle className="text-2xl font-bold">
                Order Summary
              </CardTitle>
            </div>
            <CardDescription>Details of your recent order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Order Details</h3>
                <p className="text-sm text-muted-foreground">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Item Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{item.unit_price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{calculateItemTotal(item).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{order.total_amount.toFixed(2)}</span>
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
