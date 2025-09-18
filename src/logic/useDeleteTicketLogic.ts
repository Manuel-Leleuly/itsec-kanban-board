'use client';

import { deleteTicket } from '@/actions/serverActions';
import { CreateUpdateTicketReqBodyType } from '@/api/tickets/models/tickets';
import { ToastLib } from '@/lib/toastLib';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTicketLogic = (onSuccess: () => void) => {
  const deleteMutation = useMutation({
    mutationKey: ['deleteTicket'],
    mutationFn: async ({
      ticketId,
      reqBody,
    }: {
      ticketId: string;
      reqBody: CreateUpdateTicketReqBodyType;
    }) => {
      const error = await deleteTicket(ticketId, reqBody);
      if (error) throw error;
    },
    onSuccess: () => {
      ToastLib.success('Task already deleted');
      onSuccess();
    },
    onError: () => {
      ToastLib.error('Failed to delete task. Please try again');
    },
  });

  return {
    onDeleteSubmit: deleteMutation.mutate,
    isLoading: deleteMutation.isPending,
    error: deleteMutation.error,
  };
};
