import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductStore Checkout",
  description: "ProductStore brings you quality products",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
