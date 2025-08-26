"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import CalendarInput from "./calendar-input";
import { useAppointmentDentist } from "@/app/(marketing)/_hooks/use-appointment-dentist";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { UpdateAppointmentResponse, useUpdateAppointment } from "../../_hooks";
import { formatDate } from "@/app/(marketing)/_helper/helperFn";

export default function RescheduleDialog({
  id,
  dentistId,
}: {
  id: number;
  dentistId: string;
}) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedAppTime, setSelectedAppTime] = useState<string>("");
  const {
    appointment: availableAppointment,
    isLoading: isLoadingAppointment,
    error: isErrorAppointment,
  } = useAppointmentDentist({
    dentistId: dentistId,
    startOfDay: selectedDate
      ? moment(selectedDate).startOf("day").toDate()
      : undefined,
    endOfDay: selectedDate
      ? moment(selectedDate).endOf("day").toDate()
      : undefined,
    timePreference: "ANYTIME",
  });

  const updateSuccesshHandler = async (
    updatedAppointment: UpdateAppointmentResponse
  ) => {
    // Also invalidate to ensure consistency
    toast.success("Sucessfully cancelled the appointment.");
    queryClient.invalidateQueries({
      queryKey: ["appointments/get/id", updatedAppointment.id],
    });
    queryClient.invalidateQueries({
      queryKey: ["appointments/list"],
    });
  };

  const updateAppointment = useUpdateAppointment(updateSuccesshHandler);

  const rescheduleHandler = async () => {
    setIsLoading(true);
    await updateAppointment.mutateAsync({
      id,
      status: "RESCHEDULED",
      prefferedAppointmentDate: moment(selectedDate).toISOString(),
      appointmentTime: selectedAppTime,
    });
    setIsLoading(false);
  };

  const ApointmentTimeCard = ({
    time,
    dateSelected,
    selectedAppTime,
    setSelectedAppTime,
  }: {
    time: string;
    dateSelected: string;
    selectedAppTime: string;
    setSelectedAppTime: (value: string) => void;
  }) => {
    return (
      <div
        className={`flex items-center justify-between p-3 border rounded-lg bg-white cursor-pointer h-20 ${
          selectedAppTime == time && "border-2 border-sky-600"
        }`}
        onClick={() => setSelectedAppTime(time)}
      >
        <div className="flex items-center space-x-3 ">
          <div className="">
            <div className="text-xs font-medium">
              {formatDate(dateSelected)}
            </div>

            <div className="text-md font-bold text-sky-600">{time}</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600">Available</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          Reschedule
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reschedule appointment</AlertDialogTitle>
          <AlertDialogDescription>
            Select the date you wanted to reschedule this appointment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-y-4  min-h-60">
          <CalendarInput date={selectedDate} setDate={setSelectedDate} />
          <div className="h-4">
            {isLoadingAppointment && (
              <div className="lg:min-h-20">
                <p className="text-center  ">Loading...</p>
              </div>
            )}
            {!isLoadingAppointment && isErrorAppointment && (
              <p className="text-center my-10">{isErrorAppointment.message}.</p>
            )}
          </div>
          {availableAppointment && selectedDate && (
            <div className="p-4 bg-slate-100 rounded-md grid grid-cols-2 gap-2 h-100">
              {availableAppointment?.map((time, index) => (
                <ApointmentTimeCard
                  key={`appointmentCard_${index}`}
                  time={time}
                  dateSelected={moment(selectedDate).format("YYYY-MM-DD")}
                  selectedAppTime={selectedAppTime}
                  setSelectedAppTime={setSelectedAppTime}
                />
              ))}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={rescheduleHandler}
            disabled={!(!!selectedDate && !!selectedAppTime) || isLoading}
          >
            Reschedule
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
