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
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface IOrders {
  _id: string;
  order_number: string;
  address: string;
  products: IProduct[];
  orderDate: Date;
}

const OrderPage = () => {
  const { user, setSelected } = useGlobalContext();
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    axios
      .get(`https://nodeserver-v2.onrender.com/api/orders/${user.email}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="min-h-screen pb-40">
      <Card>
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Your orders</CardDescription>
          </CardHeader>
          <Link
            onClick={() => setSelected("Home")}
            href="/"
            className={` ${buttonVariants({
              variant: "outline",
              className: "rounded-full p-4",
            })} `}
          >
            Back
          </Link>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Order details</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.map((order) => (
            <>
              <Separator className="mt-4" />
              <div key={order._id}>
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
            </>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default OrderPage;
