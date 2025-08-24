import * as yup from "yup";

export const bookingSchema = yup.object({
  patientType: yup.string().oneOf(["new", "existing"]).optional(),
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .optional(),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .optional(),
  dob: yup.string().optional(),
  email: yup.string().email("Please enter a valid email address").optional(),
  phone: yup.string().optional(),
  notes: yup
    .string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
  hasInsurance: yup.boolean().optional(),
  insuranceName: yup.string().optional(),
  subscriberName: yup.string().optional(),
  subscriberId: yup.string().optional(),
  groupNumber: yup.string().optional(),
  appointmentType: yup.string().optional(),
  datePreference: yup.string().optional(),
  provider: yup.string().optional(),
  dayPreferences: yup.array().of(yup.string()).optional(),
  timePreference: yup.string().optional(),
});

export type BookingFormData = yup.InferType<typeof bookingSchema>;
export type BookingFieldProps = keyof typeof bookingSchema.fields;
