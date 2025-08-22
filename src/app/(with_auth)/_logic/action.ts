"use server";

import {
  CreateUpdateTicketReqBodySchema,
  CreateUpdateTicketReqBodyType,
  TicketSchema,
  TicketType,
} from "@/api/tickets/models/tickets";
import { FetchUtil } from "@/utils/fetchUtils";
import { NetworkUtils } from "@/utils/networkUtils";

export const addTicket = async (reqBody: CreateUpdateTicketReqBodyType) => {
  const network = NetworkUtils.create();

  const { data, success, error } = CreateUpdateTicketReqBodySchema.safeParse(reqBody);
  if (!success) throw error;

  await FetchUtil.validateResponse<TicketType>(() => network.post("/tickets", data), TicketSchema);
};

export const updateTicket = async (ticketId: string, reqBody: CreateUpdateTicketReqBodyType) => {
  const network = NetworkUtils.create();

  const { data, success, error } = CreateUpdateTicketReqBodySchema.safeParse(reqBody);
  if (!success) throw error;

  await FetchUtil.validateResponse<TicketType>(() => network.put(`/tickets/${ticketId}`, data), TicketSchema);
};
