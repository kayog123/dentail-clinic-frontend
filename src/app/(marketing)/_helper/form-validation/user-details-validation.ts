import * as yup from "yup";
export const userDetailsSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dob: yup.string().required(),
  email: yup.string().email().required(),
  notes: yup.string().default(""), // Allows null or undefined, but not optional
});
export type UserDetailsFormData = yup.InferType<typeof userDetailsSchema>;
