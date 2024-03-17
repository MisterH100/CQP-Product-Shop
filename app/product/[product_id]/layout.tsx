import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductStore",
  description: "ProductStore brings you quality products",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
