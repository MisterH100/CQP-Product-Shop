"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon, ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useGlobalContext } from "@/lib/global_context";
import { Badge } from "@/components/ui/badge";

export const BottomNav = () => {
  const { selected, setSelected, cartList } = useGlobalContext();
  const navLinks = [
    {
      id: 1,
      name: "Home",
      link: "/",
      icon: <HomeIcon className="w-6 h-6 z-10" />,
    },
    {
      id: 2,
      name: "Cart",
      link: "/cart",
      icon: <ShoppingCartIcon className="w-6 h-6 z-10" />,
    },
  ];
  return (
    <Card>
      <nav className="flex justify-center">
        {navLinks.map((link) => (
          <CardHeader key={link.id}>
            <CardTitle className="relative text-lg">
              {link.name === "Cart" && cartList.length != 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 z-50"
                >
                  {cartList.length}
                </Badge>
              )}
              <Link
                onClick={() => setSelected(link.name)}
                className={`${buttonVariants({
                  variant: "outline",
                })} relative flex gap-2 items-center p-4 rounded-full md:rounded-2xl overflow-hidden ${
                  selected === link.name &&
                  "text-primary-foreground hover:text-primary-foreground"
                }`}
                href={link.link}
              >
                {link.icon}
                <span className="relative z-10 hidden md:block">
                  {link.name}
                </span>
                {selected === link.name && (
                  <span className="absolute z-0 w-full h-full bg-ring"></span>
                )}
              </Link>
            </CardTitle>
          </CardHeader>
        ))}
      </nav>
    </Card>
  );
};
