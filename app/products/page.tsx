"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "@/components/ui/search_field";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Products from "@/lib/data.json";
import { IProduct } from "@/lib/global_context";

const ProductsPage = () => {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data: any = Products;
      return data;
    },
  });

  if (products.isLoading) {
    return <div>Loading...</div>;
  }
  if (products.error) {
    return <div>{products.error.message}</div>;
  }
  return (
    <section className="min-h-screen px-4 md:px-10">
      <div className="py-6">
        <Search />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.data.map((product: IProduct) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                className="w-full h-[200px] object-cover"
                width={500}
                height={500}
              />
              <CardHeader className="p-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardTitle className="text-base">{product.price}</CardTitle>
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

export default ProductsPage;
