import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Product Store',
  description: 'products store brings you quality products',
}

export default function ProductsLayout({children,}: {children: React.ReactNode}) {
  return (
    <div>{children}</div>
  )
}
