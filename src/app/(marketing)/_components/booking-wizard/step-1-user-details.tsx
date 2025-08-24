"use client";

import React from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { updateFormData, nextStep } from "../../../store/bookingSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const userDetailsSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

type UserDetailsFormData = {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  patientType: "new" | "existing";
  notes: string;
};

export default function Step1UserDetails() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state: RootState) => state.booking);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserDetailsFormData>({
    resolver: yupResolver(userDetailsSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dob: formData.dob,
      email: formData.email,
      phone: formData.phone,
      patientType: formData.patientType,
      notes: formData.notes,
    },
    mode: "onChange",
  });

  const patientType = watch("patientType");

  const onSubmit = (data: UserDetailsFormData) => {
    dispatch(updateFormData(data));
    dispatch(nextStep());
  };

  const handlePatientTypeChange = (type: "new" | "existing") => {
    setValue("patientType", type);
    dispatch(updateFormData({ patientType: type }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Patient Information</h3>

        {/* Patient Type Selection */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            This appointment is for
          </p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={patientType === "new"}
                onChange={() => handlePatientTypeChange("new")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                New patient
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={patientType === "existing"}
                onChange={() => handlePatientTypeChange("existing")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Existing patient
              </span>
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name *
              </label>
              <Input
                placeholder="First name"
                {...register("firstName")}
                className={errors.firstName ? "border-red-300" : ""}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last name *
              </label>
              <Input
                placeholder="Last name"
                {...register("lastName")}
                className={errors.lastName ? "border-red-300" : ""}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of birth *
              </label>
              <Input
                type="date"
                {...register("dob")}
                className={errors.dob ? "border-red-300" : ""}
              />
              {errors.dob && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <Input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={errors.email ? "border-red-300" : ""}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number *
              </label>
              <Input
                type="tel"
                placeholder="Phone number"
                {...register("phone")}
                className={errors.phone ? "border-red-300" : ""}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes to Office
            </label>
            <textarea
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any additional notes or special requests"
              rows={3}
              {...register("notes")}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Next: Insurance Information
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
