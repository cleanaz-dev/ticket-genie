import Link from "next/link";
import { getAllTickets } from "@/lib/actions";
import React from "react";
// import { ArrowUp, ArrowUpRightFromCircleIcon } from "lucide-react";
import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";

import { ScrollArea, ScrollBar } from "./ui/scroll-area";

// import {
//  Select,
//  SelectContent,
//  SelectItem,
//  SelectTrigger,
//  SelectValue,
// } from "@/components/ui/select";
// import { DeleteSingleNoteButton, SaveAssignedToButton } from "./SubmitButton";
import { UpdateTicketListButton } from "./UpdateTicketListButton";
import DeleteTicketListButton from "./DeleteTicketListButton";
import { ExternalLink, Link2, PackageOpen, Share } from "lucide-react";

export default async function TicketList() {
 const tickets = await getAllTickets();
 if (tickets.length === 0) {
  return <h2 className="mt-8 font-medium text-lg">No tickets found...</h2>;
 }
 return (
  <div className="space-y-6 flex ">
    <ScrollArea className="w-full">
   <div className="w-screen md:w-full overflow-hidden">
    <Table className="table-auto">
     <TableCaption className="my-8">A list of all tickets.</TableCaption>
     <TableHeader className="bg-purple-50">
      <TableRow>
       <TableHead className="w-1/2 rounded-tl-md text-xs">
        Ticket Information
       </TableHead>

       <TableHead className="text-xs">Priority</TableHead>
       <TableHead className="text-xs">Category</TableHead>

       <TableHead className="w-1/6 text-xs text-center">Assigned</TableHead>
       <TableHead className="w-1/8 text-center rounded-tr-md text-xs">
        Satus
       </TableHead>
       <TableHead className="text-xs text-center">Action</TableHead>
      </TableRow>
     </TableHeader>
     <TableBody className="overflow-x-auto">
      {tickets.map((ticket, index) => (
       <TableRow key={index}>
        <TableCell className="">
         <div className="flex flex-col">
          <div className="items-center">
           <h2 className="text-xs text-muted-foreground mr-1">Requestor:</h2>
           {ticket.requestor}
          </div>
          <Link href={`/dashboard/tickets/${ticket.id}`}>
           <p className="flex text-xs font-bold text-muted-foreground underline hover:text-purple-400 mr-2">
            {ticket.id} <ExternalLink className="w-4 h-4 ml-2 " />
           </p>
          </Link>
          <h2 className="text-xs text-muted-foreground mt-2">Description:</h2>
          <p>{ticket.description}</p>
         </div>
        </TableCell>

        <TableCell className="capitalize ">{ticket.priority}</TableCell>
        <TableCell className="capitalize ">{ticket.category}</TableCell>

        <TableCell className="text-center">{ticket.assignedTo}</TableCell>
        <TableCell className="text-center">{ticket.status}</TableCell>
        <TableCell className="text-right">
         <div className="flex gap-x-2 items-center text-center justify-center">
          <UpdateTicketListButton ticket={ticket} />
          <DeleteTicketListButton ticket={ticket} />
         </div>
        </TableCell>
       </TableRow>
      ))}
     </TableBody>
    </Table>
   </div>
   <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>
  
 );
}
