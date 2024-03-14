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
import { IProduct } from "@/lib/global_context";
import { Skeleton } from "@/components/layout/skeleton";
import { randsSA } from "@/lib/format_to_rand";

const ProductsPage = () => {
  const productData = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      const res: any = await fetch(
        "https://nodeserver-v2.onrender.com/api/products"
      );
      const data = await res.json();
      return data;
    },
  });

  if (productData.error) {
    return <div>{productData.error.message}</div>;
  }
  return (
    <section className="min-h-screen px-4 md:px-10 pb-40">
      <div className="py-6">
        <Search />
      </div>
      {productData.isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <Skeleton className="h-[125px] rounded-2xl" />
              <div className="mt-2">
                <Skeleton className="h-4 mb-2" />
                <Skeleton className="h-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {productData.data.map((product: IProduct) => (
            <Link key={product._id} href={`/product/${product._id}`}>
              <Card className="rounded-2xl overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-[200px] object-cover"
                  width={500}
                  height={500}
                />
                <CardHeader className="p-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="font-normal text-sm truncate">
                      {product.name}
                    </CardTitle>
                    <CardTitle className="text-sm">
                      {randsSA.format(product.price)}
                    </CardTitle>
                  </div>
                  <CardDescription>{product.brand}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
