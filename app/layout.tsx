import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { BottomNav } from "@/components/layout/bottom_nav";
import { Toaster } from "@/components/ui/toaster";
import { GlobalContextProvider } from "@/lib/global_context";
import { ThemeProvider } from "@/lib/theme_provider";
import { Footer } from "@/components/layout/footer";
const poppins = Poppins({
  weight: ["400", "500", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "External wear",
  description: "Welcome to our store",
  openGraph: {
    title: "External wear",
    description: "Welcome to externalwear, what do you feel like getting today",
    url: "https://externalwear.co.za",
    siteName: "externalwear",
    images: [
      {
        url: "https://res.cloudinary.com/dxrpjdomo/image/upload/v1711540298/Products/assets/externalwearbanner_hcq2bh.png",
        width: 800,
        height: 300,
      },
    ],
  },
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <GlobalContextProvider>
            <Toaster />
            <main
              className={` ${poppins.className} relative md:max-w-[1100px] md:mx-auto`}
            >
              {children}
              <Footer />
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
