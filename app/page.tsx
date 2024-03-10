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

import { buttonVariants } from "@/components/ui/button";
import { Search } from "@/components/ui/search_field";
import { BellIcon } from "lucide-react";
import jumbotronImage from "@/public/jumbotron-ps.png";
import exampleImage from "@/public/men.jpg";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <section className="relative w-full min-h-screen">
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
              })} rounded-full p-4`}
            >
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
                {Array.from({ length: 10 }).map((_, index) => (
                  <p>notification{index + 1}</p>
                ))}
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Link href="/product/1">
              <Card className="rounded-2xl overflow-hidden">
                <Image
                  src={exampleImage}
                  alt="men.jpg"
                  className="w-full h-[200px] object-cover"
                  width={736}
                  height={981}
                />
                <CardHeader className="p-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Item{index + 1}</CardTitle>
                    <CardTitle className="text-lg">R200</CardTitle>
                  </div>
                  <CardDescription>item description</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        <div className="w-full flex justify-center py-4">
          <Link
            href="/products"
            className={buttonVariants({ variant: "outline" })}
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
