"use client";
import { Button } from "@/components/ui/button";
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

const ProductPage = ({
  params: { product_id },
}: {
  params: { product_id: string };
}) => {
  const { addToCart } = useGlobalContext();
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

  if (product.error) {
    return <div>{product.error.message}</div>;
  }
  return (
    <section className="min-h-screen px-4 md:px-10 pb-40">
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
            <Image
              src={product.data.images[0]}
              alt={product.data.name}
              className="w-full h-[500px] object-contain"
              width={500}
              height={500}
            />
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{product.data.name}</CardTitle>
                <CardTitle>{randsSA.format(product.data.price)}</CardTitle>
              </div>
              <CardDescription>{product.data.brand}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{product.data.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto border rounded-2xl"
                variant="secondary"
                disabled={product.data.in_stock < 1}
                onClick={() => addToCart(product.data._id, 1)}
              >
                {product.data.in_stock < 1 ? "Sold out" : "Add to cart"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ProductPage;
