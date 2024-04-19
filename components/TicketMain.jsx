"use client";

import React, { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from './ui/label';
import { Button } from './ui/button';
import Link from 'next/link';
import { Textarea } from './ui/textarea';
import { SkipBack } from 'lucide-react';
import { SaveNotes, UpdateTicketButton } from './SubmitButton';
import { updateNotes } from '@/lib/actions';
import { Input } from './ui/input';
import Notes from './Notes';
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { applyStatusColor } from "@/lib/utils";


export default function TicketMain({ ticket, note, userId }) {
  const router = useRouter();
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
  if (!user) {
    router.push("/"); // Use router.push for redirection
    return null; // Prevent rendering if not logged in
  }
  const {
    requestor,
    description,
    status,
    priority,
    contactMethod,
    category,
    id,
    assignedTo,
  } = ticket;

  const statusColor = applyStatusColor(status);


  return (
    <div className="mt-6 pr-10 pl-10 md:pl-0 space-y-4">
      <form action={updateNotes}>
        <Input name="ticketId" value={id} type="hidden" />
        <Input name="userId" value={user.id} type="hidden" />
        <Card className="">
          <CardHeader>
            <div className="space-y-2">
              <CardTitle>Ticket {id} </CardTitle>
              <p className={`inline-flex py-2 px-4 rounded-lg ${statusColor}`}>{status}</p>
            </div>

            <CardDescription>Please review ticket information</CardDescription>
          </CardHeader>
          <CardContent>
            <Label className="text-muted-foreground">Requestor</Label>
            <p>{requestor}</p>
            <Label className="text-muted-foreground">Assigned</Label>
            <p>
              {assignedTo ? (
                assignedTo
              ) : (
                <span className="bg-purple-50 py-1 px-2 rounded-md">
                  Unassigned
                </span>
              )}
            </p>
            <Label className="text-muted-foreground">Descripton</Label>
            <p>{description}</p>
            <Label className="text-muted-foreground">Notes</Label>
            <Textarea
              name="content"
              className="h-[20vh]"
              placeholder="Enter notes here..."
              required
            />
            <Label className="text-muted-foreground">Previous Notes</Label>

            {/* Notes */}
            <Notes notes={note} />
          </CardContent>

          <CardFooter>
            <div className="space-x-4">
              <SaveNotes ticketId={id} />
              <UpdateTicketButton {...ticket} />
            </div>
          </CardFooter>
        </Card>
      </form>
      <div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/tickets">
            <SkipBack /> Back to Tickets
          </Link>
        </Button>
      </div>
    </div>
  );
}
