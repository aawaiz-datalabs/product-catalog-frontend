"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import { useAtom } from "jotai";
import { cartAtom } from "@/lib/atoms";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function getProduct(id: string): Promise<Product> {
  const result = await fetch(`http://localhost:5500/products/${id}`);
  return result.json();
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useAtom(cartAtom);
  const router = useRouter();

  useEffect(() => {
    getProduct(params.id).then(setProduct);
  }, [params.id]);

  const addToCart = () => {
    if (product) {
      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        );
      } else {
        setCart([
          ...cart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ]);
      }
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="py-10">
      <Container>
        <Button onClick={() => router.back()} className="mb-6">
          Back to Products
        </Button>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative h-96 md:h-full">
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
              <p className="mb-4 text-lg text-muted-foreground">
                {product.category}
              </p>
              <p className="mb-6 text-xl font-semibold">
                ₹{product.price.toFixed(2)}
              </p>
              <div className="mb-6 flex items-center">
                <p className="mr-4 text-lg">Rating: {product.rating.rate}/5</p>
                <p className="text-lg">({product.rating.count} reviews)</p>
              </div>
              <p className="mb-6 text-lg">{product.description}</p>
            </div>
            <Button size="lg" onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
