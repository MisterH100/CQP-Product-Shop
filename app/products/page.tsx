import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "@/components/ui/search_field";

import exampleImage from "@/public/men.jpg";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
  return (
    <section className="min-h-screen px-4 md:px-10">
      <div className="py-6">
        <Search />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Link href="/product/1">
            <Card className="rounded-2xl overflow-hidden">
              <Image
                src={exampleImage}
                alt="men.jpg"
                className="w-full h-[200px] object-cover"
                width={736}
                height={981}
              />
              <CardHeader className="p-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Item{index + 1}</CardTitle>
                  <CardTitle className="text-lg">R200</CardTitle>
                </div>
                <CardDescription>item description</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
