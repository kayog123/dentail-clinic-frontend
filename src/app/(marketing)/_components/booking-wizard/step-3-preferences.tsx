"use client";

import React from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  updateFormData,
  nextStep,
  prevStep,
} from "../../../store/bookingSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const preferencesSchema = yup.object({
  appointmentType: yup.string().required("Appointment type is required"),
  datePreference: yup.string().required("Date preference is required"),
  provider: yup.string(),
  dayPreferences: yup
    .array()
    .min(1, "Please select at least one day preference"),
  timePreference: yup.string().required("Time preference is required"),
});

type PreferencesFormData = {
  appointmentType: string;
  datePreference: string;
  provider: string;
  dayPreferences: string[];
  timePreference: string;
};

export default function Step3Preferences() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state: RootState) => state.booking);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<PreferencesFormData>({
    resolver: yupResolver(preferencesSchema),
    defaultValues: {
      appointmentType: formData.appointmentType,
      datePreference: formData.datePreference,
      provider: formData.provider,
      dayPreferences: formData.dayPreferences,
      timePreference: formData.timePreference,
    },
    mode: "onChange",
  });

  const dayPreferences = watch("dayPreferences") || [];
  const timePreference = watch("timePreference");

  const onSubmit = (data: PreferencesFormData) => {
    dispatch(updateFormData(data));
    dispatch(nextStep());
  };

  const handleDayPreferenceToggle = (day: string) => {
    const current = dayPreferences;
    if (current.includes(day)) {
      setValue(
        "dayPreferences",
        current.filter((d) => d !== day)
      );
    } else {
      setValue("dayPreferences", [...current, day]);
    }
  };

  const handleTimePreferenceSelect = (time: string) => {
    setValue("timePreference", time);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Appointment Preferences</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Appointment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment type *
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
              <option value="CLEANING">CLEANING</option>
              <option value="FILLING">FILLING</option>
              <option value="EXTRACTION">EXTRACTION</option>
              <option value="ROOT CANAL">ROOT CANAL</option>
              <option value="CROWN">CROWN</option>
            </select>
            {errors.appointmentType && (
              <p className="mt-1 text-xs text-red-600">
                {errors.appointmentType.message}
              </p>
            )}
          </div>

          {/* Date Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred date *
            </label>
            <Input
              type="date"
              {...register("datePreference")}
              className={errors.datePreference ? "border-red-300" : ""}
            />
            {errors.datePreference && (
              <p className="mt-1 text-xs text-red-600">
                {errors.datePreference.message}
              </p>
            )}
          </div>

          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
          </div>

          {/* Day Preferences */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Day preference (You can select more than one) *
            </label>
            <div className="flex flex-wrap gap-2">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "ASAP"].map(
                (day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={
                      dayPreferences.includes(day) ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleDayPreferenceToggle(day)}
                    className="text-xs"
                  >
                    {day}
                  </Button>
                )
              )}
            </div>
            {errors.dayPreferences && (
              <p className="mt-1 text-xs text-red-600">
                {errors.dayPreferences.message}
              </p>
            )}
          </div>

          {/* Time Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time preference *
            </label>
            <div className="flex gap-2">
              {["Morning", "Afternoon", "Any Time"].map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={timePreference === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTimePreferenceSelect(time)}
                  className="text-sm"
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

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => dispatch(prevStep())}
              className="px-6 py-2"
            >
              Previous
            </Button>
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Next: Available Appointments
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
