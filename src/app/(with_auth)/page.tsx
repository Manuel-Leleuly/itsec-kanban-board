import { Ticket } from '@/api/tickets/models/tickets';
import { TicketApi } from '@/api/tickets/tickets';
import { PageContainer } from '@/components/Page/PageContainer';
import { NetworkUtils } from '@/utils/networkUtils';
import { redirect } from 'next/navigation';
import { DashboardContent } from './_components/DashboardContent';
import { DashboardTitle } from './_components/DashboardTitle';

export default async function HomePage() {
  const network = NetworkUtils.withCredentials();

  let tickets: Ticket[] = [];
  try {
    tickets = await TicketApi.getAllTickets(network);
  } catch (_) {
    redirect('/login');
  }

  return (
    <PageContainer pageName='home'>
      <div className='w-full max-w-7xl flex flex-col space-y-8'>
        <DashboardTitle />
        <DashboardContent tickets={tickets} />
      </div>
    </PageContainer>
  );
}
