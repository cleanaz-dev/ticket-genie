"use client";

import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Link from 'next/link';
import {
    HomeIcon,
    LogOut,
    LogOutIcon,
    SettingsIcon,
    TicketIcon,
   } from "lucide-react";
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

const links = [
    { label: "Home", href: "/dashboard", icon: HomeIcon },
    { label: "Tickets", href: "/dashboard/tickets", icon: TicketIcon },
    { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
   ];
   

export default function MenuNavButton() {
    const [sheetOpen, setSheetOpen] = useState(false)
    const pathname = usePathname();
    return (
     <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
       <Button variant="outline"><span className='text-purple-500'>Menu</span></Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
       <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
        <SheetDescription>
         Please select menu option
        </SheetDescription>
       </SheetHeader>
       <SheetClose asChild>
       <nav className="grid items-start gap-2">
        {links.map((link, index) => (
         <Link 
          key={index} 
          href={link.href}
          onClick={() => setSheetOpen(false)}
          
          >
          <span
           className={cn(
            "group flex items-center px-3 py-2 text-sm font-medium hover:bg-purple-300 hover:text-accent-foreground rounded-lg",
            pathname === link.href ? "bg-purple-500 text-white" : "bg-transparent"
           )}
          >
          
           <link.icon className="mr-2 w-4 h-4" />
           <span >{link.label}</span>
          </span>
         </Link>
        ))}
       </nav>
       </SheetClose>
      </SheetContent>
     </Sheet>
    );
   }
