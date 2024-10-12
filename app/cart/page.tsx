"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "@/lib/atoms";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/UserContext"; // Import the UserContext

export default function CartPage() {
  const [cart, setCart] = useAtom(cartAtom);
  const router = useRouter();
  const { user } = useUser(); // Get the user from UserContext

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
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
      // You might want to redirect to login page or show an error message
      return;
    }

    try {
      const response = await fetch("http://localhost:5500/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          total: total,
          date: new Date().toISOString(),
          userEmail: user.email, // Include the user's email
          status: "Placed", // Add the default status field
        }),
      });

      if (response.ok) {
        setCart([]);
        router.push("/order-summary");
      } else {
        console.error("Failed to create order");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <main className="py-12">
      <Container>
        <h1 className="mb-6 text-3xl font-bold">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
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
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-xl">Total Quantity: {totalQuantity}</p>
              <p className="text-2xl font-bold">Total: ₹{total.toFixed(2)}</p>
              <Button size="lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Container>
    </main>
  );
}
