"use client";

import React from "react";
import { LayoutGridIcon } from "lucide-react";
import { SidebarNav } from "./SidebarNav";

export default function Sidebar() {
  return (
    <div className="w-48 bg-purple-400 fixed h-full">
      <div>
        <h1 className="flex text-xl text-white pl-3 my-8 gap-2">
          <LayoutGridIcon /> Dashboard{" "}
        </h1>
      </div>
      <SidebarNav />
    </div>
  );
}
