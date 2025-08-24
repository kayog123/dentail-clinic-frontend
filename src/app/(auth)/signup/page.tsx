"use client";

import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { SignupFormData, signupSchema } from "../_helper/signup-validation";
import { signUp } from "aws-amplify/auth";
import { AUTH_SIGNUP_CONFIRM_SIGN_UP, AUTH_SIGNUP_DONE } from "../_utils/const";
import { useRouter } from "next/navigation";
import SignUpFormIcon from "../_components/icons/signup-form-icon";
import AuthWrapper from "../_components/auth-wrapper";
import SocialLoginSso from "../_components/social-login-sso";
import FormInputComponent, {
  InputFormRegisterProps,
} from "../_components/form-input-component";
import { awsConfig } from "@/app/lib/aws-config";
import { Amplify } from "aws-amplify";
import { getError } from "@/app/lib/error";

Amplify.configure(awsConfig);

// Validation schema
async function signUpUser(data: SignupFormData) {
  try {
    const { nextStep: signUpNextStep } = await signUp({
      username: data.email,
      password: data.password,
      options: {
        userAttributes: {
          //email: data.email,
          preferred_username: "test",
          family_name: data.lastName,
          given_name: data.firstName,
          "custom:agree_to_terms": data.agreeToTerms ? "agree" : "disagree",
        },
        autoSignIn: { enabled: true },
      },
    });

    return signUpNextStep;
  } catch (error: unknown) {
    console.log("Failed to create account", error);
    throw new Error(`Create account failed! Please try again later!`);
  }
}
export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const watchedPassword = watch("password");
  const watchedConfirmPassword = watch("confirmPassword");

  const isPasswordValid = watchedPassword && watchedPassword.length >= 8;
  const isConfirmPasswordValid =
    watchedConfirmPassword &&
    watchedPassword === watchedConfirmPassword &&
    watchedConfirmPassword.length > 0;

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Handle signup logic here
      console.log("Signup attempt:", data);
      const signUpNextStep = await signUpUser(data);
      // Simulate API call
      switch (signUpNextStep.signUpStep) {
        case AUTH_SIGNUP_DONE:
          toast.success(
            "Congratulation! You have successfully created an account."
          );
          break;
        case AUTH_SIGNUP_CONFIRM_SIGN_UP:
          router.push(`/confirm-account?email=${data.email}`);
          break;
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);
      const errorMsg = getError(error).message;
      toast.error(`Failed to create account: ${errorMsg}`);
    }
  };

  return (
    <AuthWrapper
      title="Create Account"
      subtitle="Join your dental practice admin team"
      Icon={<SignUpFormIcon />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <FormInputComponent
            fieldType="text"
            fieldName="Firstname"
            formTitle="firstName"
            placeholder="First name"
            fieldKey="given-name"
            errors={errors}
            register={register as InputFormRegisterProps}
            Icon={User}
          />
          <FormInputComponent
            fieldType="text"
            fieldName="Lastname"
            formTitle="lastName"
            placeholder="Last name"
            fieldKey="family-name"
            errors={errors}
            register={register as InputFormRegisterProps}
            Icon={User}
          />
        </div>

        {/* Email Field */}
        <FormInputComponent
          fieldType="email"
          fieldName="Email Address"
          formTitle="email"
          placeholder="Enter your email"
          fieldKey="family-name"
          errors={errors}
          register={register as InputFormRegisterProps}
          Icon={Mail}
        />

        {/* Password Fields Row */}
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

        {/* Password Validation */}
        {watchedPassword && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <div className="flex items-center mb-1">
              <Check
                className={`h-3 w-3 mr-1 ${
                  isPasswordValid ? "text-green-500" : "text-gray-400"
                }`}
              />
              <span>At least 8 characters</span>
            </div>
            <div className="flex items-center mb-1">
              <Check
                className={`h-3 w-3 mr-1 ${
                  /[A-Z]/.test(watchedPassword)
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              <span>One uppercase letter</span>
            </div>
            <div className="flex items-center mb-1">
              <Check
                className={`h-3 w-3 mr-1 ${
                  /[a-z]/.test(watchedPassword)
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              <span>One lowercase letter</span>
            </div>
            <div className="flex items-center">
              <Check
                className={`h-3 w-3 mr-1 ${
                  /\d/.test(watchedPassword)
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              />
              <span>One number</span>
            </div>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              type="checkbox"
              {...register("agreeToTerms")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="text-gray-700">
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Privacy Policy
              </Link>
            </label>
          </div>
        </div>
        {errors.agreeToTerms && (
          <p className="mt-1 text-xs text-red-600">
            {errors.agreeToTerms.message}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <ArrowRight className="h-4 w-4 text-blue-200 group-hover:text-blue-100 transition-colors" />
          </span>
        </button>
      </form>

      <SocialLoginSso />

      {/* Sign In Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}
