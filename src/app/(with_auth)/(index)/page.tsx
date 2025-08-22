import { PageContainer } from "@/components/Page/PageContainer";
import { DashboardTitle } from "./_components/DashboardTitle";
import { NetworkUtils } from "@/utils/networkUtils";
import { TicketApi } from "@/api/tickets/tickets";
import { DashboardContent } from "./_components/DashboardContent";

export default async function HomePage() {
  const network = NetworkUtils.create();
  const tickets = await TicketApi.getAllTickets(network);

  return (
    <PageContainer pageName="home">
      <div className="w-full flex flex-col space-y-8">
        <DashboardTitle />
        <DashboardContent tickets={tickets} />
      </div>
    </PageContainer>
  );
}
