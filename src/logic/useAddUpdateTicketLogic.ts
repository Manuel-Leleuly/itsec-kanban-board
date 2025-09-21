'use client';

import {
  createTicket,
  updateTicket,
} from '@/api/tickets/actions/ticketServerAction';
import {
  Ticket,
  TicketCreateUpdateForm,
  TicketCreateUpdateFormSchema,
} from '@/api/tickets/models/tickets';
import { ToastLib } from '@/lib/toastLib';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';

export const useAddUpdateTicketLogic = ({
  ticketData,
  onSuccess,
}: {
  ticketData?: Ticket;
  onSuccess: () => void;
}) => {
  const ticketMutation = useMutation({
    mutationKey: ['addUpdateTicket'],
    mutationFn: async (value: TicketCreateUpdateForm) => {
      const today = new Date().toISOString();
      let error: Record<string, unknown> | null = null;
      if (ticketData) {
        error = await updateTicket(ticketData.id, value);
      } else {
        error = await createTicket(value);
      }
      if (error) throw error;
    },
    onSuccess: () => {
      ToastLib.success(
        `Task successfully ${ticketData ? 'updated' : 'created'}`,
      );
      onSuccess();
    },
    onError: () => {
      ToastLib.error(
        `Failed to ${ticketData ? 'update' : 'create'} task. Please try again`,
      );
    },
  });

  const ticketForm = useForm({
    defaultValues: {
      title: ticketData?.title ?? '',
      description: ticketData?.description ?? '',
      assignees: ticketData?.assignees ?? [],
      status: ticketData?.status ?? 'todo',
    },
    validators: {
      onSubmit: TicketCreateUpdateFormSchema,
    },
    onSubmit: ({ value }) => {
      ticketMutation.mutate(value);
    },
    canSubmitWhenInvalid: false,
  });

  return {
    ticketForm,
    isLoading: ticketMutation.isPending,
    error: ticketMutation.error,
  };
};
