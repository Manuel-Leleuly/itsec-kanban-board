"use client";

import { TicketType } from "@/api/tickets/models/tickets";
import { TicketCard } from "./TicketCard";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

export const BoardColumn = ({
  columnName,
  columnId,
  tickets,
  className,
}: {
  columnName: string;
  columnId: string;
  tickets: TicketType[];
  className?: string;
}) => {
  const { setNodeRef } = useDroppable({ id: columnId });

  return (
    <SortableContext id={columnId} items={tickets} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} className={cn("flex flex-col space-y-4 min-w-[328px]", className)}>
        <h3 className="text-[#667085] text-sm font-bold">{columnName}</h3>
        <div className="flex flex-col space-y-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};
