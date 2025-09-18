import { FetchUtil } from '@/utils/fetchUtils';
import { AxiosInstance } from 'axios';
import {
  CreateUpdateTicketReqBodyType,
  TicketResponseSchema,
  TicketResponseType,
  TicketSchema,
  TicketSearchParam,
  TicketType,
} from './models/tickets';

export class TicketApi {
  static getAllTickets = async (
    network: AxiosInstance,
    params?: TicketSearchParam,
  ) => {
    return await FetchUtil.validateResponse<TicketResponseType>(
      () => network.get('/tickets', { params }),
      TicketResponseSchema,
    );
  };

  static getTicketById = async (network: AxiosInstance, ticketId: number) => {
    return await FetchUtil.validateResponse<TicketType>(
      () => network.get(`/tickets/${ticketId}`),
      TicketSchema,
    );
  };

  static createTicket = async (
    network: AxiosInstance,
    reqBody: CreateUpdateTicketReqBodyType,
  ) => {
    return await FetchUtil.validateResponse<TicketType>(
      () => network.post('/tickets', reqBody),
      TicketSchema,
    );
  };

  static updateTicketById = async (
    network: AxiosInstance,
    ticketId: number,
    reqBody: CreateUpdateTicketReqBodyType,
  ) => {
    return await FetchUtil.validateResponse<TicketType>(
      () => network.put(`/tickets/${ticketId}`, reqBody),
      TicketSchema,
    );
  };
}
