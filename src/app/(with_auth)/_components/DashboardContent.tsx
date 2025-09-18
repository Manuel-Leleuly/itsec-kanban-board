'use client';

import { TicketType } from '@/api/tickets/models/tickets';
import { useTicketDataLogic } from '@/logic/useTicketDataLogic';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { BoardColumn } from './BoardColumn';
import { TicketCard } from './TicketCard';

export const DashboardContent = ({ tickets }: { tickets: TicketType[] }) => {
  const {
    ticketData,
    sensors,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    activeTicket,
  } = useTicketDataLogic(tickets);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div className='flex justify-between gap-8 flex-nowrap overflow-x-auto no-scrollbar'>
        <BoardColumn
          columnName='TO DO'
          columnId='todo'
          tickets={ticketData.todo}
          activeTicket={activeTicket}
        />
        <BoardColumn
          columnName='DOING'
          columnId='doing'
          tickets={ticketData.doing}
          activeTicket={activeTicket}
        />
        <BoardColumn
          columnName='DONE'
          columnId='done'
          tickets={ticketData.done}
          activeTicket={activeTicket}
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
