"use client";

import React from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { updateFormData, nextStep } from "@/app/store/bookingSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInputComponent, {
  InputFormRegisterProps,
} from "@/app/(auth)/_components/form-input-component";
import { Mail, User } from "lucide-react";
import {
  UserDetailsFormData,
  userDetailsSchema,
} from "@/app/(marketing)/_helper/form-validation/user-details-validation";

export default function Step1UserDetails() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state: RootState) => state.booking);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserDetailsFormData>({
    resolver: yupResolver(userDetailsSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      dob: formData.dob || "",
      email: formData.email || "",
      notes: formData.notes || " ",
    },
  });

  //const patientType = watch("patientType");

  const onSubmit = (data: UserDetailsFormData) => {
    dispatch(updateFormData(data));
    dispatch(nextStep());
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Patient Information</h3>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInputComponent
              formTitle="firstName"
              placeholder="Patient's Given Name"
              fieldName="First Name *"
              fieldKey="firstName"
              fieldType="text"
              register={register as InputFormRegisterProps}
              errors={errors}
              Icon={User}
            />
            <FormInputComponent
              formTitle="lastName"
              placeholder="Patient's Last Name"
              fieldName="Last Name *"
              fieldKey="lastName"
              fieldType="text"
              register={register as InputFormRegisterProps}
              errors={errors}
              Icon={User}
            />

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

            <FormInputComponent
              formTitle="email"
              placeholder="Email address"
              fieldName="Email *"
              fieldKey="email"
              fieldType="text"
              register={register as InputFormRegisterProps}
              errors={errors}
              Icon={Mail}
            />
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
