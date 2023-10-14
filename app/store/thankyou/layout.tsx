import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Product Store Thank you',
  description: 'products store brings you quality products',
}

export default function ThankYouLayout({children,}: {children: React.ReactNode}) {
  return (
      <div>{children}</div>
  )
}
