'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';
import { toast } from 'sonner';
import { cn } from './utils';

export class ToastLib {
  static success = (message: ReactNode) => {
    toast.custom((id) => (
      <ToastComponent id={id} status='success'>
        {message}
      </ToastComponent>
    ));
  };

  static error = (message: ReactNode) => {
    toast.custom((id) => (
      <ToastComponent id={id} status='error'>
        {message}
      </ToastComponent>
    ));
  };
}

const ToastComponent = ({
  id,
  status,
  children,
}: {
  id: string | number;
  status: 'success' | 'error';
  children: ReactNode;
}) => {
  return (
    <Card className='py-2'>
      <CardContent className='flex justify-between items-center space-x-5 px-2'>
        <div className='flex items-center space-x-4 h-10'>
          <div
            className={cn(
              'w-1 rounded-full h-full bg-[#2CBA7A]',
              status === 'error' && 'bg-red-500',
            )}
          />
          <div className='font-normal text-nowrap'>{children}</div>
        </div>
        <Button onClick={() => toast.dismiss(id)} variant={'ghost'}>
          Got it
        </Button>
      </CardContent>
    </Card>
  );
};
