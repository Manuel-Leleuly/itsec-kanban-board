import { cn } from '@/lib/utils';

export const TicketAssignee = ({ assignee }: { assignee: string }) => {
  return (
    <div
      className={cn(
        'px-2 rounded-sm bg-[#F2F4F7] text-[#475467]',
        assignee.toLowerCase() === 'backend' && 'bg-[#D1FADF] text-[#12B066]',
        assignee.toLowerCase() === 'frontend' &&
          'bg-[#7B61FF33] text-[#9747FF]',
      )}
    >
      <span className='text-[13px] font-semibold capitalize'>{assignee}</span>
    </div>
  );
};
