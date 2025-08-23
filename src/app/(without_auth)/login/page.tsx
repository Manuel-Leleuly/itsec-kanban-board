import { NetworkUtils } from "@/utils/networkUtils";
import { LoginForm } from "./_components/loginForm";
import { UserResponseType } from "@/api/users/models/users";
import { UserApi } from "@/api/users/users";
import Image from "next/image";

export default async function LoginPage() {
  let users: UserResponseType = [];

  try {
    const network = NetworkUtils.create();
    users = await UserApi.getAllUsers(network);
  } catch (error) {
    console.error(error);
  }

  return (
    <section id="login" className="w-full min-h-screen flex">
      {/* Left Side */}
      <div className="w-1/2 min-h-screen relative">
        <Image alt="login" src="/login.png" fill className="bg-cover" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 min-h-screen flex justify-center items-center">
        <div className="w-1/2 space-y-15">
          <h1 className="text-3xl font-bold">Login</h1>
          <LoginForm users={users} />
        </div>
      </div>
    </section>
  );
}
