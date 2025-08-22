"use client";

import { CreateUpdateTicketReqBodyType } from "@/api/tickets/models/tickets";
import { useMutation } from "@tanstack/react-query";
import { deleteTicket } from "../../_logic/action";
import { toast } from "sonner";

export const useDeleteTicketLogic = (onSuccess: () => void) => {
  const deleteMutation = useMutation({
    mutationKey: ["deleteTicket"],
    mutationFn: async ({ ticketId, reqBody }: { ticketId: string; reqBody: CreateUpdateTicketReqBodyType }) => {
      await deleteTicket(ticketId, reqBody);
    },
    onSuccess: () => {
      toast.success("Task already deleted");
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to delete task. Please try again");
    },
  });

  return {
    onDeleteSubmit: deleteMutation.mutate,
    isLoading: deleteMutation.isPending,
    error: deleteMutation.error,
  };
};
