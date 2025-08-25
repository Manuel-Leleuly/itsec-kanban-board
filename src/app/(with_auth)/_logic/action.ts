"use server";

import { CreateUpdateTicketReqBodySchema, CreateUpdateTicketReqBodyType } from "@/api/tickets/models/tickets";
import { TicketApi } from "@/api/tickets/tickets";
import { NetworkUtils } from "@/utils/networkUtils";
import { revalidatePath } from "next/cache";

export const addTicket = async (reqBody: CreateUpdateTicketReqBodyType) => {
  const network = NetworkUtils.create();

  const { data, success, error } = CreateUpdateTicketReqBodySchema.safeParse(reqBody);
  if (!success) throw error;

  await TicketApi.createTicket(network, data);
};

export const updateTicket = async (ticketId: string, reqBody: CreateUpdateTicketReqBodyType) => {
  const network = NetworkUtils.create();

  const { data, success, error } = CreateUpdateTicketReqBodySchema.safeParse(reqBody);
  if (!success) throw error;

  await TicketApi.updateTicketById(network, parseInt(ticketId), data);
};

export const deleteTicket = async (ticketId: string, reqBody: CreateUpdateTicketReqBodyType) => {
  const network = NetworkUtils.create();

  const { data, success, error } = CreateUpdateTicketReqBodySchema.safeParse(reqBody);
  if (!success) throw error;

  await TicketApi.updateTicketById(network, parseInt(ticketId), data);
  revalidatePath("/");
};
