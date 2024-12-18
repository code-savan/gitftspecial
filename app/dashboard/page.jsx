'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import XoGame from '../../components/XoGame'
import { useUser } from '../providers/UserProvider'

export default function Dashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { userData, refreshUserData } = useUser()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      refreshUserData()
    }
  }, [session, refreshUserData])

  if (status === 'loading' || !userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-xl mb-4 capitalize">Welcome, {session?.user?.name}!</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
            <p>Battery Level: {userData.batteryLevel}%</p>
            <p>Points: {userData.points}</p>
            <p>Wallet Balance: ${userData.wallet.toFixed(2)}</p>
            <p>Chances Left: {userData.chancesLeft}</p>
            <p>Refs: {userData.refs}</p>
            <p>X/O Wins: {userData.xoWins}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Play Tic-Tac-Toe</h2>
            <XoGame />
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <Link href="/" className="text-blue-500 hover:underline">Go to Home</Link>
          <Link href="/api/auth/signout" className="text-red-500 hover:underline">Sign out</Link>
        </div>
      </div>
    </div>
  )
}
