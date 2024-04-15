import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CircleX, Delete } from "lucide-react";
import { Input } from "./ui/input";
import { deleteSingleTicketList } from "@/lib/actions";
import { DeleteSingleTicketButton } from "./SubmitButton";

export default function DeleteTicketListButton({ ticket }) {
  const { id } = ticket;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="submit"
          className="bg-rose-400 p-2 rounded-md text-white hover:bg-rose-500"
        >
          <CircleX className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete Ticket</DialogTitle>
          <DialogDescription>
            <div className="space-y-2">
              <p>Are you sure you want to delete this ticket?</p>
              <p className="font-semibold">{id}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <form action={deleteSingleTicketList}>
          <Input
            name="ticketId"
            value={id}
            className="col-span-3 border-none"
            type="hidden"
          />

          <DialogFooter>
            <DialogClose>
              <DeleteSingleTicketButton />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
