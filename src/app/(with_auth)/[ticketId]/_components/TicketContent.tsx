import { TicketType } from "@/api/tickets/models/tickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketAssignee } from "../../_components/TicketAssignee";

const renderDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const formatter = Intl.DateTimeFormat("en-US", {
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
  });

  const time = formatter.format(date);

  return `${day} ${month} ${year} ${time}`;
};

export const TicketContent = ({ ticket }: { ticket: TicketType }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{ticket.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-5 text-gray-500">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <p className="lg:col-span-2">{ticket.description}</p>
          <div className="text-sm">
            <p className="font-semibold">Info</p>
            <p>Created at: {renderDate(new Date(ticket.createdAt))}</p>
            <p>Updated at: {renderDate(new Date(ticket.updatedAt))}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {ticket.assignees.map((assignee) => (
            <TicketAssignee key={assignee} assignee={assignee} />
          ))}
        </div>

        <p className="text-sm">
          Status: <span className="capitalize">{ticket.status}</span>
        </p>
      </CardContent>
    </Card>
  );
};
