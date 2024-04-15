"use client";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IUser, useGlobalContext } from "@/lib/global_context";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";

const AccountPage = () => {
  const { user, setUser, setSelected, token, logOut, auth, setAuth } =
    useGlobalContext();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (auth) {
      return;
    }
    setLoading(true);
    axios
      .get("https://nodeserver-v2.onrender.com/api/auth", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.user._id) {
          setUser(response.data.user);
          toast({
            title: "authentication",
            description: response.data.message,
          });
          setAuth(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "authentication",
          description: "authentication failed",
        });
        setLoading(false);
        router.push("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="min-h-screen pb-10">
      {loading && <div className="loaderBar"></div>}
      <Card className="mb-4 rounded-none border-x-0">
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <Link
            onClick={() => setSelected("Home")}
            href="/"
            className={` ${buttonVariants({
              variant: "outline",
              className: "rounded-full p-4",
            })} `}
          >
            <ArrowLeftIcon className="w-6 h-6" />
            Back
          </Link>
        </div>
      </Card>
      <Card className="rounded-none border-x-0 border-b-0">
        <div className="flex justify-between items-center pr-6">
          <CardHeader>
            <CardTitle>Personal details</CardTitle>
          </CardHeader>
          <Link
            href="/account"
            onClick={() => {
              setSelected(" ");
              toast({
                title: "unavailable",
                description: "You can not edit your account at the moment",
              });
            }}
            className={` ${buttonVariants({
              variant: "outline",
              className: "rounded-full p-4",
            })} `}
          >
            Edit
          </Link>
        </div>
        <CardContent>
          <CardTitle className="text-lg font-medium">Full name</CardTitle>
          <CardDescription className="capitalize">
            {user.first_name ? user.first_name : "..."} {user.last_name}
          </CardDescription>
          <CardTitle className="text-lg font-medium">Email</CardTitle>
          <CardDescription>{user.email ? user.email : "..."}</CardDescription>
          <CardTitle className="text-lg font-medium">Phone</CardTitle>
          <CardDescription>{user.phone ? user.phone : "..."}</CardDescription>
          <CardTitle className="text-lg font-medium">Address</CardTitle>
          <CardDescription>
            {user.address ? user.address : "..."}
          </CardDescription>
        </CardContent>
        <Separator />
        <CardFooter className="flex-col">
          <div className="w-full pt-6">
            <Link className="block w-full" href="/account/orders">
              Orders
            </Link>
          </div>
          <div className="w-full pt-6">
            <Link
              className="block w-full"
              onClick={() => {
                setUser({} as IUser);
                logOut();
              }}
              href="/"
            >
              Log out
            </Link>
          </div>
          <div className="w-full pt-6">
            <Link className="block w-full" href="/learn-more/privacy-policy">
              Privacy Policy
            </Link>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AccountPage;
