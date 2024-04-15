import { Edit2 } from "lucide-react";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { updateTicketList } from "@/lib/actions";
import { UpdateStatusAndTierButton } from "./SubmitButton";

export function UpdateTicketListButton({ ticket }) {
  const { id, status, assignedTo, priority, category } = ticket;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="submit"
          className="bg-purple-400 p-2 rounded-md text-white hover:bg-purple-500"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Ticket</DialogTitle>
          <DialogDescription>Update ticket information</DialogDescription>
        </DialogHeader>
        <form action={updateTicketList}>
          <input type="hidden" name="ticketId" value={id} />
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Priority
              </Label>
              <Select
                name="priority"
                placeholder={priority}
                defaultValue={priority}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Please select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Category
              </Label>
              <Select
                name="category"
                placeholder={category}
                defaultValue={category}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Please select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="cardAccess">Card Access</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Assigned To
              </Label>
              <Select
                name="assignedTo"
                placeholder={assignedTo}
                defaultValue={assignedTo}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Please select Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tier 1">Tier 1</SelectItem>
                  <SelectItem value="Tier 2">Tier 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Status
              </Label>
              <Select name="status" defaultValue={status} placeholder={status}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="please select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NEW">NEW</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                  <SelectItem value="CLOSED">CLOSED</SelectItem>
                  <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <UpdateStatusAndTierButton />
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
