
import { nextServer } from "./api";
import type {
  Note,
  FetchNotesResponse,
  FetchNotesParams,
  CreateNotePayload,
} from "@/types/note";
import type {
  RegisterRequest,
  LoginRequest,
  User,
} from "@/types/auth"
/* -------- NOTES -------- */

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
  });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (
  payload: CreateNotePayload
): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", payload);
  return res.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};


export async function register(payload: RegisterRequest) {
  const { data } = await nextServer.post<User>("/auth/register", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function login(payload: LoginRequest) {
  const { data } = await nextServer.post<User>("/auth/login", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function checkSession() {
  const { data } = await nextServer.get<{ success: boolean }>("/auth/session");

  return data.success;
}
export async function logout() {
  await nextServer.post("/auth/logout");
}


export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");

  return data;
}

export const updateMe = async (payload: { username?: string; avatar?: string }) => {
  const backendPayload = {
    username: payload.username, 
    avatar: payload.avatar,   
  };

  const { data } = await nextServer.patch("/users/me", backendPayload);
  return data;
};