import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

export default async function DashboardLayout({children}) {
    return (
           <div className="flex flex-col space-y-6 ">
               <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                   <aside className="hidden w-[200px] flex-col md:flex">
                       <Sidebar />
                   </aside>
                    
                   <main>{children}</main>
                   <Toaster />
               </div>
           </div>
    );
   }