import { PageContainer } from "@/components/Page/PageContainer";
import { ClipLoader } from "react-spinners";

export default function HomePageLoading() {
  return (
    <PageContainer pageName="homePageLoading" className="relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-1/2">
        <ClipLoader size={100} />
      </div>
    </PageContainer>
  );
}
