"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Products from "@/lib/products.json";
import { IProduct, useGlobalContext } from "@/lib/global_context";
import { Skeleton } from "@/components/layout/skeleton";
import { randsSA } from "@/lib/format_to_rand";
import { XIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Search } from "@/components/ui/search_field";

const SearchPage = ({ params: { query } }: { params: { query: string } }) => {
  const { setSelected } = useGlobalContext();

  const productData = useQuery({
    queryKey: ["productData"],
    queryFn: async () => {
      const res: any = await fetch(
        `https://nodeserver-v2.onrender.com/api/products/search/${query
          .replace(/\s+/g, "")
          .toLowerCase()}`
      );
      const data: any = await res.json();
      return data;
    },
  });

  if (productData.error) {
    return <div>{productData.error.message}</div>;
  }
  return (
    <section className="min-h-screen pb-40">
      <Card className="mb-4">
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Results</CardTitle>
            <CardDescription>"{query.replace(/\s+/g, "")}"</CardDescription>
          </CardHeader>
          <Link
            onClick={() => setSelected("Home")}
            href="/"
            className={` ${buttonVariants({
              variant: "outline",
            })} rounded-full p-4`}
          >
            <XIcon className="w-6 h-6" />
          </Link>
        </div>
      </Card>
      <div className="pb-6 px-4 md:px-10">
        <Search textValue={query.replace(/\s+/g, "")} />
      </div>
      {productData.isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-10">
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
      ) : productData.data.length > 1 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 md:px-10">
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
      ) : (
        <div>
          <CardContent>
            <p className="w-full text-center">Products not found :{"("}</p>
          </CardContent>
        </div>
      )}
    </section>
  );
};

export default SearchPage;
