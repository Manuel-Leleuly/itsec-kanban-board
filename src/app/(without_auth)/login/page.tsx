import { LoginFormCard } from '@/app/(without_auth)/login/_components/LoginFormCard';
import { Kanban } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kanban Flow | Login',
};

export default async function LoginPage() {
  return (
    <section id='login' className='w-full min-h-screen flex'>
      {/* Left Side */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-primary/10 to-background items-center justify-center p-12'>
        <div className='max-w-md text-center space-y-6'>
          <div className='flex items-center justify-center gap-x-3'>
            <div className='p-3 bg-primary rounded-xl'>
              <Kanban className='h-8 w-8 text-primary-foreground' />
            </div>
            <h1 className='text-3xl font-bold text-foreground'>Kanban Flow</h1>
          </div>

          <div className='space-y-4'>
            <h2 className='text-2xl font-semibold text-foreground'>
              Organize your work with visual clarity
            </h2>
            <p className='text-lg text-muted-foreground landing-relaxed'>
              A kanban board designed for maximum readability and efficient task
              management. Track your projects from todo to completion with ease.
            </p>
          </div>

          <div className='grid grid-cols-3 gap-4 pt-8'>
            <div className='p-4 bg-todo rounded-lg text-center'>
              <div className='text-sm font-medium text-todo-foreground'>
                Todo
              </div>
            </div>
            <div className='p-4 bg-doing rounded-lg text-center'>
              <div className='text-sm font-medium text-doing-foreground'>
                Doing
              </div>
            </div>
            <div className='p-4 bg-done rounded-lg text-center'>
              <div className='text-sm font-medium text-done-foreground'>
                Done
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <LoginFormCard />
      </div>
    </section>
  );
}
