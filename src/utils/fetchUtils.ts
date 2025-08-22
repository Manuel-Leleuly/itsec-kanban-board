import { AxiosError, AxiosResponse } from "axios";
import { z } from "zod";

export class FetchUtil {
  static validateResponse = async <D>(networkCall: () => Promise<AxiosResponse<D>>, Codec: z.ZodType<D>) => {
    try {
      const response = await networkCall();
      const { success, data, error } = Codec.safeParse(response.data);

      if (!success) throw error;

      return data;
    } catch (error) {
      throw error;
    }
  };

  static getAxiosErrorFromServerAction = (error: AxiosError, serverActionLabel: string) => {
    return {
      message: `there is a server action error from ${serverActionLabel}`,
      status_code: error.status,
      response_data: error.response?.data,
    };
  };
}
