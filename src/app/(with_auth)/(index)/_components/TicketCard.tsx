import { TicketType } from "@/api/tickets/models/tickets";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { TicketAssignee } from "../../_components/TicketAssignee";

export const TicketCard = ({ ticket }: { ticket: TicketType }) => {
  return (
    <Card className="w-[348px] rounded-sm">
      <CardHeader>
        <CardTitle className="w-full overflow-hidden">
          <Link href={`/${ticket.id}`} className="hover:underline">
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">{ticket.title}</p>
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
