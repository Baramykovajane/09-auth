import axios from "axios";
import { cookies } from "next/headers";
import type { Note, FetchNotesResponse, FetchNotesParams } from "@/types/note";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const createServerApi = async () => {
  const cookieStore = await cookies(); // ✅ так треба

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  return axios.create({
    baseURL,
    headers: {
      Cookie: cookieHeader,
    },
  });
};

/* -------- NOTES -------- */

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const api = await createServerApi();   // 🔥 ОСЬ ГОЛОВНЕ
  const res = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const api = await createServerApi();   // 🔥 І ТУТ
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};

/* -------- AUTH -------- */

export const getMe = async () => {
  const api = await createServerApi();
  const { data } = await api.get("/users/me");
  return data;
};

export const checkSession = async () => {
  const api = await createServerApi();
  const { data } = await api.get("/auth/session");
  return data;
};
