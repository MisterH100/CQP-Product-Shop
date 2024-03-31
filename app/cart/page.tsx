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
import { XIcon, Ellipsis, Trash, ShareIcon, StarIcon } from "lucide-react";
import { randsSA } from "@/lib/format_to_rand";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/lib/global_context";

const Cart = () => {
  const router = useRouter();
  const {
    setSelected,
    cartList,
    setCartList,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useGlobalContext();
  const total = cartList
    .map((product) => {
      return product.price * product.quantity;
    })
    .reduce((prev, curr) => prev + curr, 0);
  return (
    <section className="min-h-screen pb-10">
      <Card>
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Cart</CardTitle>
            <CardDescription>Check out your favorite items</CardDescription>
          </CardHeader>
          <Button
            onClick={() => setCartList([])}
            variant="outline"
            className="rounded-full p-4"
          >
            <XIcon className="w-6 h-6" />
            Clear
          </Button>
        </div>
      </Card>
      <div className="px-4 md:px-10 mb-4">
        {cartList.map((item) => (
          <Card key={item._id} className="p-0 rounded-2xl mt-4 overflow-hidden">
            <div className="flex">
              <CardContent className="p-0 w-[100px] h-[100px]">
                <Link
                  onClick={() => setSelected("")}
                  href={`/product/${item._id}`}
                >
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </Link>
              </CardContent>
              <CardHeader className="p-2 h-fit">
                <CardTitle className="text-base w-[110px] md:w-fit truncate">
                  {item.name}
                </CardTitle>
                <CardDescription>{randsSA.format(item.price)}</CardDescription>
              </CardHeader>
              <CardFooter className="relative p-0 ml-auto pt-4 pr-2">
                <Menubar className="absolute top-0 right-0 mr-2 border-none bg-transparent">
                  <MenubarMenu>
                    <MenubarTrigger className="p-0 outline-none">
                      <Ellipsis />
                    </MenubarTrigger>
                    <MenubarContent>
                      <MenubarItem onClick={() => removeFromCart(item._id)}>
                        Delete
                        <MenubarShortcut>
                          <Trash className="w-4 h-4" />
                        </MenubarShortcut>
                      </MenubarItem>
                      <MenubarSeparator />
                      <MenubarItem
                        onClick={() =>
                          navigator.share({
                            title: item.name,
                            text: "Check out this product on external wear sa",
                            url: `https://externalwearsa.co.za/product/${item._id}`,
                          })
                        }
                      >
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
                <Button
                  onClick={() => decreaseCartQuantity(item._id)}
                  variant="outline"
                  disabled={item.quantity == 1}
                >
                  -
                </Button>
                <span className={buttonVariants({ variant: "outline" })}>
                  {item.quantity}
                </span>
                <Button
                  onClick={() => increaseCartQuantity(item._id)}
                  disabled={item.quantity == 10}
                  variant="outline"
                >
                  +
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Total: {total ? randsSA.format(total) : "0.00"}</CardTitle>
          <CardDescription>Tax:0%</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            onClick={() => router.push("/checkout")}
            disabled={cartList.length < 1}
            className="w-full rounded-2xl"
            variant="default"
          >
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Cart;
