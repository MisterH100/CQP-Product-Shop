import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description: "external wear sa rings you quality products",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
