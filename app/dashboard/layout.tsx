import DashboardNav from "@/components/DashboardNav";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1">
        <DashboardNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
