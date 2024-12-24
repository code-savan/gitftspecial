'use client'

import { motion } from 'framer-motion'
import { Trophy, Users, Target, Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Sidebar'
import { rewardTasks } from '../../constants/index'

const iconMap = {
  Trophy,
  Users,
  Target,
  Star
}

export default function Rewards() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
        <div className='md:hidden w-full'>
        <Nav />
      </div>
      <div className="flex md:h-screen">
        <Sidebar />
        <main className="flex-1 pb-8 overflow-auto">
        <div className='hidden md:flex w-full'>
              <Nav />
            </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 mx-auto space-y-8"
      >
        <h1 className="text-[22px] font-semibold text-center">Complete Tasks to Earn Rewards</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewardTasks.map((task, index) => {
            const IconComponent = iconMap[task.icon as keyof typeof iconMap]

            return (
              <Card key={index} className="bg-[#0f172a] border-none text-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-600">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">{task.name}</h3>
                      <p className="text-[13px] text-slate-400">{task.info}</p>
                    <span className="text-green-400 text-[12px]">{task.reward}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className=" border border-slate-700 py-2 px-3 text-center rounded-md w-full">Complete Task</button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </motion.div>
      </main>
    </div>
    </div>
  )
}
