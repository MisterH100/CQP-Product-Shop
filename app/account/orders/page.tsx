"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IProduct, useGlobalContext } from "@/lib/global_context";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/layout/skeleton";

interface IOrders {
  _id: string;
  order_number: string;
  address: string;
  products: IProduct[];
  orderDate: Date;
}

const OrderPage = () => {
  const { user, setSelected } = useGlobalContext();

  const orderData = useQuery({
    queryKey: ["orderData", user.email],
    queryFn: async () => {
      const res: any = await fetch(
        `https://nodeserver-v2.onrender.com/api/products/orders/email/${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <section className="min-h-screen pb-10">
      <Card>
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Your orders</CardDescription>
          </CardHeader>
          <Link
            onClick={() => setSelected("Home")}
            href="/account"
            className={` ${buttonVariants({
              variant: "outline",
              className: "rounded-full p-4",
            })} `}
          >
            Back
          </Link>
        </div>
      </Card>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Order details</CardTitle>
        </CardHeader>
        <CardContent>
          {orderData.isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="my-2">
                <Skeleton className="w-full h-[100px] rounded-2xl" />
                <div className="flex gap-4 mt-2">
                  <Skeleton className="w-10 h-10" />
                  <Skeleton className="w-10 h-10 ml-2" />
                  <Skeleton className="w-10 h-10 ml-2" />
                </div>
              </div>
            ))
          ) : orderData.data.length > 1 ? (
            orderData.data.map((order: IOrders) => (
              <div key={order._id}>
                <Separator className="my-4" />
                <div>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">
                      #{order.order_number}
                    </CardTitle>
                    <CardTitle className="text-sm font-medium">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </CardTitle>
                  </div>
                  <CardDescription>{order.address}</CardDescription>
                  <div className="flex gap-4">
                    {order.products.map((product) => (
                      <div key={product._id}>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          className="w-10 h-10 object-cover"
                          width={500}
                          height={500}
                        />
                        <span className="text-xs">
                          {product.name}
                          {"("}
                          {product.quantity}
                          {")"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p className="w-full text-center">No orders yet :{"("}</p>
              <div className="w-full flex justify-center pt-4">
                <Link
                  className={`${buttonVariants({
                    variant: "default",
                  })} rounded-2xl`}
                  href="/"
                >
                  start shopping
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default OrderPage;
