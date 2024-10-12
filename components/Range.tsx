import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { H1 } from "./typography/HeadingsTypography";

function Range() {
  return (
    <div id="range" className="flex flex-col pt-20">
      <div className="items-center justify-center text-center">
        <H1 H1="Our Product Range" />
      </div>
      <div className="grid grid-cols-4 gap-10 pt-8">
        <Card
          key="Men's Clothing"
          className="flex flex-col items-center justify-between p-4"
        >
          <Image
            src="/images/product range/men-clothing.png"
            alt="Wave"
            width={200}
            height={200}
            className="dark:hidden"
          />
          <Image
            src="/images/product range/white-men-clothing.png"
            alt="Wave"
            width={200}
            height={200}
            className="hidden dark:block"
          />
          <CardHeader>
            <CardTitle>Men&apos;s Clothing</CardTitle>
          </CardHeader>
        </Card>
        <Card
          key="Women's Clothing"
          className="flex flex-col items-center justify-between p-4"
        >
          <Image
            src="/images/product range/women-clothings.png"
            alt="Wave"
            width={200}
            height={200}
            className="dark:hidden"
          />
          <Image
            src="/images/product range/white-women-clothings.png"
            alt="Wave"
            width={200}
            height={200}
            className="hidden dark:block"
          />
          <CardHeader>
            <CardTitle>Women&apos;s Clothing</CardTitle>
          </CardHeader>
        </Card>
        <Card
          key="Jewellery"
          className="flex flex-col items-center justify-between p-4"
        >
          <Image
            src="/images/product range/jewellery.png"
            alt="Wave"
            width={200}
            height={200}
            className="dark:hidden"
          />
          <Image
            src="/images/product range/white-jewellery.png"
            alt="Wave"
            width={200}
            height={200}
            className="hidden dark:block"
          />
          <CardHeader>
            <CardTitle>Jewellery</CardTitle>
          </CardHeader>
        </Card>
        <Card
          key="Electronics"
          className="flex flex-col items-center justify-between p-4"
        >
          <Image
            src="/images/product range/electronics.png"
            alt="Wave"
            width={200}
            height={200}
            className="dark:hidden"
          />
          <Image
            src="/images/product range/white-electronics.png"
            alt="Wave"
            width={200}
            height={200}
            className="hidden dark:block"
          />
          <CardHeader>
            <CardTitle>Electronics</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default Range;
