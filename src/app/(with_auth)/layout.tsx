import { UserSchema } from "@/api/users/models/users";
import { Navbar } from "@/components/Navbar/Navbar";
import { KanbanSidebar } from "@/components/Sidebar/Sidebar";
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

  return (
    <ConfigContextProvider user={user}>
      <div>
        <KanbanSidebar />
        <div className="w-full overflow-y-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </ConfigContextProvider>
  );
}
