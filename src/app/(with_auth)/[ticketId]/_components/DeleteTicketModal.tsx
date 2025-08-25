"use client";

import { TicketType } from "@/api/tickets/models/tickets";
import { useDeleteTicketLogic } from "../_logic/useDeleteTicketLogic";
import { ObjectUtils } from "@/utils/objectUtils";
import { Dialog, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  KanbanModalBody,
  KanbanModalContent,
  KanbanModalFooter,
  KanbanModalHeader,
} from "@/components/KanbanModal/KanbanModal";

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
      <KanbanModalContent
        onInteractOutside={(e) => {
          if (isLoading) e.preventDefault();
        }}
      >
        <KanbanModalHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </KanbanModalHeader>

        <KanbanModalBody>
          <p className="text-gray-500 font-normal">Are you sure you want to delete this task?</p>
        </KanbanModalBody>

        <KanbanModalFooter>
          <DialogClose asChild>
            <Button variant={"outline"} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onDeleteClick} disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
            Yes, delete
          </Button>
        </KanbanModalFooter>
      </KanbanModalContent>
    </Dialog>
  );
};
