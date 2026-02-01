import axios from "axios";
import { cookies } from "next/headers";
import type { FetchNotesResponse, FetchNotesParams } from "@/types/note";
import { User } from "@/types/auth";

const createServerApi = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return axios.create({
    baseURL: `${process.env.API_URL}/api`, 
    headers: { Cookie: cookieHeader },
  });
};

/* -------- AUTH -------- */

export const getMe = async (): Promise<User> => {
  const api = await createServerApi();
  const { data } = await api.get("/users/me");
  return data;
};

export const checkSession = async (): Promise<User> => {
  const api = await createServerApi();
  const { data } = await api.get("/auth/session");
  return data;
};

/* -------- NOTES -------- */

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const api = await createServerApi();
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const api = await createServerApi();
  const { data } = await api.get(`/notes/${id}`);

  return {
    ...data,
    createdAt: new Date(data.createdAt).toLocaleString(),
    updatedAt: new Date(data.updatedAt).toLocaleString(),
  };
};
