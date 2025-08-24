import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address?: string;
  medicalHistory?: string;
  insuranceInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address?: string;
  medicalHistory?: string;
  insuranceInfo?: string;
}

export interface UpdatePatientData {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  medicalHistory?: string;
  insuranceInfo?: string;
}

// API functions (replace with your actual API calls)
const fetchPatients = async (): Promise<Patient[]> => {
  // TODO: Replace with actual API call
  const response = await fetch("/api/patients");
  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response.json();
};

const fetchPatientById = async (id: string): Promise<Patient> => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/patients/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch patient");
  }
  return response.json();
};

const createPatient = async (data: CreatePatientData): Promise<Patient> => {
  // TODO: Replace with actual API call
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create patient");
  }
  return response.json();
};

const updatePatient = async (data: UpdatePatientData): Promise<Patient> => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/patients/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update patient");
  }
  return response.json();
};

const deletePatient = async (id: string): Promise<void> => {
  // TODO: Replace with actual API call
  const response = await fetch(`/api/patients/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete patient");
  }
};

// React Query hooks
export const usePatients = () => {
  return useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ["patients", id],
    queryFn: () => fetchPatientById(id),
    enabled: !!id, // Only run query if id exists
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPatient,
    onSuccess: (newPatient) => {
      // Add new patient to cache
      queryClient.setQueryData(
        ["patients"],
        (oldData: Patient[] | undefined) => {
          if (!oldData) return [newPatient];
          return [...oldData, newPatient];
        }
      );

      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      console.error("Failed to create patient:", error);
      // TODO: Show error toast
    },
  });
};

export const useUpdatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePatient,
    onSuccess: (updatedPatient) => {
      // Update patient in cache
      queryClient.setQueryData(
        ["patients"],
        (oldData: Patient[] | undefined) => {
          if (!oldData) return [updatedPatient];
          return oldData.map((patient) =>
            patient.id === updatedPatient.id ? updatedPatient : patient
          );
        }
      );

      // Update individual patient cache
      queryClient.setQueryData(["patients", updatedPatient.id], updatedPatient);

      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      console.error("Failed to update patient:", error);
      // TODO: Show error toast
    },
  });
};

export const useDeletePatient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePatient,
    onSuccess: (_, deletedId) => {
      // Remove patient from cache
      queryClient.setQueryData(
        ["patients"],
        (oldData: Patient[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((patient) => patient.id !== deletedId);
        }
      );

      // Remove individual patient cache
      queryClient.removeQueries({ queryKey: ["patients", deletedId] });

      // Also invalidate to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
    onError: (error) => {
      console.error("Failed to delete patient:", error);
      // TODO: Show error toast
    },
  });
};
