import { cookies } from "next/headers";
import { nextServer } from "./api";
import type { AxiosResponse } from "axios";
import type { FetchNotesResponse, FetchNotesParams } from "@/types/note";
import type { User } from "@/types/user";
import type { Note } from "@/types/note"


/* -------- AUTH -------- */

export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const cookieStore = await cookies();

  return nextServer.get<User>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
};

/* -------- NOTES -------- */

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
    headers: { Cookie: cookieStore.toString() },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
};
