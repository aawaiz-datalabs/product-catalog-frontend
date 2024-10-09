"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const items = [
  {
    key: "Men's Clothing",
    imageLight: "/images/product range/men-clothing.png",
    imageDark: "/images/product range/white-men-clothing.png",
    title: "Men's Clothing",
  },
  {
    key: "Women's Clothing",
    imageLight: "/images/product range/women-clothings.png",
    imageDark: "/images/product range/white-women-clothings.png",
    title: "Women's Clothing",
  },
  {
    key: "Jewellery",
    imageLight: "/images/product range/jewellery.png",
    imageDark: "/images/product range/white-jewellery.png",
    title: "Jewellery",
  },
  {
    key: "Electronics",
    imageLight: "/images/product range/electronics.png",
    imageDark: "/images/product range/white-electronics.png",
    title: "Electronics",
  },
];

export function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <Carousel>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem
            key={item.key}
            className={activeIndex === index ? "block" : "hidden"}
          >
            <div className="p-1">
              <Card className="flex flex-col items-center justify-between p-4">
                <Image
                  src={item.imageLight}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="dark:hidden"
                />
                <Image
                  src={item.imageDark}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="hidden dark:block"
                />
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
