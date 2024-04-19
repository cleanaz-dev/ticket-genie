"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import CreateNewTicket from "@/components/CreateNewTicket";

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Extract email address when user object is available
      const email = user?.emailAddresses[0].emailAddress;
      if (email) {
        setUserEmail(email); // Set state only if email exists
      }
    }
  }, [user]); // Dependency on user object
  if (!userEmail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-[90vh] ">
      <div className="grid items-start gap-y-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="text-3xl md:text-4xl text-center tracking-wide">Start a New Ticket</h1>
            <p className="text-lg text-muted-foreground text-center">
              Easily create your ticket from here
            </p>
            <div className="inline-flex justify-center">
              <CreateNewTicket userEmail={userEmail} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
