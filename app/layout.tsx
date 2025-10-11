import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mobile Auto Repair Tech Orange County | Expert Car Service at Your Location',
  description: 'Convenient and reliable mobile auto repair service in Orange County. Our certified mechanics come to you for car repair, maintenance, and diagnostics. Skip the shop and get back on the road faster!',
  keywords: 'mobile auto repair orange county, mobile mechanic orange county, car repair orange county, auto repair orange county, mobile car service, on-site auto repair, affordable auto repair',
  metadataBase: new URL('https://www.mobileautorepair.tech'),
  openGraph: {
    title: 'Mobile Auto Repair Tech Orange County | Expert Car Service at Your Location',
    description: 'Convenient and reliable mobile auto repair service in Orange County. Our certified mechanics come to you for car repair, maintenance, and diagnostics. Skip the shop and get back on the road faster!',
    url: 'https://www.mobileautorepair.tech',
    siteName: 'Mobile Auto Repair Tech',
    images: [
      {
        url: '/og-image.png', // Must be an absolute URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile Auto Repair Tech Orange County | Expert Car Service at Your Location',
    description: 'Convenient and reliable mobile auto repair service in Orange County. Our certified mechanics come to you for car repair, maintenance, and diagnostics. Skip the shop and get back on the road faster!',
    images: ['/og-image.png'], // Must be an absolute URL
  },
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
