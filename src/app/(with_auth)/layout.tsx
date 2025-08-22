import { UserSchema } from "@/api/users/models/users";
import { PageLayout } from "@/models/models";
import { ConfigContextProvider } from "@/providers/configProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function WithAuthLayout({ children }: PageLayout) {
  const serverCookies = await cookies();
  const userCookie = serverCookies.get("user");
  if (!userCookie) redirect("/login");

  const userCookieObj = JSON.parse(userCookie.value);
  const { data: user, success } = UserSchema.safeParse(userCookieObj);
  if (!success) redirect("/login");

  return <ConfigContextProvider user={user}>{children}</ConfigContextProvider>;
}
