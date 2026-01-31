
import api from "./api";
import type {
  Note,
  User,
  FetchNotesResponse,
  FetchNotesParams,
  CreateNotePayload,
} from "@/types/note";

/* -------- NOTES -------- */

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const res = await api.post<Note>("/notes", payload);
  return res.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const res = await api.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

/* -------- AUTH -------- */

export const register = async (payload: { email: string; password: string }) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const login = async (payload: { email: string; password: string }) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async () => {
  const { data } = await api.get("/auth/session");
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get("/users/me");
  return data;
};

export const updateMe = async (payload: {
  username?: string;
  avatar?: string;
}) => {
  const { data } = await api.patch("/users/me", payload);
  return data;
};
