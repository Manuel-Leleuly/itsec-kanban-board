'use client';

import { AddEditTicketModal } from '@/app/(with_auth)/_components/AddEditTicketModal';
import { SearchBar } from '@/components/Navbar/SearchBar';
import { Button } from '@/components/ui/button';
import { sleepAsync } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';

const MODALS = z.enum(['CREATE']).enum;
type ModalType = keyof typeof MODALS;

export const Navbar = () => {
  const router = useRouter();
  const [selectedModal, setSelectedModal] = useState<ModalType | null>(null);

  return (
    <>
      <div className='h-16 bg-card border-b border-border px-6 grid grid-cols-3 items-center'>
        <SearchBar />

        <div className='mx-auto'>
          <h2 className='text-lg font-semibold text-foreground'>
            Project Dashboard
          </h2>
        </div>

        <div className='flex justify-end items-center'>
          <Button
            className='h-9 bg-primary w-fit'
            size='sm'
            onClick={() => setSelectedModal(MODALS.CREATE)}
          >
            Add a task
          </Button>
        </div>
      </div>

      <AddEditTicketModal
        isOpen={selectedModal === MODALS.CREATE}
        onSuccess={async () => {
          setSelectedModal(null);

          // sleep to avoid modal flickering during server page re-render
          await sleepAsync();
          router.refresh();
        }}
        onCancel={() => setSelectedModal(null)}
      />
    </>
  );
};
