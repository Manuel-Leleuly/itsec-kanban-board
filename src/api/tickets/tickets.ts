import {
  Ticket,
  TicketCreateUpdateReqBody,
  TicketDelete,
  TicketDeleteSchema,
  TicketResponse,
  TicketResponseSchema,
  TicketSchema,
} from '@/api/tickets/models/tickets';
import { FetchUtil } from '@/utils/fetchUtils';
import { AxiosInstance } from 'axios';

export class TicketApi {
  static createTicket = async (
    network: AxiosInstance,
    reqBody: TicketCreateUpdateReqBody,
  ) => {
    return await FetchUtil.validateResponse<Ticket>(
      () => network.post('/kanban/v1/tickets', reqBody),
      TicketSchema,
    );
  };

  static getAllTickets = async (
    network: AxiosInstance,
    params?: { title: string },
  ) => {
    return await FetchUtil.validateResponse<TicketResponse>(
      () => network.get('/kanban/v1/tickets', { params }),
      TicketResponseSchema,
    );
  };

  static getTicketById = async (network: AxiosInstance, ticketId: string) => {
    return await FetchUtil.validateResponse<Ticket>(
      () => network.get(`/kanban/v1/tickets/${ticketId}`),
      TicketSchema,
    );
  };

  static updateTicket = async (
    network: AxiosInstance,
    ticketId: string,
    reqBody: TicketCreateUpdateReqBody,
  ) => {
    return await FetchUtil.validateResponse<Ticket>(
      () => network.put(`/kanban/v1/tickets/${ticketId}`, reqBody),
      TicketSchema,
    );
  };

  static deleteTicket = async (network: AxiosInstance, ticketId: string) => {
    return await FetchUtil.validateResponse<TicketDelete>(
      () => network.delete(`/kanban/v1/tickets/${ticketId}`),
      TicketDeleteSchema,
    );
  };
}
