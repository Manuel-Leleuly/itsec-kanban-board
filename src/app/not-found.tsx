import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-1/2 left-1/2 transform -translate-1/2 flex flex-col justify-center items-center space-y-20">
        <SearchX size={100} />
        <div className="flex flex-col justify-center items-center">
          <p>I'm sorry, but the page you are looking for is not here</p>
          <Link href={"/"}>
            <Button variant={"link"} className="text-blue-500">
              go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
