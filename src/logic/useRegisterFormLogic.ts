'use client';

import { register } from '@/api/iam/actions/iamServerActions';
import { UserCreateFormSchema, UserCreateReqBody } from '@/api/iam/models/iam';
import { ToastLib } from '@/lib/toastLib';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useRegisterFormLogic = () => {
  const router = useRouter();

  const registerMutation = useMutation({
    mutationKey: ['register'],
    mutationFn: async (reqBody: UserCreateReqBody) => {
      const errorData = await register({
        email: reqBody.email,
        password: reqBody.password,
        first_name: reqBody.first_name,
        last_name: reqBody.last_name,
      });
      if (errorData) {
        throw new Error(JSON.stringify(errorData));
      }
    },
    onSuccess: () => {
      ToastLib.success('Success creating new user. Redirect to login...');
      router.push('/login');
    },
    onError: () => {
      ToastLib.error('Failed to create user. Please try again');
    },
  });

  const registerForm = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      retype_password: '',
    },
    validators: {
      onSubmit: UserCreateFormSchema,
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value);
    },
    canSubmitWhenInvalid: false,
  });

  return {
    registerForm,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  };
};
