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
import Products from "@/lib/products.json";
import { randsSA } from "@/lib/format_to_rand";
import { IProduct, useGlobalContext } from "@/lib/global_context";

const ProductPage = ({
  params: { product_id },
}: {
  params: { product_id: string };
}) => {
  const { addToCart } = useGlobalContext();
  const product = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const data: any = Products.find(
        (product) => product.id.toString() === product_id
      );
      return data;
    },
  });

  if (product.isLoading) {
    return <div>Loading...</div>;
  }
  if (product.error) {
    return <div>{product.error.message}</div>;
  }
  return (
    <section className="min-h-screen px-4 md:px-10">
      <div className="py-6">
        <Search />
      </div>
      <div className="flex justify-center mt-4">
        <Card className="md:w-2/3 mb-10 overflow-hidden">
          <Image
            src={product.data.image}
            alt={product.data.name}
            className="w-full h-[500px] object-cover"
            width={500}
            height={500}
          />
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{product.data.name}</CardTitle>
              <CardTitle>{randsSA.format(product.data.price)}</CardTitle>
            </div>
            <CardDescription>item description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{product.data.description}</p>
          </CardContent>
          <CardFooter>
            <Button
              className="ml-auto border rounded-2xl"
              variant="secondary"
              onClick={() => addToCart(product.data.id, 1)}
            >
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ProductPage;
