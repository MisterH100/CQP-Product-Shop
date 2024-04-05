import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "externalwear brings you quality products",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
