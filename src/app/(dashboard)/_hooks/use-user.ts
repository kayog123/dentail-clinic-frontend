import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserAttributes, updateUserAttributes } from "aws-amplify/auth";

// Types
export interface UserAttributes {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  phone_number?: string;
  phone_number_verified?: boolean;
  address?: string;
  birthdate?: string;
  gender?: string;
  picture?: string;
  locale?: string;
  updated_at?: number;
  [key: string]: string | boolean | number | undefined; // For any additional custom attributes
}

export interface UpdateUserAttributesData {
  name?: string;
  given_name?: string;
  family_name?: string;
  phone_number?: string;
  address?: string;
  birthdate?: string;
  gender?: string;
  picture?: string;
  locale?: string;
}

// API functions
const fetchUser = async (): Promise<UserAttributes> => {
  try {
    const attributes = await fetchUserAttributes();

    // Convert Amplify attributes to our UserAttributes interface
    return {
      sub: attributes.sub || "",
      email: attributes.email || "",
      email_verified: attributes.email_verified === "true",
      name: attributes.name,
      given_name: attributes.given_name,
      family_name: attributes.family_name,
      phone_number: attributes.phone_number,
      phone_number_verified: attributes.phone_number_verified === "true",
      address: attributes.address,
      birthdate: attributes.birthdate,
      gender: attributes.gender,
      picture: attributes.picture,
      locale: attributes.locale,
      updated_at: attributes.updated_at
        ? Number(attributes.updated_at)
        : undefined,
      ...attributes, // Include any additional custom attributes
    } as UserAttributes;
  } catch (error) {
    throw new Error(
      `Failed to fetch user attributes: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

const updateUser = async (
  data: UpdateUserAttributesData
): Promise<UserAttributes> => {
  try {
    // Convert the data to the format expected by Amplify
    const attributesToUpdate: Record<string, string> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        attributesToUpdate[key] = value;
      }
    });

    await updateUserAttributes({ userAttributes: attributesToUpdate });

    // Fetch updated attributes
    return await fetchUser();
  } catch (error) {
    throw new Error(
      `Failed to update user attributes: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

// React Query hooks
export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on authentication errors
      if (error instanceof Error && error.message.includes("authentication")) {
        return false;
      }
      return failureCount < 2;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      // Update user cache immediately
      queryClient.setQueryData(["user"], updatedUser);

      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      console.error("Failed to update user:", error);
      // TODO: Show error toast
    },
  });
};

// Utility hook for user data
export const useUserProfile = () => {
  const { data: user, isLoading, isError, error } = useUser();

  const fullName = user
    ? `${user.given_name || ""} ${user.family_name || ""}`.trim() || user.name
    : "";
  const initials = fullName
    ? fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return {
    user,
    isLoading,
    isError,
    error,
    fullName,
    initials,
    hasProfile: !!(user?.given_name || user?.family_name || user?.name),
  };
};
