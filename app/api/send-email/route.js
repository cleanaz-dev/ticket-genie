import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


export async function POST(request) {
  try {
    const ticketData = await request.json();
    console.log(ticketData);

    const msg = {
      to: "87hendricks@gmail.com", // Change to your recipient
      from: "founder@cleanazcoding.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
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
  

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    const errorMessage = error.message || "Internal Server Error";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
