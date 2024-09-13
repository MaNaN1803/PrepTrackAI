"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])
  return (
    <div className='flex p-4 items-center justify-between bg-black shadow-sm'>
    <Image src={'./logo-removebg-preview (2).svg'} width={160} height={100} alt='logo'/>
    
    <ul className='hidden md:flex gap-8 items-center text-gray-300'>
        <li className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer 
            ${path == '/dashboard' && 'text-[#FFD700] font-bold border-b-2 border-[#FFD700]'}`}>
            Dashboard
        </li>
        <li className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer 
            ${path == '/dashboard/questions' && 'text-[#FFD700] font-bold border-b-2 border-[#FFD700]'}`}>
            Questions
        </li>
        <li className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer 
            ${path == '/dashboard/upgrade' && 'text-[#FFD700] font-bold border-b-2 border-[#FFD700]'}`}>
            Upgrade
        </li>
        <li className={`hover:text-[#FFD700] hover:font-bold transition-all duration-300 ease-in-out cursor-pointer 
            ${path == '/dashboard/howitworks' && 'text-[#FFD700] font-bold border-b-2 border-[#FFD700]'}`}>
            How it Works?
        </li>
    </ul>

    <UserButton/>
</div>

  )
}

export default Header