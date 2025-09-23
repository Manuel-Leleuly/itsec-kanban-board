'use client';

import { Ticket } from '@/api/tickets/models/tickets';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, GripVertical, User } from 'lucide-react';
import Link from 'next/link';
import { TicketAssignee } from './TicketAssignee';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const TicketCard = ({
  ticket,
  className,
  isDragging,
}: {
  ticket: Ticket;
  className?: string;
  isDragging?: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isDraggingFromHook,
  } = useSortable({
    id: ticket.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        isDraggingFromHook && 'opacity-50',
        isDragging && 'opacity-50',
      )}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <Card
        className={cn(
          'cursor-pointer transition-all duration-200 hover:shadow-md border-2 hover:border-primary/20 group',
          isDraggingFromHook && 'opacity-50 rotate-1 shadow-lg',
          className,
        )}
      >
        <CardContent className='p-4 space-y-3'>
          <div className='flex items-start gap-x-2'>
            <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1'>
              <GripVertical className='h-4 w-4 text-muted-foreground cursor-grab active:cursor-grabbing' />
            </div>
            <Link href={`/${ticket.id}`} className='hover:underline'>
              <h3
                className='font-semibold text-base leading-tight text-foreground line-clamp-2 flex-1 overflow-hidden'
                style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {ticket.title}
              </h3>
            </Link>
          </div>

          {ticket.description && (
            <p
              className='text-sm text-muted-foreground leading-relaxed line-clamp-2 ml-6 overflow-hidden'
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {ticket.description}
            </p>
          )}

          {ticket.assignees.length > 0 && (
            <div className='flex flex-wrap gap-1.5 ml-6'>
              {ticket.assignees.map((assignee) => (
                <TicketAssignee assignee={assignee} key={assignee} />
              ))}
            </div>
          )}

          <div className='flex items-center justify-between pt-2 border-t border-border ml-6'>
            <div className='flex items-center gap-x-1 text-xs text-muted-foreground'>
              <Clock className='h-3 w-3' />
              <span>{formatDate(ticket.created_at)}</span>
            </div>
            <div className='flex items-center space-x-1 text-xs text-muted-foreground'>
              <User className='h-3 w-3' />
              <span>{ticket.assignees.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
