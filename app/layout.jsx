import { Inter } from 'next/font/google'
import { AuthProvider } from './providers/AuthProvider'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../lib/authOptions"
import Link from 'next/link'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'XOPlayers',
  description: 'Play games, earn rewards effortlessly',
  icons: {
    icon: "/fav.png"
  }
}

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <main className="text-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
