import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentTypeProps } from "../(marketing)/_utils/type";

export type TypePreferrenceProps = "MORNING" | "AFTERNOON" | "ANYTIME";
export interface BookingFormData {
  // Step 1: User Details
  patientType: "new" | "existing";
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  notes: string;

  // Step 2: Dental Insurance
  hasInsurance: boolean;
  insuranceName: string;
  subscriberName: string;
  subscriberId: string;
  groupNumber: string;

  // Step 3: Preferences
  appointmentType: AppointmentTypeProps | undefined;
  datePreference: string;
  provider: string;
  dayPreferences: string[];
  timePreference: TypePreferrenceProps | undefined;

  // Step 4: Available Appointments
  selectedAppointment?: {
    time: string;
  };
}

interface BookingState {
  currentStep: number;
  formData: BookingFormData;
}

const initialState: BookingState = {
  currentStep: 1,
  formData: {
    patientType: "new",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    phone: "",
    notes: "",
    hasInsurance: false,
    insuranceName: "",
    subscriberName: "",
    subscriberId: "",
    groupNumber: "",
    appointmentType: undefined,
    datePreference: "",
    provider: "",
    dayPreferences: [],
    timePreference: undefined,
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      if (state.currentStep < 4) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    updateFormData: (
      state,
      action: PayloadAction<Partial<BookingFormData>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },

    resetBooking: (state) => {
      state.currentStep = 1;
      state.formData = initialState.formData;
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  prevStep,
  updateFormData,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
