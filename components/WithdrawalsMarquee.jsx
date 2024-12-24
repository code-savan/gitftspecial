'use client'

import { motion } from 'framer-motion'
import { topAmbassadors } from '../constants/index'

export function WithdrawalsMarquee() {
  // Duplicate the data to create a seamless loop
  const duplicatedData = [...topAmbassadors, ...topAmbassadors]

  return (
    <div className="relative overflow-hidden h-[200px] bg-transparent border border-slate-700 rounded-lg py-4">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-50%" }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="space-y-4 py-4"
      >
        {duplicatedData.map((withdrawal, index) => (
          <div
            key={`${withdrawal.username}-${index}`}
            className="flex justify-between items-center px-4 py-2"
          >
            <span className="text-white">
              Congratulations {withdrawal.username}
            </span>
            <span className="text-green-400">
              Withdraw ${withdrawal.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
