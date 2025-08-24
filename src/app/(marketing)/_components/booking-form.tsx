"use client";

import React from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BookingFormData,
  bookingSchema,
} from "../_helper/form-validation/booking-validation";

export default function BookingForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      patientType: "new",
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      phone: "",
      notes: "",
      hasInsurance: false,
      insuranceName: "",
      subscriberName: "",
      subscriberId: "",
      groupNumber: "",
      appointmentType: "",
      datePreference: "",
      provider: "",
      dayPreferences: [],
      timePreference: "",
    },
  });

  const onSubmitBookingHandler = (data: BookingFormData) => {
    console.log(data);
  };

  const patientType = watch("patientType");

  return (
    <div className="max-w-6xl mx-auto my-12 p-8 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

      <form onSubmit={handleSubmit(onSubmitBookingHandler)} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Patient Info & Insurance */}
          <div className="space-y-6">
            {/* Patient Info */}
            <div>
              <h3 className="font-semibold mb-2">This appointment is for</h3>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="patientType"
                    value="new"
                    checked={patientType === "new"}
                    onChange={(e) =>
                      setValue(
                        "patientType",
                        e.target.value as "new" | "existing"
                      )
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    New patient
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="patientType"
                    value="existing"
                    checked={patientType === "existing"}
                    onChange={(e) =>
                      setValue(
                        "patientType",
                        e.target.value as "new" | "existing"
                      )
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Existing patient
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <Input placeholder="First name" {...register("firstName")} />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <Input placeholder="Last name" {...register("lastName")} />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of birth
                  </label>
                  <Input type="date" {...register("dob")} />
                  {errors.dob && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.dob.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telephone
                  </label>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes to Office
                </label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Notes to Office"
                  rows={3}
                  {...register("notes")}
                />
                {errors.notes && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.notes.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="has-insurance"
                  className="accent-blue-600"
                  {...register("hasInsurance")}
                />
                <label htmlFor="has-insurance" className="text-sm">
                  I have dental insurance.
                </label>
              </div>
            </div>

            {/* Insurance Section */}
            <div>
              <h3 className="font-semibold mb-2">Dental Insurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name of insurance
                  </label>
                  <Input
                    placeholder="Insurance name"
                    {...register("insuranceName")}
                  />
                  {errors.insuranceName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.insuranceName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subscriber name
                  </label>
                  <Input
                    placeholder="Subscriber name"
                    {...register("subscriberName")}
                  />
                  {errors.subscriberName && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.subscriberName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subscriber ID
                  </label>
                  <Input
                    placeholder="Subscriber ID"
                    {...register("subscriberId")}
                  />
                  {errors.subscriberId && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.subscriberId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Group #
                  </label>
                  <Input placeholder="Group #" {...register("groupNumber")} />
                  {errors.groupNumber && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.groupNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Appointment Preferences */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">
                Please indicate your preferences below
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment type
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("appointmentType")}
                >
                  <option value="">Please select one...</option>
                  <option value="NEW PATIENT EXAM">NEW PATIENT EXAM</option>
                  <option value="New Patient Exam NP/SRP">
                    New Patient Exam NP/SRP
                  </option>
                </select>
                {errors.appointmentType && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.appointmentType.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date preference
                </label>
                <Input type="date" {...register("datePreference")} />
                {errors.datePreference && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.datePreference.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred provider
                </label>
                <select
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("provider")}
                >
                  <option value="">Any available provider</option>
                  <option value="ALNUAIMI, NOOR DMD">ALNUAIMI, NOOR DMD</option>
                  <option value="Patel, Hema DDS">Patel, Hema DDS</option>
                  <option value="RAMGIR, BEHNOOSH">RAMGIR, BEHNOOSH</option>
                  <option value="Sengson, John DDS">Sengson, John DDS</option>
                </select>
                {errors.provider && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.provider.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day preference (You can select more than one)
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "MON",
                    "TUE",
                    "WED",
                    "THU",
                    "FRI",
                    "SAT",
                    "SUN",
                    "ASAP",
                  ].map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={
                        watch("dayPreferences")?.includes(day)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => {
                        const current = watch("dayPreferences") || [];
                        if (current.includes(day)) {
                          setValue(
                            "dayPreferences",
                            current.filter((d) => d !== day)
                          );
                        } else {
                          setValue("dayPreferences", [...current, day]);
                        }
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
                {errors.dayPreferences && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.dayPreferences.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time preference
                </label>
                <div className="flex gap-2 mt-2">
                  {["Morning", "Afternoon", "Any Time"].map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={
                        watch("timePreference") === time ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setValue("timePreference", time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                {errors.timePreference && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.timePreference.message}
                  </p>
                )}
              </div>
            </div>

            {/* Available Appointments (Placeholder) */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Available Appointments</h3>
              <div className="bg-gray-50 p-4 rounded border text-center text-gray-500">
                The available appointments that best match your criteria are
                listed below. Please select one or please change your criteria
                and try again.
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full mt-6">
          Book Appointment
        </Button>
      </form>
    </div>
  );
}
