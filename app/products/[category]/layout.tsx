import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "externalwear",
  description: "externalwear brings you quality products",
};

export default function ProductsCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
