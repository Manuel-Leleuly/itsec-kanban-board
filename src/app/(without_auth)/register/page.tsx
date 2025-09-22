import { RegisterFormCard } from '@/app/(without_auth)/register/_components/RegisterFormCard';
import { Kanban } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kanban Flow | Register',
};

export default function RegisterPage() {
  return (
    <section id='register' className='w-full min-h-screen flex'>
      {/* Left Side */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center p-12'>
        <div className='max-w-md text-center space-y-6'>
          <div className='flex items-center justify-center space-x-3'>
            <div className='p-3 bg-primary rounded-xl'>
              <Kanban className='h-8 w-8 text-primary-foreground' />
            </div>
            <h1 className='text-3xl font-bold text-foreground'>Kanban Flow</h1>
          </div>
          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-foreground'>
              Join thousands of productive teams
            </h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Start organizing your projects with our intuitive kanban board.
              Built for clarity, designed for productivity.
            </p>
          </div>
          <div className='flex items-center justify-center space-x-2 pt-8'>
            <div className='w-3 h-3 bg-frontend rounded-full'></div>
            <div className='w-3 h-3 bg-backend rounded-full'></div>
            <div className='w-3 h-3 bg-design rounded-full'></div>
            <span className='text-sm text-muted-foreground ml-2'>
              Frontend • Backend • Design
            </span>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <RegisterFormCard />
      </div>
    </section>
  );
}
