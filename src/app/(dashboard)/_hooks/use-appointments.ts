import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "aws-amplify/auth";
import { toast } from "sonner";

// Types
export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  service: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

export interface CreateAppointmentData {
  patientName: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
}

interface UserAppointmentItemDentist {
  userId: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}
export interface UserAppointmentItem {
  id: number;
  note: string;
  appType: true;
  prefferedAppointmentDate: string;
  appointmentTime: string;
  status: true;
  dentist: UserAppointmentItemDentist;
}

// API functions (replace with your actual API calls)
const fetchAppointments = async (
  userId: string,
  startOfDay: string,
  endOfDay: string
): Promise<UserAppointmentItem[]> => {
  // TODO: Replace with actual API call

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/list/date`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        startOfDay,
        endOfDay,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  return response.json();
};
interface AppointmentDentalItem {
  insuranceName: string;
  insuranceGroupNumber: string;
  subscriberId: string;
  subscriberName: string;
}
interface AppointmentIdItem {
  id: number;
  userId: string;
  dentistId: string;
  patientGivenName: string;
  patientLastName: string;
  dateOfBirth: string;
  note: string;
  dentalInsuranceId?: number;
  appType: string;
  prefferedAppointmentDate: string;
  appointmentTime: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  dentist: UserAppointmentItemDentist;
  dental: AppointmentDentalItem;
}
const fetchAppointmentById = async (
  appointmentId: number
): Promise<AppointmentIdItem> => {
  // TODO: Replace with actual API call

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/${appointmentId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  return response.json();
};

const createAppointment = async (
  data: CreateAppointmentData
): Promise<Appointment> => {
  // TODO: Replace with actual API call
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create appointment");
  }
  return response.json();
};
export type UpdateAppointmentResponse = Omit<
  AppointmentIdItem,
  "dentist" | "dental"
>;

const updateAppointment = async (
  data: Partial<Omit<UpdateAppointmentResponse, "id">> & { id: number }
): Promise<UpdateAppointmentResponse> => {
  // TODO: Replace with actual API call
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/${data.id}/details`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update appointment");
  }
  return response.json();
};

// React Query hooks
export const useAppointments = ({
  startOfDay,
  endOfDay,
}: {
  startOfDay: string;
  endOfDay: string;
}) => {
  return useQuery({
    queryKey: ["appointments/list", startOfDay, endOfDay],
    queryFn: async () => {
      const { userId } = await getCurrentUser();
      return await fetchAppointments(userId, startOfDay, endOfDay);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAppointmentQuery = ({
  appointmentId,
}: {
  appointmentId: number | undefined;
}) => {
  return useQuery({
    queryKey: ["appointments/get/id", appointmentId],
    queryFn: async () => {
      return await fetchAppointmentById(appointmentId!);
    },
    enabled: !!appointmentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      // Invalidate and refetch appointments
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Failed to create appointment:", error);
      // TODO: Show error toast
    },
  });
};

export const useUpdateAppointment = (
  onSuccessCallback: (data: UpdateAppointmentResponse) => Promise<void>
) => {
  return useMutation({
    mutationFn: updateAppointment,
    onSuccess: onSuccessCallback,
    onError: (error) => {
      toast.success("Failed to cancel the appointment.");
      console.error("Failed to update appointment:", error);
      // TODO: Show error toast
    },
  });
};
