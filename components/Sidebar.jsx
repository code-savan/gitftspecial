'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Club, Gift, Home, Menu, Play, Users, Wallet, X } from 'lucide-react'
// import Sidebar from './Sidebar'
import { Settings, LogOut, User, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Sidebar() {
    const sidebarItems = [
        { icon: Play, label: 'Lobby', href: '/dashboard' },
        { icon: User, label: 'Profile', href: '/profile' },
         { icon: Club, label: 'XO Club', href: '/xoclub' },
        { icon: Gift, label: 'Rewards', href: '/rewards' },
        { icon: Users, label: 'Invite', href: '/invitation' },
        { icon: Wallet, label: 'Wallet', href: '/wallet' },
        { icon: Settings, label: 'Settings', href: '/settings' },
      ]

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/10 backdrop-blur-lg p-6 md:flex flex-col justify-between hidden"
    >
      <div className="w-full p-4 text-white flex flex-col justify-between h-full">
        <div>
            <div className='flex items-center justify-between pb-8'>
                <Image src={"/logo.png"} alt='logo' width={300} height={100} />

            </div>
    <ul className="space-y-4">
          {sidebarItems.map((item, index) => (
            <motion.li key={item.label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={item.href} passHref>
                <Button variant="ghost" className="w-full justify-start text-white">
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            </motion.li>
          ))}
        </ul>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/api/auth/signout" passHref>
          <Button variant="ghost" className="w-full justify-start text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </Link>
      </motion.div>
    </div>
    </motion.aside>
  )
}
