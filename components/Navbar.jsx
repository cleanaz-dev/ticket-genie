import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import MenuNavButton from './MenuNavButton'

export default function Navbar() {
  return (
    <nav className="border-b bg-transparent h-[5vh] flex items-center">
		  <div className="container flex items-center justify-between">
			{/* Button for small screens only */}
			<div className="flex items-center md:hidden">
		
			  <MenuNavButton />
			</div>
	  
			<Link href="/">
			  <h1 className="font-extrabold text-2xl md:text-4xl hidden md:block">
				Ticket <span className="text-purple-500">Genie </span>
			  </h1>
			</Link>
	  
			<UserButton afterSignOutUrl="/" />
		  </div>
		</nav>
  )
}
