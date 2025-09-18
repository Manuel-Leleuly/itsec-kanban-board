import { TicketApi } from '@/api/tickets/tickets';
import { PageContainer } from '@/components/Page/PageContainer';
import { DELETED_AT_DEFAULT } from '@/constants/constants';
import { NetworkUtils } from '@/utils/networkUtils';
import { Metadata } from 'next';
import { DashboardContent } from './_components/DashboardContent';
import { DashboardTitle } from './_components/DashboardTitle';

export const metadata: Metadata = {
  title: 'Kanban Flow – Simple Task Management Board',
  description:
    'Organize your tasks efficiently with a modern Kanban board. Drag, drop, and manage your workflow seamlessly.',
  keywords: [
    'kanban',
    'task management',
    'productivity',
    'workflow',
    'next.js kanban',
    'project board',
  ],
  authors: [
    { name: 'Toothbrush', url: 'https://toothbrush-kanban-flow.vercel.app' },
  ],
  creator: 'Toothbrush',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Kanban Flow – Simple Task Management Board',
    description: 'Organize your tasks efficiently with a modern Kanban board.',
    url: 'https://toothbrush-kanban-flow.vercel.app',
    siteName: 'Kanban Flow',
    images: [
      {
        url: 'https://toothbrush-kanban-flow.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kanban Board Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kanban Flow – Simple Task Management Board',
    description: 'Organize your tasks efficiently with a modern Kanban board.',
    creator: '@noel_leleuly',
    images: ['https://toothbrush-kanban-flow.vercel.app/og-image.png'],
  },
  metadataBase: new URL('https://toothbrush-kanban-flow.vercel.app'),
};

export default async function HomePage() {
  const network = NetworkUtils.create();

  // this is to only get tickets who are NOT deleted
  const tickets = await TicketApi.getAllTickets(network, {
    deletedAt: DELETED_AT_DEFAULT,
  });

  return (
    <PageContainer pageName='home'>
      <div className='w-full max-w-7xl flex flex-col space-y-8'>
        <DashboardTitle />
        <DashboardContent tickets={tickets} />
      </div>
    </PageContainer>
  );
}
