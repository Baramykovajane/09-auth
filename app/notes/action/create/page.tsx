
import type { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "@/styles/CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create note | Notes App",
  description: "Page for creating a new note in the Notes application.",
  metadataBase: new URL("https://notehub.app"),

  alternates: {
    canonical: "/notes/action/create",
  },

  openGraph: {
    title: "NoteHub — Smart Notes App",
    description: "Create, manage and find your notes easily with NoteHub.",
    url: "https://notehub.app/notes/action/create", 
    type: "website",
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


export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
