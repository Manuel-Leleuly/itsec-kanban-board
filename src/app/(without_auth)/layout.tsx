import { UserResponseType } from "@/api/users/models/users";
import { UserApi } from "@/api/users/users";
import { PageLayout } from "@/models/models";
import { AuthContextProvider } from "@/providers/authProvider";
import { NetworkUtils } from "@/utils/networkUtils";

export default async function WithoutAuthLayout({ children }: PageLayout) {
  let users: UserResponseType = [];

  try {
    const network = NetworkUtils.create();
    users = await UserApi.getAllUsers(network);
  } catch (error) {
    console.error(error);
  }

  return <AuthContextProvider users={users}>{children}</AuthContextProvider>;
}
