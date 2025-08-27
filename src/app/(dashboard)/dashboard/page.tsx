import UpcomingAppointmentsV2 from "./_components/upcoming-appointment-v2";
import { Amplify } from "aws-amplify";
import { awsConfig } from "@/app/lib/aws-config";

// Mock data for demonstration
Amplify.configure(awsConfig);
export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your dental
            practice today.
          </p>
        </div>
        <div className="flex items-center space-x-2"></div>
      </div>

      {/* Main Content Grid */}
      <UpcomingAppointmentsV2 />
    </div>
  );
}
