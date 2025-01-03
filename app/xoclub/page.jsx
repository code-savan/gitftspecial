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
     <p className='text-center font-semibold'>XO CLub Coming Soon...</p>
      </motion.div>
      </main>

    </div>
    </div>
  )
}
