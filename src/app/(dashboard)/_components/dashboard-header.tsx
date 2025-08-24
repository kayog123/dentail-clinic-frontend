"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import signOutUser from "@/app/lib/aws-helper-fn";
import { redirect } from "next/navigation";

export function DashboardHeader() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const logoutUserHandler = async () => {
    setShowUserMenu(false);
    await signOutUser();
    redirect("signin");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients, appointments, records..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
          >
            3
          </Badge>
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Settings className="h-4 w-4" />
        </Button>

        {/* User Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center space-x-2 h-9 px-3"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium">Dr. Sarah Johnson</div>
              <div className="text-xs text-muted-foreground">Dentist</div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-card shadow-lg z-50">
              <div className="p-4 border-b">
                <div className="text-sm font-medium">Dr. Sarah Johnson</div>
                <div className="text-xs text-muted-foreground">
                  sarah.johnson@dentalcare.com
                </div>
              </div>
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={logoutUserHandler}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
