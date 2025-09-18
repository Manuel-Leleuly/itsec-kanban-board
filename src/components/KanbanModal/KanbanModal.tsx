import { cn } from '@/lib/utils';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ComponentProps } from 'react';
import { DialogContent, DialogFooter, DialogHeader } from '../ui/dialog';

export const KanbanModalContent = (
  props: ComponentProps<typeof DialogPrimitive.Content>,
) => {
  return <DialogContent {...props} className='py-4 px-0 gap-0 rounded-sm' />;
};

export const KanbanModalHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <DialogHeader
      {...props}
      className={cn('pb-4 px-4 border-b border-b-[#DEE2E6]', className)}
    />
  );
};

export const KanbanModalBody = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return <div {...props} className={cn('p-4', className)} />;
};

export const KanbanModalFooter = ({
  className,
  ...props
}: ComponentProps<'div'>) => {
  return (
    <DialogFooter
      {...props}
      className={cn('px-4 pt-4 border-t border-t-[#DEE2E6]', className)}
    />
  );
};
