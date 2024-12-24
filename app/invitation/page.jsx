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

export default function Invitation() {
  const { userData, refreshUserData } = useUser()
  const [copied, setCopied] = useState(false)
  const referralLink = `http://localhost:3000/signup?ref=${userData?.referralCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-screen w-full bg-[#020617] overflow-y-auto">
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
            className='space-y-4 p-6'
          >

            {/* Ambassador Section */}
            <Card className="bg-[#0e1637] border-none text-white py-4">

              <CardContent className="space-y-4">
                <p className="text-[22px] font-semibold text-center">
                  Become an Ambassador Today!
                </p>
                <p className="text-center text-lg text-slate-300">
                  Refer 1,000 people to unlock exclusive ambassador benefits
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ambassadorBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className='text-gray-300'>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral Link Section */}
            <Card className="bg-transparent text-white border-slate-700 pt-4 pb-2">
              <CardContent className="space-y-4">
                <p className='font-semibold'>Your Sharing Link(Copy and share on social platforms)
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-transparent border border-slate-700 p-2 rounded-lg"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="bg-transparent border-slate-700"
                  >
                    {copied ? <Check/> : <CopyIcon />}
                  </Button>
                </div>
                {
                  copied ?
                  <div className='w-full flex space-x-2 items-center justify-center text-green-500'>
<p className='text-green-500 text-center font-semibold '>Copied</p>
<CheckCircle size="15px"/>
                  </div>
                  : ""
                }
                {/* <Button className="w-full gap-2 bg-blue-600 hover:bg-blue-700">
                  <Share2 className="h-4 w-4" />
                  Share Link
                </Button> */}
              </CardContent>
            </Card>

            <WithdrawalsMarquee />

            {/* Referral Leaderboard */}
            <Card className="bg-[#0e1637] border-none text-white">
              <CardHeader>
                <p className='font-semibold text-[22px]'>Top Referrers</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralLeaderboard.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 border-b border-slate-700 pb-2"
                    >
                      <Image
                        src={user.image}
                        alt={user.username}
                        width={40}
                        height={40}
                        className="rounded-full size-[30px]"
                      />
                      <span className="flex-1">{user.username}</span>
                      <span className="text-blue-500">{user.referrals} referrals</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
