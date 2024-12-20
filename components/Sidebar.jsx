'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Settings, LogOut, User, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Sidebar() {
  const sidebarItems = [
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: Target, label: 'Tasks', href: '/tasks' },
    { icon: User, label: 'Profile', href: '/profile' },
  ]

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/10 backdrop-blur-lg p-6 md:flex flex-col justify-between hidden"
    >
      <nav>
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
      </nav>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href="/api/auth/signout" passHref>
          <Button variant="ghost" className="w-full justify-start text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </Link>
      </motion.div>
    </motion.aside>
  )
}
