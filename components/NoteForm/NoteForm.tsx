'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import type { NoteTag } from "@/types/note";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import css from "@/styles/NoteForm.module.css";

interface NoteFormProps {
  onClose?: () => void;
  onCreated?: () => void;
}

export default function NoteForm({ onClose, onCreated }: NoteFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    tag?: string;
  }>({});

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      if (onCreated) onCreated();
      else router.back();
    },
  });

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!draft.title.trim()) newErrors.title = "Title is required";
    else if (draft.title.trim().length < 3) newErrors.title = "Title is too short";
    else if (draft.title.trim().length > 50) newErrors.title = "Title is too long";

    if (draft.content.trim().length > 500) newErrors.content = "Content is too long";

    if (!["Todo", "Work", "Personal", "Meeting", "Shopping"].includes(draft.tag)) {
      newErrors.tag = "Invalid tag";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    mutation.mutate({
      title: draft.title.trim(),
      content: draft.content.trim(),
      tag: draft.tag as NoteTag,
    });
  };

  const handleCancel = () => {
    if (onClose) onClose();
    else router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          type="text"
          name="title"
          value={draft.title}
          onChange={handleChange}
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          name="content"
          value={draft.content}
          onChange={handleChange}
          rows={6}
          className={css.textarea}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          name="tag"
          value={draft.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </label>

      <div className={css.actions}>
        <button type="button" onClick={handleCancel} className={css.cancelButton}>
          Cancel
        </button>
        <button type="submit" disabled={mutation.isPending} className={css.submitButton}>
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
