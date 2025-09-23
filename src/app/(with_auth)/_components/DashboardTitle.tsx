'use client';

import { useConfigContext } from '@/providers/configProvider';

export const DashboardTitle = () => {
  const { user } = useConfigContext();

  return (
    <h1 className='text-md md:text-xl lg:text-2xl font-semibold'>
      Hello {user.first_name}, Here&#39;s your task
    </h1>
  );
};
