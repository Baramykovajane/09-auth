import axios from "axios";
import type { Note, NoteTag } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

axios.interceptors.request.use(config => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* ===== Types ===== */

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

/* ===== API ===== */


export const getNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search, tag },
  });
  return res.data;
};
export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const res = await axios.post<Note>("/notes", payload);
  return res.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${noteId}`);
  return res.data;
};
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};