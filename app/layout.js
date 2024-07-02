import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrackOP-Your Own Expense Tracker",
  description: "The Expense Tracker is a web application designed to help users manage their personal finances by tracking their income and expenses. This application enables users to add, edit, delete, and categorize transactions, providing valuable insights into spending habits through visual representations.",
};

export default function RootLayout({ children }) {

  return (

    <html lang="en">
            <head>
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
    <body className={inter.className}>
      <Navbar/>
      {children}
      <Footer/>
      <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </body>
    </html>
  );
}
