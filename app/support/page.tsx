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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(10, { message: "This field has to be filled." })
    .email("This is not a valid email.")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, { message: "message has to be at least 10 character long " })
    .trim(),
});

const SupportPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log("sent");
  }
  return (
    <section className="min-h-screen mb-10">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>externalwear </CardTitle>
          <CardDescription>Contact Us</CardDescription>
        </CardHeader>
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="font-medium">
              Talk to our Support Team
            </CardTitle>
          </CardHeader>
          <div className="flex flex-col md:flex-row justify-evenly">
            <div className="w-full">
              <p>
                Phone: 071 418 3001
                <br /> Email:{" "}
                <Link href="mailto:thehandsomedevservices@gmail.com">
                  thehandsomedevservices@gmail.com
                </Link>
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <CardDescription>More info</CardDescription>
                <Link className="underline" href="/learn-more/deliveries">
                  How do deliveries work
                </Link>
                <Link className="underline" href="/learn-more/privacy-policy">
                  Privacy and user info security
                </Link>
                <Link className="underline" href="/learn-more/exchange-policy">
                  Our return Policy
                </Link>
              </div>
            </div>
            <div className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col md:flex-row"
                >
                  <div className="w-full">
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
                      name="message"
                      render={({ field }) => (
                        <FormItem className="pt-4">
                          <FormLabel>Send us a message</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="text"
                                placeholder="describe your issue"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>Required field</FormDescription>
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
                      Send
                      {loading && (
                        <CircleDashed className="ml-4 w-4 h-4 animate-spin" />
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default SupportPage;
