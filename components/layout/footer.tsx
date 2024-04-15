import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export const Footer = () => {
  return (
    <Card className="min-h-[400px] border-none bg-primary text-primary-foreground rounded-none">
      <CardFooter className="flex-col">
        <CardHeader>
          <CardTitle>externalwear</CardTitle>
        </CardHeader>
        <div className="w-full justify-between flex gap-6 mb-2">
          <div className="flex flex-col gap-4">
            <CardDescription>Socials</CardDescription>
            <Link className="underline" href="/">
              Instagram
            </Link>
            <Link className="underline" href="/">
              Facebook
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <CardDescription>Useful links</CardDescription>
            <Link className="underline" href="/support">
              Contact Us
            </Link>
            <Link className="underline" href="/learn-more/deliveries">
              Deliveries
            </Link>
            <Link className="underline" href="/learn-more/privacy-policy">
              Privacy Policy
            </Link>
            <Link className="underline" href="/learn-more/exchange-policy">
              Exchange Policy
            </Link>
          </div>
        </div>
        <p className="pt-4">
          Crafted with passion and precision. © externalwear 2024. All rights
          reserved. Built using cutting-edge technologies.
        </p>
      </CardFooter>
    </Card>
  );
};
