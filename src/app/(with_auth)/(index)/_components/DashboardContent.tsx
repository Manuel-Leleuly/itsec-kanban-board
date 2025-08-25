"use client";

import { closestCorners, DndContext } from "@dnd-kit/core";
import { TicketType } from "@/api/tickets/models/tickets";
import { BoardColumn } from "./BoardColumn";
import { useTicketDataLogic } from "../_logic/useTicketDataLogic";

export const DashboardContent = ({ tickets }: { tickets: TicketType[] }) => {
  const { ticketData, sensors, handleDragEnd, handleDragOver } = useTicketDataLogic(tickets);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <div className="flex justify-between gap-8 flex-nowrap overflow-auto">
        <BoardColumn columnName="TO DO" columnId="todo" tickets={ticketData.todo} />
        <BoardColumn columnName="DOING" columnId="doing" tickets={ticketData.doing} />
        <BoardColumn columnName="DONE" columnId="done" tickets={ticketData.done} />
      </div>
    </DndContext>
  );
};
