import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import FormInputComponent, {
  InputFormRegisterProps,
} from "../../_components/form-input-component";
import {
  ForgotNewPassFormData,
  forgotNewPassSchema,
} from "../../_helper/forgot-pass-validation";

interface NewPasswordProps {
  onSubmitHandler: (data: ForgotNewPassFormData) => Promise<void>;
}

export default function NewPassword(props: NewPasswordProps) {
  const { onSubmitHandler } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotNewPassSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const watchedPassword = watch("password");
  const watchedConfirmPassword = watch("confirmPassword");
  const isConfirmPasswordValid =
    watchedConfirmPassword &&
    watchedPassword === watchedConfirmPassword &&
    watchedConfirmPassword.length > 0;
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      {/* Email Field */}
      <FormInputComponent
        fieldType="password"
        fieldName="Password"
        formTitle="password"
        placeholder="Create a password"
        fieldKey="new-password"
        errors={errors}
        register={register as InputFormRegisterProps}
        Icon={Lock}
        isConfirmPasswordValid={!!isConfirmPasswordValid}
      />
      <FormInputComponent
        fieldType="password"
        fieldName="Confirm Password"
        formTitle="confirmPassword"
        placeholder="Confirm password"
        fieldKey="confirm-password"
        errors={errors}
        register={register as InputFormRegisterProps}
        isConfirmPasswordValid={!!isConfirmPasswordValid}
        Icon={Lock}
      />
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          <ArrowRight className="h-4 w-4 text-blue-200 group-hover:text-blue-100 transition-colors" />
        </span>
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
}
