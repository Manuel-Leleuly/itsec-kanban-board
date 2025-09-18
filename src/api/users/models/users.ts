import z from 'zod';

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
  createdAt: z.string(),
});

export type CreateUserReqBodyType = z.infer<typeof CreateUserReqBodySchema>;

export const LoginReqBodySchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }),
});

export type LoginReqBodyType = z.infer<typeof LoginReqBodySchema>;

export const CreateUserFormSchema = z
  .object({
    first_name: z.string().nonempty('First Name must not be empty'),
    last_name: z.string().nonempty('Last Name must not be empty'),
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one digit')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character',
      ),
    retype_password: z.string().nonempty('Retype Password must not be empty'),
  })
  .superRefine(({ password, retype_password }, ctx) => {
    if (password !== retype_password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Retype Password does not match password',
        path: ['retype_password'],
      });
    }
  });

export type CreateUserFormType = z.infer<typeof CreateUserFormSchema>;

export const GetAllUsersParamsSchema = z.object({
  name: z.string().nullish(),
  email: z.string().nullish(),
});

export type GetAllUsersParamsType = z.infer<typeof GetAllUsersParamsSchema>;
