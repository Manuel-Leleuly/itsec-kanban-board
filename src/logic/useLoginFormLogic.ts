'use client';

import { login } from '@/api/iam/actions/iamServerActions';
import { LoginFormSchema, LoginReqBody } from '@/api/iam/models/iam';
import { ToastLib } from '@/lib/toastLib';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLoginFormLogic = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (reqBody: LoginReqBody) => {
      const errorData = await login(reqBody);
      if (errorData) {
        throw new Error(JSON.stringify(errorData));
      }
    },
    onSuccess: () => {
      ToastLib.success('Success log in. Redirecting...');
      router.push('/');
    },
    onError: () => {
      ToastLib.error('Failed to log in. Please try again');
    },
  });

  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: LoginFormSchema,
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value);
    },
    canSubmitWhenInvalid: false,
  });

  return {
    loginForm,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
