"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateTicketMain } from "@/lib/actions";

import { Loader2Icon, Save } from "lucide-react";
import { Button } from "./ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className="bg-purple-500">
          Submit Ticket
        </Button>
      )}
    </>
  );
}
export function UpdateTicketButton({ id, status, contactMethod }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Update Ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={updateTicketMain}>
          <DialogHeader>
            <DialogTitle>Update Ticket</DialogTitle>
            <DialogDescription>
              Save notes and change ticket status. User will be notified.
            </DialogDescription>
          </DialogHeader>

          <input type="hidden" name="ticketId" value={id} />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Contact Method
              </Label>
              <Input id="name" value={contactMethod} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Status
              </Label>
              <Select name="status">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Please select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">NEW</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                  <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                  <SelectItem value="CLOSED">CLOSED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <UpdateMainTicketButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function SaveNotes() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className="bg-purple-500">
          Save Notes
        </Button>
      )}
    </>
  );
}

export function UpdateMainTicketButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className="bg-purple-500">
          Update
        </Button>
      )}
    </>
  );
}

export function DeleteSingleNoteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className="bg-rose-500">
          Delete Note
        </Button>
      )}
    </>
  );
}

export function EditSingleNoteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className="bg-purple-500">
          Edit Note
        </Button>
      )}
    </>
  );
}

export function SaveAssignedToButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <button
          type="submit"
          className="bg-purple-400 p-2 rounded-md text-white hover:bg-purple-500"
        >
          <Save className="w-4 h-4" />
        </button>
      )}
    </>
  );
}

export function UpdateStatusAndTierButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className="bg-purple-500">
          Update Ticket
        </Button>
      )}
    </>
  );
}

export function DeleteSingleTicketButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled className="">
          <Loader2Icon className="w-4 h-4 animate-spin" />
        </Button>
      ) : (
        <Button type="submit" className="bg-rose-500">
          Delete Ticket
        </Button>
      )}
    </>
  );
}
