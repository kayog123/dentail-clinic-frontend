import * as yup from "yup";
import {
  AFTERNOON_PREFERRENCE,
  ANY_TIME_PREFERRENCE,
  MORNING_PREFERRENCE,
} from "../../_utils/const";
export const preferencesSchema = yup.object({
  appointmentType: yup
    .string()
    .oneOf(
      [
        "NPE",
        "NPE_NP_SRP",
        "CLEANING",
        "FILLING",
        "EXTRACTION",
        "ROOT_CANAL",
        "CROWN",
      ],
      "Please choose an appointment"
    )
    .required("Appointment type is required"),
  datePreference: yup.string().required("Date preference is required"),
  provider: yup.string().default(""),
  timePreference: yup
    .string()
    .oneOf([MORNING_PREFERRENCE, AFTERNOON_PREFERRENCE, ANY_TIME_PREFERRENCE])
    .required("Time preference is required"),
});
export type PreferenceFormData = yup.InferType<typeof preferencesSchema>;
