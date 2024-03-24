import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "external wear brings you quality products",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
