import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Product Store Search',
  description: 'products store brings you quality products',
}

export default function SearchLayout({children,}: {children: React.ReactNode}) {
  return (
    <div>{children}</div>
  )
}
