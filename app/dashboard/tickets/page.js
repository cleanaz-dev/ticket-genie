import CreateNewTicket from "@/components/CreateNewTicket";
import TicketList from "@/components/TicketList";
import React from "react";

export default function TicketsPage() {
  return (
    <div>
      <h1 className="text-2xl mb-2 font-thin mt-2">
        <CreateNewTicket />
      </h1>
      {/* Scrollable container */}

      {/* Adjust max-height as needed */}
      <TicketList />
    </div>
  );
}
