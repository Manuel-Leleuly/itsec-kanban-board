"use client";

import { Button } from "@/components/ui/button";
import { useConfigContext } from "@/providers/configProvider";
import { useState } from "react";
import z from "zod";
import { AddEditTicketModal } from "../../_components/AddEditTicketModal";
import { sleepAsync } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Modals = z.enum(["ADD"]).enum;
type ModalType = keyof typeof Modals;

const getFirstName = (fullName: string) => {
  const firstName = fullName.split(" ")[0];
  return firstName.slice(0, 1).toUpperCase() + firstName.slice(1);
};

export const DashboardTitle = () => {
  const { user } = useConfigContext();
  const router = useRouter();
  const [selectedModal, setSelectedModal] = useState<ModalType | null>(null);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-md md:text-xl lg:text-2xl font-semibold">
          Hello {getFirstName(user.name)}, Here's your task
        </h1>
        <Button
          className="text-blue-500 hover:text-blue-600 bg-transparent shadow-none sm:bg-blue-500 sm:hover:bg-blue-600 sm:text-white sm:hover:text-white"
          onClick={() => setSelectedModal(Modals.ADD)}
        >
          Add a task
        </Button>
      </div>

      <AddEditTicketModal
        isOpen={selectedModal === Modals.ADD}
        onSuccess={async () => {
          setSelectedModal(null);

          // sleep to avoid modal flickering during server page re-render
          await sleepAsync();
          router.refresh();
        }}
        onCancel={() => setSelectedModal(null)}
      />
    </>
  );
};
