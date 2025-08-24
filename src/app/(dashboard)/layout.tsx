import { ReactNode } from "react";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { DashboardHeader } from "./_components/dashboard-header";
import AdminProvider from "./_components/admin-provider";
import QueryProvider from "./_components/query-provider";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <QueryProvider>
      <AdminProvider>
        <div className="flex h-screen bg-background">
          <DashboardSidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </AdminProvider>
    </QueryProvider>
  );
}
