"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { useQuery } from "@tanstack/react-query";
import { randsSA } from "@/lib/format_to_rand";
import { IProduct, useGlobalContext } from "@/lib/global_context";
import { Skeleton } from "@/components/layout/skeleton";
import { ShareIcon, ImagesIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  params: { product_id: string };
};

const ProductPage = ({ params }: Props) => {
  const product_id = params.product_id;
  const { addToCart, setSelected } = useGlobalContext();
  const product = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res: any = await fetch(
        `https://nodeserver-v2.onrender.com/api/products/id/${product_id}`
      );
      const data = await res.json();
      return data;
    },
  });

  const category = product.data ? product.data.category : null;

  const similarProducts = useQuery({
    queryKey: ["similarProducts", category],
    queryFn: async () => {
      const res: any = await fetch(
        `https://nodeserver-v2.onrender.com/api/products/category/${category}`
      );
      const data = await res.json();
      return data;
    },
    enabled: !!category,
  });

  if (product.error) {
    return <div>{product.error.message}</div>;
  }
  return (
    <section className="min-h-screen px-4 md:px-10 pb-10">
      <div className="py-6">
        <Search />
      </div>
      <div className="flex justify-center mt-4">
        {product.isLoading ? (
          <Card className="w-full md:w-2/3 mb-10 overflow-hidden">
            <Skeleton className="w-full h-[500px] rounded-2xl" />
            <div className="mt-2">
              <Skeleton className="h-4 mb-2" />
              <Skeleton className="h-4" />
            </div>
          </Card>
        ) : (
          <Card className="md:w-2/3 mb-10 overflow-hidden">
            <div className="relative w-full h-fit bg-[#ffffff]">
              <Image
                src={product.data.images[0]}
                alt={product.data.name}
                className="w-full h-[500px] object-contain"
                width={500}
                height={500}
              />
              <div className="w-full h-20 flex items-end  px-4 py-2 absolute bottom-0 left-0 bg-gradient-to-t from-secondary to-95%">
                <Button
                  variant={"ghost"}
                  className="rounded-2xl"
                  onClick={() =>
                    navigator.share({
                      title: product.data.name,
                      text: "Check out this product on externalwear",
                      url: `https://externalwear.co.za/product/${product.data._id}`,
                    })
                  }
                >
                  <ShareIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="font-normal truncate">
                  {product.data.name}
                </CardTitle>
                <CardTitle className="font-normal">
                  {randsSA.format(product.data.price)}
                </CardTitle>
              </div>
              <CardDescription>{product.data.brand}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.data.description}</p>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <Link
                  href={`/product/${product.data._id}/gallery`}
                  className={`${buttonVariants({
                    variant: "ghost",
                  })} border rounded-2xl`}
                >
                  <ImagesIcon className="w-4 h-4 text-blue-500" />
                </Link>

                <Button
                  className="border rounded-2xl"
                  variant="secondary"
                  disabled={product.data.in_stock < 1}
                  onClick={() => addToCart(product.data._id, 1)}
                >
                  {product.data.in_stock < 1 ? "Sold out" : "Add to cart"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
      <div className="px-4 md:px-10 py-4">
        <h1 className="text-2xl py-4 font-medium leading-none tracking-tight">
          Similar Products
        </h1>
        {similarProducts.isPending ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:place-items-center">
            {similarProducts.data.slice(0, 9).map(
              (product: IProduct) =>
                product._id != product_id && (
                  <Link
                    key={product._id}
                    onClick={() => setSelected("")}
                    href={`/product/${product._id}`}
                  >
                    <Card className="relative rounded-2xl overflow-hidden md:w-[300px]">
                      <div className="w-full h-fit bg-[#ffffff]">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-[200px] object-contain"
                          width={500}
                          height={500}
                        />
                      </div>
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
                            <CardDescription className="text-destructive">
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
        <div className="w-full flex justify-center py-4">
          <Link
            onClick={() => setSelected("")}
            href="/products"
            className={`${buttonVariants({ variant: "outline" })} rounded-2xl`}
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
