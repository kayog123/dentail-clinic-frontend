import * as yup from "yup";
// Validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: yup.boolean().optional(),
});

export type LoginFormData = yup.InferType<typeof loginSchema>;
