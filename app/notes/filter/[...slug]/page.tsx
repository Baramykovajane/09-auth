import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type RouteParams = {
  slug?: string[];
};

type MetaProps = {
  params: Promise<RouteParams>;
};

export async function generateMetadata(
  { params }: MetaProps
): Promise<Metadata> {
  const { slug } = await params; 

  const tag =
    slug?.[0] && slug[0] !== "all"
      ? slug[0][0].toUpperCase() + slug[0].slice(1)
      : "All Notes";

  return {
    title: `Notes filtered by ${tag} | NoteHub`,
    description: `Browse notes filtered by tag: ${tag} in NoteHub.`,
    openGraph: {
      title: `Notes filtered by ${tag} | NoteHub`,
      description: `Explore ${tag} notes in NoteHub.`,
      url: `https://notehub.app/notes/filter/${slug?.join("/") || "all"}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Filtered Notes",
        },
      ],
    },
  };
}

type Props = {
  params: Promise<RouteParams>;
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function NotesByTagPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;            
  const { page: pageParam, search: searchParam } = await searchParams;

  const tag =
    slug?.[0] && slug[0] !== "all"
      ? slug[0][0].toUpperCase() + slug[0].slice(1)
      : undefined;

  const page = Number(pageParam) || 1;
  const search = searchParam || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      getNotes({
        page,
        perPage: 12,
        search: search || undefined,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        tag={tag}
        initialPage={page}
        initialSearch={search}
      />
    </HydrationBoundary>
  );
}
