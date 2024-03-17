import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductStore Cart",
  description: "ProductStore brings you quality products",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
