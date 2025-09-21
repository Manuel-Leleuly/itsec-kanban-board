import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { ProgressAppProvider } from '@/providers/progressAppProvider';
import { QueryProvider } from '@/providers/queryProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

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
    images: ['https://toothbrush-kanban-flow.vercel.app/og-image.png'],
  },
  metadataBase: new URL('https://toothbrush-kanban-flow.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('antialiased', inter.className)}>
        <ProgressAppProvider>
          <QueryProvider>
            {children}
            <Toaster position='bottom-right' closeButton />
          </QueryProvider>
        </ProgressAppProvider>
      </body>
    </html>
  );
}
