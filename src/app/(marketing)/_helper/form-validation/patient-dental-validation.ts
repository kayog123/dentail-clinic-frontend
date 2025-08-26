import * as yup from "yup";
export const insuranceSchema = yup.object({
  hasInsurance: yup.boolean().default(false),
  insuranceName: yup
    .string()
    .when("hasInsurance", {
      is: true,
      then: (schema) => schema.required("Insurance name is required"),
      otherwise: (schema) => schema.optional(),
    })
    .default(""),
  subscriberName: yup
    .string()
    .when("hasInsurance", {
      is: true,
      then: (schema) => schema.required("Subscriber name is required"),
      otherwise: (schema) => schema.optional(),
    })
    .default(""),
  subscriberId: yup
    .string()
    .when("hasInsurance", {
      is: true,
      then: (schema) => schema.required("Subscriber ID is required"),
      otherwise: (schema) => schema.optional(),
    })
    .default(""),
  groupNumber: yup
    .string()
    .when("hasInsurance", {
      is: true,
      then: (schema) => schema.required("Group number is required"),
      otherwise: (schema) => schema.optional(),
    })
    .default(""),
});

export type InsuranceFormData = yup.InferType<typeof insuranceSchema>;
