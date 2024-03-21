import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProductStore Privacy Policy",
  description: "ProductsStore brings you quality products",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
