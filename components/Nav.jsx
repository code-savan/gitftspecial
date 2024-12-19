import React from 'react'
import { useUser } from '../app/providers/UserProvider'
import Image from 'next/image'

const Nav = () => {
    const { userData, refreshUserData } = useUser()
  return (
    <header className='w-full py-3 px-3 bg-[#020617] border-b border-b-slate-700 '>
    <nav className='flex w-full items-center justify-between'>
        <div className='border border-slate-700 min-w-[80px] py-2 rounded-[5px] text-[16px] font-bold text-white text-center'>
        ${userData.wallet.toFixed(2)}
        </div>
        {/* <p className='text-white font-bold capitalize '>
            {userData.username}
        </p> */}
    <Image src={userData.image ?? "https://i.postimg.cc/x1pw82bv/user.jpg"} width={100} height={100} alt='profile' className='rounded-full size-[40px]' />
    </nav>
    </header>
  )
}

export default Nav
