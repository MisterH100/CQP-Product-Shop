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
import { IProduct } from "@/lib/global_context";
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const SummaryPage = () => {
  const [orderedItems, setOrderedItems] = useState<IProduct[]>([
    {
      _id: "65f0c66801fe90c8fb3b2d9d",
      name: "iPhone XR",
      brand: "Apple",
      description:
        "iPhone 11 64GB/128GB/256GB, refurbished iPhone accompanied by: lightning to USB cable,Screen protector, MagSafe Pouch and 5 months guarantee",
      price: 5800,
      in_stock: 10,
      quantity: 0,
      categories: ["apple", "phone", "tech", "iPhone", "ios"],
      images: [
        "https://res.cloudinary.com/dxrpjdomo/image/upload/v1710277633/Products/iphones/Apple_iPhone_XR_j4gpjk.jpg",
        "https://res.cloudinary.com/dxrpjdomo/image/upload/v1710277633/Products/iphones/Apple_iphone_XR_2_rbwyi0.jpg",
      ],
      createdAt: new Date("2024-03-12T21:17:28.263Z"),
      reviews: [],
    },
  ]);
  const [orderNumber, setOrderNumber] = useState("ofihqhfo3h283yu8hfohf8y");
  const [address, setAddress] = useState("123 my address max city country");
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

  useEffect(() => {
    setOrderDate(new Date(Date.now()));
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
                <span className="text-xs">{orderedItem.name}</span>
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
                      orderDate.setDate(orderDate.getDate() + 2)
                    ).getDate()
                  : ""}{" "}
                {orderDate
                  ? months[
                      new Date(
                        orderDate.setDate(orderDate.getDate() + 2)
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
