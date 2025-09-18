import { Metadata } from 'next';
import Image from 'next/image';
import { RegisterForm } from './_components/RegisterForm';

export const metadata: Metadata = {
  title: 'ITSEC Kanban Board | Register',
};

export default function RegisterPage() {
  return (
    <section id='register' className='w-full min-h-screen flex'>
      {/* Left Side */}
      <div className='hidden md:block w-1/2 min-h-screen relative'>
        <Image alt='register' src='/login.png' fill className='bg-cover' />
      </div>

      {/* Right Side */}
      <div className='w-full md:w-1/2 h-screen overflow-auto flex justify-center-safe items-center-safe py-4'>
        <div className='w-3/4 sm:w-1/2 md:w-3/4 lg:w-1/2 space-y-15 my-4 m-auto'>
          <h1 className='text-3xl font-bold'>Register</h1>
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
