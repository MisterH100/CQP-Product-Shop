import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "externalwear brings you quality products",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
