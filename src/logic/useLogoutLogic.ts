import { logout } from '@/actions/serverActions';
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
      router.push('/login');
    },
    onError: () => {
      ToastLib.error('Failed to log out. Please try again');
    },
  });

  return {
    onLogout: logoutMutation.mutateAsync,
  };
};
