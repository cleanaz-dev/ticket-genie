import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    

    const content = body.data.content;
    const smartId = body.data.smartId; // Assuming snake_case for consistency
    const creatorName = "Annalia AI";

    // 1. Find Ticket by smartId:
    const ticket = await prisma.ticket.findFirst({
      where: { smartId },
      select: { id: true },
    });

    // 2. Handle Ticket Not Found Case:
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // 3. Create Note:
    const newNote = await prisma.note.create({
      data: {
        content,
        creatorName,
        ticket: { connect: { id: ticket.id } }, // Connect note to the found ticket
      },
    });

    // 4. Return Success Response:
    return new Response(JSON.stringify(newNote), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200, // Status code 200 for successful processing (can be adjusted based on logic)
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500, // Internal Server Error status code
    });
  }
}
