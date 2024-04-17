import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order confirmation",
  description: "Thank you for shopping with us",
};

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
