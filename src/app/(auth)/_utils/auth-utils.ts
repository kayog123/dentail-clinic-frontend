import * as yup from "yup";

// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation rules
export const PASSWORD_RULES = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: false,
};

// Phone validation regex
export const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// Validation schemas for react-hook-form
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

export const signupSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(PHONE_REGEX, "Please enter a valid phone number")
    .required("Phone number is required"),
  password: yup
    .string()
    .min(
      PASSWORD_RULES.minLength,
      `Password must be at least ${PASSWORD_RULES.minLength} characters`
    )
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  agreeToTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("You must agree to the terms and conditions"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

// Type definitions
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type SignupFormData = yup.InferType<typeof signupSchema>;
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

// Validate email format
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

// Validate password strength
export const validatePassword = (
  password: string
): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < PASSWORD_RULES.minLength) {
    errors.push(
      `Password must be at least ${PASSWORD_RULES.minLength} characters long`
    );
  }

  if (PASSWORD_RULES.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (PASSWORD_RULES.requireLowercase && !/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (PASSWORD_RULES.requireNumbers && !/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  if (
    PASSWORD_RULES.requireSpecialChars &&
    !/[!@#$%^&*(),.?":{}|<>]/.test(password)
  ) {
    errors.push("Password must contain at least one special character");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Validate phone number (basic validation)
export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone.replace(/\s/g, ""));
};

// Format form data for API submission
export const formatAuthData = (data: SignupFormData | LoginFormData) => {
  return {
    ...data,
    email: data.email.toLowerCase().trim(),
    firstName: "firstName" in data ? data.firstName?.trim() : undefined,
    lastName: "lastName" in data ? data.lastName?.trim() : undefined,
    phone: "phone" in data ? data.phone?.replace(/\s/g, "") : undefined,
  };
};

// Generate error message for form validation
export const getFieldError = (field: string, value: string): string | null => {
  switch (field) {
    case "email":
      if (!value) return "Email is required";
      if (!validateEmail(value)) return "Please enter a valid email address";
      break;
    case "password":
      if (!value) return "Password is required";
      const passwordValidation = validatePassword(value);
      if (!passwordValidation.isValid) {
        return passwordValidation.errors[0];
      }
      break;
    case "confirmPassword":
      if (!value) return "Please confirm your password";
      break;
    case "firstName":
      if (!value) return "First name is required";
      if (value.length < 2) return "First name must be at least 2 characters";
      break;
    case "lastName":
      if (!value) return "Last name is required";
      if (value.length < 2) return "Last name must be at least 2 characters";
      break;
    case "phone":
      if (!value) return "Phone number is required";
      if (!validatePhone(value)) return "Please enter a valid phone number";
      break;
  }
  return null;
};
