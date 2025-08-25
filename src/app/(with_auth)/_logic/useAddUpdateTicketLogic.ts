"use client";

import { CreateUpdateTicketFormSchema, CreateUpdateTicketFormType, TicketType } from "@/api/tickets/models/tickets";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { addTicket, updateTicket } from "./action";
import { ToastLib } from "@/lib/toastLib";

export const useAddUpdateTicketLogic = ({
  ticketData,
  onSuccess,
}: {
  ticketData?: TicketType;
  onSuccess: () => void;
}) => {
  const ticketMutation = useMutation({
    mutationKey: ["addUpdateTicket"],
    mutationFn: async (value: CreateUpdateTicketFormType) => {
      const today = new Date().toISOString();
      if (ticketData) {
        await updateTicket(ticketData.id, {
          ...value,
          createdAt: ticketData.createdAt,
          updatedAt: today,
          deletedAt: ticketData.deletedAt,
        });
      } else {
        await addTicket({
          ...value,
          createdAt: today,
          updatedAt: today,
          deletedAt: "",
        });
      }
    },
    onSuccess: () => {
      ToastLib.success(`Task successfully ${ticketData ? "updated" : "created"}`);
      onSuccess();
    },
    onError: () => {
      ToastLib.error(`Failed to ${ticketData ? "update" : "create"} task. Please try again`);
    },
  });

  const ticketForm = useForm({
    defaultValues: {
      title: ticketData?.title ?? "",
      description: ticketData?.description ?? "",
      assignees: ticketData?.assignees ?? [],
      status: ticketData?.status ?? "todo",
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
