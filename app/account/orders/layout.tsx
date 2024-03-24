import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "external wear brings you quality products",
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
