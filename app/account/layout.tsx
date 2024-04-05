import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "externalwear brings you quality products",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
