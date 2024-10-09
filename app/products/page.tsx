import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface products {
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

import Container from "@/components/container";
import Image from "next/image";

async function getProducts(): Promise<products[]> {
  const result = await fetch("http://localhost:5500/products");
  return result.json();
}

export default async function products() {
  const products = await getProducts();

  return (
    <main>
      <Container>
        <div className="grid grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id}>
              <Image src={product.image} alt="Wave" width={300} height={300} />
              <CardHeader>
                <div>
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
              </CardContent>
              <CardFooter>
                <div>
                  <p>₹{product.price}</p>
                  <div className="flex justify-between">
                    <p>{product.rating.rate}</p>
                    <p>{product.rating.count}</p>
                  </div>
                  <button>View Details</button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
