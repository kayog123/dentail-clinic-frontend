import { Button } from "@/app/components/ui/button";
import { Calendar, Users } from "lucide-react";
import UpcomingAppointmentsV2 from "./_components/upcoming-appointment-v2";

// Mock data for demonstration

export default function DashboardPage() {
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
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      {/* <DashboardStatsGrid /> */}
      {/* Main Content Grid */}
      <UpcomingAppointmentsV2 />
    </div>
  );
}
