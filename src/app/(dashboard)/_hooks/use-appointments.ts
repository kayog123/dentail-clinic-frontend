import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

export interface UpdateAppointmentData {
  id: string;
  patientName?: string;
  date?: string;
  time?: string;
  service?: string;
  status?: Appointment["status"];
  notes?: string;
}

// API functions (replace with your actual API calls)
const fetchAppointments = async (): Promise<Appointment[]> => {
  // TODO: Replace with actual API call
  const response = await fetch("/api/appointments");
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

const updateAppointment = async (
  data: UpdateAppointmentData
): Promise<Appointment> => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/appointments/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update appointment");
  }
  return response.json();
};

const deleteAppointment = async (id: string): Promise<void> => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/appointments/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete appointment");
  }
};

// React Query hooks
export const useAppointments = () => {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: fetchAppointments,
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

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAppointment,
    onSuccess: (updatedAppointment) => {
      // Update the cache directly for better UX
      queryClient.setQueryData(
        ["appointments"],
        (oldData: Appointment[] | undefined) => {
          if (!oldData) return [updatedAppointment];
          return oldData.map((appointment) =>
            appointment.id === updatedAppointment.id
              ? updatedAppointment
              : appointment
          );
        }
      );

      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Failed to update appointment:", error);
      // TODO: Show error toast
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
    onSuccess: (_, deletedId) => {
      // Remove from cache immediately
      queryClient.setQueryData(
        ["appointments"],
        (oldData: Appointment[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((appointment) => appointment.id !== deletedId);
        }
      );

      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      console.error("Failed to delete appointment:", error);
      // TODO: Show error toast
    },
  });
};
