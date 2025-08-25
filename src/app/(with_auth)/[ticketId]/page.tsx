import { TicketType } from "@/api/tickets/models/tickets";
import { TicketApi } from "@/api/tickets/tickets";
import { PageContainer } from "@/components/Page/PageContainer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DynamicMetadataFunction, PageRouteProps } from "@/models/models";
import { NetworkUtils } from "@/utils/networkUtils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { TicketContent } from "./_components/TicketContent";
import { ActionButtons } from "./_components/ActionButtons";

type Props = PageRouteProps<{ ticketId: string }>;

export const generateMetadata: DynamicMetadataFunction<{ ticketId: string }> = async ({ params }) => {
  const { ticketId } = await params;
  const network = NetworkUtils.create();
  const ticket = await TicketApi.getTicketById(network, parseInt(ticketId));

  return {
    title: `ITSEC Kanban Board | ${ticket.id}`,
  };
};

export default async function TicketDetailPage({ params }: Props) {
  const { ticketId } = await params;

  let ticket: TicketType | null = null;

  try {
    const network = NetworkUtils.create();
    ticket = await TicketApi.getTicketById(network, parseInt(ticketId));
  } catch (error) {
    console.error(error);
  }

  if (!ticket) return notFound();

  return (
    <PageContainer pageName="ticket detail" className="flex flex-col space-y-8">
      {/* Title */}
      <h1 className="text-2xl font-semibold">Task Detail</h1>

      <div className="flex flex-col space-y-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#667085] font-semibold hover:underline">
                <Link href="/">Dashboard</Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis text-[#667085] font-semibold">
                {ticket?.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Detail */}
        <TicketContent ticket={ticket} />

        {/* Action button */}
        <ActionButtons ticket={ticket} />
      </div>
    </PageContainer>
  );
}
