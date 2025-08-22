import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PageContainer = ({
  pageName,
  children,
  className,
}: {
  pageName: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section id={pageName} className={cn("w-full min-h-[calc(100vh-48px)] bg-[#F2F4F7] py-8 px-40", className)}>
      {children}
    </section>
  );
};
