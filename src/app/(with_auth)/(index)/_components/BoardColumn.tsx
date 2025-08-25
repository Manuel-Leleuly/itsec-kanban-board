"use client";

import { TicketType } from "@/api/tickets/models/tickets";
import { TicketCard } from "./TicketCard";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export const BoardColumn = ({
  columnName,
  columnId,
  tickets,
  className,
  activeTicket,
}: {
  columnName: string;
  columnId: string;
  tickets: TicketType[];
  className?: string;
  activeTicket: TicketType | null;
}) => {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <SortableContext
      id={columnId}
      items={tickets.length > 0 ? tickets : [{ id: `placeholder-id-for-${columnId}` }]}
      strategy={verticalListSortingStrategy}
    >
      <div className={cn("flex flex-col space-y-4 min-w-[348px]", className)}>
        <h3 className="text-[#667085] text-sm font-bold">{columnName}</h3>
        <div ref={setNodeRef} className="flex flex-col space-y-4">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              className={cn(activeTicket?.id === ticket.id && "opacity-50")}
            />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};
