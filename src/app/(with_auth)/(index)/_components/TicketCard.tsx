"use client";

import { TicketType } from "@/api/tickets/models/tickets";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketAssignee } from "../../_components/TicketAssignee";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";

export const TicketCard = ({ ticket }: { ticket: TicketType }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: ticket.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Translate.toString(transform), transition }}
    >
      <Card className="w-[348px] rounded-sm">
        <CardHeader>
          <CardTitle>
            <div className="w-full flex justify-between items-center">
              <div className="w-fit max-w-full overflow-hidden">
                <Link
                  href={`/${ticket.id}`}
                  className="hover:underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <p className="whitespace-nowrap overflow-hidden text-ellipsis">{ticket.title}</p>
                </Link>
              </div>

              <div>
                <p className="text-sm text-gray-400">#{ticket.id}</p>
              </div>
            </div>
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
    </div>
  );
};
