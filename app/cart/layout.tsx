import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Store Cart",
  description: "products store brings you quality products",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen overflow-y-auto">{children}</div>;
}
