"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { XIcon } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Trash } from "lucide-react";
import { ShareIcon } from "lucide-react";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGlobalContext } from "@/lib/global_context";

const Cart = () => {
  const { setSelected, cartList, removeFromCart } = useGlobalContext();
  return (
    <section className="min-h-screen">
      <Card>
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Cart</CardTitle>
            <CardDescription>Check out your favorite items</CardDescription>
          </CardHeader>
          <Link
            onClick={() => setSelected("Home")}
            href="/"
            className={` ${buttonVariants({
              variant: "outline",
            })} rounded-full p-4`}
          >
            <XIcon className="w-6 h-6" />
          </Link>
        </div>
      </Card>
      <div className="px-4 md:px-10 mb-4">
        {cartList.map((item) => (
          <Card key={item.id} className="p-0 rounded-2xl mt-4 overflow-hidden">
            <div className="flex">
              <CardContent className="p-0 w-[100px] h-[100px]">
                <Image
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
              </CardContent>
              <CardHeader className="p-2 h-fit">
                <CardTitle className="text-base w-[110px] md:w-fit truncate">
                  {item.name}
                </CardTitle>
                <CardDescription>{item.price}</CardDescription>
              </CardHeader>
              <CardFooter className="relative p-0 ml-auto pt-4 pr-2">
                <Menubar className="absolute top-0 right-0 mr-2 border-none bg-transparent">
                  <MenubarMenu>
                    <MenubarTrigger className="p-0 outline-none">
                      <Ellipsis />
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={() => removeFromCart(item.id)}>
                        Delete
                        <MenubarShortcut>
                          <Trash className="w-4 h-4" />
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem>
                        Share
                        <MenubarShortcut>
                          <ShareIcon className="w-4 h-4" />
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        Add to favorites
                        <MenubarShortcut>
                          <StarIcon className="w-4 h-4" />
                        </MenubarShortcut>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
                <Button variant="outline">-</Button>
                <span className={buttonVariants({ variant: "outline" })}>
                  {item.quantity}
                </span>
                <Button variant="outline">+</Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Total: R1500</CardTitle>
          <CardDescription>Tax:0%</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full rounded-2xl" variant="default">
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Cart;
