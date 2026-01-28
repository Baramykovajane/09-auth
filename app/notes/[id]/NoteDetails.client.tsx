"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { useRouter } from 'next/navigation';

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const handleGoBack = () => {
    const isSure = confirm('Are you sure?');
    if (!isSure) return;
    if (window.history.length > 1) router.back();
    else router.push("/notes");
  };

  if (!id) return <p>Note ID not found.</p>;
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error && error instanceof Error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Note not found.</p>;

  return (
    <div>
      <button onClick={handleGoBack}>Back</button>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{new Date(data.createdAt).toLocaleString()}</p>
    </div>
  );
}
