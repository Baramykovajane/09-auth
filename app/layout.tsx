import TanstackProvider from "@/components/TanStackProvider/TanStackProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub — Smart Notes App",
  description: "NoteHub is a modern app for creating, organizing and searching notes with tags and filters.",
  openGraph: {
    title: "NoteHub — Smart Notes App",
    description: "Create, manage and find your notes easily with NoteHub.",
    url: "https://notehub.app", 
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub App",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={roboto.variable}>
        <TanstackProvider>
          <Header />

          {children}

          {modal}
  
          <Footer />
        </TanstackProvider>
      </body>
    </html>
  );
}

