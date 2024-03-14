"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Search } from "@/components/ui/search_field";
import { BellIcon, ArrowLeftIcon } from "lucide-react";
import jumbotronImage from "@/public/jumbotron-ps.png";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  INotification,
  IProduct,
  useGlobalContext,
} from "@/lib/global_context";
import Notifications from "@/lib/notifications.json";
import { Skeleton } from "@/components/layout/skeleton";
import { Badge } from "@/components/ui/badge";
import { randsSA } from "@/lib/format_to_rand";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

const Home = () => {
  const { setSelected } = useGlobalContext();
  const [featuredProducts, setFeaturedProducts] = useState<IProduct[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [notRead, setNotRead] = useState<INotification[]>([]);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState<INotification>(
    {} as INotification
  );
  const productData = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res: any = await fetch(
        "https://nodeserver-v2.onrender.com/api/products"
      );
      const data = await res.json();
      return data;
    },
  });
  const notificationData = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const data: any = Notifications;
      return data;
    },
  });

  useEffect(() => {
    if (productData.data) {
      setFeaturedProducts(productData.data.slice(0, 4));
    }
    if (notificationData.data) {
      setNotifications(notificationData.data);
      setNotRead(
        notificationData.data.filter(
          (notification: INotification) => notification.read == false
        )
      );
    }
  }, [productData.data, notificationData.data]);

  return (
    <section className="relative w-full min-h-screen pb-40">
      <Card className="border-none">
        <div className="flex justify-between items-center pr-6">
          <CardHeader className="w-full">
            <CardDescription>Hi Shopper</CardDescription>
            <CardTitle>What do you feel like getting today?</CardTitle>
          </CardHeader>
          <Drawer>
            <DrawerTrigger
              className={`${buttonVariants({
                variant: "outline",
              })} relative rounded-full p-4`}
            >
              {notRead.length != 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 z-50"
                >
                  {notRead.length}
                </Badge>
              )}
              <BellIcon className="w-6 h-6" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>
                  Notifications about products on sale and more
                </DrawerDescription>
              </DrawerHeader>
              <CardContent>
                {notificationData.isLoading ? (
                  <CardHeader>
                    <CardTitle>Fetching notifications</CardTitle>
                  </CardHeader>
                ) : !open ? (
                  <ScrollArea className="h-[300px] w-full">
                    {notifications.map((notification: INotification) => (
                      <CardHeader
                        key={notification.id}
                        onClick={() => {
                          setNotification(notification);
                          setOpen(true);
                        }}
                      >
                        <CardTitle className="flex items-center justify-between">
                          {notification.title}
                          {!notification.read && (
                            <Badge variant="destructive">1</Badge>
                          )}
                        </CardTitle>
                        <CardDescription>
                          {notification.message}
                        </CardDescription>
                      </CardHeader>
                    ))}
                  </ScrollArea>
                ) : (
                  <div>
                    <CardHeader className="flex-row justify-between items-center">
                      <CardTitle>{notification.title}</CardTitle>
                      <Button
                        onClick={() => setOpen(false)}
                        variant="outline"
                        className="rounded-full"
                      >
                        <ArrowLeftIcon className=" w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <p className="px-6">{notification.message}</p>
                  </div>
                )}
              </CardContent>
            </DrawerContent>
          </Drawer>
        </div>
      </Card>
      <div className="py-4 px-4 md:px-10">
        <Search />
      </div>
      <div className="w-full h-[200px] md:h-[300px] my-4 px-4 md:px-10 rounded-2xl overflow-hidden">
        <Image
          src={jumbotronImage}
          alt="jumbotron-ps.png"
          className="w-full h-full rounded-2xl object-cover"
          width={1080}
          height={1920}
          priority
        />
      </div>
      <div className="px-4 md:px-10 py-4">
        <h1 className="text-2xl py-4 font-semibold leading-none tracking-tight">
          Featured
        </h1>
        {productData.isLoading ? (
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredProducts.map((product: IProduct) => (
              <Link
                key={product._id}
                onClick={() => setSelected("")}
                href={`/product/${product._id}`}
              >
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

export default Home;
