'use client';

import { Ticket } from '@/api/tickets/models/tickets';
import { useTicketDataLogic } from '@/logic/useTicketDataLogic';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { BoardColumn } from './BoardColumn';
import { TicketCard } from './TicketCard';

export const DashboardContent = ({ tickets }: { tickets: Ticket[] }) => {
  console.log('dashboardContent', { tickets });
  const {
    ticketData,
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    activeTicket,
    activeColumn,
  } = useTicketDataLogic(tickets);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 h-full'>
        <BoardColumn
          columnName='TO DO'
          columnId='todo'
          tickets={ticketData.todo}
          activeTicket={activeTicket}
          isOver={activeColumn === 'todo'}
        />
        <BoardColumn
          columnName='DOING'
          columnId='doing'
          tickets={ticketData.doing}
          activeTicket={activeTicket}
          isOver={activeColumn === 'doing'}
        />
        <BoardColumn
          columnName='DONE'
          columnId='done'
          tickets={ticketData.done}
          activeTicket={activeTicket}
          isOver={activeColumn === 'done'}
        />
      </div>

      {activeTicket && (
        <DragOverlay>
          <TicketCard ticket={activeTicket} />
        </DragOverlay>
      )}
    </DndContext>
  );
};
