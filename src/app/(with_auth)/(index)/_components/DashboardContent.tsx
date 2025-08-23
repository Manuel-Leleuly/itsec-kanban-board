"use client";

import { closestCorners, DndContext } from "@dnd-kit/core";
import { TicketType } from "@/api/tickets/models/tickets";
import { BoardColumn } from "./BoardColumn";
import { useState } from "react";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { ObjectUtils } from "@/utils/objectUtils";
import { updateTicket } from "../../_logic/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const DashboardContent = ({ tickets }: { tickets: TicketType[] }) => {
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

  const { sensors, handleDragEnd, handleDragOver, newTicketData } = useDragAndDrop({
    dataObj: ticketData,
    setDataObj: setTicketData,
    onDragEndSubmit: async (ticket, columnId) => {
      const updatedTicket = ObjectUtils.cloneObject(ticket);
      updatedTicket.status = columnId as (typeof updatedTicket)["status"];
      console.log({ updatedTicket });
      await updateTicket(updatedTicket.id, updatedTicket);
    },
    onDragEndSuccess: () => {
      router.refresh();
    },
    onDragEndError: () => {
      toast.error("Failed to move task. Please try again");
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
