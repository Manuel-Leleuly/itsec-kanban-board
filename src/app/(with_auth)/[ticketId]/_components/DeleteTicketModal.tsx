"use client";

import { TicketType } from "@/api/tickets/models/tickets";
import { useDeleteTicketLogic } from "../_logic/useDeleteTicketLogic";
import { ObjectUtils } from "@/utils/objectUtils";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteTicketModal = ({
  isOpen,
  onSuccess,
  onCancel,
  ticketData,
}: {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  ticketData: TicketType;
}) => {
  const { onDeleteSubmit, isLoading, error } = useDeleteTicketLogic(onSuccess);

  const onDeleteClick = () => {
    const newTicketData = ObjectUtils.cloneObject(ticketData);
    newTicketData.deletedAt = new Date().toISOString();
    onDeleteSubmit({ ticketId: newTicketData.id, reqBody: newTicketData });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent
        onInteractOutside={(e) => {
          if (isLoading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        <p className="text-gray-500 font-normal">Are you sure you want to delete this task?</p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onDeleteClick} disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
