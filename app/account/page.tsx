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

const AccountPage = () => {
  const { user, setUser, setSelected, token } = useGlobalContext();
  const { toast } = useToast();
  const router = useRouter();

  const logOut = () => {
    axios
      .post("https://nodeserver-v2.onrender.com/api/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast({
          title: "logged out",
          description: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error.name,
          description: error.response.data.message,
        });
        router.push("/");
      });
  };
  useEffect(() => {
    axios
      .get("https://nodeserver-v2.onrender.com/api/auth", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
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
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: error.name,
          description: error.response.data.message,
        });
        router.push("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="min-h-screen pb-40">
      <Card className="mb-4">
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
            Back
          </Link>
        </div>
      </Card>
      <Card>
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
          <CardDescription>
            {user.first_name} {user.last_name}
          </CardDescription>
          <CardTitle className="text-lg font-medium">Email</CardTitle>
          <CardDescription>{user.email}</CardDescription>
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
        </CardFooter>
      </Card>
    </section>
  );
};

export default AccountPage;
