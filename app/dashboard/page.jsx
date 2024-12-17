import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import Link from "next/link"
import XoGame from "../../components/XoGame"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-xl mb-4 capitalize">Welcome, {session.user?.name}!</p>
        <p className="mb-4">This is your protected dashboard. Only authenticated users can access this page.</p>
        <h1>Welcome, {session.user?.name}</h1>
      <p>Battery Level: {session.user?.batteryLevel}</p>
      <p>Points: {session.user?.points}</p>
      <p>Wallet Balance: {session.user?.wallet}</p>
      <p>Chances Left: {session.user?.chancesLeft}</p>
      <p>Refs: {session.user?.refs}</p>
      <p>X/O Wins: {session.user?.xoWins}</p>
      {/* xo game div  */}
      <div className="">
      <XoGame />
      </div>
        <div className="flex justify-between">
          <Link href="/" className="text-blue-500 hover:underline">Go to Home</Link>
          <Link href="/api/auth/signout" className="text-red-500 hover:underline">Sign out</Link>
        </div>
      </div>
    </div>
  )
}
