import React from 'react'
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createTicket } from "@/lib/actions";
import { SubmitButton } from "./SubmitButton";


export default function CreateNewTicket(userEmail) {
	const email = userEmail.userEmail
	console.log(email)
  return (
    <Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<PlusCircle className="text-purple-500 w-8 h-8" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px] md:max-w-[850px]">
				<DialogHeader>
					<DialogTitle>New Ticket</DialogTitle>
					<DialogDescription>
						Enter information about the new ticket
					</DialogDescription>
				</DialogHeader>
				<form action={createTicket}>
					<input type="hidden" name="email" value={email} />
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="name" className="text-right">
								Requestor
							</Label>
							<Input
								name="requestor"
								placeholder="Please enter requestor"
								className="col-span-3"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right">Category</Label>
							<Select name="category">
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Please select a category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="hardware">Hardware</SelectItem>
									<SelectItem value="software">Software</SelectItem>
									<SelectItem value="cardAccess">Card Access</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right">Priority</Label>
							<Select name="priority">
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Please select priority" />
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
							<Label className="text-right">Description</Label>
							<Textarea
								name="description"
								placeholder="Type your description here..."
								className="col-span-3 truncate"
							/>
						</div>

						<div className="grid grid-cols-4 items-center gap-4">
							<Label className="text-right">Contact Method</Label>
							<Select name="contactMethod">
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder="Please your preferred method of contact" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="phone">Phone</SelectItem>
									<SelectItem value="email">Email</SelectItem>
									<SelectItem value="sms">SMS</SelectItem>
									<SelectItem value="smokeSignal">Smoke Signal</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<DialogFooter>
						<div className="flex justify-center items-center gap-x-2">
							<p className="text-xs font-light text-rose-500">
								Ticket information will be sent to your email address
								<span className="font-semibold"></span>
							</p>
							<DialogClose>
								<SubmitButton />
							</DialogClose>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
  )
}
