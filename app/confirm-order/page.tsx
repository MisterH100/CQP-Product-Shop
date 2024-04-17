"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CircleDashed } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFormValues, useGlobalContext } from "@/lib/global_context";
import { useRouter } from "next/navigation";

const OrderConfirmation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    user,
    cartList,
    setCartList,
    setOrderData,
    formValues,
    setFormValues,
  } = useGlobalContext();
  const total = cartList
    .map((product) => {
      return product.price * product.quantity;
    })
    .reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    const createNewOrder = () => {
      setLoading(true);
      axios
        .post(
          "https://nodeserver-v2.onrender.com/api/products/orders/new",
          {
            ...formValues,
            customer_id: user._id,
            products: Array.from(cartList.map((item) => item)),
            price: total,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          setOrderData(response.data);
          setCartList([]);
          setFormValues({} as IFormValues);
          setLoading(false);
          router.push("/summary");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    createNewOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="w-full min-h-screen mb-10 flex justify-center items-center">
      <Card>
        {loading ? (
          <div>
            <CardHeader>
              <CardTitle>Confirming order</CardTitle>
              <CardDescription>Your order is being processed</CardDescription>
            </CardHeader>
            <CardContent>
              <CircleDashed className="w-10 h-10 mx-auto animate-spin" />
            </CardContent>
          </div>
        ) : (
          <div>
            <CardHeader>
              <CardTitle>Order Confirmed</CardTitle>
              <CardDescription>Your order has been confirmed.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Your order has been confirmed!!.</p>
            </CardContent>
          </div>
        )}
      </Card>
    </section>
  );
};

export default OrderConfirmation;
