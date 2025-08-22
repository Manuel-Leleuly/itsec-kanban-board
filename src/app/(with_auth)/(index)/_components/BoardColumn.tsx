import { TicketType } from "@/api/tickets/models/tickets";
import { TicketCard } from "./TicketCard";
import { cn } from "@/lib/utils";

export const BoardColumn = ({
  columnName,
  tickets,
  className,
}: {
  columnName: string;
  tickets: TicketType[];
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-4 min-w-[328px]", className)}>
      <h3 className="text-[#667085] text-sm font-bold">{columnName}</h3>
      <div className="flex flex-col space-y-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
