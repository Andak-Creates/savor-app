import DashboardNav from "@/components/DashboardNav";
import SideNav from "@/components/SideNav";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNav />
      <SideNav />
      <div className="flex-1">
        <main
          className="pl-[60px] md:pl-[180px] 
        pt-[70px] flex items-start justify-start 
        min-h-screen"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
