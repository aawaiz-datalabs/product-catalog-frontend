"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { cartAtom } from "@/lib/atoms";
import { useUser } from "@/components/UserContext";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Supabase } from "@/lib/supabaseClient";

export default function CartPage() {
  const [cart, setCart] = useAtom(cartAtom); // Using Jotai atom
  const router = useRouter();
  const { user } = useUser();

  // Initialize Jotai atom from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart)); // Initialize the cart atom with data from localStorage
    }
  }, [setCart]);

  // Sync cartAtom with localStorage whenever the cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart)); // Persist cart to localStorage
    } else {
      localStorage.removeItem("cart"); // Clear localStorage if cart is empty
    }
  }, [cart]);

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      console.error("User not logged in");
      router.push("/login");
      return;
    }

    try {
      const { data, error } = await Supabase.rpc("create_order", {
        p_user_email: user.email,
        p_user_id: user.id,
        p_total_amount: total,
        p_items: cart.map((item) => ({
          item_id: item.id,
          quantity: item.quantity,
        })),
      });

      if (error) {
        throw new Error(error.message);
      }

      setCart([]); // Clear the Jotai atom (cart) after successful checkout
      localStorage.removeItem("cart"); // Clear cart from localStorage
      router.push("/order-summary");
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <Container>
      <main className="py-12">
        <Card className="mx-auto w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Your Cart</CardTitle>
          </CardHeader>
          <CardContent>
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <p className="text-muted-foreground">
                        ₹{item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        -
                      </Button>
                      <Label
                        htmlFor={`quantity-${item.id}`}
                        className="sr-only"
                      >
                        Quantity
                      </Label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value, 10))
                        }
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.title} from cart`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          {cart.length > 0 && (
            <CardFooter className="flex flex-col items-end space-y-4">
              <div className="text-right">
                <p className="text-xl">Total Quantity: {totalQuantity}</p>
                <p className="text-2xl font-bold">Total: ₹{total.toFixed(2)}</p>
              </div>
              <Button size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          )}
        </Card>
      </main>
    </Container>
  );
}
