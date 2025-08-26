import { Calendar, Settings, Bell, Home } from "lucide-react";

export const MENU_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Appointments",
    href: "/appointments",
    icon: Calendar,
  },
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
