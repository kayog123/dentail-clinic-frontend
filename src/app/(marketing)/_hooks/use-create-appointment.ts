import { AppointmentStatusType } from "@/app/lib/type-global";
import { AppointmentTypeProps } from "../_utils/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getError } from "@/app/lib/error";

export interface AppointmentParams {
  userId: string;
  dentistId: string;
  patientGivenName: string;
  patientLastName: string;
  dateOfBirth: string;
  note?: string;
  dentalInsuranceId?: number;
  appType: AppointmentTypeProps;
  prefferedAppointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatusType;
}

export type AppointmentTypeResponse = CreateAppointmentParams & {
  id: number;
  createdAt: string;
  updatedAt: string;
};

interface CreateInsuranceParams {
  hasInsurance: boolean;
  insuranceName: string;
  insuranceGroupNumber: string;
  subscriberId: string;
  subscriberName: string;
}

export type CreateAppointmentParams = AppointmentParams & CreateInsuranceParams;

const createAppointmentFn = async (
  data: CreateAppointmentParams
): Promise<AppointmentTypeResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to create appointment.`);
  }
  return response.json();
};

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointmentFn,
    onSuccess: (_, newAppointment) => {
      // Remove from cache immediately
      //   queryClient.setQueryData(
      //     ["appointments"],
      //     (oldData: Appointment[] | undefined) => {
      //       if (!oldData) return [];
      //       return oldData.filter((appointment) => appointment.id !== deletedId);
      //     }
      //   );

      // Also invalidate to ensure consistency
      toast.success(
        "Appointment created successfully! See your upcoming appointment on the dashboard"
      );
      queryClient.invalidateQueries({
        queryKey: ["appointments/list"],
      });
    },
    onError: (error: unknown) => {
      console.error("Failed to delete appointment:", getError(error).message);
      // TODO: Show error toast
    },
  });
}
