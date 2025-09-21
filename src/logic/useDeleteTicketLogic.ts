'use client';

import { deleteTicket } from '@/api/tickets/actions/ticketServerAction';
import { ToastLib } from '@/lib/toastLib';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTicketLogic = (onSuccess: () => void) => {
  const deleteMutation = useMutation({
    mutationKey: ['deleteTicket'],
    mutationFn: async (ticketId: string) => {
      const error = await deleteTicket(ticketId);
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
    onDeleteSubmit: deleteMutation.mutateAsync,
    isLoading: deleteMutation.isPending,
    error: deleteMutation.error,
  };
};
