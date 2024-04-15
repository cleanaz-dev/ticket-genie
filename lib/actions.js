"use server"

// import { toast } from "react-toastify";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import axios from "axios";



{/* Create User */}

export const createUser = async (user) => {
	
console.log(user)
	// Check if user with userId already exists
	const existingUser = await prisma.user.findUnique({
		where: {
			id: user.id
		},
	});

	if (existingUser) {
		console.log("User already exists:", existingUser);
		// Handle the case where the user already exists, such as showing an error message or returning early
		return;
	}

	// User does not exist, create a new user
	const newUser = await prisma.user.create({
		data: {
			email: user.email,
			id: user.id,
			name: user.name,
			userType: "Requestor"
		},
	});
	console.log("New user created:", newUser);
};

{/* Get User Type */}


export const getUserType = async (userId) => {
    
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { userType: true },
		});
		return user.userType;
        
	} catch (error) {
		console.error("Error fetching user type:", error);
		throw new Error("Failed to fetch user type");
	}
};


export const getUserEmail= async (userId) => {
	
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { email: true },
		});
		
		return user.email;
	} catch (error) {
		console.error("Error fetching user type:", error);
		throw new Error("Failed to fetch user type");
	}
};





export const createTicket = async (formData) => {
	const requestor = formData.get("requestor");
	const category = formData.get("category");
	const priority = formData.get("priority");
	const description = formData.get("description");
	const contactMethod = formData.get("contactMethod");
	// const userEmail = formData.get("userEmail");

	

	try {
		// Create a ticket in the database using Prisma
		await prisma.ticket.create({
			data: {
				requestor,
				category,
				priority,
				description,
				contactMethod,
			},
		});
		// Redirect to the ticket dashboard page
		redirect("/dashboard/tickets");
	} catch (error) {
		console.error("Send POST error");
		// Handle error
	}
};


export const getAllTickets = async () => {
    return await prisma.ticket.findMany()
    
}

export const getTicket = async (id) => {
	return prisma.ticket.findUnique({
		where: { id },
	});
};

export async function updateNotes(formData) {
	

	const newContent = formData.get("content");
	const ticketId = formData.get("ticketId");
	const userId = formData.get("userId")

	try {
		// Fetch user's name using userId
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { name: true },
		});

		// Check if user exists
		if (!user) {
			throw new Error(`User with id ${userId} not found`);
		}

		// Create a new note with the provided content, ticketId, createdBy (user), and creatorName
		const newNote = await prisma.note.create({
			data: {
				content: newContent,
				ticket: { connect: { id: ticketId } },
				createdBy: { connect: { id: userId } },
				creatorName: user.name, // Adding the user's name as creatorName
			},
		});

		// Trigger revalidation of the ticket page
		revalidatePath(`/dashboard/tickets/${ticketId}`); // Adjust the path accordingly
		return newNote;
	} catch (error) {
		console.error("Error updating notes:", error);
		throw error;
	}
}
export async function getTicketNotes(id) {
    return prisma.note.findMany({
        where: { 
            ticketId: id, 
        },
    })
}

export async function deleteTicketNote(formData) {
    const id = formData.get("noteId");
    const ticketId = formData.get("ticketId");
    await prisma.note.delete({
        where: {
            id ,
        }
    })
    revalidatePath(`/dashboard/tickets/${ticketId}`);
}

export const editTicketNote = async (formData) => {
	const id = formData.get("noteId");
    const ticketId = formData.get("ticketId");
	const content = formData.get("noteContent");
	

	await prisma.note.update({
		where: {
			id,
		},
		data: {
			content,
			
		},
	});
	revalidatePath(`/dashboard/tickets/${ticketId}`);
};


export async function updateTicketList(formData) {
	const id = formData.get("ticketId");
	const status = formData.get("status");
	const assignedTo = formData.get("assignedTo");
	const priority = formData.get("priority")
	const category = formData.get("category")
	
	await prisma.ticket.update({
		where: {
			id,
		},
		data: {
			status,
			assignedTo,
			category,
			priority,
		},
	});
    revalidatePath("/dashboard/tickets/");
}

export async function deleteSingleTicketList(formData) {
	const id = formData.get("ticketId");

	try {
		// Delete all notes associated with the ticket
		await prisma.note.deleteMany({
			where: {
				ticketId: id,
			},
		});

		// Delete the ticket itself
		await prisma.ticket.delete({
			where: {
				id,
			},
		});

		// Trigger revalidation of the ticket list page
		revalidatePath("/dashboard/tickets");
	} catch (error) {
		console.error("Error deleting ticket and associated notes:", error);
		throw error;
	}
}

export async function updateTicketMain(formData) {
	const id = formData.get("ticketId");
	const status = formData.get("status");
	console.log(formData)

	await prisma.ticket.update({
		where: {
			id,
		},
		data: {
			status,
		},
	});
    redirect("/dashboard/tickets/");
}