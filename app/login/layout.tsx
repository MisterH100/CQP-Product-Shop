import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "External wear sa register",
  description: "External wear sa brings you quality products",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
