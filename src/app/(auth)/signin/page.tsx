"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SocialLoginSso from "../_components/social-login-sso";
import AuthWrapper from "../_components/auth-wrapper";
import { loginSchema } from "../_utils/auth-utils";
import { LoginFormData } from "../_helper/signin-validation";
import FormInputComponent, {
  InputFormRegisterProps,
} from "../_components/form-input-component";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "aws-amplify/auth";
import { getError } from "@/app/lib/error";
import { use } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function LoginPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const router = useRouter();
  const searchParams = use(props.searchParams);
  const redirect_url = searchParams.redirect as string | undefined;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Handle login logic here
      const { email, password } = data;
      const { nextStep } = await signIn({
        username: email,
        password: password,
      });

      if (nextStep.signInStep === "DONE") {
        toast.success("Login successful!", {
          description: "You can now access your dashboard.",
        });
        router.push(redirect_url ?? "/dashboard");
      }
    } catch (error: unknown) {
      const errMsg = getError(error).message;
      console.log("Login error:", error);
      toast.error(errMsg);
    }
  };

  const LoginIcon = () => (
    <div className="mx-auto h-12 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-3">
      <svg
        className="h-6 w-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );

  return (
    <AuthWrapper
      title="Welcome Back"
      subtitle=" Sign in to your admin dashboard"
      Icon={<LoginIcon />}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        {/* Password Field */}
        <FormInputComponent
          fieldType="password"
          fieldName="Password"
          formTitle="password"
          placeholder="Enter your password"
          fieldKey="current-password"
          errors={errors}
          register={register as InputFormRegisterProps}
          Icon={Mail}
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <ArrowRight className="h-4 w-4 text-blue-200 group-hover:text-blue-100 transition-colors" />
          </span>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <SocialLoginSso />
      {/* Sign Up Link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthWrapper>
  );
}
