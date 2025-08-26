"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Camera, User, Mail, Phone, Calendar, Save, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { profileSchema, ProfileFormData } from "../_helper/profile-validation";
import Image from "next/image";
import { useUserProfile, useUpdateUser } from "../../../_hooks/use-user";
import PhoneInput, { getFullPhoneNumber } from "./phone-input";
import { toast } from "sonner";

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("PH"); // Default to Philippines
  const [originalPhoneNumber, setOriginalPhoneNumber] = useState(""); // Track original phone number
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  const { user, initials, isLoading: userLoading } = useUserProfile();
  const updateUser = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
    formState,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      email: "",
    },
    mode: "onChange",
  });

  // Populate form fields with user data when it loads
  useEffect(() => {
    if (user) {
      // Detect country from phone number for phone input
      let detectedCountry = "PH";
      if (user.phone_number) {
        detectedCountry = user.phone_number.startsWith("+63")
          ? "PH"
          : user.phone_number.startsWith("+1")
          ? "US"
          : "PH";
      }
      setSelectedCountry(detectedCountry);
      setOriginalPhoneNumber(user.phone_number || "");

      // Reset form with user data and ensure it's not marked as dirty
      reset(
        {
          firstName: user.given_name || "",
          lastName: user.family_name || "",
          dateOfBirth: user.birthdate || "",
          phone: user.phone_number || "",
          email: user.email || "",
        },
        { keepDirty: false, keepErrors: false }
      );

      // Set profile image if available
      if (user.picture) {
        setProfileImage(user.picture);
      }

      // Mark form as initialized
      setIsFormInitialized(true);
    }
  }, [user, reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
  };

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data);
    setIsLoading(true);
    try {
      // Get the full phone number with country code
      const phoneWithCountryCode = getFullPhoneNumber(
        data.phone,
        selectedCountry
      );

      // Update user attributes using Amplify
      await updateUser.mutateAsync({
        given_name: data.firstName,
        family_name: data.lastName,
        birthdate: data.dateOfBirth,
        phone_number: phoneWithCountryCode,
        // Note: email updates might require additional verification in Amplify
      });

      // Update the original phone number to the new value
      setOriginalPhoneNumber(phoneWithCountryCode);

      // Reset form dirty state with the updated data
      reset(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          phone: phoneWithCountryCode, // Use the full phone number with country code
          email: data.email,
        },
        { keepDirty: false, keepErrors: false }
      );

      // Show success message
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="max-w-4xl space-y-6">
        <Card>
          <CardContent className="p-12">
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-600 border-t-transparent" />
              <span className="ml-2">Loading your profile...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-xl space-y-6">
      {/* Profile Picture Section */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-xl">Profile Picture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-200">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : initials ? (
                  <span className="text-4xl font-bold text-sky-600">
                    {initials}
                  </span>
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
 
              <label
                htmlFor="profile-picture"
                className="absolute bottom-0 right-0 bg-sky-600 text-white p-2 rounded-full cursor-pointer hover:bg-sky-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <Camera className="w-4 h-4" />
              </label>
 
              {profileImage && (
                <button
                  type="button"
                  onClick={removeProfileImage}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full cursor-pointer hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-gray-600 text-center max-w-xs">
              Click the camera icon to upload a new profile picture. Supported
              formats: JPG, PNG, GIF
            </p>
          </div>
        </CardContent>
      </Card> */}

      {/* Personal Information Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
          {user && (
            <p className="text-sm text-muted-foreground">
              Update your profile information below.
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User className="w-4 h-4 text-sky-600" />
                  First Name
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Enter your first name"
                  className={
                    errors.firstName
                      ? "border-red-300 focus:border-red-500"
                      : ""
                  }
                />
                {errors.firstName && (
                  <p className="text-xs text-red-600">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <User className="w-4 h-4 text-sky-600" />
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Enter your last name"
                  className={
                    errors.lastName ? "border-red-300 focus:border-red-500" : ""
                  }
                />
                {errors.lastName && (
                  <p className="text-xs text-red-600">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label
                  htmlFor="dateOfBirth"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Calendar className="w-4 h-4 text-sky-600" />
                  Date of Birth
                </Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className={
                    errors.dateOfBirth
                      ? "border-red-300 focus:border-red-500"
                      : ""
                  }
                />
                {errors.dateOfBirth && (
                  <p className="text-xs text-red-600">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  Phone Number
                </Label>
                <PhoneInput
                  value={watch("phone") || ""}
                  onChange={(value) => {
                    // Check if this is a real user change (not auto-formatting)
                    const currentFullNumber = getFullPhoneNumber(
                      value,
                      selectedCountry
                    );
                    const hasRealChange =
                      currentFullNumber !== originalPhoneNumber;

                    setValue("phone", value, {
                      shouldDirty: hasRealChange,
                      shouldValidate: true,
                    });
                  }}
                  onCountryChange={(newCountry) => {
                    setSelectedCountry(newCountry);
                    // Mark form as dirty when country changes
                    const currentValue = watch("phone") || "";
                    const currentFullNumber = getFullPhoneNumber(
                      currentValue,
                      newCountry
                    );
                    const hasRealChange =
                      currentFullNumber !== originalPhoneNumber;

                    setValue("phone", currentValue, {
                      shouldDirty: hasRealChange,
                      shouldValidate: true,
                    });
                  }}
                  defaultCountry={selectedCountry}
                  placeholder="Enter phone number"
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-xs text-red-600">{errors.phone.message}</p>
                )}
              </div>

              {/* Email - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Mail className="w-4 h-4 text-sky-600" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                  className={
                    errors.email ? "border-red-300 focus:border-red-500" : ""
                  }
                  disabled={true} // Email is typically not editable in Amplify
                />
                <p className="text-xs text-muted-foreground">
                  Email address cannot be changed. Contact support if you need
                  to update your email.
                </p>
                {errors.email && (
                  <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  !isFormInitialized ||
                  !formState.isDirty ||
                  updateUser.isPending
                }
                className="bg-sky-600 hover:bg-sky-700 text-white flex-1 sm:flex-none"
              >
                {isLoading || updateUser.isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating Profile...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </div>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={!formState.isDirty}
                className="flex-1 sm:flex-none"
              >
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
