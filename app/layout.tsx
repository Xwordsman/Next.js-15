import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Multilingual Website',
  description: 'A modern multilingual website built with Next.js 15',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
