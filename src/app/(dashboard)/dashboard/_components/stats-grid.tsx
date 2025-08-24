import { Users, Calendar, DollarSign, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
export default function DashboardStatsGrid() {
  const stats = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Today's Appointments",
      value: "24",
      change: "+3",
      changeType: "positive" as const,
      icon: Calendar,
    },
    {
      title: "Monthly Revenue",
      value: "$45,231",
      change: "+20.1%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Treatment Success Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: CheckCircle,
    },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
