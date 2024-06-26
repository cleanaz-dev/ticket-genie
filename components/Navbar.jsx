import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import MenuNavButton from "./MenuNavButton";

export default function Navbar() {
  return (
    <>
	<SignedIn>
      <nav className="border-b bg-white flex items-center  sticky top-0 z-10">
        <div className="container flex items-center justify-between py-2">
          {/* Button for small screens only */}
          <div className="flex items-center md:hidden ">
            
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
	  </SignedIn>
	 
    </>
  );
}
