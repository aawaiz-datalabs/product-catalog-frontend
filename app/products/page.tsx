"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Container from "@/components/container";

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

async function getProducts(): Promise<Product[]> {
  const result = await fetch("http://localhost:5500/products");
  return result.json();
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    getProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
      const uniqueCategories = Array.from(
        new Set(fetchedProducts.map((product) => product.category)),
      );
      setCategories(["all", ...uniqueCategories]);
    });
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main className="py-10">
      <Container>
        <div className="mb-8">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <HoverCard key={product.id}>
              <HoverCardTrigger asChild>
                <Card className="flex cursor-pointer flex-col">
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.image}
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
                      className="p-4"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {product.title}
                    </CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{product.description}</p>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <div className="w-full">
                      <p className="mb-2 text-2xl font-bold">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Rating: {product.rating.rate}/5
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ({product.rating.count} reviews)
                        </p>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => router.push(`/products/${product.id}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{product.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="mb-2 text-sm font-semibold">Description:</h5>
                  <p className="text-sm">{product.description}</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </Container>
    </main>
  );
}
