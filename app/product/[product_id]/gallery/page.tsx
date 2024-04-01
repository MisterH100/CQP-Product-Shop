"use client";

import { Skeleton } from "@/components/layout/skeleton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: { product_id: string };
};

const GalleryPage = ({ params }: Props) => {
  const product_id = params.product_id;

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

  return (
    <section className="min-h-screen  pb-10">
      <Card className="rounded-none">
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Gallery</CardTitle>
            <CardDescription>Images related to this product</CardDescription>
          </CardHeader>
          <Link
            href={`/product/${product_id}/`}
            className={` ${buttonVariants({
              variant: "outline",
            })} rounded-full p-4`}
          >
            <ArrowLeftIcon className="w-6 h-6" />
            Back
          </Link>
        </div>
      </Card>
      {product.isLoading ? (
        <Card className="pt-6 border-none">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            <Skeleton className="w-full h-[300px] rounded-2xl mb-4 break-inside-avoid" />
            <Skeleton className="w-full h-[300px] rounded-2xl mb-4 break-inside-avoid" />
            <Skeleton className="w-full h-[300px] rounded-2xl mb-4 break-inside-avoid" />
            <Skeleton className="w-full h-[300px] rounded-2xl mb-4 break-inside-avoid" />
          </div>
        </Card>
      ) : (
        <Card className="pt-6 border-none">
          <CardContent>
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
              {product.data.images.map((image: string) => (
                <div key={image} className="w-full h-fit bg-[#ffffff] mb-4">
                  <Image
                    src={image}
                    alt={product.data.name}
                    className="w-full h-[300px] object-contain break-inside-avoid"
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default GalleryPage;
