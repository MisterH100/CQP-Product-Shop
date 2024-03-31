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
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Search } from "@/components/ui/search_field";
import {
  BellIcon,
  ArrowLeftIcon,
  UserIcon,
  LogOutIcon,
  FormInputIcon,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  INotification,
  IProduct,
  useGlobalContext,
} from "@/lib/global_context";
import { Skeleton } from "@/components/layout/skeleton";
import { Badge } from "@/components/ui/badge";
import { randsSA } from "@/lib/format_to_rand";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import externalWearBanner from "@/public/externalwearbanner.png";
const Home = () => {
  const router = useRouter();
  const { setSelected, user, notifications, setNotifications, logOut } =
    useGlobalContext();
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
      const data: any = notifications;
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

  const readNotification = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item._id == id ? { ...item, read: true } : { ...item }
      )
    );
    setNotRead(
      notifications.filter((notification) => notification.read == false)
    );
  };

  const addNewNotification = (notif: INotification) => {
    if (
      notifications.find(
        (notification: INotification) => notification._id == notif._id
      )
    ) {
      return;
    }
    setNotifications([...notifications, notif]);
  };

  useEffect(() => {
    if (user.first_name) {
      addNewNotification({
        _id: "notif1",
        title: "Account verification",
        message: `Hi ${user.first_name} ${user.last_name}, you have successfully logged in to external wear sa, email address: ${user.email}`,
        read: false,
        public: false,
      });
    } else {
      addNewNotification({
        _id: "notif2",
        title: "Personalize your shopping experience",
        message:
          "Register or login to your account to make purchases and have a more personal shopping experience",
        read: false,
        public: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (notificationData.data) {
      setNotRead(
        notificationData.data.filter(
          (notification: INotification) => notification.read == false
        )
      );
    }
  }, [notificationData.data]);

  return (
    <section className="relative w-full min-h-screen pb-10">
      <Card className="border-none">
        <div className="flex justify-between items-center pr-6">
          <CardHeader className="w-full">
            <Menubar className="border-none px-0">
              <MenubarMenu>
                <MenubarTrigger className="px-0">
                  <div className="flex items-center">
                    {user.first_name && (
                      <Image
                        src={user.profileImage}
                        alt="Profile Image"
                        width={50}
                        height={50}
                        loading="lazy"
                      />
                    )}
                    <div className="text-left ml-2">
                      {user.first_name != null ? (
                        <CardTitle className="text-lg font-medium capitalize">
                          Hi {user.first_name}{" "}
                          <ChevronDown className="inline-block w-4 h-4" />
                        </CardTitle>
                      ) : (
                        <CardTitle className="relative text-2xl font-medium capitalize">
                          externalwear
                          <span className="text-xs absolute -top-2 -right-5">
                            ZA
                          </span>
                        </CardTitle>
                      )}
                    </div>
                  </div>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() =>
                      router.push(user.first_name ? "/account" : "/login")
                    }
                  >
                    Account
                    <MenubarShortcut>
                      <UserIcon className="w-4 h-4" />
                    </MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  {user.first_name ? (
                    <MenubarItem
                      onClick={() => {
                        logOut();
                        router.push("/");
                      }}
                    >
                      Logout
                      <MenubarShortcut>
                        <LogOutIcon className="w-4 h-4" />
                      </MenubarShortcut>
                    </MenubarItem>
                  ) : (
                    <MenubarItem
                      onClick={() => {
                        router.push("/register");
                      }}
                    >
                      Sign Up
                      <MenubarShortcut>
                        <FormInputIcon className="w-4 h-4" />
                      </MenubarShortcut>
                    </MenubarItem>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
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
            <DrawerContent className="min-h-[400px] md:max-w-[1100px] md:mx-auto">
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
                        key={notification._id}
                        onClick={() => {
                          setNotification(notification);
                          setOpen(true);
                          readNotification(notification._id);
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

                    {!user.first_name && (
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
                            variant: "outline",
                          })} w-full rounded-2xl mt-4`}
                        >
                          Log in
                        </Link>
                      </div>
                    )}
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
      <div className="relative w-full h-[200px] flex justify-center md:h-[300px] my-4 px-4 md:px-10 overflow-hidden bg-[#ffffff]">
        <Image
          className="w-auto h-full object-contain"
          src={externalWearBanner}
          alt="external wear sa"
          width={800}
          height={300}
          priority
        />
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
            {productData.data.slice(0, 4).map((product: IProduct) => (
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
                    <Badge
                      className="absolute top-4 right-4"
                      variant="destructive"
                    >
                      New
                    </Badge>
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
            {phoneData.data.slice(4, 8).map((product: IProduct) => (
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
