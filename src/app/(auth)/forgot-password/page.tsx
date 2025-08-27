"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthWrapper from "../_components/auth-wrapper";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../_utils/auth-utils";
import ForgotPassIcon from "../_components/icons/forgot-pass-icon";
import VerifyEmailAccount from "./form-steps/verify-email-account";
import VerificationComplete from "./form-steps/verification-complete";
import TwoFactorAuthentication from "./form-steps/two-factor-authentication";
import NewPassword from "./form-steps/new-password";
import { useRouter, useSearchParams } from "next/navigation";
import { ForgotNewPassFormData } from "../_helper/forgot-pass-validation";
import { confirmResetPassword, resetPassword } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { awsConfig } from "@/app/lib/aws-config";
import { InputOTPFormData } from "../_components/input-otp-form";
import { getError } from "@/app/lib/error";
import { toast } from "sonner";

type FormUiStateType = "reset_form" | "set_password" | "success" | "verify";

Amplify.configure(awsConfig);

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const emailParams = searchParams.get("email");
  const stateParams = searchParams.get("state");
  const [newPassword, setNewPassword] = useState<string>("");
  const [email, setEmail] = useState<string>(emailParams ?? "");
  const VERIFY_EMAIL_FORM_STATE = "reset_form";
  const SET_PASSWORD_FORM_STATE = "set_password";
  const VERIFY_OTP_FORM_STATE = "verify";
  const VERIFY_COMPLETE_FORM_STATE = "success";

  const INITIAL_FIRST_RESET_FORM = VERIFY_EMAIL_FORM_STATE;

  const confitionalFormState = isFormUiStateType(stateParams!)
    ? stateParams
    : INITIAL_FIRST_RESET_FORM;

  const initialFormState =
    stateParams == VERIFY_OTP_FORM_STATE && (emailParams || newPassword)
      ? SET_PASSWORD_FORM_STATE
      : confitionalFormState;

  const [formState, setFormState] = useState<FormUiStateType>(initialFormState);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function isFormUiStateType(value: string): value is FormUiStateType {
    return (
      value === VERIFY_EMAIL_FORM_STATE ||
      value === SET_PASSWORD_FORM_STATE ||
      value === VERIFY_COMPLETE_FORM_STATE ||
      value === VERIFY_OTP_FORM_STATE
    );
  }

  const watchedEmail = watch("email");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Handle password reset logic here
      console.log("Password reset requested for:", data.email);
      // Simulate API call
      setFormState(SET_PASSWORD_FORM_STATE);
      setEmail(data.email);
      router.replace(
        `/forgot-password?email=${data.email}&state=${SET_PASSWORD_FORM_STATE}`
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset error:", error);
    }
  };

  const onSubmitNewPass = async (data: ForgotNewPassFormData) => {
    const { nextStep } = await resetPassword({
      username: email,
    });
    setNewPassword(data.password);
    switch (nextStep.resetPasswordStep) {
      case "CONFIRM_RESET_PASSWORD_WITH_CODE":
        //const codeDeliveryDetails = nextStep.codeDeliveryDetails;
        // Collect the confirmation code from the user and pass to confirmResetPassword.
        router.replace(`/forgot-password?email=${email}&state=verify`);
        setFormState(VERIFY_OTP_FORM_STATE);
        break;
      case "DONE":
        console.log("Successfully reset password.");
        router.replace(`/forgot-password?email=${email}&state=success`);
        setFormState(VERIFY_COMPLETE_FORM_STATE);
        break;
    }
  };

  const onSubmitOTPHandler = async (data: InputOTPFormData) => {
    try {
      await confirmResetPassword({
        username: email,
        confirmationCode: data.pin,
        newPassword,
      });
      setFormState(VERIFY_COMPLETE_FORM_STATE);
    } catch (error: unknown) {
      const errMsg = getError(error).message;
      console.error(errMsg);
      toast.error(errMsg);
    }
  };

  return (
    <AuthWrapper
      title={isSubmitted ? "Check Your Email" : "Forgot Password"}
      subtitle={
        isSubmitted
          ? "We&apos;ve sent you a password reset link"
          : "Enter your email to receive a password reset link"
      }
      Icon={<ForgotPassIcon />}
    >
      {formState === VERIFY_EMAIL_FORM_STATE && (
        <VerifyEmailAccount
          onSubmitHandler={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      )}
      {formState === SET_PASSWORD_FORM_STATE && (
        <NewPassword onSubmitHandler={onSubmitNewPass} />
      )}
      {formState === VERIFY_OTP_FORM_STATE && (
        <TwoFactorAuthentication
          email={email}
          onSubmitOTPHandler={onSubmitOTPHandler}
        />
      )}
      {formState === VERIFY_COMPLETE_FORM_STATE && (
        <VerificationComplete email={watchedEmail} />
      )}

      {/* Back to Login */}
      <div className="mt-4 text-center">
        <Link
          href="/signin"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to login
        </Link>
      </div>
    </AuthWrapper>
  );
}
