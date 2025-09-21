import { IamApi } from '@/api/iam/iam';
import { UserResponse } from '@/api/iam/models/iam';
import { Navbar } from '@/components/Navbar/Navbar';
import { KanbanSidebar } from '@/components/Sidebar/Sidebar';
import { PageLayout } from '@/models/models';
import { ConfigContextProvider } from '@/providers/configProvider';
import { NetworkUtils } from '@/utils/networkUtils';
import { redirect } from 'next/navigation';

export default async function WithAuthLayout({ children }: PageLayout) {
  // TODO: improve this
  let user: UserResponse | null = null;
  try {
    const network = NetworkUtils.withCredentials();
    user = await IamApi.getMe(network);
  } catch (_) {
    redirect('/login');
  }

  return (
    <ConfigContextProvider user={user}>
      <div className='flex'>
        <KanbanSidebar />
        <div className='w-full max-h-screen overflow-y-auto'>
          <Navbar />
          {children}
        </div>
      </div>
    </ConfigContextProvider>
  );
}
