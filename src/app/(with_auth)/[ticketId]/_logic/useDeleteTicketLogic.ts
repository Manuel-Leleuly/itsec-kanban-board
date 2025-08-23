"use client";

import { CreateUpdateTicketReqBodyType } from "@/api/tickets/models/tickets";
import { useMutation } from "@tanstack/react-query";
import { deleteTicket } from "../../_logic/action";
import { ToastLib } from "@/lib/toastLib";

export const useDeleteTicketLogic = (onSuccess: () => void) => {
  const deleteMutation = useMutation({
    mutationKey: ["deleteTicket"],
    mutationFn: async ({ ticketId, reqBody }: { ticketId: string; reqBody: CreateUpdateTicketReqBodyType }) => {
      await deleteTicket(ticketId, reqBody);
    },
    onSuccess: () => {
      ToastLib.success("Task already deleted");
      onSuccess();
    },
    onError: () => {
      ToastLib.error("Failed to delete task. Please try again");
    },
  });

  return {
    onDeleteSubmit: deleteMutation.mutate,
    isLoading: deleteMutation.isPending,
    error: deleteMutation.error,
  };
};
