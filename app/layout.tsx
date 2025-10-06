import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mobile Auto Repair - Professional Car Repair at Your Location',
  description: 'Expert mobile auto repair services. We come to you! Professional mechanics, quality parts, and convenient service at your home or office.',
  keywords: 'mobile auto repair, car repair, mechanic, mobile mechanic, auto service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
