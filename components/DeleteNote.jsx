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

import { Button } from "./ui/button";
import { Delete } from "lucide-react";
import { Input } from "./ui/input";
import { deleteTicketNote } from "@/lib/actions";
import { DeleteSingleNoteButton } from "./SubmitButton";

export default function DeleteNote({ note }) {
  const noteContent = note.content;
  const tickedId = note.ticketId;
  const noteId = note.id;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-rose-400 hover:text-white h-full transition-colors 
                        duration-150"
          type="button"
        >
          <Delete className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete note?
          </DialogDescription>
        </DialogHeader>
        <form action={deleteTicketNote}>
          <div className="">
            <Input
              name="ticketId"
              value={tickedId}
              className="col-span-3 border-none"
              type="hidden"
            />
            <Input
              name="noteId"
              value={noteId}
              className="col-span-3 border-none"
              type="hidden"
            />
            {noteContent}
          </div>

          <DialogFooter>
            <DialogClose>
              <DeleteSingleNoteButton />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
