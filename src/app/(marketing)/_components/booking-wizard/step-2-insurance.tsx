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

const insuranceSchema = yup.object({
  hasInsurance: yup.boolean(),
  insuranceName: yup.string().when("hasInsurance", {
    is: true,
    then: (schema) => schema.required("Insurance name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  subscriberName: yup.string().when("hasInsurance", {
    is: true,
    then: (schema) => schema.required("Subscriber name is required"),
    otherwise: (schema) => schema.optional(),
  }),
  subscriberId: yup.string().when("hasInsurance", {
    is: true,
    then: (schema) => schema.required("Subscriber ID is required"),
    otherwise: (schema) => schema.optional(),
  }),
  groupNumber: yup.string().when("hasInsurance", {
    is: true,
    then: (schema) => schema.required("Group number is required"),
    otherwise: (schema) => schema.optional(),
  }),
});

type InsuranceFormData = {
  hasInsurance: boolean;
  insuranceName: string;
  subscriberName: string;
  subscriberId: string;
  groupNumber: string;
};

export default function Step2Insurance() {
  const dispatch = useDispatch();
  const { formData } = useSelector((state: RootState) => state.booking);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<InsuranceFormData>({
    resolver: yupResolver(insuranceSchema),
    defaultValues: {
      hasInsurance: formData.hasInsurance,
      insuranceName: formData.insuranceName,
      subscriberName: formData.subscriberName,
      subscriberId: formData.subscriberId,
      groupNumber: formData.groupNumber,
    },
    mode: "onChange",
  });

  const hasInsurance = watch("hasInsurance");

  const onSubmit = (data: InsuranceFormData) => {
    dispatch(updateFormData(data));
    dispatch(nextStep());
  };

  const handleInsuranceToggle = (checked: boolean) => {
    setValue("hasInsurance", checked);
    if (!checked) {
      // Clear insurance fields when unchecked
      setValue("insuranceName", "");
      setValue("subscriberName", "");
      setValue("subscriberId", "");
      setValue("groupNumber", "");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dental Insurance</h3>

        {/* Insurance Toggle */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="has-insurance"
              checked={hasInsurance}
              onChange={(e) => handleInsuranceToggle(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="has-insurance"
              className="text-sm font-medium text-gray-700"
            >
              I have dental insurance
            </label>
          </div>
        </div>

        {/* Insurance Form */}
        {hasInsurance && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name of insurance *
                </label>
                <Input
                  placeholder="Insurance name"
                  {...register("insuranceName")}
                  className={errors.insuranceName ? "border-red-300" : ""}
                />
                {errors.insuranceName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.insuranceName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscriber name *
                </label>
                <Input
                  placeholder="Subscriber name"
                  {...register("subscriberName")}
                  className={errors.subscriberName ? "border-red-300" : ""}
                />
                {errors.subscriberName && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.subscriberName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subscriber ID *
                </label>
                <Input
                  placeholder="Subscriber ID"
                  {...register("subscriberId")}
                  className={errors.subscriberId ? "border-red-300" : ""}
                />
                {errors.subscriberId && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.subscriberId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group number *
                </label>
                <Input
                  placeholder="Group number"
                  {...register("groupNumber")}
                  className={errors.groupNumber ? "border-red-300" : ""}
                />
                {errors.groupNumber && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.groupNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between pt-4">
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
                Next: Appointment Preferences
              </Button>
            </div>
          </form>
        )}

        {/* No Insurance - Skip to Next */}
        {!hasInsurance && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              No problem! You can proceed without insurance information.
            </p>
            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => dispatch(prevStep())}
                className="px-6 py-2"
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={() => dispatch(nextStep())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              >
                Next: Appointment Preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
