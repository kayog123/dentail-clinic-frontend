"use client";
import Link from "next/link";
import ConfirmEmailIcon from "../_components/icons/confirm-email-icon";
import AuthWrapper from "../_components/auth-wrapper";
import InputOTPForm, { InputOTPFormData } from "../_components/input-otp-form";
import { use, useState } from "react";
import { toast } from "sonner";
import { autoSignIn, confirmSignUp } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { awsConfig } from "@/app/lib/aws-config";
import { useRouter } from "next/navigation";
import { getError } from "@/app/lib/error";
import { AUTH_SIGNUP_DONE } from "../_utils/const";

Amplify.configure(awsConfig);

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default function ConfirmAccount(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const searchParams = use(props.searchParams);
  const email = searchParams.email as string | undefined;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  async function confirmSignUpUser({
    email,
    code,
  }: {
    email: string;
    code: string;
  }) {
    try {
      const { nextStep: confirmSignUpNextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      return confirmSignUpNextStep;
    } catch (error: unknown) {
      console.log(error);
      throw new Error(`${getError(error).message}`);
    }
  }

  async function onSubmit(data: InputOTPFormData) {
    try {
      if (!email) {
        throw new Error("Email not found");
      }
      setIsProcessing(true);

      const confirmSignUpNextStep = await confirmSignUpUser({
        email,
        code: data.pin,
      });

      if (confirmSignUpNextStep.signUpStep === AUTH_SIGNUP_DONE) {
        setupComplete();
        return;
      }
      if (confirmSignUpNextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
        // Call `autoSignIn` API to complete the flow
        const { nextStep } = await autoSignIn();

        if (nextStep.signInStep == AUTH_SIGNUP_DONE) {
          console.log("Auto signin. Successfully signed in.");
          setupComplete();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(getError(error).message);
    }
    setIsProcessing(false);
  }

  function setupComplete() {
    toast.success("Successfully signed up!", {
      description: "You successfull created an account. You can sign in now.",
    });
    router.push("/dashboard");
  }
  return (
    <AuthWrapper
      title="Verify your account"
      subtitle="Enter the verification code sent to your device"
      Icon={<ConfirmEmailIcon />}
    >
      {/* Email Field */}
      <InputOTPForm email={email || ""} onSubmit={onSubmit} />

      {/* Submit Button */}

      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Back to sign up
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}
