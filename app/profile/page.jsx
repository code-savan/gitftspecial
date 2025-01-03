'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, User, Users, Trophy, Coins, Repeat2 } from 'lucide-react'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import { useUser } from '../providers/UserProvider'


export default function Profile() {
     const { userData, refreshUserData } = useUser()


  return (
    <div className="min-h-screen bg-[#020617] text-white">
        <div className='md:hidden w-full'>
        <Nav />
      </div>
      <div className="flex md:h-screen pt-[70px] md:pt-0">
        <Sidebar />
        <main className="flex-1 pb-8 overflow-auto relative">
        <div className='hidden md:flex w-full'>
              <Nav />
            </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" mx-auto space-y-8 p-6"
      >
        {/* Profile Header */}
        <div className="text-center ">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src={userData?.image || "https://i.postimg.cc/x1pw82bv/user.jpg"}
              alt="profile image"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold capitalize">{userData?.username}</h1>
          <p className="text-slate-400">{userData?.email}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-[#0f172a] border-none">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-400" />
              <div className="text-2xl font-bold text-white">{userData?.refs || 0}</div>
              <div className="text-sm text-slate-400">Referrals</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f172a] border-none">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
              <div className="text-2xl font-bold text-white">{userData?.xoWins || 0}</div>
              <div className="text-sm text-slate-400">XO Wins</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f172a] border-none">
            <CardContent className="p-4 text-center">
              <Repeat2 className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-white">{userData?.chancesLeft || 0}</div>
              <div className="text-sm text-slate-400">Chances Left</div>
            </CardContent>
          </Card>

          <Card className="bg-[#0f172a] border-none">
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-white">{userData?.points || 0}</div>
              <div className="text-sm text-slate-400">Points</div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
      </main>

    </div>
    </div>
  )
}
