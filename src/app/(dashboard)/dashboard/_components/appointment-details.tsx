"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

import { Stethoscope, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  UpdateAppointmentResponse,
  useAppointmentQuery,
  useQueryClient,
  useUpdateAppointment,
} from "../../_hooks";
import moment from "moment";
import { toast } from "sonner";
import RescheduleDialog from "./reschedule-dialog";

export default function AppointmentDetails({ id }: { id: number | undefined }) {
  const queryClient = useQueryClient();
  const {
    data: appointment,
    isLoading,
    error,
  } = useAppointmentQuery({
    appointmentId: id,
  });
  const updateSuccesshHandler = async (
    updatedAppointment: UpdateAppointmentResponse
  ) => {
    // Also invalidate to ensure consistency
    toast.success("Sucessfully cancelled the appointment.");
    queryClient.invalidateQueries({
      queryKey: ["appointments/get/id", updatedAppointment.id],
    });
  };
  const updateAppointment = useUpdateAppointment(updateSuccesshHandler);
  // const getPriorityBadge = (priority: string) => {
  //   switch (priority) {
  //     case "high":
  //       return <Badge variant="destructive">High</Badge>;
  //     case "medium":
  //       return <Badge variant="secondary">Medium</Badge>;
  //     case "low":
  //       return <Badge variant="outline">Low</Badge>;
  //     default:
  //       return <Badge variant="outline">{priority}</Badge>;
  //   }
  // };

  const handleAppointmentCancel = async (id: number) => {
    if (confirm("Are you sure you wanted to cancel this appointment?")) {
      await updateAppointment.mutateAsync({
        id,
        status: "CANCELLED",
      });
    }
  };
  const CardMessageInfo = ({ text }: { text?: string }) => {
    return (
      <div className="min-h-120 flex items-center justify-center mx-auto">
        <p className="text-muted-foreground text-sm lg:w-100">{text}</p>
      </div>
    );
  };
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <div className="flex space-x-2">
          <div>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>
              Click appointment on the calendar and it will show the details
              here
            </CardDescription>
          </div>
          <div className="flex space-x-2 ">
            {id &&
              appointment &&
              (appointment.status == "PENDING" ||
                appointment.status == "RESCHEDULED" ||
                appointment.status == "APPROVED") && (
                <>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleAppointmentCancel(id)}
                  >
                    Cancel
                  </Button>
                  <RescheduleDialog
                    id={appointment.id}
                    dentistId={appointment.dentist.userId}
                  />
                </>
              )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 flex  justify-center text-center lg:min-h-120">
        {!isLoading && error && <CardMessageInfo text={error.message} />}
        {isLoading && <CardMessageInfo text="Loading..." />}
        {!id && (
          <CardMessageInfo
            text=" No appointment select. Click an appointment item on the upcoming
              appointment card"
          />
        )}
        {id && (
          <div className="flex flex-col space-y-4 justify-start w-full text-start">
            {/* Quick Action Buttons */}
            <div>
              <p>
                <strong>Patient Name: </strong>{" "}
                {`${appointment?.patientGivenName.toUpperCase()} ${appointment?.patientLastName.toUpperCase()}`}
              </p>
              <p>
                <strong>Date Of Birth: </strong>{" "}
                {`${moment(appointment?.dateOfBirth).format("MMMM Do, YYYY")} `}
              </p>
              <p>
                <strong>Schedule Date: </strong>{" "}
                {`${moment(appointment?.prefferedAppointmentDate).format(
                  "MMMM Do, YYYY"
                )} - ${appointment?.appointmentTime}`}
              </p>
              <p className="text-sky-600">
                <strong className="text-black">Status: </strong>{" "}
                {appointment?.status}
              </p>
            </div>
            <div className=" ">
              <p className="font-bold">Notes: </p>
              <p>{appointment?.note}</p>
            </div>
            <div className="space-y-2">
              {appointment?.dentist && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-6 w-6 mb-2 text-black" />
                    <div>
                      <div className="text-sm font-bold">Assigned Dentist</div>

                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-gray-900">
                          Insurance Name: &nbsp;
                        </span>{" "}
                        {appointment?.dentist.firstName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-gray-900">
                          Group Number: &nbsp;
                        </span>{" "}
                        {appointment?.dentist.lastName}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {appointment?.dental && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Stethoscope className="h-6 w-6 mb-2 text-black" />
                    <div>
                      <div className="text-sm font-bold">Dental Insurance</div>

                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-gray-900">
                          Insurance Name: &nbsp;
                        </span>{" "}
                        {appointment?.dental.insuranceName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-gray-900">
                          Group Number: &nbsp;
                        </span>{" "}
                        {appointment?.dental.insuranceGroupNumber}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-gray-900">
                          Subscriber ID: &nbsp;
                        </span>
                        {appointment?.dental.subscriberId}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Subscriber Name: {appointment?.dental.subscriberName}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Upcoming Tasks */}
            {/* <div className="space-y-3">
              <h4 className="text-sm font-medium">Upcoming Tasks</h4>
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{task.title}</div>
                      <div className="text-xs text-muted-foreground">
                        Due: {task.dueDate}
                      </div>
                    </div>
                  </div>
                  {getPriorityBadge(task.priority)}
                </div>
              ))}
            </div> */}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
