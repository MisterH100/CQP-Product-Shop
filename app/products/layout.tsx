import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "external wear sa",
  description: "external wear sa brings you quality products",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
