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
import { MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  const location = navigator.geolocation.getCurrentPosition(
    (position) => console.log(position),
    (error) => console.log(error)
  );

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
                      <FormDescription>Your first name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="eg: Doe" {...field} />
                      </FormControl>
                      <FormDescription>Your Last name</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="eg: johndoe123@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Your email address</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="eg: 714556002"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Your phone number</FormDescription>
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
                      <FormLabel>Your address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="tel" placeholder="" {...field} />
                          <Button
                            variant="ghost"
                            className="absolute right-4 top-0 rounded-full"
                          >
                            <MapPinIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>Your address</FormDescription>
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
