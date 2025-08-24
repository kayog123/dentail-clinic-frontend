import * as yup from "yup";

export const profileSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  dateOfBirth: yup
    .string()
    .required("Date of birth is required")
    .test("valid-date", "Please enter a valid date", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return (
        date instanceof Date && !isNaN(date.getTime()) && date <= new Date()
      );
    }),
  phone: yup
    .string()
    .test("phone-format", "Please enter a valid phone number", (value) => {
      if (!value) return false;
      // Remove all non-digits and check if we have 10 digits
      const digits = value.replace(/\D/g, "");
      return digits.length === 10;
    })
    .required("Phone number is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

export type ProfileFormData = yup.InferType<typeof profileSchema>;
export type ProfileFieldProps = keyof typeof profileSchema.fields;
export type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;
export type ChangePasswordFieldProps = keyof typeof changePasswordSchema.fields;
