import React, { useState } from 'react'
import { useUser } from '../app/providers/UserProvider'
import Image from 'next/image'
import { Club, Gift, Home, Menu, Play, Users, Wallet, X } from 'lucide-react'
// import Sidebar from './Sidebar'
import { Settings, LogOut, User, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


const Nav = () => {
    const { userData, refreshUserData } = useUser()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

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
    <>
    <header className='w-full py-3 px-3 bg-[#020617] border-b border-b-slate-700 '>
    <div className='flex w-full items-center justify-between'>
    <button
                        onClick={toggleSidebar}
                        className="text-white mr-4 focus:outline-none md:hidden"
                        aria-label="Toggle sidebar"
                    >
                        <Menu size={24} />
                    </button>

        <div className='border border-slate-700 min-w-[80px] py-2 rounded-[5px] text-[16px] font-bold text-white text-center'>
        ${userData?.wallet.toFixed(2) || 0}
        </div>
        {/* <p className='text-white font-bold capitalize '>
            {userData.username}
        </p> */}
    <Image src={userData?.image ?? "https://i.postimg.cc/x1pw82bv/user.jpg"} width={100} height={100} alt='profile' className='rounded-full size-[40px]' />
    </div>
    </header>
    <div
    className={`fixed top-0 left-0 h-screen w-64 bg-[#020617] transform transition-transform duration-300 ease-in-out z-20 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
>
    {/* Sidebar content goes here */}
    <div className="w-full p-4 text-white flex flex-col justify-between h-screen">
        <div>
            <div className='flex items-center justify-between pb-8'>
                <Image src={"/logo.png"} alt='logo' width={150} height={100} />
            <X  onClick={toggleSidebar} />
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
          <Button variant="default" className="w-full justify-start text-white bg-red-500 hover:bg-red-600 transition">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </Link>
      </motion.div>
    </div>
</div>

{/* Overlay */}
{isSidebarOpen && (
    <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={toggleSidebar}
    ></div>
)}
</>
  )
}

export default Nav
