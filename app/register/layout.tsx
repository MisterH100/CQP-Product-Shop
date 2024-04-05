import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "externalwear brings you quality products",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
