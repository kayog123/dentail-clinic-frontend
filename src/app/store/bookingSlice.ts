import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  appointmentType: string;
  datePreference: string;
  provider: string;
  dayPreferences: string[];
  timePreference: string;

  // Step 4: Available Appointments
  selectedAppointment?: {
    id: string;
    date: string;
    time: string;
    provider: string;
  };
}

interface BookingState {
  currentStep: number;
  formData: BookingFormData;
  isSubmitting: boolean;
  error: string | null;
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
    appointmentType: "",
    datePreference: "",
    provider: "",
    dayPreferences: [],
    timePreference: "",
  },
  isSubmitting: false,
  error: null,
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
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetBooking: (state) => {
      state.currentStep = 1;
      state.formData = initialState.formData;
      state.isSubmitting = false;
      state.error = null;
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  prevStep,
  updateFormData,
  setSubmitting,
  setError,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
