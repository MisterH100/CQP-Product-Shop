import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "external wear sa brings you quality products",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
