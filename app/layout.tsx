import { Header } from './components/Header'
import { CartContextProvider } from './context/CartContext'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Product Store',
  description: 'products store brings you quality products',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <main className='relative min-w-[300px]'>
          <CartContextProvider>
            <Header/>
            {children}
          </CartContextProvider>
        </main>
      </body>
    </html>
  )
}
