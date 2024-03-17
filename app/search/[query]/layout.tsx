import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductStore Search",
  description: "ProductStore brings you quality products",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
