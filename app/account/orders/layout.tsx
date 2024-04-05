import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "externalwear brings you quality products",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
