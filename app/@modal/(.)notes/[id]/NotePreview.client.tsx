"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "@/styles/NotePreview.module.css"

export default function NotePreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false, 
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        Loading...
      </Modal>
    );
  }

  if (isError || !data) {
    return (
      <Modal onClose={handleClose}>
        Error loading note
      </Modal>
    );
  }

  return (
  <Modal onClose={handleClose}>
    <div className={css.container}>
  <div className={css.item}>
    <div className={css.header}>
      <h2>{data.title}</h2>
      <span className={css.tag}>{data.tag}</span>
    </div>

    <p className={css.content}>{data.content}</p>

    <small className={css.date}>
      {new Date(data.createdAt).toLocaleString()}
    </small>

    <button className={css.backBtn} onClick={handleClose}>
      ← Back
    </button>
  </div>
</div>

  </Modal>
);

}
