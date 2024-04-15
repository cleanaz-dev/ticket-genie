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
import { Edit } from "lucide-react";
import { Input } from "./ui/input";
import { editTicketNote } from "@/lib/actions";
import { EditSingleNoteButton } from "./SubmitButton";
import { Textarea } from "./ui/textarea";

export default function EditNote({ note }) {
  const noteContent = note.content;
  const tickedId = note.ticketId;
  const noteId = note.id;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-purple-400 hover:text-white h-full transition-colors 
                        duration-150"
          type="button"
        >
          <Edit className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Are you sure you want to edit this note?
          </DialogDescription>
        </DialogHeader>
        <form action={editTicketNote}>
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
            <Textarea
              name="noteContent"
              defaultValue={noteContent}
              className="input input-bordered w-full mb-4"
              type="text"
              required
            />
          </div>

          <DialogFooter>
            <DialogClose>
              <EditSingleNoteButton />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
