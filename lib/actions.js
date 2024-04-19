"use server"

// import { toast } from "react-toastify";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {v4 as uuidv4} from 'uuid';
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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


export const getUserEmail= async (clerkId) => {
	
	try {
		const user = await prisma.user.findUnique({
			where: { clerkId: clerkId },
			select: { email: true },
		});
		
		return user.email;
	} catch (error) {
		console.error("Error fetching user type:", error);
		throw new Error("Failed to fetch user type");
	}
};





export const createTicket = async (formData) => {
  // Extract ticket data from formData (unchanged)
  const requestor = formData.get("requestor");
  const category = formData.get("category");
  const priority = formData.get("priority");
  const description = formData.get("description");
  const contactMethod = formData.get("contactMethod");
  const email = formData.get("email");
  console.log(formData)
  

  try {
	let smartId;
    const useAi = formData.get("useAi") === "true";

	if (useAi) {
		// Generate a UUID only if useAi is true
		smartId = uuidv4();
	  }
    // Create a ticket in the database using Prisma (unchanged)
    const ticketData = await prisma.ticket.create({
      data: {
		smartId,
        requestor,
        category,
        priority,
        description,
        contactMethod,
		useAI: useAi,		
      },
    });
    	
    // Send notification email (unchanged)
    const msg = {
      to: email, // Change to your recipient
      from: "founder@cleanazcoding.com", // Change to your verified sender
      subject: "Send with SendGrid API",
      html: `
        <h3>New Ticket Information</h3>
        <ul>
          <li>Requestor: ${ticketData.requestor}</li>
          <li>Category: ${ticketData.category}</li>
          <li>Priority: ${ticketData.priority}</li>
          <li>Description: ${ticketData.description}</li>
          <li>Contact Method: ${ticketData.contactMethod}</li>
        </ul>
      `,
    };

    await sgMail.send(msg);

    // Send ticket data to webhook URL
    if (useAi) {
      const webhookUrl = "https://hook.us1.make.com/lj96fs17g4mnghubhhyy797vxj1q8e77";
      const ticketDataForWebhook = {
        smartId,
        requestor,
        category,
        priority,
        description,
        contactMethod,
        email,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ticketDataForWebhook),
      });

      if (!response.ok) {
        console.error("Error sending ticket data to webhook:", response.statusText);
      } else {
        console.log("Ticket data sent to webhook successfully!");
      }
    }
  } catch (error) {
    console.error(error);
  }

  redirect("/dashboard/tickets/");
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
	const clerkId = formData.get("userId")
	try {
		// Fetch user's name using userId
		const user = await prisma.user.findFirst({
			where: { clerkId: clerkId },
			select: { 
				name: true,
				id: true,
			},
		});

		// Check if user exists
		if (!user) {
			throw new Error(`User with id ${clerkId} not found`);
		}

		// Create a new note with the provided content, ticketId, createdBy (user), and creatorName
		const newNote = await prisma.note.create({
			data: {
				content: newContent,
				ticket: { connect: { id: ticketId } },
				createdBy: { connect: { id: user.id } },
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