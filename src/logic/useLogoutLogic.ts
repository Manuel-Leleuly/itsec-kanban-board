'use client';

import { logout } from '@/api/iam/actions/iamServerActions';
import { ToastLib } from '@/lib/toastLib';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogoutLogic = () => {
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      ToastLib.success('Redirect to login...');
      router.replace('/login');
    },
    onError: () => {
      ToastLib.error('Failed to log out. Please try again');
    },
  });

  return {
    onLogout: logoutMutation.mutateAsync,
  };
};
