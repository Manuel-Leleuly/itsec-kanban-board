'use client';

import { Ticket } from '@/api/tickets/models/tickets';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { TICKET_STATUS, TicketStatusType } from '@/constants/constants';
import { cn } from '@/lib/utils';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TicketCard } from './TicketCard';

const columnStyles = {
  [TICKET_STATUS.todo]: {
    headerBg: 'bg-todo',
    headerText: 'text-todo-foreground',
    borderColor: 'border-todo/20',
    dragOverBg: 'bg-todo/10',
  },
  [TICKET_STATUS.doing]: {
    headerBg: 'bg-doing',
    headerText: 'text-doing-foreground',
    borderColor: 'border-doing/20',
    dragOverBg: 'bg-doing/10',
  },
  [TICKET_STATUS.done]: {
    headerBg: 'bg-done',
    headerText: 'text-done-foreground',
    borderColor: 'border-done/20',
    dragOverBg: 'bg-done/10',
  },
};

export const BoardColumn = ({
  columnName,
  columnId,
  tickets,
  activeTicket,
  isOver,
}: {
  columnName: string;
  columnId: TicketStatusType;
  tickets: Ticket[];
  activeTicket: Ticket | null;
  isOver?: boolean;
}) => {
  const { setNodeRef } = useDroppable({ id: columnId });
  const styles = columnStyles[columnId];

  return (
    <SortableContext
      id={columnId}
      items={
        tickets.length > 0
          ? tickets
          : [{ id: `placeholder-id-for-${columnId}` }]
      }
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef}>
        {/* header*/}
        <div className='flex flex-col h-full'>
          <Card
            className={cn('mb-4 border-2', styles.borderColor, styles.headerBg)}
          >
            <CardHeader className='text-lg font-semibold'>
              <h2
                className={cn(
                  'flex items-center justify-between',
                  styles.headerText,
                )}
              >
                {columnName}
                <Badge
                  variant='secondary'
                  className='bg-white/20 text-white border-white/30'
                >
                  {tickets.length}
                </Badge>
              </h2>
            </CardHeader>
          </Card>

          {/* content container */}
          <div
            className={cn(
              'flex-1 space-y-3 min-h-[400px] p-3 rounded-lg border-2 border-dashed transition-colors duration-200',
              isOver &&
                `${styles.dragOverBg} border-solid ${styles.borderColor}`,
              !isOver && 'border-muted-foreground/20',
              'bg-muted/20',
            )}
          >
            {tickets.length === 0 ? (
              <div className='flex items-center justify-center h-32 text-muted-foreground'>
                <p className='text-sm'>
                  {isOver
                    ? `Drop ticket in ${columnName.toLowerCase()}`
                    : `No tickets in ${columnName.toLowerCase()}`}
                </p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <TicketCard
                  ticket={ticket}
                  key={ticket.id}
                  className={cn(activeTicket?.id === ticket.id && 'opacity-50')}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </SortableContext>
  );
};
