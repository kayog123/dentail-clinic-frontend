import {
  Calendar,
  //Users,
  //FileText,
  Settings,
  //BarChart3,
  //CreditCard,
  Bell,
  Home,
  //Stethoscope,
  //Clock,
  //UserCheck,
} from "lucide-react";

export const MENU_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  // {
  //   title: "Patients",
  //   href: "/dashboard/patients",
  //   icon: Users,
  // },
  // {
  //   title: "Treatments",
  //   href: "/dashboard/treatments",
  //   icon: Stethoscope,
  // },
  // {
  //   title: "Medical Records",
  //   href: "/dashboard/records",
  //   icon: FileText,
  // },
  // {
  //   title: "Staff",
  //   href: "/dashboard/staff",
  //   icon: UserCheck,
  // },
  // {
  //   title: "Schedule",
  //   href: "/dashboard/schedule",
  //   icon: Clock,
  // },
  // {
  //   title: "Analytics",
  //   href: "/dashboard/analytics",
  //   icon: BarChart3,
  // },
  // {
  //   title: "Billing",
  //   href: "/dashboard/billing",
  //   icon: CreditCard,
  // },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/settings/profile",
    icon: Settings,
  },
];
