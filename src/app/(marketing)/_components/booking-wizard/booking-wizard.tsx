"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Step1UserDetails from "./step-1-user-details";
import Step2Insurance from "./step-2-insurance";
import Step3Preferences from "./step-3-preferences";
import Step4Appointments from "./step-4-appointments";
import { WIZARD_STEPS } from "../../_utils/const";
import WizardStepHeader from "./wizard-step-hearder";

export default function BookingWizard() {
  const { currentStep } = useSelector((state: RootState) => state.booking);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1UserDetails />;
      case 2:
        return <Step2Insurance />;
      case 3:
        return <Step3Preferences />;
      case 4:
        return <Step4Appointments />;
      default:
        return <Step1UserDetails />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-lg shadow-md border border-slate-100">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Book an Appointment
      </h2>

      {/* Progress Bar */}
      <WizardStepHeader currentStep={currentStep} />
      {/* Step Content */}
      <div className="min-h-[400px] 00">{renderStep()}</div>

      {/* Step Indicator */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Step {currentStep} of {WIZARD_STEPS.length}
        </p>
      </div>
    </div>
  );
}
