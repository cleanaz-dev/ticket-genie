import Image from "next/image";
import React from "react";
import heroImage from "../public/genie-main.svg";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRightIcon, SmileIcon } from "lucide-react";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center  justify-center bg-background h-[95vh] bg-gradient-to-b from-slate-50/50 to-slate-400/50">
      <div className="max-w-5xl px-4 md:px-10 space-y-4">
        <div className="flex items-center justify-center">
          <Image src={heroImage} alt="genie" />
        </div>
        <h1 className="font-extrabold text-2xl md:text-6xl leading-tight tracking-tight">
          Enhance <span className="text-purple-500">teamwork</span> and
          streamline ticket management with
          <span className="text-primary"> ease.</span>
        </h1>
        <p className="text-muted-foreground">
          Empower your team with our next-generation ticketing system for
          seamless collaboration.
        </p>
        <div className="space-x-4 mt-4">
          <SignedOut>
            <Link href="/sign-up">
              <Button className="bg-purple-500">
                Sign Up
                <SmileIcon className="ml-2" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button className="bg-transparent text-purple-500">
                Sign In <MoveRightIcon className="ml-2" />
              </Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-transparent text-purple-500 hover:bg-white">
                Access Dashboard <MoveRightIcon className="ml-2" />
              </Button>
            </Link>
          </SignedIn>
        </div>
      </div>
    </section>
  );
}
