import { PageContainer } from "@/components/Page/PageContainer";
import { DashboardTitle } from "./_components/title";
import { NetworkUtils } from "@/utils/networkUtils";
import { TicketApi } from "@/api/tickets/tickets";

export default async function HomePage() {
  const network = NetworkUtils.create();
  const tickets = await TicketApi.getAllTickets(network);

  console.log({ tickets });

  return (
    <PageContainer pageName="home">
      <div className="w-full flex flex-col space-y-8">
        <DashboardTitle />
      </div>
    </PageContainer>
  );
}
