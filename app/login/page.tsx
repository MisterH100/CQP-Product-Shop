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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/lib/global_context";
import { CircleDashed } from "lucide-react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const formSchema = z.object({
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
});

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setToken } = useGlobalContext();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    axios
      .post("https://nodeserver-v2.onrender.com/api/login", values, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        form.reset();
        router.push("/");
        setLoading(false);
        toast({
          title: "logged in",
          description: response.data.message,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast({
          title: error.name,
          description: error.response.data.message,
        });
      });
  }

  return (
    <section className="relative min-h-screen mb-40">
      {loading && (
        <div className="fixed  w-full h-screen flex justify-center items-center">
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-4">
                Loading <CircleDashed className="animate-spin" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Logging</p>
            </CardContent>
          </Card>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-800">
              register
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
                            type={showPassword ? "password" : "text"}
                            placeholder="eg: my_PassW0rd!"
                            {...field}
                          />
                          <Button
                            onClick={() => setShowPassword(!showPassword)}
                            type="button"
                            variant="outline"
                            className="absolute right-0 top-0 bg-none"
                          >
                            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>Required field</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full rounded-2xl mt-10"
                  variant="default"
                >
                  Login
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

export default LoginPage;
