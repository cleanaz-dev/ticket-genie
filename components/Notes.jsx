import React from "react";
import { UserCircle } from "lucide-react";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";
import { formatDate } from "@/lib/utils";




export function NoteItem({ note }) {
  return (
    <div className="flex flex-col bg-purple-50 rounded-md p-4 shadow-sm">
      <div className="flex flex-col">
        <div className="flex align-middle items-center gap-2">
          <UserCircle className="w-6 h-6 mb-1" /> {note.creatorName}
        </div>
        <p className="text-xs text-muted-foreground">
          {formatDate(note.createdAt)}
        </p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
        <div className="flex gap-x-2 mt-2">
          <EditNote note={note} />
          <DeleteNote note={note} />
        </div>
      </div>
    </div>
  );
}

export default function Notes({ notes }) {
  return (
    <div className="space-y-4">
      {notes.length === 0 ? (
        <h1 className="text-muted-foreground text-sm">...No notes...</h1>
      ) : (
        notes.map((note, index) => <NoteItem key={index} note={note} />)
      )}
    </div>
  );
}
