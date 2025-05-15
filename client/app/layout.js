import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Quotes app',
  description: 'Frontend app for working with quotes API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900`}
      >
        <Navbar />
        <main className='container mx-auto p-4'>{children}</main>
      </body>
    </html>
  )
}
