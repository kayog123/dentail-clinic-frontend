"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { Badge } from "@/app/components/ui/badge";
import {
  Clock,
  UserCheck,
  Stethoscope,
  BarChart3,
  Calendar as LucideCalendar,
} from "lucide-react";
import moment from "moment";
import { Button } from "@/app/components/ui/button";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCallback, useState } from "react";

export default function UpcomingAppointmentsV2() {
  const localizer = momentLocalizer(moment);
  const events = [
    {
      title: "Dr John - Dental Care Clinic",
      allDay: true,
      start: new Date(2025, 8, 0),
      end: new Date(2025, 8, 1),
    },
    {
      title: "Long Event",
      start: new Date(2025, 8, 7),
      end: new Date(2025, 8, 10),
    },

    {
      title: "DTS STARTS",
      start: new Date(2025, 7, 8, 0, 0, 0),
      end: new Date(2025, 7, 10, 0, 0, 0),
    },

    {
      title: "DTS ENDS",
      start: new Date(2025, 7, 14, 0, 0, 0),
      end: new Date(2025, 7, 13, 0, 0, 0),
    },
    {
      title: "Some Event",
      start: new Date(2025, 7, 9, 0, 0, 0),
      end: new Date(2025, 7, 0, 0, 0),
    },
  ];
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.WEEK);

  const onNavigate = useCallback(
    (newDate: Date) => setDate(newDate),
    [setDate]
  );
  const onView = useCallback((newView: View) => setView(newView), [setView]);
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
            View upcoming scheduled appointments and their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              defaultDate={date}
              onNavigate={onNavigate}
              onView={onView}
              view={view}
            />
          </div>
        </CardContent>
      </Card>

      {/* Appointment Details & Tasks */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Click appointment on the calendar and it will show the details here
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
              <LucideCalendar className="h-6 w-6 mb-2" />
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
