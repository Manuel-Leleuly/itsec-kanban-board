"use client";

import {
  CreateUpdateTicketReqBodySchema,
  CreateUpdateTicketReqBodyType,
  TicketType,
} from "@/api/tickets/models/tickets";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { addTicket, updateTicket } from "./action";
import { toast } from "sonner";

export const useAddUpdateTicketLogic = ({
  ticketData,
  onSuccess,
}: {
  ticketData?: TicketType;
  onSuccess: () => void;
}) => {
  const today = new Date().toISOString();

  const ticketMutation = useMutation({
    mutationKey: ["addUpdateTicket"],
    mutationFn: async (value: CreateUpdateTicketReqBodyType) => {
      if (ticketData) {
        await updateTicket(ticketData.id, value);
      } else {
        await addTicket(value);
      }
    },
    onSuccess: () => {
      toast.success(`Task successfully ${ticketData ? "updated" : "created"}`);
      onSuccess();
    },
    onError: () => {
      toast.error(`Failed to ${ticketData ? "update" : "create"} task. Please try again`);
    },
  });

  const ticketForm = useForm({
    defaultValues: {
      title: ticketData?.title ?? "",
      description: ticketData?.description ?? "",
      assignees: ticketData?.assignees ?? [],
      status: ticketData?.status ?? "todo",
      createdAt: ticketData?.createdAt ?? today,
      updatedAt: today,
      deletedAt: ticketData?.deletedAt ?? "",
    },
    validators: {
      onSubmit: CreateUpdateTicketReqBodySchema,
    },
    onSubmit: ({ value }) => {
      ticketMutation.mutate(value);
    },
    canSubmitWhenInvalid: false,
  });

  return { ticketForm, isLoading: ticketMutation.isPending, error: ticketMutation.error };
};
