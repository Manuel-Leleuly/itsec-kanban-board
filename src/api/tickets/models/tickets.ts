import z from "zod";

export const TicketSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  assignees: z.array(z.string()),
  status: z.enum(["todo", "doing", "done"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
});

export type TicketType = z.infer<typeof TicketSchema>;

export const TicketResponseSchema = z.array(TicketSchema);

export type TicketResponseType = z.infer<typeof TicketResponseSchema>;

export const CreateUpdateTicketReqBodySchema = z.object({
  title: z.string().nonempty({ error: "Ticket Name is required" }),
  description: z.string(),
  assignees: z.array(z.string()),
  status: z.enum(["todo", "doing", "done"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
});

export type CreateUpdateTicketReqBodyType = z.infer<typeof CreateUpdateTicketReqBodySchema>;
