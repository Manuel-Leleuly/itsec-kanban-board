"use client";

import { Dialog, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { useAddUpdateTicketLogic } from "../_logic/useAddUpdateTicketLogic";
import { CreateUpdateTicketReqBodySchema, TicketType } from "@/api/tickets/models/tickets";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import {
  KanbanModalBody,
  KanbanModalContent,
  KanbanModalFooter,
  KanbanModalHeader,
} from "@/components/KanbanModal/KanbanModal";

const TicketStatusEnum = CreateUpdateTicketReqBodySchema.shape.status.enum;
type TicketStatusType = keyof typeof TicketStatusEnum;

export const AddEditTicketModal = ({
  isOpen,
  onSuccess,
  onCancel,
  ticketData,
}: {
  isOpen: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  ticketData?: TicketType;
}) => {
  const { ticketForm, isLoading } = useAddUpdateTicketLogic({ ticketData, onSuccess });

  useEffect(() => {
    if (isOpen) ticketForm.reset();
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <KanbanModalContent
        onInteractOutside={(e) => {
          if (isLoading) e.preventDefault();
        }}
      >
        <KanbanModalHeader>
          <DialogTitle>{ticketData ? "Edit" : "Add"} a Task</DialogTitle>
        </KanbanModalHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            ticketForm.handleSubmit();
          }}
        >
          <KanbanModalBody className="space-y-4">
            <ticketForm.Field name="title">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-500">
                    Task Name*
                  </Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      e.preventDefault();
                      field.handleChange(e.target.value);
                    }}
                    placeholder="Task Name here..."
                    className="w-full"
                    disabled={isLoading}
                  />
                  {!!field.state.meta.errors.length && (
                    <em className="text-red-500 text-sm">
                      {field.state.meta.errors.map((error) => error?.message).join(", ")}
                    </em>
                  )}
                </div>
              )}
            </ticketForm.Field>

            <ticketForm.Field name="description">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-500">
                    Description
                  </Label>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => {
                      e.preventDefault();
                      field.handleChange(e.target.value);
                    }}
                    placeholder="Description here..."
                    className="w-full break-all max-h-52"
                    disabled={isLoading}
                    wrap="hard"
                  />
                </div>
              )}
            </ticketForm.Field>

            <ticketForm.Field name="assignees">
              {(field) => (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="design"
                      checked={field.state.value.includes("design")}
                      onCheckedChange={() => {
                        let assignees = [...field.state.value];
                        const hasValue = assignees.includes("design");
                        if (hasValue) {
                          assignees = assignees.filter((value) => value !== "design");
                        } else {
                          assignees.push("design");
                        }
                        field.handleChange(assignees);
                      }}
                      disabled={isLoading}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="design" className="text-gray-500 font-normal">
                      Design
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="frontend"
                      checked={field.state.value.includes("frontend")}
                      onCheckedChange={() => {
                        let assignees = [...field.state.value];
                        const hasValue = assignees.includes("frontend");
                        if (hasValue) {
                          assignees = assignees.filter((value) => value !== "frontend");
                        } else {
                          assignees.push("frontend");
                        }
                        field.handleChange(assignees);
                      }}
                      disabled={isLoading}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="frontend" className="text-gray-500 font-normal">
                      Frontend
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="backend"
                      checked={field.state.value.includes("backend")}
                      onCheckedChange={() => {
                        let assignees = [...field.state.value];
                        const hasValue = assignees.includes("backend");
                        if (hasValue) {
                          assignees = assignees.filter((value) => value !== "backend");
                        } else {
                          assignees.push("backend");
                        }
                        field.handleChange(assignees);
                      }}
                      disabled={isLoading}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <Label htmlFor="backend" className="text-gray-500 font-normal">
                      Backend
                    </Label>
                  </div>
                </div>
              )}
            </ticketForm.Field>

            <ticketForm.Field name="status">
              {(field) => (
                <div className="flex flex-col gap-2">
                  <Label className="text-gray-500">Status</Label>
                  <Select
                    value={field.state.value as TicketStatusType}
                    onValueChange={(value) => field.handleChange(value as TicketStatusType)}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full text-gray-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={TicketStatusEnum.todo} className="text-gray-500">
                          TO DO
                        </SelectItem>
                        <SelectItem value={TicketStatusEnum.doing} className="text-gray-500">
                          DOING
                        </SelectItem>
                        <SelectItem value={TicketStatusEnum.done} className="text-gray-500">
                          DONE
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </ticketForm.Field>
          </KanbanModalBody>

          <KanbanModalFooter>
            <DialogClose asChild>
              <Button variant={"outline"} disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-600">
              {ticketData ? "Save" : "Submit"}
            </Button>
          </KanbanModalFooter>
        </form>
      </KanbanModalContent>
    </Dialog>
  );
};
