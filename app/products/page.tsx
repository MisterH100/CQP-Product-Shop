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
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";

const ProductsPage = () => {
  const [category, setCategory] = useState("all");
  const categories = ["all", "phones", "shoes"];

  const productData = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      const res: any = await fetch(
        "https://nodeserver-v2.onrender.com/api/products/all"
      );
      const data = await res.json();
      return data;
    },
  });

  const categorizedProductData = useQuery({
    queryKey: ["catProductData", category],
    queryFn: async () => {
      const res: any = await fetch(
        `https://nodeserver-v2.onrender.com/api/products/category/${category}`
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
      <div className="flex items-center gap-4 mb-10">
        {categories.map((cat, index) => (
          <Button
            key={index}
            onClick={() => {
              setCategory(cat);
            }}
            className={
              category === cat
                ? buttonVariants({ variant: "default" })
                : buttonVariants({ variant: "secondary" })
            }
          >
            {cat}
          </Button>
        ))}
      </div>
      {category == "all" && productData.isLoading ? (
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 md:place-items-center">
          {category == "all" &&
            productData.data.map((product: IProduct, index: number) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <Card className="relative rounded-2xl overflow-hidden md:w-[300px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[200px] object-cover md:object-contain"
                    width={500}
                    height={500}
                  />
                  {index < 4 && (
                    <Badge className="absolute top-4 right-4" variant="default">
                      New
                    </Badge>
                  )}
                  <CardHeader className="p-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-normal text-sm truncate">
                        {product.name}
                      </CardTitle>
                      <CardTitle className="text-sm font-normal">
                        {randsSA.format(product.price)}
                      </CardTitle>
                    </div>
                    <div className="flex justify-between items-center">
                      <CardDescription>{product.brand}</CardDescription>
                      {product.in_stock < 1 && (
                        <CardDescription className="text-primary">
                          Sold out
                        </CardDescription>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
        </div>
      )}
      {category != "all" && categorizedProductData.isLoading ? (
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 md:place-items-center">
          {category != "all" &&
            categorizedProductData.data.map(
              (product: IProduct, index: number) => (
                <Link key={product._id} href={`/product/${product._id}`}>
                  <Card className="relative rounded-2xl overflow-hidden md:w-[300px]">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-[200px] object-cover md:object-contain"
                      width={500}
                      height={500}
                    />
                    {index < 4 && (
                      <Badge
                        className="absolute top-4 right-4"
                        variant="default"
                      >
                        New
                      </Badge>
                    )}
                    <CardHeader className="p-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="font-normal text-sm truncate">
                          {product.name}
                        </CardTitle>
                        <CardTitle className="text-sm font-normal">
                          {randsSA.format(product.price)}
                        </CardTitle>
                      </div>
                      <div className="flex justify-between items-center">
                        <CardDescription>{product.brand}</CardDescription>
                        {product.in_stock < 1 && (
                          <CardDescription className="text-primary">
                            Sold out
                          </CardDescription>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              )
            )}
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
