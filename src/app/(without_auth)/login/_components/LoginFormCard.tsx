import { LoginForm } from '@/app/(without_auth)/login/_components/LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Kanban } from 'lucide-react';
import Link from 'next/link';

export const LoginFormCard = () => {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-2 text-center'>
        <div className='flex items-center justify-center lg:hidden mb-4'>
          <div className='p-2 bg-primary rounded-lg'>
            <Kanban className='h-6 w-6 text-primary-foreground' />
          </div>
          <h1 className='text-xl font-bold ml-2'>Kanban Flow</h1>
        </div>
        <CardTitle className='text-2xl font-semibold'>Welcome back</CardTitle>
        <CardDescription className='text-base'>
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />

        <div className='mt-6 text-center'>
          <p className='text-sm text-muted-foreground'>
            Don&#39;t have an account?{' '}
            <Link
              href='/register'
              className='font-medium text-primary hover:underline'
              data-test-id='signup-link'
            >
              Sign up
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
