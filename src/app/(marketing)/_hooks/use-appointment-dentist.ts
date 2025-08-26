import { useQuery } from "@tanstack/react-query";
import {
  AFTERNOON_SCHEDULE_SLOT,
  ANY_TIME_PREFERRENCE,
  MORNING_SCHEDULE_SLOT,
} from "@/app/lib/const";

import { AFTERNOON_PREFERRENCE, MORNING_PREFERRENCE } from "../_utils/const";

export interface DentistDayAppointmentItem {
  appointmentTime: string;
}

type DentistAppointmentResponse = DentistDayAppointmentItem[];

const fetchDentistList = async (
  userId: string,
  startOfDay: Date,
  endOfDay: Date
): Promise<DentistAppointmentResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/appointments/day/details`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        startOfDay: startOfDay.toISOString(),
        endOfDay: endOfDay.toISOString(),
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch dentists.");
  }
  return response.json();
};

export const useAppointmentDentist = ({
  dentistId,
  startOfDay,
  endOfDay,
  timePreference,
}: {
  dentistId: string;
  startOfDay: Date;
  endOfDay: Date;
  timePreference: "MORNING" | "AFTERNOON" | "ANYTIME";
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dentists", dentistId, startOfDay, endOfDay],
    queryFn: () => fetchDentistList(dentistId, startOfDay, endOfDay),
    staleTime: 5 * 60 * 1000, //5 mins
  });
  const occupiedSlot = data?.map(
    (item: DentistDayAppointmentItem) => item.appointmentTime
  );

  /**
    GET THE SLOT BASED ON USER SELECTION TIME PREFERRENCE
   */
  const TIME_PREFERRENCE_SLOT =
    timePreference == MORNING_PREFERRENCE
      ? MORNING_SCHEDULE_SLOT
      : timePreference == AFTERNOON_PREFERRENCE
      ? AFTERNOON_SCHEDULE_SLOT
      : ANY_TIME_PREFERRENCE;

  return {
    appointment: TIME_PREFERRENCE_SLOT.filter(
      (slot: string) => !occupiedSlot?.includes(slot)
    ), //the slot that was not occupied that day
    isLoading,
    error,
  };
};
