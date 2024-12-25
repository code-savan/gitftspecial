// 'use client'

// import { useEffect } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import XoGame from '../../components/XoGame'
// import { useUser } from '../providers/UserProvider'

// export default function Dashboard() {
//   const router = useRouter()
//   const { data: session, status } = useSession()
//   const { userData, refreshUserData } = useUser()

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/signin')
//     }
//   }, [status, router])

//   useEffect(() => {
//     if (session?.user) {
//       refreshUserData()
//     }
//   }, [session, refreshUserData])

//     if (status === 'loading' || !userData) {
//     return (
//         <div className='bg-slate-950 flex items-center justify-center w-full h-[100dvh]'>
//         <div className="ld-ripple">
//         <div></div>
//         <div></div>
//         </div>
//       </div>
//       )}

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#020617]">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
//         <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//         <p className="text-xl mb-4 capitalize">Welcome, {session?.user?.name}!</p>
//         <div className="">
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
//             <p>Battery Level: {userData.batteryLevel}%</p>
//             <p>Points: {userData.points}</p>
//             <p>Wallet Balance: ${userData.wallet.toFixed(2)}</p>
//             <p>Chances Left: {userData.chancesLeft}</p>
//             <p>Refs: {userData.refs}</p>
//             <p>X/O Wins: {userData.xoWins}</p>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Play Tic-Tac-Toe</h2>
//             <XoGame />
//           </div>
//         </div>
//         <div className="flex justify-between mt-8">
//           <Link href="/" className="text-blue-500 hover:underline">Go to Home</Link>
//           <Link href="/api/auth/signout" className="text-red-500 hover:underline">Sign out</Link>
//         </div>
//       </div>
//     </div>
//   )
// }








'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import XoGame from '../../components/XoGame'
import Sidebar from '../../components/Sidebar'
import { useUser } from '../providers/UserProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Nav from '@/components/Nav'
import Stats from '@/components/Stats'

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
    return (
      <div className='bg-[#020617] flex items-center justify-center w-full h-[100dvh]'>
        <div className="ld-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-[#020617] overflow-y-hidden">
        <div className='md:hidden w-full'>

<Nav />
        </div>
    <div className="flex md:h-screen">
      <Sidebar />

      <main className="flex-1 pb-8 overflow-y-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-2'
        >
<div className='hidden md:flex w-full'>
<Nav />
</div>
<div>
          <h1 className="text-[25px] font-bold mt-10 mb-5 text-white capitalize text-center">
            Welcome, {session?.user?.username}👋🏽
          </h1>
</div>
          <div className="md:grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
          <Card className=" bg-transparent text-white border-none w-[95%] mx-auto mb-10 py-6">
              <CardContent className=' w-full'>
                <XoGame />
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
    <div className='w-full md:hidden fixed bottom-0 left-0'>
    <Stats />

    </div>
    </div>
  )
}
