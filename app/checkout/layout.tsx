import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Store Cart",
  description: "products store brings you quality products",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
