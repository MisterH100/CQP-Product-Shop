"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { IProduct, useGlobalContext } from "@/lib/global_context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";

const SummaryPage = () => {
  const { orderData } = useGlobalContext();
  const [orderedItems, setOrderedItems] = useState<IProduct[]>([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderDate, setOrderDate] = useState<Date>();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getProductOrders = (orderNumber: string) => {
    axios
      .get(
        `https://nodeserver-v2.onrender.com/api/order_products/${orderNumber}`
      )
      .then((response) => {
        setOrderedItems(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setOrderDate(orderData.order_date);
    setAddress(orderData.address);
    setOrderNumber(orderData.order_number);
    if (orderData.order_number) {
      getProductOrders(orderData.order_number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="min-h-screen mb-40">
      <Card>
        <CardHeader>
          <CardTitle>Delivery</CardTitle>
          <CardDescription>
            Deliveries are expected to arrive within two working days.{" "}
            <Link className="text-blue-800" href="/learn-more/deliveries">
              Learn more
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="text-base">Ordered items</CardTitle>
          </CardHeader>
          <div className="grid grid-cols-3">
            {orderedItems.map((orderedItem) => (
              <div key={orderedItem._id}>
                <Image
                  src={orderedItem.images[0]}
                  alt={orderedItem.name}
                  className="w-10 h-10 object-cover"
                  width={500}
                  height={500}
                />
                <span className="text-xs">
                  {orderedItem.name}
                  {"("}
                  {orderedItem.quantity}
                  {")"}
                </span>
              </div>
            ))}
          </div>
          <div>
            <CardHeader className="px-0">
              <CardTitle className="text-base">Details</CardTitle>
              <CardDescription>Order number: {orderNumber}</CardDescription>
              <CardDescription>Payment method: Cash</CardDescription>
              <CardDescription>Address: {address}</CardDescription>
              <CardDescription>
                Order date:
                {orderDate ? new Date(orderDate).getDate() : ""}{" "}
                {orderDate ? months[new Date(orderDate).getMonth()] : ""}{" "}
                {orderDate ? new Date(orderDate).getFullYear() : ""}
              </CardDescription>
              <CardDescription>
                ETA:{" "}
                {orderDate
                  ? new Date(
                      new Date(orderDate).setDate(
                        new Date(orderDate).getDate() + 2
                      )
                    ).getDate()
                  : ""}{" "}
                {orderDate
                  ? months[
                      new Date(
                        new Date(orderDate).setDate(
                          new Date(orderDate).getDate() + 2
                        )
                      ).getMonth()
                    ]
                  : ""}{" "}
                {new Date(Date.now()).getFullYear()}
              </CardDescription>
            </CardHeader>
          </div>
          <CardFooter className="flex-col items-center">
            <p>Thank you for shopping with us :{")"}</p>
            <div className="pt-4">
              <Link
                className={`${buttonVariants({
                  variant: "default",
                })} rounded-2xl`}
                href="/"
              >
                {" "}
                continue shopping
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </section>
  );
};

export default SummaryPage;
