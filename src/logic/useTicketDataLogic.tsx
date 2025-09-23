'use client';

import { updateTicket } from '@/api/tickets/actions/ticketServerAction';
import { Ticket } from '@/api/tickets/models/tickets';
import { TicketStatusType } from '@/constants/constants';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { ToastLib } from '@/lib/toastLib';
import { ObjectUtils } from '@/utils/objectUtils';
import { useEffect, useState } from 'react';

export const useTicketDataLogic = (tickets: Ticket[]) => {
  const [ticketData, setTicketData] = useState(() => {
    const ticketMap: Record<'todo' | 'doing' | 'done', Ticket[]> = {
      todo: [],
      doing: [],
      done: [],
    };

    for (const ticket of tickets) {
      ticketMap[ticket.status].push(ticket);
    }

    return ticketMap;
  });

  console.log({ ticketData });

  const {
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    dndData: newTicketData,
    activeData: activeTicket,
    activeColumn,
  } = useDragAndDrop({
    dataObj: ticketData,
    setDataObj: setTicketData,
    onDragEndSubmit: async (ticket, columnId) => {
      if (ticket.status === columnId) return;

      const updatedTicket = ObjectUtils.cloneObject(ticket);
      updatedTicket.status = columnId as (typeof updatedTicket)['status'];

      const error = await updateTicket(updatedTicket.id, updatedTicket);
      if (error) throw new Error(JSON.stringify(error));
    },
    onDragEndSuccess: (_, variables) => {
      if (variables.data.status === variables.newColumnId) return;

      ToastLib.success(
        <p>
          Successfully moved from <strong>{variables.data.status}</strong> to{' '}
          <strong>{variables.newColumnId}</strong>
        </p>,
      );

      setTicketData((prevTicketData) => {
        const updatedTicketIndex = prevTicketData[
          variables.newColumnId as TicketStatusType
        ].findIndex((ticket) => ticket.id === variables.data.id);
        if (updatedTicketIndex < 0) return prevTicketData;
        prevTicketData[variables.newColumnId as TicketStatusType][
          updatedTicketIndex
        ].status = variables.newColumnId as TicketStatusType;
        return prevTicketData;
      });
    },
    onDragEndError: () => {
      ToastLib.error('Failed to move task. Please try again');
    },
  });

  // this is to retain the position of the ticket in the board
  useEffect(() => {
    setTicketData((prevTicketData) => {
      const newTicketData = ObjectUtils.cloneObject(prevTicketData);

      ObjectUtils.keys(newTicketData).forEach((ticketStatus) => {
        newTicketData[ticketStatus] = newTicketData[ticketStatus].filter(
          (ticketData) => tickets.some((ticket) => ticket.id === ticketData.id),
        );
      });
      for (const ticket of tickets) {
        if (
          newTicketData[ticket.status as TicketStatusType].some(
            (ticketData) => ticketData.id === ticket.id,
          )
        ) {
          continue;
        }
        newTicketData[ticket.status as TicketStatusType].push(ticket);
      }

      return newTicketData;
    });
  }, [tickets]);

  return {
    ticketData: newTicketData,
    activeTicket,
    sensors,
    handleDragOver,
    handleDragEnd,
    handleDragStart,
    activeColumn,
  };
};
