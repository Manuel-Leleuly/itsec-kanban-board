import { PageLayout } from "@/models/models";

export default async function WithoutAuthLayout({ children }: PageLayout) {
  return children;
}
