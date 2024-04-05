import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "externalwear brings you quality products",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
