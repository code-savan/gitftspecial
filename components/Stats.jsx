import React from 'react'
import { useUser } from '../app/providers/UserProvider'
import Image from 'next/image'

const Stats = () => {
     const { userData, refreshUserData } = useUser()

  return (
   <div className='w-full py-3 px-3 bg-[#020617] border-b border-b-slate-700 absolute bottom-0 left-0'>
       <div className='flex w-full items-center justify-between'>

            {/* stat 1  */}
           <div className='py-1 rounded-[5px] text-[14px] text-white text-center '>
            <div>
            <Image src="/chances.png" width={100} height={100} alt='profile' className='rounded-full size-[20px] mb-1 mx-auto' />

                <span className='font-semibold text-[14px]'>
           {userData.chancesLeft}
                </span>
            </div>
            <p className='text-[9px] text-gray-300'>Chances Left</p>
           </div>


{/* stat 2  */}
<div className='py-1 rounded-[5px] text-[14px] text-white text-center '>
            <div>
            <Image src="/points.png" width={100} height={100} alt='profile' className='rounded-full size-[20px] mb-1 mx-auto' />

                <span className='font-semibold text-[14px]'>
           {userData.points}
                </span>
            </div>
            <p className='text-[9px] text-gray-300'>Points</p>
           </div>


           {/* stat 3  */}
           <div className='py-1 rounded-[5px] text-[14px] text-white text-center '>
            <div>
            <Image src="/wins.png" width={100} height={100} alt='profile' className='rounded-full size-[20px] mb-1 mx-auto' />

                <span className='font-semibold text-[14px]'>
           {userData.xoWins}
                </span>
            </div>
            <p className='text-[9px] text-gray-300'>XO Wins</p>
           </div>


           {/* stat 4  */}
           <div className='py-1 rounded-[5px] text-[14px] text-white text-center '>
            <div>
            <Image src="/refs.png" width={100} height={100} alt='profile' className='rounded-full size-[20px] mb-1 mx-auto' />

                <span className='font-semibold text-[14px]'>
           {userData.refs}
                </span>
            </div>
            <p className='text-[9px] text-gray-300'>Refs</p>
           </div>


           {/* stat 5  */}
           <div className='py-1 rounded-[5px] text-[14px] text-white text-center '>
            <div>
            <Image src="/battery.png" width={100} height={100} alt='profile' className='rounded-full size-[20px] mb-1 mx-auto' />

                <span className='font-semibold text-[14px]'>
           {userData.batteryLevel}%
                </span>
            </div>
            <p className='text-[9px] text-gray-300'>Battery</p>
           </div>

       </div>
       </div>
  )
}

export default Stats
