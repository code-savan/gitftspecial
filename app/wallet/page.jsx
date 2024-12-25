'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { topAmbassadors } from '../../constants/index'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import { useUser } from '../providers/UserProvider'
import { WithdrawalsMarquee } from '@/components/WithdrawalsMarquee'

export default function Wallet() {
    const { userData, refreshUserData } = useUser()
  return (
    <div className="min-h-screen bg-[#020617] text-white">
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
        className="p-4 space-y-8"
      >
         <div className='hidden md:flex w-full'>
              <Nav />
            </div>
        {/* Balance Card */}
        <Card className="bg-[#0f172a] border-none text-white">
          <CardContent className="p-6">
            <div className="relative w-48 h-48 mx-auto">
              <div className={`w-full h-full rounded-full border-8 ${userData?.wallet < 5 ? "border-orange-500" : "border-green-500"} `} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-sm text-white">Total</div>
                <div className="text-2xl font-bold">${userData?.wallet.toFixed(2) || 0.00}</div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <span>Account Balance</span>
                <span className="font-bold">${userData?.wallet.toFixed(2) || 0.00}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Points Balance</span>
                <span className="font-bold">{userData?.points || 0.00}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <HelpCircle className="h-4 w-4" />
                <a href="#" className="text-sm">How does it work?</a>
              </div>
            </div>

            <div className="mt-4">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 mb-4">
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
       <WithdrawalsMarquee />
      </motion.div>
      </main>
    </div>
    </div>
  )
}
