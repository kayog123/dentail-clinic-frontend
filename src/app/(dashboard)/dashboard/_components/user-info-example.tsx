"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { useUserProfile, useUpdateUser } from "../../_hooks/use-user";
import { useState } from "react";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export default function UserInfoExample() {
  const { user, fullName, initials, isLoading, isError, hasProfile } =
    useUserProfile();
  const updateUser = useUpdateUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    given_name: user?.given_name || "",
    family_name: user?.family_name || "",
    phone_number: user?.phone_number || "",
    address: user?.address || "",
  });

  const handleUpdate = async () => {
    await updateUser.mutateAsync(editData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-600 border-t-transparent" />
            <span className="ml-2">Loading user profile...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Error loading user profile</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>User Profile</span>
          <div className="flex items-center gap-2">
            {hasProfile && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Profile Complete
              </Badge>
            )}
            <Button
              size="sm"
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
              disabled={updateUser.isPending}
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="given_name">First Name</Label>
                <Input
                  id="given_name"
                  value={editData.given_name}
                  onChange={(e) =>
                    setEditData({ ...editData, given_name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="family_name">Last Name</Label>
                <Input
                  id="family_name"
                  value={editData.family_name}
                  onChange={(e) =>
                    setEditData({ ...editData, family_name: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={editData.phone_number}
                onChange={(e) =>
                  setEditData({ ...editData, phone_number: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={editData.address}
                onChange={(e) =>
                  setEditData({ ...editData, address: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                disabled={updateUser.isPending}
                className="bg-sky-600 hover:bg-sky-700"
              >
                {updateUser.isPending ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Avatar and Basic Info */}
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-sky-600 flex items-center justify-center">
                {initials ? (
                  <span className="text-xl font-bold text-white">
                    {initials}
                  </span>
                ) : (
                  <User className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{fullName || "User"}</h3>
                <p className="text-sm text-muted-foreground">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.phone_number && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone_number}</span>
                </div>
              )}
              {user?.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.address}</span>
                </div>
              )}
              {user?.birthdate && (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.birthdate}</span>
                </div>
              )}
              {user?.email_verified && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Email Verified
                  </Badge>
                </div>
              )}
            </div>

            {/* Profile Completion Status */}
            {!hasProfile && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-800">
                  Complete your profile by adding your name and contact
                  information.
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
