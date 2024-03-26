import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BottomNav } from "@/components/layout/bottom_nav";
import { Toaster } from "@/components/ui/toaster";
import { GlobalContextProvider } from "@/lib/global_context";
import { ThemeProvider } from "@/lib/theme_provider";
import Link from "next/link";
const poppins = Poppins({
  weight: ["400", "500", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "external wear sa",
  description: "Welcome to our store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light">
          <GlobalContextProvider>
            <Toaster />
            <main className={` ${poppins.className} relative`}>
              {children}
              <Card className="min-h-[300px]">
                <CardFooter className="flex-col">
                  <CardHeader>
                    <CardTitle>external wear sa</CardTitle>
                    <CardDescription>Follow us on our socials</CardDescription>
                  </CardHeader>
                  <Link className="underline" href="/">
                    Instagram
                  </Link>
                  <div className="flex gap-4 mt-2">
                    <Link
                      className="underline"
                      href="mailto:thehandsomedevservices@gmail.com"
                    >
                      Contact us
                    </Link>
                    <Link className="underline" href="/learn-more/deliveries">
                      Deliveries
                    </Link>
                    <Link
                      className="underline"
                      href="/learn-more/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </CardFooter>
              </Card>
              <div className="w-full fixed bottom-0 left-0">
                <BottomNav />
              </div>
            </main>
          </GlobalContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
