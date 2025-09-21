'use server';

import {
  TicketCreateUpdateReqBody,
  TicketCreateUpdateReqBodySchema,
} from '@/api/tickets/models/tickets';
import { TicketApi } from '@/api/tickets/tickets';
import { FetchUtil } from '@/utils/fetchUtils';
import { NetworkUtils } from '@/utils/networkUtils';
import { isAxiosError } from 'axios';
import { ZodError } from 'zod';

export const createTicket = async (reqBody: TicketCreateUpdateReqBody) => {
  try {
    const network = NetworkUtils.withCredentials();
    const createTicketReqBody = TicketCreateUpdateReqBodySchema.parse(reqBody);
    await TicketApi.createTicket(network, createTicketReqBody);
    return null;
  } catch (err) {
    return handleError(err as Error, 'createTicket');
  }
};

export const updateTicket = async (
  ticketId: string,
  reqBody: TicketCreateUpdateReqBody,
) => {
  try {
    const network = NetworkUtils.withCredentials();
    const updateTicketReqBody = TicketCreateUpdateReqBodySchema.parse(reqBody);
    await TicketApi.updateTicket(network, ticketId, updateTicketReqBody);
    return null;
  } catch (err) {
    return handleError(err as Error, 'updateTicket');
  }
};

export const deleteTicket = async (ticketId: string) => {
  try {
    const network = NetworkUtils.withCredentials();
    await TicketApi.deleteTicket(network, ticketId);
    return null;
  } catch (err) {
    return handleError(err as Error, 'deleteTicket');
  }
};

// helper
const handleError = (err: Error, serverActionLabel: string) => {
  let errorMessage = err.message;
  if (isAxiosError(err)) {
    const { response } = err;
    if (response) {
      errorMessage = response?.data.message ?? 'axios error';
    }
  } else if (err instanceof ZodError) {
    errorMessage = err.message;
  }

  return FetchUtil.getErrorFromServerAction({
    error: err as Error,
    errorMessage,
    serverActionLabel,
  });
};
