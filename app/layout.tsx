import { Header } from './components/Header'
import { CartContextProvider } from './context/CartContext'
import './globals.css'
import {Poppins} from 'next/font/google'
import type { Metadata } from 'next'

const poppins = Poppins({
  weight: ['400','500','900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Product Store',
  description: 'products store brings you quality products',
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </head>
      <body>
        <main className={`relative min-w-[300px] ${poppins.className}`}>
          <CartContextProvider>
            <Header/>
            {children}
          </CartContextProvider>
        </main>
      </body>
    </html>
  )
}
