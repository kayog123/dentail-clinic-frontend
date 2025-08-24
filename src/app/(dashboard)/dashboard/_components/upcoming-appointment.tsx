import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Stethoscope,
  BarChart3,
} from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
export default function UpcomingAppointments() {
  const recentAppointments = [
    {
      id: 1,
      patientName: "John Smith",
      time: "09:00 AM",
      treatment: "Dental Cleaning",
      status: "confirmed" as const,
    },
    {
      id: 2,
      patientName: "Sarah Wilson",
      time: "10:30 AM",
      treatment: "Root Canal",
      status: "in-progress" as const,
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      time: "02:00 PM",
      treatment: "Crown Fitting",
      status: "pending" as const,
    },
    {
      id: 4,
      patientName: "Emily Davis",
      time: "03:30 PM",
      treatment: "Consultation",
      status: "confirmed" as const,
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Review patient records",
      priority: "high" as const,
      dueDate: "Today",
    },
    {
      id: 2,
      title: "Update treatment plans",
      priority: "medium" as const,
      dueDate: "Tomorrow",
    },
    {
      id: 3,
      title: "Staff meeting",
      priority: "low" as const,
      dueDate: "Friday",
    },
  ];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="default">Confirmed</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "low":
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      {/* Recent Appointments */}
      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>
            Today&apos;s scheduled appointments and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{appointment.patientName}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.treatment}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-muted-foreground">
                    {appointment.time}
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Tasks */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and upcoming responsibilities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="h-20 flex-col">
              <UserCheck className="h-6 w-6 mb-2" />
              <span className="text-xs">New Patient</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-xs">Schedule</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Stethoscope className="h-6 w-6 mb-2" />
              <span className="text-xs">Treatment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span className="text-xs">Reports</span>
            </Button>
          </div>

          {/* Upcoming Tasks */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Upcoming Tasks</h4>
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium">{task.title}</div>
                    <div className="text-xs text-muted-foreground">
                      Due: {task.dueDate}
                    </div>
                  </div>
                </div>
                {getPriorityBadge(task.priority)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
