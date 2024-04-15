import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
	weight: ["100","200","300","400", "500", "600", "700"],
	subsets: ["latin"],
})

export const metadata = {
  title: "Ticket Genie",
  description: "Simple Ticket App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Navbar />
          {children}
          </body>
      </html>
    </ClerkProvider>
  );
}
