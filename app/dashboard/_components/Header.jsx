"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const Header = () => {
    const path =usePathname();
    useEffect(()=>{
        // console.log(path);
    })
  return (
    <div className=' flex p-4 items-center  justify-between bg-secondary shadow-sm '>
       
        <div className=' font-bold text-primary text-lg'>
            AI MOCK INTERVIEW
        </div>
         
         <UserButton/>

    </div>
  )
}

export default Header