import { RegisterForm } from '@/app/(without_auth)/register/_components/RegisterForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Kanban } from 'lucide-react';
import Link from 'next/link';

export const RegisterFormCard = () => {
  return (
    <Card className='w-full max-w-md'>
      <CardHeader className='space-y-2 text-center'>
        <div className='flex items-center justify-center lg:hidden mb-4'>
          <div className='p-2 bg-primary rounded-lg'>
            <Kanban className='h-6 w-6 text-primary-foreground' />
          </div>
          <h1 className='text-xl font-bold ml-2'>Kanban Flow</h1>
        </div>
        <CardTitle className='text-2xl font-semibold'>
          Create your account
        </CardTitle>
        <CardDescription className='text-base'>
          Get started with your free TaskFlow account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />

        <div className='mt-6 text-center'>
          <p className='text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link
              href='/login'
              className='font-medium text-primary hover:underline'
            >
              Sign in
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
