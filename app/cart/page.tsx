import { buttonVariants } from "@/components/ui/button";
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

const Cart = () => {
  return (
    <section>
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
    </section>
  );
};

export default Cart;
