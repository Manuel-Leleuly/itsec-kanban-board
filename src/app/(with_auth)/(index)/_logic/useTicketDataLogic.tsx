"use client";

import { TicketType } from "@/api/tickets/models/tickets";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { ObjectUtils } from "@/utils/objectUtils";
import { useEffect, useState } from "react";
import { updateTicket } from "../../_logic/action";
import { ToastLib } from "@/lib/toastLib";
import { useRouter } from "next/navigation";

export const useTicketDataLogic = (tickets: TicketType[]) => {
  const router = useRouter();

  const [ticketData, setTicketData] = useState(() => {
    const ticketMap: Record<"todo" | "doing" | "done", TicketType[]> = {
      todo: [],
      doing: [],
      done: [],
    };

    for (const ticket of tickets) {
      ticketMap[ticket.status].push(ticket);
    }

    return ticketMap;
  });

  const {
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    dndData: newTicketData,
    activeData: activeTicket,
  } = useDragAndDrop({
    dataObj: ticketData,
    setDataObj: setTicketData,
    onDragEndSubmit: async (ticket, columnId) => {
      if (ticket.status === columnId) return;

      const updatedTicket = ObjectUtils.cloneObject(ticket);
      updatedTicket.status = columnId as (typeof updatedTicket)["status"];

      await updateTicket(updatedTicket.id, updatedTicket);
    },
    onDragEndSuccess: (_, variables, __) => {
      if (variables.data.status === variables.newColumnId) return;
      ToastLib.success(
        <p>
          Successfully moved from <strong>{variables.data.status}</strong> to <strong>{variables.newColumnId}</strong>
        </p>
      );
      router.refresh();
    },
    onDragEndError: () => {
      ToastLib.error("Failed to move task. Please try again");
    },
  });

  useEffect(() => {
    setTicketData((prevTicketData) => {
      const newTicketData = ObjectUtils.cloneObject(prevTicketData);

      // add new tickets
      const currTickets = ObjectUtils.keys(newTicketData).flatMap((ticketStatus) => newTicketData[ticketStatus]);
      const newTickets = tickets.filter((ticket) => !currTickets.some((currTicket) => ticket.id === currTicket.id));
      for (const newTicket of newTickets) {
        newTicketData[newTicket.status].push(newTicket);
      }

      // update a ticket who has been moved
      const updatedTicket = tickets.find((ticket) =>
        currTickets.some((currTicket) => currTicket.id === ticket.id && currTicket.status !== ticket.status)
      );
      if (updatedTicket) {
        const ticketDataIndex = newTicketData[updatedTicket.status].findIndex(
          (ticket) => ticket.id === updatedTicket.id
        );
        if (ticketDataIndex >= 0) {
          newTicketData[updatedTicket.status][ticketDataIndex].status = updatedTicket.status;
        }
      }

      return newTicketData;
    });
  }, [tickets]);

  return { ticketData: newTicketData, activeTicket, sensors, handleDragOver, handleDragEnd, handleDragStart };
};
