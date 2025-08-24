import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ForgotPasswordFormData } from "../../_helper/forgot-pass-validation";
import FormInputComponent, {
  InputFormRegisterProps,
} from "../../_components/form-input-component";
import { ArrowRight, Mail } from "lucide-react";

interface VerifyEmailAccountProps {
  onSubmitHandler: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<ForgotPasswordFormData>;
  errors: FieldErrors<ForgotPasswordFormData>;
  isSubmitting: boolean;
}

export default function VerifyEmailAccount(props: VerifyEmailAccountProps) {
  const { onSubmitHandler, errors, isSubmitting, register } = props;
  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      {/* Email Field */}
      <FormInputComponent
        fieldType="email"
        fieldName="Email Address"
        formTitle="email"
        placeholder="Enter your email"
        fieldKey="email-address"
        errors={errors}
        register={register as InputFormRegisterProps}
        Icon={Mail}
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
        {isSubmitting ? "Verifying..." : "Verify Email Account"}
      </button>
    </form>
  );
}
