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
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/lib/global_context";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
//import {
//  APILoader,
// PlacePicker,
//} from "@googlemaps/extended-component-library/react";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  first_name: z
    .string()
    .min(3, {
      message: "name must be at least 3 characters.",
    })
    .trim()
    .toLowerCase(),
  last_name: z
    .string()
    .min(3, {
      message: "name must be at least 3 characters.",
    })
    .trim()
    .toLowerCase(),
  email: z
    .string()
    .min(10, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .min(9, { message: "Invalid phone number" })
    .max(10, { message: "Invalid phone number" })
    .regex(phoneRegex, "Invalid phone number"),
  address: z.string().min(10, { message: "Invalid address" }),
  payment_method: z.enum(["card", "cash"], {
    required_error: "you need to select payment method",
  }),
  terms: z
    .boolean({
      required_error: "accept our terms and conditions to continue",
    })
    .refine((val) => val == true, { message: "check this box to continue" }),
});

const CheckoutPage = () => {
  const addressRef = useRef<any>(null);
  const router = useRouter();
  const { cartList, setSelected, setCartList } = useGlobalContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, order_items: cartList });
    setCartList([]);
    setTimeout(() => {
      router.push("/summary");
    }, 2000);
  }

  const handleChange = (e: Event) => {
    if (addressRef.current) {
      form.setValue(
        "address",
        addressRef.current.__childPart._$committedValue._$parts[0].element.value
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
                        <>
                          {/*
                          <APILoader
                            id="api-loader"
                            apiKey={process.env.GOOGLE_MAPS_API_KEY}
                          />

                          <div className="w-full mb-2">
                            <PlacePicker
                              ref={addressRef}
                              onPlaceChange={(e) => handleChange(e)}
                              placeholder="Search address here"
                              country={["za"]}
                              className="w-full"
                            />
                          </div>
                        */}
                          <Input
                            type="text"
                            disabled
                            placeholder="..."
                            {...field}
                          />
                        </>
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <CardHeader className="px-0">
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <div>
                    <FormField
                      control={form.control}
                      name="payment_method"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Complete the payment with</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1 border border-input p-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem disabled value="card" />
                                </FormControl>
                                <div>
                                  <FormLabel>Card</FormLabel>
                                  <FormDescription>
                                    Complete payment with your card
                                  </FormDescription>
                                </div>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="cash" />
                                </FormControl>
                                <div>
                                  <FormLabel>Cash</FormLabel>
                                  <FormDescription>
                                    Cash on delivery
                                  </FormDescription>
                                </div>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 border border-input p-4 mt-4">
                      <FormControl>
                        <Checkbox
                          className="w-4 h-4 border-border"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel>
                          I have read and agree to the{" "}
                          <Link
                            className="text-blue-800"
                            href="/privacy-policy"
                          >
                            Privacy Policy
                          </Link>
                        </FormLabel>
                        <FormDescription>
                          I understand product store privacy policy
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="w-full pt-10">
                  <Button
                    onClick={() => setSelected("")}
                    type="submit"
                    className="w-full rounded-2xl"
                    variant="default"
                  >
                    Confirm order
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
