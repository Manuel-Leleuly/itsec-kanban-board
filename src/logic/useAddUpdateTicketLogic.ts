'use client';

import { addTicket, updateTicket } from '@/actions/serverActions';
import {
  CreateUpdateTicketFormSchema,
  CreateUpdateTicketFormType,
  TicketType,
} from '@/api/tickets/models/tickets';
import { DELETED_AT_DEFAULT } from '@/constants/constants';
import { ToastLib } from '@/lib/toastLib';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';

export const useAddUpdateTicketLogic = ({
  ticketData,
  onSuccess,
}: {
  ticketData?: TicketType;
  onSuccess: () => void;
}) => {
  const ticketMutation = useMutation({
    mutationKey: ['addUpdateTicket'],
    mutationFn: async (value: CreateUpdateTicketFormType) => {
      const today = new Date().toISOString();
      let error: Record<string, unknown> | null = null;
      if (ticketData) {
        error = await updateTicket(ticketData.id, {
          ...value,
          createdAt: ticketData.createdAt,
          updatedAt: today,
          deletedAt: ticketData.deletedAt,
        });
      } else {
        error = await addTicket({
          ...value,
          createdAt: today,
          updatedAt: today,
          deletedAt: DELETED_AT_DEFAULT,
        });
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
      onSubmit: CreateUpdateTicketFormSchema,
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
