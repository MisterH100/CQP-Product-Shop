import type { Metadata } from "next";

type Props = {
  params: { product_id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.product_id;
  const product = await fetch(
    `https://nodeserver-v2.onrender.com/api/products/id/${id}`
  );
  const resMetadata = await product.json();
  return {
    title: resMetadata.name,
    description: resMetadata.description,
    openGraph: {
      type: "website",
      title: resMetadata.name,
      locale: "en_ZA",
      url: `https://productshop-official.vercel.app/product/${id}`,
      siteName: "External wear sa",
      images: [
        {
          url: resMetadata.images[0],
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
