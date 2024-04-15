import React from "react";

import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CreateNewTicket from "@/components/CreateNewTicket";

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center h-[90vh] ">
      <div className="grid items-start gap-y-8">
        <div className="flex items-center justify-between px-2">
          <div className="grid gap-1">
            <h1 className="text-3xl md:text-4xl">Start a New Ticket</h1>
            <p className="text-lg text-muted-foreground">
              Easily create your ticket from here
            </p>

            <CreateNewTicket />
          </div>
        </div>
      </div>
    </div>
  );
}
