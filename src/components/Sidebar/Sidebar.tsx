'use client';

import { useLogoutLogic } from '@/logic/useLogoutLogic';
import { useConfigContext } from '@/providers/configProvider';
import {
  FileText,
  LayoutGrid,
  LogOut,
  MessageCircleMore,
  Settings,
  UsersRound,
} from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export const KanbanSidebar = () => {
  const { user } = useConfigContext();
  const { onLogout } = useLogoutLogic();

  return (
    <div className='w-fit h-screen p-1 sm:p-4 flex flex-col justify-between items-center bg-white border-r border-r-[#1D29391A]'>
      {/* content */}
      <div className='flex flex-col gap-3.5'>
        {/* Username */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className='w-10 h-10 rounded-lg bg-[#2CBA7A] hover:bg-[#21925f] text-black flex justify-center items-center'>
              {user.first_name[0].toUpperCase()}
            </Button>
          </TooltipTrigger>
          <TooltipContent side='right'>
            <p>
              {user.first_name} {user.last_name}
            </p>
          </TooltipContent>
        </Tooltip>

        {/* Dashboard */}
        <SidebarButton tooltipContent='Dashboard'>
          <LayoutGrid className='text-gray-500' />
        </SidebarButton>

        {/* File */}
        <SidebarButton tooltipContent='File'>
          <FileText className='text-gray-500' />
        </SidebarButton>

        {/* Message */}
        <SidebarButton tooltipContent='Message'>
          <MessageCircleMore className='text-gray-500' />
        </SidebarButton>

        {/* Users */}
        <SidebarButton tooltipContent='Users'>
          <UsersRound className='text-gray-500' />
        </SidebarButton>

        {/* Setting */}
        <SidebarButton tooltipContent='Setting'>
          <Settings className='text-gray-500' />
        </SidebarButton>
      </div>

      {/* Footer */}
      <div>
        {/* Logout */}
        <SidebarButton tooltipContent='Log Out' onClick={onLogout}>
          <LogOut className='text-gray-500' />
        </SidebarButton>
      </div>
    </div>
  );
};

const SidebarButton = ({
  tooltipContent,
  children,
  onClick,
}: {
  tooltipContent: string;
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={'ghost'}
          className='w-10 h-10 rounded-lg flex justify-center items-center'
          onClick={onClick}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side='right'>
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};
