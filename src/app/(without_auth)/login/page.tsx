import { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "./_components/LoginForm";

export const metadata: Metadata = {
  title: "ITSEC Kanban Board | Login",
};

export default async function LoginPage() {
  return (
    <section id="login" className="w-full min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:block w-1/2 min-h-screen relative">
        <Image alt="login" src="/login.png" fill className="bg-cover" />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 min-h-screen flex justify-center items-center">
        <div className="w-3/4 sm:w-1/2 md:w-3/4 lg:w-1/2 space-y-15">
          <h1 className="text-3xl font-bold">Login</h1>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
