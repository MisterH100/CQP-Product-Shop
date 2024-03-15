"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  APILoader,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import { useRef, useState } from "react";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const formSchema = z.object({
  first_name: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
  last_name: z.string().min(3, {
    message: "name must be at least 3 characters.",
  }),
  email: z
    .string()
    .min(10, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  phone: z
    .string()
    .min(9, { message: "Invalid phone number" })
    .max(10, { message: "Invalid phone number" })
    .regex(phoneRegex, "Invalid phone number"),
  address: z.string().min(10, { message: "Invalid address" }),
});

const CheckoutPage = () => {
  const addyRef = useRef<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleChange = (e: Event) => {
    if (addyRef.current) {
      form.setValue(
        "address",
        addyRef.current.__childPart._$committedValue._$parts[0].element.value
      );
    }
  };

  return (
    <section className="min-h-screen mb-40">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>
            Cash on Delivery only, delivery may take up to 2 working days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 md:px-4">
                <CardHeader className="px-0">
                  <CardTitle>Personal details</CardTitle>
                </CardHeader>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: John" {...field} />
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="pt-4">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: Doe" {...field} />
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="pt-4">
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="eg: johndoe123@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="pt-4">
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="eg: 714556002"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full md:w-1/2 md:px-4">
                <CardHeader className="px-0">
                  <CardTitle>Delivery address</CardTitle>
                </CardHeader>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address search</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="w-full mb-2">
                            <APILoader
                              apiKey={process.env.GOOGLE_MAPS_API_KEY}
                            />
                            <PlacePicker
                              ref={addyRef}
                              onPlaceChange={(e) => handleChange(e)}
                              placeholder="Search address here"
                              country={["za"]}
                              className="w-full"
                            />
                          </div>
                          <Input
                            type="text"
                            disabled
                            placeholder="..."
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="w-full pt-10">
                  <Button
                    type="submit"
                    className="w-full rounded-2xl"
                    variant="default"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default CheckoutPage;
