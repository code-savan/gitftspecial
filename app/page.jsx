import { getServerSession } from "next-auth/next"
import { authOptions } from "../app/api/auth/[...nextauth]/route"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to NextAuth Prisma App</h1>
      {session ? (
        <div className="flex flex-col items-center">
          <p className="text-2xl mb-4">Welcome, {session.user?.name}</p>
          <Link href="/dashboard" className="text-blue-500 hover:underline mb-2">Go to Dashboard</Link>
          <Link href="/api/auth/signout" className="text-red-500 hover:underline">Sign out</Link>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/signin" className="text-blue-500 hover:underline">Sign in</Link>
          <Link href="/signup" className="text-green-500 hover:underline">Sign up</Link>
        </div>
      )}
    </main>
  )
}
