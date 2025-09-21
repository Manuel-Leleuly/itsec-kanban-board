import z from 'zod';

export const TicketSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  assignees: z.array(z.string()),
  status: z.enum(['todo', 'doing', 'done']),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Ticket = z.infer<typeof TicketSchema>;

export const TicketResponseSchema = z.array(TicketSchema);

export type TicketResponse = z.infer<typeof TicketResponseSchema>;

export const TicketCreateUpdateReqBodySchema = z.object({
  title: z.string().nonempty({ error: 'Title is required' }),
  description: z.string(),
  assignees: z.array(z.string()),
  status: z.enum(['todo', 'doing', 'done']),
});

export type TicketCreateUpdateReqBody = z.infer<
  typeof TicketCreateUpdateReqBodySchema
>;

export const TicketCreateUpdateFormSchema = z.object({
  title: z.string().nonempty({ error: 'Ticket Name is required' }),
  description: z.string(),
  assignees: z.array(z.string()),
  status: z
    .enum(['todo', 'doing', 'done'])
    .nonoptional({ error: 'Status is required' }),
});

export type TicketCreateUpdateForm = z.infer<
  typeof TicketCreateUpdateFormSchema
>;

export const TicketDeleteSchema = z.object({
  message: z.string().default('success'),
});

export type TicketDelete = z.infer<typeof TicketDeleteSchema>;
