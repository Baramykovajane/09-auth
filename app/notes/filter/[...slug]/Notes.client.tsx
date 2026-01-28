'use client';

import { useState } from 'react';
import { useQuery,keepPreviousData } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from "next/link";
import { getNotes } from '@/lib/api';
import type { FetchNotesResponse } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';


import css from '@/styles/NotesPage.module.css';

const PER_PAGE = 12;

type Props = {
  tag?: string;
  initialPage: number;
  initialSearch: string;
};

export default function NotesClient({ tag, initialPage, initialSearch }: Props) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 500);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

   const { data, isLoading, isError, isFetching } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      getNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearch || undefined,
        tag,
      }),
    placeholderData: keepPreviousData,   

  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {tag && (
          <Link href="/notes/filter/all" className={css.link}>
            All notes
          </Link>
        )}

        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            pageCount={data.totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
  Create note +
</Link>
      </header>
      
 {(isLoading || isFetching) && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}


    </div>
  );
}
