"use client";

import { useConfigContext } from "@/providers/configProvider";
import { Button } from "../ui/button";
import { DashboardSvg } from "@/assets/icons/dashboard";
import { FileSvg } from "@/assets/icons/file";
import { MessageSvg } from "@/assets/icons/message";
import { UserMultipleSvg } from "@/assets/icons/users";
import { SettingSvg } from "@/assets/icons/setting";
import { LogoutSvg } from "@/assets/icons/logout";

export const KanbanSidebar = () => {
  const { user } = useConfigContext();

  return (
    <div className="w-fit h-screen p-4 flex flex-col justify-between items-center bg-white border-r border-r-[#1D29391A] fixed">
      {/* content */}
      <div className="flex flex-col space-y-3.5">
        {/* Username */}
        <Button className="w-10 h-10 rounded-lg bg-[#2CBA7A] hover:bg-[#21925f] text-black flex justify-center items-center">
          {user.name[0].toUpperCase()}
        </Button>

        {/* Dashboard */}
        <Button variant={"ghost"} className="w-10 h-10 rounded-lg flex justify-center items-center">
          <DashboardSvg />
        </Button>

        {/* File */}
        <Button variant={"ghost"} className="w-10 h-10 rounded-lg flex justify-center items-center">
          <FileSvg />
        </Button>

        {/* Message */}
        <Button variant={"ghost"} className="w-10 h-10 rounded-lg flex justify-center items-center">
          <MessageSvg />
        </Button>

        {/* Users */}
        <Button variant={"ghost"} className="w-10 h-10 rounded-lg flex justify-center items-center">
          <UserMultipleSvg />
        </Button>

        {/* Setting */}
        <Button variant={"ghost"} className="w-10 h-10 rounded-lg flex justify-center items-center">
          <SettingSvg />
        </Button>
      </div>

      {/* Footer */}
      <div>
        {/* Logout */}
        <Button variant={"ghost"} className="w-10 h-10 rounded-lg flex justify-center items-center">
          <LogoutSvg />
        </Button>
      </div>
    </div>
  );
};
