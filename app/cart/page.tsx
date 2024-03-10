import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { XIcon } from "lucide-react";
import Link from "next/link";
import exampleImage from "@/public/men.jpg";
import Image from "next/image";

const Cart = () => {
  return (
    <section className="min-h-screen">
      <Card>
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Cart</CardTitle>
            <CardDescription>Check out your favorite items</CardDescription>
          </CardHeader>
          <Link
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
        {Array.from({ length: 4 }).map((_, index) => (
          <Card className="p-0 rounded-2xl mt-4 overflow-hidden">
            <div className="flex">
              <CardContent className="p-0 w-[100px] h-[100px]">
                <Image
                  src={exampleImage}
                  alt="men.jpg"
                  className="w-full h-full object-cover"
                  width={736}
                  height={981}
                />
              </CardContent>
              <CardHeader className="p-2 h-fit">
                <CardTitle className="w-[110px] md:w-fit truncate">
                  Itemfewfegfewgfgfewewgfeewfwfewfef{index + 1}
                </CardTitle>
                <CardDescription>R200</CardDescription>
              </CardHeader>
              <CardFooter className="p-0 ml-auto pr-2">
                <Button variant="outline">-</Button>
                <span className={buttonVariants({ variant: "outline" })}>
                  1
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
