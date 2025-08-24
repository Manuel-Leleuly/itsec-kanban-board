import { LoginForm } from "./_components/LoginForm";
import Image from "next/image";

export default async function LoginPage() {
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
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
