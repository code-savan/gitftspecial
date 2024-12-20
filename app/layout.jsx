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
          {/* <header className="bg-gray-800 text-white p-4">
            <nav className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">CashXO</Link>
              {session ? (
                <div className="flex items-center gap-4">
                  <span>Hello, {session.user?.name}</span>
                  <Link href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Sign out
                  </Link>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link href="/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Sign in</Link>
                  <Link href="/signup" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Sign up</Link>
                </div>
              )}
            </nav>
          </header> */}
          <main className="text-white">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
