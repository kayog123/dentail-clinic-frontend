"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  updateFormData,
  resetBooking,
  prevStep,
  TypePreferrenceProps,
} from "../../../store/bookingSlice";
import AppointmentCardSlot from "../appointment-card";
import { useAppointmentDentist } from "../../_hooks/use-appointment-dentist";
import moment from "moment";
import { formatDate } from "../../_helper/helperFn";
import NoAppointment from "../no-appointment";
import { getError } from "@/app/lib/error";
import { toast } from "sonner";
import {
  CreateAppointmentParams,
  useCreateAppointment,
} from "../../_hooks/use-create-appointment";
import { AppointmentStatusType } from "@/app/lib/type-global";
import { getCurrentUser } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { awsConfig } from "@/app/lib/aws-config";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

Amplify.configure(awsConfig);

export default function Step4Appointments() {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const { formData } = useSelector((state: RootState) => state.booking);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );

  const {
    appointment: availableAppointment,
    isLoading: isLoadingAppointment,
    error: isErrorAppointment,
  } = useAppointmentDentist({
    dentistId: formData.provider,
    startOfDay: moment(formData.datePreference).toDate(),
    endOfDay: moment(formData.datePreference).add(1, "day").toDate(),
    timePreference: formData.timePreference as TypePreferrenceProps,
  });

  const createAppointment = useCreateAppointment();

  useEffect(() => {
    async function checkUserSignedIn() {
      try {
        const { signInDetails } = await getCurrentUser();
        setIsSignIn(!!signInDetails); // User is signed in
      } catch (error: unknown) {
        setIsSignIn(false);
      }
    }
    checkUserSignedIn();
  }, []);

  const handleAppointmentSelect = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
  };

  const handleSubmitBooking = async () => {
    if (!selectedAppointment) {
      setErrorMsg("Please select an appointment slot");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const { userId } = await getCurrentUser();
      // Update form data with selected appointment
      dispatch(
        updateFormData({
          selectedAppointment: {
            time: selectedAppointment,
          },
        })
      );
      const { appointmentType, selectedAppointment: appTime } = formData;

      if (!appointmentType || !(appTime?.time ?? selectedAppointment)) {
        toast.info(
          "No user_id nor selected appointment type or time preference!"
        );
        return;
      }

      const newAppointmentParams: CreateAppointmentParams = {
        userId,
        dentistId: formData.provider,
        patientGivenName: formData.firstName,
        patientLastName: formData.lastName,
        dateOfBirth: moment(formData.dob).toISOString(),
        note: formData.notes,
        appType: appointmentType,
        prefferedAppointmentDate: moment(formData.datePreference).toISOString(),
        appointmentTime: appTime?.time ?? selectedAppointment,
        status: AppointmentStatusType.PENDING,
        hasInsurance: formData.hasInsurance,
        insuranceName: formData.insuranceName,
        insuranceGroupNumber: formData.groupNumber,
        subscriberId: formData.subscriberId,
        subscriberName: formData.subscriberName,
      };
      console.log(newAppointmentParams);
      await createAppointment.mutateAsync(newAppointmentParams);

      // Show success message and reset form
      dispatch(resetBooking());
    } catch (error: unknown) {
      const errMsg = getError(error).message;
      setErrorMsg(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const startOverHandler = () => {
    if (confirm("Are you sure you want to start over?")) {
      dispatch(resetBooking());
    }
  };

  const NotSignInAlert = () => (
    <Alert variant="default">
      <AlertCircle className="text-amber-500" />
      <AlertTitle>Please sign in to continue booking.</AlertTitle>
      <AlertDescription>
        <p>
          Click here to{" "}
          <Link
            href="/signin?redirect=booking"
            className="hover:text-sky-600 text-sky-500 underline"
          >
            sign in
          </Link>
        </p>
        <ul className="list-inside list-disc text-sm">
          <li>
            Be part of our patient portal and enjoy seamless booking process
          </li>
          <li>Manage your appointment</li>
          <li>Get daily updates of our latest health tips</li>
        </ul>
      </AlertDescription>
    </Alert>
  );

  if (isLoadingAppointment) {
    return (
      <div className="space-y-6 ">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Loading available appointments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Available Appointments</h3>
        <p className="text-sm text-gray-600 mb-6">
          Based on your preferences, here are the available appointments. Please
          select one that works best for you.
        </p>

        {(isErrorAppointment || errorMsg) && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {isErrorAppointment?.message ?? errorMsg}
          </div>
        )}

        {/* Available Appointments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {availableAppointment?.map((slot, index) => (
            <AppointmentCardSlot
              key={index}
              slot={{
                date: formData.datePreference,
                time: slot,
                available: true,
              }}
              selectedAppointment={selectedAppointment as string}
              formatDate={formatDate}
              handleAppointmentSelect={handleAppointmentSelect}
            />
          ))}
        </div>
        {availableAppointment?.length === 0 && <NoAppointment />}
        {!isSignIn && <NotSignInAlert />}

        {/* Navigation and Submit */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(prevStep())}
            className="px-6 py-2"
          >
            Back to Preferences
          </Button>

          <div className="flex gap-3">
            {isSignIn && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={startOverHandler}
                  className="px-6 py-2"
                >
                  Start Over
                </Button>

                <Button
                  type="button"
                  onClick={handleSubmitBooking}
                  disabled={!selectedAppointment || isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Booking...
                    </div>
                  ) : (
                    "Book Appointment"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
