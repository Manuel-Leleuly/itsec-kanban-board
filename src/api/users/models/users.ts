import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  createdAt: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;

export const UserResponseSchema = z.array(UserSchema);

export type UserResponseType = z.infer<typeof UserResponseSchema>;

export const CreateUserReqBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export type CreateUserReqBodyType = z.infer<typeof CreateUserReqBodySchema>;

export const LoginReqBodySchema = z.object({
  email: z.email(),
  password: z.string({ error: "password is required" }),
});

export type LoginReqBodyType = z.infer<typeof LoginReqBodySchema>;
