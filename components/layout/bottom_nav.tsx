"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { HomeIcon, ShoppingCartIcon, MoonIcon, SunIcon } from "lucide-react";
import Link from "next/link";
import { useGlobalContext } from "@/lib/global_context";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

export const BottomNav = () => {
  const { selected, setSelected, cartList } = useGlobalContext();
  const { theme, setTheme } = useTheme();
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
        <div className="flex justify-end">
          <CardHeader>
            <CardTitle className="relative text-lg">
              <Button
                onClick={() => {
                  setSelected("theme");
                  setTheme(theme === "light" ? "dark" : "light");
                }}
                variant="outline"
                className={` relative flex gap-2 items-center p-4 rounded-full md:rounded-2xl overflow-hidden ${
                  selected === "theme" &&
                  "text-primary-foreground hover:text-primary-foreground"
                }`}
              >
                {theme === "light" ? (
                  <MoonIcon className="w-6 h-6 z-10" />
                ) : (
                  <SunIcon className="w-6 h-6 z-10" />
                )}
                <span className="relative z-10 hidden md:block">Theme</span>
                {selected === "theme" && (
                  <span className="absolute z-0 w-full h-full bg-ring"></span>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
        </div>
      </nav>
    </Card>
  );
};
