"use client";

import { TicketType } from "@/api/tickets/models/tickets";
import { ObjectUtils } from "@/utils/objectUtils";
import { useEffect, useState } from "react";

export const useTicketDataLogic = (tickets: TicketType[]) => {
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

  useEffect(() => {
    setTicketData((prevTicketData) => {
      const newTicketData = ObjectUtils.cloneObject(prevTicketData);
      const currTickets = ObjectUtils.keys(newTicketData).flatMap((ticketStatus) => newTicketData[ticketStatus]);
      const newTickets = tickets.filter((ticket) => !currTickets.some((currTicket) => ticket.id === currTicket.id));

      for (const newTicket of newTickets) {
        newTicketData[newTicket.status].push(newTicket);
      }

      return newTicketData;
    });
  }, [tickets]);

  return { ticketData, setTicketData };
};
