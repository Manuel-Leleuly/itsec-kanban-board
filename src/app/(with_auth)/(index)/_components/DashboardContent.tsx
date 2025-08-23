"use client";

import { closestCorners, DndContext } from "@dnd-kit/core";
import { TicketType } from "@/api/tickets/models/tickets";
import { BoardColumn } from "./BoardColumn";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { ObjectUtils } from "@/utils/objectUtils";
import { updateTicket } from "../../_logic/action";
import { ToastLib } from "@/lib/toastLib";
import { useTicketDataLogic } from "../_logic/useTicketDataLogic";

export const DashboardContent = ({ tickets }: { tickets: TicketType[] }) => {
  const { ticketData, setTicketData } = useTicketDataLogic(tickets);
  const { sensors, handleDragEnd, handleDragOver, newTicketData } = useDragAndDrop({
    dataObj: ticketData,
    setDataObj: setTicketData,
    onDragEndSubmit: async (ticket, columnId) => {
      const updatedTicket = ObjectUtils.cloneObject(ticket);
      updatedTicket.status = columnId as (typeof updatedTicket)["status"];
      await updateTicket(updatedTicket.id, updatedTicket);
    },
    onDragEndError: () => {
      ToastLib.error("Failed to move task. Please try again");
    },
  });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex justify-between">
        <BoardColumn columnName="TO DO" columnId="todo" tickets={newTicketData.todo} />
        <BoardColumn columnName="DOING" columnId="doing" tickets={newTicketData.doing} />
        <BoardColumn columnName="DONE" columnId="done" tickets={newTicketData.done} />
      </div>
    </DndContext>
  );
};
