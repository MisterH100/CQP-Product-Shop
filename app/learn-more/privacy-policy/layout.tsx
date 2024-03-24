import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "external wear sa brings you quality products",
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
