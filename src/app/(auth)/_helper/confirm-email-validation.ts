import * as yup from "yup";
export const confirmEmailSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export type ConfirmEmailFormData = yup.InferType<typeof confirmEmailSchema>;
