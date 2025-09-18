'use client';

import { TicketType } from '@/api/tickets/models/tickets';
import { Button } from '@/components/ui/button';
import { sleepAsync } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import z from 'zod';
import { AddEditTicketModal } from '../../_components/AddEditTicketModal';
import { DeleteTicketModal } from './DeleteTicketModal';

const Modals = z.enum(['EDIT', 'DELETE']).enum;
type ModalType = keyof typeof Modals;

export const ActionButtons = ({ ticket }: { ticket: TicketType }) => {
  const router = useRouter();
  const [selectedModal, setSelectedModal] = useState<ModalType | null>(null);

  return (
    <>
      <div className='w-full flex justify-center md:justify-end items-center space-x-2.5'>
        <Button
          className='bg-blue-500 hover:bg-blue-600'
          onClick={() => setSelectedModal(Modals.EDIT)}
        >
          Edit task
        </Button>
        <p>or</p>
        <Button
          className='text-red-500 p-0'
          variant='link'
          onClick={() => setSelectedModal(Modals.DELETE)}
        >
          Delete
        </Button>
      </div>

      <AddEditTicketModal
        isOpen={selectedModal === Modals.EDIT}
        onSuccess={async () => {
          setSelectedModal(null);

          await sleepAsync();
          router.refresh();
        }}
        onCancel={() => setSelectedModal(null)}
        ticketData={ticket}
      />

      <DeleteTicketModal
        isOpen={selectedModal === Modals.DELETE}
        onCancel={() => setSelectedModal(null)}
        onSuccess={async () => {
          setSelectedModal(null);

          await sleepAsync();
          router.push('/');
        }}
        ticketData={ticket}
      />
    </>
  );
};
