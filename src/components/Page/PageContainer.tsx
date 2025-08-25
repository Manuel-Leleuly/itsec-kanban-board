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
    <section
      id={pageName}
      className={cn(
        "w-full min-h-screen sm:min-h-[calc(100vh-48px)] bg-[#F2F4F7] px-5 sm:px-10 md:px-20 py-8 lg:px-40",
        className
      )}
    >
      {children}
    </section>
  );
};
