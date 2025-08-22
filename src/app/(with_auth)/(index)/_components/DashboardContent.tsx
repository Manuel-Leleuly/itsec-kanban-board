import { TicketType } from "@/api/tickets/models/tickets";
import { BoardColumn } from "./BoardColumn";

export const DashboardContent = ({ tickets }: { tickets: TicketType[] }) => {
  const ticketMap: Record<"todo" | "doing" | "done", TicketType[]> = {
    todo: [],
    doing: [],
    done: [],
  };

  for (const ticket of tickets) {
    ticketMap[ticket.status].push(ticket);
  }

  return (
    <div className="flex justify-between">
      <BoardColumn columnName="TO DO" tickets={ticketMap.todo} />
      <BoardColumn columnName="DOING" tickets={ticketMap.doing} />
      <BoardColumn columnName="DONE" tickets={ticketMap.done} />
    </div>
  );
};
