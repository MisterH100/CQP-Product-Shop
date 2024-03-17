import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductStore Summary",
  description: "Thank you for shopping with us",
};

export default function SummaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
