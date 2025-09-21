'use client';

import { Ticket } from '@/api/tickets/models/tickets';
import {
  KanbanModalBody,
  KanbanModalContent,
  KanbanModalFooter,
  KanbanModalHeader,
} from '@/components/KanbanModal/KanbanModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogTitle } from '@/components/ui/dialog';
import { useDeleteTicketLogic } from '@/logic/useDeleteTicketLogic';

export const DeleteTicketModal = ({
  isOpen,
  onSuccess,
  onCancel,
  ticketData,
}: {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  ticketData: Ticket;
}) => {
  const { onDeleteSubmit, isLoading } = useDeleteTicketLogic(onSuccess);

  const onDeleteClick = async () => {
    await onDeleteSubmit(ticketData.id);
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
          <p className='text-gray-500 font-normal'>
            Are you sure you want to delete this task?
          </p>
        </KanbanModalBody>

        <KanbanModalFooter>
          <DialogClose asChild>
            <Button variant={'outline'} disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={onDeleteClick}
            disabled={isLoading}
            className='bg-blue-500 hover:bg-blue-600'
          >
            Yes, delete
          </Button>
        </KanbanModalFooter>
      </KanbanModalContent>
    </Dialog>
  );
};
