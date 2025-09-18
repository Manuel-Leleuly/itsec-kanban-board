import { DELETED_AT_DEFAULT } from '@/constants/constants';
import z from 'zod';

export const TicketSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  assignees: z.array(z.string()),
  status: z.enum(['todo', 'doing', 'done']),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().default(DELETED_AT_DEFAULT),
});

export type TicketType = z.infer<typeof TicketSchema>;

export const TicketResponseSchema = z.array(TicketSchema);

export type TicketResponseType = z.infer<typeof TicketResponseSchema>;

export const TicketSearchParamSchema = z.object({
  deletedAt: z.string().nullish(),
});

export type TicketSearchParam = z.infer<typeof TicketSearchParamSchema>;

export const CreateUpdateTicketReqBodySchema = TicketSchema.omit({ id: true });

export type CreateUpdateTicketReqBodyType = z.infer<
  typeof CreateUpdateTicketReqBodySchema
>;

export const CreateUpdateTicketFormSchema = z.object({
  title: z.string().nonempty({ error: 'Ticket Name is required' }),
  description: z.string(),
  assignees: z.array(z.string()),
  status: z.enum(['todo', 'doing', 'done']),
});

export type CreateUpdateTicketFormType = z.infer<
  typeof CreateUpdateTicketFormSchema
>;
