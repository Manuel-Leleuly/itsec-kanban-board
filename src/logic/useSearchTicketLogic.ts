'use client';

import { useForm } from '@tanstack/react-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSearchTicketLogic = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('title') ?? '');

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set('title', query);
    }
    router.push(`/?${searchParams.toString()}`);
    router.refresh();
  }, [query]);

  const searchForm = useForm({
    defaultValues: {
      searchQuery: query,
    },
    validators: {
      onChangeAsyncDebounceMs: 500,
      onChangeAsync: async ({ value }) => {
        setQuery(value.searchQuery);
      },
    },
  });

  return {
    searchForm,
  };
};
