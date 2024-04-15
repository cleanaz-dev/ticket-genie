import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  HomeIcon,
  LogOut,
  LogOutIcon,
  SettingsIcon,
  TicketIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/dashboard", icon: HomeIcon },
  { label: "Tickets", href: "/dashboard/tickets", icon: TicketIcon },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2">
      {links.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              "group flex items-center px-3 py-2 text-sm font-medium hover:bg-purple-300 hover:text-accent-foreground",
              pathname === item.href ? "bg-purple-500" : "bg-transparent"
            )}
          >
            <item.icon className="mr-2 w-4 h-4 text-white" />
            <span className="text-white">{item.label}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
