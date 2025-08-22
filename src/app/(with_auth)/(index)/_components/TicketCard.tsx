import { TicketType } from "@/api/tickets/models/tickets";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const TicketCard = ({ ticket }: { ticket: TicketType }) => {
  return (
    <Card className="w-[348px] rounded-sm">
      <CardHeader>
        <CardTitle>
          <Link href={`/${ticket.id}`} className="hover:underline">
            <p className="line-clamp-1 break-all">{ticket.title}</p>
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2 text-wrap">{ticket.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          {ticket.assignees.map((assignee) => (
            <TicketAssignee key={assignee} assignee={assignee} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TicketAssignee = ({ assignee }: { assignee: string }) => {
  return (
    <div
      className={cn(
        "px-2 rounded-sm bg-[#F2F4F7] text-[#475467]",
        assignee.toLowerCase() === "backend" && "bg-[#D1FADF] text-[#12B066]",
        assignee.toLowerCase() === "frontend" && "bg-[#7B61FF33] text-[#9747FF]"
      )}
    >
      <span className="text-[13px] font-semibold capitalize">{assignee}</span>
    </div>
  );
};
