"use client";

import { useConfigContext } from "@/providers/configProvider";
import { Button } from "../ui/button";
import { DashboardSvg } from "@/assets/icons/dashboard";
import { FileSvg } from "@/assets/icons/file";
import { MessageSvg } from "@/assets/icons/message";
import { UserMultipleSvg } from "@/assets/icons/users";
import { SettingSvg } from "@/assets/icons/setting";
import { LogoutSvg } from "@/assets/icons/logout";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { ReactNode } from "react";
import { useLogoutLogic } from "./logic/useLogoutLogic";

export const KanbanSidebar = () => {
  const { user } = useConfigContext();
  const { onLogout } = useLogoutLogic();

  return (
    <div className="w-fit h-screen p-1 sm:p-4 flex flex-col justify-between items-center bg-white border-r border-r-[#1D29391A]">
      {/* content */}
      <div className="flex flex-col gap-3.5">
        {/* Username */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="w-10 h-10 rounded-lg bg-[#2CBA7A] hover:bg-[#21925f] text-black flex justify-center items-center">
              {user.name[0].toUpperCase()}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{user.name}</p>
          </TooltipContent>
        </Tooltip>

        {/* Dashboard */}
        <SidebarButton tooltipContent="Dashboard">
          <DashboardSvg />
        </SidebarButton>

        {/* File */}
        <SidebarButton tooltipContent="File">
          <FileSvg />
        </SidebarButton>

        {/* Message */}
        <SidebarButton tooltipContent="Message">
          <MessageSvg />
        </SidebarButton>

        {/* Users */}
        <SidebarButton tooltipContent="Users">
          <UserMultipleSvg />
        </SidebarButton>

        {/* Setting */}
        <SidebarButton tooltipContent="Setting">
          <SettingSvg />
        </SidebarButton>
      </div>

      {/* Footer */}
      <div>
        {/* Logout */}
        <SidebarButton tooltipContent="Log Out" onClick={onLogout}>
          <LogoutSvg />
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
        <Button variant={"ghost"} className="w-10 h-10 rounded-lg flex justify-center items-center" onClick={onClick}>
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{tooltipContent}</p>
      </TooltipContent>
    </Tooltip>
  );
};
