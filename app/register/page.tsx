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
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/lib/global_context";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useToast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";

const formSchema = z
  .object({
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
    password: z
      .string()
      .min(4, { message: "password has to be at least 4 characters long" })
      .trim(),
    confirmPassword: z
      .string()
      .min(4, { message: "password has to be at least 4 characters long" })
      .trim(),
    gender: z.enum(["male", "female"]),
    phone: z.string().optional(),
    address: z.string().optional(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<any>();
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useGlobalContext();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    axios
      .post("https://nodeserver-v2.onrender.com/api/register", values, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        form.reset();
        setLoading(false);
        router.push("/");
        toast({
          title: "registration",
          description: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast({
          title: "registration",
          description: "failed to register user",
        });
      });
  }
  useEffect(() => {
    if (value) {
      form.setValue("address", value.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <section className="relative min-h-screen mb-10">
      {loading && <div className="loaderBar"></div>}
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-800">
              log in
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 md:px-4">
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
                  name="password"
                  render={({ field }) => (
                    <FormItem className="pt-4">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="eg: my_PassW0rd!"
                            {...field}
                          />
                          <Button
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                            variant="outline"
                            className="absolute right-0 top-0 bg-none"
                          >
                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="pt-4">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type={showPassword ? "text" : "password"}
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-y-1 gap-4 border border-input p-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="male" />
                            </FormControl>
                            <div>
                              <FormLabel>male</FormLabel>
                            </div>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="female" />
                            </FormControl>
                            <div>
                              <FormLabel>female</FormLabel>
                            </div>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
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
                        <div className="flex">
                          <span
                            className={`${buttonVariants({
                              variant: "outline",
                            })} rounded-l-md`}
                          >
                            +27
                          </span>
                          <Input
                            type="tel"
                            required={false}
                            placeholder="eg: 714556002"
                            className="rounded-l-none rounded-r-md"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address search</FormLabel>
                      <FormControl>
                        <div>
                          <div className="text-black">
                            <GooglePlacesAutocomplete
                              apiKey={process.env.GOOGLE_MAPS_API_KEY}
                              autocompletionRequest={{
                                componentRestrictions: {
                                  country: ["za"],
                                },
                              }}
                              selectProps={{
                                value,
                                onChange: setValue,
                              }}
                            />
                          </div>
                          <Input
                            id="output"
                            type="text"
                            required={false}
                            disabled
                            placeholder="..."
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>Optional</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-2xl mt-10"
                  variant="default"
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center">
            Learn more about our privacy policy and data security{" "}
            <Link href="/learn-more/privacy-policy" className="text-blue-800">
              here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default RegisterPage;
