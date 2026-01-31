import axios from "axios";
import { cookies } from "next/headers";
import type { FetchNotesResponse, FetchNotesParams } from "@/types/note";
import { nextServer } from './api';
import { User } from '@/types/auth';

export const checkServerSession = async () => {

  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
     
      Cookie: cookieStore.toString(),
    },
  });
 
  return res;
};

const createServerApi = async () => {
  const cookieStore = await cookies(); 
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
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
  const api = await createServerApi();   
  const res = await api.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export async function fetchNoteById(id: string) {
  const res = await fetch(`/notes/${id}`);
  const data = await res.json();

  return {
    ...data,
    createdAt: new Date(data.createdAt).toLocaleString(),
    updatedAt: new Date(data.updatedAt).toLocaleString(),
  };
}

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const checkSession = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};