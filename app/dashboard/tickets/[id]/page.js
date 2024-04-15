import React from 'react'
import { getTicket, getTicketNotes } from '@/lib/actions'
import TicketMain from '@/components/TicketMain'



export default async function SingleTicketPage({ params }) {
  const ticket = await getTicket(params.id);
  const note = await getTicketNotes(params.id);
  return (
    <div>
      <TicketMain ticket={ticket} note={note} />
    </div>
  );
}
