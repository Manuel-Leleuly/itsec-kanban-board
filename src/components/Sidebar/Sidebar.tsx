'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useLogoutLogic } from '@/logic/useLogoutLogic';
import { useConfigContext } from '@/providers/configProvider';
import { LogOut, Settings, SquareKanban, User } from 'lucide-react';

export const KanbanSidebar = () => {
  const { user } = useConfigContext();
  const { onLogout } = useLogoutLogic();

  const userData = {
    initials:
      user.first_name[0].toUpperCase() + user.last_name[0].toUpperCase(),
    fullName: user.first_name + ' ' + user.last_name,
    email: user.email,
  };

  return (
    <div className='w-64 bg-card border-r border-border flex flex-col screen'>
      {/* Top section with avatar and user info */}
      <div className='p-6 border-b border-border'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-primary rounded-lg'>
            <span className='text-primary-foreground font-bold text-sm'>K</span>
          </div>
          <h1 className='text-lg font-semibold'>Kanban Flow</h1>
        </div>

        <div className='mt-6 flex items-center space-x-3'>
          <Avatar className='h-10 w-10'>
            <AvatarImage src='/images/placeholder-user.png' alt='User' />
            <AvatarFallback className='bg-primary text-primary-foreground font-medium'>
              {userData.initials}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-foreground truncate'>
              {userData.fullName}
            </p>
            <p className='text-xs text-muted-foreground truncate'>
              {userData.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation section */}
      <div className='flex-1 p-4'>
        <nav className='space-y-2'>
          <Button
            variant='ghost'
            className='w-full justify-start h-10 px-3'
            asChild
          >
            <div className='flex items-center space-x-3'>
              <SquareKanban size={15} className='text-muted-foreground' />
              <span className='text-sm'>Kanban Board</span>
            </div>
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start h-10 px-3'
            asChild
          >
            <div className='flex items-center space-x-3'>
              <User size={15} className='text-muted-foreground' />
              <span className='text-sm'>Profile</span>
            </div>
          </Button>
          <Button
            variant='ghost'
            className='w-full justify-start h-10 px-3'
            asChild
          >
            <div className='flex items-center space-x-3'>
              <Settings size={15} className='text-muted-foreground' />
              <span className='text-sm'>Settings</span>
            </div>
          </Button>
        </nav>
      </div>

      {/* Bottom section with logout */}
      <div className='p-4 border-t border-border'>
        <Button
          variant='ghost'
          className='w-full justify-start items-center h-10 px-3 text-destructive hover:text-destructive hover:bg-destructive/10'
          onClick={() => onLogout()}
        >
          <LogOut size={15} />
          <span className='text-sm'>Sign out</span>
        </Button>
      </div>
    </div>
  );
};
