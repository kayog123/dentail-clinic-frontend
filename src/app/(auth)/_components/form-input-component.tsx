"use client";

import { HTMLInputTypeAttribute, useState } from "react";
import { SignupFieldProps, SignupFormData } from "../_helper/signup-validation";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import {
  ForgotNewPassFormData,
  ForgotPasswordFormData,
} from "../_helper/forgot-pass-validation";
import { LoginFormData } from "../_helper/signin-validation";
import { BookingFormData } from "@/app/(marketing)/_helper/form-validation/booking-validation";
import { UserDetailsFormData } from "@/app/(marketing)/_helper/form-validation/user-details-validation";

export type AuthFormDataType =
  | SignupFormData
  | LoginFormData
  | ForgotPasswordFormData
  | ForgotNewPassFormData;

export type BookingFormDataType = BookingFormData | UserDetailsFormData;

export type InputFormRegisterProps = UseFormRegister<
  AuthFormDataType | BookingFormDataType
>;

interface FormInputFormProps {
  formTitle: SignupFieldProps;
  placeholder?: string;
  fieldName: string;
  fieldKey: string;
  fieldType: HTMLInputTypeAttribute;
  register: InputFormRegisterProps;
  errors: FieldErrors<SignupFormData>;
  Icon: LucideIcon;
  isConfirmPasswordValid?: boolean;
}
const FormInputComponent = ({
  formTitle,
  placeholder,
  fieldName,
  fieldKey,
  fieldType,
  errors,
  register,
  Icon,
  isConfirmPasswordValid,
}: FormInputFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor={formTitle}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {fieldName}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          id={formTitle}
          type={
            fieldType == "password"
              ? showPassword
                ? "text"
                : "password"
              : fieldType
          }
          autoComplete={fieldKey}
          {...register(formTitle)}
          className={`block w-full pl-9 ${
            fieldType == "password" ? "pr-10" : "pr-3"
          }  py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm ${
            errors[formTitle]
              ? "border-red-300 focus:border-red-500"
              : fieldType == "password" && isConfirmPasswordValid
              ? "border-green-300 focus:border-green-500"
              : "border-gray-300"
          }`}
          placeholder={placeholder}
        />

        {fieldType == "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {errors[formTitle] && (
        <p className="mt-1 text-xs text-red-600  ">
          {errors[formTitle].message ?? <>&nbsp;</>}
        </p>
      )}
    </div>
  );
};
export default FormInputComponent;
