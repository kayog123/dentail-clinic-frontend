"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as yup from "yup";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
} from "@/app/components/ui/form";
import { LucideArrowRight } from "lucide-react";

// Validation schema
export const FormSchema = yup.object({
  pin: yup
    .string()
    .min(6, {
      message: "Your one-time password must be 6 characters.",
    })
    .required(),
});

export type InputOTPFormData = yup.InferType<typeof FormSchema>;

export default function InputOTPForm({
  email,
  onSubmit,
}: {
  email: string;
  onSubmit: (data: InputOTPFormData) => void;
}) {
  const form = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field, fieldState }) => {
            const errorData = fieldState.error;
            const errorMsg = errorData! as unknown as {
              message: {
                message: string | undefined;
              };
            };
            return (
              <FormItem>
                <FormDescription className="mb-4">
                  Please enter the one-time password sent to{" "}
                  <strong>{email ?? "your registered email"}</strong>
                </FormDescription>
                <FormControl>
                  <div className="space-y-2">
                    <InputOTP
                      maxLength={6}
                      value={field.value || ""}
                      onChange={field.onChange}
                      onKeyDown={(e) => {
                        if (
                          !/[0-9]/.test(e.key) &&
                          e.key !== "Backspace" &&
                          e.key !== "Delete" &&
                          e.key !== "ArrowLeft" &&
                          e.key !== "ArrowRight"
                        ) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <InputOTPGroup className="w-full  flex ">
                        <InputOTPSlot index={0} className="flex-1 h-16" />
                        <InputOTPSlot index={1} className="flex-1 h-16" />
                        <InputOTPSlot index={2} className="flex-1 h-16" />
                        <InputOTPSlot index={3} className="flex-1 h-16" />
                        <InputOTPSlot index={4} className="flex-1 h-16" />
                        <InputOTPSlot index={5} className="flex-1 h-16" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                {errorMsg && (
                  <p className="mt-1 text-xs text-red-600  ">
                    {errorMsg.message.message}
                  </p>
                )}
              </FormItem>
            );
          }}
        />

        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <LucideArrowRight className="h-4 w-4 text-blue-200 group-hover:text-blue-100 transition-colors" />
          </span>
          {form.formState.isSubmitting ? "Confirming..." : "Confirm Email"}
        </button>
      </form>
    </Form>
  );
}
