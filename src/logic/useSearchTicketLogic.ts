'use client';

import { useForm } from '@tanstack/react-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSearchTicketLogic = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (query) {
      searchParams.set('title', query);
    }
    router.push(`/?${searchParams.toString()}`);
  }, [query]);

  const searchForm = useForm({
    defaultValues: {
      searchQuery: searchParams.get('title') ?? '',
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
