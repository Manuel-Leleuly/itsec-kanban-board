import { ServerActionErrorSchema } from '@/models/models';
import { AxiosResponse, isAxiosError } from 'axios';
import { z } from 'zod';

export class FetchUtil {
  static validateResponse = async <D>(
    networkCall: () => Promise<AxiosResponse<D>>,
    Codec: z.ZodType<D>,
  ) => {
    try {
      const response = await networkCall();
      return Codec.parse(response.data);
    } catch (error) {
      throw error;
    }
  };

  static getErrorFromServerAction = ({
    error,
    errorMessage,
    serverActionLabel,
  }: {
    error: Error;
    errorMessage: string;
    serverActionLabel: string;
  }) => {
    return {
      action_message: `there is a server action error from ${serverActionLabel}`,
      status_code: isAxiosError(error) ? error.status : null,
      error_message: errorMessage,
      response_data: isAxiosError(error) ? error.response?.data : null,
    };
  };

  static parseServerActionError = (error: Error) => {
    const errJson = JSON.parse(error.message);
    return ServerActionErrorSchema.parse(errJson);
  };
}
