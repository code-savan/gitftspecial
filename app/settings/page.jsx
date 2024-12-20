'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Share2, Copy, Trophy, Check, CopyIcon, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import { WithdrawalsMarquee } from '@/components/WithdrawalsMarquee'
import { ambassadorBenefits, referralLeaderboard } from '../../constants/index'
import { useUser } from '../providers/UserProvider'

const page = () => {
  return (
    <div className="h-screen w-full bg-[#020617] overflow-y-auto">
    <div className='md:hidden w-full'>
      <Nav />
    </div>
    <div className="flex md:h-screen">
      <Sidebar />
      <main className="flex-1 pb-8 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='space-y-4 p-4'
        >
          <div className='hidden md:flex w-full'>
            <Nav />
          </div>

          <div className='flex items-center justify-center text-[22px] font-semibold'>
            Settings
          </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default page
