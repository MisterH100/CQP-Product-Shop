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
import { BellIcon, ArrowLeftIcon, UserIcon } from "lucide-react";
import jumbotronImage from "@/public/jumbotron-ps.png";
import externalWearBanner from "@/public/external-wear-1.jpg";
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
  const { setSelected, user, setUser } = useGlobalContext();
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
        "https://nodeserver-v2.onrender.com/api/products/all"
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

  const phoneData = useQuery({
    queryKey: ["phones"],
    queryFn: async () => {
      const res: any = await fetch(
        "https://nodeserver-v2.onrender.com/api/products/category/phones"
      );
      const data = await res.json();
      return data;
    },
  });

  const shoeData = useQuery({
    queryKey: ["shoes"],
    queryFn: async () => {
      const res: any = await fetch(
        "https://nodeserver-v2.onrender.com/api/products/category/shoes"
      );
      const data = await res.json();
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
    <section className="relative w-full min-h-screen pb-20">
      <Card className="border-none">
        <div className="flex justify-between items-center pr-6">
          <CardHeader className="w-full">
            <Link
              href={user.first_name ? "/account" : "/"}
              className="flex items-center"
            >
              {user.first_name && (
                <Image
                  src={user.profileImage}
                  alt="Profile Image"
                  width={50}
                  height={50}
                  loading="lazy"
                />
              )}
              <div className="ml-2">
                <CardTitle className="text-lg">
                  Hi{" "}
                  {user.first_name != null
                    ? user.first_name.toUpperCase()
                    : "Shopper"}
                </CardTitle>
                <CardDescription className="text-sm">
                  What do you feel like getting today
                </CardDescription>
              </div>
            </Link>
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
              {user.first_name != null ? (
                <BellIcon className="w-6 h-6" />
              ) : (
                <UserIcon className="w-6 h-6" />
              )}
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Notifications</DrawerTitle>
                <DrawerDescription>
                  Notifications about products on sale and more
                </DrawerDescription>
              </DrawerHeader>
              <CardContent>
                {user.first_name != null ? (
                  notificationData.isLoading ? (
                    <CardHeader>
                      <CardTitle>Fetching notifications</CardTitle>
                    </CardHeader>
                  ) : !open ? (
                    <ScrollArea className="h-[300px] w-full">
                      {notifications.map((notification: INotification) => (
                        <CardHeader
                          key={notification._id}
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
                  )
                ) : !open ? (
                  <>
                    <CardHeader
                      key={notification._id}
                      onClick={() => {
                        setNotification(notification);
                        setOpen(true);
                      }}
                    >
                      <CardTitle className="flex items-center justify-between">
                        Personalize your shopping experience
                        <Badge variant="destructive">1</Badge>
                      </CardTitle>
                      <CardDescription>
                        Open an account to personalize your shopping experience
                      </CardDescription>
                    </CardHeader>
                    <div className="w-full px-6 pt-2">
                      <Link
                        href="/register"
                        className={`${buttonVariants({
                          variant: "default",
                        })} w-full rounded-2xl`}
                      >
                        Register
                      </Link>
                      <Link
                        href="/login"
                        className={`${buttonVariants({
                          variant: "secondary",
                        })} w-full rounded-2xl mt-4`}
                      >
                        Log in
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <CardHeader className="flex-row justify-between items-center">
                      <CardTitle>
                        Personalize your shopping experience
                      </CardTitle>
                      <Button
                        onClick={() => setOpen(false)}
                        variant="outline"
                        className="rounded-full"
                      >
                        <ArrowLeftIcon className=" w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <p className="px-6">
                      Open an account to personalize your shopping experience,
                      with an account you may get discount codes,make your
                      featured feed show the things you are interested in.
                    </p>
                    <div className="w-full px-6 pt-2">
                      <Link
                        href="/register"
                        className={`${buttonVariants({
                          variant: "default",
                        })} w-full rounded-2xl`}
                      >
                        Register
                      </Link>
                      <Link
                        href="/login"
                        className={`${buttonVariants({
                          variant: "secondary",
                        })} w-full rounded-2xl mt-4`}
                      >
                        Log in
                      </Link>
                    </div>
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
      <div className="relative w-full h-[200px] md:h-[300px] my-4 px-4 md:px-10 rounded-2xl overflow-hidden bg-[#F5F5F5]">
        <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center px-4">
          <CardHeader>
            <CardTitle className="font-normal text-2xl md:text-5xl tracking-[4px] ">
              external wear sa.
            </CardTitle>
          </CardHeader>
        </div>
      </div>
      <div className="px-4 md:px-10 py-4">
        <h1 className="text-2xl py-4 font-medium leading-none tracking-tight">
          Featured Products
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:place-items-center">
            {featuredProducts.map((product: IProduct) => (
              <Link
                key={product._id}
                onClick={() => setSelected("")}
                href={`/product/${product._id}`}
              >
                <Card className="relative rounded-2xl overflow-hidden md:w-[300px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[200px] object-cover md:object-contain"
                    width={500}
                    height={500}
                  />
                  <Badge className="absolute top-4 right-4" variant="default">
                    New
                  </Badge>
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
                        <CardDescription className="text-primary">
                          Sold out
                        </CardDescription>
                      )}
                    </div>
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
      <div className="px-4 md:px-10 py-4">
        <h1 className="text-2xl py-4 font-medium leading-none tracking-tight">
          Phones
        </h1>
        {phoneData.isLoading ? (
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
            {phoneData.data.slice(0, 4).map((product: IProduct) => (
              <Link
                key={product._id}
                onClick={() => setSelected("")}
                href={`/product/${product._id}`}
              >
                <Card className="relative rounded-2xl overflow-hidden md:w-[300px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[200px] object-cover md:object-contain"
                    width={500}
                    height={500}
                  />
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
                        <CardDescription className="text-primary">
                          Sold out
                        </CardDescription>
                      )}
                    </div>
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
      <div className="px-4 md:px-10 py-4">
        <h1 className="text-2xl py-4 font-medium leading-none tracking-tight">
          Shoes
        </h1>
        {shoeData.isLoading ? (
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
            {shoeData.data.slice(0, 4).map((product: IProduct) => (
              <Link
                key={product._id}
                onClick={() => setSelected("")}
                href={`/product/${product._id}`}
              >
                <Card className="relative rounded-2xl overflow-hidden md:w-[300px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-[200px] object-cover md:object-contain"
                    width={500}
                    height={500}
                  />
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
                        <CardDescription className="text-primary">
                          Sold out
                        </CardDescription>
                      )}
                    </div>
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
