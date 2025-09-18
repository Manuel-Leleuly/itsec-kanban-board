'use server';

import {
  CreateUpdateTicketReqBodySchema,
  CreateUpdateTicketReqBodyType,
} from '@/api/tickets/models/tickets';
import { TicketApi } from '@/api/tickets/tickets';
import {
  CreateUserReqBodyType,
  LoginReqBodyType,
} from '@/api/users/models/users';
import { UserApi } from '@/api/users/users';
import { COOKIE_KEYS } from '@/constants/constants';
import { FetchUtil } from '@/utils/fetchUtils';
import { NetworkUtils } from '@/utils/networkUtils';
import { isAxiosError } from 'axios';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { ZodError } from 'zod';

const errorInvalidEmailPassword = 'invalid email and/or password';
const error500 = 'internal server error';

export const register = async (reqBody: CreateUserReqBodyType) => {
  try {
    const network = NetworkUtils.create();

    /**
     * Check if the email is already used
     *
     * mockAPI will throw error 404 if none of the user's email match the request email (which is the correct expectation).
     * Therefore, I put another try catch in here to prevent false error
     */
    try {
      const result = await UserApi.getAllUsers(network);
      const isEmailAlreadyUsed = result.some(
        (user) => user.email === reqBody.email,
      );
      if (isEmailAlreadyUsed) throw new Error('email is already used');
    } catch (err) {
      // only throw error if it's because the email is already used
      if (err instanceof Error && !isAxiosError(err)) {
        throw err;
      }
    }

    // encrypt password
    reqBody.password = await bcrypt.hash(reqBody.password, 10);

    // save the new user
    await UserApi.createUser(network, reqBody);

    // revalidate login page just in case
    revalidatePath('/login');
    return null;
  } catch (err) {
    let errorMessage = (err as Error).message;
    if (isAxiosError(err)) {
      if (err.response?.status.toString().startsWith('5')) {
        errorMessage = error500;
      }
    }

    return FetchUtil.getErrorFromServerAction({
      error: err as Error,
      errorMessage,
      serverActionLabel: 'register',
    });
  }
};

export const login = async (reqBody: LoginReqBodyType) => {
  try {
    const network = NetworkUtils.create();
    const result = await UserApi.getAllUsers(network, { email: reqBody.email });
    if (!result.length) throw new Error(errorInvalidEmailPassword);

    const user = result[0];

    /**
     * Query param in mockapi can be partial
     *
     * email in BE: johndoe@example.com
     *
     * email query param:
     * - johndoe@example.com // correct
     * - johndoe@ // also correct
     *
     * need to make sure that the user inputs the full email
     */
    if (reqBody.email !== user.email)
      throw new Error(errorInvalidEmailPassword);

    // check password
    const isPasswordMatch = await bcrypt.compare(
      reqBody.password,
      user.password,
    );
    if (!isPasswordMatch) throw new Error(errorInvalidEmailPassword);

    // save user inside cookies
    (await cookies()).set(COOKIE_KEYS.USER, JSON.stringify(user), {
      httpOnly: true,
    });
    revalidatePath('/');
    return null;
  } catch (err) {
    let errorMessage = (err as Error).message;

    if (isAxiosError(err)) {
      const { response } = err;
      if (response) {
        if (response.status === 404) {
          errorMessage = errorInvalidEmailPassword;
        } else if (Math.floor(response.status / 100) === 5) {
          errorMessage = error500;
        }
      }
    }

    return FetchUtil.getErrorFromServerAction({
      error: err as Error,
      errorMessage,
      serverActionLabel: 'login',
    });
  }
};

export const logout = async () => {
  (await cookies()).delete(COOKIE_KEYS.USER);
};

export const addTicket = async (reqBody: CreateUpdateTicketReqBodyType) => {
  try {
    const network = NetworkUtils.create();
    const addTicketReqBody = CreateUpdateTicketReqBodySchema.parse(reqBody);
    await TicketApi.createTicket(network, addTicketReqBody);
    return null;
  } catch (err) {
    let errorMessage = (err as Error).message;
    if (isAxiosError(err)) {
      errorMessage = err.message;
    } else if (err instanceof ZodError) {
      errorMessage = err.message;
    }

    return FetchUtil.getErrorFromServerAction({
      error: err as Error,
      errorMessage,
      serverActionLabel: 'addTicket',
    });
  }
};

export const updateTicket = async (
  ticketId: string,
  reqBody: CreateUpdateTicketReqBodyType,
) => {
  try {
    const network = NetworkUtils.create();
    const updateTicketReqBody = CreateUpdateTicketReqBodySchema.parse(reqBody);
    await TicketApi.updateTicketById(
      network,
      parseInt(ticketId),
      updateTicketReqBody,
    );
    return null;
  } catch (err) {
    let errorMessage = (err as Error).message;
    if (isAxiosError(err)) {
      errorMessage = err.message;
    } else if (err instanceof ZodError) {
      errorMessage = err.message;
    }

    return FetchUtil.getErrorFromServerAction({
      error: err as Error,
      errorMessage,
      serverActionLabel: 'addTicket',
    });
  }
};

// soft delete
export const deleteTicket = async (
  ticketId: string,
  reqBody: CreateUpdateTicketReqBodyType,
) => {
  try {
    const network = NetworkUtils.create();
    const updateTicketReqBody = CreateUpdateTicketReqBodySchema.parse(reqBody);
    await TicketApi.updateTicketById(
      network,
      parseInt(ticketId),
      updateTicketReqBody,
    );
  } catch (err) {
    let errorMessage = (err as Error).message;
    if (isAxiosError(err)) {
      errorMessage = err.message;
    } else if (err instanceof ZodError) {
      errorMessage = err.message;
    }

    return FetchUtil.getErrorFromServerAction({
      error: err as Error,
      errorMessage,
      serverActionLabel: 'addTicket',
    });
  }
};
