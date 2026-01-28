"use client";

import { useEffect } from "react";
import css from "@/styles/Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
