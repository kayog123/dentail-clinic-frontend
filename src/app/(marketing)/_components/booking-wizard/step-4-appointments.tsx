"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  updateFormData,
  setSubmitting,
  setError,
  resetBooking,
} from "../../../store/bookingSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

interface AppointmentSlot {
  id: string;
  date: string;
  time: string;
  provider: string;
  available: boolean;
}

export default function Step4Appointments() {
  const dispatch = useDispatch();
  const { formData, isSubmitting, error } = useSelector(
    (state: RootState) => state.booking
  );
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(
    null
  );
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching available appointments based on preferences
  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate mock available appointments based on preferences
      const mockSlots: AppointmentSlot[] = [
        {
          id: "1",
          date: "2024-01-15",
          time: "09:00 AM",
          provider: "ALNUAIMI, NOOR DMD",
          available: true,
        },
        {
          id: "2",
          date: "2024-01-15",
          time: "10:30 AM",
          provider: "Patel, Hema DDS",
          available: true,
        },
        {
          id: "3",
          date: "2024-01-16",
          time: "02:00 PM",
          provider: "RAMGIR, BEHNOOSH",
          available: true,
        },
        {
          id: "4",
          date: "2024-01-17",
          time: "11:00 AM",
          provider: "Sengson, John DDS",
          available: true,
        },
        {
          id: "5",
          date: "2024-01-18",
          time: "03:30 PM",
          provider: "ALNUAIMI, NOOR DMD",
          available: true,
        },
      ];

      setAvailableSlots(mockSlots);
      setIsLoading(false);
    };

    fetchAppointments();
  }, []);

  const handleAppointmentSelect = (appointmentId: string) => {
    setSelectedAppointment(appointmentId);
  };

  const handleSubmitBooking = async () => {
    if (!selectedAppointment) {
      dispatch(setError("Please select an appointment slot"));
      return;
    }

    const selectedSlot = availableSlots.find(
      (slot) => slot.id === selectedAppointment
    );
    if (!selectedSlot) {
      dispatch(setError("Selected appointment slot not found"));
      return;
    }

    dispatch(setSubmitting(true));
    dispatch(setError(null));

    try {
      // Simulate API call for booking
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update form data with selected appointment
      dispatch(
        updateFormData({
          selectedAppointment: {
            id: selectedSlot.id,
            date: selectedSlot.date,
            time: selectedSlot.time,
            provider: selectedSlot.provider,
          },
        })
      );

      // Here you would typically make an API call to book the appointment
      console.log("Booking appointment with data:", {
        ...formData,
        selectedAppointment: {
          id: selectedSlot.id,
          date: selectedSlot.date,
          time: selectedSlot.time,
          provider: selectedSlot.provider,
        },
      });

      // Show success message and reset form
      alert("Appointment booked successfully!");
      dispatch(resetBooking());
    } catch (error) {
      dispatch(setError("Failed to book appointment. Please try again."));
    } finally {
      dispatch(setSubmitting(false));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Available Appointments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {availableSlots.map((slot) => (
            <Card
              key={slot.id}
              className={`cursor-pointer transition-all ${
                selectedAppointment === slot.id
                  ? "ring-2 ring-blue-500 border-blue-500"
                  : "hover:border-gray-300"
              }`}
              onClick={() => handleAppointmentSelect(slot.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {formatDate(slot.date)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-blue-600">
                    {slot.time}
                  </p>
                  <p className="text-sm text-gray-600">Dr. {slot.provider}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {availableSlots.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              No available appointments match your preferences.
            </p>
            <p className="text-sm text-gray-500">
              Please try adjusting your date, time, or provider preferences.
            </p>
          </div>
        )}

        {/* Navigation and Submit */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
            className="px-6 py-2"
          >
            Back to Preferences
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(resetBooking())}
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
          </div>
        </div>

        {/* Summary */}
        {selectedAppointment && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">
              Selected Appointment:
            </h4>
            {(() => {
              const slot = availableSlots.find(
                (s) => s.id === selectedAppointment
              );
              return slot ? (
                <div className="text-sm text-blue-800">
                  <p>
                    <strong>Date:</strong> {formatDate(slot.date)}
                  </p>
                  <p>
                    <strong>Time:</strong> {slot.time}
                  </p>
                  <p>
                    <strong>Provider:</strong> Dr. {slot.provider}
                  </p>
                </div>
              ) : null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
}
