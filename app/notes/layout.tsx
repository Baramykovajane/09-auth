import type { ReactNode } from "react";


export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div >
      {children}
    </div>
  );
}